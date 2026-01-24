import Container from "@/components/layout/Container";

export default function CenteredTextBlock({
  bg = "#EEF7FD",
  title,
  text,
  textParts,
  maxWidth = "56rem"
}) {
  return (
    <section style={{ backgroundColor: bg }}>
      <Container className="py-14 sm:py-16">
        <div className="mx-auto text-center" style={{ maxWidth }}>
          {title ? (
            <h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.1] font-medium text-[#131313]">
              {title}
            </h2>
          ) : null}

          {Array.isArray(textParts) && textParts.length ? (
            <p className="mt-4 text-[0.95rem] leading-7 text-slate-600">
              {textParts.map((p, i) => {
                if (typeof p === "string") return <span key={i}>{p}</span>;
                if (p && typeof p === "object" && p.bold)
                  return (
                    <strong key={i} className="font-semibold text-[#131313]">
                      {p.bold}
                    </strong>
                  );
                return null;
              })}
            </p>
          ) : text ? (
            <p className="mt-4 text-[0.95rem] leading-7 text-slate-600">
              {text}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
