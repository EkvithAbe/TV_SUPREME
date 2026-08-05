"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, X, Youtube } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { formatCompactNumber } from "@/lib/utils";

type LatestProgramVideo = {
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
};

type LatestProgramVideosSectionProps = {
  videos: LatestProgramVideo[];
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Colombo"
});

const collageSpanClasses = [
  "xl:col-start-2 xl:row-start-1 xl:row-span-1",
  "xl:col-start-3 xl:row-start-1 xl:row-span-2",
  "xl:col-start-4 xl:row-start-1 xl:row-span-1",
  "xl:col-start-1 xl:row-start-3 xl:row-span-1",
  "xl:col-start-2 xl:row-start-2 xl:row-span-2",
  "xl:col-start-3 xl:row-start-3 xl:row-span-1",
  "xl:col-start-4 xl:row-start-2 xl:row-span-2"
];

export function LatestProgramVideosSection({
  videos
}: LatestProgramVideosSectionProps) {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  const modalVideo = useMemo(
    () => videos.find((video) => video.id === openVideoId) ?? null,
    [openVideoId, videos]
  );

  useEffect(() => {
    if (!openVideoId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenVideoId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openVideoId]);

  if (videos.length === 0) {
    return null;
  }

  const visibleVideos = videos.slice(0, 7);
  const leadVideo = visibleVideos[0];
  const modalHasExternalVideo = Boolean(modalVideo?.url.startsWith("http"));
  const modalPlayerSrc = modalVideo?.embedUrl
    ? `${modalVideo.embedUrl}${modalVideo.embedUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0&playsinline=1`
    : null;

  return (
    <>
      <section
        id="news"
        className="relative overflow-hidden border-t border-supreme-ink/10 bg-white/[0.78] py-16 lg:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(115,25,219,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,68,24,0.06),transparent_22%)]" />

        <div className="section-wrap relative z-10">
          <div className="mb-9 max-w-2xl xl:mb-10">
            <p className="eyebrow">Programs</p>
            <h2 className="section-title mt-3">
              Latest{" "}
              <span className="bg-gradient-to-r from-[#3436d6] to-[#7b39ee] bg-clip-text text-transparent">
                Episodes
              </span>
            </h2>
            <p className="section-copy mt-3">
              Fresh performances, interviews, and programme moments from TV Supreme.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:auto-rows-[13rem] xl:grid-cols-4">
            <article className="flex min-h-[20rem] flex-col justify-between rounded-[24px] border border-[#e9e1f2] bg-[#faf8fd] p-5 text-supreme-ink shadow-[0_14px_32px_rgba(33,24,51,0.07)] sm:min-h-[22rem] sm:p-6 xl:row-span-2 xl:min-h-0">
              <div>
                <p className="eyebrow">Watch now</p>
                <h3 className="mt-3 max-w-[14rem] font-heading text-[2.2rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-supreme-ink sm:text-[2.65rem]">
                  Latest <span className="text-[#5d2ab9]">Episodes</span>
                </h3>

                <p className="mt-5 max-w-[15rem] text-sm leading-7 text-supreme-mid sm:text-base sm:leading-8">
                  Explore recent TV Supreme episodes, performances, and channel highlights.
                </p>
              </div>

              <div className="mt-7 grid gap-3">
                <Link
                  href="/programs"
                  className="primary-pill w-full justify-center px-5 py-3"
                >
                  Browse episodes
                </Link>

                <button
                  type="button"
                  onClick={() => setOpenVideoId(leadVideo.id)}
                  className="link-pill w-full justify-center px-5 py-3"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Play latest
                </button>
              </div>
            </article>

            {visibleVideos.map((video, index) => (
              <div
                key={video.id}
                className={`latest-episode-tile ${
                  index % 2 === 1 ? "latest-episode-tile-reverse" : ""
                } ${
                  collageSpanClasses[index] ?? ""
                }`}
                style={{
                  animationDelay: `${-2.1 * (index + 1)}s`,
                  animationDuration: `${14 + (index % 3) * 1.8}s`
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenVideoId(video.id)}
                  className="group relative min-h-[17rem] w-full transform-gpu overflow-hidden rounded-[24px] bg-[#120b1e] text-left shadow-[0_14px_30px_rgba(18,10,31,0.18)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:scale-[1.04] hover:shadow-[0_26px_52px_rgba(18,10,31,0.32)] focus-visible:scale-[1.04] xl:h-full xl:min-h-0"
                >
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.videoTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="transform-gpu object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#120b1e]/55 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <Image
                    src={video.thumbnailUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="transform-gpu scale-[0.97] object-contain p-3 opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12)_0%,rgba(5,5,5,0.22)_38%,rgba(5,5,5,0.84)_100%)] transition-opacity duration-500 ease-out group-hover:opacity-20 group-focus-visible:opacity-20" />

                  <div className="relative flex h-full min-h-[17rem] flex-col justify-between p-4 transition-opacity duration-500 ease-out group-hover:opacity-0 group-focus-visible:opacity-0 sm:p-5 xl:min-h-0">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full border border-white/14 bg-black/28 px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                        {video.isLive ? "Live" : video.categoryName}
                      </span>

                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur-sm transition group-hover:bg-white/26">
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-white/72">
                        {video.programTitle}
                      </p>
                      <h3 className="mt-2 max-w-[15rem] line-clamp-2 font-heading text-xl font-extrabold leading-[1.08] text-white sm:text-[1.45rem]">
                        {video.videoTitle}
                      </h3>
                    </div>
                  </div>

                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/55 px-4 py-2 text-[11px] font-heading font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      <Play className="h-4 w-4 fill-current" />
                      Play episode
                    </span>
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalVideo ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/82 px-4 py-8 backdrop-blur-sm"
          onClick={() => setOpenVideoId(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[26px] border border-white/10 bg-[#0a0a0e] shadow-[0_20px_56px_rgba(0,0,0,0.42)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenVideoId(null)}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid xl:grid-cols-[minmax(0,1.2fr)_22rem]">
              <div className="bg-black">
                {modalPlayerSrc ? (
                  <iframe
                    src={modalPlayerSrc}
                    title={modalVideo.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="aspect-video w-full bg-black"
                  />
                ) : (
                  <img
                    src={modalVideo.thumbnailUrl}
                    alt={modalVideo.videoTitle}
                    className="aspect-video w-full object-cover"
                  />
                )}
              </div>

              <aside className="flex flex-col justify-between border-t border-white/10 p-6 text-white xl:border-l xl:border-t-0 xl:p-7">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-white/64">
                    <span className="rounded-full bg-white/8 px-3 py-1.5 text-white">
                      {modalVideo.programTitle}
                    </span>
                    <span>{dateFormatter.format(new Date(modalVideo.publishedAt))}</span>
                    <span>
                      {modalVideo.viewCount > 0
                        ? `${formatCompactNumber(modalVideo.viewCount)} views`
                        : "Recent upload"}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white">
                    {modalVideo.videoTitle}
                  </h3>

                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/56">
                    {modalVideo.accountTitle ?? "TV Supreme"}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/74">
                    {modalVideo.description ??
                      "Open the latest program upload or jump directly to the full program page."}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  {modalVideo.programSlug ? (
                    <Link
                      href={`/programs/${modalVideo.programSlug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#111827] transition hover:bg-[#ece7f8]"
                    >
                      Open Program
                    </Link>
                  ) : null}

                  <a
                    href={modalVideo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                  >
                    <Youtube className="h-4 w-4" />
                    {modalHasExternalVideo ? "Watch on YouTube" : "Open Details"}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
