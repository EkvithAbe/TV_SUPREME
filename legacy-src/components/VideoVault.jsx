import { useState, useRef } from 'react';
import { Play, Eye, ChevronLeft, ChevronRight, Radio, Bookmark } from 'lucide-react';
import { videos } from '../data/mockData';
import { useMember } from '../context/MemberContext';
import { useToast } from '../context/ToastContext';

const TABS = [
  { key: 'live',   label: 'Live Now',    icon: <Radio size={13} /> },
  { key: 'sports', label: 'Sports',      icon: null },
  { key: 'drama',  label: 'Teledramas',  icon: null },
];

function VideoCard({ video, isLive }) {
  const [hovered, setHovered] = useState(false);
  const { member, isWatchLater, toggleWatchLater, setShowModal } = useMember();
  const { showToast } = useToast();

  const saved = isWatchLater(video.id);

  const handleWatchLater = (e) => {
    e.stopPropagation();
    if (!member) {
      setShowModal(true);
      return;
    }
    toggleWatchLater({
      id: video.id,
      title: video.title,
      thumb: video.thumb,
      type: 'video',
      meta: isLive ? 'Live' : video.duration,
    });
    showToast(
      saved ? 'Removed from Watch Later' : 'Saved to Watch Later',
      saved ? 'remove' : 'success'
    );
  };

  return (
    <article
      className="flex-shrink-0 w-64 sm:w-72 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden aspect-video mb-3 shadow-card">
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Play overlay on hover */}
        <div className={`absolute inset-0 bg-supreme-dark/50 flex items-center justify-center transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-12 h-12 rounded-full bg-supreme-vivid/90 flex items-center justify-center shadow-lg transform transition-transform duration-200 group-hover:scale-110">
            <Play size={20} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        {/* Watch Later button */}
        <button
          onClick={handleWatchLater}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            saved
              ? 'bg-supreme-vivid text-white shadow-lg scale-100'
              : 'bg-black/55 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100'
          }`}
          aria-label={saved ? 'Remove from Watch Later' : 'Add to Watch Later'}
          title={saved ? 'Remove from Watch Later' : 'Watch Later'}
        >
          <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
        </button>

        {/* Duration / LIVE badge */}
        <div className="absolute bottom-2 right-2">
          {isLive ? (
            <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-heading font-800 uppercase tracking-wider px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
              Live
            </span>
          ) : (
            <span className="bg-black/70 text-white text-[11px] font-body px-2 py-0.5 rounded-md backdrop-blur-sm">
              {video.duration}
            </span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="px-0.5">
        <p className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-sm leading-snug mb-1 line-clamp-2 group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors duration-200">
          {video.title}
        </p>
        <div className="flex items-center justify-between text-supreme-mid text-xs font-body">
          <span>{video.channel}</span>
          <span className="flex items-center gap-1">
            <Eye size={10} />
            {video.views}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function VideoVault() {
  const [activeTab, setActiveTab] = useState('live');
  const trackRef = useRef(null);

  function scroll(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  }

  const currentVideos = videos[activeTab] ?? [];
  const isLiveTab = activeTab === 'live';

  return (
    <section id="video-vault" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full bg-red-500" />
        <span className="text-xs font-heading font-800 uppercase tracking-widest text-red-500">
          Video Vault
        </span>
        <div className="flex-1 h-px bg-supreme-mid/20" />

        {/* Scroll arrows — desktop only */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full border border-supreme-mid/30 flex items-center justify-center text-supreme-mid hover:text-supreme-vivid hover:border-supreme-vivid transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full border border-supreme-mid/30 flex items-center justify-center text-supreme-mid hover:text-supreme-vivid hover:border-supreme-vivid transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-700 transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-supreme-vivid text-white shadow-md'
                : 'bg-supreme-mid/10 dark:bg-supreme-primary/20 text-supreme-mid hover:text-supreme-vivid dark:hover:text-supreme-bright hover:bg-supreme-vivid/10'
            }`}
          >
            {tab.key === 'live' && (
              <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'live' ? 'bg-white animate-live-pulse' : 'bg-red-500'}`} />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Video track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto thin-scrollbar pb-4 snap-x snap-mandatory"
      >
        {currentVideos.map(video => (
          <div key={video.id} className="snap-start">
            <VideoCard video={video} isLive={isLiveTab} />
          </div>
        ))}
      </div>

      {/* View all CTA */}
      <div className="mt-6 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 border-2 border-supreme-primary/40 dark:border-supreme-mid/30 text-supreme-primary dark:text-supreme-mid hover:border-supreme-vivid hover:text-supreme-vivid dark:hover:text-supreme-bright text-sm font-heading font-700 px-6 py-2.5 rounded-full transition-all duration-200"
        >
          View All Videos
          <ChevronRight size={14} />
        </a>
      </div>
    </section>
  );
}
