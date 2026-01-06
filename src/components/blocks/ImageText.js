<<<<<<< HEAD
import Container from "@/components/layout/Container";
import Image from "next/image";

export default function ImageText({ title, text = [], imageUrl = "" }) {
  return (
    <section className="bg-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden bg-slate-100 border">
            <div className="aspect-[16/10] flex items-center justify-center text-sm text-slate-500">
              {imageUrl ? <Image src={imageUrl}  alt="" width={815} height={555} className="object-contain" /> : "Image Placeholder"}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold whitespace-pre-line">
              {title}
            </h2>

            <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
              {text.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
=======
import Container from "@/components/layout/Container";

export default function ImageText({ title, text = [], imageUrl = "" }) {
  return (
    <section className="bg-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden bg-slate-100 border">
            <div className="aspect-[16/10] flex items-center justify-center text-sm text-slate-500">
              {imageUrl ? "Image" : "Image Placeholder"}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold whitespace-pre-line">
              {title}
            </h2>

            <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
              {text.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
>>>>>>> origin/main
