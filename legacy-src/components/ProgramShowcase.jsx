import { Link } from 'react-router-dom';
import { programs } from '../data/corporateData';

export default function ProgramShowcase() {
  return (
    <section className="py-28 bg-supreme-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-supreme-vivid" />
              <span className="text-supreme-vivid text-[11px] font-heading font-700 uppercase tracking-[0.22em]">
                Our Programs
              </span>
            </div>
            <h2
              className="font-heading font-800 text-supreme-dark leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              What we make.
            </h2>
          </div>
          <Link
            to="/programs"
            className="hidden sm:inline-flex items-center gap-2 text-supreme-vivid font-heading font-700 text-sm group"
          >
            View All Programs
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Program grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {programs.map(p => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-supreme-deep">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="absolute top-3 left-3 bg-supreme-dark/75 text-white text-[9px] font-heading font-700 uppercase tracking-[0.2em] px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {p.tag}
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <span className={`inline-block text-[10px] font-heading font-700 uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-3 ${p.categoryColor}`}>
                  {p.category}
                </span>
                <h3 className="font-heading font-800 text-supreme-dark text-xl mb-2 leading-snug">{p.title}</h3>
                <p className="text-supreme-primary/65 text-sm leading-relaxed font-body">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile "see all" */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-supreme-vivid font-heading font-700 text-sm"
          >
            View All Programs →
          </Link>
        </div>
      </div>
    </section>
  );
}
