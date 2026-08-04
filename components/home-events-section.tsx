import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { formatMinutes } from "@/lib/utils";

type HomeEvent = {
  id: string;
  title: string;
  slug: string | null;
  categoryName: string;
  imageUrl: string;
  startMinutes: number;
  endMinutes: number;
  notes: string | null;
  isLiveWindow: boolean;
  dayLabel: string;
  monthLabel: string;
  dayNumber: string;
  fullDateLabel: string;
  badgeLabel: string;
  stateLabel: string;
};

type HomeEventsSectionProps = {
  events: HomeEvent[];
};

function EventAction({ event }: { event: HomeEvent }) {
  if (event.slug) {
    return (
      <Link
        href={`/programs/${event.slug}`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-4 text-sm font-heading font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
      >
        Open Event
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href="/schedule"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-4 text-sm font-heading font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
    >
      Open Event
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function EventBackFace({ event }: { event: HomeEvent }) {
  return (
    <div className="absolute inset-0 flex h-full flex-col justify-between overflow-hidden rounded-[34px] border border-[#f1d8ff]/30 bg-[radial-gradient(circle_at_top,#6f2df6_0%,#311154_42%,#090814_100%)] p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_25%,rgba(9,8,20,0.08)_54%,rgba(9,8,20,0.22)_100%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.24em] text-white/68">
            {event.categoryName}
          </p>
          <p className="mt-3 text-2xl font-heading font-extrabold tracking-[-0.04em] text-white">
            Event Details
          </p>
        </div>

        <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-white/92 backdrop-blur-sm">
          {event.badgeLabel}
        </span>
      </div>

      <div className="relative space-y-5">
        <h3 className="max-w-[17rem] font-heading text-[2rem] font-extrabold leading-[0.96] tracking-[-0.04em] text-white sm:text-[2.25rem]">
          {event.title}
        </h3>

        <div className="space-y-3 text-sm leading-7 text-white/82 sm:text-[1rem]">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-white/72" />
            {event.fullDateLabel}
          </p>
          <p className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 shrink-0 text-white/72" />
            {formatMinutes(event.startMinutes)} - {formatMinutes(event.endMinutes)}
          </p>
          <p className="rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 text-white/76 backdrop-blur-sm">
            {event.notes ?? `Catch ${event.title} on TV Supreme during the next featured event window.`}
          </p>
        </div>
      </div>

      <div className="relative">
        <EventAction event={event} />
      </div>
    </div>
  );
}

export function HomeEventsSection({ events }: HomeEventsSectionProps) {
  const eventCards = events.slice(0, 3);

  return (
    <section id="events" className="relative border-t border-supreme-ink/10 py-16 lg:py-20">
      <div className="section-wrap">
        <div className="mb-10 flex flex-col gap-6 border-b border-supreme-ink/10 pb-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="eyebrow">Events</p>
            <h2 className="mt-4 max-w-5xl font-heading text-[2.8rem] font-extrabold leading-[0.94] tracking-[-0.05em] text-supreme-ink sm:text-[3.8rem] lg:text-[5.2rem]">
              Don&apos;t miss the{" "}
              <span className="bg-gradient-to-r from-[#ff2d95] to-[#8a34f4] bg-clip-text text-transparent">
                biggest highlights
              </span>
              <br />
              on television.
            </h2>
          </div>

          <Link
            href="/schedule"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-supreme-ink/10 bg-white px-7 py-4 text-base font-heading font-semibold text-[#44536d] shadow-[0_10px_24px_rgba(16,24,32,0.06)] transition hover:border-[#cfc8da] hover:text-[#1f2b3d]"
          >
            View full calendar
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {eventCards.length > 0 ? (
          <div className="grid gap-6 xl:grid-cols-3">
            {eventCards.map((event) => (
              <article
                key={event.id}
                className="group relative min-h-[31rem] [perspective:1800px] sm:min-h-[34rem]"
              >
                <div className="relative h-full min-h-[31rem] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] sm:min-h-[34rem]">
                  <div className="absolute inset-0 overflow-hidden rounded-[34px] border border-[#efe7f7] bg-[#090814] shadow-[0_26px_64px_rgba(33,18,54,0.14)] [backface-visibility:hidden]">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,16,0.04)_0%,rgba(10,10,16,0.08)_22%,rgba(10,10,16,0.22)_54%,rgba(10,10,16,0.88)_100%)]" />
                    <div className="relative flex min-h-[31rem] flex-col justify-between p-5 sm:min-h-[34rem] sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="rounded-[22px] bg-white px-5 py-4 text-center shadow-[0_10px_26px_rgba(17,24,39,0.12)]">
                          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#ff2d95]">
                            {event.monthLabel}
                          </p>
                          <p className="mt-1 font-heading text-[2rem] font-extrabold leading-none tracking-tight text-[#101827]">
                            {event.dayNumber}
                          </p>
                        </div>

                        <span className="rounded-full bg-[linear-gradient(90deg,#ff2d95,#8a34f4)] px-5 py-2.5 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(138,52,244,0.24)]">
                          {event.badgeLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="max-w-[18rem] font-heading text-[2rem] font-extrabold leading-[0.96] tracking-[-0.04em] text-white sm:text-[2.35rem]">
                          {event.title}
                        </h3>
                        <p className="mt-3 flex items-center gap-2 text-sm leading-7 text-white/82 sm:text-[1.05rem]">
                          <CalendarDays className="h-4 w-4 shrink-0 text-white/76" />
                          {event.fullDateLabel} • {event.stateLabel}
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm leading-7 text-white/82 sm:text-[1.05rem]">
                          <Clock3 className="h-4 w-4 shrink-0 text-white/76" />
                          {formatMinutes(event.startMinutes)} - {formatMinutes(event.endMinutes)}
                        </p>
                      </div>

                      <div className="mt-6">
                        <EventAction event={event} />
                      </div>
                    </div>
                  </div>

                  <EventBackFace event={event} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-supreme-ink/10 bg-white p-6 text-supreme-mid shadow-[0_18px_42px_rgba(16,24,32,0.06)] sm:p-8">
            No event windows are available right now. Add schedule slots to surface live and upcoming events here.
          </div>
        )}
      </div>
    </section>
  );
}
