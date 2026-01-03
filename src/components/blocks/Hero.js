import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Hero({
  title,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  bgImageUrl
}) {
  const bgStyle = bgImageUrl
    ? { backgroundImage: `url(${bgImageUrl})` }
    : {
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), radial-gradient(circle at 30% 30%, rgba(255,255,255,.12), transparent 55%)"
      };

  return (
    <section
      className="relative min-h-[520px] md:min-h-[560px] bg-cover bg-center text-white"
      style={bgStyle}
    >
      <Container className="min-h-[520px] md:min-h-[560px] flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide">
            {title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/85">
            {subtitle}
          </p>
          {note ? (
            <p className="mt-1 text-xs sm:text-sm text-white/70">{note}</p>
          ) : null}

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/30 px-5 py-3 text-sm hover:bg-white/15"
              >
                {primaryCta.label}
              </Link>
            ) : null}

            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-700"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
