import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/schedule", label: "Schedule" },
  { href: "/live", label: "Live TV" },
  { href: "/admin", label: "Admin" }
];

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-20 border-t border-supreme-ink/10 py-12">
      <div className="section-wrap grid gap-8 lg:grid-cols-[1fr_0.8fr_0.8fr]">
        <div>
          <p className="eyebrow">TV Supreme</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-supreme-ink">
            News, programs, and live viewing from one official channel home.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-supreme-mid">
            Follow the public schedule, watch channel video, and move directly
            into the official TV Supreme social platforms.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-supreme-vivid">
            Pages
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-supreme-mid">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-supreme-vivid"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-supreme-vivid">
            Social Links
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-supreme-mid">
            <a href="https://www.facebook.com/tvsupremelk" target="_blank" rel="noreferrer" className="transition hover:text-supreme-vivid">
              Facebook · TV Supreme
            </a>
            <a href="https://www.facebook.com/tvsupremenews" target="_blank" rel="noreferrer" className="transition hover:text-supreme-vivid">
              Facebook · TV Supreme News
            </a>
            <a href="https://www.youtube.com/@tvsupreme" target="_blank" rel="noreferrer" className="transition hover:text-supreme-vivid">
              YouTube · TV Supreme
            </a>
            <a href="https://www.youtube.com/@tvsupremenews" target="_blank" rel="noreferrer" className="transition hover:text-supreme-vivid">
              YouTube · TV Supreme News
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
