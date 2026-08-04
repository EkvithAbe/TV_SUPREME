"use client";

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
        className="relative overflow-hidden border-t border-supreme-ink/10 bg-white py-16 lg:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(115,25,219,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,68,24,0.06),transparent_22%)]" />

        <div className="section-wrap relative z-10">
          <div className="mb-10 max-w-3xl xl:mb-12">
            <p className="eyebrow">Programs</p>
            <h2 className="mt-4 font-heading text-[2.8rem] font-extrabold leading-[0.92] tracking-[-0.05em] text-supreme-ink sm:text-[3.8rem] lg:text-[5rem]">
              Latest{" "}
              <span className="bg-gradient-to-r from-[#3436d6] to-[#7b39ee] bg-clip-text text-transparent">
                Episodes
              </span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3">
            <article className="flex min-h-[21rem] flex-col justify-between rounded-[30px] border border-[#ece8f2] bg-[#faf8fd] p-6 text-supreme-ink shadow-[0_20px_55px_rgba(17,24,39,0.08)] sm:min-h-[24rem] sm:p-7 xl:row-span-2 xl:min-h-0">
              <div>
                <div className="space-y-1 font-heading text-[2.25rem] font-black italic uppercase leading-[0.92] tracking-[-0.04em] sm:text-[2.8rem] xl:text-[3.15rem]">
                  <div className="text-[#ff4d34]">Latest</div>
                  <div className="text-supreme-ink">Program</div>
                  <div className="text-supreme-ink">Videos</div>
                </div>

                <p className="mt-6 max-w-[15rem] text-base leading-8 text-supreme-mid sm:mt-8 sm:text-lg sm:leading-9">
                  Explore a curated collection of recent TV Supreme episodes,
                  performances, and channel highlights.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:mt-10">
                <Link
                  href="/programs"
                  className="inline-flex w-full items-center justify-center rounded-[16px] bg-[#5d2ab9] px-6 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#4d2298] sm:text-lg"
                >
                  More
                </Link>

                <button
                  type="button"
                  onClick={() => setOpenVideoId(leadVideo.id)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[16px] border border-[#ddd4ea] bg-white px-6 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-supreme-ink transition hover:border-[#c8bcdd] hover:bg-[#f7f3ff] sm:text-lg"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Play
                </button>
              </div>
            </article>

            {visibleVideos.map((video, index) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setOpenVideoId(video.id)}
                className={`group relative min-h-[15rem] overflow-hidden rounded-[28px] text-left shadow-[0_18px_48px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 ${
                  collageSpanClasses[index] ?? ""
                } ${
                  index === 1 || index === 4 || index === 6
                    ? "sm:min-h-[22rem]"
                    : "sm:min-h-[16rem]"
                }`}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.videoTitle}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.2)_36%,rgba(5,5,5,0.78)_100%)]" />

                <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-black/30 px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      {video.isLive ? "Live" : video.categoryName}
                    </span>

                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur-md transition group-hover:bg-white/24">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-white/72">
                      {video.programTitle}
                    </p>
                    <h3 className="mt-2 max-w-[14rem] line-clamp-2 font-heading text-xl font-extrabold leading-tight text-white sm:text-[1.6rem]">
                      {video.videoTitle}
                    </h3>
                  </div>
                </div>
              </button>
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
            className="relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0e] shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
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
