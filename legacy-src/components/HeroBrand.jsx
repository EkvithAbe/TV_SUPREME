import { Link } from 'react-router-dom';

export default function HeroBrand() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #080210 0%, #130820 45%, #2A0E2B 100%)' }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Purple glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: '#7C3AED' }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: '#E9A7C7' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-10 h-px bg-supreme-vivid" />
          <span className="text-supreme-mid text-[11px] font-heading font-700 uppercase tracking-[0.25em]">
            Est. 2010 · Sri Lanka
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-heading font-800 text-white leading-[1.05] mb-7"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}
        >
          Sri Lanka's
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(120deg, #E9A7C7 0%, #8B5CF6 60%, #7C3AED 100%)' }}
          >
            Boldest Screen.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-supreme-mid text-lg sm:text-xl max-w-[520px] mb-11 leading-relaxed font-body">
          TV Supreme is the home of original stories, breaking news and live sport — built for every Sri Lankan, everywhere.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#our-story"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-supreme-vivid hover:bg-supreme-bright text-white font-heading font-700 text-sm rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-supreme-vivid/25 hover:-translate-y-0.5"
          >
            Discover Our Story
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link
            to="/live"
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 hover:border-white/40 text-white/75 hover:text-white font-heading font-700 text-sm rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-live-pulse flex-shrink-0" />
            Watch Live
          </Link>
        </div>

        {/* Quick-stats strip */}
        <div className="mt-20 pt-8 border-t border-white/8 flex flex-wrap gap-x-10 gap-y-5">
          {[
            { n: '359K', l: 'YouTube' },
            { n: '241K', l: 'Facebook' },
            { n: '89K',  l: 'TikTok' },
            { n: '24/7', l: 'On Air' },
            { n: '15+',  l: 'Years' },
          ].map(s => (
            <div key={s.l}>
              <div className="font-heading font-800 text-white text-xl sm:text-2xl leading-none mb-1">{s.n}</div>
              <div className="text-supreme-mid text-[11px] font-body uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-white text-[9px] font-heading font-700 uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-px h-8 bg-white/50" />
      </div>
    </section>
  );
}
