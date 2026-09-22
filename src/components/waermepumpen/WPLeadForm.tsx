"use client";

import { useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleHelp,
  Droplet,
  Flame,
  HousePlus,
  Phone,
  Send,
  TreePine,
  Zap,
} from "lucide-react";
import { trackEvent, trackFormSubmit } from "@/lib/tracking";
import { OEFFNUNGSZEITEN, PHONE, PHONE_DISPLAY } from "./wp-daten";

/* ════════════════════════════════════════════════════════════
   Kostenlose Ersteinschätzung – 4 Schritte, bewusst ohne Adresse.
   Tracking: form_start (einmal, erste Interaktion) und nach
   erfolgreichem Versand trackFormSubmit() → GTM feuert daraus die
   Google-Ads-Conversion und GA4 generate_lead.
   ════════════════════════════════════════════════════════════ */

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
const FORM_ID = "wp-ersteinschaetzung";
const FORM_LOCATION = "lp-waermepumpen";
const SCHRITTE = 4;

const HEIZUNGEN = [
  { value: "Gasheizung", icon: Flame },
  { value: "Ölheizung", icon: Droplet },
  { value: "Strom / Nachtspeicher", icon: Zap },
  { value: "Holz / Pellets", icon: TreePine },
  { value: "Neubau", icon: HousePlus },
  { value: "Andere / weiß nicht", icon: CircleHelp },
];

const FLAECHEN = [
  "bis 120 m²",
  "120–180 m²",
  "180–250 m²",
  "über 250 m²",
  "Weiß ich nicht genau",
];

const TITEL = [
  "Welche Heizung haben Sie aktuell?",
  "Wie groß ist die Wohnfläche?",
  "Wo steht das Gebäude?",
  "Wie erreichen wir Sie?",
];

const inputKlasse =
  "h-[52px] w-full rounded-[8px] border-2 border-line bg-surface-warm px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:bg-white";

async function senden(payload: Record<string, unknown>) {
  let letzterFehler: unknown = null;
  for (let versuch = 0; versuch < 2; versuch++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(MAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        signal: ctrl.signal,
      });
      if (res.ok) return;
      letzterFehler = new Error("HTTP " + res.status);
    } catch (err) {
      letzterFehler = err;
    } finally {
      clearTimeout(timer);
    }
  }
  throw letzterFehler;
}

