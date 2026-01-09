import Container from "@/components/layout/Container";
import Image from "next/image";

export default function AdmissionsIntro({
  eyebrow,
  title,
  text = [],
  sideHeadline,
  image,
  bgShape
}) {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          {/* Left text */}
          <div>
            {eyebrow ? (
              <div className="inline-flex rounded-full bg-[#E7E8FF] px-4 py-1 text-[10px] font-semibold tracking-wider text-[#2C2F8F]">
                {eyebrow}
              </div>
            ) : null}

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-900 whitespace-pre-line">
              {title}
            </h2>

            <div className="mt-5 space-y-4 text-sm sm:text-[15px] leading-6 text-slate-500">
              {text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            {/* Background shape */}
            {bgShape ? (
              <div className="absolute hidden sm:flex sm:-right-6 sm:-top-6 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] pointer-events-none">
                <Image
                  src={bgShape}
                  alt=""
                  fill
                  className="object-contain opacity-90"
                  priority={false}
                />
              </div>
            ) : null}

            {/* Headline */}
            {sideHeadline ? (
              <div className="absolute right-6 -top-4 sm:top-0 text-right leading-[1.05]">
                <div className="text-2xl sm:text-3xl font-semibold text-[#F4B942]">
                  {sideHeadline.line1}
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-[#49A6D6]">
                  {sideHeadline.line2}
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-slate-700">
                  {sideHeadline.line3}
                </div>
              </div>
            ) : null}

            {/* Building image */}
            <div className="relative mt-14 lg:mt-0 w-full h-[340px] sm:h-[420px] lg:h-[460px]">
              {image ? (
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-contain"
                  priority={false}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
