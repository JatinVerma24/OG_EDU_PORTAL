'use client';

import React from 'react';
import { Search, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';
import { getYoutubeQuerySearchUrl } from '../../lib/youtube/search';

interface EmptyStateProps {
  type: 'no-subjects-found' | 'bba-coming-soon' | 'no-channels';
  query?: string;
  subjectName?: string;
  subjectCode?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  query = '',
  subjectName = '',
  subjectCode = '',
  onReset
}) => {
  // Scenario 1: BBA Coming Soon
  if (type === 'bba-coming-soon') {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-surface-border text-center max-w-2xl mx-auto my-8 space-y-5 relative overflow-hidden backdrop-blur-xl">
        {/* Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-brand-500 to-amber-500" />

        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
          <Clock className="w-7 h-7" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            Under Academic Review
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-zinc-100">
            BBA Curriculum Coming Soon
          </h3>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg mx-auto">
          Our team is currently verifying and mapping the official Bachelor of Business Administration (BBA) syllabus with real commerce, economics, and management YouTube channels.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 bg-surface-elevated px-3 py-1.5 rounded-lg border border-surface-border">
            <span>✅ Scalable Schema Ready</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-elevated px-3 py-1.5 rounded-lg border border-surface-border">
            <span>✅ Semesters 1 to 4 Ready</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-elevated px-3 py-1.5 rounded-lg border border-surface-border">
            <span>✅ Verified Channels Registry Mapped</span>
          </div>
        </div>
      </div>
    );
  }

  // Scenario 2: No subjects found with search query
  if (type === 'no-subjects-found') {
    const fallbackYtUrl = getYoutubeQuerySearchUrl(query ? `${query} university lecture` : 'engineering subject lectures');

    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-surface-border text-center max-w-xl mx-auto my-8 space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mx-auto">
          <Search className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-zinc-100">
            No Subjects Found {query && <span>for &ldquo;{query}&rdquo;</span>}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We couldn&apos;t find a course matching your search. Try searching by:
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1 text-xs text-zinc-300">
            <span className="px-2.5 py-1 rounded-md bg-surface-elevated border border-surface-border font-mono">Course Code (e.g. CSE101)</span>
            <span className="px-2.5 py-1 rounded-md bg-surface-elevated border border-surface-border">Full Subject Name</span>
            <span className="px-2.5 py-1 rounded-md bg-surface-elevated border border-surface-border">Keyword (Python, DBMS, Maths)</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 rounded-xl bg-surface-elevated hover:bg-zinc-800 border border-surface-border text-zinc-200 text-xs font-semibold transition-all w-full sm:w-auto"
            >
              Clear Filters
            </button>
          )}

          {query && (
            <a
              href={fallbackYtUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/20 transition-all w-full sm:w-auto"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>Search &ldquo;{query}&rdquo; on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    );
  }

  // Scenario 3: Subject has no channels
  const subjectSearchUrl = getYoutubeQuerySearchUrl(`${subjectCode} ${subjectName}`);

  return (
    <div className="p-8 rounded-2xl bg-surface-card border border-surface-border text-center max-w-lg mx-auto my-6 space-y-4">
      <div className="w-12 h-12 rounded-xl bg-surface-elevated text-zinc-400 flex items-center justify-center mx-auto">
        <YoutubeIcon className="w-6 h-6 text-red-400" />
      </div>

      <div>
        <h4 className="font-bold text-lg text-zinc-200">No Curated Channels Added Yet</h4>
        <p className="text-xs text-zinc-400 mt-1">
          You can still find great student lectures and playlists directly on YouTube.
        </p>
      </div>

      <a
        href={subjectSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all"
      >
        <YoutubeIcon className="w-4 h-4" />
        <span>Search {subjectCode || 'this subject'} on YouTube</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};
