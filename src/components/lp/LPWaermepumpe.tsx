"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Phone, Send } from "lucide-react";
import {
  WPHero,
  WPServices,
  WPHighlight,
  WPVorteile,
  WPLoslegen,
  WPFaq,
} from "@/components/WaermepumpenSection";

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
const PHONE = "+498261759717";
const PHONE_DISPLAY = "08261 7597176";

/* ──────────────────────────────────────────────────────
   Wärmepumpen Landing-Page – nutzt die echten Section-Designs
   ────────────────────────────────────────────────────── */
export default function LPWaermepumpe() {
  // Alle "data-open-angebot"-Buttons in den geerbten Komponenten
  // sollen auf der LP zum Lead-Formular scrollen, statt die Lightbox
  // zu öffnen (die ist auf /lp/* ausgeblendet).
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-open-angebot]");
      if (!trigger) return;
      e.preventDefault();
      document
        .getElementById("lead-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="font-[family-name:var(--font-sans)] text-ink">
      <LPHeader />
      <WPHero />
      <WPServices />
      <LeadFormBlock
        id="lead-form"
        eyebrow="Jetzt unverbindlich starten"
        title="Holen Sie sich Ihr kostenfreies Wärmepumpen-Angebot"
        subtitle="Wir melden uns innerhalb von 24 Stunden mit einem individuellen Festpreisangebot – inklusive Förderprüfung."
        quelle="LP – Wärmepumpe (Above Fold)"
      />
      <WPHighlight />
      <WPVorteile />
      <WPLoslegen />
      <LeadFormBlock
        id="lead-form-2"
        eyebrow="Bereit für Ihre neue Wärmepumpe?"
        title="Lassen Sie sich kostenfrei beraten"
        subtitle="Wir prüfen Ihre Förderfähigkeit und erstellen ein verbindliches Festpreisangebot."
        quelle="LP – Wärmepumpe (Final CTA)"
        variant="dark"
      />
      <WPFaq />
      <LPFooter />
      <MobileStickyCta />
    </div>
  );
}

