import { SocialPlatform, type PrismaClient } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { scheduleDefinitions } from "@/lib/schedule-definitions";
import { slugify } from "@/lib/utils";

async function upsertCategories(db: PrismaClient) {
  const categories = [
    {
      name: "News",
      slug: "news",
      description: "Breaking news, politics, and current affairs programming."
    },
    {
      name: "Drama",
      slug: "drama",
      description: "Flagship serial drama and narrative entertainment."
    },
    {
      name: "Lifestyle",
      slug: "lifestyle",
      description: "Morning shows, food, travel, and talk programming."
    },
    {
      name: "Sports",
      slug: "sports",
      description: "Sports news, match coverage, and highlights."
    }
  ];

  for (const category of categories) {
    await db.programCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }
}

async function upsertPrograms(db: PrismaClient) {
  const categories = await db.programCategory.findMany();
  const categoryMap = new Map(categories.map((category) => [category.slug, category.id]));

  const programs = [
    {
      title: "Supreme Prime Time News",
      summary: "The main nightly news bulletin for TV Supreme with national, political, and business coverage.",
      description:
        "A flagship nightly bulletin designed to combine breaking national stories with context, field reporting, and digital follow-through.",
      categorySlug: "news",
      imageUrl: "/images/news-cover.jpeg",
      isFeatured: true
    },
    {
      title: "Janahada",
      summary: "Prime-time current affairs discussion focused on public policy and civic issues.",
      description:
        "A studio-led discussion format built around public questions, political accountability, and next-day digital cutdowns.",
      categorySlug: "news",
      imageUrl: "/images/janahada.jpeg",
      isFeatured: true
    },
    {
      title: "Samanmaliya",
      summary: "A leading dramatic series aimed at the core evening entertainment slot.",
      description:
        "Serial storytelling designed for both broadcast appointment viewing and short-form recap distribution.",
      categorySlug: "drama",
      imageUrl: "/images/samanmaliya.jpeg",
      isFeatured: true
    },
    {
      title: "Yowun Wasanthe",
      summary: "Youth-focused drama with strong social engagement potential.",
      description:
        "A youth-skewing serial structured to support episodic clips, cast-led social promotion, and live fan response.",
      categorySlug: "drama",
      imageUrl: "/images/yowun-wasanthaye.jpeg",
      isFeatured: true
    },
    {
      title: "Every Morning",
      summary: "Lifestyle-led morning program covering wellness, food, and practical daily segments.",
      description:
        "A daily studio show built for repeatable segment publishing across Facebook, YouTube, and the public site.",
      categorySlug: "lifestyle",
      imageUrl: "/images/every-morning.jpeg",
      isFeatured: false
    },
    {
      title: "Sports Supreme",
      summary: "Daily sports roundup with cricket-led coverage and short-form highlights packaging.",
      description:
        "The sports brand for headline recaps, score explainers, and social-first clips tied back into TV broadcast coverage.",
      categorySlug: "sports",
      imageUrl: "/images/cricket.jpeg",
      isFeatured: false
    }
  ];

  for (const program of programs) {
    const payload = {
      title: program.title,
      slug: slugify(program.title),
      summary: program.summary,
      description: program.description,
      categoryId: categoryMap.get(program.categorySlug),
      imageUrl: program.imageUrl,
      isFeatured: program.isFeatured,
      language: "si"
    };

    await db.program.upsert({
      where: { slug: payload.slug },
      update: payload,
      create: payload
    });
  }
}

async function upsertArticles(db: PrismaClient) {
  const articles = [
    {
      title: "TV Supreme rebuild begins with PostgreSQL-backed publishing",
      slug: "tv-supreme-rebuild-postgresql-publishing",
      excerpt:
        "The new platform foundation moves TV Supreme away from hardcoded mock pages into a structured content system.",
      category: "Platform",
      imageUrl: "/images/news-cover.jpeg",
      isFeatured: true,
      publishedAt: new Date("2026-07-30T08:00:00+05:30")
    },
    {
      title: "Program scheduling is now modeled as weekly recurring slots",
      slug: "program-scheduling-weekly-recurring-slots",
      excerpt:
        "A recurring slot model now powers live windows, next-up panels, and the public program guide.",
      category: "Operations",
      imageUrl: "/images/live.jpeg",
      isFeatured: false,
      publishedAt: new Date("2026-07-29T15:00:00+05:30")
    },
    {
      title: "Facebook and YouTube sync layer added to the new TV Supreme stack",
      slug: "facebook-youtube-sync-layer-added",
      excerpt:
        "The ingestion layer is designed to normalize posts and videos into first-class records for the site and admin tools.",
      category: "Social",
      imageUrl: "/images/global-pulse.jpeg",
      isFeatured: false,
      publishedAt: new Date("2026-07-28T11:30:00+05:30")
    }
  ];

  for (const article of articles) {
    await db.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article
    });
  }
}

async function upsertSocialAccounts(db: PrismaClient) {
  const accounts = [
    {
      platform: SocialPlatform.YOUTUBE,
      externalId: "@tvsupreme",
      handle: "@tvsupreme",
      title: "TV Supreme",
      url: "https://www.youtube.com/@tvsupreme"
    },
    {
      platform: SocialPlatform.YOUTUBE,
      externalId: "@tvsupremenews",
      handle: "@tvsupremenews",
      title: "TV Supreme News",
      url: "https://www.youtube.com/@tvsupremenews"
    },
    {
      platform: SocialPlatform.FACEBOOK,
      externalId: "tvsupremelk",
      handle: "tvsupremelk",
      title: "TV Supreme",
      url: "https://www.facebook.com/tvsupremelk/"
    },
    {
      platform: SocialPlatform.FACEBOOK,
      externalId: "tvsupremenews",
      handle: "tvsupremenews",
      title: "TV Supreme News",
      url: "https://www.facebook.com/tvsupremenews/"
    }
  ];

  for (const account of accounts) {
    await db.socialAccount.upsert({
      where: {
        platform_externalId: {
          platform: account.platform,
          externalId: account.externalId
        }
      },
      update: account,
      create: account
    });
  }
}

