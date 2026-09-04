import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import TgpaAnalysis from './TgpaAnalysis'

interface Subject {
    id: string
    name: string
    credits: number
    marks: number
    classAvg?: number
    highest?: number
}

// Grading Scale
// 90-100 O 10.0
// 80-89 A+ 9.0
// 70-79 A 8.0
// 60-69 B+ 7.0
// 50-59 B 6.0
// 40-49 C 5.0
// Below 40 F 0

const getGradeInfo = (marks: number, classAvg?: number) => {
    // Standard thresholds
    let thresholds = { O: 90, A_PLUS: 80, A: 70, B_PLUS: 60, B: 50, C: 40 }

    // Relative Grading Logic
    // If classAvg is provided (and < 70), shift thresholds down.
    if (classAvg !== undefined && classAvg > 0) {
        const shift = Math.max(0, 70 - classAvg)

        thresholds.O = Math.max(40, 90 - shift)
        thresholds.A_PLUS = Math.max(35, 80 - shift)
        thresholds.A = Math.max(33, 70 - shift)
        thresholds.B_PLUS = Math.max(30, 60 - shift)
        thresholds.B = Math.max(25, 50 - shift)
        thresholds.C = Math.max(20, 40 - shift)
    }

    if (marks >= thresholds.O) return { grade: 'O', point: 10.0, color: 'text-green-400', hex: '#4ade80' }
    if (marks >= thresholds.A_PLUS) return { grade: 'A+', point: 9.0, color: 'text-green-300', hex: '#86efac' }
    if (marks >= thresholds.A) return { grade: 'A', point: 8.0, color: 'text-blue-400', hex: '#60a5fa' }
    if (marks >= thresholds.B_PLUS) return { grade: 'B+', point: 7.0, color: 'text-blue-300', hex: '#93c5fd' }
    if (marks >= thresholds.B) return { grade: 'B', point: 6.0, color: 'text-yellow-400', hex: '#facc15' }
    if (marks >= thresholds.C) return { grade: 'C', point: 5.0, color: 'text-orange-400', hex: '#fb923c' }
    return { grade: 'F', point: 0.0, color: 'text-red-500', hex: '#ef4444' }
}

