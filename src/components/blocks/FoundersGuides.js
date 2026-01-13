export default function FoundersGuides({
  pill = "OUR FOUNDERS",
  title = "GUIDES, NOT JUST TEACHERS",
  description = "We do not view teaching as instruction, but as a scientific discipline. Our faculty—comprising PhDs, Engineers, and Psychologists—are AMI-trained \"Prepared Adults.\" Their expertise lies not in molding the child, but in the rigorous art of observation. They possess the discipline to step back so your child can step forward.",
  items = [],
  bgClass = "bg-[#F3E3CF]", // light beige like screenshot
}) {
  return (
    <section className={bgClass}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl">
          {pill ? (
            <div className="inline-flex rounded-full bg-[#D9D2F1] px-5 py-2 text-[11px] font-semibold tracking-wide text-[#2C2C6B]">
              {pill}
            </div>
          ) : null}

          <h2 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          {description ? (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {description}
            </p>
          ) : null}
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {items.map((person, idx) => (
            <FounderCard key={person?.slug || person?.name || idx} {...person} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  name,
  roleLabel,
  roleColor = "#E08B64", // orange badge
  roleTextColor = "#ffffff",
  image,
  imageAlt,
  bio,
  readMoreHref = "/",
}) {
  return (
    <div className="rounded-[26px] border-2 border-slate-900 bg-white p-6 sm:p-7">
      {/* Image frame */}
      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        {/* Image */}
        <img
          src={image}
          alt={imageAlt || name || "Profile photo"}
          className="h-[280px] w-full object-contain p-6 sm:h-[320px]"
          style={{ backgroundColor: "#fff" }}
        />

        {/* Role tag */}
        {roleLabel ? (
          <div className="absolute bottom-5 left-5 right-5 flex justify-center">
            <span
              className="inline-flex w-full max-w-[280px] justify-center rounded-lg px-4 py-2 text-xs sm:text-sm font-medium shadow-sm"
              style={{
                backgroundColor: roleColor,
                color: roleTextColor,
              }}
            >
              {roleLabel}
            </span>
          </div>
        ) : null}
      </div>

      {/* Name */}
      {name ? (
        <h3 className="mt-6 text-xl sm:text-2xl font-medium text-blue-600">
          {name}
        </h3>
      ) : null}

      {/* Bio */}
      {bio ? (
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
          {bio}
        </p>
      ) : null}

      {/* Read more */}
      <div className="mt-5 flex justify-end">
        <a
          href={readMoreHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Read More
          <span aria-hidden="true">⌄</span>
        </a>
      </div>
    </div>
  );
}
