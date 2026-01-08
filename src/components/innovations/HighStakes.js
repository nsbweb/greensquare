import Image from "next/image";
import Container from "@/components/layout/Container";

export default function HighStakes({
  eyebrow,
  title,
  image,
  items = [],
}) {
  return (
    <section className="bg-[#f7e7d5]">
      <Container className="py-12 sm:py-16">
        {eyebrow ? (
          <div className="flex justify-center">
            <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-slate-700">
              {eyebrow}
            </span>
          </div>
        ) : null}

        {title ? (
          <h2 className="mt-4 text-center text-2xl sm:text-3xl font-medium text-slate-900">
            {title}
          </h2>
        ) : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {items.map((it, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {it.title}
                    </div>
                    {it.text ? (
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {it.text}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md">
              <Image
                src={image}
                alt=""
                width={520}
                height={420}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
