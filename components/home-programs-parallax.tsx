import Link from "next/link";

export function HomeProgramsParallax() {
  return (
    <section id="connect" className="relative z-20 border-t border-supreme-ink/10 py-16 lg:py-20">
      <div className="section-wrap">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Connect</p>
            <h2 className="section-title mt-3 max-w-xl">
              Stay Connected with TV Supreme
            </h2>
            <p className="section-copy mt-4">
              Watch live, check the week ahead, and follow every show through the official TV Supreme channels.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link href="/live" className="primary-pill w-full justify-center px-6 py-3 sm:w-auto">
                Watch Live
              </Link>
              <Link href="/schedule" className="link-pill w-full justify-center px-6 py-3 sm:w-auto">
                View Schedule
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="surface-card p-5 sm:p-6">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-[#b71d62]">
                Main Channel
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-supreme-ink">
                TV Supreme
              </h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-supreme-mid">
                <a href="https://www.youtube.com/@tvsupreme" target="_blank" rel="noreferrer" className="transition hover:text-[#4f239a]">
                  YouTube channel
                </a>
                <a href="https://www.facebook.com/tvsupremelk" target="_blank" rel="noreferrer" className="transition hover:text-[#4f239a]">
                  Facebook page
                </a>
              </div>
            </article>

            <article className="surface-card p-5 sm:p-6">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-[#b71d62]">
                News Channel
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-supreme-ink">
                TV Supreme News
              </h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-supreme-mid">
                <a href="https://www.youtube.com/@tvsupremenews" target="_blank" rel="noreferrer" className="transition hover:text-[#4f239a]">
                  YouTube updates
                </a>
                <a href="https://www.facebook.com/tvsupremenews" target="_blank" rel="noreferrer" className="transition hover:text-[#4f239a]">
                  Facebook updates
                </a>
              </div>
            </article>

            <article className="surface-card p-5 sm:p-6">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-[#b71d62]">
                Viewer Paths
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-supreme-ink">
                Quick access
              </h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-supreme-mid">
                <Link href="/programs" className="transition hover:text-[#4f239a]">
                  Browse all programs
                </Link>
                <Link href="/schedule" className="transition hover:text-[#4f239a]">
                  Weekly schedule
                </Link>
              </div>
            </article>

            <article className="surface-card p-5 sm:p-6">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-[#b71d62]">
                Contact Point
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-supreme-ink">
                Viewer updates
              </h3>
              <p className="mt-5 text-sm leading-7 text-supreme-mid">
                Find the latest viewing details through the live page, programme guide, and official social channels.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
