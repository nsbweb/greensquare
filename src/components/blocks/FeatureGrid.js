import Container from "@/components/layout/Container";
import Image from "next/image";

export default function FeatureGrid({ headline, items = [] }) {
  return (
    <section className="bg-[#ffffff]">
      <Container className="py-14">
        <h2 className="text-3xl sm:text-4xl font-semibold whitespace-pre-line">{headline}</h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-[#273C75]/5 border border-black/5 p-6"
            >
              <div className="icon mb-4">
                <Image 
                  src={it.icon} 
                  alt={it.title} 
                  width={100}
                  height={100} 
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
