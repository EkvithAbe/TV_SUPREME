import {
  PROGRAM_STATUS,
  SOCIAL_CONTENT_TYPE,
  SOCIAL_PLATFORM,
  SYNC_STATUS
} from "@/lib/content-model";
import { scheduleDefinitions } from "@/lib/schedule-definitions";

import type {
  ArticleRecord,
  ProgramCategoryRecord,
  ProgramScheduleSlotRecord,
  ProgramWithCategory,
  ScheduleSlotWithProgram,
  SocialAccountRecord,
  SocialPostWithAccount,
  SyncRunRecord,
  VideoWithAccount
} from "@/lib/content-model";

const createdAt = new Date("2026-07-30T08:00:00+05:30");

export const staticCategories: ProgramCategoryRecord[] = [
  {
    id: "category-news",
    name: "News",
    slug: "news",
    description: "Breaking news, politics, and current affairs programming.",
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "category-drama",
    name: "Drama",
    slug: "drama",
    description: "Flagship serial drama and narrative entertainment.",
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "category-lifestyle",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Morning shows, food, travel, and talk programming.",
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "category-sports",
    name: "Sports",
    slug: "sports",
    description: "Sports news, match coverage, and highlights.",
    createdAt,
    updatedAt: createdAt
  }
];

const categoryMap = new Map(staticCategories.map((category) => [category.slug, category]));

export const staticPrograms: ProgramWithCategory[] = [
  {
    id: "program-supreme-prime-time-news",
    title: "Supreme Prime Time News",
    slug: "supreme-prime-time-news",
    summary:
      "The main nightly news bulletin for TV Supreme with national, political, and business coverage.",
    description:
      "A flagship nightly bulletin designed to combine breaking national stories with context, field reporting, and digital follow-through.",
    language: "si",
    imageUrl: "/images/news-cover.jpeg",
    isFeatured: true,
    status: PROGRAM_STATUS.ACTIVE,
    category: categoryMap.get("news") ?? null,
    scheduleSlots: [],
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "program-janahada",
    title: "Janahada",
    slug: "janahada",
    summary: "Prime-time current affairs discussion focused on public policy and civic issues.",
    description:
      "A studio-led discussion format built around public questions, political accountability, and next-day digital cutdowns.",
    language: "si",
    imageUrl: "/images/janahada.jpeg",
    isFeatured: true,
    status: PROGRAM_STATUS.ACTIVE,
    category: categoryMap.get("news") ?? null,
    scheduleSlots: [],
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "program-samanmaliya",
    title: "Samanmaliya",
    slug: "samanmaliya",
    summary: "A leading dramatic series aimed at the core evening entertainment slot.",
    description:
      "Serial storytelling designed for both broadcast appointment viewing and short-form recap distribution.",
    language: "si",
    imageUrl: "/images/samanmaliya.jpeg",
    isFeatured: true,
    status: PROGRAM_STATUS.ACTIVE,
    category: categoryMap.get("drama") ?? null,
    scheduleSlots: [],
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "program-yowun-wasanthae",
    title: "Yowun Wasanthe",
    slug: "yowun-wasanthe",
    summary: "Youth-focused drama with strong social engagement potential.",
    description:
      "A youth-skewing serial structured to support episodic clips, cast-led social promotion, and live fan response.",
    language: "si",
    imageUrl: "/images/yowun-wasanthaye.jpeg",
    isFeatured: true,
    status: PROGRAM_STATUS.ACTIVE,
    category: categoryMap.get("drama") ?? null,
    scheduleSlots: [],
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "program-every-morning",
    title: "Every Morning",
    slug: "every-morning",
    summary:
      "Lifestyle-led morning program covering wellness, food, and practical daily segments.",
    description:
      "A daily studio show built for repeatable segment publishing across Facebook, YouTube, and the public site.",
    language: "si",
    imageUrl: "/images/every-morning.jpeg",
    isFeatured: false,
    status: PROGRAM_STATUS.ACTIVE,
    category: categoryMap.get("lifestyle") ?? null,
    scheduleSlots: [],
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "program-sports-supreme",
    title: "Sports Supreme",
    slug: "sports-supreme",
    summary: "Daily sports roundup with cricket-led coverage and short-form highlights packaging.",
    description:
      "The sports brand for headline recaps, score explainers, and social-first clips tied back into TV broadcast coverage.",
    language: "si",
    imageUrl: "/images/cricket.jpeg",
    isFeatured: false,
    status: PROGRAM_STATUS.ACTIVE,
    category: categoryMap.get("sports") ?? null,
    scheduleSlots: [],
    createdAt,
    updatedAt: createdAt
  }
];

