import { Link } from 'react-router-dom';
import { services } from '../data/corporateData';

export default function ServicesSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block w-8 h-px bg-supreme-vivid" />
            <span className="text-supreme-vivid text-[11px] font-heading font-700 uppercase tracking-[0.22em]">
              What We Offer
            </span>
            <span className="block w-8 h-px bg-supreme-vivid" />
          </div>
          <h2
            className="font-heading font-800 text-supreme-dark leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Beyond broadcasting.
          </h2>
          <p className="text-supreme-primary/65 text-lg font-body max-w-lg mx-auto leading-relaxed">
            We're a media company that also builds careers, brands and original stories.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(s => (
            <div
              key={s.title}
              className="group p-8 rounded-3xl border border-supreme-pink/25 hover:border-supreme-vivid/30 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="text-4xl mb-6 leading-none">{s.icon}</div>
              <h3 className="font-heading font-800 text-supreme-dark text-2xl mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-supreme-primary/65 text-sm leading-relaxed font-body mb-8">
                {s.description}
              </p>
              <Link
                to={s.href}
                className="inline-flex items-center gap-2 text-supreme-vivid font-heading font-700 text-sm group-hover:gap-3 transition-all duration-200"
              >
                {s.cta}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
