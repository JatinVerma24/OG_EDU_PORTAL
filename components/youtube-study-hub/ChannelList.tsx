'use client';

import React from 'react';
import { Subject } from '../../types';
import { ChannelCard } from './ChannelCard';
import { Search, ListVideo, ExternalLink, Info } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';
import { getYoutubeSearchUrl, getYoutubePlaylistSearchUrl } from '../../lib/youtube/search';

interface ChannelListProps {
  subject: Subject;
}

export const ChannelList: React.FC<ChannelListProps> = ({ subject }) => {
  const ytSearchUrl = getYoutubeSearchUrl(subject.code, subject.name);
  const ytPlaylistUrl = getYoutubePlaylistSearchUrl(subject.code, subject.name);
  const channels = subject.channels || [];

  return (
    <div className="space-y-6 w-full">
      {/* Recommended Channels List */}
      {channels.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg sm:text-xl text-zinc-100 flex items-center gap-2">
              <span>Recommended YouTube Channels</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                {channels.length} Verified
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {channels.map((channel) => (
              <ChannelCard key={channel.channelId} channel={channel} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border text-center space-y-3">
          <Info className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="font-bold text-zinc-200">No Curated Channels Added Yet</h4>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Our academic team is currently evaluating educators for {subject.code}. Use the YouTube search tools below to find verified student lectures and playlists immediately.
          </p>
        </div>
      )}

      {/* YouTube Search Fallback Tools */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <YoutubeIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm sm:text-base text-zinc-100">
              Live YouTube Search Tools
            </h4>
            <p className="text-xs text-zinc-400">
              Directly query YouTube for exact {subject.code} university syllabus lectures and full-course playlists.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* 1. Search on YouTube */}
          <a
            href={ytSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-surface-elevated hover:bg-zinc-800/80 border border-surface-border hover:border-zinc-700 text-zinc-200 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-brand-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-semibold text-zinc-100">Search on YouTube</div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {subject.code} {subject.name.slice(0, 18)}...
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* 2. Find Playlists */}
          <a
            href={ytPlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-surface-elevated hover:bg-zinc-800/80 border border-surface-border hover:border-zinc-700 text-zinc-200 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <ListVideo className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-semibold text-zinc-100">Find Playlists</div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {subject.code} playlist
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>
      </div>
    </div>
  );
};
