'use client';

import React from 'react';
import { CourseId, SemesterNumber } from '../../types';
import { BookOpen, Layers, Cpu, Sparkles } from 'lucide-react';

interface SemesterTabsProps {
  selectedSemester: SemesterNumber | 'all';
  onSelectSemester: (sem: SemesterNumber | 'all') => void;
  semesterCounts: Record<SemesterNumber, number>;
  courseId?: CourseId | 'all';
}

export const SemesterTabs: React.FC<SemesterTabsProps> = ({
  selectedSemester,
  onSelectSemester,
  semesterCounts,
  courseId = 'bca'
}) => {
  const getSubtitle = (sem: SemesterNumber): string => {
    if (courseId === 'bca') {
      if (sem === 1) return 'C, FIT, Discrete, EVS & Comm (7 Subjects)';
      if (sem === 2) return 'C++ OOPs, DSA & Algorithms';
      if (sem === 3) return 'Web Tech, Database & Operating Systems';
      return 'Java, Cloud & Advanced BCA';
    }
    if (courseId === 'bba') {
      if (sem === 1) return 'Management, Financial Acct & Ethics';
      if (sem === 2) return 'Cost Acct, Marketing & Research Method';
      if (sem === 3) return 'Finance, HRM, Operations & OB';
      return 'Strategy, Law, Consumer Behaviour';
    }
    // btech
    if (sem === 1) return 'Computing, Python, Maths & Electronics';
    if (sem === 2) return 'C, Software Engg, DBMS & Discrete';
    if (sem === 3) return 'OOP, DSA, Networks & Architecture';
    return 'Java, DAA, AI, Aptitude & Minors';
  };

  const semesters: { number: SemesterNumber; label: string; icon: React.ReactNode }[] = [
    {
      number: 1,
      label: 'Semester 1',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />
    },
    {
      number: 2,
      label: 'Semester 2',
      icon: <Layers className="w-4 h-4 text-cyan-400" />
    },
    {
      number: 3,
      label: 'Semester 3',
      icon: <Cpu className="w-4 h-4 text-purple-400" />
    },
    {
      number: 4,
      label: 'Semester 4',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {semesters.map((sem) => {
        const count = semesterCounts[sem.number] || 0;
        const isActive = selectedSemester === sem.number;
        const subtitle = getSubtitle(sem.number);

        return (
          <button
            key={sem.number}
            type="button"
            onClick={() => onSelectSemester(isActive ? 'all' : sem.number)}
            className={`group text-left p-3.5 sm:p-5 rounded-2xl border transition-all relative overflow-hidden backdrop-blur-md ${
              isActive
                ? 'bg-surface-elevated border-brand-500 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/30'
                : 'bg-surface-card/80 hover:bg-surface-card border-surface-border hover:border-surface-border-hover'
            }`}
          >
            {/* Top Accent Line when active */}
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 via-purple-400 to-brand-600" />
            )}

            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-base flex items-center justify-center border border-surface-border group-hover:scale-105 transition-transform">
                {sem.icon}
              </div>
              <span className={`text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                isActive
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                  : 'bg-surface-base text-zinc-400 border border-surface-border'
              }`}>
                {count} {count === 1 ? 'Subject' : 'Subjects'}
              </span>
            </div>

            <h3 className="font-display font-bold text-sm sm:text-base lg:text-lg text-zinc-100 group-hover:text-white transition-colors">
              {sem.label}
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 line-clamp-1">
              {subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
};
