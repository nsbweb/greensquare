"use client";

import { useMemo } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";

export default function AdmissionsJourney({ 
  eyebrow, 
  title, 
  items = [],
}) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const total = safeItems.length;

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        {/* Header */}
        <div className="text-center">
          {eyebrow ? (
            <div className="inline-flex rounded-full bg-[#E7E8FF] px-4 py-1 text-[10px] font-semibold tracking-wider text-[#2C2F8F]">
              {eyebrow}
            </div>
          ) : null}

          <h2 className="mt-4 text-3xl sm:text-4xl font-medium text-slate-900 whitespace-pre-line">
            {title}
          </h2>
        </div>

        {/* DESKTOP (static) */}
        <div className="hidden lg:grid mt-10 grid-cols-4 gap-6 items-stretch">
          {safeItems.map((card, idx) => (
            <JourneyCard key={`desktop-${idx}`} {...card} />
          ))}
        </div>

        {/* MOBILE / TABLET (exact old behavior, but via CarouselTrack) */}
        <div className="lg:hidden mt-10 relative">
          <CarouselTrack
            total={total}
            initialIndex={0}
            swipeThreshold={60}
            rubberBand={true}
            perView={{ base: 1, md: 1, lg: 1 }}
            gap={0}
            paddingX={0}
            mode="page"
            arrows={{
              show: false
            }}
            dots={{
              show: total > 1,
              showOn: "mobile",
              count: total,
              className: "mt-4 flex items-center justify-center gap-2",
              dotClassName: "h-2 w-2",
              activeClassName: "bg-[#1f3b82]",
              inactiveClassName: "bg-slate-300",
              focusRingClassName: "focus:ring-[#1f3b82]/30",
            }}
            className="overflow-hidden"
          >
            {() =>
              safeItems.map((card, idx) => (
                <div
                  key={`mobile-${idx}`}
                  className="w-full shrink-0 px-10 flex"
                >
                  {/* px-10 exactly like your old viewport */}
                  <JourneyCard {...card} />
                </div>
              ))
            }
          </CarouselTrack>
        </div>
      </Container>
    </section>
  );
}

  
function JourneyCard({ icon, title, text, cardTextClassName = "mt-2 text-xs leading-5 text-slate-600"}) {
  return (
    <div className="rounded-2xl bg-[#F3E3CF] px-6 py-6 h-full w-full flex flex-col justify-between">
      <div className="flex items-center justify-center">
        <div className="relative h-10 w-10">
          {icon ? (
            <Image
              src={icon}
              alt={title || ""}
              fill
              className="object-contain"
            />
          ) : null}
        </div>
      </div>

      <div className="text-center">
        <div className="mt-2 text-sm font-semibold text-slate-800">{title}</div>
        {/* <p className="">{text}</p> */}
        {Array.isArray(text) && text.length ? (
          <div>
            {text.map((p, idx) =>
              typeof p === "string" ? (
                <p
                  className={cardTextClassName}
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ) : null
            )}
          </div>
        ) : typeof text === "string" ? (
        <p
          className={cardTextClassName}
          dangerouslySetInnerHTML={{ __html: text }}
        />) : null}
      </div>
    </div>
  );
}
