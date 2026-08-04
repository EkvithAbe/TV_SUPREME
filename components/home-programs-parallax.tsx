import Link from "next/link";

export function HomeProgramsParallax() {
  return (
    <section id="contact" className="relative z-20 border-t border-supreme-ink/10 py-16 lg:py-20">
      <div className="section-wrap">
        <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="eyebrow">Connect</p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-supreme-ink sm:text-4xl lg:text-5xl">
              Stay connected to TV Supreme across live, programs, and social channels.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-supreme-mid sm:mt-6 sm:text-lg sm:leading-8">
              Use the public site as the main entry point for viewers, then
              route them clearly into live viewing, schedules, and the official
              YouTube and Facebook pages.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/live" className="primary-pill w-full justify-center px-7 py-3.5 text-sm sm:w-auto sm:py-4 sm:text-base">
                Watch Live
              </Link>
              <Link href="/schedule" className="link-pill w-full justify-center px-6 py-3.5 text-sm sm:w-auto sm:py-4 sm:text-base">
                View Schedule
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-[22px] border border-supreme-ink/10 bg-white p-6 shadow-[0_14px_34px_rgba(16,24,32,0.06)]">
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

            <article className="rounded-[22px] border border-supreme-ink/10 bg-white p-6 shadow-[0_14px_34px_rgba(16,24,32,0.06)]">
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

            <article className="rounded-[22px] border border-supreme-ink/10 bg-white p-6 shadow-[0_14px_34px_rgba(16,24,32,0.06)]">
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

            <article className="rounded-[22px] border border-supreme-ink/10 bg-white p-6 shadow-[0_14px_34px_rgba(16,24,32,0.06)]">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-[#b71d62]">
                Contact Point
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-supreme-ink">
                Follow the daily feed
              </h3>
              <p className="mt-5 text-sm leading-7 text-supreme-mid">
                Use the live page, program directory, and official social
                channels as the viewer-facing contact surface for the brand.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
