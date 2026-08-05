"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteSplashScreen() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const holdDuration = prefersReducedMotion ? 450 : 1900;
    const exitDuration = prefersReducedMotion ? 50 : 650;

    document.body.style.overflow = "hidden";

    const leaveTimer = window.setTimeout(() => {
      setPhase("leaving");
    }, holdDuration);

    const hideTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setPhase("hidden");
    }, holdDuration + exitDuration);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      className={`site-splash ${phase === "leaving" ? "site-splash-leaving" : ""}`}
      role="status"
      aria-label="TV Supreme is loading"
    >
      <div className="site-splash-aurora site-splash-aurora-left" />
      <div className="site-splash-aurora site-splash-aurora-right" />
      <div className="site-splash-sweep" />

      <div className="site-splash-content">
        <div className="site-splash-emblem">
          <span className="site-splash-ring site-splash-ring-outer" />
          <span className="site-splash-ring site-splash-ring-inner" />
          <span className="site-splash-glow" />
          <Image
            src="/images/tv-supreme-logo-final.png"
            alt="TV Supreme"
            width={490}
            height={342}
            priority
            className="site-splash-logo"
          />
        </div>

        <div className="site-splash-status">
          <span className="site-splash-live-dot" />
          <span>Colombo</span>
          <span className="site-splash-status-divider" />
          <span>On Air</span>
        </div>

        <p className="site-splash-tagline">Your screen. Your stories.</p>

        <div className="site-splash-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
