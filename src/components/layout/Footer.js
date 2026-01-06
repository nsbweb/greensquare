'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Container from "@/components/layout/Container";
import siteData from "@/data/site.json";


// You can tweak hrefs to match your actual routes
const quickLinks = [
  { label: 'About BlueBlocks', href: '/about-us' },
  { label: 'Montessori Methods', href: '/montessori-methods' },
  { label: 'Programs', href: '/programs' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact us', href: '/contact' },
];

const programs = [
  { label: 'Our Programs', href: '/programs' },
  { label: 'Playgroup', href: '/programs/playgroup' },
  { label: 'Nursery', href: '/programs/nursery' },
  { label: 'Primary School', href: '/programs/primary-school' },
  { label: 'Secondary School', href: '/programs/secondary-school' },
  { label: 'Space Program', href: '/programs/space-program' },
];

const innovations = [
  { label: 'Innovation Programme', href: '/innovations/programme' },
  { label: 'Drone Patents', href: '/innovations/drone-patents' },
  { label: 'Biomimicry Hive', href: '/innovations/biomimicry-hive' },
];

const others = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Videos', href: '/videos' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { id: 'instagram', label: 'Instagram', icon: '◎', href: 'https://instagram.com' },
  { id: 'facebook', label: 'Facebook', icon: 'f', href: 'https://facebook.com' },
  { id: 'youtube', label: 'Youtube', icon: '▶', href: 'https://youtube.com' },
  { id: 'linkedin', label: 'LinkedIN', icon: 'in', href: 'https://linkedin.com' },
];

export default function Footer() {
  const { footer, site } = siteData;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    // TODO: wire to API later
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-[#050608] text-slate-100 pt-16 pb-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          {/* LEFT: CAMPUS IMAGE CARD */}
          <div className="bg-[#101012] rounded-[28px] overflow-hidden shadow-2xl">
            <div className="relative w-full h-64 sm:h-80 lg:h-96">
              <Image
                src="/footer-map-img.png"
                alt="Blue Blocks Montessori campus"
                fill
                className="object-cover"
              />
            </div>
            {/* iOS-style white bar */}
            <div className="py-4 flex justify-center bg-gradient-to-r from-lime-200/70 via-amber-200/70 to-lime-200/70">
              <div className="h-1.5 w-24 rounded-full bg-white/90" />
            </div>
          </div>

          {/* RIGHT: CTA + LINKS + SOCIALS */}
          <div className="flex flex-col gap-6">
            {/* TOP: CTA + DESKTOP SOCIALS INLINE */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-stretch">
              {/* Newsletter card (always visible) */}
              <div className="flex-1 bg-[#151517] rounded-[26px] px-6 py-6 sm:px-8 sm:py-7 shadow-xl flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-indigo-700 flex items-center justify-center text-[10px] font-bold leading-tight">
                    <span>
                      Blue
                      <br />
                      Blocks
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-semibold text-white leading-snug">
                    Recognized Worldwide
                    <br />
                    for Excellence.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-4 flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status) setStatus(null);
                    }}
                    placeholder="Enter Your E-mail"
                    className="flex-1 rounded-2xl bg-[#09090b] border border-[#27272f] px-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 px-5 py-2 text-sm font-medium"
                  >
                    Submit ↗
                  </Button>
                </form>

                {status === 'success' && (
                  <p className="text-xs text-emerald-400 mt-2">
                    Thanks! We&apos;ll keep you posted.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-red-400 mt-2">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              {/* DESKTOP SOCIALS: next to CTA (xl and up only) */}
              <div className="hidden xl:flex xl:w-[270px] flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#151517] rounded-2xl px-4 py-3 flex items-center justify-between text-sm text-slate-100 hover:bg-[#1e1e21] transition shadow-md"
                  >
                    <span className="flex items-center gap-3">
                      <span className="h-7 w-7 rounded-full bg-[#09090b] flex items-center justify-center text-[11px]">
                        {s.icon}
                      </span>
                      <span>{s.label}</span>
                    </span>
                    <span className="text-xs opacity-70">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS + PHONE/EMAIL IN ONE CARD */}
            <div className="bg-[#151517] rounded-[26px] px-6 py-6 sm:px-8 sm:py-7 shadow-xl">
              {/* links grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs sm:text-sm pb-4 border-b border-[#27272f]">
                <FooterColumn title="Quick Links" items={quickLinks} />
                <FooterColumn title="Programs" items={programs} />
                <FooterColumn title="Innovations" items={innovations} />
                <FooterColumn title="Others" items={others} />
              </div>

              {/* phone + email row */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#09090b] text-[13px]">
                    ☎
                  </span>
                  <span>+91 9000955050 · +91 9000955053</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#09090b] text-[13px]">
                    ✉
                  </span>
                  <span>info@blueblocks.in</span>
                </div>
              </div>
            </div>

            {/* MOBILE/TABLET SOCIALS: at very bottom (match Figma) */}
            <div className="flex flex-col gap-3 xl:hidden">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#151517] rounded-2xl px-4 py-3 flex items-center justify-between text-sm text-slate-100 hover:bg-[#1e1e21] transition shadow-md"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-full bg-[#09090b] flex items-center justify-center text-[11px]">
                      {s.icon}
                    </span>
                    <span>{s.label}</span>
                  </span>
                  <span className="text-xs opacity-70">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-slate-300 hover:text-white transition-colors text-[12px] sm:text-[13px]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
