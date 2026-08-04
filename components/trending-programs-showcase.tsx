"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent
} from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type ShowcaseVideo = {
  id: string;
  title: string;
};

type ShowcaseProgram = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string | null;
  categoryName: string | null;
  relatedVideos: ShowcaseVideo[];
};

type TrendingProgramsShowcaseProps = {
  programs: ShowcaseProgram[];
};

const SWIPE_THRESHOLD = 50;

export function TrendingProgramsShowcase({
  programs
}: TrendingProgramsShowcaseProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wheelLockUntilRef = useRef(0);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? programs.length - 1 : previousIndex - 1
    );
  }, [programs.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex === programs.length - 1 ? 0 : previousIndex + 1
    );
  }, [programs.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  if (programs.length === 0) {
    return null;
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX;

    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    touchStartX.current = null;
  };

  const getCircularDifference = (index: number) => {
    let difference = index - currentIndex;
    const half = programs.length / 2;

    if (difference > half) {
      difference -= programs.length;
    }

    if (difference < -half) {
      difference += programs.length;
    }

    return difference;
  };

  const getCardStyle = (index: number): CSSProperties => {
    const difference = getCircularDifference(index);
    const absoluteDifference = Math.abs(difference);

    if (absoluteDifference > 2) {
      return {
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none"
      };
    }

    const translateX = difference * 75;
    const translateZ = -absoluteDifference * 220;
    const rotateY = difference * -8;
    const scale = 1 - absoluteDifference * 0.14;
    const opacity = 1 - absoluteDifference * 0.26;

    return {
      transform: `
        translateX(${translateX}%)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex: 20 - absoluteDifference,
      visibility: "visible",
      pointerEvents: absoluteDifference <= 1 ? "auto" : "none"
    };
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Programs</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-supreme-ink sm:text-4xl lg:text-5xl">
            Current programs with matched channel video.
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-[40px] border border-supreme-ink/10 bg-[#f3f3f3] px-3 py-6 shadow-[0_24px_70px_rgba(16,24,32,0.08)] sm:px-6 sm:py-8 lg:px-10">
        <div
          className="relative flex h-[32rem] touch-pan-y items-center justify-center overflow-hidden sm:h-[38rem]"
          style={{ perspective: "1800px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={(event) => {
            const delta =
              Math.abs(event.deltaX) > Math.abs(event.deltaY)
                ? event.deltaX
                : event.shiftKey
                  ? event.deltaY
                  : 0;

            if (delta === 0 || Date.now() < wheelLockUntilRef.current) {
              return;
            }

            event.preventDefault();
            wheelLockUntilRef.current = Date.now() + 320;

            if (delta > 0) {
              handleNext();
              return;
            }

            handlePrevious();
          }}
          role="region"
          aria-label="TV Supreme programs"
          aria-roledescription="carousel"
        >
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous program"
            className="absolute left-1 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black sm:left-4 sm:h-12 sm:w-12 lg:left-10"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next program"
            className="absolute right-1 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black sm:right-4 sm:h-12 sm:w-12 lg:right-10"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            {programs.map((program, index) => {
              const isActive = index === currentIndex;
              const videoCount = program.relatedVideos.length;
              const imageUrl = program.imageUrl ?? "/images/news-cover.jpeg";

              return (
                <div
                  key={program.id}
                  className="pointer-events-none absolute left-1/2 top-1/2"
                >
                  <article
                    className="pointer-events-auto absolute left-0 top-0 cursor-pointer transition-all duration-500 ease-out"
                    style={{
                      ...getCardStyle(index),
                      width: "clamp(250px, 80vw, 360px)",
                      height: "clamp(420px, 126vw, 540px)",
                      marginLeft: "calc(clamp(250px, 80vw, 360px) / -2)",
                      marginTop: "calc(clamp(420px, 126vw, 540px) / -2)",
                      transformStyle: "preserve-3d"
                    }}
                    onClick={() => setCurrentIndex(index)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={program.title}
                  >
                    <div
                      className={`group relative h-full w-full overflow-hidden rounded-[32px] bg-white shadow-[0_28px_70px_rgba(0,0,0,0.16)] transition-all duration-500 ${
                        isActive ? "ring-1 ring-black/5" : "brightness-[0.9]"
                      }`}
                    >
                      <div className="relative h-[48%] overflow-hidden bg-neutral-900">
                        <img
                          src={imageUrl}
                          alt={program.title}
                          draggable={false}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        <div className="absolute right-4 top-4 flex items-center gap-2 text-white sm:right-5 sm:top-5">
                          <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-xs">
                            {videoCount} {videoCount === 1 ? "Video" : "Videos"}
                          </span>
                        </div>
                      </div>

                      <div className="flex h-[52%] flex-col bg-white px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
                        <h3 className="max-w-[290px] font-heading text-[2rem] font-black leading-[0.98] tracking-[-0.05em] text-[#11171d] sm:text-[2.7rem]">
                          {program.title}
                        </h3>

                        <p className="mt-4 line-clamp-3 text-sm leading-7 text-supreme-mid">
                          {program.summary}
                        </p>

                        <div className="mt-auto flex items-end justify-between gap-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-neutral-500 sm:text-xs sm:tracking-[0.42em]">
                            {program.categoryName ?? "Program"}
                          </p>

                          <button
                            type="button"
                            aria-label={`View ${program.title}`}
                            className={`flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-neutral-700 ${
                              isActive
                                ? "translate-x-0 opacity-100"
                                : "translate-x-2 opacity-0"
                            }`}
                            onClick={(event) => {
                              event.stopPropagation();

                              if (!isActive) {
                                setCurrentIndex(index);
                                return;
                              }

                              router.push(`/programs/${program.slug}`);
                            }}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 sm:gap-5">
          <span className="min-w-8 text-sm font-bold text-neutral-900">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2">
            {programs.map((program, index) => (
              <button
                key={program.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show ${program.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-10 bg-black"
                    : "w-3 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>

          <span className="min-w-8 text-right text-sm text-neutral-400">
            {String(programs.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
