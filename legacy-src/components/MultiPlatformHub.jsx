import { useState } from 'react';
import {
  Play, ExternalLink, ThumbsUp, Heart, Share2,
  MessageCircle, Users, RefreshCw, Eye, Clock,
} from 'lucide-react';
import { CATEGORIES, PLATFORM_META, PLATFORM_CONTENT } from '../data/platformData';

// ─── Platform badge icon (SVG path from Simple Icons) ────────────────────────
function PlatformIcon({ platform, size = 14 }) {
  const meta = PLATFORM_META[platform];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={meta.text}>
      <path d={meta.path} />
    </svg>
  );
}

function PlatformBadge({ platform, pulse = false }) {
  const meta = PLATFORM_META[platform];
  const isGradient = meta.bg.startsWith('linear');
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-heading font-800 uppercase tracking-wider px-2.5 py-1 rounded-full"
      style={{
        background: meta.bg,
        color: meta.text,
      }}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
      )}
      <PlatformIcon platform={platform} size={10} />
      {meta.name}
    </span>
  );
}

function SyncBadge({ syncedAt }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-body text-emerald-600 dark:text-emerald-400">
      <RefreshCw size={9} className="animate-spin" style={{ animationDuration: '3s' }} />
      Auto-synced · {syncedAt}
    </span>
  );
}

