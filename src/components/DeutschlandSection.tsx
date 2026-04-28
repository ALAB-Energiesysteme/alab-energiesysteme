"use client";

export default function DeutschlandSection() {
  return (
    <section className="bg-[#f7f9fb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-20">
        <div className="mx-auto w-full max-w-[430px]">
          <img
            src="/alab-deutschlandkarte.jpg"
            alt="ALAB Deutschlandkarte"
            className="w-full object-contain"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Regional stark aufgestellt
          </p>
          <h2 className="mb-6 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight text-ink">
            Wir sind <strong className="text-ink">deutschlandweit im Einsatz.</strong>
          </h2>

          <p className="mb-6 text-[1.05rem] leading-[1.8] text-muted">
            Jedes Projekt hat individuelle Anforderungen an eine Energielösung.
            Bei ALAB Energiesysteme planen wir herstellerunabhängig und arbeiten
            mit unseren regional ansässigen Teams.
          </p>

          <p className="text-[1.05rem] leading-[1.8] text-muted">
            Bei uns erhalten Sie alles aus einer Hand. Von der Anfrage und
            Planung bis zur Installation Ihrer Anlage stehen wir Ihnen zur
            Seite. Auch nach dem Projektabschluss können Sie sich auf unsere
            Beratung verlassen.
          </p>
        </div>
      </div>
    </section>
  );
}
