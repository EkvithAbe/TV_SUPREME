import { SectionHeading } from "@/components/section-heading";
import { getPlatformOverview } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const overview = await getPlatformOverview();

  return (
    <section className="section-wrap py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="surface-card p-6 sm:p-8">
          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.22em] text-supreme-vivid">
            Admin Overview
          </p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-supreme-ink sm:text-5xl">
            Initial platform operations dashboard.
          </h1>
          <p className="mt-4 text-sm leading-7 text-supreme-mid">
            This is still the first operator-facing layer, not a full CMS. It
            exists to surface core content counts and sync visibility while the
            editorial tooling grows behind it.
          </p>
        </div>

        <div>
          <SectionHeading
            eyebrow="Core Counts"
            title="A cleaner dashboard shell for platform operators."
            copy="The admin side uses the same visual language as the public site, but keeps the layout structured around counts and operational status instead of promotional content."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "Programs", value: overview.programCount },
              { label: "Articles", value: overview.articleCount },
              { label: "Videos", value: overview.videoCount },
              { label: "Social Posts", value: overview.socialCount },
              { label: "Accounts", value: overview.accountCount }
            ].map((item) => (
              <article key={item.label} className="surface-card p-5">
                <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                  {item.label}
                </p>
                <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-supreme-ink">
                  {item.value}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <SectionHeading
          eyebrow="Recent Sync Runs"
          title="Background ingestion visibility."
          copy="These runs record the state of YouTube and Facebook ingestion so the admin layer can surface health, errors, and content volume without digging into logs."
        />
        <div className="grid gap-4">
          {overview.syncRuns.map((run) => (
            <article
              key={run.id}
              className="surface-card flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                  {run.platform}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
                  {run.target}
                </h2>
                <p className="mt-2 text-sm text-supreme-mid">
                  {run.message ?? "Sync run recorded."}
                </p>
              </div>
              <div className="text-left lg:text-right">
                <p className="font-heading text-xl font-bold text-supreme-ink">
                  {run.status}
                </p>
                <p className="mt-2 text-sm text-supreme-mid">
                  {run.itemsProcessed} items processed
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
