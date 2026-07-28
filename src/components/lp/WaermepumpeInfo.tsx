"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { PHONE, PHONE_DISPLAY, STAND, PrimaryCta, PhoneCta } from "./wp-info/ui";
import { FoerderBausteine, Foerderrechner } from "./wp-info/FoerderTeil";
import Ersparnis from "./wp-info/Ersparnis";
import { Effizienz, Einwaende, Abschluss, Faq } from "./wp-info/TechnikTeil";

/* ══════════════════════════════════════════════════════════════
   Wärmepumpe – kompakte Informationsseite.

   Bewusst kurz gehalten: Förderung, eigene Rechnung, Ersparnis,
   das technische Warum, die drei häufigsten Einwände, FAQ.
   Flaches Berichtslayout, CTAs öffnen die globale AngebotLightbox.
   Inhaltlicher Stand: 28. Juli 2026.
   ══════════════════════════════════════════════════════════════ */

const NAV = [
  { id: "foerderung", label: "Förderung" },
  { id: "rechner", label: "Rechner" },
  { id: "ersparnis", label: "Ersparnis" },
  { id: "technik", label: "Technik" },
  { id: "faq", label: "Fragen" },
];

export default function WaermepumpeInfo() {
  return (
    <div className="bg-white pb-[56px] font-[family-name:var(--font-sans)] text-ink sm:pb-0">
      <Kopf />
      <Hero />
      <FoerderBausteine />
      <Foerderrechner />
      <Ersparnis />
      <Effizienz />
      <Einwaende />
      <Abschluss />
      <Faq />
      <Fuss />
      <StickyCta />
    </div>
  );
}

/* ─────────── Kopfbereich mit Lesefortschritt und Sprungnavigation ─────────── */

function Kopf() {
  const [fortschritt, setFortschritt] = useState(0);
  const [aktiv, setAktiv] = useState<string>("");

  useEffect(() => {
    // Positionen bewusst bei jedem Aufruf frisch lesen: Logo und
    // Schriften laden nach dem Mount nach und verschieben das Layout,
    // zwischengespeicherte Werte wären dann falsch.
    const auswerten = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setFortschritt(max > 0 ? (h.scrollTop / max) * 100 : 0);

      const grenze = h.scrollTop + 160;
      let treffer = "";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= grenze) treffer = n.id;
      }
      setAktiv(treffer);
    };

    auswerten();
    window.addEventListener("scroll", auswerten, { passive: true });
    window.addEventListener("resize", auswerten);
    return () => {
      window.removeEventListener("scroll", auswerten);
      window.removeEventListener("resize", auswerten);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[4000] border-b border-line bg-white/97 backdrop-blur-md">
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-accent transition-[width] duration-150"
        style={{ width: `${fortschritt}%` }}
        aria-hidden
      />

      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3 lg:px-8">
        <a href="/" className="shrink-0">
          <img
            src="/img/logo-alab.png"
            alt="ALAB Energiesysteme"
            className="h-9 w-auto sm:h-11"
          />
        </a>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE}`}
            className="hidden items-center gap-2 text-[0.85rem] font-bold text-ink transition-colors hover:text-accent lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            data-open-angebot="Wärmepumpe – Kopfbereich"
            className="cursor-pointer rounded-[4px] bg-accent px-4 py-2.5 text-[0.82rem] font-bold text-white transition-colors hover:bg-accent-deep"
          >
            Förderung prüfen
          </button>
        </div>
      </div>

      <nav aria-label="Abschnitte dieser Seite" className="border-t border-line">
        <ul className="mx-auto flex max-w-[1120px] gap-1 overflow-x-auto px-4 lg:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map((n) => (
            <li key={n.id} className="shrink-0">
              <a
                href={`#${n.id}`}
                className={`block border-b-2 px-3 py-2.5 text-[0.8rem] font-semibold whitespace-nowrap transition-colors ${
                  aktiv === n.id
                    ? "border-b-accent text-accent"
                    : "border-b-transparent text-muted hover:text-ink"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/* ─────────── Hero ─────────── */

function Hero() {
  return (
    <section className="border-b border-[#1c3d52] bg-[#0f2533] text-white">
      <div className="mx-auto max-w-[1120px] px-6 pb-[64px] pt-[150px] lg:px-8 lg:pb-[76px] lg:pt-[168px]">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/45">
          Stand {STAND} · ALAB Energiesysteme, Mindelheim
        </p>

        <h1 className="mt-6 max-w-[980px] text-[clamp(2.1rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.022em]">
          <span className="text-[#7db4ea]">22.400 €</span> vom Staat – und ab
          Tag eins bis zu{" "}
          <span className="text-[#7db4ea]">1.450 € weniger</span> Heizkosten pro
          Jahr
        </h1>

        <p className="mt-6 max-w-[720px] text-[1.05rem] leading-[1.75] text-white/70">
          Seit dem 21. Juli 2026 zahlt der Staat bis zu 80 Prozent Ihrer neuen
          Wärmepumpe. Auf dieser Seite steht in fünf Minuten, was übrig bleibt,
          was Sie jedes Jahr sparen und wie schnell sich der Wechsel trägt.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <PrimaryCta
            label="Kostenlose Förderprüfung anfordern"
            quelle="Wärmepumpe – Hero"
            variant="light"
          />
          <PhoneCta variant="light" />
        </div>
      </div>
    </section>
  );
}

/* ─────────── Fuß ─────────── */

function Fuss() {
  return (
    <footer className="border-t border-line bg-white px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-3 text-center text-xs text-muted sm:flex-row sm:text-left">
        <div>
          © {new Date().getFullYear()} ALAB Energiesysteme e. K. · Kastanienweg
          6, 87719 Mindelheim
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a href="/" className="hover:text-accent">
            Startseite
          </a>
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

/* ─────────── Sticky-Leiste (mobil) ─────────── */

function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[3500] flex border-t border-line bg-white/97 backdrop-blur-md sm:hidden">
      <a
        href={`tel:${PHONE}`}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-ink"
      >
        <Phone className="h-4 w-4" />
        Anrufen
      </a>
      <button
        type="button"
        data-open-angebot="Wärmepumpe – Sticky mobil"
        className="flex flex-1 cursor-pointer items-center justify-center bg-accent py-3.5 text-sm font-bold text-white"
      >
        Förderung prüfen
      </button>
    </div>
  );
}
