export const SOCIAL_PLATFORM = {
  FACEBOOK: "FACEBOOK",
  YOUTUBE: "YOUTUBE",
  WEBSITE: "WEBSITE"
} as const;

export type SocialPlatform =
  (typeof SOCIAL_PLATFORM)[keyof typeof SOCIAL_PLATFORM];

export const SOCIAL_CONTENT_TYPE = {
  POST: "POST",
  VIDEO: "VIDEO",
  LIVE: "LIVE",
  SHORT: "SHORT"
} as const;

export type SocialContentType =
  (typeof SOCIAL_CONTENT_TYPE)[keyof typeof SOCIAL_CONTENT_TYPE];

export const PROGRAM_STATUS = {
  ACTIVE: "ACTIVE",
  UPCOMING: "UPCOMING",
  ARCHIVED: "ARCHIVED",
  DRAFT: "DRAFT"
} as const;

export type ProgramStatus =
  (typeof PROGRAM_STATUS)[keyof typeof PROGRAM_STATUS];

export const SYNC_STATUS = {
  SUCCESS: "SUCCESS",
  PARTIAL: "PARTIAL",
  FAILED: "FAILED"
} as const;

export type SyncStatus = (typeof SYNC_STATUS)[keyof typeof SYNC_STATUS];

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
