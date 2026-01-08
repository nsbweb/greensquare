"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import { AnimatePresence, motion } from "framer-motion";

export default function TabbedFaq({ title, subtitle, tabs = [] }) {
  const [active, setActive] = useState(0);
  const current = useMemo(() => tabs[active] || {}, [tabs, active]);
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  // important: reset open accordion when tab changes
  const onTabChange = (i) => {
    setActive(i);
    setOpenIndex(0);
  };

  return (
    <section className="bg-[#F3E3CF]">
      <Container className="py-14 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-medium text-slate-900">{title}</h2>
          {subtitle ? (
            <p className="mt-3 text-xs sm:text-sm text-slate-700/80 max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => onTabChange(i)}
              className={`h-9 px-4 rounded-sm text-xs font-medium transition min-w-[220] ${
                i === active
                  ? "bg-[#4281E9] text-white"
                  : "bg-white/60 text-slate-700 hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="mt-8 space-y-3">
          {(current.items || []).map((item, index) => (
            <AccordionItem
              key={index}
              q={item.q}
              a={item.a}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function AccordionItem({ q, a, open, onToggle }) {
  return (
    <div
      className={`rounded-2xl transition-colors ${
        open ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-4 text-left"
      >
        <span className="text-sm font-medium text-slate-900">{q}</span>
        <span className="text-xl text-slate-500">{open ? "×" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-7 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {a}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
