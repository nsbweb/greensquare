import Image from "next/image";
import Container from "@/components/layout/Container";

function splitTitleToTwoLines(title = "") {
  const t = String(title || "").trim();
  const lastSpace = t.lastIndexOf(" ");
  if (lastSpace === -1) return { first: t, second: "" };
  return { first: t.slice(0, lastSpace), second: t.slice(lastSpace + 1) };
}

function toColsClass(cols) {
  // Tailwind static safelist-friendly mapping (no dynamic class strings)
  // supports 1..6
  switch (cols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    default:
      return "grid-cols-1";
  }
}

export default function CardsGridSection({
  // Section
  bg = "#FBF7F1",
  containerClassName = "",
  sectionClassName = "",
  py = "py-16 sm:py-20",

  // Header
  eyebrow,
  title,
  description,
  subdescription,
  subtitle,
  headerAlign = "center", // "center" | "left"
  eyebrowBg = "#E7E8FF",
  eyebrowText = "#2C2F8F",

  titleClassName = "text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]",
  descriptionClassName = "mt-4 max-w-2xl text-[0.875rem] sm:text-[0.9375rem] leading-6 text-slate-500",

  // Grid behavior
  maxWidth = "max-w-6xl",
  gap = "gap-6",
  cols = { base: 1, sm: 2, lg: 3 }, // control row count via JSON
  gridClassName = "",

  // Card styling
  cardBg = "#273C75",
  cardRadius = "rounded-[18px]",
  cardPadding = "px-6 py-7",
  cardMinHeight, // number (px) optional
  cardClassName = "",

  // Card content styling
  iconSize = 40,
  iconWrapClassName = "h-10 w-10",
  titleSplit = true, // split into 2 lines automatically
  cardTitleClassName = "mt-5 text-[1.05rem] sm:text-[1.1rem] font-medium leading-[1.18] text-white",
  cardTextClassName = "mt-4 text-[0.8125rem] leading-6 text-white/75",

  // Data
  items = [],
}) {
  const headerAlignClass =
    headerAlign === "left" ? "text-left" : "text-center";

  const baseColsClass = toColsClass(cols?.base ?? 1);
  const smColsClass = toColsClass(cols?.sm ?? 1);
  const lgColsClass = toColsClass(cols?.lg ?? 1);

  return (
    <section className={sectionClassName} style={{ backgroundColor: bg }}>
      <Container className={`${py} ${containerClassName}`}>
        {(eyebrow || title || description) ? (
          <div className={headerAlignClass}>
            {eyebrow ? (
              <div
                className="inline-flex rounded-full px-4 py-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase"
                style={{ backgroundColor: eyebrowBg, color: eyebrowText }}
              >
                {eyebrow}
              </div>
            ) : null}

            {title ? <h2 className={`mt-4 ${titleClassName}`}>{title}</h2> : null}

            {description ? (
              <p className={`mx-auto ${descriptionClassName}`}>
                {description}
              </p>
            ) : null}
            
            {subdescription ? (
              <p className={`mx-auto ${descriptionClassName}`}>
                {subdescription}
              </p>
            ) : null}

            {subtitle ? (
              <p className={`mx-auto font-semibold ${descriptionClassName}`}>
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className={[
            "mt-10 sm:mt-12 mx-auto grid",
            maxWidth,
            gap,
            baseColsClass,
            `sm:${smColsClass}`,
            `lg:${lgColsClass}`,
            gridClassName,
          ].join(" ")}
        >
          {items.map((it, idx) => {
            const rawTitle = it?.title ?? "";
            const t = titleSplit ? splitTitleToTwoLines(rawTitle) : null;

            return (
              <div
                key={`${rawTitle || "item"}-${idx}`}
                className={[cardRadius, cardPadding, cardClassName].join(" ")}
                style={{
                  backgroundColor: cardBg,
                  minHeight: cardMinHeight ? `${cardMinHeight}px` : undefined,
                }}
              >
                {it?.icon ? (
                  <div className={iconWrapClassName}>
                    <Image
                      src={it.icon}
                      alt=""
                      width={iconSize}
                      height={iconSize}
                      className="object-contain opacity-95"
                    />
                  </div>
                ) : null}

                {rawTitle ? (
                  <h3 className={cardTitleClassName}>
                    {titleSplit ? (
                      <>
                        <span className="block">{t.first}</span>
                        {t.second ? <span className="block">{t.second}</span> : null}
                      </>
                    ) : (
                      rawTitle
                    )}
                  </h3>
                ) : null}

                {it?.text ? <p className={cardTextClassName}>{it.text}</p> : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
