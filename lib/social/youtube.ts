import { SocialPlatform, SyncStatus } from "@prisma/client";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

type YoutubeChannel = {
  id: string;
  snippet: {
    title: string;
    customUrl?: string;
    description?: string;
    thumbnails?: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
  statistics?: {
    subscriberCount?: string;
  };
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
};

type YoutubePlaylistItem = {
  snippet: {
    resourceId?: { videoId?: string };
  };
};

type YoutubeVideo = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails?: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
    liveBroadcastContent?: string;
  };
  contentDetails?: {
    duration?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
};

function parseISODurationToSeconds(value?: string) {
  if (!value) {
    return null;
  }

  const match =
    /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/u.exec(value);
  if (!match) {
    return null;
  }

  const days = Number(match[1] ?? 0);
  const hours = Number(match[2] ?? 0);
  const minutes = Number(match[3] ?? 0);
  const seconds = Number(match[4] ?? 0);

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

async function youtubeFetch<T>(path: string, searchParams: URLSearchParams) {
  if (!env.YOUTUBE_API_KEY) {
    throw new Error("YOUTUBE_API_KEY is not configured.");
  }

  searchParams.set("key", env.YOUTUBE_API_KEY);

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/${path}?${searchParams.toString()}`,
    {
      headers: {
        Accept: "application/json"
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`YouTube API request failed with ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function syncYoutubeChannels() {
  const handles = env.YOUTUBE_CHANNEL_HANDLES.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  let processed = 0;

  for (const handle of handles) {
    const channelResponse = await youtubeFetch<{ items?: YoutubeChannel[] }>(
      "channels",
      new URLSearchParams({
        part: "snippet,statistics,contentDetails",
        forHandle: handle
      })
    );

    const channel = channelResponse.items?.[0];
    if (!channel) {
      continue;
    }

    const account = await prisma.socialAccount.upsert({
      where: {
        platform_externalId: {
          platform: SocialPlatform.YOUTUBE,
          externalId: channel.id
        }
      },
      update: {
        handle,
        title: channel.snippet.title,
        url: `https://www.youtube.com/${handle}`,
        avatarUrl:
          channel.snippet.thumbnails?.high?.url ??
          channel.snippet.thumbnails?.medium?.url ??
          channel.snippet.thumbnails?.default?.url,
        followerCount: channel.statistics?.subscriberCount
          ? BigInt(channel.statistics.subscriberCount)
          : null,
        lastSyncedAt: new Date(),
        rawJson: channel
      },
      create: {
        platform: SocialPlatform.YOUTUBE,
        externalId: channel.id,
        handle,
        title: channel.snippet.title,
        url: `https://www.youtube.com/${handle}`,
        avatarUrl:
          channel.snippet.thumbnails?.high?.url ??
          channel.snippet.thumbnails?.medium?.url ??
          channel.snippet.thumbnails?.default?.url,
        followerCount: channel.statistics?.subscriberCount
          ? BigInt(channel.statistics.subscriberCount)
          : null,
        lastSyncedAt: new Date(),
        rawJson: channel
      }
    });

    const uploadsPlaylistId =
      channel.contentDetails?.relatedPlaylists?.uploads ?? null;

    if (!uploadsPlaylistId) {
      continue;
    }

    const playlistResponse = await youtubeFetch<{ items?: YoutubePlaylistItem[] }>(
      "playlistItems",
      new URLSearchParams({
        part: "snippet",
        playlistId: uploadsPlaylistId,
        maxResults: String(env.YOUTUBE_MAX_RESULTS_PER_CHANNEL)
      })
    );

    const videoIds = playlistResponse.items
      ?.map((item) => item.snippet.resourceId?.videoId)
      .filter(Boolean) as string[] | undefined;

    if (!videoIds?.length) {
      continue;
    }

    const videoResponse = await youtubeFetch<{ items?: YoutubeVideo[] }>(
      "videos",
      new URLSearchParams({
        part: "snippet,contentDetails,statistics",
        id: videoIds.join(",")
      })
    );

    for (const video of videoResponse.items ?? []) {
      await prisma.video.upsert({
        where: {
          platform_externalId: {
            platform: SocialPlatform.YOUTUBE,
            externalId: video.id
          }
        },
        update: {
          accountId: account.id,
          title: video.snippet.title,
          description: video.snippet.description,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          embedUrl: `https://www.youtube.com/embed/${video.id}`,
          thumbnailUrl:
            video.snippet.thumbnails?.high?.url ??
            video.snippet.thumbnails?.medium?.url ??
            video.snippet.thumbnails?.default?.url,
          publishedAt: new Date(video.snippet.publishedAt),
          durationSeconds: parseISODurationToSeconds(
            video.contentDetails?.duration
          ),
          viewCount: video.statistics?.viewCount
            ? BigInt(video.statistics.viewCount)
            : null,
          likeCount: video.statistics?.likeCount
            ? BigInt(video.statistics.likeCount)
            : null,
          commentCount: video.statistics?.commentCount
            ? BigInt(video.statistics.commentCount)
            : null,
          isLive: video.snippet.liveBroadcastContent === "live",
          rawJson: video
        },
        create: {
          platform: SocialPlatform.YOUTUBE,
          externalId: video.id,
          accountId: account.id,
          title: video.snippet.title,
          description: video.snippet.description,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          embedUrl: `https://www.youtube.com/embed/${video.id}`,
          thumbnailUrl:
            video.snippet.thumbnails?.high?.url ??
            video.snippet.thumbnails?.medium?.url ??
            video.snippet.thumbnails?.default?.url,
          publishedAt: new Date(video.snippet.publishedAt),
          durationSeconds: parseISODurationToSeconds(
            video.contentDetails?.duration
          ),
          viewCount: video.statistics?.viewCount
            ? BigInt(video.statistics.viewCount)
            : null,
          likeCount: video.statistics?.likeCount
            ? BigInt(video.statistics.likeCount)
            : null,
          commentCount: video.statistics?.commentCount
            ? BigInt(video.statistics.commentCount)
            : null,
          isLive: video.snippet.liveBroadcastContent === "live",
          rawJson: video
        }
      });
      processed += 1;
    }
  }

  await prisma.syncRun.create({
    data: {
      platform: SocialPlatform.YOUTUBE,
      target: env.YOUTUBE_CHANNEL_HANDLES,
      status: SyncStatus.SUCCESS,
      itemsProcessed: processed,
      completedAt: new Date(),
      message: "YouTube sync completed successfully."
    }
  });

  return { processed };
}
