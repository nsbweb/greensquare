"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import { useMemo, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

/* helpers */
function toColsClass(n) {
  switch (n) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-3";
    case 4: return "grid-cols-4";
    case 5: return "grid-cols-5";
    default: return "grid-cols-3";
  }
}

function buildGridClass(cols, fallback) {
  if (!cols) return fallback;
  if (typeof cols === "number") return `${toColsClass(cols)} gap-3 sm:gap-4`;
  const base = toColsClass(cols.base || 1);
  const sm = cols.sm ? `sm:${toColsClass(cols.sm)}` : "";
  const lg = cols.lg ? `lg:${toColsClass(cols.lg)}` : "";
  return [base, sm, lg, "gap-3 sm:gap-4"].join(" ");
}

export default function InnovationGallery({
  eyebrow,
  title,

  images = [],
  items,

  cols,
  galleryClass = "grid-cols-3 gap-3 sm:gap-4",

  tileMinHeight,
  tileMaxHeight,

  enableLightbox = true,
  showThumbnails = true,

  // ✅ new video settings (optional)
  videoAutoplay = false,
  videoMuted = false,
  videoControls = true,
  videoLoop = false,
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const normalizedItems = useMemo(() => {
    const srcs = items?.length ? items : images;
    return (srcs || []).map((it) =>
      typeof it === "string" ? { type: "image", src: it } : { type: it.type || "image", ...it }
    );
  }, [items, images]);

  const slides = useMemo(() => {
    return normalizedItems.map((it) => {
      if (it.type === "video") {
        return {
          type: "video",
          poster: it.poster,
          sources: [{ src: it.src, type: it.mime || "video/mp4" }],
        };
      }
      return { src: it.src, alt: it.alt || "" };
    });
  }, [normalizedItems]);

  const gridClass = useMemo(() => buildGridClass(cols, galleryClass), [cols, galleryClass]);

  const tileStyle =
    tileMinHeight || tileMaxHeight
      ? {
          minHeight: tileMinHeight ? `${tileMinHeight}px` : undefined,
          maxHeight: tileMaxHeight ? `${tileMaxHeight}px` : undefined,
        }
      : undefined;

  const plugins = useMemo(() => (showThumbnails ? [Thumbnails] : []), [showThumbnails]);

  // ✅ Custom render for video slides to show badge + apply settings
  const render = useMemo(() => {
    return {
      slide: ({ slide }) => {
        if (slide.type !== "video") return undefined;

        return (
          <div className="relative w-full h-full">
            {/* Video badge/icon */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/55 px-3 py-2">
              <span className="text-white text-sm">▶</span>
              <span className="text-white text-xs font-semibold tracking-wide uppercase">Video</span>
            </div>

            <video
              className="h-full w-full object-contain"
              controls={Boolean(videoControls)}
              autoPlay={Boolean(videoAutoplay)}
              muted={Boolean(videoMuted)}
              loop={Boolean(videoLoop)}
              playsInline
              preload="metadata"
              poster={slide.poster}
            >
              {(slide.sources || []).map((s, i) => (
                <source key={i} src={s.src} type={s.type} />
              ))}
            </video>
          </div>
        );
      },
    };
  }, [videoControls, videoAutoplay, videoMuted, videoLoop]);

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        {eyebrow ? (
          <div className="flex justify-center">
            <span className="rounded-full bg-[#e8ecff] px-6 py-2 text-[10px] font-semibold tracking-[0.18em] text-[#1f3b82]">
              {eyebrow}
            </span>
          </div>
        ) : null}

        {title ? (
          <h2 className="mt-4 text-center text-2xl sm:text-[4rem] font-medium text-slate-900 leading-tight">
            {title}
          </h2>
        ) : null}

        <div className={`mt-10 grid ${gridClass}`}>
          {normalizedItems.map((it, idx) => (
            <button
              key={idx}
              type="button"
              className={[
                "relative overflow-hidden bg-slate-100 w-full",
                tileStyle ? "" : "aspect-square",
              ].join(" ")}
              style={tileStyle}
              onClick={() => {
                if (!enableLightbox) return;
                setIndex(idx);
                setOpen(true);
              }}
            >
              <Image
                src={it.type === "video" ? it.poster || it.src : it.src}
                alt={it.alt || ""}
                fill
                className="object-cover"
              />

              {/* Grid play overlay */}
              {it.type === "video" ? (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-black/55">
                    <span className="ml-[2px] text-white">▶</span>
                  </div>
                </div>
              ) : null}
            </button>
          ))}
        </div>

        {enableLightbox && slides.length ? (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            plugins={plugins}
            render={render}
            on={{ view: ({ index }) => setIndex(index) }}
          />
        ) : null}
      </Container>
    </section>
  );
}