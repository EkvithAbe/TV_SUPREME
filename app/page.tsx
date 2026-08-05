import { HomeEventsSection } from "@/components/home-events-section";
import { HomeHeroBanner } from "@/components/home-hero-banner";
import { LatestProgramVideosSection } from "@/components/latest-program-videos-section";
import { HomeProgramsParallax } from "@/components/home-programs-parallax";
import { TrendingProgramsShowcase } from "@/components/trending-programs-showcase";
import { getHomePageData, getProgramDirectory, getWeeklySchedule } from "@/lib/queries";
import { getColomboCurrentMinutes, getColomboDayOfWeek } from "@/lib/utils";

const DAY_LABELS: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "Asia/Colombo"
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  timeZone: "Asia/Colombo"
});

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Colombo"
});

function getColomboStartOfDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

  const year = Number(parts.year ?? "1970");
  const month = Number(parts.month ?? "1");
  const day = Number(parts.day ?? "1");

  return new Date(Date.UTC(year, month - 1, day) - (5 * 60 + 30) * 60 * 1000);
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

function buildProgramKeywords(title: string, categoryName?: string | null) {
  const baseKeywords = new Set(tokenize(title));
  const normalizedTitle = normalizeText(title);

  if (normalizedTitle.includes("prime time")) {
    baseKeywords.add("prime");
    baseKeywords.add("time");
    baseKeywords.add("news");
  }

  if (normalizedTitle.includes("sports")) {
    baseKeywords.add("sports");
    baseKeywords.add("cricket");
  }

  if (normalizedTitle.includes("morning")) {
    baseKeywords.add("morning");
  }

  if (normalizedTitle.includes("drama")) {
    baseKeywords.add("drama");
  }

  for (const token of tokenize(categoryName ?? "")) {
    baseKeywords.add(token);
  }

  return Array.from(baseKeywords);
}