// ─── YouTube Card ─────────────────────────────────────────────────────────────
function YouTubeCard({ data }) {
  const isLive = data.duration === 'LIVE';
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-supreme-deep shadow-card hover:shadow-card-hover transition-all duration-300 group h-full">
      <div className="relative aspect-video overflow-hidden">
        <img src={data.thumb} alt={data.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg">
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          {isLive ? (
            <span className="flex items-center gap-1 bg-[#FF0000] text-white text-[10px] font-heading font-800 uppercase px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" /> Live
            </span>
          ) : (
            <span className="bg-black/75 text-white text-[11px] px-2 py-0.5 rounded font-body">{data.duration}</span>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <PlatformBadge platform="youtube" pulse={isLive} />
          <span className="text-[11px] text-supreme-mid font-body flex items-center gap-1">
            <Clock size={10} /> {data.postedAt}
          </span>
        </div>
        <h3 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-sm leading-snug line-clamp-2">
          {data.title}
        </h3>
        <div className="mt-auto flex items-center justify-between text-xs font-body text-supreme-mid">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye size={11} /> {data.views}</span>
            <span className="flex items-center gap-1"><ThumbsUp size={11} /> {data.likes}</span>
          </div>
          <a href={data.url} className="flex items-center gap-1 text-[#FF0000] font-heading font-700 hover:underline text-[11px]">
            Watch <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Facebook Card ────────────────────────────────────────────────────────────
function FacebookCard({ data }) {
  const total = data.reactions.like + data.reactions.love + data.reactions.wow;
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-supreme-deep shadow-card hover:shadow-card-hover transition-all duration-300 group h-full">
      {data.thumb && (
        <div className="aspect-video overflow-hidden">
          <img src={data.thumb} alt="Facebook post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <PlatformBadge platform="facebook" />
          <span className="text-[11px] text-supreme-mid font-body flex items-center gap-1">
            <Clock size={10} /> {data.postedAt}
          </span>
        </div>
        <p className="font-body text-xs text-supreme-dark dark:text-supreme-light/80 leading-relaxed line-clamp-3">
          {data.caption}
        </p>
        {/* Reactions row */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {['👍','❤️','😲'].map((e, i) => (
              <span key={i} className="text-sm leading-none">{e}</span>
            ))}
          </div>
          <span className="text-xs font-body text-supreme-mid">{total.toLocaleString()}</span>
          <span className="ml-auto text-xs font-body text-supreme-mid flex items-center gap-2">
            <span className="flex items-center gap-0.5"><MessageCircle size={10} /> {data.comments.toLocaleString()}</span>
            <span className="flex items-center gap-0.5"><Share2 size={10} /> {data.shares.toLocaleString()}</span>
          </span>
        </div>
        <a href={data.url} className="mt-auto self-start flex items-center gap-1 text-[#1877F2] font-heading font-700 text-[11px] hover:underline">
          View on Facebook <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

// ─── TikTok Card ──────────────────────────────────────────────────────────────
function TikTokCard({ data }) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-supreme-deep shadow-card hover:shadow-card-hover transition-all duration-300 group h-full">
      {/* Portrait thumbnail in a phone-style frame */}
      <div className="relative bg-black flex items-center justify-center overflow-hidden" style={{ aspectRatio: '9/14' }}>
        <img src={data.thumb} alt="TikTok reel" className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Play size={20} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
        {/* Stats on top of video */}
        <div className="absolute right-3 bottom-16 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center text-white">
            <Heart size={20} fill="white" />
            <span className="text-[10px] font-body">{data.likes}</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <Share2 size={20} />
            <span className="text-[10px] font-body">{data.shares}</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <Eye size={20} />
            <span className="text-[10px] font-body">{data.views}</span>
          </div>
        </div>
        {/* Caption */}
        <p className="absolute bottom-3 left-3 right-10 text-white text-[11px] font-body leading-snug line-clamp-2">
          {data.caption}
        </p>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PlatformBadge platform="tiktok" />
          <span className="text-[11px] text-supreme-mid font-body">{data.postedAt}</span>
        </div>
        <a href={data.url} className="flex items-center gap-1 text-[11px] font-heading font-700 text-supreme-dark dark:text-white hover:underline">
          Watch <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

// ─── WhatsApp Channel Card ────────────────────────────────────────────────────
function WhatsAppCard({ data }) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-supreme-deep shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
      {/* WA header */}
      <div className="bg-[#25D366] px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d={PLATFORM_META.whatsapp.path} /></svg>
        </div>
        <div>
          <p className="text-white text-xs font-heading font-700 leading-tight">{data.channelName}</p>
          <p className="text-white/70 text-[10px] font-body flex items-center gap-1">
            <Users size={9} /> {data.members} members
          </p>
        </div>
        <span className="ml-auto text-[10px] text-white/70 font-body">{data.postedAt}</span>
      </div>

      {/* Highlights feed */}
      <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
        <p className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-mid mb-1">
          Today's Top Updates
        </p>
        {data.highlights.map((item, i) => (
          <div key={i} className="flex items-start gap-2 bg-supreme-light dark:bg-supreme-dark/40 rounded-xl px-3 py-2">
            <div className="flex-1">
              <p className="text-xs font-body text-supreme-dark dark:text-supreme-light leading-snug">{item.text}</p>
            </div>
            <span className="flex-shrink-0 text-[10px] font-body text-supreme-mid whitespace-nowrap">{item.reactions}</span>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <a
          href={data.url}
          className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-heading font-700 py-2.5 rounded-xl transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d={PLATFORM_META.whatsapp.path} /></svg>
          Join Channel <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function MultiPlatformHub({ defaultCategory = 'sports' }) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const content = PLATFORM_CONTENT[activeCategory];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <div>
            <span className="text-xs font-heading font-800 uppercase tracking-widest text-supreme-vivid dark:text-supreme-bright block">
              Multi-Platform Hub
            </span>
            <h2 className="font-heading font-800 text-supreme-dark dark:text-supreme-light text-lg leading-tight">
              {content.eventTitle}
            </h2>
          </div>
        </div>
        <SyncBadge syncedAt={content.syncedAt} />
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-700 transition-all duration-200 ${
              activeCategory === cat.key
                ? 'bg-supreme-vivid text-white shadow-md'
                : 'bg-supreme-mid/10 dark:bg-supreme-primary/20 text-supreme-mid hover:text-supreme-vivid dark:hover:text-supreme-bright hover:bg-supreme-vivid/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <div className="ml-auto flex-shrink-0 hidden sm:flex items-center gap-1.5 text-[11px] font-body text-supreme-mid border border-supreme-mid/20 rounded-full px-3 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          4 platforms live
        </div>
      </div>

      {/* Platform cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
          <YouTubeCard data={content.youtube} />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '60ms' }}>
          <FacebookCard data={content.facebook} />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
          <TikTokCard data={content.tiktok} />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
          <WhatsAppCard data={content.whatsapp} />
        </div>
      </div>

      {/* Automation explainer chip */}
      <div className="mt-6 flex items-center gap-2 text-xs font-body text-supreme-mid">
        <RefreshCw size={11} />
        <span>Staff posts once to CMS → all 4 platforms update automatically via webhooks. No duplicate uploads needed.</span>
      </div>
    </section>
  );
}
