import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './context/ThemeContext'

export default function AttendanceManager() {
    useTheme()
    const [totalClasses, setTotalClasses] = useState(0)
    const [presentClasses, setPresentClasses] = useState(0)
    const [desiredPercentage, setDesiredPercentage] = useState(75)

    // Derived state
    const currentPercentage = totalClasses === 0 ? 0 : (presentClasses / totalClasses) * 100

    // Calculate stats
    const calculateStatus = () => {
        if (totalClasses === 0) return { type: 'neutral', message: 'Enter your classes to check status' }

        if (currentPercentage >= desiredPercentage) {
            // How many can I bunk?
            // (Present) / (Total + X) >= 0.75
            // Present >= 0.75 * Total + 0.75 * X
            // Present - 0.75 * Total >= 0.75 * X
            // (Present - 0.75 * Total) / 0.75 >= X
            const bunkable = Math.floor((presentClasses - (desiredPercentage / 100) * totalClasses) / (desiredPercentage / 100))
            return {
                type: 'pass',
                message: `You can bunk ${bunkable} more classes while staying above ${desiredPercentage}%!`
            }
        } else {
            // How many needed?
            // (Present + X) / (Total + X) >= 0.75
            // Present + X >= 0.75 * Total + 0.75 * X
            // X - 0.75 * X >= 0.75 * Total - Present
            // 0.25 * X >= 0.75 * Total - Present
            // X >= (0.75 * Total - Present) / 0.25

            /*
               Let target = T (e.g. 0.75)
               (P + x) / (Total + x) = T
               P + x = T*Total + T*x
               x - T*x = T*Total - P
               x(1-T) = T*Total - P
               x = (T*Total - P) / (1-T)
            */
            const needed = Math.ceil(((desiredPercentage / 100) * totalClasses - presentClasses) / (1 - (desiredPercentage / 100)))
            return {
                type: 'fail',
                message: `You need to attend ${needed} more classes consecutively to hit ${desiredPercentage}%`
            }
        }
    }

    const status = calculateStatus()

    return (
        <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-2">
                    Attendance Manager 📉
                </h2>
                <p className="text-[var(--text-muted)]">Check if you can bunk or need to hustle</p>
            </div>

            <div className="glass-panel p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--text-muted)]">Total Classes Held</label>
                        <input
                            type="number"
                            value={totalClasses || ''}
                            onChange={(e) => setTotalClasses(parseFloat(e.target.value) || 0)}
                            className="modern-input text-center text-xl"
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--text-muted)]">Classes Attended</label>
                        <input
                            type="number"
                            value={presentClasses || ''}
                            onChange={(e) => setPresentClasses(parseFloat(e.target.value) || 0)}
                            className="modern-input text-center text-xl"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <label className="text-sm font-medium text-[var(--text-muted)]">Desired Percentage</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="60"
                            max="95"
                            value={desiredPercentage}
                            onChange={(e) => setDesiredPercentage(parseInt(e.target.value))}
                            className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xl font-bold text-indigo-400 w-12">{desiredPercentage}%</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--glass-border)] text-center">
                    <div className="text-sm uppercase tracking-widest text-[var(--text-muted)] mb-2">Current Status</div>
                    <div className={`text-5xl font-black mb-4 ${currentPercentage >= desiredPercentage ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {currentPercentage.toFixed(1)}%
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={status.message}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl border ${status.type === 'pass'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : status.type === 'fail'
                                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                    : 'bg-slate-500/10 border-slate-500/30 text-slate-300'
                                }`}
                        >
                            <p className="font-semibold text-lg">{status.message}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="bg-[var(--glass)] rounded-xl p-4 text-center border border-[var(--glass-border)]">
                <p className="text-xs text-[var(--text-muted)] italic">
                    "College life is a balance between 75% attendance and 100% memories." — Unknown
                </p>
            </div>
        </div>
    )
}
