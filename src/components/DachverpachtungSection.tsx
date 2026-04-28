"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  BadgeEuro,
  Building2,
  ChevronDown,
  Coins,
  FileCheck2,
  KeyRound,
  Leaf,
  Phone,
  ShieldCheck,
  SunMedium,
  Wrench,
} from "lucide-react";
import HeroCardShowcase, {
  type HeroCardShowcaseItem,
} from "@/components/HeroCardShowcase";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const FIT_CARDS = [
  { icon: Building2, title: "Mindestens 600 m²", text: "Zusammenhängende Fläche von ca. 30 × 20 m." },
  { icon: Wrench, title: "Solide Dachstatik", text: "Tragfähige Konstruktion. Detailprüfung durch uns." },
  { icon: KeyRound, title: "Eigentum / Befugnis", text: "Alleiniger Eigentümer oder entscheidungsbefugt." },
  { icon: SunMedium, title: "Geringe Verschattung", text: "Frei von Schatten durch Bäume oder Gebäude." },
];

const BENEFITS = [
  { icon: Coins, title: "0 € Investition", text: "Wir tragen sämtliche Kosten für Planung, Material, Netzanschluss und Montage. Ihr Betriebsvermögen bleibt vollständig unangetastet." },
  { icon: ShieldCheck, title: "Maximale Sicherheit", text: "Als Betreiber übernehmen wir die volle Haftung, Wartung und Versicherung der Anlage über die gesamte Laufzeit. Keinerlei Risiko für Sie." },
  { icon: BadgeEuro, title: "Planbare Liquidität", text: "Wählen Sie zwischen einer attraktiven Einmalzahlung (Kick-back) oder laufenden jährlichen Pachteinnahmen - flexibel nach Ihrem Bedarf." },
  { icon: Leaf, title: "Substanzerhalt", text: "Die PV-Module schützen Ihre Dachhaut vor direkter Witterung und UV-Strahlung und verlängern die Lebensdauer Ihrer Immobilie." },
];

const SANIERUNG_STEPS = [
  { number: "1", title: "Professionelle Asbestsanierung", text: "Zertifizierte Fachbetriebe übernehmen Demontage und Entsorgung gemäß TRGS 519." },
  { number: "2", title: "Hochwertige Neueindeckung", text: "Ihr Gebäude erhält eine neue Eindeckung (z.B. Trapezblech), optimal für PV-Betrieb." },
  { number: "3", title: "Keine Kosten für Sie", text: "Die Erträge der Solaranlage refinanzieren die komplette Sanierung." },
  { number: "4", title: "Betriebsfrieden", text: "Minimale Beeinträchtigung Ihrer Tiere und betrieblichen Abläufe." },
];

const PPA_POINTS = [
  { icon: Coins, title: "Preisstabilität", text: "Unabhängigkeit von schwankenden Börsenstrompreisen durch langfristig fixierte Konditionen." },
  { icon: Leaf, title: "Imagegewinn", text: "Sichtbare PV-Anlage für Ihr Marketing als nachhaltiges Unternehmen." },
  { icon: FileCheck2, title: "Netz-Check inklusive", text: "Kostenlose Prüfung der Netzkapazitäten und Übernahme der Bürokratie." },
];

const PROCESS_STEPS = [
  { number: "01", title: "Erstprüfung", text: "Remote-Analyse via Satellitenbilder, Katasterdaten und Netzkapazitätsprüfung." },
  { number: "02", title: "Vor-Ort-Termin", text: "Begutachtung von Dachzustand, Statik und elektrischer Infrastruktur." },
  { number: "03", title: "Angebot & Vertrag", text: "Verbindliches Pachtangebot mit transparenter Absicherung." },
  { number: "04", title: "Bauphase", text: "Installation und ggf. Dachsanierung durch koordinierte Fachteams." },
  { number: "05", title: "Inbetriebnahme", text: "Netzanschluss, Stromfluss - 20+ Jahre Rundum-Service." },
];

