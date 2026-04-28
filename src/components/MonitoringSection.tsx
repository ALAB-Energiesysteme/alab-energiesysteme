"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code,
  Cpu,
  FileText,
  Lock,
  Monitor,
  Phone,
  Server,
  Shield,
  SunMedium,
  Zap,
} from "lucide-react";
import HeroCardShowcase from "@/components/HeroCardShowcase";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const PLATFORMS = [
  "SMA Energy / Sunny Portal",
  "Fronius Solar.web",
  "Sungrow iSolarCloud",
  "Huawei FusionSolar",
  "SolarEdge Monitoring",
];

const HERO_BADGES = [
  "24/7 Überwachung",
  "SLA-Ticketing",
  "Monatsreport inkl. KPIs",
];

const FUNCTIONS = [
  {
    img: "/assets/img/monitoring/anlagenmonitoring1.png",
    icon: BarChart3,
    title: "Live-Daten & Prognosen",
    text: "Produktion, Verbrauch, Autarkie inkl. Wetter-Forecast.",
    features: ["Echtzeitüberwachung", "Wetterbasierte Prognosen", "Historische Vergleiche"],
  },
  {
    img: "/assets/img/monitoring/anlagenmonitoring2.png",
    icon: Bell,
    title: "Alarmierung & Ticketing",
    text: "Automatische Weitergabe, SLAs & Ereignis-Historie.",
    features: ["Multi-Channel Alerts", "SLA-Tracking", "Eskalationsmatrix"],
  },
  {
    img: "/assets/img/monitoring/anlagenmonitoring3.png",
    icon: SunMedium,
    title: "Modul-/Stringanalyse*",
    text: "*Wenn Portal/Hardware es unterstützt (z. B. SolarEdge).",
    features: ["String-Level Monitoring", "Defekt-Erkennung", "Performance-Analyse"],
  },
  {
    img: "/assets/img/monitoring/anlagenmonitoring4.png",
    icon: FileText,
    title: "Reports & KPIs",
    text: "Monatliche Reports inkl. PR, Verfügbarkeit & Top/Low-Performer.",
    features: ["PDF/CSV Export", "Automatische Reports", "Benchmark-Analysen"],
  },
  {
    img: "/assets/img/monitoring/anlagenmonitoring5.png",
    icon: Monitor,
    title: "Flotten-Monitoring",
    text: "Portfolio-Ansicht, Filter nach Standort, Gerät, Status.",
    features: ["Zentrale Übersicht", "Multi-Site Management", "Vergleichsanalysen"],
  },
  {
    img: "/assets/img/monitoring/anlagenmonitoring6.png",
    icon: Zap,
    title: "Sektoren-Integration",
    text: "Speicher, Wallbox, Wärmepumpe – einheitliche Ansicht.",
    features: ["Ganzheitliche Ansicht", "Sektorenkopplung", "Optimierung"],
  },
];

const DATAFLOW_STEPS = [
  { icon: Cpu, title: "Sensorik / Zähler", sub: "(WR, Meter, Strings)" },
  { icon: Cloud, title: "Gateway/Portal", sub: "(z. B. iSolarCloud)" },
  { icon: Server, title: "Datenverarbeitung", sub: "Validierung/Alarme" },
  { icon: Monitor, title: "Dashboard & Apps", sub: "Reports/Insights" },
  { icon: Code, title: "Schnittstellen", sub: "(API/CSV)" },
];

const DATAFLOW_SUB = [
  { icon: AlertTriangle, title: "Alarmmatrix", sub: "E-Mail/SMS/WA" },
  { icon: FileText, title: "Ticketing", sub: "SLA/Eskalation" },
  { icon: BarChart3, title: "Reporting", sub: "Monat/Quartal" },
];

const CASES = [
  {
    img: "/assets/img/monitoring/anlagenmonitoring7.png",
    title: "Handelsfläche · 99 kWp",
    problem: "Unterleistung eines Strings.",
    solution: "String-Analyse & Thermografie – defekte Steckverbindung.",
    result: "+8 % Ertrag im Folgemonat.",
    footer: "SLA: Reaktion < 4 h, Entstörung 24 h",
  },
  {
    img: "/assets/img/monitoring/anlagenmonitoring8.png",
    title: "Produktion · 500 kWp",
    problem: "Lastspitzen & Blindleistungskosten.",
    solution: "Alarmregeln + Speicherführung (Peak-Shaving).",
    result: "-18 % Lastspitzen.",
    footer: "Report mit PR, cos \u03C6 & THD",
  },
  {
    img: "/assets/img/monitoring/anlagenmonitoring9.png",
    title: "Logistik · 1 MWp",
    problem: "WR-Abregelungen bei Einstrahlungsspitzen.",
    solution: "Parameter-Tuning & Temperatur-Monitoring.",
    result: "+3–5 % Jahresertrag (modelliert).",
    footer: "Ticketing & Eskalationsmatrix",
  },
];

