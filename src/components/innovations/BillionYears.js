import Image from "next/image";
import Container from "@/components/layout/Container";

export default function BillionYears({
  title,
  image,
  items = [],
  callout,
}) {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        {title ? (
          <h2 className="text-center text-2xl sm:text-3xl font-medium text-slate-900">
            {title}
          </h2>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl bg-slate-100">
              <Image
                src={image}
                alt={title || "R&D"}
                width={420}
                height={420}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="space-y-5">
              {items.map((it, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
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

            {callout ? (
              <div className="mt-8 rounded-2xl bg-[#d8f0de] px-5 py-4 text-xs sm:text-sm text-slate-700">
                {callout}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
