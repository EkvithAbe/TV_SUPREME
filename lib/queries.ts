import { unstable_noStore as noStore } from "next/cache";

import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getColomboCurrentMinutes, getColomboDayOfWeek } from "@/lib/utils";

export type ProgramWithCategory = Prisma.ProgramGetPayload<{
  include: { category: true };
}>;

export type VideoWithAccount = Prisma.VideoGetPayload<{
  include: { account: true };
}>;

export type SocialPostWithAccount = Prisma.SocialPostGetPayload<{
  include: { account: true };
}>;

export type ArticleRecord = Prisma.ArticleGetPayload<Record<string, never>>;

export async function getHomePageData() {
  noStore();

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
    featuredPrograms,
    latestArticles,
    latestVideos,
    latestSocialPosts,
    todaysSchedule,
    liveNow,
    upNext
  };
}

export async function getProgramDirectory() {
  noStore();

  return prisma.program.findMany({
    include: { category: true },
    orderBy: [{ isFeatured: "desc" }, { title: "asc" }]
  });
}

export async function getProgramBySlug(slug: string) {
  noStore();

  return prisma.program.findUnique({
    where: { slug },
    include: {
      category: true,
      scheduleSlots: {
        orderBy: [{ dayOfWeek: "asc" }, { startMinutes: "asc" }]
      }
    }
  });
}

export async function getArticleBySlug(slug: string) {
  noStore();

  return prisma.article.findUnique({
    where: { slug }
  });
}

export async function getWeeklySchedule() {
  noStore();

  return prisma.scheduleSlot.findMany({
    include: {
      program: {
        include: { category: true }
      }
    },
    orderBy: [{ dayOfWeek: "asc" }, { startMinutes: "asc" }]
  });
}

export async function getPlatformOverview() {
  noStore();

  const [programCount, articleCount, videoCount, socialCount, accountCount, syncRuns] =
    await Promise.all([
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
    syncRuns
  };
}
