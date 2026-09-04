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
  const [showReappearModal, setShowReappearModal] = useState(() => !sessionStorage.getItem('dismissedReappearModal'))

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

                    {/* Reappear Strategy Info Banner */}
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-center max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">💡 LPU Reappear & Improvement Strategy</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300">Read our smart & practical guide to clear reappears easily.</p>
                      </div>
                      <button
                        onClick={() => setShowReappearModal(true)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-md shrink-0 cursor-pointer"
                      >
                        Read Strategy
                      </button>
                    </div>
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

      {/* Reappear Modal Popup */}
      <AnimatePresence>
        {showReappearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => {
              sessionStorage.setItem('dismissedReappearModal', 'true');
              setShowReappearModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-slate-950/90 text-white rounded-3xl border border-indigo-500/20 p-6 md:p-8 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold transition-colors cursor-pointer"
                onClick={() => {
                  sessionStorage.setItem('dismissedReappearModal', 'true');
                  setShowReappearModal(false);
                }}
              >
                &times;
              </button>

              {/* Header */}
              <div className="text-center border-b border-white/5 pb-4">
                <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-extrabold rounded-full uppercase tracking-wider mb-2">
                  🎓 Batch of 2025
                </span>
                <h3 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Welcome to 2nd Year! 🌟
                </h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">Reappear & Improvement Guide</p>
              </div>

              {/* Sympathy Card */}
              <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl flex gap-3 text-indigo-200 text-sm leading-relaxed items-center">
                <span className="text-3xl">🧡</span>
                <div>
                  <strong className="text-indigo-400 block mb-1">Hey friend, got a Reappear or Backlog? Take a deep breath.</strong>
                  It is <span className="underline decoration-indigo-400 decoration-2">NOT</span> a failure; it is just a second chance to score higher. Many toppers have cleared reappear easily by following a smart, practical strategy. We've got you covered!
                </div>
              </div>

              {/* Reappear Strategy Content */}
              <div className="space-y-6 my-2 text-sm leading-relaxed">
                <div>
                  <h4 className="font-extrabold text-indigo-400 text-base mb-3 flex items-center gap-2">
                    🎯 LPU Reappear Strategy (Smart & Practical)
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">1️⃣ First: Understand Your Reappear Type</h5>
                      <p className="text-slate-300 text-xs mb-2">Before preparing, be 100% clear which reappear you have:</p>
                      <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                        <li><strong className="text-indigo-300">A Mode (₹500):</strong> Only MTE + ETE. Internal marks (CA) are already added. Lower syllabus load → easier to clear.</li>
                        <li><strong className="text-indigo-300">B Mode (₹3000):</strong> CA + MTE + ETE combined. Single exam of 70 marks. Full syllabus → needs structured preparation.</li>
                      </ul>
                      <p className="text-[10px] text-pink-400 mt-2 italic font-medium">👉 Strategy depends completely on this. Don’t prepare blindly.</p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">2️⃣ Collect the Right Material (Don’t Overstudy)</h5>
                      <p className="text-slate-300 text-xs mb-2">Use exact sources, not random PDFs:</p>
                      <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                        <li>Latest course handout</li>
                        <li>Previous MTE & ETE question papers</li>
                        <li>Teacher-shared PPTs / notes</li>
                        <li>One reference book only (avoid multiple books)</li>
                      </ul>
                      <p className="text-[10px] text-indigo-400 mt-2 italic font-medium">⚠️ 80% questions repeat in pattern, not exact words.</p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">3️⃣ Syllabus Filtering (High-Return Topics)</h5>
                      <p className="text-slate-300 text-xs mb-1">Do NOT study chapter-by-chapter equally. Focus on: Numerical-heavy units, Repeated theory questions, and Units with long-answer weightage.</p>
                      <p className="text-[10px] text-pink-400 italic font-medium">📌 Rule: If a unit appeared in last 2 exams → MUST prepare it.</p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">4️⃣ 15–20 Day Preparation Plan</h5>
                      <ul className="list-none text-xs text-slate-400 space-y-1.5">
                        <li><strong className="text-slate-200">Day 1–3:</strong> Read syllabus, mark important topics, analyze previous papers.</li>
                        <li><strong className="text-slate-200">Day 4–12:</strong> Prepare 2 units at a time. Daily: 2–3 numericals, 3–4 theory answers.</li>
                        <li><strong className="text-slate-200">Day 13–16:</strong> Revise weak units, write answers with proper format.</li>
                        <li><strong className="text-slate-200">Last 3–4 Days:</strong> Only revision, no new topic, focus on formulas & definitions.</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">5️⃣ Answer Writing Strategy (Very Important)</h5>
                      <p className="text-slate-300 text-xs mb-2">Marks are lost due to poor presentation, not knowledge. Always:</p>
                      <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                        <li>Start with definition</li>
                        <li>Use headings + subheadings</li>
                        <li>Draw diagrams / flowcharts</li>
                        <li>Write stepwise numericals</li>
                        <li>Underline keywords</li>
                      </ul>
                      <p className="text-[10px] text-indigo-400 mt-2 italic font-medium">📝 Even partial answers get marks if structured well.</p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">6️⃣ Minimum Target to Stay Safe</h5>
                      <p className="text-slate-300 text-xs">Target 40+ marks, not just pass. Attempt all questions and never leave numericals blank. <strong className="text-indigo-300">LPU gives step-wise marks generously.</strong></p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">7️⃣ Common Mistakes to Avoid</h5>
                      <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                        <li>Studying everything deeply</li>
                        <li>Ignoring previous papers</li>
                        <li>Memorizing without understanding</li>
                        <li>Starting preparation too late</li>
                        <li>Panic before exam</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <h5 className="font-bold text-white mb-1">8️⃣ Final Mindset Rule</h5>
                      <p className="text-slate-300 text-xs">Reappear is not a failure, it’s a second scoring chance. Many toppers have cleared reappear easily by following smart strategy, not overwork.</p>
                    </div>
                  </div>
                </div>

                {/* Grading System Table */}
                <div>
                  <h4 className="font-extrabold text-indigo-400 text-base mb-3 flex items-center gap-2">
                    📊 Grading System in LPU
                  </h4>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-slate-300 border-b border-white/10">
                          <th className="p-3 font-semibold">GRADE</th>
                          <th className="p-3 font-semibold">POINTS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-400">
                        <tr>
                          <td className="p-3 font-bold text-indigo-300">O</td>
                          <td className="p-3 text-white">10</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-300">A+</td>
                          <td className="p-3 text-white">9</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-300">A</td>
                          <td className="p-3 text-white">8</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-300">B+</td>
                          <td className="p-3 text-white">7</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-300">B</td>
                          <td className="p-3 text-white">6</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-300">C</td>
                          <td className="p-3 text-white">5</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-300">D</td>
                          <td className="p-3 text-white">4</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-red-400">E (Reappear)</td>
                          <td className="p-3 text-white">0</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-red-400">F (Fail)</td>
                          <td className="p-3 text-white">0</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-red-400">G (Backlog)</td>
                          <td className="p-3 text-white">0</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-red-400">I (Result Incomplete)</td>
                          <td className="p-3 text-white">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Coming Soon Notice */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3 text-amber-200 text-sm font-semibold items-center justify-center">
                  <span>🚀</span>
                  <span>Reappear & Improvement Resources (Notes, PYQs, Handouts) Coming Soon!</span>
                </div>
              </div>

              {/* Footer Button */}
              <div className="border-t border-white/5 pt-4 flex justify-end">
                <button
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  onClick={() => {
                    sessionStorage.setItem('dismissedReappearModal', 'true');
                    setShowReappearModal(false);
                  }}
                >
                  Got it, Let's Rock! ⚡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
