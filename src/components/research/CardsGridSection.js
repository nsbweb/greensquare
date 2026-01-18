import Image from "next/image";
import Container from "@/components/layout/Container";

function splitTitleToTwoLines(title = "") {
  const t = String(title || "").trim();
  const lastSpace = t.lastIndexOf(" ");
  if (lastSpace === -1) return { first: t, second: "" };
  return { first: t.slice(0, lastSpace), second: t.slice(lastSpace + 1) };
}

function toColsClass(cols) {
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

function maxWidthClassToPx(maxWidthClass = "") {
  const token = String(maxWidthClass)
    .split(" ")
    .find((x) => x.startsWith("max-w-"));
  switch (token) {
    case "max-w-2xl":
      return 672;
    case "max-w-3xl":
      return 768;
    case "max-w-4xl":
      return 896;
    case "max-w-5xl":
      return 1024;
    case "max-w-6xl":
      return 1152;
    case "max-w-7xl":
      return 1280;
    default:
      return null;
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
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
  cols = { base: 1, sm: 2, lg: 3 },
  gridClassName = "",

  referenceColsDesktop = 4,
  desktopSpan, // if undefined -> uses cols.lg
  centerWhenShrunk = true,

  // Card styling
  cardBg = "#273C75",
  cardRadius = "rounded-[18px]",
  cardPadding = "px-6 py-7",
  cardMinHeight,
  cardClassName = "",

  // Card content styling
  iconSize = 40,
  iconWrapClassName = "h-10 w-10",
  titleSplit = true,
  cardTitleClassName = "mt-5 text-[1.05rem] sm:text-[1.1rem] font-medium leading-[1.18] text-white",
  cardTextClassName = "mt-4 text-[0.8125rem] leading-6 text-white/75",

  showNum = true,
  numClassName = "text-[3rem] sm:text-[3.2rem] font-semibold leading-none text-white/20",

  // Data
  items = [],
}) {
  const headerAlignClass = headerAlign === "left" ? "text-left" : "text-center";

  const baseColsClass = toColsClass(cols?.base ?? 1);
  const smColsClass = toColsClass(cols?.sm ?? 1);
  const lgColsClass = toColsClass(cols?.lg ?? 1);

  const desktopSlots = typeof desktopSpan === "number" ? desktopSpan : (cols?.lg ?? 1);

  const refCols = clamp(Number(referenceColsDesktop) || 4, 1, 6);
  const span = clamp(Number(desktopSlots) || 1, 1, refCols);

  const maxPx = maxWidthClassToPx(maxWidth);
  const shouldShrink = Boolean(maxPx && refCols > 0 && span < refCols);

  // Example: max-w-6xl=1152px, span=3, ref=4 => 864px
  const shrinkPx = shouldShrink ? Math.round(maxPx * (span / refCols)) : null;

  const gridWrapStyle =
    shrinkPx && centerWhenShrunk
      ? { maxWidth: `${shrinkPx}px` }
      : undefined;

  return (
    <section className={sectionClassName} style={{ backgroundColor: bg }}>
      <Container className={`${py} ${containerClassName}`}>
        {(eyebrow || title || description || subdescription || subtitle) ? (
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
              <p className={`mx-auto ${descriptionClassName}`}>{description}</p>
            ) : null}

            {subdescription ? (
              <p className={`mx-auto ${descriptionClassName}`}>{subdescription}</p>
            ) : null}

            {subtitle ? (
              <p className={`mx-auto font-semibold ${descriptionClassName}`}>{subtitle}</p>
            ) : null}
          </div>
        ) : null}

        <div
          className={[
            "mt-10 sm:mt-12 mx-auto",
            centerWhenShrunk ? "flex justify-center" : "",
          ].join(" ")}
        >
          <div
            className={[
              "grid w-full",
              maxWidth, // keeps old behavior if no shrink computed
              gap,
              baseColsClass,
              `sm:${smColsClass}`,
              `lg:${lgColsClass}`,
              gridClassName,
            ].join(" ")}
            style={gridWrapStyle}
          >
            {items.map((it, idx) => {
              const rawTitle = it?.title ?? "";
              const t = titleSplit ? splitTitleToTwoLines(rawTitle) : null;
              const num = it?.num ? String(it.num) : "";

              return (
                <div
                  key={`${rawTitle || "item"}-${idx}`}
                  className={[
                    "relative overflow-hidden",
                    cardRadius,
                    cardPadding,
                    cardClassName,
                  ].join(" ")}
                  style={{
                    backgroundColor: cardBg,
                    minHeight: cardMinHeight ? `${cardMinHeight}px` : undefined,
                  }}
                >
                  {/* ✅ BIG NUMBER (if provided) */}
                  {showNum && num ? (
                    <div className="absolute left-6 top-6 pointer-events-none select-none">
                      <div className={numClassName}>{num}</div>
                    </div>
                  ) : null}

                  {/* Icon */}
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

                  {/* Title */}
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

                  {/* Text */}
                  {it?.text ? <p className={cardTextClassName}>{it.text}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}