import Container from "@/components/layout/Container";

export default function RecognizedBy({ title, items = [] }) {
  return (
    <section className="bg-[#f5efe6]">
      <Container className="py-12">
        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-wide">
          {title}
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-slate-700">
          {items.map((name) => (
            <div key={name} className="text-sm font-semibold opacity-80">
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
