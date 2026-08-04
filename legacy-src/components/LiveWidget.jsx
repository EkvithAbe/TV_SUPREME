import { useState, useEffect, useRef, useCallback } from 'react';
import { Tv, X, GripHorizontal } from 'lucide-react';
import { getCurrentAndNext } from '../data/scheduleData';

// Drag only activates after moving this many pixels (so taps on buttons still work)
const DRAG_THRESHOLD = 6;

export default function LiveWidget() {
  const [programs, setPrograms]   = useState(getCurrentAndNext());
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(() => ({
    x: window.innerWidth  - 300,
    y: window.innerHeight - 270,
  }));

  const widgetRef  = useRef(null);
  // dragState holds raw drag info without triggering re-renders
  const dragState  = useRef(null); // { startX, startY, offsetX, offsetY, active }

  // Refresh schedule every minute
  useEffect(() => {
    const id = setInterval(() => setPrograms(getCurrentAndNext()), 60_000);
    return () => clearInterval(id);
  }, []);

  // ── Record pointer-down on the whole card ────────────────────────────────────
  const handleDown = useCallback((clientX, clientY) => {
    const rect = widgetRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragState.current = {
      startX:  clientX,
      startY:  clientY,
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top,
      active:  false,
    };
  }, []);

  const onMouseDown = useCallback((e) => {
    // Buttons and links handle their own clicks — don't hijack them
    if (e.target.closest('button, a')) return;
    handleDown(e.clientX, e.clientY);
  }, [handleDown]);

  const onTouchStart = useCallback((e) => {
    if (e.target.closest('button, a')) return;
    const t = e.touches[0];
    handleDown(t.clientX, t.clientY);
  }, [handleDown]);

  // ── Global move/end listeners (always attached, no-op until dragState is set) ─
  useEffect(() => {
    const clamp = (clientX, clientY) => {
      const ds = dragState.current;
      if (!ds) return;
      const w = widgetRef.current?.offsetWidth  ?? 288;
      const h = widgetRef.current?.offsetHeight ?? 240;
      setPos({
        x: Math.max(0, Math.min(clientX - ds.offsetX, window.innerWidth  - w)),
        y: Math.max(0, Math.min(clientY - ds.offsetY, window.innerHeight - h)),
      });
    };

    const onMouseMove = (e) => {
      const ds = dragState.current;
      if (!ds) return;
      if (!ds.active) {
        if (Math.hypot(e.clientX - ds.startX, e.clientY - ds.startY) < DRAG_THRESHOLD) return;
        ds.active = true;
        setIsDragging(true);
      }
      clamp(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      const ds = dragState.current;
      if (!ds) return;
      const t = e.touches[0];
      if (!ds.active) {
        if (Math.hypot(t.clientX - ds.startX, t.clientY - ds.startY) < DRAG_THRESHOLD) return;
        ds.active = true;
        setIsDragging(true);
      }
      e.preventDefault(); // prevent page scroll while dragging widget
      clamp(t.clientX, t.clientY);
    };

    const onEnd = () => {
      dragState.current = null;
      setIsDragging(false);
    };

    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseup',    onEnd);
    window.addEventListener('touchmove',  onTouchMove, { passive: false });
    window.addEventListener('touchend',   onEnd);

    return () => {
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseup',    onEnd);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onEnd);
    };
  }, []); // refs only → stable forever, no re-runs needed

  const { current, next } = programs;

  /* ── Minimised pill ──────────────────────────────────────────────────────── */
  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        style={{ left: pos.x, top: pos.y }}
        className="fixed z-40 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full shadow-xl font-heading font-700 text-xs transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-live-pulse" />
        LIVE TV
      </button>
    );
  }

  /* ── Full widget ─────────────────────────────────────────────────────────── */
  return (
    <div
      ref={widgetRef}
      style={{ left: pos.x, top: pos.y }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={`fixed z-40 w-72 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-supreme-deep transition-shadow duration-150 ${
        isDragging
          ? 'cursor-grabbing shadow-[0_24px_64px_rgba(0,0,0,0.4)] scale-[1.02]'
          : 'cursor-grab'
      }`}
    >
      {/* Top bar — grip hint + close */}
      <div className="bg-supreme-dark px-3 py-2 flex items-center justify-between select-none pointer-events-none">
        <div className="flex items-center gap-2">
          <GripHorizontal size={13} className="text-supreme-mid" />
          <span className="text-[10px] font-heading font-700 uppercase tracking-widest text-supreme-mid">
            Supreme TV · Live
          </span>
        </div>
        {/* Re-enable pointer events only for the close button */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => setMinimized(true)}
          className="pointer-events-auto w-5 h-5 rounded-full flex items-center justify-center text-supreme-mid hover:text-white transition-colors"
          aria-label="Minimise"
        >
          <X size={11} />
        </button>
      </div>

      {/* Live thumbnail */}
      <div className="relative">
        <img
          src="/images/live.jpeg"
          alt="Live TV"
          className="w-full aspect-video object-cover pointer-events-none select-none"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* LIVE badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-heading font-800 uppercase px-2.5 py-1 rounded-full shadow pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" /> LIVE
        </div>

        {/* Current program */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-3 py-3 pointer-events-none">
          <p className="text-white text-xs font-heading font-700 leading-snug line-clamp-1">
            {current.program}
          </p>
          <p className="text-white/60 text-[10px] font-body mt-0.5">Started {current.time}</p>
        </div>
      </div>

      {/* Up Next + Watch button */}
      <div className="px-3 py-2.5 flex items-center gap-3 border-t border-supreme-mid/10 select-none">
        <div className="flex-1 min-w-0 pointer-events-none">
          <p className="text-[9px] font-heading font-700 uppercase tracking-widest text-supreme-mid mb-0.5">Up Next</p>
          <p className="text-xs font-heading font-700 text-supreme-dark dark:text-supreme-light leading-snug line-clamp-1">
            {next?.program ?? '—'}
          </p>
          <p className="text-[10px] font-body text-supreme-mid">{next?.time ?? ''}</p>
        </div>
        <a
          href="#video-vault"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="flex-shrink-0 flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-heading font-700 uppercase tracking-wide px-3 py-2 rounded-xl transition-colors"
        >
          <Tv size={11} /> Watch
        </a>
      </div>
    </div>
  );
}
