"use client";

import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function triangleWave(value: number) {
  const phase = value % 2;
  return phase <= 1 ? phase : 2 - phase;
}

export function HomeFloatingObject() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const applyStyles = () => {
      const glow = glowRef.current;
      const object = objectRef.current;

      if (!glow || !object) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sidePadding = viewportWidth >= 1440 ? 88 : 36;
      const objectWidth = object.offsetWidth || 432;
      const objectHeight = object.offsetHeight || 244;
      const glowWidth = glow.offsetWidth || 144;
      const glowHeight = glow.offsetHeight || 144;
      const startX = sidePadding;
      const endX = Math.max(startX, viewportWidth - objectWidth - sidePadding);
      const horizontalProgress = triangleWave(scrollY / 1480);
      const turn = horizontalProgress * 2 - 1;
      const horizontalTravel = (endX - startX) * 0.44;
      const objectX = startX + horizontalProgress * horizontalTravel;
      const maxDrop = Math.max(180, viewportHeight * 0.32);
      const objectY = 112 + Math.min(scrollY * 0.09, maxDrop);
      const depthTiltY = turn * 5;
      const depthTiltX = 4 - Math.min(scrollY / 2600, 1.2);
      const glowX = clamp(
        objectX + objectWidth * 0.42 - glowWidth * 0.5,
        0,
        viewportWidth - glowWidth
      );
      const glowY = clamp(
        objectY + objectHeight * 0.08 - glowHeight * 0.5,
        0,
        viewportHeight - glowHeight
      );
      glow.style.transform =
        `translate3d(${glowX}px, ${glowY}px, 0) scale(${1 + Math.min(scrollY / 2400, 0.12)})`;
      glow.style.opacity = "0.82";

      object.style.transform =
        `translate3d(${objectX}px, ${objectY}px, 0) perspective(1400px) rotateX(${depthTiltX}deg) rotateY(${depthTiltY}deg) rotateZ(${turn * 1.8 - 2}deg) scale(${1 - Math.min(scrollY / 5600, 0.04)})`;
      object.style.opacity = "0.94";
    };

    const render = () => {
      frame = 0;
      applyStyles();
    };

    const queueRender = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    queueRender();
    window.addEventListener("scroll", queueRender, { passive: true });
    window.addEventListener("resize", queueRender);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueRender);
      window.removeEventListener("resize", queueRender);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 hidden overflow-hidden lg:block">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(245,73,172,0.52),rgba(124,62,212,0.16),transparent_72%)] blur-2xl will-change-transform will-change-opacity xl:h-36 xl:w-36"
        style={{ opacity: 0.82, transform: "translate3d(56px, 118px, 0) scale(1)" }}
      />

      <div
        ref={objectRef}
        className="absolute left-0 top-0 w-[15rem] will-change-transform will-change-opacity xl:w-[19rem]"
        style={{
          filter:
            "drop-shadow(0 30px 58px rgba(89, 36, 173, 0.2)) drop-shadow(0 10px 22px rgba(9, 14, 30, 0.12))",
          opacity: 0.94,
          transform:
            "translate3d(32px, 128px, 0) perspective(1400px) rotateX(4deg) rotateY(-5deg) rotateZ(-9deg) scale(1)",
          transformOrigin: "center center"
        }}
      >
        <img src="/images/tv-supreme-hero-object.png" alt="" className="w-full" />
      </div>
    </div>
  );
}
