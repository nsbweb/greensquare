import Image from "next/image";
import Container from "@/components/layout/Container";

export default function InnovationLogoStrip({ text, logos = [] }) {
  return (
    <section className="bg-[#F8E5C7] py-12 sm:py-16">
      <Container className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* Text section */}
        {text ? (
          <p className="text-[1.5rem] sm:text-base md:text-[1.8rem] text-[#4F4F4F] font-medium max-w-3xl">
            {text}
          </p>
        ) : null}

        {/* Logos in a flex row */}
        <div className="flex justify-center items-center gap-16">
          {logos.map((l, idx) => (
            <div
              key={idx}
              className="relative h-10 sm:h-12 w-[100px] sm:w-[120px] opacity-90 flex justify-center items-center"
            >
              <Image
                src={l.src}
                alt={l.alt || l.name || ""}
                width={137}
                height={137}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}