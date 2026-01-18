import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";

export default function CtaBanner({
  title,
  text,
  cta,
  image,

  titlefont="text-2xl sm:text-3xl font-semibold",
  align = "left", // "left" | "center"
  theme = "dark", // "dark" | "light"
  imageAlt,
  imageHeight,
  imageWidth,
  imagePositionTopRight = "sm:-right-6 sm:-top-98",
  customTopSpacing,
  imagePosition = "right", // future: "right" | "left"
}) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <section className={`bg-white sm:py-14 ${customTopSpacing} relative`}>
      <Container paddingClassName="px-0 sm:px-4">
        <div
          className={[
            "relative sm:rounded-3xl",
            isDark ? "bg-[#1f3b82] text-white" : "bg-slate-100 text-slate-900",
          ].join(" ")}
        >
          <div
            className={[
              "p-8 sm:p-10",
              isCenter
                ? "flex flex-col items-center text-center"
                : "flex flex-col md:flex-row md:items-center md:justify-between gap-8",
            ].join(" ")}
          >
            {/* TEXT */}
            <div className={isCenter ? "max-w-2xl" : "max-w-xl"}>
              <h3 className={`${titlefont} whitespace-pre-line leading-tight`}>
                {title}
              </h3>

              {text ? (
                <p className={["mt-2 text-sm", isDark ? "text-white/80" : "text-slate-600"].join(" ")}>
                  {text}
                </p>
              ) : null}

              {cta ? (
                <Link
                  href={cta.href}
                  className={[
                    "mt-6 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors",
                    isDark
                      ? "bg-white text-[#1f3b82] hover:bg-white/90"
                      : "bg-[#1f3b82] text-white hover:bg-[#18306a]",
                  ].join(" ")}
                >
                  {cta.label} <span className="ml-2" aria-hidden>→</span>
                </Link>
              ) : null}
            </div>

            {/* IMAGE (optional) */}
            {image && !isCenter ? (
              <div className="relative hidden md:block sm:w-[86px] md:w-[666px] h-auto">
                <Image
                  src={image}
                  alt={imageAlt || ""}
                  width={imageWidth}
                  height={imageHeight}
                  className={`object-contain rounded-xl absolute ${imagePositionTopRight}`}
                />
              </div>
            ) : null}
          </div>

        </div>
      </Container>
    </section>
  );
}
