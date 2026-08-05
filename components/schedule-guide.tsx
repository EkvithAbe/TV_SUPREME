"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Play, Radio } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ScheduleGuideSlot = {
  id: string;
  title: string;
  startLabel: string;
  endLabel: string;
  durationLabel: string;
  tags: string[];
  notes: string | null;
  programSlug: string | null;
  isLiveNow: boolean;
};

type ScheduleGuideDay = {
  dayOfWeek: number;
  label: string;
  slots: ScheduleGuideSlot[];
};

type Spotlight = {
  statusLabel: string;
  title: string;
  rangeLabel: string;
  remainingLabel: string | null;
  progressPercent: number;
  programSlug: string | null;
  currentTimeLabel: string;
  currentDayLabel: string;
  heroTitle: string;
  upNextTitle: string | null;
  upNextStartLabel: string | null;
};

type ScheduleGuideProps = {
  days: ScheduleGuideDay[];
  initialDayOfWeek: number;
  spotlight: Spotlight | null;
};

function renderTag(tag: string) {
  if (tag === "LIVE") {
    return "border-[#ffd0e8] bg-[#fff4fb] text-[#df2d89]";
  }

  return "border-[#eadcf7] bg-[#faf6ff] text-[#8669ac]";
}

function getDayCountLabel(count: number) {
  return `${count} ${count === 1 ? "slot" : "slots"}`;
}

function getDayWindowLabel(day: ScheduleGuideDay) {
  if (day.slots.length === 0) {
    return "No scheduled broadcasts";
  }

  const firstSlot = day.slots[0];
  const lastSlot = day.slots[day.slots.length - 1];

  if (lastSlot.endLabel.includes("+")) {
    return `${firstSlot.startLabel} - Late night`;
  }

  return `${firstSlot.startLabel} - ${lastSlot.endLabel}`;
}

function DisplayText({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn("font-heading font-extrabold", className)}>{children}</span>;
}

