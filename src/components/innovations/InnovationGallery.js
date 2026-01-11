import Image from "next/image";
import Container from "@/components/layout/Container";

export default function InnovationGallery({ eyebrow, title, images = [] }) {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        {eyebrow ? (
          <div className="flex justify-center">
            <span className="rounded-full bg-[#e8ecff] px-6 py-2 text-[10px] font-semibold tracking-[0.18em] text-[#1f3b82]">
              {eyebrow}
            </span>
          </div>
        ) : null}

        {title ? (
          <h2 className="mt-4 m text-center text-2xl sm:text-[4rem] font-medium text-slate-900 leading-tight w-full w-max-[70%]">
            {title}
          </h2>
        ) : null}

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="relative overflow-hidden bg-slate-100 aspect-square">
              <Image src={src} alt="" fill className="object-cover" sizes="(min-width: 640px) 160px, 33vw" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
