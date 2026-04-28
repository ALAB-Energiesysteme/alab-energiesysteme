"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import DeutschlandSection from "./DeutschlandSection";

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function UeberUnsSection() {
  return (
    <>
      <UUHero />
      <UUWerWirSind />
      <UUBanner />
      <UUVision />
      <UUWerte />
      <DeutschlandSection />
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
function UUHero() {
  return (
    <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-ink">
      <img
        src="/Alab team bild für webseite.png"
        alt="ALAB Energiesysteme Team"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="relative z-10 px-6 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
          Über ALAB Energiesysteme
        </p>
        <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.1] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.4)]">
          Wer wir sind.
        </h1>
        <p className="mx-auto mt-5 max-w-[600px] text-[1.05rem] leading-relaxed text-white/75">
          Ihr Ingenieurbüro und zertifizierter Elektrofachbetrieb für moderne Energiesysteme, normgerechte Elektroinstallation und nachhaltige Lösungen.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WER WIR SIND
   ═══════════════════════════════════════════════ */
function UUWerWirSind() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-20">
        {/* Text */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            ALAB Energiesysteme
          </p>
          <h2 className="mb-6 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight text-ink">
            Ingenieurbüro &amp; Elektrofachbetrieb aus Mindelheim mit Leidenschaft für Energie.
          </h2>

          <p className="mb-5 text-[1rem] leading-[1.8] text-muted">
            ALAB Energiesysteme ist ein inhabergeführtes Ingenieurbüro und zertifizierter
            Elektrofachbetrieb mit Sitz in Mindelheim. Wir verbinden ingenieurmäßige Planung
            mit fachgerechter Ausführung – von der Energieanalyse über die normgerechte
            Elektroinstallation bis hin zu modernen Energiesystemen. Unser Team aus eigenen
            Ingenieuren und Fachkräften arbeitet in ganz Deutschland an Projekten für
            Privat- und Geschäftskunden.
          </p>

          <p className="mb-8 text-[1rem] leading-[1.8] text-muted">
            Von Photovoltaik über Wärmepumpen bis hin zur kompletten Gebäudeelektrik –
            bei uns erhalten Sie Planung und Umsetzung aus einer Hand. Wir begleiten Sie
            von der ersten Beratung bis weit über die Inbetriebnahme hinaus.
          </p>

          <ul className="space-y-3">
            {[
              "Inhabergeführtes Ingenieurbüro & Elektrofachbetrieb",
              "Eigene Ingenieure und Fachkräfte – keine Subunternehmer",
              "Deutschlandweit im Einsatz",
              "Persönliche Betreuung von Anfang bis Ende",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
                <span className="text-[0.95rem] text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Video (Endlosschleife, ersetzt das vorherige Team-Bild) */}
        <div className="aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
          <video
            src="/tradition-innovation.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   BANNER (Full-width with background image)
   ═══════════════════════════════════════════════ */
function UUBanner() {
  return (
    <section className="relative flex min-h-[340px] items-center overflow-hidden bg-ink">
      <img
        src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=80"
        alt="Energietechnik"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 py-20 sm:px-8">
        <h2 className="mb-4 text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.15] text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.3)]">
          <span className="text-accent">ALAB</span> Energiesysteme.
        </h2>
        <p className="max-w-[550px] text-[1.1rem] leading-[1.75] text-white/80">
          Als Ingenieurbüro und zertifizierter Elektrofachbetrieb für Energiesysteme begleiten wir Sie
          deutschlandweit von der ersten Kontaktanfrage bis zur Inbetriebnahme Ihrer Anlage.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   UNSERE VISION
   ═══════════════════════════════════════════════ */
function UUVision() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 text-center">
          <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-ink">
            Unsere <strong className="text-ink">Vision.</strong>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-20">
          {/* Video */}
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
            <div className="relative overflow-hidden" style={{ paddingBottom: "56%" }}>
              <video
                src="/ueber-uns-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-[110%] w-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="mb-5 text-[1.3rem] font-bold leading-snug text-ink">
              Wir gestalten die Energieversorgung von morgen – nachhaltig, effizient und regional verankert.
            </h3>

            <p className="mb-5 text-[1rem] leading-[1.8] text-muted">
              Unsere Vision ist eine Zukunft, in der jedes Gebäude seinen Beitrag zur
              Energiewende leistet. Als Ingenieurbüro und Elektrofachbetrieb fokussieren
              wir uns auf erneuerbare Energien, moderne Gebäudetechnik und intelligente
              Installationslösungen.
            </p>

            <p className="text-[1rem] leading-[1.8] text-muted">
              Wir sind überzeugt: Die Energiewende beginnt vor Ort – beim Eigenheim,
              beim Betrieb, in der Region. Deshalb verbinden wir ingenieurmäßige Planung
              mit fachgerechter Ausführung und setzen auf eigene Ingenieure und Fachkräfte,
              die mit Leidenschaft und Kompetenz arbeiten.
            </p>

            <a
              href="#angebot"
              data-open-angebot="ueber-uns-kontakt"
              className="group mt-8 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
            >
              Kontakt aufnehmen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WERTE (01-04 Grid)
   ═══════════════════════════════════════════════ */
const WERTE = [
  {
    number: "01",
    title: "Einfach persönlich.",
    text: "Wir nehmen uns Zeit für jedes Projekt. Von der ersten Beratung bis zur Übergabe haben Sie feste Ansprechpartner, die Ihre Wünsche kennen und umsetzen.",
  },
  {
    number: "02",
    title: "Einfach regional.",
    text: "Unsere Fachkräfte kommen aus der Region und kennen die Gegebenheiten vor Ort. Das bedeutet kurze Wege, schnelle Reaktionszeiten und persönliche Nähe.",
  },
  {
    number: "03",
    title: "Einfach zuverlässig.",
    text: "Wir stehen für fachgerechte Ausführung, termingerechte Umsetzung und transparente Kommunikation. Bei uns wissen Sie immer, wo Ihr Projekt steht.",
  },
  {
    number: "04",
    title: "Einfach zukunftssicher.",
    text: "Wir setzen auf modernste Technik und nachhaltige Lösungen. Ob Photovoltaik, Wärmepumpe oder Gebäudeinstallation – wir machen Ihr Zuhause fit für die Zukunft.",
  },
];

function UUWerte() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#f7f9fb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {WERTE.map((w, i) => (
            <div
              key={w.number}
              className="flex items-start gap-5 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span className="text-[2.8rem] font-bold leading-none text-accent/20">
                {w.number}
              </span>
              <div>
                <h3 className="mb-2 text-[1.1rem] font-bold text-ink">{w.title}</h3>
                <p className="text-[0.95rem] leading-[1.7] text-muted">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
