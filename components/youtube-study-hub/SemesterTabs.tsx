'use client';

import React from 'react';
import { SemesterNumber } from '../../types';
import { BookOpen, Layers, Cpu, Sparkles } from 'lucide-react';

interface SemesterTabsProps {
  selectedSemester: SemesterNumber | 'all';
  onSelectSemester: (sem: SemesterNumber | 'all') => void;
  semesterCounts: Record<SemesterNumber, number>;
}

export const SemesterTabs: React.FC<SemesterTabsProps> = ({
  selectedSemester,
  onSelectSemester,
  semesterCounts
}) => {
  const semesters: { number: SemesterNumber; label: string; icon: React.ReactNode; subtitle: string }[] = [
    {
      number: 1,
      label: 'Semester 1',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
      subtitle: 'Computing, Maths & Electronics'
    },
    {
      number: 2,
      label: 'Semester 2',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      subtitle: 'C, Software Engg, DBMS & Discrete'
    },
    {
      number: 3,
      label: 'Semester 3',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      subtitle: 'OOP, DSA, Networks & Architecture'
    },
    {
      number: 4,
      label: 'Semester 4',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      subtitle: 'Java, DAA, AI, Aptitude & Minors'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {semesters.map((sem) => {
        const count = semesterCounts[sem.number] || 0;
        const isActive = selectedSemester === sem.number;

        return (
          <button
            key={sem.number}
            type="button"
            onClick={() => onSelectSemester(isActive ? 'all' : sem.number)}
            className={`group text-left p-4 sm:p-5 rounded-2xl border transition-all relative overflow-hidden backdrop-blur-md ${
              isActive
                ? 'bg-surface-elevated border-brand-500 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/30'
                : 'bg-surface-card/80 hover:bg-surface-card border-surface-border hover:border-surface-border-hover'
            }`}
          >
            {/* Top Accent Line when active */}
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 via-purple-400 to-brand-600" />
            )}

            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-surface-base flex items-center justify-center border border-surface-border group-hover:scale-105 transition-transform">
                {sem.icon}
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                isActive
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                  : 'bg-surface-base text-zinc-400 border border-surface-border'
              }`}>
                {count} {count === 1 ? 'Subject' : 'Subjects'}
              </span>
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-zinc-100 group-hover:text-white transition-colors">
              {sem.label}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
              {sem.subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
};
