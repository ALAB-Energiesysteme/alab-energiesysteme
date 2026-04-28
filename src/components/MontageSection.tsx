"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  Cable,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Hammer,
  Layers,
  Phone,
  Recycle,
  Ruler,
  Shield,
  SunMedium,
  Truck,
  Wrench,
} from "lucide-react";
import HeroCardShowcase from "@/components/HeroCardShowcase";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const HERO_TRUST = [
  "Saubere Kabelwege",
  "Normgerechte Ausführung",
  "Klare Dokumentation",
];

const BENEFITS = [
  {
    icon: Ruler,
    title: "Unterkonstruktion und Dachschutz",
    text: "Belastbar geplant, sauber gesetzt und auf Dichtigkeit, Lastverteilung und Langlebigkeit ausgelegt.",
  },
  {
    icon: Cable,
    title: "Strukturierte Kabelwege",
    text: "Trennung, Beschriftung und Führung bleiben übersichtlich, wartbar und technisch nachvollziehbar.",
  },
  {
    icon: SunMedium,
    title: "Präzise Modulintegration",
    text: "Saubere Fluchten, klare Reihenbilder und korrekte Klemmbereiche für ein hochwertiges Gesamtbild.",
  },
  {
    icon: ClipboardCheck,
    title: "Nachweise und Dokumentation",
    text: "Messwerte, Fotoreport und As-Built-Unterlagen machen die Qualität auch nach Projektende sichtbar.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    kicker: "Vorbereitung",
    title: "Fachgerechter Verbau der Unterkonstruktion",
    lead: "Stabiles Fundament, korrosionsgeschützte Tragteile und ein sauber vorbereiteter Dachaufbau.",
    bullets: [
      "Ballastierung gemäß Hersteller- und Normvorgaben.",
      "Ausnivellieren für optimale Neigung, Lastverteilung und genaue Verankerung.",
      "Durchdringungen und sensible Stellen dauerhaft und sauber abgedichtet.",
    ],
  },
  {
    number: "02",
    kicker: "Verkabelung",
    title: "Strukturierte Verlegung der DC-Kabel",
    lead: "Übersichtliche Strangführung mit Zug-, Biege- und Knickschutz für spätere Wartbarkeit.",
    bullets: [
      "Normkonforme Wegeführung mit klarer Trennung im Kabelkanal.",
      "Dauerhafte, witterungsfeste Befestigung von Kanälen, Schellen und Durchführungen.",
      "Stringlabel, Beschriftung und sauber geplante Kabelreserven nach Plan.",
    ],
  },
  {
    number: "03",
    kicker: "Modulfeld",
    title: "Modulintegration und Fixierung",
    lead: "Präzise ausgerichtet, korrekt geklemmt und sichtbar hochwertig im Gesamtbild.",
    bullets: [
      "Klemmbereiche und Anzugsdrehmomente nach Vorgabe, Potentialausgleich mitgedacht.",
      "Exakte Reihen und Fluchten für ein ruhiges, professionelles Anlagenbild.",
      "Optional mit zusätzlicher Fotodokumentation des finalen Modulrasters.",
    ],
  },
  {
    number: "04",
    kicker: "Abschluss",
    title: "Dokumentation und Nachweise",
    lead: "Messbar gute Qualität durch Protokolle, Fotoreport und nachvollziehbare Übergabe.",
    bullets: [
      "Messungen für Isolations- und Stromwerte sowie sichtbare Qualitätsprüfung.",
      "Abnahmeprotokoll, Beschilderung und digitale Übergabe der Montageunterlagen.",
      "Sauber dokumentierte Basis für Betrieb, Wartung und spätere Erweiterungen.",
    ],
  },
];

