"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Phone, Send, Star } from "lucide-react";
import PrivateVorgehenSection from "@/components/private/PrivateVorgehenSection";
import PrivateKomponentenSection from "@/components/private/PrivateKomponentenSection";
import PrivateSolarrechnerSection from "@/components/private/PrivateSolarrechnerSection";
import PrivateReferenzenSection from "@/components/private/PrivateReferenzenSection";
import PrivateVorteileSection from "@/components/private/PrivateVorteileSection";

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
const PHONE = "+498261759717";
const PHONE_DISPLAY = "08261 7597176";

/* ──────────────────────────────────────────────────────────
   Photovoltaik Landing-Page für Google Ads
   Nutzt die echten Sektionen der /pv-zuhause-Seite,
   ergänzt um conversion-optimierten Hero + Lead-Formulare.
   /pv-zuhause selbst bleibt unverändert.
   ────────────────────────────────────────────────────────── */
export default function LPPhotovoltaik() {
  // Alle "data-open-angebot"-Buttons der geerbten Sektionen
  // scrollen auf der LP zum Lead-Formular (Lightbox ist auf /lp/* aus).
  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      const trigger = el?.closest<HTMLElement>("[data-open-angebot]");
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
      <Hero />
      <TrustBar />
      <PrivateVorteileSection />
      <PrivateSolarrechnerSection />
      <PrivateVorgehenSection />
      <PrivateKomponentenSection />
      <PrivateReferenzenSection />
      <FinalCta />
      <LPFooter />
      <MobileStickyCta />
    </div>
  );
}

/* ─── Mini-Header: Logo + Telefon, keine Navigation ─── */
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

/* ─── Hero mit Lead-Formular ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2533] via-[#1a3a4f] to-[#0f2533] px-5 pb-14 pt-[110px] text-white sm:pb-20 sm:pt-[140px] lg:px-8">
      <div
        aria-hidden
        className="absolute -left-32 -top-20 h-[460px] w-[460px] rounded-full bg-accent/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]"
      />

      <div
        id="lead-form"
        className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-10 scroll-mt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
      >
        {/* Linke Spalte */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Aus Mindelheim – im ganzen Allgäu für Sie da
          </div>

          <h1 className="mb-5 text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.01em]">
            Ihre eigene Photovoltaikanlage –{" "}
            <span className="text-accent">schlüsselfertig zum Festpreis</span>
          </h1>

          <p className="mb-7 max-w-[560px] text-[1.05rem] leading-[1.7] text-white/80">
            Erzeugen Sie Ihren eigenen Strom und senken Sie dauerhaft Ihre
            Energiekosten. Planung, Montage und Inbetriebnahme aus einer Hand –
            vom Ingenieurbüro & zertifizierten Elektrofachbetrieb.
          </p>

          <ul className="mb-7 space-y-3">
            {[
              "Festpreisangebot – ohne versteckte Kosten",
              "PV-Anlage mit Stromspeicher & Wallbox aus einer Hand",
              "Eigene Fachkräfte – keine Subunternehmer",
              "0 % MwSt. auf private PV-Anlagen",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[0.98rem]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-white/90">{t}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-5 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="text-[0.85rem] text-white/70">
                4,9 ★ bei über 70 Google-Bewertungen
              </span>
            </div>
          </div>
        </div>

        {/* Rechte Spalte: Formular */}
        <LeadForm
          quelle="LP – Photovoltaik (Hero)"
          heading="Kostenloses Angebot anfordern"
          subheading="Wir melden uns innerhalb von 24 Stunden mit Ihrem persönlichen Festpreisangebot."
        />
      </div>
    </section>
  );
}

/* ─── Trust-Bar ─── */
function TrustBar() {
  const items = [
    { value: "200+", label: "installierte Anlagen" },
    { value: "0 %", label: "MwSt. auf PV privat" },
    { value: "4,9 ★", label: "Kundenbewertung" },
    { value: "1 Hand", label: "Planung bis Montage" },
  ];
  return (
    <section className="border-b border-line bg-white px-5 py-7 lg:px-8">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <div className="text-[clamp(1.3rem,3vw,1.9rem)] font-bold text-accent">
              {it.value}
            </div>
            <div className="mt-1 text-[0.78rem] font-semibold text-muted">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Final CTA mit Formular + Telefon ─── */
function FinalCta() {
  return (
    <section
      id="lead-form-final"
      className="scroll-mt-24 bg-gradient-to-br from-[#0f2533] to-[#1e4f8b] px-5 py-16 text-white sm:py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="mb-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight">
            Bereit für Ihre eigene Solaranlage?
          </h2>
          <p className="mb-7 text-[1rem] leading-[1.7] text-white/80">
            Fordern Sie jetzt Ihr kostenfreies Festpreisangebot an. Wir beraten
            Sie persönlich und unverbindlich – von der Auslegung bis zur
            Förderung.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={`tel:${PHONE}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-base font-bold text-accent-deep shadow-[0_6px_22px_rgba(255,255,255,0.20)] transition-all hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5" />
              {PHONE_DISPLAY}
            </a>
            <span className="text-sm text-white/70">
              Mo–Fr 8:00–17:00 Uhr · Anruf kostenlos
            </span>
          </div>
        </div>

        <LeadForm
          quelle="LP – Photovoltaik (Final CTA)"
          heading="Schneller per Formular"
          subheading="Rückruf innerhalb von 24 Stunden."
        />
      </div>
    </section>
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

/* ─── Mobile Sticky CTA ─── */
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
        Angebot anfordern
      </a>
    </div>
  );
}

/* ─── Lead-Formular (Hero + Final CTA) ─── */
function LeadForm({
  quelle,
  heading,
  subheading,
}: {
  quelle: string;
  heading: string;
  subheading: string;
}) {
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
          conversion_value: 150,
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
      <div className="rounded-[24px] bg-white p-8 text-ink shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)]">
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
      className="rounded-[24px] bg-white p-7 text-ink shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)] sm:p-8"
    >
      <h3 className="mb-1 text-xl font-bold text-ink">{heading}</h3>
      <p className="mb-5 text-[0.88rem] leading-relaxed text-muted">
        {subheading}
      </p>

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
        className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-deep to-accent px-6 py-4 text-[0.98rem] font-bold text-white shadow-[0_6px_22px_rgba(43,108,176,0.40)] transition-all hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? (
          "Wird gesendet..."
        ) : (
          <>
            Kostenloses Angebot anfordern
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
