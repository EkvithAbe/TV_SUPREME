"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HomeParallaxHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let targetProgress = 0;
    let currentProgress = 0;

    const applyStyles = (progress: number) => {
      const hero = heroRef.current;

      if (!hero) {
        return;
      }

      hero.style.transform = `translate3d(0, ${progress * -72}px, 0) scale(${1 - progress * 0.04})`;
      hero.style.opacity = `${1 - progress * 0.58}`;
    };

    const animate = () => {
      frame = 0;
      currentProgress += (targetProgress - currentProgress) * 0.14;

      if (Math.abs(targetProgress - currentProgress) < 0.0007) {
        currentProgress = targetProgress;
      }

      applyStyles(currentProgress);

      if (Math.abs(targetProgress - currentProgress) >= 0.0007) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const updateTarget = () => {
      const element = sectionRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      targetProgress = clamp(-rect.top / window.innerHeight, 0, 1);

      if (!frame) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      updateTarget();
    };

    updateTarget();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[152vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.92),transparent_84%),radial-gradient(circle_at_46%_40%,rgba(255,255,255,0.56),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />

        <div className="section-wrap relative z-10 w-full pb-12 pt-32 lg:pt-36">
          <div
            ref={heroRef}
            className="max-w-[62rem] will-change-transform will-change-opacity lg:pr-[24rem]"
            style={{ opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" }}
          >
            <p className="text-sm font-heading font-bold uppercase tracking-[0.22em] text-[#f02e9b]">
              Real stories. Real people. Real impact.
            </p>

            <h1 className="mt-6 max-w-5xl font-heading text-5xl font-extrabold leading-[0.94] tracking-tight sm:text-6xl xl:text-[6.4rem]">
              <span className="block bg-gradient-to-r from-[#ff2f96] to-[#8a34f4] bg-clip-text text-transparent">
                Your Voice.
              </span>
              <span className="mt-2 block text-[#351b72]">Our Platform.</span>
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-supreme-mid sm:text-[1.12rem]">
              TV Supreme is your home for powerful stories, engaging
              interviews, live shows, podcasts, and entertainment that inform,
              inspire, and connect.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#trending" className="primary-pill px-10 py-4 text-base">
                <Play className="h-4 w-4 fill-current" />
                Explore Shows
              </Link>
              <Link href="/live" className="link-pill px-6 py-4 text-base">
                Watch Live
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
