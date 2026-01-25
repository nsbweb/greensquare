import Container from "@/components/layout/Container";
import Image from "next/image";

export default function OutcomesPills({
  bg = "#FFFFFF",
  title = "",
  titleAlign = "center", // "center" | "left"
  maxWidth = "max-w-4xl",
  gap = "gap-4",
  items = [],
  py = "py-14 sm:py-16",
}) {
  const alignClass = titleAlign === "left" ? "text-left" : "text-center";

  return (
    <section style={{ backgroundColor: bg }}>
      <Container className={py}>
        {title ? (
          <h2 className={`${alignClass} text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]`}>
            {title}
          </h2>
        ) : null}

        <div className={`mx-auto mt-8 ${maxWidth} grid ${gap}`}>
          {items.map((it, idx) => (
            <div
              key={`${it?.text || "pill"}-${idx}`}
              className="flex items-center gap-4 rounded-2xl px-6 py-4"
              style={{ backgroundColor: it?.pillBg || "#F9E48F" }}
            >
              {it?.icon ? (
                <div className="shrink-0">
                  <Image
                    src={it.icon}
                    alt=""
                    width={62}
                    height={62}
                    className="object-contain"
                  />
                </div>
              ) : null}

              {it?.text ? (
                <p className="text-[1rem] sm:text-[1.5rem] leading-6 text-[#131313]">
                  {it.text}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
