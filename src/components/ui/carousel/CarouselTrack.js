"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCarousel } from "@/lib/useCarousel";

function pickPerView(perView, w) {
  if (typeof perView === "number") return perView;

  const base = perView?.base ?? 1;
  const md = perView?.md ?? base;
  const lg = perView?.lg ?? md;

  if (w >= 1024) return lg;
  if (w >= 768) return md;
  return base;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function CarouselTrack({
  // Carousel logic config (passed to useCarousel internally)
  total = 0,
  initialIndex = 0,
  swipeThreshold = 60,
  rubberBand = true,

  // Layout config
  perView = { base: 1, md: 2, lg: 4 },
  gap = 24,
  paddingX = 0,

  // Optional controls
  dots, // { show, count, className, dotClassName, activeClassName, inactiveClassName, focusRingClassName, showOn?: "all"|"desktop"|"mobile" }
  arrows, // { show, className, btnClassName, prevLabel, nextLabel, showOn?: "all"|"desktop"|"mobile" }

  // Optional: override max index logic (eg: 3 visible cards)
  maxIndexOverride,

  className = "",
  children, // (ctx) => nodes

  // optional callback to expose controller outside
  onControllerChange,
}) {
  const wrapRef = useRef(null);
  const [wrapW, setWrapW] = useState(0);

  // ✅ NEW: gate pointer move unless user is actively dragging
  const isPointerDownRef = useRef(false);
  const pointerIdRef = useRef(null);

  // Internal carousel engine
  const carousel = useCarousel({
    total,
    initialIndex,
    swipeThreshold,
    rubberBand,
  });

  // Measure width (no window usage)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setWrapW(entry.contentRect.width);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const visible = useMemo(() => pickPerView(perView, wrapW), [perView, wrapW]);

  const cardW = useMemo(() => {
    if (!wrapW) return 0;
    const available = wrapW - paddingX * 2 - gap * (visible - 1);
    return Math.floor(available / visible);
  }, [wrapW, paddingX, gap, visible]);

  const stepPx = cardW + gap;

  // Clamp range (supports override for special cases)
  const maxIndexComputed = useMemo(() => {
    if (typeof maxIndexOverride === "number") return Math.max(0, maxIndexOverride);
    return Math.max(0, total - visible);
  }, [maxIndexOverride, total, visible]);

  // Keep active inside range if perView changes
  useEffect(() => {
    if (carousel.active > maxIndexComputed) carousel.goTo(maxIndexComputed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIndexComputed]);

  const goPrev = () => carousel.goTo(clamp(carousel.active - 1, 0, maxIndexComputed));
  const goNext = () => carousel.goTo(clamp(carousel.active + 1, 0, maxIndexComputed));

  // expose controller
  useEffect(() => {
    if (!onControllerChange) return;

    onControllerChange({
      active: carousel.active,
      maxIndex: maxIndexComputed,
      goTo: carousel.goTo,
      goPrev,
      goNext,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carousel.active, maxIndexComputed]);

  // Control visibility helpers (Tailwind breakpoint classes)
  const showOnClass = (showOn) => {
    if (showOn === "desktop") return "hidden md:flex";
    if (showOn === "mobile") return "flex md:hidden";
    return "flex";
  };

  // Dots config
  const dotsCount =
    dots?.count ??
    (typeof maxIndexOverride === "number" ? maxIndexComputed + 1 : total);

  const showDots = Boolean(dots?.show) && dotsCount > 1;

  // Arrows config
  const showArrows = Boolean(arrows?.show) && total > 1;

  // ✅ Wrapped pointer handlers (fixes “hover move” bug)
  const handlePointerDown = (e) => {
    // Desktop mouse: only left click should initiate drag
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isPointerDownRef.current = true;
    pointerIdRef.current = e.pointerId;

    // capture pointer so we keep receiving move events
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch (_) {}

    carousel.onPointerDown(e, { captureTarget: wrapRef.current });
  };

  const handlePointerMove = (e) => {
    // ✅ KEY FIX: ignore pointermove unless dragging started
    if (!isPointerDownRef.current) return;
    if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;

    carousel.onPointerMove(e);
  };

  const endPointer = (e) => {
    if (!isPointerDownRef.current) return;
    if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;

    isPointerDownRef.current = false;
    pointerIdRef.current = null;

    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch (_) {}

    carousel.onPointerUp(e);
  };

  return (
    <div className={className}>
      <div ref={wrapRef} className="w-full">
        <div
          className="relative overflow-hidden"
          style={{ paddingLeft: paddingX, paddingRight: paddingX }}
        >
          {/* TRACK */}
          <div
            className="flex touch-pan-y cursor-grab active:cursor-grabbing"
            style={{
              gap,
              transform: `translateX(${-(carousel.active * stepPx) + carousel.dragX}px)`,
              transition: carousel.dragging ? "none" : "transform 350ms ease-out",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onPointerLeave={(e) => {
              // if mouse leaves while dragging, stop drag
              if (e.pointerType === "mouse") endPointer(e);
            }}
          >
            {typeof children === "function"
              ? children({
                  cardW,
                  visible,
                  stepPx,
                  active: carousel.active,
                  maxIndex: maxIndexComputed,
                  goTo: carousel.goTo,
                  goPrev,
                  goNext,
                })
              : children}
          </div>

          {/* OPTIONAL ARROWS (overlay) */}
          {showArrows ? (
            <div className={`${showOnClass(arrows?.showOn)} ${arrows?.className ?? ""}`}>
              <button
                type="button"
                onClick={goPrev}
                disabled={carousel.active === 0}
                aria-label={arrows?.prevLabel ?? "Previous"}
                className={
                  arrows?.btnClassName ??
                  "absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 border border-slate-200 shadow-sm grid place-items-center disabled:opacity-40"
                }
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={carousel.active === maxIndexComputed}
                aria-label={arrows?.nextLabel ?? "Next"}
                className={
                  arrows?.btnClassName ??
                  "absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 border border-slate-200 shadow-sm grid place-items-center disabled:opacity-40"
                }
              >
                ›
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* OPTIONAL DOTS */}
      {showDots ? (
        <div
          className={`${showOnClass(dots?.showOn)} ${
            dots?.className ?? "mt-6 justify-center gap-2"
          }`}
        >
          {Array.from({ length: dotsCount }).map((_, i) => {
            const isActive = i === carousel.active;
            return (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => carousel.goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`
                  ${dots?.dotClassName ?? "h-2 w-2"}
                  rounded-full cursor-pointer transition hover:opacity-80
                  focus:outline-none focus:ring-2
                  ${dots?.focusRingClassName ?? "focus:ring-black/20"}
                  ${isActive ? dots?.activeClassName ?? "bg-black" : dots?.inactiveClassName ?? "bg-slate-300"}
                `}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}