import Image from "next/image";
import Container from "@/components/layout/Container";

export default function InnovationHabitSplit({
  image,
  eyebrow,
  title,
  bullets = [],
}) {
  return (
    <section className="bg-[#f7e7d5]">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl bg-slate-100 aspect-[16/12]">
              <Image
                src={image}
                alt={title || "Innovation"}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            {eyebrow ? (
              <div className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-2 text-2xl sm:text-3xl font-medium text-slate-900 leading-tight">
                {title}
              </h2>
            ) : null}

            <div className="mt-5 space-y-4">
              {bullets.map((b, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {b.title}
                    </div>
                    {b.text ? (
                      <div className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {b.text}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
