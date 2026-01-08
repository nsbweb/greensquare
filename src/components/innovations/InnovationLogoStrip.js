import Image from "next/image";
import Container from "@/components/layout/Container";

export default function InnovationLogoStrip({ text, logos = [] }) {
  return (
    <section className="bg-white">
      <Container className="pb-10 sm:pb-14">
        <div className="flex flex-col items-center gap-4">
          {text ? (
            <p className="text-center text-xs sm:text-sm text-slate-500 max-w-3xl">
              {text}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {logos.map((l, idx) => (
              <div key={idx} className="relative h-6 sm:h-7 w-[88px] sm:w-[110px] opacity-90">
                <Image
                  src={l.src}
                  alt={l.alt || l.name || ""}
                  fill
                  className="object-contain"
                  sizes="110px"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
