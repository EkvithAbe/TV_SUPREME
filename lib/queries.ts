import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  staticAccounts,
  staticArticles,
  staticPrograms,
  staticScheduleSlots,
  staticSocialPosts,
  staticSyncRuns,
  staticVideos
} from "@/lib/static-data";
import {
  getColomboCurrentMinutes,
  getColomboDayOfWeek
} from "@/lib/utils";

import type {
  ArticleRecord,
  HomePageData,
  PlatformOverview,
  ProgramCategoryRecord,
  ProgramScheduleSlotRecord,
  ProgramWithCategory,
  ScheduleSlotProgramRecord,
  ScheduleSlotWithProgram,
  SocialAccountRecord,
  SocialPostWithAccount,
  SyncRunRecord,
  VideoWithAccount
} from "@/lib/content-model";

export type {
  ArticleRecord,
  HomePageData,
  PlatformOverview,
  ProgramCategoryRecord,
  ProgramScheduleSlotRecord,
  ProgramWithCategory,
  ScheduleSlotProgramRecord,
  ScheduleSlotWithProgram,
  SocialAccountRecord,
  SocialPostWithAccount,
  SyncRunRecord,
  VideoWithAccount
} from "@/lib/content-model";

const hasDatabase = Boolean(process.env.DATABASE_URL);

function sortByPublishedDesc<T extends { publishedAt: Date }>(items: T[]) {
  return [...items].sort(
    (left, right) => right.publishedAt.getTime() - left.publishedAt.getTime()
  );
}

function sortPrograms(items: ProgramWithCategory[]) {
  return [...items].sort((left, right) => {
    if (left.isFeatured !== right.isFeatured) {
      return left.isFeatured ? -1 : 1;
    }

    return left.title.localeCompare(right.title);
  });
}

function sortSchedule(items: ScheduleSlotWithProgram[]) {
  return [...items].sort((left, right) => {
    if (left.dayOfWeek !== right.dayOfWeek) {
      return left.dayOfWeek - right.dayOfWeek;
    }

    return left.startMinutes - right.startMinutes;
  });
}

function getStaticHomePageData(): HomePageData {
  const currentDay = getColomboDayOfWeek();
  const currentMinutes = getColomboCurrentMinutes();
  const todaysSchedule = sortSchedule(staticScheduleSlots).filter(
    (slot) => slot.dayOfWeek === currentDay
  );

  const liveNow =
    todaysSchedule.find(
      (slot) =>
        slot.startMinutes <= currentMinutes && currentMinutes < slot.endMinutes
    ) ?? todaysSchedule[0] ?? null;

  const upNext =
    todaysSchedule.find((slot) => slot.startMinutes > currentMinutes) ??
    todaysSchedule[0] ??
    null;

  return {
    featuredPrograms: sortPrograms(staticPrograms)
      .filter((program) => program.isFeatured)
      .slice(0, 4),
    latestArticles: sortByPublishedDesc(staticArticles).slice(0, 4),
    latestVideos: sortByPublishedDesc(staticVideos).slice(0, 18),
    latestSocialPosts: sortByPublishedDesc(staticSocialPosts).slice(0, 4),
    todaysSchedule,
    liveNow,
    upNext
  };
}

function normalizeCategory(
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null | undefined
): ProgramCategoryRecord | null {
  if (!category) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  };
}

function normalizeScheduleSlot(
  slot: {
    id: string;
    title: string;
    dayOfWeek: number;
    startMinutes: number;
    endMinutes: number;
    timezone: string;
    isLiveWindow: boolean;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
): ProgramScheduleSlotRecord {
  return {
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
  };
}

function normalizeProgramSummary(
  program: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string | null;
    language: string;
    imageUrl: string | null;
    isFeatured: boolean;
    status: ProgramWithCategory["status"];
    category?: {
      id: string;
      name: string;
      slug: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    createdAt: Date;
    updatedAt: Date;
  }
): Omit<ProgramWithCategory, "scheduleSlots"> {
  return {
    id: program.id,
    title: program.title,
    slug: program.slug,
    summary: program.summary,
    description: program.description,
    language: program.language,
    imageUrl: program.imageUrl,
    isFeatured: program.isFeatured,
    status: program.status,
    category: normalizeCategory(program.category),
    createdAt: program.createdAt,
    updatedAt: program.updatedAt
  };
}

function normalizeProgram(
  program: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string | null;
    language: string;
    imageUrl: string | null;
    isFeatured: boolean;
    status: ProgramWithCategory["status"];
    category?: {
      id: string;
      name: string;
      slug: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    scheduleSlots?: Array<{
      id: string;
      title: string;
      dayOfWeek: number;
      startMinutes: number;
      endMinutes: number;
      timezone: string;
      isLiveWindow: boolean;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
  }
): ProgramWithCategory {
  return {
    ...normalizeProgramSummary(program),
    scheduleSlots: (program.scheduleSlots ?? []).map(normalizeScheduleSlot)
  };
}

function normalizeScheduleSlotWithProgram(
  slot: {
    id: string;
    title: string;
    dayOfWeek: number;
    startMinutes: number;
    endMinutes: number;
    timezone: string;
    isLiveWindow: boolean;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    program?: {
      id: string;
      title: string;
      slug: string;
      imageUrl: string | null;
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } | null;
  }
): ScheduleSlotWithProgram {
  return {
    ...normalizeScheduleSlot(slot),
    program: slot.program
      ? {
          id: slot.program.id,
          title: slot.program.title,
          slug: slot.program.slug,
          imageUrl: slot.program.imageUrl,
          category: normalizeCategory(slot.program.category)
        }
      : null
  };
}

function normalizeArticle(article: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string | null;
  category: string;
  imageUrl: string | null;
  sourceUrl: string | null;
  isFeatured: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}): ArticleRecord {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    body: article.body,
    category: article.category,
    imageUrl: article.imageUrl,
    sourceUrl: article.sourceUrl,
    isFeatured: article.isFeatured,
    publishedAt: article.publishedAt,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt
  };
}

