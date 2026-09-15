'use client';

import React from 'react';
import Link from 'next/link';
import { Subject } from '../../types';
import { ArrowRight, Award, Bookmark } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';

interface SubjectCardProps {
  subject: Subject;
  onSelect?: (subject: Subject) => void;
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Core: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Elective: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  Lab: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  Language: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  Minor: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Aptitude: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' }
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onSelect }) => {
  const typeStyle = TYPE_COLORS[subject.type] || TYPE_COLORS.Core;
  const channelCount = subject.channels?.length || 0;
  const subjectHref = `/youtube-study-hub/${subject.courseId}/semester-${subject.semester}/${subject.code.toLowerCase()}`;

  return (
    <div className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-surface-border-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 overflow-hidden">
      {/* Top subtle highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-brand-500/40 transition-colors" />

      <div>
        {/* Header Tags: Code & Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-lg">
            {subject.code}
          </span>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}
            >
              {subject.type}
            </span>
            {subject.credits > 0 && (
              <span className="text-[11px] font-medium text-zinc-400 bg-surface-elevated border border-surface-border px-2 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3 text-zinc-400" />
                {subject.credits} Cr
              </span>
            )}
          </div>
        </div>

        {/* Subject Title */}
        <h3 className="font-display font-bold text-lg text-zinc-100 group-hover:text-white transition-colors leading-snug mb-2">
          {subject.name}
        </h3>

        {/* Elective Group Basket Label if present */}
        {subject.electiveGroup && (
          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-300/80 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded-md mb-2">
            <Bookmark className="w-2.5 h-2.5" />
            <span>{subject.electiveGroup}</span>
          </div>
        )}

        {/* Description snippet */}
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {subject.description}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
          <YoutubeIcon className="w-4 h-4 text-red-500" />
          <span>
            {channelCount > 0 ? (
              <>
                <strong className="text-zinc-200">{channelCount}</strong> Recommended {channelCount === 1 ? 'Channel' : 'Channels'}
              </>
            ) : (
              <span className="text-zinc-500">Search available</span>
            )}
          </span>
        </div>

        {onSelect ? (
          <button
            type="button"
            onClick={() => onSelect(subject)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 group-hover:translate-x-0.5 transition-all"
          >
            <span>View Channels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            href={subjectHref}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 group-hover:translate-x-0.5 transition-all"
          >
            <span>View Channels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
