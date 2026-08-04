import { SectionHeading } from "@/components/section-heading";
import { ProgramCard } from "@/components/program-card";
import { getProgramDirectory } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const programs = await getProgramDirectory();

  const featuredCount = programs.filter((program) => program.isFeatured).length;
  const categoryCount = new Set(
    programs.map((program) => program.category?.slug).filter(Boolean)
  ).size;

  return (
    <section className="section-wrap py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="surface-card p-6 sm:p-8">
          <p className="eyebrow">Program Directory</p>
          <h1 className="section-title mt-3">
            TV Supreme’s lineup now has a proper editorial catalogue.
          </h1>
          <p className="section-copy mt-4">
            Every show now lives as a reusable database record with a stable
            slug, category, featured state, and schedule relation. That gives
            the site a clean foundation for both viewers and editorial staff.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <article className="rounded-[24px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                Total programs
              </p>
              <p className="mt-2 font-heading text-4xl font-extrabold text-supreme-ink">
                {programs.length}
              </p>
            </article>
            <article className="rounded-[24px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                Featured records
              </p>
              <p className="mt-2 font-heading text-4xl font-extrabold text-supreme-ink">
                {featuredCount}
              </p>
            </article>
            <article className="rounded-[24px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                Active categories
              </p>
              <p className="mt-2 font-heading text-4xl font-extrabold text-supreme-ink">
                {categoryCount}
              </p>
            </article>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Current Slate"
            title="Designed to read like a channel lineup."
            copy="This grid is no longer a hardcoded mock page. It’s a real directory view over the program table, which means it can expand without changing the layout structure each time."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
