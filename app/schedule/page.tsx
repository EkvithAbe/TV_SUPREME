import { SectionHeading } from "@/components/section-heading";
import { getWeeklySchedule } from "@/lib/queries";
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

export default async function SchedulePage() {
  const schedule = await getWeeklySchedule();

  const groupedSchedule: Record<number, (typeof schedule)[number][]> = {};

  for (const slot of schedule) {
    groupedSchedule[slot.dayOfWeek] ??= [];
    groupedSchedule[slot.dayOfWeek].push(slot);
  }

  return (
    <section className="section-wrap py-10 lg:py-16">
      <SectionHeading
        eyebrow="Program Guide"
        title="Recurring weekly schedule, redesigned as an editorial grid."
        copy="The schedule model now drives a cleaner day-by-day guide instead of a long static list, which makes the layout easier to scale as the channel slate expands."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {Object.entries(groupedSchedule).map(([dayOfWeek, slots]) => (
          <section key={dayOfWeek} className="surface-card p-6 sm:p-8">
            <div className="flex flex-col items-start gap-3 border-b border-supreme-ink/10 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <p className="eyebrow">Day {dayOfWeek}</p>
                <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-supreme-ink">
                  {DAY_LABELS[Number(dayOfWeek)]}
                </h2>
              </div>
              <p className="text-sm text-supreme-mid">
                {slots.length} slot{slots.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {slots.map((slot) => (
                <article
                  key={slot.id}
                  className="rounded-[24px] border border-supreme-ink/10 bg-supreme-mist p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                        {slot.program?.category?.name ?? "Program"}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
                        {slot.program?.title ?? slot.title}
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
                        {formatMinutes(slot.startMinutes)} -{" "}
                        {formatMinutes(slot.endMinutes)}
                      </p>
                      <p className="mt-2 text-sm text-supreme-mid">
                        {slot.isLiveWindow ? "Primary live window" : "Scheduled slot"}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
