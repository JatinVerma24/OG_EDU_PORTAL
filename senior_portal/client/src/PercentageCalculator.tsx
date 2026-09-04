import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Tab = 'marks_to_percent' | 'percent_to_marks' | 'goal_calc'

export default function PercentageCalculator() {
    const [subTab, setSubTab] = useState<Tab>('marks_to_percent')

    // State for Marks to %
    const [mtpTotal, setMtpTotal] = useState<number>(0)
    const [mtpObtained, setMtpObtained] = useState<number>(0)
    const [mtpResult, setMtpResult] = useState<number | null>(null)

    // State for % to Marks
    const [ptmTotal, setPtmTotal] = useState<number>(0)
    const [ptmPercent, setPtmPercent] = useState<number>(0)
    const [ptmResult, setPtmResult] = useState<number | null>(null)

    // State for Goal Calculator
    const [goalTargetPercent, setGoalTargetPercent] = useState<number>(0)
    const [goalTotalMarks, setGoalTotalMarks] = useState<number>(0) // Total marks for the WHOLE course/semester
    const [goalObtainedMarks, setGoalObtainedMarks] = useState<number>(0) // Marks obtained so far
    const [goalResult, setGoalResult] = useState<string | null>(null)


    const calculateMtp = () => {
        if (mtpTotal === 0) return
        const res = (mtpObtained / mtpTotal) * 100
        setMtpResult(parseFloat(res.toFixed(2)))
    }

    const calculatePtm = () => {
        const res = (ptmTotal * ptmPercent) / 100
        setPtmResult(parseFloat(res.toFixed(2)))
    }

    const calculateGoal = () => {
        // Simple logic: if I have X marks out of Y total, and I want Z%, how many MORE marks do I need?
        // Actually, the common use case is:
        // "I have scored X marks so far. To get Overall Y%, how many marks do I need in remaining papers?"
        // But let's stick to the reference site logic if possible or a simple "Required Marks" calculator.
        // Reference site "Requirements": "Enter your current marks, Enter total marks, Enter target percentage" -> "You need X marks more".

        const targetMarks = (goalTotalMarks * goalTargetPercent) / 100
        const needed = targetMarks - goalObtainedMarks

        if (needed <= 0) {
            setGoalResult("You have already achieved this goal! 🎉")
        } else if (needed > (goalTotalMarks - mtpObtained)) { // This check relies on us knowing how many marks are LEFT, which we don't exactly know without another input.
            // Let's simplified version: "You need X more marks to reach Y%"
            setGoalResult(`You need ${needed.toFixed(1)} more marks.`)
        } else {
            setGoalResult(`You need ${needed.toFixed(1)} more marks.`)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">
                    Percentage Tools 📐
                </h2>
                <p className="text-[var(--text-muted)]">Quick conversions and goal setting</p>
            </div>

            {/* Sub-Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-white/5 p-1 rounded-xl border border-[var(--glass-border)] inline-flex flex-wrap justify-center gap-1">
                    {[
                        { id: 'marks_to_percent', label: 'Marks ⮕ %' },
                        { id: 'percent_to_marks', label: '% ⮕ Marks' },
                        { id: 'goal_calc', label: 'Goal 🎯' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSubTab(tab.id as Tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${subTab === tab.id
                                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/5'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="glass-panel p-6 md:p-10 min-h-[300px] flex flex-col justify-center items-center">
                <AnimatePresence mode="wait">
                    {subTab === 'marks_to_percent' && (
                        <motion.div
                            key="mtp"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-md space-y-6"
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="input-label">Total Marks</label>
                                    <input
                                        type="number"
                                        className="modern-input"
                                        placeholder="e.g. 100"
                                        value={mtpTotal || ''}
                                        onChange={(e) => setMtpTotal(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div>
                                    <label className="input-label">Marks Obtained</label>
                                    <input
                                        type="number"
                                        className="modern-input"
                                        placeholder="e.g. 85"
                                        value={mtpObtained || ''}
                                        onChange={(e) => setMtpObtained(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <button onClick={calculateMtp} className="btn-primary w-full bg-gradient-to-r from-teal-500 to-cyan-600">
                                    Calculate Percentage
                                </button>
                            </div>

                            {mtpResult !== null && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center p-6 bg-teal-500/10 rounded-xl border border-teal-500/20"
                                >
                                    <div className="text-sm text-teal-300 uppercase tracking-wider font-bold mb-1">Result</div>
                                    <div className="text-5xl font-bold text-white mb-2">{mtpResult}%</div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {subTab === 'percent_to_marks' && (
                        <motion.div
                            key="ptm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-md space-y-6"
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="input-label">Total Marks</label>
                                    <input
                                        type="number"
                                        className="modern-input"
                                        placeholder="e.g. 100"
                                        value={ptmTotal || ''}
                                        onChange={(e) => setPtmTotal(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div>
                                    <label className="input-label">Percentage Required (%)</label>
                                    <input
                                        type="number"
                                        className="modern-input"
                                        placeholder="e.g. 75"
                                        value={ptmPercent || ''}
                                        onChange={(e) => setPtmPercent(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <button onClick={calculatePtm} className="btn-primary w-full bg-gradient-to-r from-teal-500 to-cyan-600">
                                    Calculate Marks
                                </button>
                            </div>

                            {ptmResult !== null && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center p-6 bg-teal-500/10 rounded-xl border border-teal-500/20"
                                >
                                    <div className="text-sm text-teal-300 uppercase tracking-wider font-bold mb-1">Marks Needed</div>
                                    <div className="text-5xl font-bold text-white mb-2">{ptmResult}</div>
                                    <div className="text-xs text-[var(--text-muted)]">out of {ptmTotal}</div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {subTab === 'goal_calc' && (
                        <motion.div
                            key="goal"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-md space-y-6"
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="input-label">Total Max Marks</label>
                                    <input
                                        type="number"
                                        className="modern-input"
                                        placeholder="e.g. 500"
                                        value={goalTotalMarks || ''}
                                        onChange={(e) => setGoalTotalMarks(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div>
                                    <label className="input-label">Marks Obtained So Far</label>
                                    <input
                                        type="number"
                                        className="modern-input"
                                        placeholder="e.g. 350"
                                        value={goalObtainedMarks || ''}
                                        onChange={(e) => setGoalObtainedMarks(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div>
                                    <label className="input-label">Target Percentage (%)</label>
                                    <input
                                        type="number"
                                        className="modern-input"
                                        placeholder="e.g. 90"
                                        value={goalTargetPercent || ''}
                                        onChange={(e) => setGoalTargetPercent(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <button onClick={calculateGoal} className="btn-primary w-full bg-gradient-to-r from-teal-500 to-cyan-600">
                                    Calculate Requirement
                                </button>
                            </div>

                            {goalResult !== null && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center p-6 bg-teal-500/10 rounded-xl border border-teal-500/20"
                                >
                                    <div className="text-sm text-teal-300 uppercase tracking-wider font-bold mb-1">Verdict</div>
                                    <div className="text-2xl font-bold text-white mb-2">{goalResult}</div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
