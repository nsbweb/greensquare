import Container from "@/components/layout/Container";

export default function ContactDetails({ eyebrow, heading, items = [], form }) {
  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left */}
          <div>
            {eyebrow ? (
              <div className="text-slate-400 text-xl sm:text-2xl font300">{eyebrow}</div>
            ) : null}

            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold text-slate-900">
              {heading}
            </h2>

            <div className="mt-8 space-y-5">
              {items.map((it, idx) => (
                <div key={idx} className="text-sm">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <span className="inline-block h-4 w-4 rounded bg-slate-200" />
                    {it.label}
                  </div>
                  <a
                    className="mt-1 block text-slate-500 hover:text-slate-700"
                    href={it.href || "#"}
                  >
                    {it.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="w-full">
            <form className="space-y-3">
              {(form?.fields || []).map((f) => {
                if (f.type === "textarea") {
                  return (
                    <textarea
                      key={f.name}
                      name={f.name}
                      placeholder={f.placeholder}
                      rows={5}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    />
                  );
                }

                return (
                  <input
                    key={f.name}
                    name={f.name}
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                );
              })}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#1f3b82] px-5 py-3 text-sm font-medium text-white hover:opacity-95"
              >
                {form?.buttonLabel || "Submit →"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
