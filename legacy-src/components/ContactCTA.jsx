import { Link } from 'react-router-dom';

export default function ContactCTA() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: '#080210' }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#7C3AED' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-8 h-px bg-supreme-vivid" />
          <span className="text-supreme-vivid text-[11px] font-heading font-700 uppercase tracking-[0.22em]">
            Work With Us
          </span>
          <span className="block w-8 h-px bg-supreme-vivid" />
        </div>

        <h2
          className="font-heading font-800 text-white leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
        >
          Ready to work
          <br />together?
        </h2>

        <p className="text-supreme-mid text-lg font-body leading-relaxed mb-11 max-w-lg mx-auto">
          Whether you're a brand seeking reach, a creator with a story to tell, or a media partner looking to grow — let's talk.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-supreme-vivid hover:bg-supreme-bright text-white font-heading font-700 text-sm rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-supreme-vivid/30 hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
          <Link
            to="/investors"
            className="inline-flex items-center gap-2.5 px-9 py-4 border border-white/15 hover:border-white/40 text-white/75 hover:text-white font-heading font-700 text-sm rounded-full transition-all duration-300"
          >
            Investor Relations
          </Link>
        </div>
      </div>
    </section>
  );
}
