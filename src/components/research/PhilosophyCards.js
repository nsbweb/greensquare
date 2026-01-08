import Image from "next/image";
import Container from "@/components/layout/Container";

function splitTitleToTwoLines(title = "") {
  const t = title.trim();
  const lastSpace = t.lastIndexOf(" ");
  if (lastSpace === -1) return { first: t, second: "" };
  return {
    first: t.slice(0, lastSpace),
    second: t.slice(lastSpace + 1),
  };
}

export default function PhilosophyCards({ title, items = [] }) {
  return (
    <section className="bg-[#FBF7F1]">
      <Container className="py-16 sm:py-20">
        <h2 className="text-center text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]">
          {title}
        </h2>

        {/* Centered grid like Figma (not full-width stretch) */}
        <div className="mt-10 sm:mt-12 mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const { first, second } = splitTitleToTwoLines(it.title);

            return (
              <div
                key={it.title}
                className="rounded-[20px] bg-[#273C75] text-white px-6 py-8 sm:px-7 sm:py-10"
              >
                {it.icon ? (
                  <div className="h-10 w-10 flex items-start justify-start">
                    <Image
                      src={it.icon}
                      alt=""
                      width={82}
                      height={82}
                      className="opacity-95"
                    />
                  </div>
                ) : null}

                <h3 className="mt-5 text-[1.35rem] sm:text-[1.45rem] font-medium leading-[1.12]">
                  <span className="block">{first}</span>
                  {second ? <span className="block">{second}</span> : null}
                </h3>

                <p className="mt-4 text-[0.82rem] sm:text-[0.85rem] leading-relaxed text-white/75">
                  {it.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
