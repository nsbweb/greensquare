"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import { useEffect, useMemo, useState } from "react";

export default function CouncilCarousel({ title, items = [] }) {
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCardsPerView(4);
      else if (w >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = useMemo(() => {
    return Math.max(0, items.length - cardsPerView);
  }, [items.length, cardsPerView]);

  const dots = useMemo(() => Array.from({ length: maxIndex + 1 }), [maxIndex]);

  const goTo = (i) => setIndex(Math.max(0, Math.min(i, maxIndex)));

  useEffect(() => {
    setIndex((prev) => Math.max(0, Math.min(prev, maxIndex)));
  }, [maxIndex]);

  if (!mounted) return null;

  return (
    <section className="bg-[#F3E3CF]">
      <Container className="py-16 sm:py-20">
        <h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]">
          {title}
        </h2>

        <div className="mt-10">
          <div className="overflow-hidden">
            <div
              className="flex gap-3 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${index} * (267px + 6px)))`,
              }}
            >
              {items.map((p, i) => (
                <div
                  key={p.name + i}
                  className="
                    w-[267px] flex-shrink-0
                    rounded-[22px] bg-white
                    border border-[#E1E9EE]
                    hover:border-[#C97B4E]
                    focus-within:border-[#C97B4E]
                    transition
                  "
                >
                  <div className="p-5">
                    <div className="relative h-[335px] w-full overflow-hidden rounded-[18px] bg-[#EAF6FF]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="335px"
                        className="object-cover"
                      />

                      {p.tag ? (
                        <div className="absolute right-3 top-3 rounded-[6px] bg-[#D67A52] px-3 py-1 text-[10px] font-medium text-white">
                          {p.tag}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4">
                      <div className="text-[0.95rem] font-medium text-[#131313]">
                        {p.name}
                      </div>

                      {p.role ? (
                        <div className="mt-2 text-[11px] text-slate-500">
                          {p.role}
                        </div>
                      ) : null}

                      {p.position ? (
                        <div className="mt-1 text-[11px] text-slate-500">
                          {p.position}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {dots.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`
                    h-2 w-2 rounded-full
                    cursor-pointer
                    transition
                    ${active ? "bg-[#2F6FED]" : "bg-slate-300"}
                    hover:opacity-80
                    focus:outline-none focus:ring-2 focus:ring-[#2F6FED]/40
                  `}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}