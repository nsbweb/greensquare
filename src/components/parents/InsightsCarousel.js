"use client";

import { useMemo, useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InsightsCarousel({
  title,
  subtitle,
  items = [],
  bg = "#D97B58",
}) {
  // Desktop: 3 cards visible, move by 1
  const perView = 3;

  const [index, setIndex] = useState(0); // left-most visible card
  const [cardW, setCardW] = useState(0);

  // Track width calc: card width + gap
  useEffect(() => {
    const compute = () => {
      // 1 card width in px based on container size
      // track wrapper is max-w-6xl; we measure by CSS instead:
      // fallback to a reasonable width if can't compute
      const w = window.innerWidth;

      // These are approximations aligned with max-w-6xl layouts:
      // You can tweak if needed.
      // We will also use CSS to control width, so this is just for translateX.
      if (w >= 1024) setCardW(384 + 24); // card ~384px + gap 24px
      else setCardW(320 + 16);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const maxIndex = Math.max(0, (items?.length || 0) - perView);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // Desktop shows sliding track
  return (
    <section style={{ backgroundColor: bg }} className="w-full">
      <Container className="py-14 sm:py-16">
        {/* Heading */}
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight whitespace-pre-line">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 mx-auto max-w-3xl text-sm sm:text-base text-white/90 leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* MOBILE: stacked */}
        <div className="mt-10 grid gap-4 md:hidden">
          {items?.map((item, idx) => (
            <InsightCard key={idx} item={item} />
          ))}
        </div>

        {/* DESKTOP: 3 visible, slide by 1 */}
        <div className="hidden md:block mt-12">
          <div className="relative overflow-hidden">
            {/* Viewport */}
            <motion.div
              animate={{ x: -(index * cardW) }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex gap-6"
            >
              {items?.map((item, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-[384px]" // fixed card width for stable sliding
                >
                  <InsightCard item={item} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Prev / Next */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className={`h-10 w-10 rounded-full border border-white/70 text-white grid place-items-center transition
              ${index === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"}`}
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={index === maxIndex}
              className={`h-10 w-10 rounded-full border border-white/70 text-white grid place-items-center transition
              ${index === maxIndex ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"}`}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InsightCard({ item }) {
  const { image, title, description, href = "#" } = item || {};

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-[190px_1fr]  p-1">
        <div className="relative h-[160px] w-[190px] rounded-l-2xl overflow-hidden bg-slate-200">
          {image ? (
            <Image
              src={image}
              alt={title || "Insight"}
              fill
              sizes="190px"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="px-4 flex flex-col justify-between">
          <p className="text-[0.75rem] text-slate-700 leading-relaxed line-clamp-5">
            {description}
          </p>

          <div className="mt-3 flex justify-end">
            <Link
              href={href}
              className="text-sm text-[#0E4AA2] hover:underline inline-flex items-center gap-1"
            >
              Read Now <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