const REFERENZEN = [
  { src: "/assets/img/referenzen-montage/anlage1_M.jpg", label: "Flachdach mit sauberem Modulraster" },
  { src: "/assets/img/referenzen-montage/anlage2_M.jpg", label: "Hallendach mit sauber geführten Reihen" },
  { src: "/assets/img/referenzen-montage/anlage3_M.jpg", label: "Großflächige Anlage in der Umsetzung" },
  { src: "/assets/img/referenzen-montage/anlage4_M.jpg", label: "Gewerbedach mit ausgerichteter UK" },
  { src: "/assets/img/referenzen-montage/anlage5_M.jpg", label: "Modulfelder mit klarer Linienführung" },
  { src: "/assets/img/referenzen-montage/anlage6_M.jpg", label: "Montagebild aus laufendem Projekt" },
  { src: "/assets/img/referenzen-montage/anlage7_M.jpg", label: "Saubere Montage auf Bestandsdach" },
  { src: "/assets/img/referenzen-montage/anlage8_M.jpg", label: "PV-System mit strukturierter Belegung" },
  { src: "/assets/img/referenzen-montage/anlage9_M.jpg", label: "Installiertes Dachsystem" },
  { src: "/assets/img/referenzen-montage/anlage10_M.jpg", label: "Montage auf gewerblicher Fläche" },
  { src: "/assets/img/referenzen-montage/anlage11_M.jpg", label: "Projekt mit dokumentierter Ausführung" },
  { src: "/assets/img/referenzen-montage/anlage12_M.jpg", label: "Reihenbild mit technischem Look" },
  { src: "/assets/img/referenzen-montage/anlage13_M.jpeg", label: "Referenzfoto aus der Montagepraxis" },
  { src: "/assets/img/referenzen-montage/anlage14_M.jpg", label: "Dachbelegung mit präziser Ausrichtung" },
  { src: "/assets/img/referenzen-montage/anlage15_M.jpeg", label: "Fertigstellung mit sauberer Moduloptik" },
  { src: "/assets/img/referenzen-montage/anlage16_M.jpg", label: "Sauber integrierte Modulfelder" },
  { src: "/assets/img/referenzen-montage/anlage17_M.jpg", label: "Referenzprojekt mit Qualität" },
  { src: "/assets/img/referenzen-montage/anlage18_M.jpg", label: "Projektaufnahme aus dem Bestand" },
  { src: "/assets/img/referenzen-montage/anlage19_M.jpg", label: "Technisch sauberes Rasterbild" },
  { src: "/assets/img/referenzen-montage/anlage20_M.jpg", label: "Fertige Anlage aus der ALAB Praxis" },
];

const QUALITY_CARDS = [
  {
    icon: Shield,
    title: "Befestigungs- und Drehmomentnachweis",
    bullets: [
      "Stichproben-Auszugsversuche der Dachbefestigung.",
      "Drehmoment-Protokolle für Klemmen und Schienen in digitaler Form.",
    ],
  },
  {
    icon: Layers,
    title: "Dachhautschutz und Notabdichtung",
    bullets: [
      "Abdeckmatten, Kantenschutz und sensible Bearbeitung der Dachfläche.",
      "Regen-Notplan mit temporären Abdichtungen für kritische Bauphasen.",
    ],
  },
  {
    icon: Cable,
    title: "Kabelwege und Kennzeichnung",
    bullets: [
      "Klare Trennung im Kabelkanal und brandlastarme Wege mit Beschilderung.",
      "Durchdringungen und Schnittstellen sauber dokumentiert.",
    ],
  },
  {
    icon: Truck,
    title: "Kran, Logistik und Sperrbereiche",
    bullets: [
      "Kran- und Hebekonzepte mit klaren Sperrzonen und sauberer Baustellenlogik.",
      "Anwohnerinformation und strukturierte Materialflüsse für ruhige Bauabläufe.",
    ],
  },
  {
    icon: Wrench,
    title: "Demontage und Wiederaufbau",
    bullets: [
      "Rückbau bestehender Anlagen mit geordneter Erfassung der Komponenten.",
      "Neuaufbau demontierter oder komplett neuer Systeme am passenden Standort.",
    ],
  },
  {
    icon: Camera,
    title: "As-Built-Dokumentation und Recycling",
    bullets: [
      "Fotoreport, Messwerte und relevante Unterlagen werden digital übergeben.",
      "Verpackungsrücknahme und fachgerechte Entsorgung mitgedacht.",
    ],
  },
];

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function MontageSection() {
  return (
    <>
      <HeroCardShowcase
        title="PV-MONTAGE MIT INGENIEURSTANDARD"
        description="Klar strukturiert, hochwertig verbaut und mit sauberer Dokumentation – so montieren wir Photovoltaikanlagen."
        heroImage="/img/men%C3%BC/montage.jpeg"
        heroImageAlt="Montage einer Photovoltaikanlage"
        cards={MT_CARDS}
      />
      <MTBenefits />
      <MTProcess />
      <MTReferenzen />
      <MTQuality />
      <MTCta />
    </>
  );
}

