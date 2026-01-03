import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CtaBanner({ title, text, cta }) {
  return (
    <section className="bg-[#f5efe6]">
      <Container className="py-14">
        <div className="rounded-3xl bg-[#1f3b82] text-white overflow-hidden">
          <div className="p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold whitespace-pre-line">
                {title}
              </h3>
              {text ? <p className="mt-2 text-sm text-white/80">{text}</p> : null}

              {cta ? (
                <Link
                  href={cta.href}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-medium"
                >
                  {cta.label}
                </Link>
              ) : null}
            </div>

            <div className="hidden md:flex items-center justify-center w-56 h-32 rounded-2xl bg-white/10 border border-white/15 text-white/70 text-sm">
              Building Image Placeholder
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