const FAQ_ITEMS = [
  { question: "Warum ist eine Dienstbarkeit im Grundbuch notwendig?", answer: "Die Dienstbarkeit sichert die technischen und rechtlichen Nutzungsrechte der Anlage über die gesamte Vertragslaufzeit. So sind beide Seiten langfristig abgesichert." },
  { question: "Habe ich Kosten für Wartung oder Reparaturen?", answer: "Nein. Wartung, Betrieb, Versicherung und technische Instandhaltung der Photovoltaikanlage übernehmen wir vollständig." },
  { question: "Was passiert nach Ablauf der Pachtzeit?", answer: "Zum Vertragsende besprechen wir gemeinsam die Anschlusslösung. Je nach Projekt sind Verlängerung, Rückbau oder eine Übernahme der Anlage möglich." },
  { question: "Wieviel Pacht bekomme ich für meine Dachfläche?", answer: "Das hängt von Größe, Lage, Netzanschluss und Dachzustand ab. Nach der Erstprüfung erhalten Sie eine konkrete und transparente Einschätzung." },
  { question: "Kann ich PV auf einem Asbestdach installieren?", answer: "Direkt auf einem Asbestdach ist das nicht zulässig. Genau dafür gibt es unser Modell Dachsanierung gegen Verpachtung mit vorheriger professioneller Sanierung." },
];

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
const DP_HERO_CARDS: HeroCardShowcaseItem[] = [
  {
    title: "Pachteinnahmen ohne Investition",
    subtitle: "Planbar ueber 20+ Jahre",
    text: "Wir uebernehmen Planung, Bau, Betrieb und Versicherung, waehrend Ihre Dachflaeche zu einer ruhigen, sicheren Einnahmequelle wird.",
    image: "/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach2.jpg",
  },
  {
    title: "Dachsanierung gegen Verpachtung",
    subtitle: "Neueindeckung statt Sanierungskosten",
    text: "Besonders fuer Landwirtschaft und Bestandshallen: professionelle Sanierung, neue Dachhaut und anschliessend wirtschaftliche PV-Nutzung.",
    image: "/solaranlage-neu-alab.png",
  },
  {
    title: "PPA & Bilanzoptimierung",
    subtitle: "Green Energy fuer Gewerbe",
    text: "Auf Wunsch verbinden wir Dachverpachtung mit direktem Strombezug, stabilen Konditionen und einem sichtbaren Nachhaltigkeitsgewinn.",
    image: "/bilanzoptimierung-dach.jpg",
  },
];

export default function DachverpachtungSection() {
  return (
    <>
      <HeroCardShowcase
        title="DACHVERPACHTUNG FÜR GROSSE DACHFLÄCHEN"
        description="Sichere Pachteinnahmen, optionale Dachsanierung und professionell strukturierte PV-Projekte für Landwirtschaft und Gewerbe – ingenieurmäßig geplant und durch unseren zertifizierten Elektrofachbetrieb sauber umgesetzt."
        heroImage="/bilanzoptimierung-dach.jpg"
        heroImageAlt="Großes Dach mit Photovoltaik zur Verpachtung"
        cards={DP_HERO_CARDS}
      />
      <DPBenefits />
      <DPFit />
      <DPSanierung />
      <DPPpa />
      <DPProcess />
      <DPFaq />
      <DPCta />
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
function DPHero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink">
      <video
        src="/dachverpachtung-hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 py-32 lg:px-8">
        <div className="max-w-[680px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            ALAB Energiesysteme — Großprojekte ab 600 m²
          </p>
          <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.05] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.4)]">
            Verwandeln Sie Ihre Dachflächen in{" "}
            <span className="text-accent">Kapital.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-[1.05rem] leading-[1.8] text-white/75">
            Sichere Pachteinnahmen oder kostenfreie Dachsanierung für
            Landwirtschaft & Industrie. Wir übernehmen 100% der Investition,
            Wartung und Versicherung – über 20 Jahre.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#faq"
              className="group inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
            >
              Kostenlose Ertragseinschätzung
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#ablauf"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
            >
              Ablauf ansehen
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ═══════════════════════════════════════════════
   BENEFITS — Ihr Dach kann mehr
   ═══════════════════════════════════════════════ */
