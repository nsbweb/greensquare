"use client";

import { useState, useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import siteData from "@/data/site.json";

export default function Header() {
  const { site } = siteData;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnnouncementClosed, setIsAnnouncementClosed] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);

  const closeAnnouncementBar = () => {
    setIsAnnouncementClosed(true);
    localStorage.setItem("announcementClosed", "true");
  };

  // Read announcement close state
  useEffect(() => {
    if (localStorage.getItem("announcementClosed") === "true") {
      setIsAnnouncementClosed(true);
    }
  }, []);

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
        scrolled ? "bg-black" : ""
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
      <header className="bg-[#FFFFFF]/30 text-white backdrop-blur">
        <Container className="py-4 flex items-center justify-between">
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
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {site.nav.map((item, idx) =>
              item.children ? (
                <div key={idx} className="relative group">
                  <button className="flex items-center gap-1">
                    {item.label}
                    <span>▼</span>
                  </button>

                  <div className="absolute top-full left-0 hidden group-hover:block bg-white text-black rounded-lg shadow-lg mt-2 min-w-[220px] z-[60]">
                    {item.children.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={idx}
                  href={item.href}
                  className="hover:text-gray-300"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
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
