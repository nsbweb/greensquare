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

  // ✅ NEW: optional callback to expose controller outside (for below-arrows UI, etc.)
  onControllerChange,
}) {
  const wrapRef = useRef(null);
  const [wrapW, setWrapW] = useState(0);

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

  const goPrev = () =>
    carousel.goTo(clamp(carousel.active - 1, 0, maxIndexComputed));
  const goNext = () =>
    carousel.goTo(clamp(carousel.active + 1, 0, maxIndexComputed));

  // ✅ NEW: expose controller to parent (for arrows below, custom controls, etc.)
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

  return (
    <div className={className}>
      <div ref={wrapRef} className="w-full">
        <div
          className="relative overflow-hidden"
          style={{ paddingLeft: paddingX, paddingRight: paddingX }}
        >
          {/* TRACK */}
          <div
            className="flex touch-pan-y"
            style={{
              gap,
              transform: `translateX(${-(carousel.active * stepPx) + carousel.dragX}px)`,
              transition: carousel.dragging ? "none" : "transform 350ms ease-out",
            }}
            onPointerDown={(e) =>
              carousel.onPointerDown(e, { captureTarget: wrapRef.current })
            }
            onPointerMove={carousel.onPointerMove}
            onPointerUp={carousel.onPointerUp}
            onPointerCancel={carousel.onPointerUp}
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
                  ${
                    isActive
                      ? dots?.activeClassName ?? "bg-black"
                      : dots?.inactiveClassName ?? "bg-slate-300"
                  }
                `}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
