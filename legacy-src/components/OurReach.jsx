import { stats } from '../data/corporateData';

export default function OurReach() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#080210' }}
    >
      {/* Subtle purple wash */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #7C3AED, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block w-8 h-px bg-supreme-vivid" />
            <span className="text-supreme-vivid text-[11px] font-heading font-700 uppercase tracking-[0.22em]">
              Our Reach
            </span>
            <span className="block w-8 h-px bg-supreme-vivid" />
          </div>
          <h2
            className="font-heading font-800 text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Millions of Sri Lankans.
            <br />
            <span className="text-supreme-mid">Every single day.</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center group">
              <div
                className="font-heading font-800 text-white mb-2 transition-colors group-hover:text-supreme-bright"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div className="text-supreme-mid text-[11px] font-body uppercase tracking-wider leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 pt-12 border-t border-white/8 text-center">
          <p className="text-supreme-mid/60 text-sm font-body">
            Across satellite, cable, YouTube, Facebook, TikTok and WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
