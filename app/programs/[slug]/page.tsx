import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/section-heading";
import { getProgramBySlug } from "@/lib/queries";
import { formatMinutes } from "@/lib/utils";

export const dynamic = "force-dynamic";

const DAY_LABELS: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
};

type ProgramDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProgramDetailPage({
  params
}: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <section className="section-wrap py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card p-6 sm:p-8">
          <p className="eyebrow">{program.category?.name ?? "Program"}</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-supreme-ink sm:text-5xl lg:text-6xl">
            {program.title}
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-supreme-mid sm:text-base sm:leading-8">
            {program.description ?? program.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="data-pill">Status · {program.status}</span>
            <span className="data-pill">
              Language · {program.language.toUpperCase()}
            </span>
            <span className="data-pill">Slug · /programs/{program.slug}</span>
          </div>
        </div>

        <img
          src={program.imageUrl ?? "/images/news-cover.jpeg"}
          alt={program.title}
          className="surface-card h-full min-h-[240px] w-full object-cover sm:min-h-[360px]"
        />
      </div>

      <div className="mt-16">
        <SectionHeading
          eyebrow="Schedule Links"
          title="Weekly airing slots pulled from the database."
          copy="These slots remain separate schedule records, which means the same program can appear in guide views, live windows, and future reminder features without duplicate content."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {program.scheduleSlots.map((slot) => (
            <article key={slot.id} className="surface-card p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                {DAY_LABELS[slot.dayOfWeek]}
              </p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
                {formatMinutes(slot.startMinutes)} -{" "}
                {formatMinutes(slot.endMinutes)}
              </h2>
              <p className="mt-2 text-sm leading-7 text-supreme-mid">
                {slot.notes ?? "Regular weekly airing slot."}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