const PACKAGES = [
  {
    label: "Einstieg",
    name: "Monitoring BASIC",
    features: [
      "Portal-Onboarding",
      "Alarmierung per E-Mail",
      "Monatsreport (Kern-KPIs)",
    ],
    featured: false,
  },
  {
    label: "Beliebt",
    name: "Monitoring PLUS",
    features: [
      "Alarmmatrix (E-Mail/SMS/WA*)",
      "Ticketing & SLA-Eskalation",
      "Monatsreport inkl. PR & Verfügbarkeit",
    ],
    note: "*WhatsApp via Integration",
    featured: true,
  },
  {
    label: "Pro",
    name: "Monitoring PRO",
    features: [
      "Flotten-Monitoring & Dashboards",
      "Modul-/Stringanalyse* (falls verfügbar)",
      "Quartals-Review & Optimierung",
    ],
    featured: false,
  },
];

const INTEGRATIONS = [
  {
    title: "Plattformen",
    chips: ["SMA Energy / Sunny Portal", "Fronius Solar.web", "Sungrow iSolarCloud", "Huawei FusionSolar", "SolarEdge Monitoring"],
  },
  {
    title: "Protokolle & Exporte",
    chips: ["Modbus/TCP", "SunSpec", "CSV/Excel Export", "API (portalabhängig)", "Webhook (Make/Zapier)"],
  },
];

const SECURITY_ITEMS = [
  { icon: Shield, text: "Rollen & Rechte (Least Privilege) im Portal" },
  { icon: Lock, text: "2-Faktor-Authentifizierung (wenn unterstützt)" },
  { icon: Server, text: "Datenhaltung gemäß Portal-Spezifikation" },
  { icon: FileText, text: "Auftragsverarbeitung nach DSGVO – projektabhängig" },
];

