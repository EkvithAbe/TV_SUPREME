import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Play, Bookmark } from 'lucide-react';
import { TRENDING_PROGRAMS } from '../data/scheduleData';
import { useMember } from '../context/MemberContext';
import { useToast } from '../context/ToastContext';

const BADGE_STYLES = {
  'PRIME TIME':  'bg-supreme-vivid text-white',
  'NEW EPISODE': 'bg-green-500 text-white',
  'TODAY':       'bg-blue-500 text-white',
  'DAILY':       'bg-supreme-mid text-white',
  'TRENDING':    'bg-pink-500 text-white',
  'POPULAR':     'bg-orange-500 text-white',
  'LIVE':        'bg-red-600 text-white',
  'MORNING':     'bg-amber-500 text-white',
};

export default function TrendingPrograms() {
  const rowRef = useRef(null);
  const { member, isWatchLater, toggleWatchLater, setShowModal } = useMember();
  const { showToast } = useToast();

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  const handleWatchLater = (e, prog) => {
    e.stopPropagation();
    if (!member) {
      setShowModal(true);
      return;
    }
    const saved = isWatchLater(prog.id);
    toggleWatchLater({
      id: prog.id,
      title: prog.title,
      thumb: prog.thumb,
      type: 'program',
      meta: prog.time,
    });
    showToast(
      saved ? 'Removed from Watch Later' : 'Saved to Watch Later',
      saved ? 'remove' : 'success'
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
        <h2 className="font-heading font-800 text-supreme-dark dark:text-supreme-light text-xl">
          Trending Programs
        </h2>
        <div className="flex-1 h-px bg-supreme-mid/15" />
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full border border-supreme-mid/25 flex items-center justify-center text-supreme-mid hover:text-supreme-vivid hover:border-supreme-vivid transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full border border-supreme-mid/25 flex items-center justify-center text-supreme-mid hover:text-supreme-vivid hover:border-supreme-vivid transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Program cards */}
      <div ref={rowRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
        {TRENDING_PROGRAMS.map(prog => {
          const saved = isWatchLater(prog.id);
          return (
            <div key={prog.id} className="group cursor-pointer flex-shrink-0 w-72">
              {/* Thumbnail */}
              <div className="relative overflow-hidden rounded-2xl mb-3 shadow-card">
                <img
                  src={prog.thumb}
                  alt={prog.title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-heading font-800 uppercase tracking-wider px-2.5 py-1 rounded-full ${BADGE_STYLES[prog.badge] ?? 'bg-supreme-primary text-white'}`}>
                    {prog.badge === 'LIVE' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                    )}
                    {prog.badge}
                  </span>
                </div>

                {/* Watch Later button */}
                <button
                  onClick={(e) => handleWatchLater(e, prog)}
                  className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    saved
                      ? 'bg-supreme-vivid text-white shadow-lg'
                      : 'bg-black/55 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100'
                  }`}
                  aria-label={saved ? 'Remove from Watch Later' : 'Add to Watch Later'}
                  title={saved ? 'Remove from Watch Later' : 'Watch Later'}
                >
                  <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
                </button>

                {/* Hover play overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>

                {/* Category tag bottom-right */}
                <div className="absolute bottom-3 right-3">
                  <span className="bg-black/60 text-white text-[9px] font-heading font-700 uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {prog.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-sm leading-snug group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors line-clamp-1">
                {prog.title}
              </h3>
              <p className="text-[11px] font-body text-supreme-mid mt-0.5 flex items-center gap-1">
                <Clock size={10} /> {prog.time}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
