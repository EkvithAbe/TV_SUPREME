export default function AboutPage() {
  return (
    <section className="section-wrap py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow">About The Rebuild</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-supreme-ink sm:text-5xl lg:text-6xl">
            The site architecture now matches the media operation behind it.
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-supreme-mid sm:text-lg sm:leading-8">
            This rebuild is not only a visual refresh. It changes the platform
            from a static presentation layer into a structured publishing system
            that can support real schedules, program directories, social media
            ingestion, and future editorial tooling.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="data-pill">Next.js public web</span>
            <span className="data-pill">Prisma data model</span>
            <span className="data-pill">PostgreSQL content store</span>
            <span className="data-pill">Social sync scaffolding</span>
          </div>
        </div>

        <div className="surface-card p-6 sm:p-8">
          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.22em] text-supreme-vivid">
            Rebuild Priorities
          </p>
          <div className="mt-6 space-y-5">
            <article className="rounded-[20px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-supreme-vivid">
                01 · Foundation
              </p>
              <p className="mt-2 text-sm leading-7 text-supreme-mid">
                Replace mock pages with a typed application structure that can
                survive real content growth.
              </p>
            </article>
            <article className="rounded-[20px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-supreme-vivid">
                02 · Publishing Model
              </p>
              <p className="mt-2 text-sm leading-7 text-supreme-mid">
                Normalize programs, schedule slots, videos, posts, and sync
                runs so each content stream has a clear role.
              </p>
            </article>
            <article className="rounded-[20px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-supreme-vivid">
                03 · Operator UX
              </p>
              <p className="mt-2 text-sm leading-7 text-supreme-mid">
                Create a public-facing experience that already looks ready for a
                future editorial dashboard and CMS layer.
              </p>
            </article>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <article className="surface-card p-6">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
            Production-ready stack
          </h2>
          <p className="mt-3 text-sm leading-7 text-supreme-mid">
            Next.js handles the public web experience, Prisma manages the data
            model, and PostgreSQL stores programs, schedules, videos, and
            social posts.
          </p>
        </article>
        <article className="surface-card p-6">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
            Social integrations
          </h2>
          <p className="mt-3 text-sm leading-7 text-supreme-mid">
            Facebook and YouTube sync layers are scaffolded with direct API
            ingestion. The site reads normalized records instead of scraping or
            embedding raw widgets.
          </p>
        </article>
        <article className="surface-card p-6">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
            CMS direction
          </h2>
          <p className="mt-3 text-sm leading-7 text-supreme-mid">
            This first pass focuses on the platform core. The schema and admin
            overview page are in place so editorial tools can be layered in
            next without another full rebuild.
          </p>
        </article>
      </div>
    </section>
  );
}
