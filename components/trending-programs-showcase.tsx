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

    const translateX = difference * 82;
    const translateZ = -absoluteDifference * 165;
    const rotateY = difference * -6;
    const scale = 1 - absoluteDifference * 0.1;
    const opacity = 1 - absoluteDifference * 0.18;

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
    <div className="space-y-7">
      <div className="flex items-center justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">Programs</p>
          <h2 className="section-title mt-3">
            Featured Programs
          </h2>
          <p className="section-copy mt-3">
            Explore the shows, stories, and episodes currently defining TV Supreme.
          </p>
        </div>
      </div>

      <div className="relative py-2 sm:py-4">
        <div
          className="relative flex h-[29rem] touch-pan-y items-center justify-center overflow-visible sm:h-[33rem]"
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
            className="absolute left-0 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9d0e4] bg-white text-[#352155] shadow-[0_8px_20px_rgba(33,24,51,0.12)] transition duration-200 hover:-translate-y-1/2 hover:bg-[#5d2ab9] hover:text-white sm:-left-3 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next program"
            className="absolute right-0 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9d0e4] bg-white text-[#352155] shadow-[0_8px_20px_rgba(33,24,51,0.12)] transition duration-200 hover:-translate-y-1/2 hover:bg-[#5d2ab9] hover:text-white sm:-right-3 sm:h-11 sm:w-11"
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
                      width: "clamp(238px, 70vw, 350px)",
                      height: "clamp(400px, 112vw, 500px)",
                      marginLeft: "calc(clamp(238px, 70vw, 350px) / -2)",
                      marginTop: "calc(clamp(400px, 112vw, 500px) / -2)",
                      transformStyle: "preserve-3d"
                    }}
                    onClick={() => setCurrentIndex(index)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={program.title}
                  >
                    <div
                      className={`group relative h-full w-full overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_18px_42px_rgba(33,24,51,0.16)] transition-all duration-500 ${
                        isActive ? "ring-1 ring-[#5d2ab9]/12" : "brightness-[0.94]"
                      }`}
                    >
                      <div className="relative h-[56%] overflow-hidden bg-neutral-900">
                        <img
                          src={imageUrl}
                          alt={program.title}
                          draggable={false}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/36 via-black/0 to-transparent" />

                        <div className="absolute right-4 top-4 flex items-center gap-2 text-white sm:right-5 sm:top-5">
                          <span className="rounded-full bg-black/48 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
                            {videoCount} {videoCount === 1 ? "Video" : "Videos"}
                          </span>
                        </div>
                      </div>

                      <div className="flex h-[44%] flex-col bg-white px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                        <h3 className="max-w-[290px] line-clamp-2 font-heading text-[1.65rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#211833] sm:text-[2rem]">
                          {program.title}
                        </h3>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-supreme-mid">
                          {program.summary}
                        </p>

                        <div className="mt-auto flex items-end justify-between gap-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 sm:text-[11px]">
                            {program.categoryName ?? "Program"}
                          </p>

                          <button
                            type="button"
                            aria-label={`View ${program.title}`}
                            className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#5d2ab9] text-white transition-all duration-300 hover:scale-105 hover:bg-[#432085] ${
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

        <div className="mt-5 flex items-center justify-center gap-4 sm:gap-5">
          <span className="min-w-8 text-sm font-bold text-[#352155]">
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
                    ? "w-9 bg-[#5d2ab9]"
                    : "w-3 bg-[#5d2ab9]/22 hover:bg-[#5d2ab9]/45"
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