/* ─── Mini-Header: Logo + Phone, kein Menü ─── */
function LPHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[4000] border-b border-[#e5edf5] bg-white/95 shadow-[0_2px_12px_-4px_rgba(15,37,51,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:px-12">
        <a href="/" className="block shrink-0">
          <img
            src="/img/logo-alab.png"
            alt="ALAB Energiesysteme"
            className="h-12 w-auto sm:h-14"
          />
        </a>
        <a
          href={`tel:${PHONE}`}
          className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-accent-deep to-accent px-5 py-2.5 text-sm font-bold text-white shadow-[0_2px_8px_-2px_rgba(30,79,139,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-4px_rgba(30,79,139,0.4)] sm:inline-flex"
        >
          <Phone className="h-4 w-4" />
          {PHONE_DISPLAY}
        </a>
        <a
          href={`tel:${PHONE}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-md sm:hidden"
          aria-label="Jetzt anrufen"
        >
          <Phone className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

/* ─── Mini-Footer ─── */
function LPFooter() {
  return (
    <footer className="border-t border-line bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 text-center text-xs text-muted sm:flex-row sm:text-left">
        <div>
          © {new Date().getFullYear()} ALAB Energiesysteme e. K. ·
          Kastanienweg 6, 87719 Mindelheim
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={`tel:${PHONE}`} className="hover:text-accent">
            {PHONE_DISPLAY}
          </a>
          <a href="/impressum" className="hover:text-accent">
            Impressum
          </a>
          <a href="/datenschutz" className="hover:text-accent">
            Datenschutz
          </a>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined")
                window.dispatchEvent(new Event("open-cookie-settings"));
            }}
            className="cursor-pointer bg-transparent text-muted hover:text-accent"
          >
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ─── Sticky CTA-Leiste für Mobile (nur unter 640px) ─── */
function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[3500] flex border-t border-line bg-white/95 shadow-[0_-4px_18px_rgba(15,37,51,0.10)] backdrop-blur-md sm:hidden">
      <a
        href={`tel:${PHONE}`}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-ink"
      >
        <Phone className="h-4 w-4" />
        Anrufen
      </a>
      <a
        href="#lead-form"
        className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-r from-accent-deep to-accent py-3.5 text-sm font-bold text-white"
      >
        Beratung anfordern
      </a>
    </div>
  );
}

/* ─── Lead-Formular Block – passt zum bestehenden Design ─── */
function LeadFormBlock({
  id,
  eyebrow,
  title,
  subtitle,
  quelle,
  variant = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  quelle: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section
      id={id}
      className={
        isDark
          ? "scroll-mt-24 bg-gradient-to-br from-[#0f2533] to-[#1e4f8b] px-7 py-[80px] text-white"
          : "scroll-mt-24 bg-[#f4f6f8] px-7 py-[80px]"
      }
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Linke Spalte: Headline + Trust Bullets */}
        <div>
          <p
            className={
              isDark
                ? "mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent"
                : "mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent"
            }
          >
            {eyebrow}
          </p>
          <h2
            className={
              isDark
                ? "mb-4 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] text-white"
                : "mb-4 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] text-ink"
            }
          >
            {title}
          </h2>
          <p
            className={
              isDark
                ? "mb-7 text-[1rem] leading-[1.75] text-white/80"
                : "mb-7 text-[1rem] leading-[1.75] text-muted"
            }
          >
            {subtitle}
          </p>

          <ul className="mb-7 space-y-3">
            {[
              "Festpreisangebot ohne versteckte Kosten",
              "Bis zu 70 % BEG-Förderung (wir übernehmen den Antrag)",
              "Einbau & Inbetriebnahme in 4–6 Wochen",
              "5 Jahre Garantie + persönlicher Ansprechpartner",
            ].map((t) => (
              <li
                key={t}
                className={
                  isDark
                    ? "flex items-start gap-3 text-[0.98rem] text-white/90"
                    : "flex items-start gap-3 text-[0.98rem] text-ink/85"
                }
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  strokeWidth={2.2}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* Telefon-Block */}
          <div
            className={
              isDark
                ? "flex flex-wrap items-center gap-3 border-t border-white/10 pt-5"
                : "flex flex-wrap items-center gap-3 border-t border-line pt-5"
            }
          >
            <a
              href={`tel:${PHONE}`}
              className={
                isDark
                  ? "inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-accent-deep shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  : "inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold text-ink transition-all hover:bg-ink hover:text-white"
              }
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <span
              className={
                isDark
                  ? "text-xs text-white/70"
                  : "text-xs text-muted"
              }
            >
              Mo–Fr 8:00–17:00 Uhr · Anruf kostenlos
            </span>
          </div>
        </div>

        {/* Rechte Spalte: Formular */}
        <LeadForm quelle={quelle} />
      </div>
    </section>
  );
}

/* ─── Lead-Formular ─── */
function LeadForm({ quelle }: { quelle: string }) {
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    telefon: "",
    email: "",
    plz: "",
    nachricht: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || sent) return;
    setError("");
    if (!form.vorname || !form.nachname || !form.telefon) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    setSubmitting(true);

    const payload = {
      Quelle: quelle,
      Seite: typeof window !== "undefined" ? window.location.href : "",
      Vorname: form.vorname,
      Nachname: form.nachname,
      Telefon: form.telefon,
      Email: form.email,
      PLZ: form.plz,
      Nachricht: form.nachricht,
      Zeitstempel: new Date().toISOString(),
    };

    try {
      await fetch(MAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (typeof window !== "undefined") {
        const dl =
          (window as unknown as { dataLayer?: object[] }).dataLayer || [];
        dl.push({
          event: "lp_lead_submit",
          form_name: quelle,
          conversion_value: 200,
          currency: "EUR",
        });
      }
      setSent(true);
      setForm({
        vorname: "",
        nachname: "",
        telefon: "",
        email: "",
        plz: "",
        nachricht: "",
      });
    } catch {
      setError(
        "Übermittlung fehlgeschlagen. Bitte direkt anrufen unter 08261 7597176.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-[24px] bg-white p-8 text-ink shadow-[0_24px_60px_-12px_rgba(15,37,51,0.20)]">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" strokeWidth={2.2} />
        </div>
        <h3 className="mb-2 text-2xl font-bold">Vielen Dank!</h3>
        <p className="text-[0.96rem] leading-relaxed text-muted">
          Ihre Anfrage wurde übermittelt. Wir melden uns innerhalb von 24
          Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] bg-white p-7 text-ink shadow-[0_24px_60px_-12px_rgba(15,37,51,0.25)] sm:p-8"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          label="Vorname"
          required
          value={form.vorname}
          onChange={(v) => setForm((f) => ({ ...f, vorname: v }))}
        />
        <Input
          label="Nachname"
          required
          value={form.nachname}
          onChange={(v) => setForm((f) => ({ ...f, nachname: v }))}
        />
      </div>
      <Input
        label="Telefonnummer"
        required
        type="tel"
        value={form.telefon}
        onChange={(v) => setForm((f) => ({ ...f, telefon: v }))}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          label="E-Mail (optional)"
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <Input
          label="PLZ"
          value={form.plz}
          onChange={(v) => setForm((f) => ({ ...f, plz: v }))}
        />
      </div>
      <Textarea
        label="Nachricht (optional)"
        value={form.nachricht}
        onChange={(v) => setForm((f) => ({ ...f, nachricht: v }))}
      />

      {error && (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[0.85rem] text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-deep to-accent px-6 py-4 text-[0.98rem] font-bold text-white shadow-[0_6px_22px_rgba(43,108,176,0.40)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(43,108,176,0.50)] disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? (
          "Wird gesendet..."
        ) : (
          <>
            Kostenfreie Beratung anfordern
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="mt-4 text-[0.75rem] leading-relaxed text-muted">
        Mit Absenden stimmen Sie der Kontaktaufnahme zu. Mehr in unserer{" "}
        <a
          href="/datenschutz"
          className="text-accent underline underline-offset-2 hover:text-accent-deep"
        >
          Datenschutzerklärung
        </a>
        .
      </p>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-[0.8rem] font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[0.94rem] text-ink outline-none transition-all placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-[0.8rem] font-semibold text-ink">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-lg border border-line bg-white px-3.5 py-2.5 text-[0.94rem] text-ink outline-none transition-all placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
