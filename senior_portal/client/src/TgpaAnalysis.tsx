import React, { useMemo } from 'react'
import jsPDF from 'jspdf'

import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, ReferenceLine
} from 'recharts'
import html2canvas from 'html2canvas'

interface Subject {
    id: string
    name: string
    credits: number
    marks: number
    classAvg?: number
    highest?: number
}

interface AnalysisProps {
    subjects: Subject[]
    getGradeInfo: (marks: number, classAvg?: number) => { grade: string, point: number, color: string, hex?: string }
    useRelative: boolean
}

const TgpaAnalysis: React.FC<AnalysisProps> = ({ subjects, getGradeInfo, useRelative }) => {

    // 1. Prepare Grade Distribution Data
    const gradeDistribution = useMemo(() => {
        const counts: Record<string, number> = { 'O': 0, 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C': 0, 'F': 0 }
        subjects.forEach(sub => {
            const { grade } = getGradeInfo(sub.marks, useRelative ? sub.classAvg : undefined)
            if (counts[grade] !== undefined) counts[grade]++
        })
        return Object.keys(counts).map(grade => ({
            name: grade,
            count: counts[grade],
            fill: grade === 'O' ? '#10b981' : grade === 'F' ? '#ef4444' : '#6366f1'
        }))
    }, [subjects, useRelative, getGradeInfo])

    // 2. Prepare CGPA Trend Data (from localStorage)
    const cgpaTrend = useMemo(() => {
        const saved = localStorage.getItem('cgpa_semesters')
        if (!saved) return []
        try {
            const sems: { id: number, tgpa: number }[] = JSON.parse(saved)
            return sems.filter(s => s.tgpa > 0).map(s => ({
                name: `Sem ${s.id}`,
                tgpa: s.tgpa
            }))
        } catch (e) {
            return []
        }
    }, [])

    // 3. Stats
    const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0)
    const bestSubject = subjects.reduce((prev, current) => (prev.marks > current.marks) ? prev : current, subjects[0])
    const worstSubject = subjects.reduce((prev, current) => (prev.marks < current.marks) ? prev : current, subjects[0])

    const downloadPDF = async () => {
        const dashboard = document.getElementById('analysis-dashboard')
        if (!dashboard) return

        try {
            const canvas = await html2canvas(dashboard, {
                backgroundColor: '#0f172a',
                scale: 2,
                useCORS: true,
                ignoreElements: (element) => element.tagName === 'BUTTON',
                logging: false,
                onclone: (clonedDoc) => {
                    const allElements = clonedDoc.querySelectorAll('*')
                    allElements.forEach((el) => {
                        const style = window.getComputedStyle(el)
                        const props: (keyof CSSStyleDeclaration)[] = ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke']

                        props.forEach(prop => {
                            const val = style[prop as any] as string
                            if (val && (val.includes('oklch') || val.includes('oklab'))) {
                                // Fallback sanitation
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

            // A4 dimensions in mm
            const pdf = new jsPDF('p', 'mm', 'a4')
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height

            // Calculate ratio to fit width with margin
            const margin = 10
            const imgWidthAvail = pdfWidth - (margin * 2)
            const ratioAvail = imgWidthAvail / imgWidth

            // Background
            pdf.setFillColor(15, 23, 42) // #0f172a
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F')

            // Add Image
            pdf.addImage(imgData, 'PNG', margin, 20, imgWidth * ratioAvail, imgHeight * ratioAvail)
            pdf.save('JVOG-Analysis-Report.pdf')
        } catch (err) {
            console.error("PDF generation failed", err)
            // alert("Failed to generate PDF") 
        }
    }

    // Share Handler
    const shareAnalysis = async () => {
        const dashboard = document.getElementById('analysis-dashboard')
        if (!dashboard) return

        try {
            // Add loading state feedback if possible, or just proceed
            const canvas = await html2canvas(dashboard, {
                backgroundColor: '#0f172a', // Enforce dark bg for snapshot
                scale: 2,
                useCORS: true,
                ignoreElements: (element) => element.tagName === 'BUTTON', // Hide buttons
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
                    const file = new File([blob], "analysis-report.png", { type: "image/png" })

                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            title: 'My Academic Analysis',
                            text: 'Check out my detailed academic performance analysis!',
                            files: [file]
                        })
                    } else {
                        // Fallback if files sharing not supported
                        downloadImage(image, 'analysis-report.png')
                    }
                } catch (shareError: any) {
                    // unexpected share error or user cancellation
                    if (shareError?.name !== 'AbortError') {
                        console.warn("Share API error, falling back to download", shareError)
                        downloadImage(image, 'analysis-report.png')
                    }
                }
            } else {
                downloadImage(image, 'analysis-report.png')
            }
        } catch (err) {
            console.error("Capture failed", err)
            alert("Failed to generate report picture.")
        }
    }

    return (
        <div id="analysis-dashboard" className="space-y-6 animate-fade-in" style={{ color: 'rgb(248, 250, 252)' }}>

            {/* Header / Actions */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #fb923c, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    Statistical Analysis 📊
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={downloadPDF}
                        className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                        📄 Download Report
                    </button>
                    <button
                        onClick={shareAnalysis}
                        className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 border border-[rgba(203,213,225,0.4)]"
                        style={{ color: 'rgb(248, 250, 252)' }}
                    >
                        📸 Share
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Credits" value={totalCredits} icon="📚" colorHex="#60a5fa" bgHex="rgba(59, 130, 246, 0.1)" borderHex="rgba(59, 130, 246, 0.2)" />
                <StatCard label="Best Performance" value={bestSubject?.name || '-'} sub={bestSubject ? `${bestSubject.marks} Marks` : ''} icon="🏆" colorHex="#facc15" bgHex="rgba(234, 179, 8, 0.1)" borderHex="rgba(234, 179, 8, 0.2)" />
                <StatCard label="Needs Improv." value={worstSubject?.name || '-'} sub={worstSubject ? `${worstSubject.marks} Marks` : ''} icon="⚠️" colorHex="#f87171" bgHex="rgba(239, 68, 68, 0.1)" borderHex="rgba(239, 68, 68, 0.2)" />
                <StatCard label="Subjects" value={subjects.length} icon="📝" colorHex="#c084fc" bgHex="rgba(168, 85, 247, 0.1)" borderHex="rgba(168, 85, 247, 0.2)" />
            </div>

            {/* Grade Distribution Chart */}
            <div className="glass-panel p-6 rounded-xl border border-[rgba(203,213,225,0.4)]">
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: '#64748b' }}>Grade Distribution</h4>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={gradeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* CGPA Trend Chart */}
            <div className="glass-panel p-6 rounded-xl border border-[rgba(203,213,225,0.4)]">
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: '#64748b' }}>Overall Performance Trend (CGPA)</h4>
                {cgpaTrend.length > 1 ? (
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={cgpaTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 10]} stroke="#64748b" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', color: '#f8fafc' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                                <ReferenceLine y={8} stroke="rgba(16, 185, 129, 0.5)" strokeDasharray="3 3" label={{ value: 'Good (8.0)', fill: '#10b981', fontSize: 10 }} />
                                <Line type="monotone" dataKey="tgpa" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-32 flex items-center justify-center text-sm italic bg-white/5 rounded-lg border border-dashed border-[rgba(203,213,225,0.4)]" style={{ color: '#64748b' }}>
                        Add more semesters in "CGPA Calculator" to see trend analysis
                    </div>
                )}
            </div>

            {/* Detailed Subject List */}
            <div className="glass-panel rounded-xl overflow-hidden border border-[rgba(203,213,225,0.4)]">
                <div className="p-4 bg-white/5 border-b border-[rgba(203,213,225,0.4)] flex justify-between items-center">
                    <h4 className="text-sm font-semibold" style={{ color: '#f8fafc' }}>Subject Breakdown</h4>
                    <span className="text-xs" style={{ color: '#64748b' }}>Detailed view</span>
                </div>
                <div className="divide-y divide-[rgba(203,213,225,0.4)]">
                    {subjects.map((sub, idx) => {
                        const { grade, hex } = getGradeInfo(sub.marks, useRelative ? sub.classAvg : undefined)
                        return (
                            <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono" style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)', color: '#94a3b8' }}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm line-clamp-1" style={{ color: '#f8fafc' }}>{sub.name || 'Untitled Subject'}</div>
                                        <div className="text-xs" style={{ color: '#64748b' }}>{sub.credits} Credits • {sub.marks} Marks</div>
                                    </div>
                                </div>
                                <div className="text-lg font-bold" style={{ color: hex || '#fff' }}>
                                    {grade}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

const StatCard = ({ label, value, sub, icon, colorHex, bgHex, borderHex }: { label: string, value: string | number, sub?: string, icon: string, colorHex: string, bgHex: string, borderHex: string }) => (
    <div className="p-4 rounded-xl border relative overflow-hidden group" style={{ borderColor: borderHex, backgroundColor: bgHex }}>
        <div className="relative z-10">
            <div className="text-xs opacity-70 uppercase tracking-wider mb-1" style={{ color: colorHex }}>{label}</div>
            <div className="text-xl md:text-2xl font-bold truncate" style={{ color: '#f8fafc' }} title={String(value)}>{value}</div>
            {sub && <div className="text-[10px] opacity-60 mt-1" style={{ color: '#94a3b8' }}>{sub}</div>}
        </div>
        <div className="absolute -bottom-2 -right-2 text-4xl opacity-10 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
    </div>
)

export default TgpaAnalysis
