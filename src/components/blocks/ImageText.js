import Container from "@/components/layout/Container";
import Image from "next/image";

export default function ImageText({ bgClass = "bg-white", SecBg, title, text = [], imageUrl = "" }) {
  const gridColsClass = imageUrl
    ? "grid-cols-1 md:grid-cols-2"
    : "grid-cols-1 md:grid-cols-1";

  return (
    <section className={`${bgClass}`}>
      <Container className="py-12">
        <div className={`grid ${gridColsClass} ${SecBg} gap-8 items-center`}>
          {imageUrl ? (<div className="rounded-2xl overflow-hidden bg-slate-100 border">
            <div className="aspect-[16/10] flex items-center justify-center text-sm text-slate-500">
              {imageUrl ? <Image src={imageUrl}  alt="" width={815} height={555} className="object-contain" /> : "Image Placeholder"}
            </div>
          </div>) : null}

          <div>
            {title ? (<h2 className="text-2xl sm:text-3xl font-semibold whitespace-pre-line">
              {title}
            </h2>) : null}

            {text ? (<div className={`${title ? "mt-4" : "p-5"} space-y-3 text-slate-700 leading-relaxed`}>
              {text.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
