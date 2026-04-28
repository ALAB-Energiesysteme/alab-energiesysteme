"use client";

import { useState, useEffect, useRef } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Camera,
  CheckCircle,
  Factory,
  Leaf,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import HeroCardShowcase from "@/components/HeroCardShowcase";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const HERO_PILLARS = [
  { label: "Service 01", title: "Montage & Inbetriebnahme", text: "Technisch sauber ausgeführt, nachvollziehbar dokumentiert und in klare Prozesse eingebettet." },
  { label: "Service 02", title: "Laufende Wartung & Monitoring", text: "Für hohe Verfügbarkeit, erkennbare Abweichungen und langfristig kontrollierten Anlagenbetrieb." },
  { label: "Service 03", title: "Prüfungen & Nachweise", text: "Mit Thermografie, Leistungscheck und sauberer Dokumentation für Betreiber und Versicherer." },
];

const CORE_SERVICES = [
  {
    icon: Wrench,
    eyebrow: "Montage",
    title: "Montage und Inbetriebnahme",
    copy: "Sorgfältig vorbereitet, fachgerecht verbaut und mit sauberer Übergabe in den Betrieb überführt.",
    bullets: [
      "Statik- und Layoutprüfung mit sauberer Vermessung.",
      "Montage von Unterkonstruktion und Modulen nach Herstellervorgaben.",
      "DC-Verkabelung inkl. String-Plan, Beschriftung und Messprotokoll.",
      "Übergabe der AC-Seite und Netzanbindung optional abgestimmt.",
      "Inbetriebnahme und strukturierte Schulung gemeinsam mit Ihnen.",
    ],
    cta: { label: "Zur Montage-Seite", href: "/montage" },
  },
  {
    icon: ShieldCheck,
    eyebrow: "Wartung",
    title: "Wartung für Betriebssicherheit und Werterhalt",
    copy: "Regelmäßig geplant, transparent priorisiert und auf den störungsarmen Betrieb Ihrer Anlage ausgerichtet.",
    bullets: [
      "Regelmäßige Sicht- und Funktionsprüfungen mit Checkliste.",
      "Thermografie und Kennlinienmessung bei Bedarf integriert.",
      "Reinigung, Nachziehen von Klemmen und geordnetes Kabelmanagement.",
      "Verschleiß, Bautausch und gezielte Fehlerbehebung.",
      "Ausführlicher Bericht mit Maßnahmen und Priorisierung.",
    ],
    cta: { label: "Zur Wartungs-Seite", href: "/wartung" },
  },
  {
    icon: BarChart3,
    eyebrow: "Monitoring",
    title: "Monitoring für Früherkennung und Verfügbarkeit",
    copy: "Laufende Datensicht, frühe Abweichungserkennung und belastbare Reportings für einen kontrollierten Anlagenbetrieb.",
    bullets: [
      "24/7-Überwachung von Erzeugung, Verbrauch und Speicher.",
      "Automatisierte Alarme bei Abweichungen per E-Mail oder SMS.",
      "Performance-Analysen, Degradations-Check und Benchmarks.",
      "Laufende Datenreports für Betriebsführung und Reporting.",
      "Frühzeitige Fehlererkennung für maximale Verfügbarkeit.",
    ],
    cta: { label: "Zum Monitoring", href: "/monitoring" },
  },
];

const EXTENDED_SERVICES = [
  {
    icon: Zap,
    badge: "Zertifiziert",
    eyebrow: "Netz- / Einsatzstrom-Check",
    title: "Absicherung für Netzersatz- und Einsatzstromszenarien",
    text: "Wir prüfen Umschaltung, Lastverhalten und dokumentieren die Ergebnisse so, dass Betreiber, Projektverantwortliche und Versicherer belastbare Nachweise erhalten.",
    bullets: [
      "Insel- und Umschalt-Test mit Lastprüfsteuerung und Probelauf.",
      "Dokumentation für Versicherung, Betreiberhandbuch und interne Freigaben.",
    ],
    ctaLabel: "Check anfragen",
  },
  {
    icon: BookOpen,
    badge: "Kompetenz",
    eyebrow: "Schulung & Übergabe",
    title: "Betreiberwissen und Übergabe mit klaren Zuständigkeiten",
    text: "Damit Monitoring, Alarmierung und Anlagenbetrieb sauber funktionieren, strukturieren wir die Übergabe nachvollziehbar und praxisnah für Ihr Team.",
    bullets: [
      "Einweisung für Hausmeister, Betreiberteam und Monitoring-Workflows.",
      "Alarm- und Gefahrenmeldeprozess mit klaren Verantwortlichkeiten.",
      "Hinweis auf fachgerechte Servicegrenzen und keine Eigenwartung.",
    ],
    ctaLabel: "Übergabe abstimmen",
  },
];

