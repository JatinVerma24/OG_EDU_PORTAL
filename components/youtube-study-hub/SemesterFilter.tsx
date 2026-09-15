'use client';

import React from 'react';
import { SemesterNumber, SubjectType } from '../../types';
import { Filter } from 'lucide-react';

interface SemesterFilterProps {
  selectedSemester: SemesterNumber | 'all';
  onSelectSemester: (sem: SemesterNumber | 'all') => void;
  selectedType: SubjectType | 'all';
  onSelectType: (type: SubjectType | 'all') => void;
}

const SUBJECT_TYPES: (SubjectType | 'all')[] = [
  'all',
  'Core',
  'Elective',
  'Lab',
  'Language',
  'Minor',
  'Aptitude'
];

export const SemesterFilter: React.FC<SemesterFilterProps> = ({
  selectedSemester,
  onSelectSemester,
  selectedType,
  onSelectType
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full">
      {/* Semester Dropdown / Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-1 hidden sm:inline">
          Semester:
        </span>
        {(['all', 1, 2, 3, 4] as const).map((sem) => {
          const isActive = selectedSemester === sem;
          return (
            <button
              key={sem}
              type="button"
              onClick={() => onSelectSemester(sem)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                  : 'bg-surface-card text-zinc-400 hover:text-zinc-200 border border-surface-border hover:border-surface-border-hover'
              }`}
            >
              {sem === 'all' ? 'All Semesters' : `Sem ${sem}`}
            </button>
          );
        })}
      </div>

      {/* Subject Type Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <div className="flex items-center gap-1 text-xs font-semibold text-zinc-500 mr-1">
          <Filter className="w-3 h-3 text-zinc-400" />
          <span className="hidden sm:inline">Type:</span>
        </div>
        {SUBJECT_TYPES.map((type) => {
          const isActive = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelectType(type)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                  : 'bg-surface-card/60 text-zinc-400 hover:text-zinc-300 border border-surface-border/60 hover:border-surface-border'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          );
        })}
      </div>
    </div>
  );
};
