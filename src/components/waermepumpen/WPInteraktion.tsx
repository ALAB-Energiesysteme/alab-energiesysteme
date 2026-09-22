"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { FORM_ANKER, PHONE } from "./wp-daten";

/* ════════════════════════════════════════════════════════════
   Ein einziger delegierter Klick-Listener für die ganze Seite:
   - tel:-Links        → phone_click  (position aus data-pos)
   - [data-cta]        → cta_click    (position aus data-cta)
   - Links auf #anfrage → sanft zum Formular scrollen
   So bleiben alle Abschnitte Server-Komponenten ohne eigenes JS,
   und jeder Klick erzeugt genau EIN Event.
   ════════════════════════════════════════════════════════════ */

function zumFormular() {
  const ziel = document.getElementById(FORM_ANKER);
  if (!ziel) return false;
  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  ziel.scrollIntoView({ behavior: ruhig ? "auto" : "smooth", block: "start" });
  ziel.focus({ preventScroll: true });
  return true;
}

export function WPKlickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest) return;

      const tel = el.closest('a[href^="tel:"]');
      if (tel) {
        trackEvent("phone_click", {
          position:
            tel.getAttribute("data-pos") ||
            (tel.closest("footer") ? "footer" : "seite"),
        });
        return;
      }

      const cta = el.closest("[data-cta]");
      if (cta) {
        trackEvent("cta_click", {
          position: cta.getAttribute("data-cta"),
          cta_text: (cta.textContent || "").trim().slice(0, 80),
        });
      }

      const anker = el.closest(`a[href="#${FORM_ANKER}"]`);
      if (anker && !e.defaultPrevented && zumFormular()) e.preventDefault();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

/* ─── Mobile Sticky-Leiste ───
   Erscheint erst, wenn der Hero-CTA aus dem Bild gescrollt ist, und
   verschwindet, solange Formular oder Footer sichtbar sind – so verdeckt
   sie weder den Hero noch Eingabefelder. */
export function WPStickyLeiste() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const ziele = [
      document.getElementById("wp-hero-cta"),
      document.getElementById(FORM_ANKER),
      document.querySelector("footer"),
    ].filter((x): x is HTMLElement => x instanceof HTMLElement);
    if (!ziele.length || !("IntersectionObserver" in window)) return;

    const imBild = new Set<Element>();
    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.isIntersecting) imBild.add(e.target);
          else imBild.delete(e.target);
        }
        setSichtbar(imBild.size === 0);
      },
      { threshold: 0 },
    );
    ziele.forEach((z) => io.observe(z));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!sichtbar}
      className={`fixed inset-x-0 bottom-0 z-[3500] border-t border-line bg-white/95 px-3 pt-2 shadow-[0_-6px_20px_-8px_rgba(15,37,51,0.18)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        sichtbar ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2">
        <a
          href={`tel:${PHONE}`}
          data-pos="sticky_leiste"
          tabIndex={sichtbar ? 0 : -1}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink/15 text-[0.95rem] font-bold text-ink"
        >
          <Phone className="h-4 w-4 text-accent" />
          Anrufen
        </a>
        <a
          href={`#${FORM_ANKER}`}
          data-cta="sticky_leiste"
          tabIndex={sichtbar ? 0 : -1}
          className="flex h-12 flex-[1.4] items-center justify-center rounded-full bg-gradient-to-r from-accent-deep to-accent text-[0.95rem] font-bold text-white shadow-[0_6px_16px_-6px_rgba(30,79,139,0.55)]"
        >
          Angebot anfordern
        </a>
      </div>
    </div>
  );
}