const RHYTHM_CARDS = [
  {
    icon: Factory,
    eyebrow: "Gewerbe > 30 kWp",
    badge: "2x jährlich",
    bullets: [
      "Sicht- und Funktionsprüfung für elektrische und mechanische Komponenten.",
      "Aktualisierung von Dokumentation, Protokollen und Wartungsstand.",
      "Zwischencheck nach Extremwetter oder relevanten Ereignissen.",
    ],
  },
  {
    icon: Building2,
    eyebrow: "Flachdach",
    badge: "Frühjahr & Herbst",
    bullets: [
      "Befestigungen prüfen, nachziehen und Lastverteilung kontrollieren.",
      "Entwässerung, Kies-Verschiebungen und Dachdetails mitprüfen.",
      "Kurz-Einweisung des Betreiberteams optional in den Termin integrieren.",
    ],
  },
  {
    icon: Leaf,
    eyebrow: "Freifläche / Industrie",
    badge: "laufend / saisonal",
    bullets: [
      "Vegetationsmanagement sowie Kontrolle von Zaun-, Tor- und Schutzbereichen.",
      "Stichproben-IR, Drohnen-Thermografie und Inspektionsrunden nach Bedarf.",
      "Fehlerbeseitigung und saisonale Serviceeinsätze geordnet planen.",
    ],
  },
];

const DIAGNOSTIC_CARDS = [
  {
    icon: Camera,
    badge: "Präzise Analyse",
    eyebrow: "Thermografie",
    title: "Thermografie für frühe Fehlererkennung",
    text: "Wir identifizieren thermische Auffälligkeiten, die auf Hotspots, Zell- oder Diodenfehler, Kontaktprobleme oder Verschattung hindeuten können.",
    bullets: [
      "Erkennung von Hotspots, Zell- und Diodenfehlern sowie Verschattungsproblemen.",
      "Bericht mit Befundliste, Dokumentation und Handlungsempfehlungen.",
    ],
  },
  {
    icon: Activity,
    badge: "IEC 61724",
    eyebrow: "Leistungscheck",
    title: "Leistungscheck mit normnaher Kennzahlenbewertung",
    text: "Wir vergleichen Betriebsdaten strukturiert mit den erwartbaren Leistungswerten und machen Ertragsverluste oder Anomalien nachvollziehbar sichtbar.",
    bullets: [
      "Kennzahlen nach IEC 61724 wie PR, Verfügbarkeit und Ausfallzeiten.",
      "Soll-Ist-Abgleich inklusive Witterungsnormalisierung und Einordnung.",
    ],
  },
];

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function ServicepaketeSection() {
  return (
    <>
      <HeroCardShowcase
        title="SOLARSERVICES AUS EINER HAND"
        description="Von Montage über Wartung bis zu Prüfungen – ALAB begleitet Ihre PV-Anlage strukturiert über den gesamten Lebenszyklus."
        heroImage="/img/men%C3%BC/servicepakete.jpeg"
        heroImageAlt="Service und Betreuung fuer Photovoltaikanlagen"
        cards={SP_CARDS}
      />
      <SPCoreServices />
      <SPExtended />
      <SPRhythm />
      <SPAdvisoryCta />
      <SPDiagnostics />
      <SPFinalCta />
    </>
  );
}

const SP_CARDS = [
  {
    title: "Montage & Inbetriebnahme",
    subtitle: "Technisch sauber ausgeführt",
    text: "Strukturierter Verbau, klare Kabelführung und vollständige Dokumentation – für eine Anlage, die von Anfang an zuverlässig läuft.",
    image: "/assets/img/referenzen-montage/anlage1_M.jpg",
    href: "/montage",
  },
  {
    title: "Laufende Wartung & Monitoring",
    subtitle: "Dauerhafter Betrieb, hohe Verfügbarkeit",
    text: "Für erkennbare Abweichungen, gezielte Maßnahmen und einen Anlagenbetrieb, der planbar bleibt.",
    image: "/assets/img/wartung/anlage1_W.jpeg",
    href: "/wartung",
  },
  {
    title: "Prüfungen & Nachweise",
    subtitle: "Sicherheit und Dokumentation",
    text: "Thermografie, Leistungscheck und belastbare Unterlagen für Betreiber, Versicherer und Behörden.",
    image: "/assets/img/monitoring/anlagenmonitoring1.png",
    href: "/monitoring",
  },
];