export default function WPLeadForm() {
  const [schritt, setSchritt] = useState(0); // 0–3 Eingabe, 4 = Danke
  const [heizung, setHeizung] = useState("");
  const [flaeche, setFlaeche] = useState("");
  const [plz, setPlz] = useState("");
  const [kontakt, setKontakt] = useState({ name: "", telefon: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [fehler, setFehler] = useState("");
  const [sendet, setSendet] = useState(false);
  const gestartet = useRef(false);
  const titelRef = useRef<HTMLHeadingElement>(null);

  function start() {
    if (gestartet.current) return;
    gestartet.current = true;
    trackEvent("form_start", { form_id: FORM_ID, form_location: FORM_LOCATION });
  }

  function gehe(ziel: number) {
    setFehler("");
    setSchritt(ziel);
    // Screenreader & Tastatur: neuen Schritt ankündigen, ohne zu springen
    requestAnimationFrame(() => titelRef.current?.focus({ preventScroll: true }));
  }

  function waehleHeizung(v: string) {
    start();
    setHeizung(v);
    gehe(1);
  }

  function waehleFlaeche(v: string) {
    start();
    setFlaeche(v);
    gehe(2);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFehler("");

    if (schritt === 2) {
      if (!/^\d{5}$/.test(plz)) {
        setFehler("Bitte geben Sie eine gültige Postleitzahl mit 5 Ziffern ein.");
        return;
      }
      gehe(3);
      return;
    }
    if (schritt !== 3 || sendet) return;

    if (!kontakt.name.trim() || !kontakt.telefon.trim()) {
      setFehler("Bitte geben Sie Ihren Namen und Ihre Telefonnummer an.");
      return;
    }
    if (kontakt.telefon.replace(/\D/g, "").length < 6) {
      setFehler("Bitte prüfen Sie Ihre Telefonnummer.");
      return;
    }
    if (!consent) {
      setFehler("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    // Honeypot: Bots füllen das versteckte Feld – still „erfolgreich“ beenden
    const hp = new FormData(e.currentTarget).get("website");
    if (hp) {
      setSchritt(4);
      return;
    }

    setSendet(true);
    try {
      await senden({
        Quelle: "LP Wärmepumpen – Kostenlose Ersteinschätzung",
        Seite: window.location.href,
        Heizung: heizung,
        Wohnflaeche: flaeche,
        PLZ: plz,
        Name: kontakt.name.trim(),
        Telefon: kontakt.telefon.trim(),
        Email: kontakt.email.trim(),
        Consent: "ja",
        Zeitstempel: new Date().toISOString(),
      });
      trackFormSubmit({
        formId: FORM_ID,
        formType: "lead",
        formLocation: FORM_LOCATION,
      });
      setSchritt(4);
    } catch {
      setFehler(
        `Die Übermittlung hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an: ${PHONE_DISPLAY}`,
      );
    } finally {
      setSendet(false);
    }
  }

  /* ─── Danke ─── */
  if (schritt === 4) {
    const vorname = kontakt.name.trim().split(" ")[0];
    return (
      <div
        className="rounded-[12px] bg-white p-6 text-ink shadow-[0_24px_60px_-18px_rgba(0,0,0,0.45)] sm:p-9"
        role="status"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-8 w-8 text-accent" strokeWidth={2.2} />
        </div>
        <h3 className="mb-3 text-[1.5rem] font-bold leading-tight">
          Vielen Dank{vorname ? `, ${vorname}` : ""}!
        </h3>
        <p className="mb-6 text-[0.98rem] leading-relaxed text-muted">
          Ihre Anfrage ist bei uns eingegangen. Wir melden uns persönlich bei
          Ihnen, besprechen Ihr Gebäude und sagen Ihnen, welche Wärmepumpe
          passt.
        </p>
        <p className="text-[0.92rem] text-muted">
          Sie möchten nicht warten?{" "}
          <a
            href={`tel:${PHONE}`}
            data-pos="formular_danke"
            className="font-bold text-accent underline-offset-4 hover:underline"
          >
            {PHONE_DISPLAY}
          </a>{" "}
          ({OEFFNUNGSZEITEN})
        </p>
      </div>
    );
  }

  const fortschritt = ((schritt + 1) / SCHRITTE) * 100;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-[12px] bg-white p-5 text-ink shadow-[0_24px_60px_-18px_rgba(0,0,0,0.45)] sm:p-8"
    >
      {/* Fortschritt */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-[0.85rem] font-semibold text-muted">
          <span>
            Schritt {schritt + 1} von {SCHRITTE}
          </span>
          <span>kostenlos &amp; unverbindlich</span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={SCHRITTE}
          aria-valuenow={schritt + 1}
          aria-label="Fortschritt"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent transition-[width] duration-500"
            style={{ width: `${fortschritt}%` }}
          />
        </div>
      </div>

      <h3
        ref={titelRef}
        tabIndex={-1}
        className="mb-4 text-[1.3rem] font-bold leading-snug outline-none sm:text-[1.5rem]"
      >
        {TITEL[schritt]}
      </h3>

      <div className="min-h-[300px] sm:min-h-[276px]">
        {/* Schritt 1 – Heizung */}
        {schritt === 0 && (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {HEIZUNGEN.map(({ value, icon: Icon }) => {
              const aktiv = heizung === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => waehleHeizung(value)}
                  aria-pressed={aktiv}
                  className={`flex min-h-[84px] flex-col items-start justify-between gap-2 rounded-[8px] border-2 p-3 text-left text-[1rem] font-semibold leading-tight transition-all sm:min-h-[96px] ${
                    aktiv
                      ? "border-accent bg-[#eef4fb]"
                      : "border-line hover:border-accent/50 hover:bg-surface-warm"
                  }`}
                >
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                  {value}
                </button>
              );
            })}
          </div>
        )}

        {/* Schritt 2 – Wohnfläche */}
        {schritt === 1 && (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {FLAECHEN.map((v, i) => {
              const aktiv = flaeche === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => waehleFlaeche(v)}
                  aria-pressed={aktiv}
                  className={`flex min-h-[58px] items-center justify-between gap-2 rounded-[8px] border-2 px-4 text-left text-[1rem] font-semibold transition-all ${
                    i === FLAECHEN.length - 1 ? "col-span-2" : ""
                  } ${
                    aktiv
                      ? "border-accent bg-[#eef4fb]"
                      : "border-line hover:border-accent/50 hover:bg-surface-warm"
                  }`}
                >
                  {v}
                  {aktiv && <Check className="h-4 w-4 shrink-0 text-accent" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Schritt 3 – PLZ */}
        {schritt === 2 && (
          <div>
            <label htmlFor="wp-plz" className="mb-1.5 block text-[0.95rem] font-semibold">
              Postleitzahl
            </label>
            <input
              id="wp-plz"
              name="plz"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={plz}
              onFocus={start}
              onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))}
              placeholder="z. B. 87719"
              className={inputKlasse}
            />
            <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
              Für die Ersteinschätzung genügt die PLZ – Straße und Hausnummer
              brauchen wir erst später.
            </p>
          </div>
        )}

        {/* Schritt 4 – Kontakt */}
        {schritt === 3 && (
          <div className="grid gap-3">
            <div>
              <label htmlFor="wp-name" className="mb-1.5 block text-[0.95rem] font-semibold">
                Name *
              </label>
              <input
                id="wp-name"
                name="name"
                type="text"
                autoComplete="name"
                value={kontakt.name}
                onChange={(e) => setKontakt((k) => ({ ...k, name: e.target.value }))}
                className={inputKlasse}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="wp-telefon" className="mb-1.5 block text-[0.95rem] font-semibold">
                  Telefon *
                </label>
                <input
                  id="wp-telefon"
                  name="telefon"
                  type="tel"
                  autoComplete="tel"
                  value={kontakt.telefon}
                  onChange={(e) => setKontakt((k) => ({ ...k, telefon: e.target.value }))}
                  className={inputKlasse}
                />
              </div>
              <div>
                <label htmlFor="wp-email" className="mb-1.5 block text-[0.95rem] font-semibold">
                  E-Mail <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="wp-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={kontakt.email}
                  onChange={(e) => setKontakt((k) => ({ ...k, email: e.target.value }))}
                  className={inputKlasse}
                />
              </div>
            </div>
            {/* Honeypot – für Menschen unsichtbar */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
            />
            <label className="mt-1 flex items-start gap-3 text-[0.9rem] leading-relaxed text-muted">
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
                  className="font-semibold text-accent underline underline-offset-2"
                >
                  Datenschutzerklärung
                </a>{" "}
                gelesen. *
              </span>
            </label>
          </div>
        )}
      </div>

      <p
        aria-live="polite"
        className={`text-[0.85rem] font-semibold text-[#b42318] ${fehler ? "mt-3" : ""}`}
      >
        {fehler}
      </p>

      {/* Navigation */}
      {schritt > 0 && (
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => gehe(schritt - 1)}
            className="inline-flex min-h-[52px] items-center gap-1 rounded-full border-2 border-line px-5 text-[1rem] font-bold text-muted transition-colors hover:border-ink/30 hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
          {schritt >= 2 && (
            <button
              type="submit"
              disabled={sendet}
              className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-deep to-accent px-5 text-center text-[1rem] font-bold leading-tight text-white shadow-[0_8px_22px_-8px_rgba(30,79,139,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-8px_rgba(30,79,139,0.7)] disabled:cursor-wait disabled:opacity-70"
            >
              {schritt === 2 ? (
                "Weiter"
              ) : sendet ? (
                "Wird gesendet …"
              ) : (
                <>
                  Kostenlose Ersteinschätzung anfordern
                  <Send className="hidden h-4 w-4 shrink-0 sm:block" />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {schritt === 0 && (
        <p className="mt-4 flex items-center gap-2 text-[0.9rem] text-muted">
          <Phone className="h-3.5 w-3.5 text-accent" />
          Lieber telefonisch?{" "}
          <a
            href={`tel:${PHONE}`}
            data-pos="formular"
            className="font-bold text-ink hover:text-accent"
          >
            {PHONE_DISPLAY}
          </a>
        </p>
      )}
    </form>
  );
}
