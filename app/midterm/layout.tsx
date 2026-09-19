'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Calculator, Calendar, ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export default function MidtermLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/midterm', label: 'Overview', icon: Sparkles, color: 'text-amber-400' },
    { href: '/midterm/calculator', label: 'Safe Marks Predictor', icon: Calculator, color: 'text-brand-400' },
    { href: '/midterm/planner', label: '72h Study Planner', icon: Calendar, color: 'text-emerald-400' },
    { href: '/midterm/attendance', label: 'Hall Ticket Checker', icon: ShieldCheck, color: 'text-sky-400' },
    { href: '/midterm/cheat-sheets', label: '1-Page Cheat Sheets', icon: FileText, color: 'text-rose-400' },
  ];

  return (
    <div className="min-h-screen bg-surface-base text-zinc-100 flex flex-col selection:bg-brand-500/20 selection:text-brand-300">
      {/* Ambient background blur */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-surface-base/80 border-b border-surface-border print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors px-2.5 py-1.5 rounded-lg border border-surface-border bg-surface-card/60 hover:border-zinc-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Main Portal</span>
              </a>

              <Link href="/midterm" className="flex items-center gap-2 font-display font-bold text-base sm:text-lg text-white">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-brand-500 flex items-center justify-center text-white text-sm shadow-lg shadow-rose-500/20">
                  🔥
                </span>
                <span>
                  MIDTERM<span className="text-brand-400">2026</span>
                </span>
              </Link>
            </div>

            {/* Quick Badge */}
            <div className="hidden md:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Mid-Term Survival Kit &middot; 100% Free
              </span>
            </div>

            {/* External Links */}
            <div className="flex items-center gap-2 text-xs">
              <a
                href="/youtube-study-hub"
                className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-elevated transition-colors border border-transparent hover:border-surface-border hidden sm:inline-flex items-center gap-1"
              >
                Study Hub
              </a>
              <a
                href="/blog"
                className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-elevated transition-colors border border-transparent hover:border-surface-border hidden sm:inline-flex items-center gap-1"
              >
                All Guides
              </a>
            </div>
          </div>

          {/* Sub-Tabs Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-3 pt-1 text-xs sm:text-sm font-medium border-t border-surface-border/40 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-surface-elevated text-white border border-surface-border shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-surface-card/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1 relative z-10">{children}</main>

      {/* Compliance Footer */}
      <footer className="mt-20 border-t border-surface-border bg-surface-card/40 backdrop-blur-md py-12 text-center text-xs text-zinc-500 relative z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-zinc-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>&bull;</span>
            <Link href="/midterm" className="hover:text-white transition-colors">Mid-Term Hub</Link>
            <span>&bull;</span>
            <Link href="/midterm/calculator" className="hover:text-white transition-colors">Safe Score Calculator</Link>
            <span>&bull;</span>
            <Link href="/midterm/planner" className="hover:text-white transition-colors">72h Planner</Link>
            <span>&bull;</span>
            <Link href="/midterm/attendance" className="hover:text-white transition-colors">Hall Ticket Checker</Link>
            <span>&bull;</span>
            <Link href="/midterm/cheat-sheets" className="hover:text-white transition-colors">Cheat Sheets</Link>
            <span>&bull;</span>
            <a href="/tools/cgpa-calculator" className="hover:text-white transition-colors">CGPA Tool</a>
            <span>&bull;</span>
            <a href="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</a>
            <span>&bull;</span>
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <span>&bull;</span>
            <a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
          </div>
          <p>&copy; {new Date().getFullYear()} OGEDU AI &middot; Designed and Engineered for University Students Nationwide.</p>
          <p className="text-[11px] text-zinc-600 max-w-xl mx-auto">
            Calculations are based on standard university continuous assessment and examination guidelines (UGC CBCS framework). Always cross-reference with your official university portal.
          </p>
        </div>
      </footer>
    </div>
  );
}