function normalizeAccount(account: {
  id: string;
  platform: SocialAccountRecord["platform"];
  externalId: string;
  handle: string | null;
  title: string;
  url: string;
  avatarUrl: string | null;
  followerCount: bigint | number | null;
  lastSyncedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} | null | undefined): SocialAccountRecord | null {
  if (!account) {
    return null;
  }

  return {
    id: account.id,
    platform: account.platform,
    externalId: account.externalId,
    handle: account.handle,
    title: account.title,
    url: account.url,
    avatarUrl: account.avatarUrl,
    followerCount: account.followerCount ? Number(account.followerCount) : 0,
    lastSyncedAt: account.lastSyncedAt,
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt
  };
}

function normalizeVideo(video: {
  id: string;
  platform: VideoWithAccount["platform"];
  externalId: string;
  accountId: string | null;
  account?: {
    id: string;
    platform: SocialAccountRecord["platform"];
    externalId: string;
    handle: string | null;
    title: string;
    url: string;
    avatarUrl: string | null;
    followerCount: bigint | number | null;
    lastSyncedAt: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  title: string;
  description: string | null;
  url: string;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  publishedAt: Date;
  durationSeconds: number | null;
  viewCount: bigint | number | null;
  likeCount: bigint | number | null;
  commentCount: bigint | number | null;
  isLive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): VideoWithAccount {
  return {
    id: video.id,
    platform: video.platform,
    externalId: video.externalId,
    accountId: video.accountId,
    account: normalizeAccount(video.account),
    title: video.title,
    description: video.description,
    url: video.url,
    embedUrl: video.embedUrl,
    thumbnailUrl: video.thumbnailUrl,
    publishedAt: video.publishedAt,
    durationSeconds: video.durationSeconds,
    viewCount: video.viewCount ? Number(video.viewCount) : 0,
    likeCount: video.likeCount ? Number(video.likeCount) : 0,
    commentCount: video.commentCount ? Number(video.commentCount) : 0,
    isLive: video.isLive,
    isFeatured: video.isFeatured,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt
  };
}

function normalizeSocialPost(post: {
  id: string;
  platform: SocialPostWithAccount["platform"];
  contentType: SocialPostWithAccount["contentType"];
  externalId: string;
  accountId: string | null;
  account?: {
    id: string;
    platform: SocialAccountRecord["platform"];
    externalId: string;
    handle: string | null;
    title: string;
    url: string;
    avatarUrl: string | null;
    followerCount: bigint | number | null;
    lastSyncedAt: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  message: string | null;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: Date;
  reactionCount: bigint | number | null;
  commentCount: bigint | number | null;
  shareCount: bigint | number | null;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): SocialPostWithAccount {
  return {
    id: post.id,
    platform: post.platform,
    contentType: post.contentType,
    externalId: post.externalId,
    accountId: post.accountId,
    account: normalizeAccount(post.account),
    message: post.message,
    url: post.url,
    thumbnailUrl: post.thumbnailUrl,
    publishedAt: post.publishedAt,
    reactionCount: post.reactionCount ? Number(post.reactionCount) : 0,
    commentCount: post.commentCount ? Number(post.commentCount) : 0,
    shareCount: post.shareCount ? Number(post.shareCount) : 0,
    isFeatured: post.isFeatured,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  };
}

function normalizeSyncRun(run: {
  id: string;
  platform: SyncRunRecord["platform"];
  target: string;
  status: SyncRunRecord["status"];
  startedAt: Date;
  completedAt: Date | null;
  itemsProcessed: number;
  message: string | null;
  createdAt: Date;
}): SyncRunRecord {
  return {
    id: run.id,
    platform: run.platform,
    target: run.target,
    status: run.status,
    startedAt: run.startedAt,
    completedAt: run.completedAt,
    itemsProcessed: run.itemsProcessed,
    message: run.message,
    createdAt: run.createdAt
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  noStore();

  if (!hasDatabase) {
    return getStaticHomePageData();
  }

  const currentDay = getColomboDayOfWeek();
  const currentMinutes = getColomboCurrentMinutes();

  const [
    featuredPrograms,
    latestArticles,
    latestVideos,
    latestSocialPosts,
    todaysSchedule
  ] = await Promise.all([
    prisma.program.findMany({
      where: { isFeatured: true },
      include: { category: true },
      take: 4,
      orderBy: [{ updatedAt: "desc" }]
    }),
    prisma.article.findMany({
      take: 4,
      orderBy: [{ publishedAt: "desc" }]
    }),
    prisma.video.findMany({
      take: 18,
      include: { account: true },
      orderBy: [{ publishedAt: "desc" }]
    }),
    prisma.socialPost.findMany({
      take: 4,
      include: { account: true },
      orderBy: [{ publishedAt: "desc" }]
    }),
    prisma.scheduleSlot.findMany({
      where: { dayOfWeek: currentDay },
      include: {
        program: {
          include: { category: true }
        }
      },
      orderBy: [{ startMinutes: "asc" }]
    })
  ]);

  const normalizedSchedule = todaysSchedule.map(normalizeScheduleSlotWithProgram);
  const liveNow =
    normalizedSchedule.find(
      (slot) =>
        slot.startMinutes <= currentMinutes && currentMinutes < slot.endMinutes
    ) ?? normalizedSchedule[0] ?? null;

  const upNext =
    normalizedSchedule.find((slot) => slot.startMinutes > currentMinutes) ??
    normalizedSchedule[0] ??
    null;

  return {
    featuredPrograms: featuredPrograms.map(normalizeProgram),
    latestArticles: latestArticles.map(normalizeArticle),
    latestVideos: latestVideos.map(normalizeVideo),
    latestSocialPosts: latestSocialPosts.map(normalizeSocialPost),
    todaysSchedule: normalizedSchedule,
    liveNow,
    upNext
  };
}

export async function getProgramDirectory(): Promise<ProgramWithCategory[]> {
  noStore();

  if (!hasDatabase) {
    return sortPrograms(staticPrograms);
  }

  const programs = await prisma.program.findMany({
    include: { category: true },
    orderBy: [{ isFeatured: "desc" }, { title: "asc" }]
  });

  return programs.map(normalizeProgram);
}

export async function getProgramBySlug(
  slug: string
): Promise<ProgramWithCategory | null> {
  noStore();

  if (!hasDatabase) {
    return staticPrograms.find((program) => program.slug === slug) ?? null;
  }

  const program = await prisma.program.findUnique({
    where: { slug },
    include: {
      category: true,
      scheduleSlots: {
        orderBy: [{ dayOfWeek: "asc" }, { startMinutes: "asc" }]
      }
    }
  });

  return program ? normalizeProgram(program) : null;
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleRecord | null> {
  noStore();

  if (!hasDatabase) {
    return staticArticles.find((article) => article.slug === slug) ?? null;
  }

  const article = await prisma.article.findUnique({
    where: { slug }
  });

  return article ? normalizeArticle(article) : null;
}

export async function getWeeklySchedule(): Promise<ScheduleSlotWithProgram[]> {
  noStore();

  if (!hasDatabase) {
    return sortSchedule(staticScheduleSlots);
  }

  const schedule = await prisma.scheduleSlot.findMany({
    include: {
      program: {
        include: { category: true }
      }
    },
    orderBy: [{ dayOfWeek: "asc" }, { startMinutes: "asc" }]
  });

  return schedule.map(normalizeScheduleSlotWithProgram);
}

export async function getPlatformOverview(): Promise<PlatformOverview> {
  noStore();

  if (!hasDatabase) {
    return {
      programCount: staticPrograms.length,
      articleCount: staticArticles.length,
      videoCount: staticVideos.length,
      socialCount: staticSocialPosts.length,
      accountCount: staticAccounts.length,
      syncRuns: [...staticSyncRuns]
    };
  }

  const [
    programCount,
    articleCount,
    videoCount,
    socialCount,
    accountCount,
    syncRuns
  ] = await Promise.all([
    prisma.program.count(),
    prisma.article.count(),
    prisma.video.count(),
    prisma.socialPost.count(),
    prisma.socialAccount.count(),
    prisma.syncRun.findMany({
      take: 8,
      orderBy: [{ startedAt: "desc" }]
    })
  ]);

  return {
    programCount,
    articleCount,
    videoCount,
    socialCount,
    accountCount,
    syncRuns: syncRuns.map(normalizeSyncRun)
  };
}
