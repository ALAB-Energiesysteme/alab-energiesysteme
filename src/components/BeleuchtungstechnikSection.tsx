"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lightbulb,
  Gauge,
  Smartphone,
  Building2,
  TreePine,
  ArrowRight,
  Eye,
  Pencil,
  Wrench,
  MessageCircle,
  Box,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Data ── */

interface Service {
  icon: LucideIcon;
  text: string;
}

const SERVICES: Service[] = [
  { icon: Lightbulb, text: "Planung & Installation energieeffizienter LED-Beleuchtung" },
  { icon: Gauge, text: "Lichtberechnung & normgerechte Beleuchtungsplanung" },
  { icon: Smartphone, text: "Intelligente Lichtsteuerung & Sensorik (DALI, KNX)" },
  { icon: Building2, text: "Büro- & Verwaltungsgebäude-Beleuchtung" },
  { icon: TreePine, text: "Außenbeleuchtung, Parkplatz- & Wegebeleuchtung" },
];

interface Discipline {
  icon: LucideIcon;
  title: string;
  text: string;
}

const DISCIPLINES: Discipline[] = [
  {
    icon: Eye,
    title: "Inspiration & Beratung",
    text: "Wir analysieren Ihre Räumlichkeiten, Ihre Anforderungen und Ihren Stil. Gemeinsam entwickeln wir ein Lichtkonzept, das Architektur und Funktion verbindet.",
  },
  {
    icon: Pencil,
    title: "Engineering & Planung",
    text: "Von der normgerechten Lichtberechnung bis zur fotorealistischen Visualisierung – jeder Leuchtpunkt hat einen Grund, ästhetisch und technisch.",
  },
  {
    icon: Wrench,
    title: "Installation & Verbau",
    text: "Unsere eigenen Elektromeister setzen die Planung millimetergenau um. DIN VDE-konform, termingerecht, ohne Umwege über externe Gewerke.",
  },
];

interface Project {
  image: string;
  title: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    image: "/beleuchtung-villa.png",
    title: "Altbau-Villa mit stilvollen Wandleuchten",
    description: "Hochwertige Lichtplanung für ein historisches Gebäude – atmosphärische Wandleuchten und dezente Deckenbeleuchtung.",
  },
  {
    image: "/beleuchtung-buero.png",
    title: "Büroraum mit Human Centric Lighting",
    description: "Moderne Bürobeleuchtung mit tageslichtabhängiger Steuerung für maximale Konzentration und Wohlbefinden.",
  },
  {
    image: "/beleuchtung-restaurant.png",
    title: "Restaurant-Ausleuchtung mit Akzentleuchten",
    description: "Exklusive Beleuchtungsplanung für eine einladende Gastronomie-Atmosphäre mit skulpturalen Deckenleuchten.",
  },
];

interface ProcessStep {
  num: string;
  icon: LucideIcon;
  title: string;
  text: string;
}

const PROCESS: ProcessStep[] = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Erstgespräch",
    text: "Wir lernen Ihren Raum und Ihre Vorstellungen kennen. Ob Neubau, Sanierung oder Umgestaltung – wir klären Umfang, Budget und Zeitrahmen gemeinsam.",
  },
  {
    num: "02",
    icon: Box,
    title: "Entwurf & Simulation",
    text: "Sie erhalten fotorealistische 3D-Visualisierungen und normgerechte Lichtberechnungen. Jeder Leuchtpunkt hat einen Grund – ästhetisch und technisch.",
  },
  {
    num: "03",
    icon: Wrench,
    title: "Installation",
    text: "Unsere eigenen Elektromeister setzen die Planung millimetergenau um. DIN VDE-konform, termingerecht und ohne Umwege über externe Gewerke.",
  },
  {
    num: "04",
    icon: KeyRound,
    title: "Übergabe & Betreuung",
    text: "Einweisung in die Steuerung, E-Check-Dokumentation und langfristige Wartungsangebote. Wir bleiben dauerhaft Ihr Ansprechpartner.",
  },
];

const TECH_BADGES = [
  "ReluX Desktop · Dialux",
  "KNX · DALI",
  "DIN VDE 0100-559",
  "BIM-kompatibel",
  "E-Check zertifiziert",
];

/* ── Swipe-Slider for Projects ── */

