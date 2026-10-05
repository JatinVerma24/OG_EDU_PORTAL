'use client';

import React from 'react';
import { CourseId } from '../../types';
import { Terminal, Briefcase, GraduationCap } from 'lucide-react';

interface CourseFilterProps {
  selectedCourse: CourseId | 'all';
  onSelectCourse: (course: CourseId | 'all') => void;
}

export const CourseFilter: React.FC<CourseFilterProps> = ({
  selectedCourse,
  onSelectCourse
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-card border border-surface-border rounded-xl">
      <button
        type="button"
        onClick={() => onSelectCourse('bca')}
        className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
          selectedCourse === 'bca'
            ? 'bg-brand-500 text-zinc-950 shadow-md shadow-brand-500/20'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-elevated'
        }`}
      >
        <Terminal className="w-4 h-4" />
        <span>BCA</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono font-bold">1st Year</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectCourse('bba')}
        className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
          selectedCourse === 'bba'
            ? 'bg-brand-500 text-zinc-950 shadow-md shadow-brand-500/20'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-elevated'
        }`}
      >
        <Briefcase className="w-4 h-4" />
        <span>BBA</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono font-bold">1st Year</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectCourse('btech')}
        className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
          selectedCourse === 'btech'
            ? 'bg-brand-500 text-zinc-950 shadow-md shadow-brand-500/20'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-elevated'
        }`}
      >
        <GraduationCap className="w-4 h-4" />
        <span>B.Tech</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono">CSE</span>
      </button>
    </div>
  );
};