async function upsertSeedMedia(db: PrismaClient) {
  const youtube = await db.socialAccount.findFirstOrThrow({
    where: {
      platform: SocialPlatform.YOUTUBE,
      handle: "@tvsupreme"
    }
  });

  const facebook = await db.socialAccount.findFirstOrThrow({
    where: {
      platform: SocialPlatform.FACEBOOK,
      handle: "tvsupremelk"
    }
  });

  await db.video.upsert({
    where: {
      platform_externalId: {
        platform: SocialPlatform.YOUTUBE,
        externalId: "seed-live-window"
      }
    },
    update: {
      accountId: youtube.id,
      title: "Supreme Prime Time News | Evening bulletin window",
      description:
        "Seed video record representing the YouTube dataset for the rebuilt platform.",
      url: "https://www.youtube.com/watch?v=seed-live-window",
      embedUrl: "https://www.youtube.com/embed/seed-live-window",
      thumbnailUrl: "/images/live.jpeg",
      publishedAt: new Date("2026-07-30T19:00:00+05:30"),
      isLive: true,
      isFeatured: true,
      viewCount: BigInt(14520)
    },
    create: {
      platform: SocialPlatform.YOUTUBE,
      externalId: "seed-live-window",
      accountId: youtube.id,
      title: "Supreme Prime Time News | Evening bulletin window",
      description:
        "Seed video record representing the YouTube dataset for the rebuilt platform.",
      url: "https://www.youtube.com/watch?v=seed-live-window",
      embedUrl: "https://www.youtube.com/embed/seed-live-window",
      thumbnailUrl: "/images/live.jpeg",
      publishedAt: new Date("2026-07-30T19:00:00+05:30"),
      isLive: true,
      isFeatured: true,
      viewCount: BigInt(14520)
    }
  });

  await db.socialPost.upsert({
    where: {
      platform_externalId: {
        platform: SocialPlatform.FACEBOOK,
        externalId: "seed-facebook-launch"
      }
    },
    update: {
      accountId: facebook.id,
      message:
        "Launching the rebuilt TV Supreme platform foundation with structured program, schedule, and social data.",
      url: "https://www.facebook.com/tvsupremelk/",
      thumbnailUrl: "/images/news-cover.jpeg",
      publishedAt: new Date("2026-07-30T12:00:00+05:30"),
      reactionCount: BigInt(1240),
      commentCount: BigInt(142),
      shareCount: BigInt(88),
      isFeatured: true
    },
    create: {
      platform: SocialPlatform.FACEBOOK,
      externalId: "seed-facebook-launch",
      accountId: facebook.id,
      message:
        "Launching the rebuilt TV Supreme platform foundation with structured program, schedule, and social data.",
      url: "https://www.facebook.com/tvsupremelk/",
      thumbnailUrl: "/images/news-cover.jpeg",
      publishedAt: new Date("2026-07-30T12:00:00+05:30"),
      reactionCount: BigInt(1240),
      commentCount: BigInt(142),
      shareCount: BigInt(88),
      isFeatured: true
    }
  });
}

async function upsertSchedule(db: PrismaClient) {
  const programs = await db.program.findMany();
  const bySlug = new Map(programs.map((program) => [program.slug, program.id]));

  for (const slot of scheduleDefinitions) {
    const slotId = `${slot.programSlug ?? slugify(slot.title)}-${slot.dayOfWeek}-${slot.startMinutes}`;

    await db.scheduleSlot.upsert({
      where: {
        id: slotId
      },
      update: {
        title: slot.title,
        programId: slot.programSlug ? bySlug.get(slot.programSlug) : null,
        dayOfWeek: slot.dayOfWeek,
        startMinutes: slot.startMinutes,
        endMinutes: slot.endMinutes,
        isLiveWindow: slot.isLiveWindow,
        notes: slot.notes
      },
      create: {
        id: slotId,
        title: slot.title,
        programId: slot.programSlug ? bySlug.get(slot.programSlug) : null,
        dayOfWeek: slot.dayOfWeek,
        startMinutes: slot.startMinutes,
        endMinutes: slot.endMinutes,
        isLiveWindow: slot.isLiveWindow,
        notes: slot.notes
      }
    });
  }
}

async function upsertFeaturedSections(db: PrismaClient) {
  const sections = [
    {
      key: "homepage_hero",
      title: "Homepage Hero",
      description: "Primary homepage editorial and promotion surface."
    },
    {
      key: "homepage_social",
      title: "Homepage Social",
      description: "Curated social cards shown on the homepage."
    }
  ];

  for (const section of sections) {
    await db.featuredSection.upsert({
      where: { key: section.key },
      update: section,
      create: section
    });
  }
}

async function main() {
  await upsertCategories(prisma);
  await upsertPrograms(prisma);
  await upsertArticles(prisma);
  await upsertSocialAccounts(prisma);
  await upsertSeedMedia(prisma);
  await upsertSchedule(prisma);
  await upsertFeaturedSections(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
