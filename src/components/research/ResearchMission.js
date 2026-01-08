import Container from "@/components/layout/Container";

export default function ResearchMission({ id, title, text = [], callout }) {
  // Figma shows this as a single paragraph line-block, so join if array has multiple parts.
  const body =
    Array.isArray(text) && text.length > 0 ? text.join(" ") : "";

  return (
    <section id={id} className="bg-[#F3E3CF]">
      <Container className="py-16 sm:py-20">
        <h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.05] font-medium text-[#131313]">
          {title}
        </h2>

        {body ? (
          <p className="mt-5 text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-slate-600">
            {body}
          </p>
        ) : null}

        {callout ? (
          <div className="mt-10 sm:mt-14">
            <div className="relative mx-auto w-full max-w-5xl">
              <div aria-hidden className="absolute top-0 left-0 -translate-x-[1.5%] translate-y-0 w-[103%] h-full rotate-[-1deg] rounded-[28px] bg-[#FFDBAE] border border-black/20"/>

              <div className="relative rounded-[26px] bg-white border-2 border-[#131313] px-7 py-8 sm:px-12 sm:py-10">
                <p className="text-center text-[0.95rem] sm:text-[1rem] leading-relaxed text-slate-700">
                  {callout}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
