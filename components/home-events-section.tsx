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
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-heading font-semibold text-white transition hover:bg-white/20 sm:w-fit"
      >
        Open Event
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href="/schedule"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-heading font-semibold text-white transition hover:bg-white/20 sm:w-fit"
    >
      Open Event
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function EventBackFace({ event }: { event: HomeEvent }) {
  return (
    <div className="absolute inset-0 flex h-full flex-col justify-between overflow-hidden rounded-[26px] border border-[#ead8fa]/30 bg-[radial-gradient(circle_at_top,#6f2df6_0%,#311154_48%,#10091b_100%)] p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_25%,rgba(9,8,20,0.12)_54%,rgba(9,8,20,0.28)_100%)]" />
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
      <div className="mb-9 flex flex-col gap-6 border-b border-supreme-ink/10 pb-8 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="eyebrow">Events</p>
            <h2 className="mt-3 max-w-3xl font-heading text-[2.4rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-supreme-ink sm:text-[3.2rem] lg:text-[4rem]">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-[#ff2d95] to-[#8a34f4] bg-clip-text text-transparent">
                Highlights
              </span>
              .
            </h2>
            <p className="section-copy mt-3">
              Plan ahead for special broadcasts, live moments, and the shows viewers are talking about.
            </p>
          </div>

          <Link
            href="/schedule"
            className="link-pill w-fit justify-center px-5 py-3"
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
                className="group relative min-h-[28rem] [perspective:1800px] sm:min-h-[30rem]"
              >
                <div className="relative h-full min-h-[28rem] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] sm:min-h-[30rem]">
                  <div className="absolute inset-0 overflow-hidden rounded-[26px] border border-[#efe7f7] bg-[#090814] shadow-[0_16px_36px_rgba(33,18,54,0.12)] [backface-visibility:hidden]">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,16,0.08)_0%,rgba(10,10,16,0.14)_26%,rgba(10,10,16,0.34)_54%,rgba(10,10,16,0.92)_100%)]" />
                    <div className="relative flex min-h-[28rem] flex-col justify-between p-5 sm:min-h-[30rem] sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="rounded-[18px] bg-white px-4 py-3 text-center shadow-[0_6px_18px_rgba(17,24,39,0.12)]">
                          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#ff2d95]">
                            {event.monthLabel}
                          </p>
                          <p className="mt-1 font-heading text-[2rem] font-extrabold leading-none tracking-tight text-[#101827]">
                            {event.dayNumber}
                          </p>
                        </div>

                        <span className="rounded-full bg-[linear-gradient(90deg,#ef2b91,#7a3be8)] px-4 py-2 text-[10px] font-heading font-bold uppercase tracking-[0.16em] text-white">
                          {event.badgeLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="max-w-[18rem] font-heading text-[1.8rem] font-extrabold leading-[1] tracking-[-0.04em] text-white sm:text-[2.1rem]">
                          {event.title}
                        </h3>
                        <div className="mt-4 space-y-2 rounded-[18px] border border-white/20 bg-black/50 px-4 py-3 shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                          <p className="flex items-center gap-2 text-sm font-medium leading-6 text-white sm:text-[1rem]">
                            <CalendarDays className="h-4 w-4 shrink-0 text-white/80" />
                            {event.fullDateLabel} • {event.stateLabel}
                          </p>
                          <p className="flex items-center gap-2 text-sm font-medium leading-6 text-white sm:text-[1rem]">
                            <Clock3 className="h-4 w-4 shrink-0 text-white/80" />
                            {formatMinutes(event.startMinutes)} - {formatMinutes(event.endMinutes)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
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
