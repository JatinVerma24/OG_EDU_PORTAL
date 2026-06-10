import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import './index.css' // Ensure styles are applied if not in main
import TgpaCalculator from './TgpaCalculator'
import Sidebar from './Sidebar'
import AttendanceManager from './AttendanceManager'
import CgpaCalculator from './CgpaCalculator'
import PercentageCalculator from './PercentageCalculator'


interface MarksInput {
  obtained: number
  max: number
}

interface CheckResult {
  status: 'PASS' | 'FAIL'
  details: {
    rule1: { passed: boolean; reason: string; description: string }
    rule2: { passed: boolean; reason: string; description: string; score: string }
  }
}

// Deployment trigger: 2026-01-16 16:58
function App() {
  const [activeTab, setActiveTab] = useState<'checker' | 'tgpa' | 'attendance' | 'cgpa_calc' | 'percentage'>('checker')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const [subjectName, setSubjectName] = useState('')
  const [examType, setExamType] = useState<'regular' | 'reappear'>('regular')
  const [subjectType, setSubjectType] = useState<'theory' | 'practical'>('theory')

  const [attendance, setAttendance] = useState<MarksInput>({ obtained: 0, max: 5 })
  const [ca, setCa] = useState<MarksInput>({ obtained: 0, max: 25 }) // Default defaults
  const [mte, setMte] = useState<MarksInput>({ obtained: 0, max: 20 })
  const [ete, setEte] = useState<MarksInput>({ obtained: 0, max: 50 })

  const [result, setResult] = useState<CheckResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Maintenance Mode (Set to true to take site offline)
  const MAINTENANCE_MODE = false;

  if (MAINTENANCE_MODE || import.meta.env.VITE_MAINTENANCE_MODE === 'true') {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg-dark)] text-[var(--text-main)] flex-col gap-4 text-center p-6">
        <div className="text-6xl">🚧</div>
        <h1 className="text-3xl font-bold text-indigo-400">Under Maintenance</h1>
        <p className="text-[var(--text-muted)] max-w-md">
          {import.meta.env.VITE_MAINTENANCE_MESSAGE || "We are currently updating the site. Please check back later!"}
        </p>
      </div>
    )
  }

  const handleCheck = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const payload = {
        examType,
        subjectType,
        attendance,
        ca,
        mte: subjectType === 'practical' ? { obtained: 0, max: 0 } : mte,
        ete
      }

      // Use environment variable for API URL in production, or defaults for local dev
      const baseUrl = import.meta.env.VITE_API_URL || '';
      // Ensure we treat it as a base domain and always hit /api/check
      // If baseUrl is empty (local), it becomes '/api/check' which hits the proxy
      // If baseUrl is set (prod), it becomes 'https://url/api/check'
      const response = await axios.post(`${baseUrl.replace(/\/$/, '')}/api/check`, payload)
      setResult(response.data)
    } catch (err: any) {
      console.error("Calculation Error:", err);
      setError(err.response?.data?.error || 'Failed to calculate result')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {result?.status === 'PASS' && activeTab === 'checker' && <Confetti width={windowSize.width} height={windowSize.height} recycle={true} numberOfPieces={200} />}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative w-full custom-scrollbar">
        {/* Mobile Header Toggle */}
        <div className="md:hidden p-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md border-b border-[var(--glass-border)] bg-[var(--bg-card)]">
          <h1 className="text-lg font-bold text-[var(--text-main)]">JVOG RESULT CHECKER</h1>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-white/80 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeTab === 'checker' ? (
              <motion.div
                key="checker"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="glass-panel w-full p-6 md:p-10 relative overflow-hidden animate-float">

                  <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-2 drop-shadow-sm">
                      Pass Checker
                    </h2>
                    <p className="text-indigo-600/80 dark:text-indigo-200/70 font-medium tracking-wide">Check if you meet the passing criteria</p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10">
                    {/* Controls & Inputs */}
                    <div className="space-y-6">

                      {/* Toggles */}
                      <div>
                        <label className="input-label">Subject Name</label>
                        <input
                          type="text"
                          className="modern-input mb-4"
                          placeholder="e.g. Programming in Java"
                          value={subjectName}
                          onChange={(e) => setSubjectName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="input-label">Examination Type</label>
                        <div className="toggle-container">
                          <div
                            className={`toggle-btn ${examType === 'regular' ? 'active' : ''}`}
                            onClick={() => setExamType('regular')}
                          >
                            Regular
                          </div>
                          <div
                            className={`toggle-btn ${examType === 'reappear' ? 'active' : ''}`}
                            onClick={() => setExamType('reappear')}
                          >
                            Reappear
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="input-label">Subject Type</label>
                        <div className="toggle-container">
                          <div
                            className={`toggle-btn ${subjectType === 'theory' ? 'active' : ''}`}
                            onClick={() => setSubjectType('theory')}
                          >
                            Theory
                          </div>
                          <div
                            className={`toggle-btn ${subjectType === 'practical' ? 'active' : ''}`}
                            onClick={() => setSubjectType('practical')}
                          >
                            Practical
                          </div>
                        </div>
                      </div>

                      {/* Marks Inputs */}
                      <div className="space-y-4">
                        <MarksGroup label="Attendance" value={attendance} onChange={setAttendance} />
                        <MarksGroup label="Continuous Assessment" value={ca} onChange={setCa} />

                        {subjectType === 'theory' && (
                          <MarksGroup label="Mid Term (MTE)" value={mte} onChange={setMte} />
                        )}

                        <MarksGroup
                          label={subjectType === 'theory' ? "End Term (ETE)" : "Practical End Term"}
                          value={ete}
                          onChange={setEte}
                        />
                      </div>

                      <button
                        className="btn-primary"
                        onClick={handleCheck}
                        disabled={loading}
                      >
                        {loading ? 'Checking...' : 'Check Status'}
                      </button>

                      {error && <p className="text-error mt-2 text-center">{error}</p>}
                    </div>

                    {/* Result Display */}
                    <div className="flex flex-col justify-center min-h-[300px]">
                      <AnimatePresence mode="wait">
                        {result ? (
                          <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`text-center p-8 rounded-2xl glass-card border-none relative overflow-hidden ${result.status === 'PASS' ? 'shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'shadow-[0_0_50px_rgba(239,68,68,0.2)]'}`}
                          >
                            <div className={`absolute inset-0 opacity-10 ${result.status === 'PASS' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                              className="text-7xl mb-6 block relative z-10"
                            >
                              {result.status === 'PASS' ? '🎉' : '⚠️'}
                            </motion.div>
                            <h2 className={`text-4xl font-black mb-3 relative z-10 ${result.status === 'PASS' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              Hey you {result.status} {subjectName}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 mb-8 relative z-10 font-medium">
                              {result.status === 'PASS' ? 'Congratulations! You met all criteria.' : 'Unfortunately, you did not meet the criteria.'}
                            </p>

                            <div className="text-left space-y-4 bg-black/40 p-6 rounded-xl relative z-10 border border-white/5">
                              <CriteriaBar
                                label="Min Marks Criteria"
                                passed={result.details.rule1.passed}
                                reason={result.details.rule1.reason}
                              />
                              <CriteriaBar
                                label="Overall Weightage"
                                passed={result.details.rule2.passed}
                                reason={result.details.rule2.reason}
                                score={result.details.rule2.score}
                                threshold={40}
                              />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-text-muted opacity-50 flex flex-col items-center"
                          >
                            <p className="text-xl text-indigo-300 font-medium">Enter your marks to see the verdict</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'tgpa' ? (
              <motion.div
                key="tgpa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TgpaCalculator />
              </motion.div>
            ) : activeTab === 'attendance' ? (
              <motion.div
                key="attendance"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center"
              >
                <div className="w-full max-w-2xl">
                  <AttendanceManager />
                </div>
              </motion.div>
            ) : activeTab === 'percentage' ? (
              <motion.div
                key="percentage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <PercentageCalculator />
              </motion.div>
            ) : (
              <motion.div
                key="cgpa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CgpaCalculator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

const MarksGroup = ({ label, value, onChange }: { label: string, value: MarksInput, onChange: (v: MarksInput) => void }) => (
  <div className="flex gap-4 items-end">
    <div className="flex-1">
      <label className="input-label">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          className="modern-input"
          placeholder="Obtained"
          value={value.obtained}
          onChange={(e) => onChange({ ...value, obtained: parseFloat(e.target.value) || 0 })}
        />
        <span className="text-text-muted">/</span>
        <input
          type="number"
          className="modern-input"
          placeholder="Max"
          value={value.max}
          onChange={(e) => onChange({ ...value, max: parseFloat(e.target.value) || 0 })}
        />
      </div>
    </div>
  </div>
)

const CriteriaBar = ({ label, passed, reason, score, threshold }: {
  label: string,
  passed: boolean,
  reason: string,
  score?: string,
  threshold?: number
}) => {
  // Extract numerical percent from reason if score not provided (for rule 1)
  const percentMatch = reason.match(/([\d.]+)%/)
  const percent = score ? parseFloat(score) : (percentMatch ? parseFloat(percentMatch[1]) : 0)
  // For rule 1, threshold is 30 usually, but can vary. 
  const effectiveThreshold = threshold || 30

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-[var(--text-main)]">{label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${passed ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
          {passed ? 'PASSED' : 'FAILED'}
        </span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-2.5 mb-1 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percent, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-2.5 rounded-full ${passed ? 'bg-success' : 'bg-error'}`}
          style={{ backgroundColor: passed ? '#10b981' : '#ef4444' }}
        />
      </div>
      <div className="flex justify-between text-xs text-text-muted">
        <span>Current: {percent.toFixed(1)}%</span>
        <span>Required: {effectiveThreshold}%</span>
      </div>
      {/* <div className="text-xs text-text-muted mt-1">{reason}</div> */}
    </div>
  )
}

export default App