function DPBenefits() {
  return (
    <section className="bg-[#f7f9fb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid grid-cols-1 items-end gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Dachverpachtung Solaranlage
            </p>
            <h2 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
              Ihr Dach kann mehr als nur regendicht sein.
            </h2>
          </div>
          <p className="text-[1rem] leading-[1.8] text-muted">
            Wir betrachten Ihr Dach als ungenutztes Kraftwerk. Unser Pachtmodell
            aktiviert diese stille Reserve – ohne eigenes Kapital zu binden. Wir
            konzentrieren uns ausschließlich auf Großprojekte im gewerblichen und
            landwirtschaftlichen Sektor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[var(--radius-card)] bg-white p-8 shadow-[0_4px_20px_rgba(15,37,51,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,37,51,0.1)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                </div>
                <h3 className="mb-3 text-[1.15rem] font-bold text-ink">{item.title}</h3>
                <p className="text-[0.95rem] leading-[1.75] text-muted">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FIT — Ist Ihr Dach geeignet?
   ═══════════════════════════════════════════════ */
function DPFit() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
          Große Dachflächen für Photovoltaik
        </p>
        <h2 className="mb-4 max-w-[700px] text-3xl font-bold leading-tight text-ink md:text-4xl">
          Ist Ihr Dach für eine ALAB-Partnerschaft geeignet?
        </h2>
        <p className="mb-12 max-w-[700px] text-[1rem] leading-[1.8] text-muted">
          Um die wirtschaftlichen Vorteile realisieren zu können, benötigen
          unsere Projekte eine gewisse Skalierung. Prüfen Sie vorab folgende
          Kriterien:
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FIT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[0_4px_20px_rgba(15,37,51,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,37,51,0.1)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 text-[1.05rem] font-bold text-ink">{card.title}</h3>
                <p className="text-[0.9rem] leading-[1.7] text-muted">{card.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[var(--radius-card)] border-l-4 border-accent bg-accent/5 px-6 py-5 text-[0.95rem] leading-[1.75] text-muted">
          <strong className="text-ink">Hinweis:</strong> Einfamilienhäuser und
          kleine Dächer können wir aufgrund unserer industriellen
          Prozessstruktur leider nicht wirtschaftlich abbilden. Faustregel: Eine
          typische Maschinenhalle beginnt bei ca. 500–600 m².
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SANIERUNG — Neues Dach statt teurer Sanierung
   ═══════════════════════════════════════════════ */
function DPSanierung() {
  return (
    <section className="bg-ink px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Dachsanierung kostenlos gegen Photovoltaik
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl">
            Neues Dach statt teurer Sanierung.
          </h2>
          <p className="mb-4 text-[1rem] leading-[1.8] text-white/70">
            Besitzer landwirtschaftlicher Gebäude stehen oft vor einem Dilemma:
            Alte Dächer – häufig Welleternit oder asbesthaltige Platten – müssen
            saniert werden, doch die Kosten sind enorm. Gleichzeitig verbietet
            der Gesetzgeber die Installation von Solaranlagen auf
            Asbestdächern.
          </p>
          <p className="mb-10 text-[1rem] leading-[1.8] text-white/70">
            <strong className="text-white">ALAB löst dieses Problem</strong> mit
            dem Modell „Dachsanierung gegen Verpachtung".
          </p>

          <div className="space-y-5">
            {SANIERUNG_STEPS.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-sm font-bold text-accent">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-[1.05rem] font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-[0.9rem] leading-[1.7] text-white/60">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[var(--radius-card)] border border-accent/30 bg-accent/10 px-5 py-4 text-[0.95rem] font-medium leading-[1.7] text-white/90">
            <strong className="text-accent">Ideal für:</strong> Rinderställe,
            Maschinenhallen, Reithallen und Scheunen ab 600 m².
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[var(--radius-card)]">
              <div className="relative">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/80 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
                  Vorher
                </span>
                <img
                  src="/asbest-dach-alt.png"
                  alt="Asbestdach vorher"
                  className="h-[200px] w-full object-cover"
                />
              </div>
            </div>
            <div className="overflow-hidden rounded-[var(--radius-card)]">
              <div className="relative">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-green-500/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  Nachher
                </span>
                <img
                  src="/trapezblech-alt.png"
                  alt="Trapezblech nachher"
                  className="h-[200px] w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-card)]">
            <img
              src="/solaranlage-neu-alab.png"
              alt="ALAB Solaranlage auf Dach"
              className="h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PPA — Bilanzoptimierung
   ═══════════════════════════════════════════════ */
function DPPpa() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            PPA Solar Gewerbe
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Bilanzoptimierung und Green Energy für Ihr Unternehmen.
          </h2>
          <p className="mb-8 text-[1rem] leading-[1.8] text-muted">
            In der Logistik und Produktion zählen Effizienz und Nachhaltigkeit.
            Eine verpachtete Dachfläche ist der einfachste Weg, Ihre
            ESG-Kriterien zu erfüllen.
          </p>
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
            <img
              src="/bilanzoptimierung-dach.jpg"
              alt="Bilanzoptimierung Dach mit Solaranlage"
              className="h-[280px] w-full object-cover"
            />
          </div>
        </div>

        {/* Right — PPA Card */}
        <div className="rounded-[var(--radius-card)] border border-line bg-[#f7f9fb] p-8 shadow-[0_4px_20px_rgba(15,37,51,0.05)]">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">
            Power Purchase Agreement
          </span>
          <h3 className="mt-5 text-[1.6rem] font-bold leading-tight text-ink">
            Das PPA-Modell
          </h3>
          <p className="mt-4 text-[0.95rem] leading-[1.8] text-muted">
            Für energieintensive Betriebe bieten wir Modelle an, bei denen Sie
            den erzeugten Strom direkt vom Dach zu Konditionen deutlich unter
            Marktpreis kaufen.
          </p>

          <div className="mt-8 space-y-6">
            {PPA_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-[1rem] font-bold text-ink">{point.title}</h4>
                    <p className="mt-1 text-[0.9rem] leading-[1.7] text-muted">{point.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS — In 5 Schritten
   ═══════════════════════════════════════════════ */
function DPProcess() {
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
    <section id="ablauf" ref={ref} className="bg-[#f7f9fb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Unser Ablauf
          </p>
          <h2 className="mb-4 text-3xl font-bold text-ink md:text-4xl">
            In 5 Schritten zur Ertragsfläche.
          </h2>
          <p className="mx-auto max-w-[600px] text-[1rem] leading-[1.8] text-muted">
            Unser Prozess ist auf maximale Effizienz und rechtliche Sicherheit ausgelegt.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-5">
          {/* Connecting line */}
          <div className="absolute left-[10%] right-[10%] top-[28px] hidden h-[2px] bg-line sm:block" />

          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-[1.1rem] font-bold text-white shadow-[0_4px_12px_var(--color-accent-glow)]">
                {step.number}
              </div>
              <h3 className="mt-5 text-[0.95rem] font-bold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[200px] text-[0.85rem] leading-[1.65] text-muted">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════ */
function DPFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Wissen
            </p>
            <h2 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
              Häufige Fragen zur Dachverpachtung
            </h2>
            <p className="mt-5 text-[1rem] leading-[1.8] text-muted">
              Transparenz ist die Basis jeder Partnerschaft. Hier finden Sie
              Antworten auf die häufigsten Fragen.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[900px] space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[0_4px_20px_rgba(15,37,51,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(15,37,51,0.08)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[1rem] font-bold text-ink">{item.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <ChevronDown
                      className={`h-4 w-4 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[0.95rem] leading-[1.75] text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════ */
function DPCta() {
  return (
    <section className="bg-[#f8fafb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[800px] text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
          Jetzt starten
        </p>
        <h2 className="mb-4 text-3xl font-bold text-ink md:text-4xl">
          Bereit für die Aufwertung Ihrer Immobilie?
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-[0.95rem] leading-relaxed text-muted">
          Fordern Sie jetzt Ihre unverbindliche Analyse an – spezialisiert für
          Landwirtschaft und Gewerbe.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#angebot"
            data-open-angebot="dachverpachtung-ertragseinschaetzung"
            className="group inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
          >
            Kostenlose Ertragseinschätzung anfordern
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#angebot"
            data-open-angebot="dachverpachtung-kontakt"
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line px-8 py-4 text-sm font-semibold text-ink transition-all hover:border-accent/40 hover:bg-accent/5"
          >
            <Phone className="h-4 w-4" />
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
}
