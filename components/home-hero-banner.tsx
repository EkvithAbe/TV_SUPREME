"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type HomeHeroSlide = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  href: string;
  label: string;
};

type HomeHeroBannerProps = {
  slides: HomeHeroSlide[];
};

const FALLBACK_SLIDES: HomeHeroSlide[] = [
  {
    id: "fallback-live",
    title: "TV Supreme Live",
    summary: "Follow the live channel, current shows, and featured station highlights.",
    imageUrl: "/images/live.jpeg",
    href: "/live",
    label: "Live"
  },
  {
    id: "fallback-news",
    title: "Supreme Prime Time News",
    summary: "Catch the latest headlines, bulletins, and featured updates from the channel.",
    imageUrl: "/images/news-cover.jpeg",
    href: "/programs",
    label: "News"
  },
  {
    id: "fallback-drama",
    title: "Featured Programs",
    summary: "Browse drama, lifestyle, and sports programming from the TV Supreme lineup.",
    imageUrl: "/images/samanmaliya.jpeg",
    href: "/programs",
    label: "Programs"
  }
];

export function HomeHeroBanner({ slides }: HomeHeroBannerProps) {
  const heroSlides = slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex((currentIndex) => currentIndex % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [heroSlides.length]);

  const activeSlide = heroSlides[activeIndex] ?? heroSlides[0];

  return (
    <section className="relative z-20 min-h-[100svh]">
      <article className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[#101820]" />

        {heroSlides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.imageUrl}
            alt={slide.title}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
              index === activeIndex ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,28,0.82)_0%,rgba(12,18,28,0.44)_48%,rgba(12,18,28,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(12,18,28,0.12)_42%,rgba(12,18,28,0.58)_100%)]" />

        <div className="relative flex min-h-[100svh] items-end">
          <div className="section-wrap flex w-full items-end pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
            <div className="max-w-3xl rounded-[28px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md sm:p-8 lg:p-10">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.24em] text-white/72">
                {activeSlide.label}
              </p>
              <h1 className="mt-4 text-balance font-heading text-[2.4rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3.6rem] lg:text-[5.4rem]">
                {activeSlide.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-lg sm:leading-8">
                {activeSlide.summary}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={activeSlide.href}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-heading text-sm font-semibold text-[#241340] transition hover:bg-[#f3ebff]"
                >
                  Open Feature
                </Link>
                <Link
                  href="/live"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-heading text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Watch Live
                </Link>
              </div>
            </div>
          </div>
        </div>

        {heroSlides.length > 1 ? (
          <>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
              <button
                type="button"
                onClick={() => {
                  setActiveIndex((currentIndex) =>
                    (currentIndex - 1 + heroSlides.length) % heroSlides.length
                  );
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur transition hover:bg-black/40"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveIndex((currentIndex) =>
                    (currentIndex + 1) % heroSlides.length
                  );
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur transition hover:bg-black/40"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-6 lg:bottom-8">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/45 hover:bg-white/70"
                  }`}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </article>
    </section>
  );
}
