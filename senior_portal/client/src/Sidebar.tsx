import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './context/ThemeContext'

interface SidebarProps {
    activeTab: 'checker' | 'tgpa' | 'attendance' | 'cgpa_calc' | 'percentage'
    setActiveTab: (tab: 'checker' | 'tgpa' | 'attendance' | 'cgpa_calc' | 'percentage') => void
    isMobileOpen: boolean
    toggleMobile: () => void
}

const menuItems = [
    { id: 'checker', label: 'Pass Checker', icon: '📝' },
    { id: 'tgpa', label: 'TGPA Calculator', icon: '🧮' },
    { id: 'cgpa_calc', label: 'CGPA Calculator', icon: '🎓' },
    { id: 'percentage', label: 'Percentage', icon: '📐' },
    { id: 'attendance', label: 'Attendance', icon: '📉' },
] as const

const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, toggleMobile }: SidebarProps) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-md"
                    onClick={toggleMobile}
                />
            )}

            {/* Floating Sidebar Container */}
            <motion.aside
                className={`fixed md:relative z-50 h-full w-80 flex flex-col transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="h-full m-4 md:m-6 flex flex-col glass-panel overflow-hidden border-glow">
                    {/* Header */}
                    <div className="p-8 pb-4 relative">
                        <div className="absolute top-0 right-0 p-4 opacity-50 pointer-events-none">
                            <div className="w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl rounded-full" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-indigo-950 dark:text-white mb-1 transition-colors">
                            JVOG
                        </h1>
                        <h2 className="text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase opacity-90 transition-colors">
                            Result Checker
                        </h2>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id)
                                    if (window.innerWidth < 768) toggleMobile()
                                }}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${activeTab === item.id
                                    ? 'text-white'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <span className={`text-xl relative z-10 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-semibold relative z-10 tracking-wide text-sm">{item.label}</span>

                                {activeTab === item.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
                                    />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 mt-auto">
                        <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm text-slate-700 dark:text-slate-300"
                            >
                                <span className="font-medium">Appearance</span>
                                <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                            </button>

                            {/* Socials */}
                            <div className="flex justify-center gap-3 pt-2 border-t border-white/5">
                                <SocialLink href="https://www.youtube.com/@JatinVermaTHE-OG/videos" icon="youtube" color="hover:text-red-500" />
                                <SocialLink href="https://www.instagram.com/jatinnverrmaa/" icon="instagram" color="hover:text-pink-500" />
                                <SocialLink href="https://www.linkedin.com/in/jatinverma24/" icon="linkedin" color="hover:text-blue-500" />
                            </div>
                        </div>
                        <p className="text-[10px] text-center text-slate-600 mt-4 font-medium tracking-wide">
                            DESIGNED BY JATIN VERMA
                        </p>
                    </div>
                </div>
            </motion.aside>
        </>
    )
}

const SocialLink = ({ href, icon, color }: { href: string, icon: string, color: string }) => {
    // Simple SVG paths for icons
    const icons: Record<string, React.ReactNode> = {
        youtube: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
        instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />,
        linkedin: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg bg-black/5 dark:bg-white/5 ${color} transition-all duration-300 hover:scale-110 hover:bg-black/10 dark:hover:bg-white/10`}
        >
            <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24">{icons[icon]}</svg>
        </a>
    )
}

export default Sidebar