const programMap = new Map(staticPrograms.map((program) => [program.slug, program]));

function buildScheduleProgram(programSlug?: string | null) {
  const program = programSlug ? programMap.get(programSlug) : null;

  if (!program) {
    return null;
  }

  return {
    id: program.id,
    title: program.title,
    slug: program.slug,
    imageUrl: program.imageUrl,
    category: program.category
  };
}

export const staticScheduleSlots: ScheduleSlotWithProgram[] = scheduleDefinitions.map((slot) => ({
  id: `${slot.programSlug ?? slot.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${slot.dayOfWeek}-${slot.startMinutes}`,
  title: slot.title,
  dayOfWeek: slot.dayOfWeek,
  startMinutes: slot.startMinutes,
  endMinutes: slot.endMinutes,
  timezone: "Asia/Colombo",
  isLiveWindow: slot.isLiveWindow,
  notes: slot.notes,
  program: buildScheduleProgram(slot.programSlug),
  createdAt,
  updatedAt: createdAt
}));

for (const program of staticPrograms) {
  program.scheduleSlots = staticScheduleSlots
    .filter((slot) => slot.program?.slug === program.slug)
    .map<ProgramScheduleSlotRecord>((slot) => ({
      id: slot.id,
      title: slot.title,
      dayOfWeek: slot.dayOfWeek,
      startMinutes: slot.startMinutes,
      endMinutes: slot.endMinutes,
      timezone: slot.timezone,
      isLiveWindow: slot.isLiveWindow,
      notes: slot.notes,
      createdAt: slot.createdAt,
      updatedAt: slot.updatedAt
    }));
}

export const staticArticles: ArticleRecord[] = [
  {
    id: "article-platform-rebuild",
    title: "TV Supreme rebuild begins with PostgreSQL-backed publishing",
    slug: "tv-supreme-rebuild-postgresql-publishing",
    excerpt:
      "The new platform foundation moves TV Supreme away from hardcoded mock pages into a structured content system.",
    body:
      "The rebuilt stack introduces structured records for programs, schedules, news, and social publishing so the channel can move beyond static pages.",
    category: "Platform",
    imageUrl: "/images/news-cover.jpeg",
    sourceUrl: null,
    isFeatured: true,
    publishedAt: new Date("2026-07-30T08:00:00+05:30"),
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "article-scheduling",
    title: "Program scheduling is now modeled as weekly recurring slots",
    slug: "program-scheduling-weekly-recurring-slots",
    excerpt:
      "A recurring slot model now powers live windows, next-up panels, and the public program guide.",
    body:
      "The recurring schedule structure now drives the live page, daily event cards, and future reminder-style surfaces from one source.",
    category: "Operations",
    imageUrl: "/images/live.jpeg",
    sourceUrl: null,
    isFeatured: false,
    publishedAt: new Date("2026-07-29T15:00:00+05:30"),
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "article-social-sync",
    title: "Facebook and YouTube sync layer added to the new TV Supreme stack",
    slug: "facebook-youtube-sync-layer-added",
    excerpt:
      "The ingestion layer is designed to normalize posts and videos into first-class records for the site and admin tools.",
    body:
      "The channel’s social ingestion layer now prepares videos and posts for homepage use, archive views, and operator-facing sync visibility.",
    category: "Social",
    imageUrl: "/images/global-pulse.jpeg",
    sourceUrl: null,
    isFeatured: false,
    publishedAt: new Date("2026-07-28T11:30:00+05:30"),
    createdAt,
    updatedAt: createdAt
  }
];

