import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/schedule", label: "Schedule" },
  { href: "/live", label: "Live TV" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" }
];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/tvsupremelk", label: "Facebook" },
  { href: "https://www.youtube.com/@tvsupreme", label: "YouTube" },
  { href: "https://www.facebook.com/tvsupremenews", label: "TV Supreme News" },
  { href: "https://www.youtube.com/@tvsupremenews", label: "News on YouTube" }
];

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative z-20 mt-16 border-t border-[#2e1b50] bg-[#1b102f] py-12 text-white sm:py-14"
    >
      <div className="section-wrap">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.7fr_0.8fr] lg:gap-12">
          <div>
            <img
              src="/images/tv-supreme-logo-final.png"
              alt="TV Supreme"
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
            <p className="mt-5 text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#f49bc9]">
              TV Supreme
            </p>
            <h2 className="mt-3 max-w-md font-heading text-2xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
              Sri Lanka&apos;s screen for live moments and favourite shows.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/68">
              Follow the daily schedule, watch live, and stay with the official TV Supreme channels.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/live"
                className="inline-flex min-h-11 items-center rounded-full bg-[#ef2b91] px-5 py-3 text-sm font-heading font-semibold text-white transition hover:bg-[#d61c7d]"
              >
                Watch Live
              </Link>
              <Link
                href="/schedule"
                className="inline-flex min-h-11 items-center rounded-full border border-white/24 px-5 py-3 text-sm font-heading font-semibold text-white transition hover:bg-white/10"
              >
                Schedule
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#f49bc9]">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#f49bc9]">
              Official Channels
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <p className="mt-7 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-white/42">
              Contact and updates
            </p>
            <p className="mt-2 text-sm leading-6 text-white/66">
              Follow the official channels for viewing information and the latest announcements.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/12 pt-5 text-xs text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TV Supreme. All rights reserved.</p>
          <p>Sri Lanka&apos;s official TV Supreme digital home.</p>
        </div>
      </div>
    </footer>
  );
}
