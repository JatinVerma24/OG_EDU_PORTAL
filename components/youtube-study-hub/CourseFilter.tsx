'use client';

import React from 'react';
import { CourseId } from '../../types';
import { GraduationCap, Briefcase } from 'lucide-react';

interface CourseFilterProps {
  selectedCourse: CourseId;
  onSelectCourse: (course: CourseId) => void;
}

export const CourseFilter: React.FC<CourseFilterProps> = ({
  selectedCourse,
  onSelectCourse
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-surface-card border border-surface-border rounded-xl">
      <button
        type="button"
        onClick={() => onSelectCourse('btech')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
          selectedCourse === 'btech'
            ? 'bg-brand-500 text-zinc-950 shadow-md shadow-brand-500/20'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-elevated'
        }`}
      >
        <GraduationCap className="w-4 h-4" />
        <span>B.Tech</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20 font-mono">CSE</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectCourse('bba')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
          selectedCourse === 'bba'
            ? 'bg-brand-500 text-zinc-950 shadow-md shadow-brand-500/20'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-elevated'
        }`}
      >
        <Briefcase className="w-4 h-4" />
        <span>BBA</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">Soon</span>
      </button>
    </div>
  );
};
