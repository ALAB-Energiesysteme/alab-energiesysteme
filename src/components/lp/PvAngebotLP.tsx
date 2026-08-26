"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  FileCheck2,
  Home,
  Layers,
  Phone,
  Send,
  ShieldCheck,
  Timer,
  TrendingDown,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import PrivateKomponentenSection from "@/components/private/PrivateKomponentenSection";
import { trackFormSubmit } from "@/lib/tracking";

/* ════════════════════════════════════════════════════════════
   PV-Leadgen-Landingpage  /pv-angebot
   Ein Ziel: qualifizierte Anfragen für ein kostenloses PV-Angebot.
   /pv-zuhause bleibt unverändert.
   ════════════════════════════════════════════════════════════ */

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
const PHONE = "+498261759717";
const PHONE_DISPLAY = "08261 7597176";
const CALC_STORE_KEY = "pv-angebot-calc";

/* ─── dataLayer-Helper für GTM-Conversion-Tracking ─── */
function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: object[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

function trackPhoneClick(position: string) {
  pushEvent("phone_click", { position });
}

function scrollToFunnel() {
  document
    .getElementById("funnel")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ════════════════════════════════════════════════════════════ */
export default function PvAngebotLP() {
  return (
    <div className="bg-white font-[family-name:var(--font-sans)] text-ink">
      <LPHeader />
      <StickyHeader />
      <main id="top">
        <Hero />
        <LeadCalculator />
        <ProblemLoesung />
        <SoGehts />
        <WarumAlab />
        <PrivateKomponentenSection />
        <Referenzen />
        <Faq />
        <LeadFunnel />
        <Schluss />
      </main>
      <MiniFooter />
      <MobileStickyBar />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HEADER (im Flow) – Logo, Telefon, ein CTA. Keine Navigation.
   ════════════════════════════════════════════════════════════ */
function LPHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <a href="#top" className="block shrink-0" aria-label="Zum Seitenanfang">
          <img
            src="/img/logo-alab.png"
            alt="ALAB Energiesysteme"
            className="h-12 w-auto sm:h-14"
          />
        </a>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE}`}
            onClick={() => trackPhoneClick("header")}
            className="hidden items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-accent md:inline-flex"
          >
            <Phone className="h-4 w-4 text-accent" />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={scrollToFunnel}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-light sm:px-6"
          >
            Kostenloses Angebot
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─── Sticky-Header: blendet nach 600 px Scroll ein (Desktop) ─── */
function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY > 600);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-[4000] hidden border-b border-line bg-white/95 shadow-[0_2px_14px_-4px_rgba(15,37,51,0.12)] backdrop-blur-xl transition-transform duration-300 sm:block ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2.5 lg:px-8">
        <img
          src="/img/logo-alab.png"
          alt=""
          className="h-10 w-auto"
        />
        <div className="flex items-center gap-4">
          <a
            href={`tel:${PHONE}`}
            onClick={() => trackPhoneClick("sticky_header")}
            className="inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-accent"
          >
            <Phone className="h-4 w-4 text-accent" />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={scrollToFunnel}
            className="inline-flex min-h-[44px] items-center rounded-full bg-ink px-6 py-2 text-sm font-bold text-white transition-all hover:bg-ink-light"
          >
            Angebot anfordern
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   1 · HERO – Above the Fold
   ════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="bg-white px-5 pb-12 pt-8 sm:pt-12 lg:px-8">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <h1 className="mb-4 text-[clamp(1.9rem,4.5vw,3.1rem)] font-bold leading-[1.12] tracking-[-0.015em] text-ink">
            Bis zu 80 % Stromkosten sparen – mit Ihrer eigenen PV-Anlage vom
            Ingenieurbüro &amp; Elektrofachbetrieb aus Mindelheim
          </h1>
          <p className="mb-7 max-w-[560px] text-[1.02rem] leading-[1.7] text-muted">
            Schlüsselfertig zum Festpreis. Planung, Installation und Service aus
            einer Hand – von Ingenieuren und Elektrikern, nicht von
            Vertrieblern.
          </p>

          <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollToFunnel}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[1rem] font-bold text-white shadow-[0_8px_24px_-8px_rgba(15,37,51,0.45)] transition-all hover:-translate-y-0.5 hover:bg-ink-light sm:w-auto"
            >
              Kostenloses PV-Angebot sichern
            </button>
          </div>
          <a
            href="#rechner"
            className="inline-block text-[0.9rem] font-semibold text-accent underline underline-offset-4 hover:text-accent-deep"
          >
            In 60 Sekunden Ersparnis berechnen ↓
          </a>

          {/* Trust-Leiste */}
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-6 sm:grid-cols-4">
            {[
              { icon: Building2, label: "Ingenieurbüro & Elektrofachbetrieb" },
              { icon: Banknote, label: "Festpreisgarantie" },
              { icon: Timer, label: "Reaktionszeit < 48 h" },
              { icon: Home, label: "Region Allgäu, Schwaben & München" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-start gap-2 text-[0.78rem] font-semibold leading-snug text-ink"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Echtes Referenzfoto */}
        <div className="relative h-[300px] overflow-hidden rounded-[20px] shadow-[0_18px_50px_-18px_rgba(15,37,51,0.35)] sm:h-[400px] lg:h-[460px]">
          <Image
            src="/assets/img/referenzen-privat/anlage1_P.avif"
            alt="Von ALAB installierte Photovoltaikanlage auf einem Einfamilienhaus in der Region"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   2 · SOLARRECHNER als Lead-Magnet
   Teilergebnis sofort, Vollergebnis nach Kontaktdaten.
   ════════════════════════════════════════════════════════════ */

/* Berechnungskonstanten – identisch zur Hauptseite */
const MODULE_KWP = 0.455;
const KWH_PER_KWP = 1050;
const FEED_IN_EUR = 0.082;
const INVEST_PER_KWP = 1100;
const STROMPREIS = 0.35;

function calcResults(stromkosten: number, flaeche: number, speicher: boolean) {
  const module = Math.max(1, Math.min(200, Math.floor(flaeche / 2)));
  const kWp = module * MODULE_KWP;
  const erzeugung = kWp * KWH_PER_KWP;
  const jahresverbrauch = (stromkosten * 12) / STROMPREIS;
  const svQuote = speicher ? 0.7 : 0.4;
  const selbstverbrauch = Math.min(erzeugung * svQuote, jahresverbrauch);
  const ueberschuss = Math.max(0, erzeugung - selbstverbrauch);
  const ersparnis = selbstverbrauch * STROMPREIS;
  const einspeisung = ueberschuss * FEED_IN_EUR;
  const cashflow = ersparnis + einspeisung;
  const invest = kWp * INVEST_PER_KWP;
  const amort = cashflow > 0 ? invest / cashflow : Infinity;
  const monatsgewinn = (cashflow * 30 - invest) / 360;
  return { module, kWp, erzeugung, cashflow, amort, monatsgewinn };
}

const fmtEUR = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

function LeadCalculator() {
  const [stromkosten, setStromkosten] = useState(150);
  const [flaeche, setFlaeche] = useState(40);
  const [speicher, setSpeicher] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [gate, setGate] = useState({ name: "", kontakt: "" });
  const [gateError, setGateError] = useState("");
  const [sending, setSending] = useState(false);
  const usedTracked = useRef(false);

  const r = calcResults(stromkosten, flaeche, speicher);
  // Teilergebnis: Spanne ±15 %
  const low = r.cashflow * 0.85;
  const high = r.cashflow * 1.15;

  function trackUsed() {
    if (usedTracked.current) return;
    usedTracked.current = true;
    pushEvent("calculator_used");
  }

  // Eingaben für den Funnel speichern (kein doppeltes Tippen)
  useEffect(() => {
    try {
      sessionStorage.setItem(
        CALC_STORE_KEY,
        JSON.stringify({ stromkosten, flaeche, speicher }),
      );
    } catch {
      /* sessionStorage gesperrt – Vorbefüllung entfällt */
    }
  }, [stromkosten, flaeche, speicher]);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setGateError("");
    if (!gate.name.trim() || !gate.kontakt.trim()) {
      setGateError("Bitte Name und Telefon oder E-Mail angeben.");
      return;
    }
    setSending(true);
    try {
      await fetch(MAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Quelle: "LP – PV-Angebot (Solarrechner)",
          Seite: window.location.href,
          Name: gate.name,
          Kontakt: gate.kontakt,
          Monatliche_Stromkosten: `${stromkosten} €`,
          Dachflaeche: `${flaeche} m²`,
          Speicher: speicher ? "ja" : "nein",
          Zeitstempel: new Date().toISOString(),
        }),
      });
      pushEvent("lead_form_submit", {
        form_name: "LP – PV-Angebot (Solarrechner)",
        conversion_value: 150,
        currency: "EUR",
      });
      trackFormSubmit({
        formId: "lp-pv-angebot-solarrechner",
        formType: "lead",
        formLocation: "pv-angebot",
        value: 150,
      });
    } catch {
      /* Lead trotzdem freischalten – Anfrage kann telefonisch nachgeholt werden */
    }
    setUnlocked(true);
    setSending(false);
  }

  return (
    <section id="rechner" className="scroll-mt-20 bg-[#f8fafb] px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight text-ink">
            Was bringt Ihnen eine PV-Anlage? Rechnen Sie nach.
          </h2>
          <p className="mx-auto max-w-[620px] text-[0.95rem] leading-relaxed text-muted">
            Drei Angaben genügen. Die vollständige Auslegung mit Amortisation
            und Gewinnpotenzial erhalten Sie direkt im Anschluss.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Eingaben */}
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-[0_6px_24px_-10px_rgba(15,37,51,0.12)] sm:p-8">
            <label className="mb-6 block">
              <span className="mb-2 flex items-center justify-between text-[0.9rem] font-bold text-ink">
                Monatliche Stromkosten
                <span className="text-accent">{stromkosten} €</span>
              </span>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={stromkosten}
                onChange={(e) => {
                  setStromkosten(Number(e.target.value));
                  trackUsed();
                }}
                className="w-full accent-accent"
              />
              <span className="mt-1 flex justify-between text-[0.72rem] text-muted">
                <span>50 €</span>
                <span>500 €</span>
              </span>
            </label>

            <label className="mb-6 block">
              <span className="mb-2 flex items-center justify-between text-[0.9rem] font-bold text-ink">
                Nutzbare Dachfläche
                <span className="text-accent">{flaeche} m²</span>
              </span>
              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={flaeche}
                onChange={(e) => {
                  setFlaeche(Number(e.target.value));
                  trackUsed();
                }}
                className="w-full accent-accent"
              />
              <span className="mt-1 flex justify-between text-[0.72rem] text-muted">
                <span>10 m²</span>
                <span>120 m²</span>
              </span>
            </label>

            <div className="flex items-center justify-between rounded-xl border border-line bg-[#f8fafb] px-4 py-3">
              <span className="text-[0.9rem] font-bold text-ink">
                Mit Stromspeicher
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={speicher}
                onClick={() => {
                  setSpeicher((s) => !s);
                  trackUsed();
                }}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  speicher ? "bg-accent" : "bg-line"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    speicher ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Ergebnis */}
          <div className="flex flex-col rounded-[20px] border border-accent/20 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(43,108,176,0.20)] sm:p-8">
            <p className="mb-1 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-muted">
              Ihre geschätzte Ersparnis
            </p>
            <p className="mb-5 text-[clamp(1.7rem,4vw,2.4rem)] font-bold leading-tight text-accent">
              {fmtEUR(low)} – {fmtEUR(high)} € <span className="text-[0.55em] font-semibold text-muted">pro Jahr</span>
            </p>

            {!unlocked ? (
              <>
                <div className="mb-5 space-y-2 rounded-xl bg-[#f8fafb] p-4">
                  {[
                    "Empfohlene Anlagengröße (kWp & Module)",
                    "Amortisationsdauer Ihrer Anlage",
                    "Monatliches Gewinnpotenzial über 30 Jahre",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 text-[0.85rem] text-muted"
                    >
                      <ShieldCheck className="h-4 w-4 shrink-0 text-accent/60" />
                      <span className="blur-[3px] select-none">{t}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={unlock} className="mt-auto">
                  <p className="mb-3 text-[0.85rem] font-semibold text-ink">
                    Vollständige Berechnung kostenlos erhalten:
                  </p>
                  <div className="mb-3 grid gap-2 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Ihr Name*"
                      value={gate.name}
                      onChange={(e) =>
                        setGate((g) => ({ ...g, name: e.target.value }))
                      }
                      className="min-h-[48px] rounded-lg border border-line px-3.5 text-[0.92rem] outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <input
                      type="text"
                      placeholder="Telefon oder E-Mail*"
                      value={gate.kontakt}
                      onChange={(e) =>
                        setGate((g) => ({ ...g, kontakt: e.target.value }))
                      }
                      className="min-h-[48px] rounded-lg border border-line px-3.5 text-[0.92rem] outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                  {gateError && (
                    <p className="mb-2 text-[0.8rem] font-semibold text-red-600">
                      {gateError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="min-h-[52px] w-full rounded-full bg-ink px-6 py-3 text-[0.95rem] font-bold text-white transition-all hover:bg-ink-light disabled:cursor-wait disabled:opacity-70"
                  >
                    {sending ? "Einen Moment …" : "Vollständige Berechnung erhalten"}
                  </button>
                  <p className="mt-2 text-center text-[0.72rem] text-muted">
                    Unverbindlich · keine Weitergabe Ihrer Daten
                  </p>
                </form>
              </>
            ) : (
              <div className="space-y-3">
                {[
                  {
                    label: "Empfohlene Anlagengröße",
                    value: `${r.kWp.toFixed(1).replace(".", ",")} kWp (${r.module} Module)`,
                  },
                  {
                    label: "Jahresertrag",
                    value: `ca. ${fmtEUR(r.erzeugung)} kWh`,
                  },
                  {
                    label: "Amortisationsdauer",
                    value: Number.isFinite(r.amort)
                      ? `ca. ${r.amort.toFixed(1).replace(".", ",")} Jahre`
                      : "–",
                  },
                  {
                    label: "Monatliches Gewinnpotenzial",
                    value: `ca. ${fmtEUR(r.monatsgewinn)} €`,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b border-line pb-2 text-[0.92rem]"
                  >
                    <span className="text-muted">{row.label}</span>
                    <span className="font-bold text-ink">{row.value}</span>
                  </div>
                ))}
                <p className="pt-1 text-[0.82rem] leading-relaxed text-muted">
                  Danke, {""}
                  <strong className="text-ink">wir melden uns innerhalb von 48 h</strong>{" "}
                  mit Ihrer verbindlichen Auslegung. Schneller geht&apos;s
                  telefonisch:{" "}
                  <a
                    href={`tel:${PHONE}`}
                    onClick={() => trackPhoneClick("calculator_result")}
                    className="font-bold text-accent"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </p>
                <button
                  type="button"
                  onClick={scrollToFunnel}
                  className="min-h-[52px] w-full rounded-full bg-ink px-6 py-3 text-[0.95rem] font-bold text-white transition-all hover:bg-ink-light"
                >
                  Kostenloses PV-Angebot sichern
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   3 · PROBLEM → LÖSUNG
   ════════════════════════════════════════════════════════════ */
function ProblemLoesung() {
  const probleme = [
    { icon: TrendingDown, text: "Steigende Strompreise" },
    { icon: Zap, text: "Abhängigkeit vom Versorger" },
    { icon: Users, text: "Billiganbieter mit Subunternehmern" },
  ];
  return (
    <section className="bg-white px-5 py-14 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-[900px] text-center">
        <div className="mb-7 grid gap-3 sm:grid-cols-3">
          {probleme.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-line bg-[#f8fafb] px-4 py-3.5 text-[0.9rem] font-semibold text-ink"
            >
              <Icon className="h-5 w-5 shrink-0 text-accent" />
              {text}
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-[720px] text-[clamp(1.1rem,2.4vw,1.45rem)] font-bold leading-[1.5] text-ink">
          ALAB plant als Ingenieurbüro und installiert mit eigenen Elektrikern –{" "}
          <span className="text-accent">
            kein Vertrieb, keine Subunternehmer, keine Überraschungen.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   4 · SO EINFACH GEHT'S – 4 Schritte, je 1 Satz
   ════════════════════════════════════════════════════════════ */
function SoGehts() {
  const steps = [
    {
      title: "Anfrage stellen",
      text: "Formular ausfüllen oder anrufen – Sie erhalten Ihr Angebot innerhalb von 48 h.",
    },
    {
      title: "Beratung & Planung",
      text: "Unsere Ingenieure legen Ihre Anlage technisch und wirtschaftlich optimal aus.",
    },
    {
      title: "Installation in 1–2 Tagen",
      text: "Unsere eigenen Elektriker montieren sauber, normgerecht und ohne Subunternehmer.",
    },
    {
      title: "Strom sparen",
      text: "Wir übernehmen Anmeldung und Inbetriebnahme – Sie produzieren eigenen Strom.",
    },
  ];
  return (
    <section className="bg-[#f8fafb] px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-center text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight text-ink">
          So einfach geht&apos;s
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-[18px] border border-line bg-white p-6 shadow-[0_4px_16px_-8px_rgba(15,37,51,0.10)]"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[0.95rem] font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-[1.05rem] font-bold text-ink">
                {s.title}
              </h3>
              <p className="text-[0.88rem] leading-[1.65] text-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={scrollToFunnel}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[1rem] font-bold text-white shadow-[0_8px_24px_-8px_rgba(15,37,51,0.45)] transition-all hover:-translate-y-0.5 hover:bg-ink-light"
          >
            Kostenloses PV-Angebot sichern
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   5 · WARUM ALAB – 6 echte Differenzierer
   ════════════════════════════════════════════════════════════ */
function WarumAlab() {
  const usps = [
    {
      icon: Banknote,
      title: "Festpreisgarantie",
      text: "Der Preis aus dem Angebot ist verbindlich – keine Nachträge.",
    },
    {
      icon: Wrench,
      title: "Eigene Elektriker statt Subunternehmer",
      text: "Montage und Elektrik aus einer Hand, DIN/VDE-konform.",
    },
    {
      icon: Building2,
      title: "Ingenieurbüro + Elektrofachbetrieb",
      text: "Technische Planung statt Vertriebsversprechen – auf Wunsch mit Drohnen-Dachanalyse.",
    },
    {
      icon: FileCheck2,
      title: "Komplette Bürokratie-Übernahme",
      text: "Netzbetreiber-Anmeldung, Marktstammdatenregister, alle Formalitäten.",
    },
    {
      icon: Timer,
      title: "Service mit < 48 h Reaktionszeit",
      text: "Regionaler Betrieb in Mindelheim – kein anonymes Callcenter.",
    },
    {
      icon: Layers,
      title: "Gesamtes Energiesystem aus einer Hand",
      text: "PV, Speicher, Wallbox und Elektroinstallation integriert geplant, modular erweiterbar.",
    },
  ];
  return (
    <section className="bg-white px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-center text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight text-ink">
          Warum ALAB?
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {usps.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[18px] border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_-14px_rgba(15,37,51,0.20)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
              </div>
              <h3 className="mb-2 text-[1rem] font-bold leading-snug text-ink">
                {title}
              </h3>
              <p className="text-[0.88rem] leading-[1.65] text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   7 · REFERENZEN mit Zahlen + CTA
   TODO: kWp/Speicher-Angaben durch echte Projektdaten ersetzen.
   ════════════════════════════════════════════════════════════ */
function Referenzen() {
  const refs = [
    { img: "anlage1_P.avif", caption: "Einfamilienhaus bei Mindelheim · 9,8 kWp · 10 kWh Speicher" },
    { img: "anlage2_P.avif", caption: "Wohnhaus im Unterallgäu · 8,2 kWp" },
    { img: "anlage3_P.avif", caption: "Einfamilienhaus Region Memmingen · 11,4 kWp · Speicher" },
    { img: "anlage4_P.avif", caption: "Satteldach Region Allgäu · 7,7 kWp" },
    { img: "anlage5_P.avif", caption: "Einfamilienhaus bei Bad Wörishofen · 10,5 kWp · Wallbox" },
    { img: "anlage6_P.avif", caption: "Wohnhaus Region Schwaben · 9,1 kWp · 8 kWh Speicher" },
  ];
  return (
    <section className="bg-[#f8fafb] px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-3 text-center text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight text-ink">
          Anlagen, die wir gebaut haben
        </h2>
        <p className="mx-auto mb-10 max-w-[600px] text-center text-[0.95rem] text-muted">
          Echte Projekte aus der Region – geplant, montiert und dokumentiert von
          ALAB.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {refs.map((r) => (
            <figure
              key={r.img}
              className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_4px_16px_-8px_rgba(15,37,51,0.10)]"
            >
              <div className="relative h-[200px]">
                <Image
                  src={`/assets/img/referenzen-privat/${r.img}`}
                  alt={r.caption}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-[0.82rem] font-semibold text-ink">
                {r.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={scrollToFunnel}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[1rem] font-bold text-white shadow-[0_8px_24px_-8px_rgba(15,37,51,0.45)] transition-all hover:-translate-y-0.5 hover:bg-ink-light"
          >
            Kostenloses PV-Angebot sichern
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   8 · FAQ – Einwände vor der Anfrage
   ════════════════════════════════════════════════════════════ */
function Faq() {
  const items = [
    {
      q: "Lohnt sich PV bei meinem Dach (Ausrichtung/Verschattung)?",
      a: "In den meisten Fällen ja – auch Ost-West-Dächer liefern sehr gute Erträge. Verschattung prüfen wir bei der Planung, auf Wunsch per Drohnen-Dachanalyse. Im Angebot sehen Sie schwarz auf weiß, was Ihr Dach leistet.",
    },
    {
      q: "Was kostet eine Anlage fürs Einfamilienhaus ungefähr?",
      a: "Je nach Größe und Ausstattung liegen typische Anlagen mit Speicher zwischen 15.000 und 25.000 €. Den exakten Preis nennt Ihnen unser Festpreisangebot – verbindlich und ohne Nachträge.",
    },
    {
      q: "Wie lange dauert es von Anfrage bis Inbetriebnahme?",
      a: "Ihr Angebot erhalten Sie innerhalb von 48 h. Von Auftrag bis Inbetriebnahme vergehen je nach Netzbetreiber typischerweise 4–8 Wochen – die Installation selbst dauert nur 1–2 Tage.",
    },
    {
      q: "Brauche ich einen Speicher?",
      a: "Ein Speicher erhöht Ihren Eigenverbrauch von rund 40 % auf bis zu 70 %. Ob er sich für Sie rechnet, hängt von Ihrem Verbrauchsprofil ab – wir rechnen es Ihnen neutral vor.",
    },
    {
      q: "Was ist mit Förderung und 0 % Mehrwertsteuer?",
      a: "Private PV-Anlagen sind seit 2023 von der Mehrwertsteuer befreit (0 %). Zusätzliche regionale Förderungen prüfen wir für Sie – die Anträge übernehmen wir.",
    },
    {
      q: "Was passiert bei Stromausfall?",
      a: "Mit einem notstromfähigen Speicher versorgt Ihre Anlage ausgewählte Verbraucher auch bei Netzausfall weiter. Wir beraten Sie, welche Lösung zu Ihrem Bedarf passt.",
    },
    {
      q: "Wer macht die Anmeldung beim Netzbetreiber?",
      a: "Wir – komplett. Netzbetreiber-Anmeldung, Marktstammdatenregister und alle Formalitäten sind im Festpreis enthalten.",
    },
    {
      q: "Was passiert nach der Installation?",
      a: "Sie behalten uns als regionalen Ansprechpartner: Monitoring, Wartung und Garantieabwicklung – mit Reaktionszeit unter 48 h.",
    },
  ];
  return (
    <section className="bg-white px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[860px]">
        <h2 className="mb-10 text-center text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight text-ink">
          Häufige Fragen
        </h2>
        <div className="space-y-3">
          {items.map((it) => (
            <details
              key={it.q}
              className="group rounded-[14px] border border-line bg-white p-5 open:shadow-[0_8px_24px_-12px_rgba(15,37,51,0.15)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.98rem] font-bold text-ink [&::-webkit-details-marker]:hidden">
                {it.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[0.92rem] leading-[1.75] text-muted">
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   9 · LEAD-FUNNEL – 3 Schritte mit Fortschrittsbalken
   ════════════════════════════════════════════════════════════ */
const DACH_OPTIONS = [
  { value: "Satteldach", icon: Home },
  { value: "Flachdach", icon: Layers },
  { value: "Sonstiges", icon: Building2 },
];
const INTERESSE_OPTIONS = ["Speicher", "Wallbox", "Nur PV"];
const KOSTEN_OPTIONS = [
  "unter 100 €",
  "100 – 150 €",
  "150 – 250 €",
  "250 – 400 €",
  "über 400 €",
];

function LeadFunnel() {
  const [step, setStep] = useState(0); // 0..2 Eingabe, 3 = Danke
  const [dach, setDach] = useState("");
  const [interessen, setInteressen] = useState<string[]>([]);
  const [plz, setPlz] = useState("");
  const [kosten, setKosten] = useState("");
  const [kontakt, setKontakt] = useState({ name: "", telefon: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // Rechner-Eingaben vorausfüllen (Stromkosten-Range ableiten)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CALC_STORE_KEY);
      if (!raw) return;
      const calc = JSON.parse(raw) as { stromkosten?: number };
      const k = calc.stromkosten ?? 0;
      if (k > 0 && !kosten) {
        const range =
          k < 100
            ? KOSTEN_OPTIONS[0]
            : k < 150
              ? KOSTEN_OPTIONS[1]
              : k < 250
                ? KOSTEN_OPTIONS[2]
                : k < 400
                  ? KOSTEN_OPTIONS[3]
                  : KOSTEN_OPTIONS[4];
        setKosten(range);
      }
    } catch {
      /* keine Vorbefüllung möglich */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleInteresse(v: string) {
    setInteressen((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }

  function next() {
    setError("");
    if (step === 0 && !dach) {
      setError("Bitte wählen Sie Ihren Dachtyp.");
      return;
    }
    if (step === 1) {
      if (!/^\d{4,5}$/.test(plz.trim())) {
        setError("Bitte eine gültige PLZ eingeben.");
        return;
      }
      if (!kosten) {
        setError("Bitte wählen Sie Ihre monatlichen Stromkosten.");
        return;
      }
    }
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setError("");
    if (!kontakt.name.trim() || !kontakt.telefon.trim() || !kontakt.email.trim()) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }
    if (!consent) {
      setError("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }
    setSending(true);

    let calcData: Record<string, unknown> = {};
    try {
      const raw = sessionStorage.getItem(CALC_STORE_KEY);
      if (raw) {
        const c = JSON.parse(raw) as {
          stromkosten?: number;
          flaeche?: number;
          speicher?: boolean;
        };
        calcData = {
          Rechner_Stromkosten: c.stromkosten ? `${c.stromkosten} €` : "",
          Rechner_Dachflaeche: c.flaeche ? `${c.flaeche} m²` : "",
          Rechner_Speicher: c.speicher ? "ja" : "nein",
        };
      }
    } catch {
      /* ohne Rechnerdaten senden */
    }

    try {
      await fetch(MAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Quelle: "LP – PV-Angebot (Funnel)",
          Seite: window.location.href,
          Dachtyp: dach,
          Interessen: interessen.join(", ") || "Nur PV",
          PLZ: plz,
          Monatliche_Stromkosten: kosten,
          Name: kontakt.name,
          Telefon: kontakt.telefon,
          Email: kontakt.email,
          ...calcData,
          Zeitstempel: new Date().toISOString(),
        }),
      });
      pushEvent("lead_form_submit", {
        form_name: "LP – PV-Angebot (Funnel)",
        conversion_value: 150,
        currency: "EUR",
      });
      trackFormSubmit({
        formId: "lp-pv-angebot-funnel",
        formType: "lead",
        formLocation: "pv-angebot",
        value: 150,
      });
      setStep(3);
    } catch {
      setError(
        `Übermittlung fehlgeschlagen. Rufen Sie uns an: ${PHONE_DISPLAY}`,
      );
    } finally {
      setSending(false);
    }
  }

  const progress = Math.min(100, Math.round(((step + 1) / 3) * 100));

  return (
    <section
      id="funnel"
      className="scroll-mt-20 bg-ink px-5 py-14 text-white sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-[640px]">
        {step < 3 && (
          <>
            <h2 className="mb-3 text-center text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight">
              Kostenloses PV-Angebot anfordern
            </h2>
            <p className="mb-8 text-center text-[0.95rem] text-white/70">
              Dauert keine 60 Sekunden – unverbindlich und kostenlos.
            </p>

            {/* Fortschrittsbalken */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-[0.78rem] font-semibold text-white/60">
                <span>Schritt {step + 1} von 3</span>
                <span>{progress} %</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </>
        )}

        {/* Schritt 1: Dachtyp + Interesse (nur Klicks) */}
        {step === 0 && (
          <div>
            <p className="mb-4 text-[1.05rem] font-bold">
              Welches Dach haben Sie?
            </p>
            <div className="mb-7 grid grid-cols-3 gap-3">
              {DACH_OPTIONS.map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDach(value)}
                  className={`flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-[16px] border-2 p-4 text-[0.88rem] font-bold transition-all ${
                    dach === value
                      ? "border-accent bg-accent/15 text-white"
                      : "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
                  }`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                  {value}
                </button>
              ))}
            </div>

            <p className="mb-4 text-[1.05rem] font-bold">
              Interessieren Sie sich auch für …?{" "}
              <span className="text-[0.82rem] font-normal text-white/60">
                (Mehrfachauswahl)
              </span>
            </p>
            <div className="mb-8 grid grid-cols-3 gap-3">
              {INTERESSE_OPTIONS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggleInteresse(v)}
                  className={`flex min-h-[56px] items-center justify-center gap-2 rounded-[14px] border-2 px-3 py-3 text-[0.88rem] font-bold transition-all ${
                    interessen.includes(v)
                      ? "border-accent bg-accent/15 text-white"
                      : "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
                  }`}
                >
                  {interessen.includes(v) && <Check className="h-4 w-4" />}
                  {v}
                </button>
              ))}
            </div>

            {error && (
              <p className="mb-4 text-[0.85rem] font-semibold text-red-300">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={next}
              className="min-h-[52px] w-full rounded-full bg-accent px-6 py-3.5 text-[1rem] font-bold text-white shadow-[0_8px_26px_-8px_rgba(43,108,176,0.7)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
            >
              Weiter
            </button>
          </div>
        )}

        {/* Schritt 2: PLZ + Stromkosten */}
        {step === 1 && (
          <div>
            <label className="mb-6 block">
              <span className="mb-2 block text-[1.05rem] font-bold">
                Ihre Postleitzahl
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={plz}
                onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))}
                placeholder="z. B. 87719"
                className="min-h-[52px] w-full rounded-xl border-2 border-white/15 bg-white/5 px-4 text-[1rem] font-semibold text-white outline-none placeholder:text-white/40 focus:border-accent"
              />
            </label>

            <p className="mb-4 text-[1.05rem] font-bold">
              Ihre monatlichen Stromkosten
            </p>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {KOSTEN_OPTIONS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setKosten(v)}
                  className={`min-h-[52px] rounded-[14px] border-2 px-3 py-3 text-[0.88rem] font-bold transition-all ${
                    kosten === v
                      ? "border-accent bg-accent/15 text-white"
                      : "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {error && (
              <p className="mb-4 text-[0.85rem] font-semibold text-red-300">
                {error}
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex min-h-[52px] items-center gap-1 rounded-full border-2 border-white/20 px-5 py-3 text-[0.92rem] font-bold text-white/80 transition-all hover:border-white/50"
              >
                <ChevronLeft className="h-4 w-4" />
                Zurück
              </button>
              <button
                type="button"
                onClick={next}
                className="min-h-[52px] flex-1 rounded-full bg-accent px-6 py-3.5 text-[1rem] font-bold text-white shadow-[0_8px_26px_-8px_rgba(43,108,176,0.7)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Schritt 3: Kontakt */}
        {step === 2 && (
          <form onSubmit={submit}>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-[0.88rem] font-bold">
                  Ihr Name*
                </span>
                <input
                  type="text"
                  value={kontakt.name}
                  onChange={(e) =>
                    setKontakt((k) => ({ ...k, name: e.target.value }))
                  }
                  className="min-h-[52px] w-full rounded-xl border-2 border-white/15 bg-white/5 px-4 text-[1rem] text-white outline-none placeholder:text-white/40 focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.88rem] font-bold">
                  Telefon*
                </span>
                <input
                  type="tel"
                  value={kontakt.telefon}
                  onChange={(e) =>
                    setKontakt((k) => ({ ...k, telefon: e.target.value }))
                  }
                  className="min-h-[52px] w-full rounded-xl border-2 border-white/15 bg-white/5 px-4 text-[1rem] text-white outline-none placeholder:text-white/40 focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.88rem] font-bold">
                  E-Mail*
                </span>
                <input
                  type="email"
                  value={kontakt.email}
                  onChange={(e) =>
                    setKontakt((k) => ({ ...k, email: e.target.value }))
                  }
                  className="min-h-[52px] w-full rounded-xl border-2 border-white/15 bg-white/5 px-4 text-[1rem] text-white outline-none placeholder:text-white/40 focus:border-accent"
                />
              </label>
            </div>

            <label className="mb-5 flex items-start gap-3 text-[0.82rem] leading-relaxed text-white/75">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-accent"
              />
              <span>
                Ich stimme der Kontaktaufnahme zu und habe die{" "}
                <a
                  href="/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white underline underline-offset-2"
                >
                  Datenschutzerklärung
                </a>{" "}
                gelesen.*
              </span>
            </label>

            {error && (
              <p className="mb-4 text-[0.85rem] font-semibold text-red-300">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex min-h-[52px] items-center gap-1 rounded-full border-2 border-white/20 px-5 py-3 text-[0.92rem] font-bold text-white/80 transition-all hover:border-white/50"
              >
                <ChevronLeft className="h-4 w-4" />
                Zurück
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[1rem] font-bold text-white shadow-[0_8px_26px_-8px_rgba(43,108,176,0.7)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? (
                  "Wird gesendet …"
                ) : (
                  <>
                    Kostenloses Angebot anfordern
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-[0.8rem] text-white/60">
              ✓ Unverbindlich&nbsp;&nbsp;✓ Antwort innerhalb von 48 h&nbsp;&nbsp;✓
              Keine Weitergabe Ihrer Daten
            </p>
          </form>
        )}

        {/* Danke-State */}
        {step === 3 && (
          <div className="rounded-[20px] bg-white p-8 text-ink">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                className="h-8 w-8 text-green-600"
                strokeWidth={2.2}
              />
            </div>
            <h2 className="mb-2 text-2xl font-bold">
              Vielen Dank, {kontakt.name.split(" ")[0] || "Ihre Anfrage ist da"}!
            </h2>
            <p className="mb-6 text-[0.95rem] leading-relaxed text-muted">
              Ihre Anfrage ist bei uns eingegangen. So geht es jetzt weiter:
            </p>
            <ol className="mb-6 space-y-3">
              {[
                "Wir prüfen Ihr Dach anhand Ihrer Angaben.",
                "Wir rufen Sie innerhalb von 48 h an.",
                "Sie erhalten Ihr verbindliches Festpreis-Angebot.",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-3 text-[0.95rem]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[0.8rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-ink">{t}</span>
                </li>
              ))}
            </ol>
            <p className="text-[0.92rem] text-muted">
              Sie möchten nicht warten?{" "}
              <a
                href={`tel:${PHONE}`}
                onClick={() => trackPhoneClick("thank_you")}
                className="font-bold text-accent"
              >
                {PHONE_DISPLAY}
              </a>{" "}
              – Mo–Fr 8:00–17:00 Uhr.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   10 · SCHLUSS – Vertrauen + finaler CTA
   ════════════════════════════════════════════════════════════ */
function Schluss() {
  return (
    <section className="bg-white px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-[1000px] items-center gap-10 lg:grid-cols-2">
        <div className="relative h-[260px] overflow-hidden rounded-[20px] shadow-[0_14px_40px_-16px_rgba(15,37,51,0.30)] sm:h-[320px]">
          <Image
            src="/Alab team bild für webseite.png"
            alt="Das Team von ALAB Energiesysteme in Mindelheim"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
        <div>
          <h2 className="mb-4 text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight text-ink">
            Ihr Ansprechpartner – auch nach der Installation
          </h2>
          <p className="mb-7 text-[0.98rem] leading-[1.75] text-muted">
            Ingenieurbüro &amp; Elektrofachbetrieb aus Mindelheim – wir bleiben
            auch nach der Installation Ihr Ansprechpartner.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollToFunnel}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[1rem] font-bold text-white shadow-[0_8px_24px_-8px_rgba(15,37,51,0.45)] transition-all hover:-translate-y-0.5 hover:bg-ink-light"
            >
              Kostenloses PV-Angebot sichern
            </button>
            <a
              href={`tel:${PHONE}`}
              onClick={() => trackPhoneClick("schluss")}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 text-[1.05rem] font-bold text-ink transition-colors hover:text-accent"
            >
              <Phone className="h-5 w-5 text-accent" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   MINI-FOOTER – nur Pflichtangaben
   ════════════════════════════════════════════════════════════ */
function MiniFooter() {
  return (
    <footer className="border-t border-line bg-white px-5 pb-24 pt-8 sm:pb-8 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-center text-xs text-muted sm:flex-row sm:text-left">
        <div>
          ALAB Energiesysteme e. K. · Kastanienweg 6, 87719 Mindelheim ·{" "}
          <a
            href={`tel:${PHONE}`}
            onClick={() => trackPhoneClick("footer")}
            className="hover:text-accent"
          >
            {PHONE_DISPLAY}
          </a>{" "}
          ·{" "}
          <a href="mailto:info@alabenergiesysteme.de" className="hover:text-accent">
            info@alabenergiesysteme.de
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/impressum" className="hover:text-accent">
            Impressum
          </a>
          <a href="/datenschutz" className="hover:text-accent">
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════
   MOBILE STICKY-BOTTOM-BAR
   ════════════════════════════════════════════════════════════ */
function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[3500] flex border-t border-line bg-white/95 shadow-[0_-4px_18px_rgba(15,37,51,0.12)] backdrop-blur-md sm:hidden">
      <a
        href={`tel:${PHONE}`}
        onClick={() => trackPhoneClick("sticky_bottom")}
        className="flex min-h-[56px] flex-1 items-center justify-center gap-2 text-[0.95rem] font-bold text-ink"
      >
        <Phone className="h-4 w-4 text-accent" />
        Anrufen
      </a>
      <button
        type="button"
        onClick={scrollToFunnel}
        className="flex min-h-[56px] flex-1 items-center justify-center bg-ink text-[0.95rem] font-bold text-white"
      >
        Angebot anfordern
      </button>
    </div>
  );
}
