'use client';

import React, { useEffect } from 'react';
import { Subject } from '../../types';
import { ChannelList } from './ChannelList';
import { X, Award, Bookmark, ArrowUpRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface SubjectModalProps {
  subject: Subject | null;
  onClose: () => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({ subject, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!subject) return null;

  const subjectHref = `/youtube-study-hub/${subject.courseId}/semester-${subject.semester}/${subject.code.toLowerCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-surface-card border border-surface-border shadow-2xl shadow-black/80 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Top Accent Gradient */}
        <div className="h-1 bg-gradient-to-r from-brand-500 via-purple-400 to-brand-600 flex-shrink-0" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-surface-border/80 flex items-start justify-between gap-4 flex-shrink-0 bg-surface-card/95">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-lg">
                {subject.code}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-elevated text-zinc-300 border border-surface-border flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-brand-400" />
                {subject.courseId === 'btech' ? 'B.Tech' : 'BBA'} • Semester {subject.semester}
              </span>
              {subject.credits > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-elevated text-zinc-300 border border-surface-border flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  {subject.credits} Credits
                </span>
              )}
              {subject.electiveGroup && (
                <span className="text-[11px] font-medium text-purple-300 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Bookmark className="w-2.5 h-2.5" />
                  {subject.electiveGroup}
                </span>
              )}
            </div>

            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
              {subject.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              {subject.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={subjectHref}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-surface-elevated border border-transparent hover:border-surface-border transition-colors hidden sm:flex items-center gap-1 text-xs font-medium"
              title="Open full dedicated page"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-surface-elevated border border-transparent hover:border-surface-border transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          <ChannelList subject={subject} />
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-surface-border/60 bg-surface-elevated/40 flex items-center justify-between text-xs text-zinc-400 flex-shrink-0">
          <span>
            Curated by <strong className="text-zinc-300 font-semibold">OGEDU AI Academic Team</strong>
          </span>
          <Link
            href={subjectHref}
            className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1"
          >
            Dedicated Subject Page ↗
          </Link>
        </div>
      </div>
    </div>
  );
};