const FAQ_ITEMS = [
  { q: "Welche Systeme unterstützt ihr?", a: "SMA, Fronius, Sungrow, Huawei, SolarEdge. Tiefe der Funktionen variiert je Portal/Hardware." },
  { q: "Ist Modul-Monitoring immer möglich?", a: "Nur wenn die Komponenten das liefern (z. B. SolarEdge) – sonst String/WR-Ebene." },
  { q: "Gibt es SLAs?", a: "Ja – Reaktions- und Entstörzeiten werden projektspezifisch vereinbart (z. B. < 4 h werktags)." },
  { q: "Reports als PDF/CSV?", a: "Ja – je nach Portal automatisierbar; Rohdaten via CSV/API." },
];

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function MonitoringSection() {
  return (
    <>
      <HeroCardShowcase
        title="ANLAGENMONITORING"
        description="Proaktiv, messbar, sicher – Live-Daten zu Produktion und Autarkie, intelligente Alarme und belastbare KPI-Reports."
        heroImage="/img/men%C3%BC/monitoring.jpeg"
        heroImageAlt="Monitoring und Analyse einer Photovoltaikanlage"
        cards={MO_CARDS}
      />
      <MOFunctions />
      <MODataflow />
      <MOCases />
      <MOPackages />
      <MOIntegrations />
      <MOFaq />
      <MOCta />
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
const MO_CARDS = [
  {
    title: "Live-Daten & Prognosen",
    subtitle: "24/7 Überwachung",
    text: "Produktion, Verbrauch und Autarkie in Echtzeit – inklusive wetterbasierter Ertragsprognosen und historischer Vergleichsanalysen.",
    image: "/assets/img/monitoring/anlagenmonitoring1.png",
  },
  {
    title: "Alarmierung & Ticketing",
    subtitle: "SLA-Ticketing & Eskalationsmatrix",
    text: "Automatische Multi-Channel-Alarme, strukturiertes SLA-Tracking und eine vollständige Ereignis-Historie für schnelle Reaktionszeiten.",
    image: "/assets/img/monitoring/anlagenmonitoring2.png",
  },
  {
    title: "Reports & KPIs",
    subtitle: "Monatsreport inkl. KPIs",
    text: "Monatliche Reports mit PR, Verfügbarkeit und Top/Low-Performer – als PDF/CSV-Export für Betriebsführung und Dokumentation.",
    image: "/assets/img/monitoring/anlagenmonitoring4.png",
  },
];

/* ═══════════════════════════════════════════════
   FUNCTIONS — Swipe Gallery
   ═══════════════════════════════════════════════ */
function MOFunctions() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const maxPage = Math.ceil(FUNCTIONS.length / perPage) - 1;

  const goTo = useCallback(
    (dir: number) => setCurrent((c) => Math.max(0, Math.min(maxPage, c + dir))),
    [maxPage]
  );

  return (
    <section className="bg-[#f4f6f8] px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[680px]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Funktionen
            </p>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
              Alles Relevante kompakt: Daten, Alarme, Analyse, Reporting, Flotte & Sektoren.
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => goTo(-1)} disabled={current === 0} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30" aria-label="Zurück">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => goTo(1)} disabled={current === maxPage} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30" aria-label="Weiter">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {Array.from({ length: maxPage + 1 }).map((_, pageIdx) => (
              <div key={pageIdx} className="grid w-full shrink-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {FUNCTIONS.slice(pageIdx * perPage, pageIdx * perPage + perPage).map((fn) => {
                  const Icon = fn.icon;
                  return (
                    <div key={fn.title} className="group overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_10px_40px_rgba(15,37,51,0.12)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,37,51,0.18)]">
                      <div className="relative h-[220px] overflow-hidden">
                        <img src={fn.img} alt={fn.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-accent" strokeWidth={2} />
                            <h3 className="text-[1rem] font-bold text-white">{fn.title}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="mb-4 text-[0.9rem] leading-[1.7] text-muted">{fn.text}</p>
                        <div className="space-y-1.5">
                          {fn.features.map((f) => (
                            <div key={f} className="flex items-center gap-2">
                              <CheckCircle className="h-3.5 w-3.5 text-accent/60" strokeWidth={2} />
                              <span className="text-[0.82rem] text-muted">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-accent" : "w-2.5 bg-ink/15 hover:bg-ink/30"}`} aria-label={`Seite ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   DATAFLOW
   ═══════════════════════════════════════════════ */
function MODataflow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-ink px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Datenfluss & Architektur
          </p>
          <h2 className="mx-auto max-w-[780px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-white">
            Vom Sensor zur Entscheidung: Validierung, Alarmmatrix, Ticketing & Reporting.
          </h2>
        </div>

        {/* Main flow */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DATAFLOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                </div>
                <h4 className="text-[0.85rem] font-bold text-white">{step.title}</h4>
                <p className="mt-1 text-[0.75rem] text-white/50">{step.sub}</p>
                {i < DATAFLOW_STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-accent/40 lg:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Sub flow */}
        <div className="mx-auto grid max-w-[700px] grid-cols-3 gap-4">
          {DATAFLOW_SUB.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[var(--radius-card)] border border-accent/20 bg-accent/5 p-4 text-center transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${(i + 5) * 100}ms`,
                }}
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-accent" strokeWidth={1.8} />
                <h4 className="text-[0.8rem] font-bold text-white">{item.title}</h4>
                <p className="mt-0.5 text-[0.7rem] text-white/50">{item.sub}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[0.8rem] text-white/40">
          Beispielhafte Darstellung – genaue Umsetzung portal-/herstellerabhängig.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CASES — Praxis
   ═══════════════════════════════════════════════ */
function MOCases() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#f4f6f8] px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-[680px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Praxis-Cases
          </p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Konkrete Beispiele aus Handel, Produktion und Logistik.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <div
              key={c.title}
              className="group overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_10px_40px_rgba(15,37,51,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,37,51,0.18)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="relative h-[200px] overflow-hidden">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <h3 className="absolute bottom-4 left-5 text-[1.05rem] font-bold text-white">{c.title}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div><span className="text-[0.75rem] font-bold uppercase tracking-wider text-accent">Problem:</span><p className="mt-0.5 text-[0.88rem] text-muted">{c.problem}</p></div>
                  <div><span className="text-[0.75rem] font-bold uppercase tracking-wider text-accent">Lösung:</span><p className="mt-0.5 text-[0.88rem] text-muted">{c.solution}</p></div>
                  <div><span className="text-[0.75rem] font-bold uppercase tracking-wider text-accent">Ergebnis:</span><p className="mt-0.5 text-[0.88rem] font-semibold text-ink">{c.result}</p></div>
                </div>
                <div className="mt-4 rounded-xl bg-accent/8 px-4 py-2.5 text-[0.78rem] font-semibold text-accent">
                  {c.footer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PACKAGES
   ═══════════════════════════════════════════════ */
function MOPackages() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Pakete & Leistungen
          </p>
          <h2 className="mx-auto max-w-[680px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Vom Einstieg bis Pro: skalierbar nach Bedarf & SLA.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`relative overflow-hidden rounded-[var(--radius-card)] border p-8 transition-all duration-500 hover:-translate-y-1 ${
                pkg.featured
                  ? "border-accent bg-ink shadow-[0_20px_60px_rgba(15,37,51,0.2)]"
                  : "border-ink/8 bg-[#f9fafb] shadow-[0_4px_24px_rgba(15,37,51,0.06)] hover:shadow-[0_12px_36px_rgba(15,37,51,0.12)]"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {pkg.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white">
                  Beliebt
                </span>
              )}

              <span className={`text-[0.68rem] font-bold uppercase tracking-[0.18em] ${pkg.featured ? "text-accent" : "text-accent"}`}>
                {pkg.label}
              </span>
              <h3 className={`mt-2 text-[1.4rem] font-bold ${pkg.featured ? "text-white" : "text-ink"}`}>
                {pkg.name}
              </h3>
              <p className={`mt-2 text-[0.95rem] font-semibold ${pkg.featured ? "text-white/70" : "text-muted"}`}>
                auf Anfrage
              </p>

              <ul className="mt-6 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.featured ? "text-accent" : "text-accent/60"}`} strokeWidth={2} />
                    <span className={`text-[0.88rem] leading-[1.5] ${pkg.featured ? "text-white/80" : "text-muted"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              {pkg.note && (
                <p className={`mt-3 text-[0.75rem] ${pkg.featured ? "text-white/40" : "text-muted/60"}`}>{pkg.note}</p>
              )}

              <a
                href="#angebot"
                data-open-angebot={`monitoring-paket-${pkg.name || "standard"}`}
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] px-6 py-3.5 text-[0.88rem] font-bold transition-all hover:-translate-y-0.5 ${
                  pkg.featured
                    ? "bg-accent text-white shadow-[0_4px_12px_var(--color-accent-glow)] hover:bg-accent-deep"
                    : "border-2 border-ink/15 text-ink hover:border-accent hover:text-accent"
                }`}
              >
                Anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   INTEGRATIONS & SECURITY
   ═══════════════════════════════════════════════ */
function MOIntegrations() {
  return (
    <section className="bg-[#f4f6f8] px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Integrationen & Sicherheit
          </p>
          <h2 className="mx-auto max-w-[720px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Plattformen, Protokolle & DSGVO-konforme Umsetzung.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {/* Platform & protocol groups */}
          {INTEGRATIONS.map((group) => (
            <div key={group.title} className="rounded-[var(--radius-card)] bg-white p-7 shadow-[0_10px_40px_rgba(15,37,51,0.08)]">
              <h3 className="mb-5 text-[1.05rem] font-bold text-ink">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-ink/8 bg-[#f4f6f8] px-4 py-2 text-[0.78rem] font-semibold text-muted">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Security */}
          <div className="rounded-[var(--radius-card)] bg-white p-7 shadow-[0_10px_40px_rgba(15,37,51,0.08)]">
            <h3 className="mb-5 text-[1.05rem] font-bold text-ink">Security & Compliance</h3>
            <div className="space-y-3">
              {SECURITY_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} />
                    <span className="text-[0.85rem] leading-[1.6] text-muted">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════ */
function MOFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq-section" className="bg-white px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[800px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            FAQ
          </p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-ink">
            Schnell geklärt – die häufigsten Fragen.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={item.q}
              className="overflow-hidden rounded-[var(--radius-card)] border border-ink/8 bg-[#f9fafb] transition-all"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <h3 className="text-[1rem] font-bold text-ink">{item.q}</h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-accent transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className="grid transition-all duration-300"
                style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[0.92rem] leading-[1.75] text-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════ */
function MOCta() {
  return (
    <section className="bg-[#f4f6f8] px-6 py-24 md:py-32 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[var(--radius-card)] bg-ink px-8 py-16 shadow-[0_20px_60px_rgba(15,37,51,0.25)] md:px-14 lg:px-20 lg:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[80px]" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-[600px]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Kontakt
            </p>
            <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-bold leading-[1.15] text-white">
              Bereit für proaktives Anlagenmonitoring?
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.8] text-white/60">
              Von Live-Daten über intelligente Alarme bis zu strukturierten
              Reports – wir betreuen Ihre PV-Anlage mit System.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#angebot"
              data-open-angebot="monitoring-final-cta"
              className="group inline-flex items-center gap-2.5 rounded-[var(--radius-btn)] bg-accent px-8 py-4 text-[0.88rem] font-bold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
            >
              Monitoring anfragen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+4982617597176"
              className="inline-flex items-center gap-2.5 rounded-[var(--radius-btn)] border border-white/20 px-8 py-4 text-[0.88rem] font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
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