export const staticAccounts: SocialAccountRecord[] = [
  {
    id: "account-youtube-main",
    platform: SOCIAL_PLATFORM.YOUTUBE,
    externalId: "@tvsupreme",
    handle: "@tvsupreme",
    title: "TV Supreme",
    url: "https://www.youtube.com/@tvsupreme",
    avatarUrl: null,
    followerCount: 0,
    lastSyncedAt: null,
    isActive: true,
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "account-youtube-news",
    platform: SOCIAL_PLATFORM.YOUTUBE,
    externalId: "@tvsupremenews",
    handle: "@tvsupremenews",
    title: "TV Supreme News",
    url: "https://www.youtube.com/@tvsupremenews",
    avatarUrl: null,
    followerCount: 0,
    lastSyncedAt: null,
    isActive: true,
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "account-facebook-main",
    platform: SOCIAL_PLATFORM.FACEBOOK,
    externalId: "tvsupremelk",
    handle: "tvsupremelk",
    title: "TV Supreme",
    url: "https://www.facebook.com/tvsupremelk/",
    avatarUrl: null,
    followerCount: 0,
    lastSyncedAt: null,
    isActive: true,
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "account-facebook-news",
    platform: SOCIAL_PLATFORM.FACEBOOK,
    externalId: "tvsupremenews",
    handle: "tvsupremenews",
    title: "TV Supreme News",
    url: "https://www.facebook.com/tvsupremenews/",
    avatarUrl: null,
    followerCount: 0,
    lastSyncedAt: null,
    isActive: true,
    createdAt,
    updatedAt: createdAt
  }
];

const accountMap = new Map(staticAccounts.map((account) => [account.id, account]));

export const staticVideos: VideoWithAccount[] = [
  {
    id: "video-seed-live-window",
    platform: SOCIAL_PLATFORM.YOUTUBE,
    externalId: "seed-live-window",
    accountId: "account-youtube-main",
    account: accountMap.get("account-youtube-main") ?? null,
    title: "Supreme Prime Time News | Evening bulletin window",
    description:
      "Seed video record representing the YouTube dataset for the rebuilt platform.",
    url: "https://www.youtube.com/watch?v=seed-live-window",
    embedUrl: "https://www.youtube.com/embed/seed-live-window",
    thumbnailUrl: "/images/live.jpeg",
    publishedAt: new Date("2026-07-30T19:00:00+05:30"),
    durationSeconds: null,
    viewCount: 14520,
    likeCount: 0,
    commentCount: 0,
    isLive: true,
    isFeatured: true,
    createdAt,
    updatedAt: createdAt
  }
];

export const staticSocialPosts: SocialPostWithAccount[] = [
  {
    id: "post-seed-facebook-launch",
    platform: SOCIAL_PLATFORM.FACEBOOK,
    contentType: SOCIAL_CONTENT_TYPE.POST,
    externalId: "seed-facebook-launch",
    accountId: "account-facebook-main",
    account: accountMap.get("account-facebook-main") ?? null,
    message:
      "Launching the rebuilt TV Supreme platform foundation with structured program, schedule, and social data.",
    url: "https://www.facebook.com/tvsupremelk/",
    thumbnailUrl: "/images/news-cover.jpeg",
    publishedAt: new Date("2026-07-30T12:00:00+05:30"),
    reactionCount: 1240,
    commentCount: 142,
    shareCount: 88,
    isFeatured: true,
    createdAt,
    updatedAt: createdAt
  }
];

export const staticSyncRuns: SyncRunRecord[] = [
  {
    id: "sync-youtube-seed",
    platform: SOCIAL_PLATFORM.YOUTUBE,
    target: "@tvsupreme",
    status: SYNC_STATUS.SUCCESS,
    startedAt: new Date("2026-07-30T19:05:00+05:30"),
    completedAt: new Date("2026-07-30T19:06:00+05:30"),
    itemsProcessed: 1,
    message: "Seed YouTube media imported.",
    createdAt
  },
  {
    id: "sync-facebook-seed",
    platform: SOCIAL_PLATFORM.FACEBOOK,
    target: "tvsupremelk",
    status: SYNC_STATUS.SUCCESS,
    startedAt: new Date("2026-07-30T12:05:00+05:30"),
    completedAt: new Date("2026-07-30T12:06:00+05:30"),
    itemsProcessed: 1,
    message: "Seed Facebook post imported.",
    createdAt
  }
];
