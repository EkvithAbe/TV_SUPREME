const PILLARS = [
  {
    icon: '📡',
    title: 'Reach',
    text: 'Broadcasting 24/7 across satellite, cable and digital platforms to every corner of Sri Lanka and the diaspora.',
  },
  {
    icon: '🌍',
    title: 'Trilingual',
    text: "Every story told in Sinhala, Tamil and English — because Sri Lanka's stories belong to all her people.",
  },
  {
    icon: '🎯',
    title: 'Impact',
    text: 'From breaking news to award-winning drama — content that moves, informs and genuinely connects communities.',
  },
];

export default function OurStory() {
  return (
    <section id="our-story" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: narrative */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-supreme-vivid" />
              <span className="text-supreme-vivid text-[11px] font-heading font-700 uppercase tracking-[0.22em]">
                Who We Are
              </span>
            </div>

            <h2
              className="font-heading font-800 text-supreme-dark leading-[1.1] mb-7"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              More than a channel.
              <br />
              A conversation.
            </h2>

            <p className="text-supreme-primary text-lg leading-relaxed mb-5 font-body">
              Founded over fifteen years ago, TV Supreme has grown from a local broadcaster into one of Sri Lanka's most-followed media brands — on television, on YouTube, and across every platform where the next generation consumes content.
            </p>

            <p className="text-supreme-primary/65 text-base leading-relaxed font-body mb-10">
              We believe media should reflect the full richness of Sri Lankan life — its politics, its sport, its culture and its people. That belief has shaped every programme, every partnership and every platform we've built.
            </p>

            <a
              href="/about"
              className="inline-flex items-center gap-2.5 text-supreme-vivid font-heading font-700 text-sm group"
            >
              Read Our Full Story
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Right: pillars */}
          <div className="flex flex-col gap-5">
            {PILLARS.map(p => (
              <div
                key={p.title}
                className="flex gap-5 p-6 rounded-2xl bg-supreme-light/70 border border-supreme-pink/20 hover:border-supreme-vivid/20 transition-colors duration-300"
              >
                <span className="text-3xl flex-shrink-0 mt-0.5 leading-none">{p.icon}</span>
                <div>
                  <h3 className="font-heading font-800 text-supreme-dark text-lg mb-1.5">{p.title}</h3>
                  <p className="text-supreme-primary/70 text-sm leading-relaxed font-body">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
