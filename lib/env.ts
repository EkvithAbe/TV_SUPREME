import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  SYNC_SECRET: z.string().min(8).default("change-me-now"),
  YOUTUBE_API_KEY: z.string().optional(),
  YOUTUBE_CHANNEL_HANDLES: z.string().default("@tvsupreme,@tvsupremenews"),
  YOUTUBE_MAX_RESULTS_PER_CHANNEL: z.coerce.number().int().positive().default(12),
  FACEBOOK_PAGE_ACCESS_TOKEN: z.string().optional(),
  FACEBOOK_PAGE_IDS: z.string().default("tvsupremelk,tvsupremenews"),
  FACEBOOK_GRAPH_VERSION: z.string().default("v26.0")
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  SYNC_SECRET: process.env.SYNC_SECRET,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  YOUTUBE_CHANNEL_HANDLES: process.env.YOUTUBE_CHANNEL_HANDLES,
  YOUTUBE_MAX_RESULTS_PER_CHANNEL: process.env.YOUTUBE_MAX_RESULTS_PER_CHANNEL,
  FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  FACEBOOK_PAGE_IDS: process.env.FACEBOOK_PAGE_IDS,
  FACEBOOK_GRAPH_VERSION: process.env.FACEBOOK_GRAPH_VERSION
});