const MT_CARDS = [
  {
    title: "Unterkonstruktion & Dachschutz",
    subtitle: "Komplett-Service aus einer Hand",
    text: "Belastbar geplant, sauber gesetzt und auf Dichtigkeit, Lastverteilung und Langlebigkeit ausgelegt.",
    image: "/assets/img/referenzen-montage/anlage1_M.jpg",
  },
  {
    title: "Strukturierte Kabelwege",
    subtitle: "Normgerechte Ausführung",
    text: "Trennung, Beschriftung und Führung bleiben übersichtlich, wartbar und technisch nachvollziehbar.",
    image: "/assets/img/referenzen-montage/anlage3_M.jpg",
  },
  {
    title: "Nachweise & Dokumentation",
    subtitle: "Klare Dokumentation",
    text: "Messwerte, Fotoreport und As-Built-Unterlagen machen die Qualität auch nach Projektende sichtbar.",
    image: "/assets/img/referenzen-montage/anlage1_M.jpg",
  },
];

/* ═══════════════════════════════════════════════
   BENEFITS — Leistungsbild
   ═══════════════════════════════════════════════ */
function MTBenefits() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f5f2] px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16 max-w-[680px]">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
            Leistungsbild
          </p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Was unsere PV-Montage auszeichnet.
          </h2>
          <p className="mt-5 text-[1rem] leading-[1.85] text-muted">
            Von der Unterkonstruktion bis zur Fotodokumentation: Jeder Schritt
            folgt einem klaren Ablauf und bleibt nachvollziehbar.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group relative rounded-[24px] bg-white p-8 shadow-[0_4px_24px_rgba(14,38,55,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(14,38,55,0.12)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {/* Top accent line */}
                <div className="mb-6 h-[3px] w-10 rounded-full bg-accent" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                </div>
                <h3 className="mb-3 text-[1.05rem] font-bold text-ink">{b.title}</h3>
                <p className="text-[0.9rem] leading-[1.75] text-muted">{b.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS — Montageablauf
   ═══════════════════════════════════════════════ */
function MTProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="montage-ablauf"
      ref={ref}
      className="bg-white px-6 py-24 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
            Montageablauf
          </p>
          <h2 className="mx-auto max-w-[720px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            So führen wir Montageprojekte strukturiert aus.
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[1rem] leading-[1.85] text-muted">
            Vom Dachaufbau bis zur Übergabe: Vier klar definierte Phasen
            für ein sauberes, dokumentiertes Ergebnis.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="absolute left-[39px] top-0 hidden h-full w-px bg-gradient-to-b from-[#2f6fb7]/30 via-[#2f6fb7]/10 to-transparent lg:block" />

          <div className="space-y-8 lg:space-y-10">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.number}
                className="flex gap-6 transition-all duration-600 lg:gap-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 150}ms`,
                  transitionDuration: "600ms",
                }}
              >
                {/* Number badge */}
                <div className="relative z-10 flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[20px] bg-ink shadow-[0_4px_20px_rgba(14,38,55,0.2)]">
                  <span className="text-[1.3rem] font-black text-accent">{step.number}</span>
                </div>

                {/* Card */}
                <div className="flex-1 rounded-[24px] border border-[rgba(17,43,60,0.06)] bg-[#f9fafb] p-7 shadow-[0_2px_16px_rgba(14,38,55,0.04)] transition-all hover:shadow-[0_8px_28px_rgba(14,38,55,0.08)] lg:p-9">
                  <p className="mb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
                    {step.kicker}
                  </p>
                  <h3 className="mb-3 text-[1.2rem] font-bold text-ink lg:text-[1.35rem]">
                    {step.title}
                  </h3>
                  <p className="mb-5 text-[0.95rem] leading-[1.8] text-muted">
                    {step.lead}
                  </p>
                  <ul className="space-y-2.5">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                        <span className="text-[0.88rem] leading-[1.65] text-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process CTA */}
        <div className="mt-14 text-center">
          <a
            href="#angebot"
            data-open-angebot="montage-ablauf-anfrage"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[#2f6fb7] px-8 py-4 text-[0.88rem] font-bold text-accent transition-all hover:bg-accent hover:text-white"
          >
            Mehr zur Montage anfragen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   REFERENZEN — Premium Showcase
   ═══════════════════════════════════════════════ */
function MTReferenzen() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Show 3 at a time on desktop */
  const perPage = 3;
  const maxPage = Math.ceil(REFERENZEN.length / perPage) - 1;

  const goTo = useCallback(
    (dir: number) =>
      setCurrent((c) => Math.max(0, Math.min(maxPage, c + dir))),
    [maxPage]
  );

  return (
    <section className="bg-ink px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[620px]">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
              Referenzen
            </p>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-white">
              Einblicke in die Montagepraxis.
            </h2>
            <p className="mt-5 text-[1rem] leading-[1.85] text-white/60">
              Projekte aus dem Bestand, die zeigen, wie wir arbeiten: technisch
              klar, hochwertig und deutlich näher an Ihrem Qualitätsanspruch.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => goTo(-1)}
              disabled={current === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/40 hover:bg-white/10 disabled:opacity-30"
              aria-label="Zurück"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goTo(1)}
              disabled={current === maxPage}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/40 hover:bg-white/10 disabled:opacity-30"
              aria-label="Weiter"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {/* Render in groups of 3 */}
            {Array.from({ length: maxPage + 1 }).map((_, pageIdx) => (
              <div
                key={pageIdx}
                className="grid w-full shrink-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {REFERENZEN.slice(pageIdx * perPage, pageIdx * perPage + perPage).map(
                  (ref) => (
                    <div
                      key={ref.src}
                      className="group overflow-hidden rounded-[26px] bg-ink shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={ref.src}
                          alt={ref.label}
                          className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-5 py-4">
                        <p className="text-[0.85rem] font-semibold text-white/80">
                          {ref.label}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-accent"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Seite ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   QUALITY — Qualität und Sicherheit
   ═══════════════════════════════════════════════ */
function MTQuality() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f5f2] px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
            Qualität und Sicherheit
          </p>
          <h2 className="mx-auto max-w-[720px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Montage, Nachweise und Zusatzleistungen auf einen Blick.
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[1rem] leading-[1.85] text-muted">
            Technisch seriös, sauber dokumentiert und prüfbar. Jeder Aspekt
            unserer Montage folgt klaren Standards.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {QUALITY_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-[22px] bg-white p-8 shadow-[0_4px_24px_rgba(14,38,55,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(14,38,55,0.1)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2f6fb7] to-[#2f6fb7]/40" />

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                </div>
                <h3 className="mb-4 text-[1.05rem] font-bold text-ink">
                  {card.title}
                </h3>
                <ul className="space-y-2.5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/60" strokeWidth={2} />
                      <span className="text-[0.88rem] leading-[1.65] text-muted">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA — Abschluss
   ═══════════════════════════════════════════════ */
function MTCta() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-ink px-8 py-20 shadow-[0_20px_60px_rgba(14,38,55,0.25)] md:px-16 lg:px-20">
        {/* Subtle glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-[250px] w-[250px] rounded-full bg-accent/8 blur-[60px]" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-[600px]">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
              Kontakt
            </p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-white">
              Bereit für ein technisch sauberes PV-Projekt?
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.8] text-white/60">
              Ob Planung, Montage oder Erweiterung: Wir begleiten Ihr Projekt
              von Anfang an mit System, Ordnung und Nachweisbarkeit.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#angebot"
              data-open-angebot="montage-final-kontakt"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[0.88rem] font-bold text-ink shadow-[0_4px_24px_rgba(231,190,34,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(231,190,34,0.4)]"
            >
              Kontakt aufnehmen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+4982617597176"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-[0.88rem] font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              <Phone className="h-4 w-4" />
              08261 7597176
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
