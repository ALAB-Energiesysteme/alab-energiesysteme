export default function GebaeudeenergieHero() {
  return (
    <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden max-[900px]:h-[60vh] max-[900px]:min-h-[450px]">
      <img
        src="/gebaeudeenergie-bild.png"
        alt="Gebäudeenergie"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
      />

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-ink/30 via-ink/50 to-ink/70" />

      <div className="relative z-[3] flex h-full flex-col items-center justify-center px-7 pb-[60px] pt-[100px] text-center">
        <h1 className="m-0 text-[clamp(2.5rem,6vw,4.5rem)] font-light uppercase tracking-[0.15em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.3)]">
          Gebäudeenergie
        </h1>
        <p className="mt-5 max-w-[600px] text-[clamp(1rem,2vw,1.3rem)] leading-relaxed text-white/90">
          Moderne Energieversorgung und Beleuchtungstechnik für Ihre Immobilie -
          effizient, sicher und zukunftsorientiert.
        </p>
      </div>
    </section>
  );
}
