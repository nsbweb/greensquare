import Container from "@/components/layout/Container";

export default function FeatureGrid({ headline, items = [] }) {
  return (
    <section className="bg-[#f5efe6]">
      <Container className="py-14">
        <h2 className="text-3xl sm:text-4xl font-semibold whitespace-pre-line">
          {headline}
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-white/70 border border-black/5 p-6"
            >
              <div className="text-lg font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