export default function TgpaCalculator() {
    const [subjects, setSubjects] = useState<Subject[]>(() => {
        const saved = localStorage.getItem('tgpa_subjects')
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch (e) {
                console.error("Failed to parse saved subjects", e)
            }
        }
        return [{ id: '1', name: '', credits: 3, marks: 0, classAvg: 0, highest: 0 }]
    })
    const [tgpa, setTgpa] = useState<number | null>(null)
    const [showResults, setShowResults] = useState(false)
    const [useRelative, setUseRelative] = useState(false)
    const [viewMode, setViewMode] = useState<'calculator' | 'analysis'>('calculator')

    useEffect(() => {
        localStorage.setItem('tgpa_subjects', JSON.stringify(subjects))
    }, [subjects])

    const addSubject = () => {
        setSubjects([...subjects, { id: Date.now().toString(), name: '', credits: 3, marks: 0, classAvg: 0, highest: 0 }])
        setShowResults(false)
    }

    const clearData = () => {
        if (confirm('Are you sure you want to clear all data?')) {
            const defaultSubject = [{ id: Date.now().toString(), name: '', credits: 3, marks: 0, classAvg: 0, highest: 0 }]
            setSubjects(defaultSubject)
            setShowResults(false)
            localStorage.removeItem('tgpa_subjects')
        }
    }

    const removeSubject = (id: string) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter(s => s.id !== id))
            setShowResults(false)
        }
    }

    const updateSubject = (id: string, field: keyof Subject, value: any) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s))
        setShowResults(false)
    }

    const loadPreset = () => {
        // Preset from user image
        const presetSubjects = [
            { id: 'evs', name: 'EVS', credits: 2, marks: 0, classAvg: 0, highest: 0 },
            { id: 'cse111', name: 'CSE111', credits: 2, marks: 0, classAvg: 0, highest: 0 },
            { id: 'cse326', name: 'CSE326', credits: 2, marks: 0, classAvg: 0, highest: 0 },
            { id: 'ece249', name: 'ECE249', credits: 3, marks: 0, classAvg: 0, highest: 0 },
            { id: 'ece279', name: 'ECE279', credits: 1, marks: 0, classAvg: 0, highest: 0 },
            { id: 'python', name: 'Python', credits: 4, marks: 0, classAvg: 0, highest: 0 },
            { id: 'maths', name: 'Maths', credits: 4, marks: 0, classAvg: 0, highest: 0 },
        ]
        setSubjects(presetSubjects)
        setShowResults(false)
    }

    const loadBbaPreset = () => {
        const bbaSubjects = [
            { id: 'acc103', name: 'FINANCIAL ACCOUNTING', credits: 4, marks: 0, classAvg: 0, highest: 0 },
            { id: 'che110', name: 'ENVIRONMENTAL STUDIES', credits: 2, marks: 0, classAvg: 0, highest: 0 },
            { id: 'eco113', name: 'BUSINESS ECONOMICS', credits: 4, marks: 0, classAvg: 0, highest: 0 },
            { id: 'mgn100m', name: 'CAREER PLANNING-I', credits: 1, marks: 0, classAvg: 0, highest: 0 },
            { id: 'mgn101', name: 'BUSINESS ORG & MGMT', credits: 4, marks: 0, classAvg: 0, highest: 0 },
            { id: 'pel200', name: 'ENGLISH COMM SKILLS', credits: 4, marks: 0, classAvg: 0, highest: 0 },
        ]
        setSubjects(bbaSubjects)
        setShowResults(false)
    }

    const calculateTgpa = () => {
        let totalCredits = 0
        let totalGradePoints = 0

        subjects.forEach(sub => {
            const { point } = getGradeInfo(sub.marks, useRelative ? sub.classAvg : undefined)
            totalCredits += sub.credits
            totalGradePoints += sub.credits * point
        })

        if (totalCredits === 0) {
            setTgpa(0)
        } else {
            setTgpa(parseFloat((totalGradePoints / totalCredits).toFixed(2)))
        }
        setShowResults(true)
    }

    const shareResult = async () => {
        const card = document.getElementById('tgpa-result-card')
        if (!card) return

        try {
            const canvas = await html2canvas(card, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                logging: false
            })
            const image = canvas.toDataURL("image/png")

            const downloadImage = (dataUrl: string, filename: string) => {
                const link = document.createElement('a')
                link.href = dataUrl
                link.download = filename
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }

            if (navigator.share) {
                try {
                    const blob = await (await fetch(image)).blob()
                    const file = new File([blob], "tgpa-result.png", { type: "image/png" })

                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            title: 'My TGPA Result',
                            text: `I just scored ${tgpa} TGPA! Check yours at JVOG Result Checker.`,
                            files: [file]
                        })
                    } else {
                        downloadImage(image, 'tgpa-result.png')
                    }
                } catch (shareError: any) {
                    if (shareError?.name !== 'AbortError') {
                        console.warn("Share API error, falling back to download", shareError)
                        downloadImage(image, 'tgpa-result.png')
                    }
                }
            } else {
                downloadImage(image, 'tgpa-result.png')
            }
        } catch (err: any) {
            console.error("Share failed", err)
            // Show the actual error message to the user for debugging
            alert(`Failed to generate/share result: ${err.message || err}`)
        }
    }

    const downloadResultPDF = async () => {
        const card = document.getElementById('tgpa-result-card')
        if (!card) return

        try {
            const canvas = await html2canvas(card, {
                backgroundColor: '#0f172a', // Enforce dark background for PDF
                scale: 2,
                useCORS: true,
                logging: false,
                onclone: (clonedDoc) => {
                    const allElements = clonedDoc.querySelectorAll('*')
                    allElements.forEach((el) => {
                        const style = window.getComputedStyle(el)
                        const props: (keyof CSSStyleDeclaration)[] = ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke']

                        props.forEach(prop => {
                            const val = style[prop as any] as string
                            if (val && (val.includes('oklch') || val.includes('oklab'))) {
                                if (prop === 'color') (el as HTMLElement).style.color = '#f8fafc'
                                else if (prop === 'backgroundColor') (el as HTMLElement).style.backgroundColor = 'transparent'
                                else if (prop === 'borderColor') (el as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                                else (el as HTMLElement).style[prop as any] = '#ffffff'
                            }
                        })
                    })
                }
            })

            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4')
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 30

            pdf.setFillColor(15, 23, 42) // #0f172a
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F')

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save('tgpa-result.pdf')

        } catch (err) {
            console.error("PDF generation failed", err)
            alert("Failed to generate PDF report.")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl md:text-2xl font-bold text-[var(--text-main)] tracking-tight">TGPA Calculator</h2>
                </div>

                {/* View Switcher Tabs */}
                <div className="bg-white/5 p-1 rounded-lg border border-[var(--glass-border)] flex">
                    <button
                        onClick={() => setViewMode('calculator')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'calculator' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                    >
                        📝 Marks Input
                    </button>
                    <button
                        onClick={() => setViewMode('analysis')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'analysis' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                    >
                        📊 Analysis
                    </button>
                </div>
            </div>

            {viewMode === 'analysis' ? (
                <TgpaAnalysis
                    subjects={subjects}
                    getGradeInfo={getGradeInfo}
                    useRelative={useRelative}
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                            <button
                                onClick={loadPreset}
                                className="flex-1 sm:flex-none relative group overflow-hidden px-6 py-2.5 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 hover:-translate-y-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right"
                            >
                                Load B.Tech
                            </button>
                            <button
                                onClick={loadBbaPreset}
                                className="flex-1 sm:flex-none relative group overflow-hidden px-6 py-2.5 rounded-xl font-bold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50 hover:-translate-y-1 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-[length:200%_auto] hover:bg-right"
                            >
                                Load BBA
                            </button>
                        </div>

                        {/* Relative Toggle */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={clearData}
                                className="px-4 py-2 rounded-lg text-sm font-bold border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all"
                            >
                                Reset 🗑️
                            </button>
                            <button
                                onClick={() => setUseRelative(!useRelative)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${useRelative ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-transparent text-indigo-300 border-indigo-500/30 hover:border-indigo-500'}`}
                            >
                                {useRelative ? 'Relative Grading ON 📊' : 'Enable Relative Grading'}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {subjects.map((subject, index) => {
                                return (
                                    <motion.div
                                        key={subject.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`grid gap-2 items-center bg-white/5 p-3 rounded-lg border border-[var(--glass-border)] ${useRelative ? 'grid-cols-12 sm:grid-cols-10' : 'grid-cols-12'}`}
                                    >
                                        {/* Name */}
                                        <div className={`${useRelative ? 'col-span-12 sm:col-span-3' : 'col-span-4'}`}>
                                            <label className="text-xs text-[var(--text-muted)] block mb-1">Subject</label>
                                            <input
                                                type="text"
                                                value={subject.name}
                                                onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                                                placeholder={`Subject ${index + 1}`}
                                                className="w-full bg-transparent border-b border-[var(--glass-border)] focus:border-indigo-500 outline-none text-sm py-1 text-[var(--text-main)]"
                                            />
                                        </div>

                                        <div className="col-span-2 text-center">
                                            <label className="text-xs text-text-muted block mb-1">Credits</label>
                                            <input
                                                type="number"
                                                value={subject.credits || ''}
                                                onChange={(e) => updateSubject(subject.id, 'credits', parseFloat(e.target.value) || 0)}
                                                className="w-full bg-transparent border-b border-[var(--glass-border)] focus:border-indigo-500 outline-none text-sm py-1 text-center text-[var(--text-main)] mb-1"
                                            />
                                            <div className="flex justify-center gap-1">
                                                {[1, 2, 3, 4].map(c => (
                                                    <button
                                                        key={c}
                                                        onClick={() => updateSubject(subject.id, 'credits', c)}
                                                        className={`text-[10px] w-4 h-4 rounded flex items-center justify-center transition-colors ${subject.credits === c
                                                                ? 'bg-indigo-500 text-white'
                                                                : 'bg-white/5 text-[var(--text-muted)] hover:bg-indigo-500/50 hover:text-white'
                                                            }`}
                                                    >
                                                        {c}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Relative Inputs */}
                                        {useRelative && (
                                            <>
                                                <div className="col-span-6 sm:col-span-2 text-center">
                                                    <label className="text-xs text-blue-300 block mb-1">Class Avg</label>
                                                    <input
                                                        type="number"
                                                        value={subject.classAvg || ''}
                                                        placeholder="Ex: 59"
                                                        onChange={(e) => updateSubject(subject.id, 'classAvg', parseFloat(e.target.value) || 0)}
                                                        className="w-full bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-sm py-1 text-center text-blue-200"
                                                    />
                                                </div>
                                                {/* Highest is visual for now or for future logic */}
                                                <div className="col-span-6 sm:col-span-2 text-center">
                                                    <label className="text-xs text-purple-300 block mb-1">Highest</label>
                                                    <input
                                                        type="number"
                                                        value={subject.highest || ''}
                                                        placeholder="Ex: 85"
                                                        onChange={(e) => updateSubject(subject.id, 'highest', parseFloat(e.target.value) || 0)}
                                                        className="w-full bg-transparent border-b border-purple-500/30 focus:border-purple-500 outline-none text-sm py-1 text-center text-purple-200"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* Marks */}
                                        <div className={`${useRelative ? 'col-span-6 sm:col-span-2' : 'col-span-3'} text-center`}>
                                            <label className="text-xs text-text-muted block mb-1">Marks</label>
                                            <input
                                                type="number"
                                                value={subject.marks || ''}
                                                placeholder="0-100"
                                                onChange={(e) => {
                                                    let val = parseFloat(e.target.value) || 0;
                                                    if (val > 100) val = 100;
                                                    updateSubject(subject.id, 'marks', val)
                                                }}
                                                className="w-full bg-transparent border-b border-[var(--glass-border)] focus:border-indigo-500 outline-none text-sm py-1 text-center text-[var(--text-main)]"
                                            />
                                        </div>

                                        {/* Grade Display */}
                                        <div className="col-span-2 flex flex-col items-center justify-center">
                                            <label className="text-xs text-text-muted block mb-1">Grade</label>
                                            {showResults ? (
                                                <>
                                                    <span className="font-bold" style={{ color: getGradeInfo(subject.marks, useRelative ? subject.classAvg : undefined).hex }}>
                                                        {getGradeInfo(subject.marks, useRelative ? subject.classAvg : undefined).grade}
                                                    </span>
                                                    <span className="text-[10px] text-white/50">{getGradeInfo(subject.marks, useRelative ? subject.classAvg : undefined).point}</span>
                                                </>
                                            ) : (
                                                <span className="text-[var(--text-muted)]">-</span>
                                            )}
                                        </div>

                                        {/* Delete */}
                                        <div className="col-span-1 flex justify-center">
                                            <button
                                                onClick={() => removeSubject(subject.id)}
                                                className="text-red-400/50 hover:text-red-400 transition-colors"
                                                disabled={subjects.length === 1}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={addSubject}
                            className="flex-1 py-3 border-2 border-dashed border-[var(--glass-border)] rounded-lg text-[var(--text-muted)] hover:border-indigo-500/50 hover:text-indigo-300 transition-all text-sm font-medium"
                        >
                            + Add Subject
                        </button>
                        <button
                            onClick={calculateTgpa}
                            className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-bold shadow-lg hover:shadow-indigo-500/25 hover:translate-y-[-1px] transition-all"
                        >
                            Calculate Result
                        </button>
                    </div>

                    <a
                        href="https://docs.google.com/document/d/1DtEXUbslsJjrgcY4qWLSwKrwRZFVUyyLM20hTSfwDbs/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 mt-4 text-center bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
                    >
                        DOWNLOAD GUIDE FOR FREE 📄
                    </a>

                    <div className="mt-4 pt-4 border-t border-[var(--glass-border)] text-center">
                        <p className="text-sm md:text-base font-bold text-[var(--text-main)] mb-3">To find your credits: UMS {'>'} Academics {'>'} View Program Scheme</p>
                        <a
                            href="https://ums.lpu.in/lpuums/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 font-semibold rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all"
                        >
                            Check Credits on UMS 🏛️
                        </a>
                    </div>

                    {/* Final Result */}
                    <AnimatePresence>
                        {showResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-8 p-6 rounded-xl border border-[var(--glass-border)] text-center shadow-lg relative overflow-hidden"
                                id="tgpa-result-card"
                                style={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                            >
                                {/* Decorative gradient line */}
                                <div
                                    className="absolute top-0 left-0 w-full h-1"
                                    style={{ backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)' }}
                                ></div>

                                <label className="text-sm uppercase tracking-wider font-medium" style={{ color: '#a5b4fc' }}>Calculated TGPA</label>
                                <div className="text-5xl font-bold mt-2" style={{ color: '#f8fafc' }}>
                                    {tgpa}
                                </div>
                                <p className="text-xs mt-2 mb-4" style={{ color: '#94a3b8' }}>
                                    Based on {subjects.length} subjects • Total Credits: {subjects.reduce((sum, s) => sum + s.credits, 0)}
                                </p>

                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={downloadResultPDF}
                                        className="text-xs flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all border"
                                        style={{
                                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                            color: '#6ee7b7',
                                            borderColor: 'rgba(16, 185, 129, 0.2)'
                                        }}
                                    >
                                        <span>📄</span> Download Result
                                    </button>
                                    <button
                                        onClick={shareResult}
                                        className="text-xs flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all border"
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            color: '#a5b4fc',
                                            borderColor: 'rgba(99, 102, 241, 0.2)'
                                        }}
                                    >
                                        <span>📸</span> Share Result
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}
