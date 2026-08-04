import { SocialContentType, SocialPlatform, SyncStatus } from "@prisma/client";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

type FacebookPage = {
  id: string;
  name: string;
  link?: string;
  followers_count?: number;
  fan_count?: number;
  picture?: {
    data?: {
      url?: string;
    };
  };
};

type FacebookPost = {
  id: string;
  message?: string;
  permalink_url?: string;
  created_time: string;
  full_picture?: string;
  reactions?: { summary?: { total_count?: number } };
  comments?: { summary?: { total_count?: number } };
  shares?: { count?: number };
};

async function facebookFetch<T>(path: string, searchParams: URLSearchParams) {
  if (!env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    throw new Error("FACEBOOK_PAGE_ACCESS_TOKEN is not configured.");
  }

  searchParams.set("access_token", env.FACEBOOK_PAGE_ACCESS_TOKEN);

  const response = await fetch(
    `https://graph.facebook.com/${env.FACEBOOK_GRAPH_VERSION}/${path}?${searchParams.toString()}`,
    {
      headers: {
        Accept: "application/json"
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Facebook API request failed with ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function syncFacebookPages() {
  const pageIds = env.FACEBOOK_PAGE_IDS.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  let processed = 0;

  for (const pageId of pageIds) {
    const page = await facebookFetch<FacebookPage>(
      pageId,
      new URLSearchParams({
        fields: "id,name,link,picture{url},followers_count,fan_count"
      })
    );

    const account = await prisma.socialAccount.upsert({
      where: {
        platform_externalId: {
          platform: SocialPlatform.FACEBOOK,
          externalId: page.id
        }
      },
      update: {
        handle: pageId,
        title: page.name,
        url: page.link ?? `https://www.facebook.com/${pageId}/`,
        avatarUrl: page.picture?.data?.url,
        followerCount: BigInt(page.followers_count ?? page.fan_count ?? 0),
        lastSyncedAt: new Date(),
        rawJson: page
      },
      create: {
        platform: SocialPlatform.FACEBOOK,
        externalId: page.id,
        handle: pageId,
        title: page.name,
        url: page.link ?? `https://www.facebook.com/${pageId}/`,
        avatarUrl: page.picture?.data?.url,
        followerCount: BigInt(page.followers_count ?? page.fan_count ?? 0),
        lastSyncedAt: new Date(),
        rawJson: page
      }
    });

    const postsResponse = await facebookFetch<{ data?: FacebookPost[] }>(
      `${page.id}/posts`,
      new URLSearchParams({
        fields:
          "id,message,permalink_url,created_time,full_picture,reactions.summary(true),comments.summary(true),shares",
        limit: "12"
      })
    );

    for (const post of postsResponse.data ?? []) {
      await prisma.socialPost.upsert({
        where: {
          platform_externalId: {
            platform: SocialPlatform.FACEBOOK,
            externalId: post.id
          }
        },
        update: {
          accountId: account.id,
          contentType: SocialContentType.POST,
          message: post.message,
          url: post.permalink_url ?? account.url,
          thumbnailUrl: post.full_picture,
          publishedAt: new Date(post.created_time),
          reactionCount: BigInt(post.reactions?.summary?.total_count ?? 0),
          commentCount: BigInt(post.comments?.summary?.total_count ?? 0),
          shareCount: BigInt(post.shares?.count ?? 0),
          rawJson: post
        },
        create: {
          platform: SocialPlatform.FACEBOOK,
          externalId: post.id,
          accountId: account.id,
          contentType: SocialContentType.POST,
          message: post.message,
          url: post.permalink_url ?? account.url,
          thumbnailUrl: post.full_picture,
          publishedAt: new Date(post.created_time),
          reactionCount: BigInt(post.reactions?.summary?.total_count ?? 0),
          commentCount: BigInt(post.comments?.summary?.total_count ?? 0),
          shareCount: BigInt(post.shares?.count ?? 0),
          rawJson: post
        }
      });
      processed += 1;
    }
  }

  await prisma.syncRun.create({
    data: {
      platform: SocialPlatform.FACEBOOK,
      target: env.FACEBOOK_PAGE_IDS,
      status: SyncStatus.SUCCESS,
      itemsProcessed: processed,
      completedAt: new Date(),
      message: "Facebook sync completed successfully."
    }
  });

  return { processed };
}
