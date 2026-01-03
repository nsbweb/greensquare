import Link from "next/link";
import Container from "./Container";
import siteData from "@/data/site.json";

function FooterColumn({ title, links = [] }) {
  return (
    <div>
      <div className="text-sm font-semibold text-white/90 mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-white/70">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { footer, site } = siteData;

  return (
    <footer className="bg-[#0f172a] text-white">
      <Container className="py-10">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: image placeholder + name */}
          <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <div className="h-56 bg-white/10 flex items-center justify-center text-white/60 text-sm">
              Footer Image Placeholder
            </div>
            <div className="p-5">
              <div className="font-semibold">{site.name}</div>
              <p className="text-sm text-white/70 mt-2 max-w-lg">
                {footer.aboutText}
              </p>
            </div>
          </div>

          {/* Right: newsletter + socials */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <div className="text-sm text-white/80 mb-3">
                  Stay updated
                </div>
                <div className="flex gap-2">
                  <input
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm outline-none"
                    placeholder={footer.newsletter.placeholder}
                  />
                  <button className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-medium">
                    {footer.newsletter.buttonLabel}
                  </button>
                </div>
              </div>

              <div className="hidden sm:flex flex-col gap-2">
                {footer.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-sm text-white/80 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Columns */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <FooterColumn title="Quick Links" links={footer.quickLinks} />
              <FooterColumn title="Programs" links={footer.programs} />
              <FooterColumn title="Intelligence" links={footer.intelligence} />
              <FooterColumn title="Connect" links={footer.connect} />
            </div>

            {/* Contact strip */}
            <div className="mt-8 rounded-xl bg-white/10 border border-white/10 p-4 text-sm text-white/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>📞 {footer.contact.phone} • 💬 {footer.contact.whatsapp}</div>
              <div>✉ {footer.contact.email}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/50 flex items-center justify-between">
          <div>© {new Date().getFullYear()} {site.name}</div>
          <div className="flex gap-3">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
