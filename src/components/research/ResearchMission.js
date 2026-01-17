import Container from "@/components/layout/Container";

export default function ResearchMission({ 
  bgClassName = "bg-[#F3E3CF]", 
  sectionTopPadd = "py-16 sm:py-20",
  calloutWidth = "max-w-5xl",
  calloutTitleClass = "text-[0.95rem] sm:text-[1rem] font-medium",
  calloutClass = "text-center text-[0.95rem] sm:text-[1rem] leading-relaxed text-slate-700",
  id, 
  title, 
  text = [],
  calloutTitle, 
  callout
}) {
  const body =
    Array.isArray(text) && text.length > 0 ? text.join(" ") : "";

  return (
    <section id={id} className={`${bgClassName}`}>
      <Container className={`${sectionTopPadd}`}>
        {title ? (<h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.05] font-medium text-[#131313]">
          {title}
        </h2>) : null}

        {body ? (
          <p className="mt-5 text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-slate-600">
            {body}
          </p>
        ) : null}

        {callout ? (
          <div className="mt-10 sm:mt-14">
            <div className={`relative mx-auto w-full ${calloutWidth}`}>
              <div aria-hidden className="absolute top-0 left-0 -translate-x-[1.5%] translate-y-0 w-[103%] h-full rotate-[-1deg] rounded-[28px] bg-[#FFDBAE] border border-black/20"/>

              <div className="relative rounded-[26px] bg-white border-2 border-[#131313] px-7 py-8 sm:px-12 sm:py-10">
                {calloutTitle ? (<h3 className={`${calloutTitleClass}`}>{calloutTitle}</h3>) : null}
                <p className={`${calloutClass}`}>
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
