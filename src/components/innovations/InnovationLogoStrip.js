import Image from "next/image";
import Container from "@/components/layout/Container";

export default function InnovationLogoStrip({ 
  sectionBg = "bg-[#F8E5C7]",
  sectionClass = "flex flex-col sm:flex-row items-center gap-6 sm:gap-8",
  sectionTitleClass = "text-[1.5rem] sm:text-base md:text-[1.8rem] text-[#4F4F4F] font-medium max-w-3xl",
  logoWrapClass = "flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16",
  text,
  logos = [] 
}) {
  return (
    <section className={`${sectionBg} py-12 sm:py-16`}>
      <Container className={`${sectionClass}`}>
        {/* Text section */}
        {text ? (
          <p className={`${sectionTitleClass}`}>
            {text}
          </p>
        ) : null}

        {/* Logos in a flex row */}
        <div className={`${logoWrapClass}`}>
          {logos.map((l, idx) => (
            <div
              key={idx}
              className="relative w-[100px] sm:w-[120px] opacity-90 flex justify-center items-center"
            >
              <Image
                src={l.src}
                alt={l.alt || l.name || ""}
                width={l.width}
                height={l.height}
                className=""
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}