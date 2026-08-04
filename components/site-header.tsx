"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/", label: "Home", match: "/" },
  { href: "/#shows", label: "Shows" },
  { href: "/#news", label: "News" },
  { href: "/programs", label: "Sigaram", match: "/programs" },
  { href: "/about", label: "About", match: "/about" },
  { href: "/#contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lastYRef = useRef(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeHeaderSolid, setIsHomeHeaderSolid] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      const currentY = window.scrollY;

      if (isHome) {
        setIsHidden(false);
        setIsHomeHeaderSolid(currentY > Math.max(window.innerHeight - 140, 320));
      } else {
        const delta = currentY - lastYRef.current;

        setIsHomeHeaderSolid(false);

        if (currentY <= 24) {
          setIsHidden(false);
        } else if (delta > 8) {
          setIsHidden(true);
        } else if (delta < -8) {
          setIsHidden(false);
        }
      }

      lastYRef.current = currentY;
    };

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateVisibility);
      }
    };

    lastYRef.current = window.scrollY;
    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerOffsetClass = isHome
    ? "translate-y-0"
    : isMenuOpen
      ? "translate-y-0"
      : isHidden
        ? "-translate-y-full"
        : "translate-y-0";
  const isOverlayHomeHeader = isHome && !isHomeHeaderSolid;

  return (
    <header
      className={
        isOverlayHomeHeader
          ? `fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1020]/68 shadow-[0_18px_40px_rgba(6,10,22,0.34)] backdrop-blur-xl transition-transform duration-300 ${headerOffsetClass}`
          : `${isHome ? "fixed" : "sticky"} inset-x-0 top-0 z-50 border-b border-[#ece8f2] bg-white/96 shadow-[0_10px_28px_rgba(16,24,32,0.08)] backdrop-blur-md transition-transform duration-300 ${headerOffsetClass}`
      }
    >
      <div className="mx-auto max-w-[1160px] px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img
              src="/images/tv-supreme-logo-final.png"
              alt="TV Supreme"
              className="h-20 w-20 shrink-0 object-contain drop-shadow-[0_12px_24px_rgba(79,35,154,0.14)] sm:h-24 sm:w-24"
            />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-10">
            <nav className="flex flex-wrap items-center gap-8 text-base">
              {NAV.map((item) => {
                const isActive = item.match
                  ? pathname === item.match || pathname.startsWith(`${item.match}/`)
                  : item.href === "/" && pathname === "/";

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={
                      isActive
                        ? `relative pb-1 font-heading font-semibold after:absolute after:bottom-[-0.45rem] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#f02e9b] ${
                            isOverlayHomeHeader
                              ? "text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.28)]"
                              : "text-[#242938]"
                          }`
                        : `pb-1 font-heading font-medium transition ${
                            isOverlayHomeHeader
                              ? "text-[#e7ebf3] hover:text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.24)]"
                              : "text-[#525866] hover:text-[#242938]"
                          }`
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/live"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#5d2ab9] px-7 py-3 font-heading text-sm font-semibold text-white shadow-[0_14px_28px_rgba(93,42,185,0.18)] transition hover:bg-[#4d2298]"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Live
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            className={
              isOverlayHomeHeader
                ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-white/30 lg:hidden"
                : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5dfed] bg-white text-supreme-ink transition hover:border-[#cfc2e3] lg:hidden"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-navigation"
            className="mt-4 rounded-[24px] border border-[#ece8f2] bg-white p-4 shadow-[0_16px_36px_rgba(16,24,32,0.08)] lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {NAV.map((item) => {
                const isActive = item.match
                  ? pathname === item.match || pathname.startsWith(`${item.match}/`)
                  : item.href === "/" && pathname === "/";

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={
                      isActive
                        ? "rounded-2xl border border-[#f02e9b]/20 bg-[#fff3f9] px-4 py-3 font-heading font-semibold text-[#35245f]"
                        : "rounded-2xl border border-[#ece8f2] px-4 py-3 font-heading font-medium text-[#6f6f72] transition hover:text-[#35245f]"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/live"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5d2ab9] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_14px_28px_rgba(93,42,185,0.18)] transition hover:bg-[#4d2298]"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Live
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