export function ScheduleGuide({
  days,
  initialDayOfWeek,
  spotlight
}: ScheduleGuideProps) {
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(initialDayOfWeek);
  const activeDay =
    days.find((day) => day.dayOfWeek === selectedDayOfWeek) ?? days[0];
  const activeLiveSlot = activeDay?.slots.find((slot) => slot.isLiveNow) ?? null;
  const activeDayWindow = activeDay ? getDayWindowLabel(activeDay) : "No scheduled broadcasts";
  const activeDayCount = activeDay ? getDayCountLabel(activeDay.slots.length) : "0 slots";

  return (
    <section
      className="relative overflow-hidden pb-24 pt-8 lg:pt-12"
    >
      <div className="section-wrap relative">
        <div>
          <div className="grid gap-4">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_22rem] xl:items-stretch">
              <aside className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#7f35be_0%,#6130a2_58%,#421c76_100%)] p-5 text-white shadow-[0_14px_32px_rgba(87,34,140,0.15)] sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_32%)]" />

                <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-white/60">
                      Sri Lanka Standard Time
                    </p>
                    <DisplayText className="mt-4 block text-[2.35rem] uppercase leading-[0.92] tracking-[-0.02em] text-white sm:text-[2.9rem]">
                      {spotlight?.currentDayLabel ?? activeDay?.label ?? "Today"}
                    </DisplayText>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="rounded-[22px] border border-white/14 bg-white/10 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/58">
                          On Screen
                        </p>
                        <p className="mt-3 line-clamp-3 break-words text-base font-semibold leading-7 text-white/94 sm:text-lg">
                          {spotlight?.heroTitle ?? "No current program"}
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-white/12 bg-[#2f104b]/22 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/56">
                          Next Change
                        </p>
                        <p className="mt-3 line-clamp-2 text-lg font-semibold leading-8 text-white/90">
                          {spotlight?.upNextTitle ?? "No upcoming switch"}
                        </p>
                        <p className="mt-2 text-sm text-white/56">
                          {spotlight?.upNextStartLabel
                            ? `Starts ${spotlight.upNextStartLabel}`
                            : "Schedule unavailable"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-[9rem] rounded-[22px] border border-white/14 bg-white/10 px-5 py-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:px-6 lg:text-right">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/64 lg:justify-end">
                      <Clock3 className="h-4 w-4" />
                      <span>SLST</span>
                    </div>
                    <DisplayText className="mt-3 block text-[3.15rem] leading-[0.82] tracking-[-0.03em] text-white sm:text-[3.9rem]">
                      {spotlight?.currentTimeLabel ?? "--:--"}
                    </DisplayText>
                  </div>
                </div>
              </aside>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-[24px] border border-[#efdff8] bg-[linear-gradient(180deg,#fffefe_0%,#faf6ff_100%)] px-6 py-5 shadow-[0_14px_24px_rgba(100,53,161,0.04)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#aa8ac8]">
                    Active Day
                  </p>
                  <DisplayText className="mt-3 block text-[2.6rem] uppercase leading-[0.82] tracking-[0.02em] text-[#371859]">
                    {activeDay?.label ?? "Today"}
                  </DisplayText>
                  <p className="mt-2 text-sm leading-6 text-[#8870a6]">{activeDayWindow}</p>
                </div>

                <div className="rounded-[24px] border border-[#efdff8] bg-[linear-gradient(180deg,#fffefe_0%,#faf6ff_100%)] px-6 py-5 shadow-[0_14px_24px_rgba(100,53,161,0.04)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#aa8ac8]">
                    Daily Load
                  </p>
                  <DisplayText className="mt-3 block text-[2.6rem] uppercase leading-[0.82] tracking-[0.02em] text-[#371859]">
                    {activeDayCount}
                  </DisplayText>
                  <p className="mt-2 text-sm leading-6 text-[#8870a6]">
                    {activeLiveSlot
                      ? `${activeLiveSlot.title} is live now.`
                      : "Browse the full lineup below."}
                  </p>
                </div>
              </div>
            </div>

            <section
              id="now-playing"
              className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(155deg,#281240_0%,#3e1d61_54%,#55258d_100%)] p-5 text-white shadow-[0_16px_36px_rgba(61,26,101,0.18)] sm:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ffca1e_0%,#f36f2d_34%,#f22686_72%,#8233c9_100%)]" />

              {spotlight ? (
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_19rem] xl:items-center">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-white/18 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/78">
                        {spotlight.statusLabel}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/56">
                        <Clock3 className="h-4 w-4" />
                        <span>{spotlight.currentTimeLabel} SLST</span>
                      </div>
                    </div>

                    <div className="mt-7">
                      <h2 className="max-w-none">
                        <DisplayText className="block text-[clamp(2.1rem,4vw,3.6rem)] uppercase leading-[0.92] tracking-[-0.025em] text-white">
                          {spotlight.title}
                        </DisplayText>
                      </h2>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <DisplayText className="text-[1.25rem] uppercase leading-none tracking-[0.02em] text-white/94 sm:text-[1.5rem]">
                          {spotlight.rangeLabel}
                        </DisplayText>
                        {spotlight.remainingLabel ? (
                          <p className="text-sm text-white/58">{spotlight.remainingLabel}</p>
                        ) : null}
                      </div>

                      <div className="mt-6 h-3 rounded-full bg-white/12">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#ffca1e_0%,#f57a22_38%,#f22686_100%)] transition-[width]"
                          style={{ width: `${Math.max(0, Math.min(100, spotlight.progressPercent))}%` }}
                        />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {spotlight.programSlug ? (
                          <Link
                            href={`/programs/${spotlight.programSlug}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-[#ffd567] transition hover:bg-white/12"
                          >
                            View Show
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ) : (
                          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white/42">
                            Show Page Unavailable
                          </div>
                        )}

                        <Link
                          href="/live"
                          className="inline-flex items-center justify-center gap-3 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white/84 transition hover:bg-white/12"
                        >
                          Live Preview
                          <Play className="h-4 w-4 fill-current" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[24px] border border-white/12 bg-white/7 px-5 py-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/48">
                        Up Next
                      </p>
                      <DisplayText className="mt-4 block text-[1.75rem] uppercase leading-[0.96] tracking-[-0.02em] text-white/92">
                        {spotlight.upNextTitle ?? "No next item"}
                      </DisplayText>
                      <p className="mt-3 text-sm text-white/54">
                        Starts at {spotlight.upNextStartLabel ?? "--"}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                      <div className="rounded-[24px] border border-white/10 bg-[#2d114b]/30 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
                          Current Window
                        </p>
                        <p className="mt-3 text-base font-semibold text-white/88">
                          {spotlight.rangeLabel}
                        </p>
                      </div>
                      <div className="rounded-[24px] border border-white/10 bg-[#2d114b]/30 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
                          Current Time
                        </p>
                        <DisplayText className="mt-3 block text-[1.8rem] leading-[0.9] tracking-[-0.02em] text-white/92">
                          {spotlight.currentTimeLabel}
                        </DisplayText>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between gap-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/52">
                    <Radio className="h-4 w-4" />
                    No live slot
                  </div>
                  <h2 className="max-w-[12ch]">
                    <DisplayText className="block text-[clamp(3rem,5vw,5rem)] uppercase leading-[0.8] tracking-[0.01em] text-white">
                      Schedule data is not available right now.
                    </DisplayText>
                  </h2>
                </div>
              )}
            </section>
          </div>

          <section
            id="schedule-list"
            className="mt-6"
          >
            <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
              {days.map((day) => {
                const isActive = day.dayOfWeek === activeDay.dayOfWeek;

                return (
                  <button
                    key={day.dayOfWeek}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedDayOfWeek(day.dayOfWeek)}
                    className={cn(
                      "min-w-0 overflow-hidden rounded-[22px] border px-3 py-4 text-left transition sm:px-4",
                      isActive
                        ? "border-[#d7b3eb] bg-[linear-gradient(135deg,#fff8fd_0%,#fdf7ff_100%)] shadow-[0_14px_28px_rgba(135,60,186,0.08)]"
                        : "border-transparent bg-[#f8f2fb] hover:border-[#ecd6f7] hover:bg-white"
                    )}
                  >
                    <div>
                      <DisplayText
                        className={cn(
                          "block truncate text-[clamp(0.95rem,1.05vw,1.2rem)] uppercase leading-none tracking-[-0.04em]",
                          isActive ? "text-[#6a2fa3]" : "text-[#9d90ae]"
                        )}
                      >
                        {day.label}
                      </DisplayText>
                      <p
                        className={cn(
                          "mt-1 text-xs uppercase tracking-[0.24em]",
                          isActive ? "text-[#be8ccd]" : "text-[#c2b7cc]"
                        )}
                      >
                        {getDayCountLabel(day.slots.length)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-[24px] border border-[#f3e8fa]/70 p-4 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#f3e8fa] pb-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#ac8bc9]">
                    Daily Timeline
                  </p>
                  <DisplayText className="mt-3 block text-[2.3rem] uppercase leading-[0.95] tracking-[-0.02em] text-[#2c153e] sm:text-[2.7rem]">
                    {activeDay.label} Schedule
                  </DisplayText>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#ecdaf6] bg-white px-4 py-2 text-sm text-[#8b72a7]">
                    <CalendarDays className="h-4 w-4 text-[#ca63ac]" />
                    <span>{activeDayCount}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#ecdaf6] bg-white px-4 py-2 text-sm text-[#8b72a7]">
                    <Clock3 className="h-4 w-4 text-[#7d4bc0]" />
                    <span>{activeDayWindow}</span>
                  </div>
                  {activeLiveSlot ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd3ea] bg-[#fff5fb] px-4 py-2 text-sm text-[#dd2a88]">
                      <Radio className="h-4 w-4" />
                      <span>Live Now</span>
                    </div>
                  ) : null}
                </div>
              </div>

              {activeDay.slots.length > 0 ? (
                <div className="mt-6 grid gap-4">
                  {activeDay.slots.map((slot) => (
                    <article
                      key={slot.id}
                      className={cn(
                        "relative overflow-hidden rounded-[24px] border bg-white px-5 py-5 shadow-[0_12px_26px_rgba(95,45,150,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(95,45,150,0.08)] sm:px-6",
                        slot.isLiveNow
                          ? "border-[#f0aed5] bg-[linear-gradient(135deg,#fff8fd_0%,#fff7fc_52%,#faf2ff_100%)]"
                          : "border-[#efe4f8]"
                      )}
                    >
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,#d9d1e3_0%,#cfc6df_100%)]",
                          slot.isLiveNow
                            ? "bg-[linear-gradient(180deg,#f22686_0%,#ce2f95_46%,#7535aa_100%)]"
                            : ""
                        )}
                      />

                      <div className="grid gap-5 lg:grid-cols-[8.5rem_minmax(0,1fr)_8rem_auto] lg:items-center">
                        <div className="pl-3 sm:pl-4">
                          <DisplayText className="block text-[1.8rem] leading-[0.92] tracking-[-0.02em] text-[#5b2f84]">
                            {slot.startLabel}
                          </DisplayText>
                          <p className="mt-2 text-sm text-[#b39fc9]">{slot.durationLabel}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.26em] text-[#d3c7de]">
                            to {slot.endLabel}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-2">
                            {slot.tags.map((tag) => (
                              <span
                                key={`${slot.id}-${tag}`}
                                className={cn(
                                  "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
                                  renderTag(tag)
                                )}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {slot.programSlug ? (
                            <Link href={`/programs/${slot.programSlug}`} className="mt-4 block">
                              <DisplayText className="block text-[1.7rem] uppercase leading-[1] tracking-[-0.015em] text-[#6b46a3] transition hover:text-[#f22686] sm:text-[2rem]">
                                {slot.title}
                              </DisplayText>
                            </Link>
                          ) : (
                            <DisplayText className="mt-4 block text-[1.7rem] uppercase leading-[1] tracking-[-0.015em] text-[#6b46a3] sm:text-[2rem]">
                              {slot.title}
                            </DisplayText>
                          )}

                          {slot.notes ? (
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#9582aa]">
                              {slot.notes}
                            </p>
                          ) : null}
                        </div>

                        <div className="pl-3 sm:pl-4 lg:pl-0 lg:text-right">
                          <DisplayText className="block text-[1.65rem] leading-[0.92] tracking-[-0.015em] text-[#d0c3df]">
                            {slot.endLabel}
                          </DisplayText>
                          <p
                            className={cn(
                              "mt-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
                              slot.isLiveNow ? "text-[#f22686]" : "text-[#c9bed6]"
                            )}
                          >
                            {slot.isLiveNow ? "On Air Now" : "Scheduled"}
                          </p>
                        </div>

                        <div className="pl-3 sm:pl-4 lg:pl-0 lg:text-right">
                          {slot.programSlug ? (
                            <Link
                              href={`/programs/${slot.programSlug}`}
                              className="inline-flex items-center gap-2 rounded-full border border-[#eadcf6] bg-[#fcf8ff] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7d60a4] transition hover:border-[#dcbdf1] hover:text-[#f22686]"
                            >
                              Details
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <DisplayText className="text-[2.4rem] uppercase leading-[0.86] tracking-[0.02em] text-[#8f79aa]">
                    No schedule entries for {activeDay.label}.
                  </DisplayText>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
