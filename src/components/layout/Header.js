"use client";

import { useState, useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import siteData from "@/data/site.json";
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ variant = "dark" }) {
  const { site } = siteData;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnnouncementClosed, setIsAnnouncementClosed] = useState(true);

  // Read announcement close state
  useEffect(() => {
    const closed = sessionStorage.getItem("announcementClosed") === "true";
    setIsAnnouncementClosed(closed);
  }, []);

  const isLight = variant === "light" && !scrolled;

  const toggleMenu = () => setMenuOpen((v) => !v);

  const closeAnnouncementBar = () => {
    setIsAnnouncementClosed(true);
    sessionStorage.setItem("announcementClosed", "true");
  };

  // Scroll background change (simple + stable)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Announcement Bar */}
      {!isAnnouncementClosed && (
        <div className="bg-[#D97B58] text-white text-xs sm:text-sm relative overflow-hidden">
          <Container className="py-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 overflow-hidden">
                {site.announcements?.length ? (
                  <marquee direction="left">
                    {site.announcements.map((item, idx) => (
                      <span key={idx} className="mr-10">
                        {item.text}
                      </span>
                    ))}
                  </marquee>
                ) : null}
              </div>

              <button
                onClick={closeAnnouncementBar}
                className="px-2 font-semibold"
                aria-label="Close announcement"
              >
                ✕
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-[#FFFFFF]/30 backdrop-blur">
        <Container className="py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/">
            <Image
              src={site.logo}
              alt={site.name}
              width={82}
              height={67}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-10 text-sm font-medium text-slate-800 hidden md:flex gap-8 text-sm font-medium transition-colors ${isLight ? "text-white" : "text-[#131313]"}`}>
          {site.nav.map((item) => {
            if (item.label === siteData.megaMenu?.programs?.label) {
              return (
                <ProgramsMegaMenu
                  key={item.label}
                  mega={siteData.megaMenu.programs}
                  socials={siteData.footer?.socials || []}
                  isLight={isLight}
                />
              );
            }

            return (
              <Link key={item.label} href={item.href} className="hover:text-gray-300 transition">
                {item.label}
              </Link>
            );
          })}
        </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden ${isLight ? "text-white" : "text-[#131313]"}`}
            onClick={toggleMenu}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </Container>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#1f2a44] px-6 py-4 space-y-3">
            {site.nav.map((item, idx) => (
              <div key={idx}>
                <Link href={item.href} className="block">
                  {item.label}
                </Link>

                {item.children && (
                  <div className="pl-4 mt-2 space-y-1 text-sm">
                    {item.children.map((child, cIdx) => (
                      <Link key={cIdx} href={child.href} className="block">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

/* ---------- PROGRAMS MEGA MENU (DESKTOP ONLY) ---------- */

function ProgramsMegaMenu({ mega, socials, isLight }) {
  const [open, setOpen] = useState(false);

  const items = mega?.items || [];
  const viewAll = mega?.viewAll;
  const ctaCard = mega?.ctaCard;

  return (
    <div
      className="flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`flex items-center gap-1 text-sm font-medium hover:text-indigo-100 transition ${isLight ? "text-white" : "text-[#131313]"}`}
      >
        {mega?.label || "Programs"}
        <span className="text-lg">▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-[60] mt-0 w-[min(1152px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
          >
            <div className="grid grid-cols-[4fr_2fr] gap-0">
              {/* LEFT */}
              <div>
                <div className="mb-2 p-5 pb-0 flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {viewAll?.label || "Our Programs"}{" "}
                    {viewAll?.href ? (
                      <Link
                        href={viewAll.href}
                        className="text-xs font-medium text-[#0E4AA2] hover:underline"
                      >
                        →
                      </Link>
                    ) : null}
                  </p>
                </div>

                <div className="grid grid-cols-2 border-t border-slate-100">
                  {items.map((program) => (
                    <Link
                      key={program.href}
                      href={program.href}
                      className="flex gap-3 p-5 sm:p-6 hover:bg-slate-50 border-r border-slate-100 last:border-r-0"
                    >
                      <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                        {program.image ? (
                          <Image
                            src={program.image}
                            alt={program.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                            img
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-slate-900">
                          {program.title}
                        </div>
                        <p className="line-clamp-2 text-xs text-slate-600">
                          {program.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex justify-between gap-4 p-5 sm:p-6 border-l border-slate-100">
                <div className="flex flex-col justify-between space-y-2 bg-[#F3E3CF] rounded-2xl p-5 w-full">
                  <div>
                    <p className="text-[1.2rem] mb-4 font-semibold text-slate-900">
                      {ctaCard?.title}
                    </p>
                    <p className="text-[0.75rem] text-slate-600">{ctaCard?.text}</p>
                  </div>

                  {ctaCard?.button?.href ? (
                    <Link
                      href={ctaCard.button.href}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#0F52BA] px-4 py-2 text-xs font-medium text-white hover:bg-[#0D47A1]"
                    >
                      {ctaCard.button.label}
                    </Link>
                  ) : null}
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  {(socials || []).map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#000000]/5 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                      aria-label={s.label}
                    >
                      
                      <Image
                        src={s.icon}
                        alt={(s.label || "").slice(0, 2)}
                        width={34}
                        height={34}
                        className="object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
