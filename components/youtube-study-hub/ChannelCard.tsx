import React from 'react';
import { SubjectChannel } from '../../types';
import { ExternalLink, CheckCircle2, Globe, Sparkles, ListVideo } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';

interface ChannelCardProps {
  channel: SubjectChannel;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-surface-border-hover transition-all duration-300 relative group overflow-hidden">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-red-500/40 via-brand-500/40 to-transparent" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        {/* Channel Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-red-400 font-display font-black text-base shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            {channel.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={channel.logoUrl}
                alt={channel.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-red-950/40 border border-red-500/20 text-red-500 rounded-xl">
                <YoutubeIcon className="w-6 h-6 text-red-500" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-display font-bold text-base sm:text-lg text-zinc-100 group-hover:text-white transition-colors">
                {channel.name}
              </h4>
              <CheckCircle2 className="w-4 h-4 text-brand-400 fill-brand-400/20" />
            </div>

            {/* Language & Difficulty Level Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 bg-surface-elevated border border-surface-border px-2 py-0.5 rounded-md">
                <Globe className="w-2.5 h-2.5 text-zinc-400" />
                {channel.language}
              </span>
              <span className="text-[11px] font-semibold text-brand-300 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-md">
                {channel.level}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={channel.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold shadow-md shadow-red-600/20 hover:shadow-red-600/30 transition-all group-hover:translate-x-0.5 w-full sm:w-auto justify-center"
        >
          <YoutubeIcon className="w-4 h-4" />
          <span>Open Channel</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
        {channel.description}
      </p>

      {/* Why it is recommended (Callout Box) */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-surface-elevated/70 border border-surface-border flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-normal">
          <strong className="text-zinc-100 font-semibold block mb-0.5">Why We Recommend It:</strong>
          {channel.recommendationReason}
        </div>
      </div>

      {/* Featured Playlist if available */}
      {channel.featuredPlaylistUrl && (
        <div className="mt-3 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <ListVideo className="w-3.5 h-3.5 text-brand-400" />
            <span>Featured: {channel.playlistTitle || 'Full Course Playlist'}</span>
          </span>
          <a
            href={channel.featuredPlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 font-medium inline-flex items-center gap-1"
          >
            Watch Playlist ↗
          </a>
        </div>
      )}
    </div>
  );
};
