import Container from "@/components/layout/Container";

const TONES = {
  navy: "bg-[#1f3b82] text-white",
  mint: "bg-[#d9f2ea] text-slate-900",
  coral: "bg-[#e28a63] text-white",
};

export default function InnovationAgeCards({
  eyebrow,
  title,
  cards = [],
  footnote,
}) {
  return (
    <section className="bg-white">
      <Container className="py-10 sm:py-14">
        {eyebrow ? (
          <div className="flex justify-center">
            <span className="rounded-full bg-[#e8ecff] px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#1f3b82]">
              {eyebrow}
            </span>
          </div>
        ) : null}

        {title ? (
          <h2 className="mt-4 text-center text-2xl sm:text-3xl font-medium text-slate-900 leading-tight">
            {title}
          </h2>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className={[
                "rounded-2xl p-5 sm:p-6",
                TONES[c.tone] || "bg-slate-100 text-slate-900",
              ].join(" ")}
            >
              <div className="text-xs font-semibold tracking-[0.2em] uppercase opacity-90">
                {c.tag}
              </div>
              <div className="mt-3 text-sm sm:text-base leading-snug opacity-95">
                {c.text}
              </div>
            </div>
          ))}
        </div>

        {footnote ? (
          <p className="mt-6 text-center text-xs sm:text-sm text-[#2F6FED] font-medium">
            {footnote}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
