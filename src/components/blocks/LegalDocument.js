import Container from "@/components/layout/Container";

// very small allowlist for inline HTML (bold + line breaks only)
function sanitizeInlineHtml(input = "") {
  if (typeof input !== "string") return "";

  let s = input;

  // remove script/style blocks (safety)
  s = s.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "");

  // remove all tags except: b, strong, br
  s = s.replace(/<\/?(?!b\b|strong\b|br\b)[a-z0-9]+[^>]*>/gi, "");

  // normalize <br>
  s = s.replace(/<br\s*\/?\s*>/gi, "<br/>");

  // strip attributes from allowed tags
  s = s.replace(/<(b|strong)\s+[^>]*>/gi, "<$1>");

  return s;
}

function HtmlLine({ text }) {
  const safe = sanitizeInlineHtml(text);
  if (!safe) return null;

  return (
    <p
      className="text-[0.98rem] leading-7 text-slate-700"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

export default function LegalDocument({
  effectiveDate,
  intro = [],
  sections = [],
  maxWidth = "56rem",
}) {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-14">
        <div className="mx-auto" style={{ maxWidth }}>
          {effectiveDate ? (
            <div className="text-sm text-slate-500 mb-6">
              Effective Date: {effectiveDate}
            </div>
          ) : null}

          {Array.isArray(intro) && intro.length ? (
            <div className="space-y-3">
              {intro.map((p, i) => (
                <HtmlLine key={i} text={p} />
              ))}
            </div>
          ) : null}

          {Array.isArray(sections) && sections.length ? (
            <div className="mt-10 space-y-10">
              {sections.map((sec, idx) => (
                <div key={sec?.id || idx} className="space-y-3">
                  {sec?.title ? (
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                      {sec.title}
                    </h2>
                  ) : null}

                  {Array.isArray(sec?.paragraphs) && sec.paragraphs.length ? (
                    <div className="space-y-3">
                      {sec.paragraphs.map((p, i) => (
                        <HtmlLine key={i} text={p} />
                      ))}
                    </div>
                  ) : null}

                  {Array.isArray(sec?.bullets) && sec.bullets.length ? (
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      {sec.bullets.map((b, i) => (
                        <li key={i} className="leading-7">
                          <HtmlLine text={b} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}