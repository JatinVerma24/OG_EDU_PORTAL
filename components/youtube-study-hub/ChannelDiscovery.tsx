'use client';

import React, { useState } from 'react';
import { ChannelCategory } from '../../types';
import { CHANNELS_DIRECTORY } from '../../data/channels/directory';
import { CHANNEL_CATEGORIES } from '../../lib/youtube/channels';
import { ExternalLink, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';

export const ChannelDiscovery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ChannelCategory>('Computer Science');

  const filteredChannels = CHANNELS_DIRECTORY.filter(
    (c) => c.category === activeCategory
  );

  return (
    <section className="mt-16 pt-12 border-t border-surface-border/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-brand-500/20">
            <Sparkles className="w-3 h-3" />
            Top Educator Directory
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-zinc-100">
            Recommended YouTube Channels
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Browse verified, trusted YouTube educators curated for university engineering & commerce students.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-8">
        {CHANNEL_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-500 text-zinc-950 shadow-md shadow-brand-500/20'
                  : 'bg-surface-card hover:bg-surface-elevated text-zinc-400 hover:text-zinc-200 border border-surface-border'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className="p-5 rounded-2xl bg-surface-card border border-surface-border hover:border-surface-border-hover transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-red-400 flex-shrink-0">
                    <YoutubeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-bold text-base text-zinc-100 group-hover:text-white transition-colors">
                        {channel.name}
                      </h4>
                      {channel.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 fill-brand-400/20" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" />
                        {channel.language}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-elevated text-zinc-400 border border-surface-border font-medium">
                        {channel.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                {channel.description}
              </p>

              {channel.popularSubjects && channel.popularSubjects.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {channel.popularSubjects.slice(0, 3).map((sub, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-surface-elevated text-zinc-300 border border-surface-border"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <a
              href={channel.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-surface-elevated hover:bg-red-600 hover:text-white text-zinc-300 text-xs font-semibold border border-surface-border hover:border-red-600 transition-all w-full mt-auto"
            >
              <YoutubeIcon className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
              <span>Visit YouTube Channel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