/* ═══════════════════════════════════════════════
   CORE SERVICES — 3 Kernleistungen
   ═══════════════════════════════════════════════ */
function SPCoreServices() {
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
      id="service-architektur"
      ref={ref}
      className="bg-[#f5f5f2] px-6 py-24 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16 max-w-[700px]">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
            Kernleistungen
          </p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Unsere drei zentralen Servicebereiche.
          </h2>
          <p className="mt-5 text-[1rem] leading-[1.85] text-muted">
            Drei Service-Säulen, die den laufenden Betrieb Ihrer Solaranlage
            technisch, organisatorisch und wirtschaftlich absichern.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {CORE_SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.eyebrow}
                className="group relative flex flex-col overflow-hidden rounded-[26px] bg-white p-9 shadow-[0_4px_28px_rgba(14,38,55,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(14,38,55,0.12)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2f6fb7] to-[#2f6fb7]/30" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/12">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.7} />
                </div>

                <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent">
                  {svc.eyebrow}
                </p>
                <h3 className="mb-3 text-[1.15rem] font-bold leading-snug text-ink">
                  {svc.title}
                </h3>
                <p className="mb-6 text-[0.92rem] leading-[1.8] text-muted">
                  {svc.copy}
                </p>

                <ul className="mb-8 flex-1 space-y-2.5">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent/60" strokeWidth={2} />
                      <span className="text-[0.85rem] leading-[1.6] text-muted">{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={svc.cta.href}
                  className="inline-flex items-center gap-2 self-start rounded-full border-2 border-[#112b3c]/15 px-6 py-3 text-[0.82rem] font-bold text-ink transition-all hover:border-[#2f6fb7] hover:text-accent"
                >
                  {svc.cta.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   EXTENDED SERVICES
   ═══════════════════════════════════════════════ */
function SPExtended() {
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
    <section ref={ref} className="bg-white px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
            Erweiterte Services
          </p>
          <h2 className="mx-auto max-w-[740px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Ergänzende Kompetenzmodule für sichere Betreiberprozesse.
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[1rem] leading-[1.85] text-muted">
            Keine Randthemen, sondern technisch wertvolle Erweiterungen für
            Übergabe, Absicherung und geordnete Betriebsfähigkeit.
          </p>
        </div>

        {/* Two cards side by side */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {EXTENDED_SERVICES.map((ext, i) => {
            const Icon = ext.icon;
            return (
              <div
                key={ext.eyebrow}
                className="relative overflow-hidden rounded-[26px] border border-[rgba(17,43,60,0.06)] bg-[#f9fafb] p-8 shadow-[0_4px_20px_rgba(14,38,55,0.04)] transition-all duration-500 hover:shadow-[0_10px_32px_rgba(14,38,55,0.09)] lg:p-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.7} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-accent/8 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-accent">
                        {ext.badge}
                      </span>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted">
                        {ext.eyebrow}
                      </p>
                    </div>
                    <h3 className="mb-3 text-[1.15rem] font-bold leading-snug text-ink">
                      {ext.title}
                    </h3>
                    <p className="mb-5 text-[0.92rem] leading-[1.8] text-muted">
                      {ext.text}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {ext.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent/50" strokeWidth={2} />
                          <span className="text-[0.85rem] leading-[1.6] text-muted">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#angebot"
                      data-open-angebot={`servicepakete-${ext.ctaLabel?.toLowerCase().replace(/\s+/g,"-") || "ext"}`}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-[#112b3c]/15 px-6 py-3 text-[0.82rem] font-bold text-ink transition-all hover:border-[#2f6fb7] hover:text-accent"
                    >
                      {ext.ctaLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
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
   RHYTHM — Wartungsrhythmus
   ═══════════════════════════════════════════════ */
function SPRhythm() {
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
        <div className="rounded-[30px] bg-white p-8 shadow-[0_6px_32px_rgba(14,38,55,0.06)] md:p-12 lg:p-16">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
              Wartungsrhythmus
            </p>
            <h2 className="mx-auto max-w-[720px] text-[clamp(1.7rem,3.2vw,2.4rem)] font-bold leading-[1.12] text-ink">
              Empfohlene Wartungsintervalle für unterschiedliche Anlagentypen.
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[0.95rem] leading-[1.85] text-muted">
              Als technischer Leitfaden gedacht: ruhig strukturiert, fachlich
              präzise und direkt auf die Anforderungen Ihrer Anlage ausgerichtet.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {RHYTHM_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.eyebrow}
                  className="relative overflow-hidden rounded-[22px] border border-[rgba(17,43,60,0.06)] bg-[#f9fafb] p-7 transition-all duration-500 hover:shadow-[0_8px_28px_rgba(14,38,55,0.08)]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
                      </div>
                      <p className="text-[0.95rem] font-bold text-ink">
                        {card.eyebrow}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-accent/15 px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#b8941a]">
                      {card.badge}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/50" strokeWidth={2} />
                        <span className="text-[0.85rem] leading-[1.65] text-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
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
   ADVISORY CTA
   ═══════════════════════════════════════════════ */
function SPAdvisoryCta() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-ink px-8 py-16 shadow-[0_16px_48px_rgba(14,38,55,0.25)] md:px-14 lg:px-20 lg:py-20">
        {/* Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-[260px] w-[260px] rounded-full bg-accent/12 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-[200px] w-[200px] rounded-full bg-accent/8 blur-[60px]" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-[580px]">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
              Beratung & Kontakt
            </p>
            <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-bold leading-[1.15] text-white">
              Lassen Sie Ihre Anlage fachlich bewerten und betreuen.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.8] text-white/60">
              Wir schauen auf Montagezustand, Betriebsdaten, Wartungsbedarf und
              prüfbare Nachweise, damit aus einzelnen Leistungen ein
              abgestimmtes Servicekonzept wird.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:+4982617597176"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[0.88rem] font-bold text-ink shadow-[0_4px_24px_rgba(231,190,34,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(231,190,34,0.4)]"
            >
              <Phone className="h-4 w-4" />
              Jetzt anrufen
            </a>
            <a
              href="#angebot"
              data-open-angebot="servicepakete-mid-cta-kontakt"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-[0.88rem] font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              Kontaktieren
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   DIAGNOSTICS — Prüfleistungen
   ═══════════════════════════════════════════════ */
function SPDiagnostics() {
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
        <div className="mb-14 max-w-[720px]">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
            Weitere Leistungen & Prüfungen
          </p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Analyse- und Prüfleistungen für{" "}
            <span className="text-accent">Performance</span>, Sicherheit und
            Nachweise.
          </h2>
          <p className="mt-5 text-[1rem] leading-[1.85] text-muted">
            Technisch präzise Leistungen, die Störungen sichtbar machen,
            Soll-Ist-Abweichungen bewerten und dokumentierbare
            Entscheidungsgrundlagen liefern.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {DIAGNOSTIC_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.eyebrow}
                className="relative overflow-hidden rounded-[26px] bg-white p-9 shadow-[0_4px_28px_rgba(14,38,55,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(14,38,55,0.1)] lg:p-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2f6fb7] to-[#2f6fb7]/30" />

                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/12">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
                  </div>
                  <span className="rounded-full bg-accent/8 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-accent">
                    {card.badge}
                  </span>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted">
                    {card.eyebrow}
                  </p>
                </div>

                <h3 className="mb-3 text-[1.2rem] font-bold leading-snug text-ink">
                  {card.title}
                </h3>
                <p className="mb-5 text-[0.92rem] leading-[1.8] text-muted">
                  {card.text}
                </p>

                <ul className="mb-7 space-y-2.5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent/50" strokeWidth={2} />
                      <span className="text-[0.85rem] leading-[1.6] text-muted">{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#angebot"
                  data-open-angebot={`servicepakete-card-${card.title?.toLowerCase().replace(/\s+/g,"-") || "card"}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#112b3c]/15 px-6 py-3 text-[0.82rem] font-bold text-ink transition-all hover:border-[#2f6fb7] hover:text-accent"
                >
                  Mehr erfahren
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════ */
function SPFinalCta() {
  return (
    <section className="bg-ink px-6 py-24 md:py-32 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-ink/90 px-8 py-16 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:px-14 lg:px-20 lg:py-20">
        {/* Glow effects */}
        <div className="pointer-events-none absolute -right-20 top-0 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-[200px] w-[200px] rounded-full bg-accent/6 blur-[80px]" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-[620px]">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
              Abschluss
            </p>
            <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-bold leading-[1.15] text-white">
              Lassen Sie Montage, Wartung, Monitoring und Prüfungen strukturiert
              aus einer Hand betreuen.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.8] text-white/55">
              ALAB verbindet Ausführung, Betriebsbegleitung und Nachweise zu
              einem professionellen Serviceauftritt mit klaren Ansprechpartnern
              und nachvollziehbaren Prozessen.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#angebot"
              data-open-angebot="servicepakete-final-service-anfragen"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[0.88rem] font-bold text-ink shadow-[0_4px_24px_rgba(231,190,34,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(231,190,34,0.35)]"
            >
              Service anfragen
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
