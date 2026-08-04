import type {
  ProgramStatus,
  SocialContentType,
  SocialPlatform,
  SyncStatus
} from "@prisma/client";

export type ProgramCategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProgramScheduleSlotRecord = {
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
};

export type ScheduleSlotProgramRecord = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  category: ProgramCategoryRecord | null;
};

export type ScheduleSlotWithProgram = ProgramScheduleSlotRecord & {
  program: ScheduleSlotProgramRecord | null;
};

export type ProgramWithCategory = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  language: string;
  imageUrl: string | null;
  isFeatured: boolean;
  status: ProgramStatus;
  category: ProgramCategoryRecord | null;
  scheduleSlots: ProgramScheduleSlotRecord[];
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleRecord = {
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
};

export type SocialAccountRecord = {
  id: string;
  platform: SocialPlatform;
  externalId: string;
  handle: string | null;
  title: string;
  url: string;
  avatarUrl: string | null;
  followerCount: number;
  lastSyncedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type VideoWithAccount = {
  id: string;
  platform: SocialPlatform;
  externalId: string;
  accountId: string | null;
  account: SocialAccountRecord | null;
  title: string;
  description: string | null;
  url: string;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  publishedAt: Date;
  durationSeconds: number | null;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SocialPostWithAccount = {
  id: string;
  platform: SocialPlatform;
  contentType: SocialContentType;
  externalId: string;
  accountId: string | null;
  account: SocialAccountRecord | null;
  message: string | null;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: Date;
  reactionCount: number;
  commentCount: number;
  shareCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SyncRunRecord = {
  id: string;
  platform: SocialPlatform;
  target: string;
  status: SyncStatus;
  startedAt: Date;
  completedAt: Date | null;
  itemsProcessed: number;
  message: string | null;
  createdAt: Date;
};

export type PlatformOverview = {
  programCount: number;
  articleCount: number;
  videoCount: number;
  socialCount: number;
  accountCount: number;
  syncRuns: SyncRunRecord[];
};

export type HomePageData = {
  featuredPrograms: ProgramWithCategory[];
  latestArticles: ArticleRecord[];
  latestVideos: VideoWithAccount[];
  latestSocialPosts: SocialPostWithAccount[];
  todaysSchedule: ScheduleSlotWithProgram[];
  liveNow: ScheduleSlotWithProgram | null;
  upNext: ScheduleSlotWithProgram | null;
};
