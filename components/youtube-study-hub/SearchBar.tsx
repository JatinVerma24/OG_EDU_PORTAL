'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Try CSE101, Python Programming, DBMS...',
  totalResults
}) => {
  return (
    <div className="w-full relative">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-zinc-400">
          <Search className="w-5 h-5 text-brand-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-surface-card/90 hover:bg-surface-card focus:bg-surface-card border border-surface-border hover:border-surface-border-hover focus:border-brand-500 text-zinc-100 placeholder:text-zinc-500 rounded-2xl text-sm sm:text-base outline-none transition-all shadow-lg shadow-black/40 focus:ring-2 focus:ring-brand-500/20 backdrop-blur-xl"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-4 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-surface-elevated transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {value && totalResults !== undefined && (
        <div className="flex items-center justify-between text-xs text-zinc-400 mt-2 px-2">
          <span>
            Found <strong className="text-brand-400">{totalResults}</strong> matching {totalResults === 1 ? 'subject' : 'subjects'}
          </span>
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-zinc-400 hover:text-brand-300 underline"
          >
            Reset search
          </button>
        </div>
      )}
    </div>
  );
};
