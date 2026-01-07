"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";

export default function AdmissionsJourney({ eyebrow, title, items = [] }) {
  const [active, setActive] = useState(0);

  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const total = safeItems.length;

  const goTo = (idx) => setActive(Math.max(0, Math.min(idx, total - 1)));

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
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

        {/* Desktop: static row */}
        <div className="hidden lg:grid mt-10 grid-cols-4 gap-6">
          {safeItems.map((card, idx) => (
            <JourneyCard key={idx} {...card} />
          ))}
        </div>

        {/* Mobile/Tablet: carousel */}
        <div className="lg:hidden mt-10">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {safeItems.map((card, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-1">
                    <JourneyCard {...card} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    i === active ? "bg-[#1f3b82]" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function JourneyCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl bg-[#F3E3CF] px-6 py-6 h-[190px] flex flex-col justify-between">
      <div className="flex items-center justify-center">
        <div className="relative h-10 w-10">
          {icon ? (
            <Image src={icon} alt={title || ""} fill className="object-contain" />
          ) : null}
        </div>
      </div>

      <div className="text-center">
        <div className="mt-2 text-sm font-semibold text-slate-800">
          {title}
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          {text}
        </p>
      </div>
    </div>
  );
}