function ProjectSlider() {
  const [idx, setIdx] = useState(0);
  const touchStart = useRef(0);

  function prev() {
    setIdx((i) => (i === 0 ? PROJECTS.length - 1 : i - 1));
  }
  function next() {
    setIdx((i) => (i === PROJECTS.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative">
      {/* Cards container */}
      <div
        className="overflow-hidden rounded-[var(--radius-card)]"
        onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = touchStart.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {PROJECTS.map((p) => (
            <div key={p.title} className="w-full flex-shrink-0">
              <div className="relative overflow-hidden rounded-[var(--radius-card)]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <h4 className="mb-2 text-xl font-bold text-white sm:text-2xl">
                    {p.title}
                  </h4>
                  <p className="max-w-lg text-sm leading-relaxed text-white/80">
                    {p.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5 text-ink" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:bg-white"
      >
        <ChevronRight className="h-5 w-5 text-ink" />
      </button>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-8 bg-accent" : "w-2.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function BeleuchtungstechnikSection() {
  return (
    <div id="beleuchtungstechnik" className="scroll-mt-24">
      {/* ─── HERO with video background ─── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-ink pt-20">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source src="/beleuchtung-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/40" />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
            Beleuchtungstechnik
          </div>
          <h2 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.15] text-white md:text-5xl lg:text-6xl">
            Wir konzipieren Licht, das{" "}
            <span className="text-accent">berührt</span>. Und installieren
            Technik, die funktioniert.
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Architektonische Lichtplanung und normgerechte Elektroinstallation –
            vollständig aus einer Hand. Ohne externe Gewerke. Von der ersten
            Skizze bis zum letzten Schalter.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#beleuchtung-beratung"
              className="group inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
            >
              Projekt anfragen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#beleuchtung-projekte"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-white/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/60 hover:bg-white/10"
            >
              Referenzen ansehen
            </a>
          </div>
        </div>
      </section>

      {/* ─── Intro Text ─── */}
      <section className="bg-[#f8fafb] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          {/* 2-column intro – quote left, info right */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Quote element */}
            <div className="relative rounded-[var(--radius-card)] border-l-4 border-accent bg-white p-8 shadow-[0_10px_40px_rgba(15,37,51,0.06)] md:p-10">
              <Quote className="mb-4 h-10 w-10 text-accent/20" strokeWidth={1.5} />
              <p className="text-lg font-medium leading-relaxed text-ink">
                Andere planen das Licht und delegieren den Verbau. Oder sie
                installieren Leitungen und überlassen das Design dem Zufall.
              </p>
              {/* Hero quote */}
              <p className="mt-6 border-t border-line pt-6 text-xl font-bold leading-snug text-accent md:text-2xl">
                Wir tun beides – weil brillante Planung ohne präzise Ausführung
                nur ein schönes Bild an der Wand bleibt.
              </p>
            </div>

            {/* Right: Company info with header */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
                Über ALAB Energiesysteme
              </h4>
              <p className="text-[0.95rem] leading-[1.75] text-muted">
                Als Ingenieurbüro und Elektrofachbetrieb für Energiesysteme vereinen
                wir architektonische Lichtkonzepte mit normgerechter Elektroinstallation.
                Von der ingenieurmäßigen Lichtplanung über den Schaltanlagenbau bis zur
                fertigen Installation – alles aus einer Hand, ohne Schnittstellenverluste.
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.75] text-muted">
                Wir arbeiten mit der gesamten Bandbreite an Herstellern. Kein
                Favoritenvertrag, kein Exklusiv-Deal: maximale Freiheit bei der
                Leuchtenauswahl, ein Ansprechpartner.
              </p>

              {/* Visual anchor – image */}
              <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.08)]">
                <img
                  src="/beleuchtung-restaurant.png"
                  alt="Fertig beleuchteter Raum – ALAB Energiesysteme"
                  className="h-[260px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Drei Disziplinen ─── */}
      <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
            Drei Disziplinen
          </div>
          <h3 className="mb-4 max-w-2xl text-3xl font-bold leading-tight text-ink md:text-4xl">
            Ein nahtloser Prozess.
          </h3>
          <p className="mb-12 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            Licht und Elektrotechnik sind bei uns keine getrennten Gewerke – sie
            verschmelzen zu einem Ergebnis, das ästhetisch überzeugt und
            technisch funktioniert.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {DISCIPLINES.map((d) => (
              <div
                key={d.title}
                className="group rounded-[var(--radius-card)] border border-line bg-[#f8fafb] p-8 shadow-[0_10px_40px_rgba(15,37,51,0.06)] transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <d.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h4 className="mb-3 text-lg font-bold text-ink">{d.title}</h4>
                <p className="text-sm leading-relaxed text-muted">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Leistungen Detail ─── */}
      <section className="bg-[#f8fafb] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
            Leistungsspektrum
          </div>
          <h3 className="mb-6 max-w-3xl text-3xl font-bold leading-tight text-ink md:text-4xl">
            Licht, das <span className="text-accent">effizient arbeitet</span>{" "}
            und Räume optimal ausleuchtet.
          </h3>
          <div className="mb-10 h-[3px] w-[60px] rounded-full bg-accent" />

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[0.95rem] leading-[1.75] text-muted">
                Ob Wohnzimmer, Küche oder Außenbereich – wir entwickeln
                durchdachte Beleuchtungskonzepte, die Energieeffizienz mit
                optimalem Sehkomfort verbinden. Dabei setzen wir auf modernste
                LED-Technik und intelligente Steuerungssysteme, die sich
                automatisch an die jeweiligen Anforderungen anpassen.
              </p>
              <p className="mt-6 text-[0.95rem] leading-[1.75] text-muted">
                Eine professionelle Beleuchtungsplanung spart nicht nur Energie,
                sondern steigert auch das Wohlbefinden und die Sicherheit in
                Ihrem Zuhause. Wir planen normgerecht nach DIN EN 12464 und
                sorgen für die optimale Ausleuchtung Ihrer Räumlichkeiten – von
                der ersten Beratung bis zur fertigen Installation.
              </p>
              <a
                href="#beleuchtung-beratung"
                className="group mt-8 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
              >
                Jetzt beraten lassen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line bg-white p-8 shadow-[0_10px_40px_rgba(15,37,51,0.06)] md:p-10">
              <ul className="space-y-5">
                {SERVICES.map((service) => (
                  <li key={service.text} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <service.icon
                        className="h-5 w-5 text-accent"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="pt-2 text-[0.95rem] font-medium leading-snug text-ink">
                      {service.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projekte / Referenzen ─── */}
      <section
        id="beleuchtung-projekte"
        className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
            Referenzen
          </div>
          <h3 className="mb-4 max-w-2xl text-3xl font-bold leading-tight text-ink md:text-4xl">
            Konzept trifft Realität.
          </h3>
          <p className="mb-12 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            Von der privaten Villa über das moderne Büro bis zur gehobenen
            Gastronomie – drei Projekte, die zeigen, was durchdachte
            Lichtplanung bewirken kann.
          </p>

          <ProjectSlider />
        </div>
      </section>

      {/* ─── Prozess: Ihr Weg zum fertigen Raum ─── */}
      <section className="bg-[#f8fafb] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
            Zusammenarbeit
          </div>
          <h3 className="mb-4 max-w-2xl text-3xl font-bold leading-tight text-ink md:text-4xl">
            Ihr Weg zum fertigen Raum.
          </h3>
          <p className="mb-14 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            Vier klar definierte Schritte – von der ersten Idee bis zur
            Übergabe. Ein Ansprechpartner begleitet Sie durchgängig.
          </p>

          {/* Progress connector line (desktop only) */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-[38px] z-0 hidden lg:block">
              <div className="mx-auto flex max-w-[calc(100%-80px)] items-center">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-1 items-center">
                    <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-accent/40 to-accent/20" />
                    <ChevronRight className="mx-[-6px] h-5 w-5 shrink-0 text-accent/40" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, idx) => (
                <div
                  key={p.num}
                  className="group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[0_4px_20px_rgba(15,37,51,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(15,37,51,0.12)]"
                >
                  {/* Large background number */}
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[120px] font-black leading-none text-accent/[0.04] transition-colors duration-300 group-hover:text-accent/[0.08]">
                    {p.num}
                  </span>

                  {/* Dot indicator */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-accent/10 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110" />
                      <span className="relative z-10 text-sm font-extrabold text-accent">
                        {p.num}
                      </span>
                    </div>
                    <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-accent/30 to-transparent lg:hidden" />
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_4px_16px_var(--color-accent-glow)]">
                    <p.icon
                      className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h4 className="mb-3 text-lg font-bold text-ink">{p.title}</h4>
                  <p className="text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Badges + CTA section removed */}
    </div>
  );
}
