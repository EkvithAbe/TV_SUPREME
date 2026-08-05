"use client";

import Link from "next/link";
import {
  Heart,
  Maximize2,
  Minimize2,
  Play,
  Share2,
  Volume2,
  VolumeX
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type LivePlayerWidgetProps = {
  title: string;
  subtitle: string;
  viewerLabel: string;
  heroImage: string;
};

type Position = {
  x: number;
  y: number;
};

const DRAG_THRESHOLD = 6;
const DESKTOP_MARGIN = 36;
const MOBILE_MARGIN = 14;

function getViewportMargin() {
  return window.innerWidth >= 640 ? DESKTOP_MARGIN : MOBILE_MARGIN;
}

function clampPosition(position: Position, width: number, height: number) {
  const margin = getViewportMargin();

  return {
    x: Math.min(Math.max(margin, position.x), window.innerWidth - width - margin),
    y: Math.min(Math.max(margin, position.y), window.innerHeight - height - margin)
  };
}

function isDragBlockedTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(
      target.closest(
        'a, button, input, select, textarea, summary, [data-widget-control="true"]'
      )
    )
  );
}

export function LivePlayerWidget({
  title,
  subtitle,
  viewerLabel,
  heroImage
}: LivePlayerWidgetProps) {
  const pathname = usePathname();
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragOriginRef = useRef({ offsetX: 0, offsetY: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const clickLockUntilRef = useRef(0);
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasCustomPosition, setHasCustomPosition] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      if (!widgetRef.current) {
        return;
      }

      const rect = widgetRef.current.getBoundingClientRect();
      const margin = getViewportMargin();

      setPosition((currentPosition) => {
        if (!currentPosition || isMobile) {
          return {
            x: window.innerWidth - rect.width - margin,
            y: isMobile ? 96 : window.innerHeight - rect.height - margin
          };
        }

        return clampPosition(currentPosition, rect.width, rect.height);
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [isExpanded, hasScrolled, isMobile, pathname]);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 640);

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateCompactState = () => {
      frame = 0;
      setHasScrolled(window.scrollY > 140);
    };

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateCompactState);
      }
    };

    updateCompactState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const startDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (
      event.button !== 0 ||
      !widgetRef.current ||
      isDragBlockedTarget(event.target)
    ) {
      return;
    }

    const rect = widgetRef.current.getBoundingClientRect();
    dragPointerIdRef.current = event.pointerId;
    dragOriginRef.current = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (
      dragPointerIdRef.current !== event.pointerId ||
      !widgetRef.current
    ) {
      return;
    }

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;

    if (!isDragging && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
      return;
    }

    if (!isDragging) {
      setIsDragging(true);
      setHasCustomPosition(true);
    }

    const rect = widgetRef.current.getBoundingClientRect();
    const nextPosition = clampPosition(
      {
        x: event.clientX - dragOriginRef.current.offsetX,
        y: event.clientY - dragOriginRef.current.offsetY
      },
      rect.width,
      rect.height
    );

    setPosition(nextPosition);
  };

  const finishDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (dragPointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragPointerIdRef.current = null;
    if (isDragging) {
      setIsDragging(false);
      clickLockUntilRef.current = Date.now() + 180;
    }
  };

  if (pathname === "/live" || pathname === "/schedule" || pathname.startsWith("/admin")) {
    return null;
  }

  const isInteractionLocked = () => Date.now() < clickLockUntilRef.current;
  const isCompact =
    (isMobile || hasScrolled || isFooterVisible || pathname !== "/") && !isExpanded;
  const footerSafeTop =
    typeof window !== "undefined" && window.innerWidth >= 640 ? 92 : 96;

  const handleShare = async () => {
    const liveUrl = `${window.location.origin}/live`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "TV Supreme Live",
          text: "Watch TV Supreme live.",
          url: liveUrl
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(liveUrl);
    } catch {}
  };

  return (
    <aside
      ref={widgetRef}
      className={`fixed z-40 overflow-hidden rounded-[1.25rem] border border-white/70 bg-white shadow-[0_12px_28px_rgba(33,24,51,0.16)] transition-[transform,box-shadow,width] duration-300 ${
        isExpanded
          ? "w-[min(18rem,calc(100vw-2rem))] sm:w-[min(19rem,calc(100vw-4.5rem))]"
          : "w-[min(15rem,calc(100vw-2rem))] sm:w-[min(17rem,calc(100vw-4.5rem))]"
      } ${
        isDragging
          ? "cursor-grabbing select-none"
          : "cursor-grab hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(93,42,185,0.2)]"
      }`}
      onPointerDown={startDrag}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      style={
        !hasCustomPosition
          ? isFooterVisible
            ? {
                right: `${getViewportMargin()}px`,
                top: `${footerSafeTop}px`
              }
            : isMobile
              ? {
                  right: `${MOBILE_MARGIN}px`,
                  top: "96px"
                }
              : {
                  right: `${DESKTOP_MARGIN}px`,
                  bottom: `${DESKTOP_MARGIN}px`
                }
          : position
          ? {
              left: `${position.x}px`,
              top: `${isFooterVisible && !isDragging ? footerSafeTop : position.y}px`
            }
          : undefined
      }
    >
      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4a237e] via-[#cc2b91] to-[#30144f] transition-[height] duration-300 ${
            isCompact ? "h-24 sm:h-28" : "h-36 sm:h-40"
          }`}
          onClick={() => {
            if (!isInteractionLocked()) {
              setIsExpanded((current) => !current);
            }
          }}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && !isInteractionLocked()) {
              event.preventDefault();
              setIsExpanded((current) => !current);
            }
          }}
        >
          <img
            src={heroImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/70 via-pink-800/60 to-purple-950/80" />

          <div className={`relative px-5 text-center ${isCompact ? "scale-[0.86]" : ""}`}>
            <div className="mx-auto mb-2 flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Play className="h-6 w-6 fill-white text-white" />
            </div>
            <p className="line-clamp-2 text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-white/70">
              {isMuted ? "Muted preview" : subtitle}
            </p>
          </div>

          <div className="absolute left-3 top-3 rounded-md bg-[#e9255d] px-2 py-1">
            <span className="text-xs font-bold text-white">LIVE</span>
          </div>

          <div className="absolute right-3 top-3 flex items-center gap-2">
            <button
              type="button"
              aria-label={isMuted ? "Unmute preview" : "Mute preview"}
              data-widget-control="true"
              aria-pressed={isMuted}
              onClick={(event) => {
                event.stopPropagation();
                setIsMuted((current) => !current);
              }}
              className="rounded-lg bg-white/18 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              type="button"
              aria-label={isExpanded ? "Collapse player" : "Expand player"}
              data-widget-control="true"
              onClick={(event) => {
                event.stopPropagation();
                setIsExpanded((current) => !current);
              }}
              className="rounded-lg bg-white/18 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </div>

      <div className={`transition-[padding] duration-300 ${isCompact ? "p-2.5 sm:p-3" : "p-3.5 sm:p-4"}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-red-600 animate-pulse" />
            <span className="truncate text-xs text-gray-600 sm:text-sm">{viewerLabel}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
              data-widget-control="true"
              aria-pressed={isLiked}
              onClick={() => setIsLiked((current) => !current)}
              className="rounded-lg p-1.5 transition-colors hover:bg-purple-50"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isLiked ? "fill-[#7c3aed] text-[#7c3aed]" : "text-purple-700"
                }`}
              />
            </button>

            <button
              type="button"
              aria-label="Share live page"
              data-widget-control="true"
              onClick={handleShare}
              className="rounded-lg p-1.5 transition-colors hover:bg-purple-50"
            >
              <Share2 className="h-4 w-4 text-purple-700" />
            </button>

            <Link
              href="/live"
              aria-label="Open live page"
              data-widget-control="true"
              onClick={(event) => {
                if (Date.now() < clickLockUntilRef.current) {
                  event.preventDefault();
                }
              }}
              className="rounded-lg p-1.5 transition-colors hover:bg-purple-50"
            >
              <Maximize2 className="h-4 w-4 text-purple-700" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
