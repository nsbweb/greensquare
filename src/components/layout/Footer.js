"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";
import siteData from "@/data/site.json";

export default function Footer() {
  const footer = siteData?.footer ?? {};
  const [email, setEmail] = useState("");

  // ✅ Map from site.json (no hardcoded arrays)
  const quickLinks = footer?.quickLinks ?? [];
  const programs = footer?.programs ?? [];
  const intelligence = footer?.intelligence ?? [];
  const connect = footer?.connect ?? [];
  const contact = footer?.contact ?? {};
  const socials = (footer?.socials ?? []).map((s) => ({
    id: (s.label || "").toLowerCase().replace(/\s+/g, "-"),
    label: s.label,
    href: s.href,
    icon: s.icon,
  }));

  // ✅ Gallery (add footer.gallery in site.json; fallback keeps footer safe)
  const gallery = useMemo(() => {
    if (Array.isArray(footer?.gallery) && footer.gallery.length) return footer.gallery;
    return [{ src: "/footer-map-img.png", alt: "Campus" }];
  }, [footer]);

  return (
    <footer className="bg-[#141414] text-white">
      <Container>
        <div className="pb-10 pt-8 sm:pt-10 lg:pt-12">
          {/* MAIN GRID */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-6">
            {/* LEFT: Gallery Slider */}
            <div className="overflow-hidden rounded-[1.75rem] bg-[#1c1c1c]">
              <FooterGallerySlider slides={gallery} />
              {/* soft green strip like figma */}
              <div className="h-10 bg-gradient-to-r from-lime-200/30 via-amber-200/25 to-lime-200/30" />
            </div>

            {/* RIGHT: Panel */}
            <div className="rounded-[1.75rem] bg-[#1c1c1c] p-4 sm:p-5 lg:p-6">
              {/* Top row: About/Newsletter + Socials (desktop) */}
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
                <div className="rounded-[1.25rem] bg-[#232323] p-4 sm:p-5">
                  <div className="flex flex-col items-start gap-3 pb-[2rem] mb-[1.2rem] border-b border-slate-100">
                    <div className="relative h-10 w-12 overflow-hidden rounded-md bg-white">
                      <Image
                        src={siteData?.site?.logo || "/icon/logo.svg"}
                        alt={siteData?.site?.name || "Blue Blocks"}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>

                    <p className="text-[0.75rem] leading-5 text-white/65">
                      {footer?.aboutText}
                    </p>
                  </div>

                  {/* Newsletter */}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-4 grid grid-cols-[1fr_auto] gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={footer?.newsletter?.placeholder || "Enter Your E-mail"}
                      className="h-11 w-full rounded-2xl bg-[#3a3a3a] px-4 text-[0.8125rem] text-white placeholder:text-white/45 outline-none ring-1 ring-transparent focus:ring-white/20"
                    />

                    {/* Desktop shows text+arrow, mobile shows only arrow (still same button) */}
                    <button
                      type="submit"
                      className="h-11 rounded-xl bg-white px-4 text-[0.8125rem] font-medium text-[#111] hover:bg-white/90"
                    >
                      <span className="hidden sm:inline">
                        {footer?.newsletter?.buttonLabel || "Submit"}{" "}
                      </span>
                      <span aria-hidden>↗</span>
                    </button>
                  </form>
                </div>

                {/* Socials (desktop right stack) */}
                <div className="hidden lg:flex lg:flex-col lg:gap-3">
                  {socials.map((s) => (
                    <SocialButton key={s.id} item={s} />
                  ))}
                </div>
              </div>

              {/* Link Columns */}
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FooterColumn title="Quick Links" items={quickLinks} />
                <FooterColumn title="Programs" items={programs} />
                <FooterColumn title="Intelligence" items={intelligence} />
                <FooterColumn title="Connect" items={connect} />
              </div>

              {/* Contact pill */}
              <div className="mt-6 rounded-[1rem] bg-[#2a2a2a] px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 text-[0.75rem] text-white/70">
                    <span aria-hidden className="text-white/60">
                      ☎
                    </span>
                    <span className="whitespace-nowrap">{contact?.phone}</span>
                    <span className="whitespace-nowrap">{contact?.whatsapp}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[0.75rem] text-white/70">
                    <span aria-hidden className="text-white/60">
                      ✉
                    </span>
                    {contact?.email ? (
                      <a
                        className="underline-offset-4 hover:underline"
                        href={`mailto:${contact.email}`}
                      >
                        {contact.email}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Socials (mobile stacked at bottom like figma mobile) */}
              <div className="mt-5 grid grid-cols-1 gap-3 lg:hidden">
                {socials.map((s) => (
                  <SocialButton key={s.id} item={s} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 flex flex-col gap-3 text-[0.75rem] text-white/45 lg:flex-row lg:items-center lg:justify-between">
            <div>© 2025 Blue Blocks Research Institute</div>

            <div className="flex items-center gap-2 lg:justify-end">
              <Link className="underline-offset-4 hover:underline" href="/privacy-policy">
                Privacy Policy
              </Link>
              <span className="text-white/25">·</span>
              <Link className="underline-offset-4 hover:underline" href="/terms">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* -------------------- sub components -------------------- */

function FooterGallerySlider({ slides }) {
  return (
    <div className="relative">
      <CarouselTrack
        total={slides.length}
        perView={{ base: 1, md: 1, lg: 1 }}
        gap={0}
        className="relative"
        dots={{
          show: true,
          className:
            "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2",
          dotClassName: "h-1.5 w-10 rounded-full",
          activeClassName: "bg-white/90",
          inactiveClassName: "bg-white/25",
          focusRingClassName: "focus:ring-white/30",
          showOn: "all",
        }}
      >
        {({ cardW }) =>
          slides.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className="relative shrink-0"
              style={{ width: cardW || "100%" }}
            >
              <div className="relative h-[14.5rem] sm:h-[18rem] lg:h-[32rem] w-full">
                <Image
                  src={item.src}
                  alt={item.alt || "Footer gallery"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
            </div>
          ))
        }
      </CarouselTrack>
    </div>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-[0.875rem] font-medium text-white">{title}</h4>
      <ul className="mt-3 space-y-2 text-[0.75rem] text-white/55">
        {items.map((l) => (
          <li key={l.label}>
            <Link className="hover:text-white/80 transition-colors" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ item }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-between rounded-[0.9rem] bg-[#2a2a2a] px-4 text-[0.875rem] text-white/80 hover:bg-[#303030] transition"
    >
      <span className="flex items-center gap-3">
        <span className="relative h-5 w-5">
          {item.icon ? (
            <Image src={item.icon} alt="" fill className="object-contain" sizes="20px" />
          ) : (
            <span className="block h-5 w-5 rounded bg-white/20" />
          )}
        </span>
        {item.label}
      </span>
      <span aria-hidden className="text-white/40">
        ↗
      </span>
    </a>
  );
}
