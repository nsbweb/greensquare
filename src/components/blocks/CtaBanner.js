import Link from "next/link";
import Container from "@/components/layout/Container";
import Image from "next/image";

export default function CtaBanner({ title, text, cta, image }) {
  return (
    <section className="bg-[#ffffff] py-14 pt-70 relative">
      <Container>
        <div className="rounded-3xl bg-[#1f3b82] text-white">
          <div className="p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Text Section */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold whitespace-pre-line">
                {title}
              </h3>
              {text ? <p className="mt-2 text-sm text-white/80">{text}</p> : null}

              {/* CTA Button */}
              {cta ? (
                <Link
                  href={cta.href}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {cta.label}
                </Link>
              ) : null}
            </div>

            {/* Image Section */}
            {image ? (
              <div className="relative w-full md:w-[666px] h-auto">
                <Image
                  src={image}
                  alt={title}
                  layout="responsive"
                  width={666}
                  height={606}
                  className="object-contain rounded-xl absolute -right-6 -top-98" // Image breaking out
                />
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-center w-56 h-32 rounded-2xl bg-white/10 border border-white/15 text-white/70 text-sm">
                Building Image Placeholder
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}