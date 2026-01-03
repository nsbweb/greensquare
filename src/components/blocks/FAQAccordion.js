"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

export default function FAQAccordion({ title, subtitle, items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#f5efe6]">
      <Container className="py-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          {subtitle ? (
            <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-8 max-w-3xl mx-auto space-y-3">
          {items.map((it, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={it.q}
                className="rounded-2xl bg-white/70 border border-black/5 overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <span className="font-medium">{it.q}</span>
                  <span className="text-xl leading-none">{isOpen ? "×" : "+"}</span>
                </button>

                {isOpen ? (
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                    {it.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