function scoreVideoMatch(
  programTitle: string,
  categoryName: string | null | undefined,
  video: Awaited<ReturnType<typeof getHomePageData>>["latestVideos"][number]
) {
  const haystack = normalizeText(`${video.title} ${video.description ?? ""}`);
  const titleSlug = normalizeText(programTitle).replace(/\s+/g, " ").trim();
  const keywords = buildProgramKeywords(programTitle, categoryName);

  let score = 0;

  if (titleSlug && haystack.includes(titleSlug)) {
    score += 10;
  }

  for (const keyword of keywords) {
    if (haystack.includes(keyword)) {
      score += 2;
    }
  }

  return score;
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [data, programDirectory, weeklySchedule] = await Promise.all([
    getHomePageData(),
    getProgramDirectory(),
    getWeeklySchedule()
  ]);

  const featuredEventSlots = (() => {
    const currentDay = getColomboDayOfWeek();
    const currentMinutes = getColomboCurrentMinutes();
    const todayStart = getColomboStartOfDay();

    return weeklySchedule
      .map((slot) => {
        const baseDayOffset = (slot.dayOfWeek - currentDay + 7) % 7;
        const dayOffset =
          baseDayOffset === 0 && slot.startMinutes <= currentMinutes
            ? 7
            : baseDayOffset;

        return {
          slot,
          dayOffset
        };
      })
      .sort((left, right) => {
        if (left.dayOffset !== right.dayOffset) {
          return left.dayOffset - right.dayOffset;
        }

        return left.slot.startMinutes - right.slot.startMinutes;
      })
      .slice(0, 5)
      .map(({ slot, dayOffset }) => {
        const eventDate = new Date(todayStart.getTime() + dayOffset * 24 * 60 * 60 * 1000);

        return {
          id: slot.id,
          title: slot.program?.title ?? slot.title,
          slug: slot.program?.slug ?? null,
          categoryName: slot.program?.category?.name ?? "Program",
          imageUrl: slot.program?.imageUrl ?? "/images/live.jpeg",
          startMinutes: slot.startMinutes,
          endMinutes: slot.endMinutes,
          notes: slot.notes ?? null,
          isLiveWindow: slot.isLiveWindow,
          dayLabel: DAY_LABELS[slot.dayOfWeek] ?? "Upcoming",
          monthLabel: monthFormatter.format(eventDate).toUpperCase(),
          dayNumber: dayFormatter.format(eventDate),
          fullDateLabel: longDateFormatter.format(eventDate),
          badgeLabel: slot.isLiveWindow
            ? "Flagship"
            : slot.program?.category?.name ?? "Program",
          stateLabel:
            dayOffset === 0
              ? "Later today"
              : dayOffset === 1
                ? "Tomorrow"
                : "Upcoming"
        };
      });
  })();

  const trendingShowcasePrograms = programDirectory.map((program, index) => {
    const matchedVideos = data.latestVideos
      .map((video) => ({
        video,
        score: scoreVideoMatch(program.title, program.category?.name, video)
      }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score)
      .map((entry) => entry.video);

    const fallbackVideo =
      matchedVideos[0] ?? data.latestVideos[index % Math.max(data.latestVideos.length, 1)];

    const relatedVideos = matchedVideos.length > 0
      ? matchedVideos
      : fallbackVideo
        ? [fallbackVideo]
        : [];

    return {
      id: program.id,
      title: program.title,
      slug: program.slug,
      summary: program.summary,
      imageUrl: program.imageUrl,
      categoryName: program.category?.name ?? null,
      status: program.status,
      relatedVideos: relatedVideos.map((video) => ({
        id: video.id,
        title: video.title,
        description: video.description ?? null,
        url: video.url,
        embedUrl: video.embedUrl ?? null,
        thumbnailUrl: video.thumbnailUrl ?? null,
        publishedAt: video.publishedAt.toISOString(),
        isLive: video.isLive,
        viewCount: video.viewCount ? Number(video.viewCount) : 0,
        accountTitle: video.account?.title ?? null
      }))
    };
  });

  const heroSlides = trendingShowcasePrograms
    .filter((program) => Boolean(program.imageUrl))
    .slice(0, 5)
    .map((program) => ({
      id: program.id,
      title: program.title,
      summary: program.summary,
      imageUrl: program.imageUrl ?? "/images/news-cover.jpeg",
      href: `/programs/${program.slug}`,
      label: program.categoryName ?? "Featured Program"
    }));

  const latestProgramVideos = (() => {
    const videos: Array<{
      id: string;
      programTitle: string;
      programSlug: string | null;
      categoryName: string;
      videoTitle: string;
      description: string | null;
      thumbnailUrl: string;
      embedUrl: string | null;
      url: string;
      publishedAt: string;
      accountTitle: string | null;
      viewCount: number;
      isLive: boolean;
    }> = trendingShowcasePrograms
      .filter((program) => Boolean(program.imageUrl) || program.relatedVideos.length > 0)
      .map((program) => {
        const featuredVideo = program.relatedVideos[0] ?? null;
        const programTitleSlug = normalizeText(program.title).replace(/\s+/g, " ").trim();
        const featuredVideoHaystack = normalizeText(
          `${featuredVideo?.title ?? ""} ${featuredVideo?.description ?? ""}`
        );
        const hasProgramSpecificVideo =
          Boolean(featuredVideo) &&
          Boolean(programTitleSlug) &&
          featuredVideoHaystack.includes(programTitleSlug);

        return {
          id: `${program.id}-${featuredVideo?.id ?? "program"}`,
          programTitle: program.title,
          programSlug: program.slug,
          categoryName: program.categoryName ?? "Program",
          videoTitle: hasProgramSpecificVideo
            ? featuredVideo?.title ?? `${program.title} | Latest episode`
            : `${program.title} | Latest episode`,
          description: hasProgramSpecificVideo
            ? featuredVideo?.description ?? program.summary
            : program.summary,
          thumbnailUrl:
            program.imageUrl ?? featuredVideo?.thumbnailUrl ?? "/images/live.jpeg",
          embedUrl: hasProgramSpecificVideo ? featuredVideo?.embedUrl ?? null : null,
          url: hasProgramSpecificVideo
            ? featuredVideo?.url ?? `/programs/${program.slug}`
            : `/programs/${program.slug}`,
          publishedAt:
            featuredVideo?.publishedAt ?? new Date(0).toISOString(),
          accountTitle: featuredVideo?.accountTitle ?? "TV Supreme",
          viewCount: hasProgramSpecificVideo ? featuredVideo?.viewCount ?? 0 : 0,
          isLive: hasProgramSpecificVideo ? featuredVideo?.isLive ?? false : false
        };
      })
      .sort((left, right) => {
        const dateDifference =
          new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();

        if (dateDifference !== 0) {
          return dateDifference;
        }

        return right.viewCount - left.viewCount;
      })
      .slice(0, 7);

    if (videos.length < 7) {
      const existingIds = new Set(videos.map((video) => video.id));

      for (const video of data.latestVideos) {
        const fallbackId = `fallback-${video.id}`;

        if (existingIds.has(fallbackId)) {
          continue;
        }

        existingIds.add(fallbackId);
        videos.push({
          id: fallbackId,
          programTitle: video.account?.title ?? "TV Supreme",
          programSlug: null,
          categoryName: video.platform,
          videoTitle: video.title,
          description: video.description ?? null,
          thumbnailUrl: video.thumbnailUrl ?? "/images/live.jpeg",
          embedUrl: video.embedUrl ?? null,
          url: video.url,
          publishedAt: video.publishedAt.toISOString(),
          accountTitle: video.account?.title ?? null,
          viewCount: video.viewCount ? Number(video.viewCount) : 0,
          isLive: video.isLive
        });

        if (videos.length === 7) {
          break;
        }
      }
    }

    return videos;
  })();

  return (
    <div className="relative isolate overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 z-0 bg-white" />

      <div className="relative z-20">
        <HomeHeroBanner slides={heroSlides} />
        <HomeEventsSection events={featuredEventSlots} />

        <section id="shows" className="relative border-t border-supreme-ink/10 py-16 lg:py-20">
          <div className="section-wrap">
            <TrendingProgramsShowcase programs={trendingShowcasePrograms} />
          </div>
        </section>

        <LatestProgramVideosSection videos={latestProgramVideos} />

        <HomeProgramsParallax />
      </div>
    </div>
  );
}
