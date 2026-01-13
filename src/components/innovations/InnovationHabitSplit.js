import Image from "next/image";
import { useMemo } from "react";
import Container from "@/components/layout/Container";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack"; // Correct import path

export default function InnovationHabitSplit({
  image,
  eyebrow,
  title,
  description,
  descriptionClassName,
  bg = "#FFFFFF",
  subdescription,
  className,
  bullets = [],
  images = [],
}) {
  const safeItems = useMemo(() => images.filter(Boolean), [images]);
  const total = safeItems.length;

  return (
    <section className={`bg-${bg} relative`}>
      {/* Background cut-out effect */}
      <div className="absolute inset-0 bg-[#F7E7D5] -z-10">
        <div className="h-full w-full bg-[#F7E7D5] before:content-[''] before:absolute before:left-0 before:top-0 before:w-[50%] before:h-full before:bg-[#F7E7D5] before:clip-path-polygon-[0_0%,0_100%,100%_100%]"></div>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Side: Carousel */}
          <div className="lg:col-span-6 relative">
            <div aria-hidden className="absolute top-0 left-0 -translate-x-[1%] translate-y-[1%] w-[100%] h-full rotate-[-0deg] rounded-[28px] bg-[#FFDBAE] border border-black/20"/>
            {/* MOBILE / TABLET (exact old behavior, but via CarouselTrack) */}
            <div className="relative">
              <CarouselTrack
                total={total}
                initialIndex={0}
                swipeThreshold={60}
                rubberBand={true}
                perView={{ base: 1, md: 1, lg: 1 }}
                gap={0}
                paddingX={0}
                mode="page"
                arrows={{
                  show: false,
                }}
                dots={{
                  show: total > 1,
                  showOn: "both",
                  count: total,
                  className: "mb-4 flex items-center justify-center gap-2 absolute w-full bottom-0",
                  dotClassName: "h-2 w-2",
                  activeClassName: "bg-[#FFFFFF]/100 w-[20]",
                  inactiveClassName: "bg-[#FFFFFF]/30",
                  focusRingClassName: "focus:ring-[#1f3b82]/30",
                }}
                className="overflow-hidden"
              >
                {safeItems.map((card, idx) => (
                  <div key={`mobile-${idx}`} className="w-full shrink-0 px-2 flex">
                    {/* px-10 exactly like your old viewport */}
                    <ImageCard {...card} />
                  </div>
                ))}
              </CarouselTrack>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-6">
            {eyebrow ? (
              <div className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-2 text-2xl sm:text-[3rem] text-[#111118] leading-tight">
                {title}
              </h2>
            ) : null}

            {description ? (
              <p className={`mt-4 sm:text-[1.2rem] ${descriptionClassName}`}>
                {description}
              </p>
            ) : null}

            {subdescription ? (
              <p className="mt-6 sm:text-[1.2rem] text-[#414141]">
                {subdescription}
              </p>
            ) : null}

            <div className="mt-5 space-y-6">
              {bullets.map((b, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <span className="mt-1 inline-flex flex-shrink-0 items-center justify-center">
                    <Image
                      src={b.icon}
                      alt={b.title || ""}
                      width={62}
                      height={62}
                      className="object-contain"
                    />
                  </span>
                  <div className={`${className}`}>
                    <div className="text-[1.5rem] text-[#1B1B1B]">
                      {b.title}
                    </div>
                    {b.text ? (
                      <div className="mt-2 text-[1.5rem] text-[#1B1B1B]/50 leading-relaxed">
                        {b.text}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ImageCard component to render each card in the carousel
function ImageCard({ icon }) {
  return (
      <div className="relative sm:h-[680] w-full rounded-[28px] overflow-hidden border border-black/20">
        {icon ? (
          <Image
            src={icon}
            alt={""}
            width={680}
            height={600}
            className="object-contain"
          />
        ) : null}
      </div>
  );
}