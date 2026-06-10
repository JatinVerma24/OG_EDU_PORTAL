import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'

interface Semester {
    id: number
    tgpa: number
}

export default function CgpaCalculator() {
    const [semesters, setSemesters] = useState<Semester[]>(() => {
        const saved = localStorage.getItem('cgpa_semesters')
        if (saved) return JSON.parse(saved)
        return Array.from({ length: 8 }, (_, i) => ({ id: i + 1, tgpa: 0 }))
    })

    const [cgpa, setCgpa] = useState<number | null>(null)

    useEffect(() => {
        localStorage.setItem('cgpa_semesters', JSON.stringify(semesters))
    }, [semesters])

    const updateSemester = (id: number, val: number) => {
        if (val > 10) val = 10
        if (val < 0) val = 0
        setSemesters(semesters.map(s => s.id === id ? { ...s, tgpa: val } : s))
        setCgpa(null)
    }

    const calculateCgpa = () => {
        // Only count semesters where TGPA > 0
        const filledSemesters = semesters.filter(s => s.tgpa > 0)
        if (filledSemesters.length === 0) {
            setCgpa(0)
            return
        }

        const totalTgpa = filledSemesters.reduce((sum, s) => sum + s.tgpa, 0)
        const avg = totalTgpa / filledSemesters.length
        setCgpa(parseFloat(avg.toFixed(2)))
    }

    const resetData = () => {
        if (confirm('Clear all CGPA data?')) {
            setSemesters(Array.from({ length: 8 }, (_, i) => ({ id: i + 1, tgpa: 0 })))
            setCgpa(null)
            localStorage.removeItem('cgpa_semesters')
        }
    }

    const shareResult = async () => {
        const card = document.getElementById('cgpa-result-card')
        if (!card) return

        try {
            const canvas = await html2canvas(card, {
                backgroundColor: null,
                scale: 2,
                useCORS: true
            })
            const image = canvas.toDataURL("image/png")

            if (navigator.share) {
                const blob = await (await fetch(image)).blob()
                const file = new File([blob], "cgpa-result.png", { type: "image/png" })
                await navigator.share({
                    title: 'My CGPA Result',
                    text: `I just achieved ${cgpa} CGPA! Check yours at JVOG Result Checker.`,
                    files: [file]
                })
            } else {
                const link = document.createElement('a')
                link.href = image
                link.download = 'cgpa-result.png'
                link.click()
            }
        } catch (err) {
            console.error("Share failed", err)
            alert("Failed to share result")
        }
    }

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-2">
                    CGPA Calculator 🎓
                </h2>
                <p className="text-[var(--text-muted)]">Calculate your cumulative grade point average</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="glass-panel p-6">
                    <div className="grid grid-cols-2 gap-4">
                        {semesters.map((sem) => (
                            <div key={sem.id} className="space-y-1">
                                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase">Sem {sem.id}</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={sem.tgpa || ''}
                                    onChange={(e) => updateSemester(sem.id, parseFloat(e.target.value) || 0)}
                                    className="modern-input text-center font-mono"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={resetData}
                            className="px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-semibold text-sm"
                        >
                            Reset
                        </button>
                        <button
                            onClick={calculateCgpa}
                            className="flex-1 btn-primary"
                        >
                            Calculate CGPA
                        </button>
                    </div>
                </div>

                {/* Result */}
                <div className="flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                        {cgpa !== null ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-panel p-10 text-center w-full relative overflow-hidden"
                                id="cgpa-result-card"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 z-0"></div>
                                <div className="relative z-10">
                                    <div className="text-sm uppercase tracking-widest text-indigo-300 font-bold mb-2">Your CGPA</div>
                                    <div className="text-7xl font-black text-white mb-2 tracking-tighter filter drop-shadow-lg">
                                        {cgpa}
                                    </div>
                                    <div className="text-[var(--text-muted)] mb-6">
                                        {cgpa >= 9 ? 'Outstanding Performance! 🌟' :
                                            cgpa >= 8 ? 'Excellent Work! 🚀' :
                                                cgpa >= 7 ? 'Good Job! 👍' : 'Keep Pushing! 💪'}
                                    </div>
                                    <button
                                        onClick={shareResult}
                                        className="text-xs flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-indigo-300 transition-all border border-indigo-500/20 hover:border-indigo-500/50"
                                    >
                                        <span>📸</span> Share Result
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-[var(--text-muted)] p-8 opacity-50"
                            >
                                <div className="text-6xl mb-4">🔮</div>
                                <p>Enter your semester TGPAs to see the future.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
