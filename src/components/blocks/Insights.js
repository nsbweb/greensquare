<<<<<<< HEAD
import Container from "@/components/layout/Container";

const pillClass = {
  "The Philosophy": "bg-[#95D6ED]",
  "The Evidence": "bg-[#F9A78F]",
  "The Handbook": "bg-[#F9E48F]"
};

export default function Insights({ title, subtitle, items = [] }) {
  return (
    <section className="bg-[#f5efe6]">
      <Container className="py-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          {subtitle ? (
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className={`rounded-2xl p-6 border border-black/5 ${pillClass[it.pill] || "bg-slate-200"}`}>
              <div className="flex justify-end">
                <div className={`inline-flex rounded-1xl px-3 py-1 text-xs font-medium bg-white/30`}>
                  {it.pill}
                </div>
              </div>
              <div className="mt-3 text-lg font-semibold">{it.title}</div>
              <div className="mt-2 text-sm text-slate-700">{it.meta}</div>
              <div className="mt-5 text-sm underline underline-offset-4">
                Read this guide →
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
=======
import Container from "@/components/layout/Container";

const pillClass = {
  "The Philosophy": "bg-sky-200/70",
  "The Evidence": "bg-orange-200/70",
  "The Handbook": "bg-yellow-200/70"
};

export default function Insights({ title, subtitle, items = [] }) {
  return (
    <section className="bg-[#f5efe6]">
      <Container className="py-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          {subtitle ? (
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl bg-white/70 p-6 border border-black/5">
              <div
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  pillClass[it.pill] || "bg-slate-200"
                }`}
              >
                {it.pill}
              </div>
              <div className="mt-3 text-lg font-semibold">{it.title}</div>
              <div className="mt-2 text-sm text-slate-700">{it.meta}</div>
              <div className="mt-5 text-sm underline underline-offset-4">
                Read this guide →
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
>>>>>>> origin/main
