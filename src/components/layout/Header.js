import Link from "next/link";
import Container from "./Container";
import siteData from "@/data/site.json";

export default function Header() {
  const { site } = siteData;

  return (
    <header className="w-full">
      {/* Announcement bar */}
      <div className="bg-orange-500 text-white text-[11px] sm:text-xs">
        <Container className="py-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="truncate">{site.announcementLeft}</div>
          <div className="truncate opacity-95">{site.announcementRight}</div>
        </Container>
      </div>

      {/* Nav */}
      <div className="bg-white border-b">
        <Container className="h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide">
            {site.name}
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* simple mobile nav placeholder */}
          <div className="md:hidden text-sm text-gray-700">☰</div>
        </Container>
      </div>
    </header>
  );
}
