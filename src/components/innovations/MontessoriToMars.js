import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function MontessoriToMars({
  image,
  eyebrow,
  title,
  text,
  cta,
  cards = [],
}) {
  return (
    <section className="bg-[#0f2d5c] text-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-white/10 aspect-[16/11]">
              <Image
                src={image}
                alt={title || "From Montessori to Mars"}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            {eyebrow ? (
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/80 ring-1 ring-white/15">
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold leading-tight">
                {title}
              </h2>
            ) : null}

            {text ? (
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                {text}
              </p>
            ) : null}

            {cta?.href ? (
              <Link
                href={cta.href}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-[#0f2d5c] hover:bg-white/90"
              >
                {cta.label}
              </Link>
            ) : null}
          </div>
        </div>

        {cards?.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/8 ring-1 ring-white/12 p-6"
              >
                {c.icon ? (
                  <div className="mb-4 text-white/80">
                    <Image
                      src={c.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="opacity-90"
                    />
                  </div>
                ) : null}
                <div className="text-lg font-semibold">{c.title}</div>
                {c.text ? (
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    {c.text}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
