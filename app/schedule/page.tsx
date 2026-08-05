import { ScheduleGuide } from "@/components/schedule-guide";
import { getWeeklySchedule } from "@/lib/queries";
import { getColomboCurrentMinutes, getColomboDayOfWeek } from "@/lib/utils";

const MINUTES_IN_DAY = 24 * 60;

const DAY_LABELS: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
};

type NormalizedSlot = {
  id: string;
  dayOfWeek: number;
  title: string;
  startMinutes: number;
  endMinutes: number;
  startLabel: string;
  endLabel: string;
  rangeLabel: string;
  durationLabel: string;
  tags: string[];
  notes: string | null;
  programSlug: string | null;
  absoluteStart: number;
  absoluteEnd: number;
};

function normalizeMinutes(minutes: number) {
  return ((minutes % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY;
}

function formatGuideTime(minutes: number) {
  const normalizedMinutes = normalizeMinutes(minutes);
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;
  const dayOffset = Math.floor(minutes / MINUTES_IN_DAY);
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 || 12;

  return `${normalizedHours}:${mins.toString().padStart(2, "0")} ${suffix}${
    dayOffset > 0 ? ` +${dayOffset}` : ""
  }`;
}

function formatClockTime(minutes: number) {
  const normalizedMinutes = normalizeMinutes(minutes);
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;

  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function formatDuration(startMinutes: number, endMinutes: number) {
  const totalMinutes = Math.max(endMinutes - startMinutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
}

function formatRemaining(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m remaining`;
  }

  if (hours > 0) {
    return `${hours}h remaining`;
  }

  return `${minutes} min remaining`;
}

function getPrimaryTag(title: string, categoryName: string, isLiveWindow: boolean) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("piritha") || normalizedTitle.includes("saddharm")) {
    return "RELIGIOUS";
  }

  if (normalizedTitle.includes("pjfm") || normalizedTitle.includes("rhythm")) {
    return "MUSIC";
  }

  if (normalizedTitle.includes("cna") || normalizedTitle.includes("news")) {
    return "NEWS";
  }

  if (normalizedTitle.includes("match") || normalizedTitle.includes("ipl") || normalizedTitle.includes("sports")) {
    return "SPORTS";
  }

  if (normalizedTitle.includes("every morning")) {
    return "LIFESTYLE";
  }

  if (normalizedTitle.includes("home theatre") || normalizedTitle.includes("cobra")) {
    return "MOVIE";
  }

  if (normalizedTitle.includes("vishwa")) {
    return "VARIETY";
  }

  if (isLiveWindow) {
    return "LIVE";
  }

  return categoryName.toUpperCase();
}

function getTags(title: string, categoryName: string, isLiveWindow: boolean) {
  const tags = [getPrimaryTag(title, categoryName, isLiveWindow)];

  if (isLiveWindow || title.toLowerCase().includes("live")) {
    tags.push("LIVE");
  }

  return Array.from(new Set(tags));
}

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const schedule = await getWeeklySchedule();
  const currentDayOfWeek = getColomboDayOfWeek();
  const currentMinutes = getColomboCurrentMinutes();
  const currentWeekMinute = (currentDayOfWeek - 1) * MINUTES_IN_DAY + currentMinutes;

  const normalizedSchedule = schedule
    .map<NormalizedSlot>((slot) => {
      const categoryName = slot.program?.category?.name ?? "Program";

      return {
        id: slot.id,
        dayOfWeek: slot.dayOfWeek,
        title: slot.title,
        startMinutes: slot.startMinutes,
        endMinutes: slot.endMinutes,
        startLabel: formatGuideTime(slot.startMinutes),
        endLabel: formatGuideTime(slot.endMinutes),
        rangeLabel: `${formatGuideTime(slot.startMinutes)} - ${formatGuideTime(slot.endMinutes)}`,
        durationLabel: formatDuration(slot.startMinutes, slot.endMinutes),
        tags: getTags(slot.title, categoryName, slot.isLiveWindow),
        notes: slot.notes,
        programSlug: slot.program?.slug ?? null,
        absoluteStart: (slot.dayOfWeek - 1) * MINUTES_IN_DAY + slot.startMinutes,
        absoluteEnd: (slot.dayOfWeek - 1) * MINUTES_IN_DAY + slot.endMinutes
      };
    })
    .sort((left, right) => left.absoluteStart - right.absoluteStart);

  const currentSlot =
    normalizedSchedule.find(
      (slot) => slot.absoluteStart <= currentWeekMinute && currentWeekMinute < slot.absoluteEnd
    ) ?? null;

  const upcomingSlot =
    normalizedSchedule.find((slot) => slot.absoluteStart > currentWeekMinute) ??
    normalizedSchedule[0] ??
    null;

  const spotlightSlot = currentSlot ?? upcomingSlot;
  const spotlightIndex = spotlightSlot
    ? normalizedSchedule.findIndex((slot) => slot.id === spotlightSlot.id)
    : -1;
  const upNextSlot =
    spotlightIndex >= 0 && normalizedSchedule.length > 0
      ? normalizedSchedule[(spotlightIndex + 1) % normalizedSchedule.length]
      : null;

  const days = Array.from({ length: 7 }, (_, index) => {
    const dayOfWeek = index + 1;
    const slots = normalizedSchedule
      .filter((slot) => slot.dayOfWeek === dayOfWeek)
      .map((slot) => ({
        id: slot.id,
        title: slot.title,
        startLabel: slot.startLabel,
        endLabel: slot.endLabel,
        durationLabel: slot.durationLabel,
        tags: slot.tags,
        notes: slot.notes,
        programSlug: slot.programSlug,
        isLiveNow: currentSlot?.id === slot.id
      }));

    return {
      dayOfWeek,
      label: DAY_LABELS[dayOfWeek] ?? "Day",
      slots
    };
  });

  return (
    <ScheduleGuide
      days={days}
      initialDayOfWeek={currentDayOfWeek}
      spotlight={
        spotlightSlot
          ? {
              statusLabel: currentSlot ? "NOW PLAYING" : "UP NEXT",
              title: spotlightSlot.title,
              rangeLabel: spotlightSlot.rangeLabel,
              remainingLabel:
                currentSlot && spotlightSlot.id === currentSlot.id
                  ? formatRemaining(spotlightSlot.absoluteEnd - currentWeekMinute)
                  : null,
              progressPercent:
                currentSlot && spotlightSlot.id === currentSlot.id
                  ? ((currentWeekMinute - spotlightSlot.absoluteStart) /
                      (spotlightSlot.absoluteEnd - spotlightSlot.absoluteStart)) *
                    100
                  : 0,
              programSlug: spotlightSlot.programSlug,
              currentTimeLabel: formatClockTime(currentMinutes),
              currentDayLabel: DAY_LABELS[currentDayOfWeek] ?? "Today",
              heroTitle: spotlightSlot.title,
              upNextTitle: upNextSlot?.title ?? null,
              upNextStartLabel: upNextSlot?.startLabel ?? null
            }
          : null
      }
    />
  );
}
