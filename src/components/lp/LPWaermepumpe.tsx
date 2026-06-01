"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Star,
  Phone,
  Award,
  Clock,
  Wallet,
  Leaf,
  Zap,
  Shield,
  ChevronRight,
  Send,
} from "lucide-react";

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
const PHONE = "+498261759717";
const PHONE_DISPLAY = "08261 7597176";

/* ──────────────────────────────────────────────────────
   ALAB Energiesysteme – Wärmepumpen Ads-Landing-Page
   Conversion-optimiert, kein Hauptnavi-Header
   ────────────────────────────────────────────────────── */

export default function LPWaermepumpe() {
  return (
    <div className="font-[family-name:var(--font-sans)] text-ink">
      <MiniHeader />
      <Hero />
      <Vorteile />
      <Prozess />
      <SocialProof />
      <FAQ />
      <FinalCta />
      <MiniFooter />
    </div>
  );
}

/* ─── Minimaler Header: nur Logo, keine Navi ─── */
function MiniHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 lg:px-8">
        <a href="/" className="block">
          <img
            src="/img/logo-alab.png"
            alt="ALAB Energiesysteme"
            className="h-12 w-auto sm:h-14"
          />
        </a>
        <a
          href={`tel:${PHONE}`}
          className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(43,108,176,0.35)] transition-all hover:bg-accent-deep sm:inline-flex"
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

/* ─── Hero mit Lead-Formular rechts ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2533] via-[#1a3a4f] to-[#0f2533] px-5 py-14 text-white sm:py-20 lg:px-8 lg:py-24">
      {/* Subtiler Akzent-Glow */}
      <div
        aria-hidden
        className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Linke Spalte: Pitch */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Aus 87719 Mindelheim – deutschlandweit
          </div>

          <h1 className="mb-5 text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.01em]">
            Wärmepumpe schlüsselfertig –{" "}
            <span className="text-accent">bis 70 % Förderung</span> sichern.
          </h1>

          <p className="mb-7 max-w-[560px] text-[1.05rem] leading-[1.7] text-white/80">
            Ingenieurbüro &amp; zertifizierter Elektrofachbetrieb. Wir planen,
            beantragen die BEG-Förderung und bauen Ihre Luft-Wasser-Wärmepumpe
            schlüsselfertig ein – ohne versteckte Kosten.
          </p>

          {/* USPs */}
          <ul className="mb-7 space-y-3">
            {[
              "Festpreisangebot – keine Überraschungen",
              "Bis zu 70 % BEG-Förderung (wir übernehmen den Antrag)",
              "Einbau & Inbetriebnahme in nur 4–6 Wochen",
              "5 Jahre Garantie + persönlicher Ansprechpartner",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[0.98rem]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-white/90">{t}</span>
              </li>
            ))}
          </ul>

          {/* Trust */}
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
                Über 200 zufriedene Kunden
              </span>
            </div>
            <div className="flex items-center gap-2 text-[0.85rem] text-white/70">
              <Shield className="h-4 w-4 text-accent" />
              Zertifizierter Elektrofachbetrieb
            </div>
          </div>
        </div>

        {/* Rechte Spalte: Lead-Formular */}
        <LeadForm
          quelle="LP – Wärmepumpe (Hero)"
          heading="Jetzt kostenfrei beraten"
          subheading="Wir melden uns innerhalb von 24 h mit einem persönlichen Angebot."
        />
      </div>
    </section>
  );
}

/* ─── 3 Vorteile ─── */
function Vorteile() {
  const items = [
    {
      icon: Wallet,
      title: "Heizkosten senken",
      text: "Eine moderne Wärmepumpe spart bis zu 60 % gegenüber Öl oder Gas – Jahr für Jahr.",
    },
    {
      icon: Award,
      title: "Bis 70 % Förderung",
      text: "BEG-Zuschuss + Klimageschwindigkeitsbonus + Einkommensbonus – wir übernehmen den Antrag.",
    },
    {
      icon: Leaf,
      title: "Klimafreundlich heizen",
      text: "Mit PV-Strom heizen Sie nahezu emissionsfrei – unabhängig von fossilen Brennstoffen.",
    },
  ];
  return (
    <section className="bg-white px-5 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Ihre Vorteile
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-ink">
            Warum eine Wärmepumpe von ALAB?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[20px] border border-line bg-white p-7 shadow-[0_4px_18px_rgba(15,37,51,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_38px_rgba(15,37,51,0.10)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                <Icon className="h-7 w-7 text-accent" strokeWidth={1.7} />
              </div>
              <h3 className="mb-2 text-[1.15rem] font-bold text-ink">
                {title}
              </h3>
              <p className="text-[0.94rem] leading-[1.7] text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Prozess: 3 Schritte ─── */
function Prozess() {
  const steps = [
    {
      icon: Phone,
      title: "Anfrage in 60 Sekunden",
      text: "Sie füllen unser kurzes Formular aus oder rufen direkt an. Kostenlos & unverbindlich.",
    },
    {
      icon: Clock,
      title: "Persönliche Beratung",
      text: "Wir analysieren Ihre Heizsituation und erstellen ein transparentes Festpreisangebot inkl. Förderprüfung.",
    },
    {
      icon: Zap,
      title: "Einbau in 4–6 Wochen",
      text: "Unser Team installiert Ihre Wärmepumpe schlüsselfertig – inklusive Inbetriebnahme & Einweisung.",
    },
  ];
  return (
    <section className="bg-[#f8fafb] px-5 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            So einfach geht's
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-ink">
            In 3 Schritten zu Ihrer Wärmepumpe
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="rounded-[20px] bg-white p-7 shadow-[0_4px_18px_rgba(15,37,51,0.05)]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-[0_4px_14px_rgba(43,108,176,0.35)]">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 text-[1.1rem] font-bold text-ink">
                  {s.title}
                </h3>
                <p className="text-[0.94rem] leading-[1.7] text-muted">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Social Proof: 2 Testimonials + Stats ─── */
function SocialProof() {
  return (
    <section className="bg-white px-5 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Stats Strip */}
        <div className="mb-12 grid grid-cols-3 gap-4 rounded-[20px] border border-line bg-[#f8fafb] p-6 text-center sm:p-8">
          <div>
            <div className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-accent">
              200+
            </div>
            <div className="mt-1 text-[0.8rem] font-semibold text-muted">
              installierte Anlagen
            </div>
          </div>
          <div className="border-x border-line">
            <div className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-accent">
              70 %
            </div>
            <div className="mt-1 text-[0.8rem] font-semibold text-muted">
              max. Förderung
            </div>
          </div>
          <div>
            <div className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-accent">
              5 ★
            </div>
            <div className="mt-1 text-[0.8rem] font-semibold text-muted">
              Kundenbewertung
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              quote:
                "Top Ablauf von Anfang bis Ende. Super Kommunikation, saubere Planung und die Anlage war in drei Tagen montiert. Anlage läuft einwandfrei – klare Empfehlung!",
              name: "Asim Berisha",
              location: "Privatkunde, Mindelheim",
            },
            {
              quote:
                "Erstklassiger Service und professionelle Umsetzung! Die Anlage wurde termingerecht und sauber installiert. Bin rundum zufrieden – klare Empfehlung!",
              name: "Zehra K.",
              location: "Privatkundin",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-[20px] border border-line bg-[#f8fafb] p-7"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mb-5 text-[0.95rem] leading-[1.75] italic text-ink/85">
                „{t.quote}"
              </p>
              <div>
                <div className="text-[0.92rem] font-bold text-ink">
                  {t.name}
                </div>
                <div className="text-[0.82rem] text-muted">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Kurz-FAQ ─── */
function FAQ() {
  const items = [
    {
      q: "Wie viel kostet eine Wärmepumpe inkl. Einbau?",
      a: "Die Kosten hängen von Heizlast und Gebäude ab. Nach einer kurzen Vor-Ort-Analyse erstellen wir Ihnen ein transparentes Festpreisangebot – ohne versteckte Kosten.",
    },
    {
      q: "Bekomme ich Förderung?",
      a: "Ja. Über die BEG sind bis zu 70 % Förderung möglich (Grundförderung + Klimageschwindigkeitsbonus + Einkommensbonus). Den Antrag übernehmen wir komplett für Sie.",
    },
    {
      q: "Wie lange dauert der Einbau?",
      a: "Vom Erstgespräch bis zur Inbetriebnahme typisch 4–6 Wochen. Die eigentliche Montage dauert nur 1–3 Tage.",
    },
    {
      q: "Funktioniert die Wärmepumpe auch im Winter?",
      a: "Ja. Moderne Luft-Wasser-Wärmepumpen arbeiten bis ca. -20 °C effizient. Für extreme Tiefsttemperaturen unterstützt ein elektrischer Heizstab automatisch.",
    },
  ];
  return (
    <section className="bg-[#f8fafb] px-5 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[860px]">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            FAQ
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-ink">
            Häufig gestellte Fragen
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((it) => (
            <details
              key={it.q}
              className="group rounded-[16px] border border-line bg-white p-5 transition-shadow open:shadow-[0_8px_28px_rgba(15,37,51,0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-[1rem] font-semibold text-ink">
                  {it.q}
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-[0.94rem] leading-[1.75] text-muted">
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA mit Form + Telefon ─── */
function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-[#0f2533] to-[#1e4f8b] px-5 py-16 text-white sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="mb-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight">
            Bereit für Ihre neue Wärmepumpe?
          </h2>
          <p className="mb-7 text-[1rem] leading-[1.7] text-white/80">
            Vereinbaren Sie jetzt Ihr kostenfreies Beratungsgespräch. Wir prüfen
            Ihre Förderfähigkeit und erstellen Ihnen ein verbindliches
            Festpreisangebot.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={`tel:${PHONE}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-base font-bold text-accent-deep shadow-[0_6px_22px_rgba(255,255,255,0.20)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.30)]"
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
          quelle="LP – Wärmepumpe (Final CTA)"
          heading="Schneller per Formular"
          subheading="Rückruf innerhalb von 24 h."
          variant="onDark"
        />
      </div>
    </section>
  );
}

/* ─── Minimaler Footer (nur Pflichtangaben + Cookie) ─── */
function MiniFooter() {
  return (
    <footer className="border-t border-line bg-white px-5 py-7 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-center text-xs text-muted sm:flex-row sm:text-left">
        <div>
          © {new Date().getFullYear()} ALAB Energiesysteme e. K. ·
          Kastanienweg 6, 87719 Mindelheim
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
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

/* ──────────────────────────────────────────────────────
   Lead-Formular (wiederverwendbar – Hero + Final CTA)
   ────────────────────────────────────────────────────── */
function LeadForm({
  quelle,
  heading,
  subheading,
  variant = "onLight",
}: {
  quelle: string;
  heading: string;
  subheading: string;
  variant?: "onLight" | "onDark";
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
      // GTM-Event für Conversion-Tracking
      if (typeof window !== "undefined") {
        const dl = (window as unknown as { dataLayer?: object[] }).dataLayer ||
          [];
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

  const isDark = variant === "onDark";
  const cardClass = isDark
    ? "rounded-[24px] bg-white p-7 text-ink shadow-[0_24px_60px_-12px_rgba(0,0,0,0.40)] sm:p-8"
    : "rounded-[24px] bg-white p-7 text-ink shadow-[0_24px_60px_-12px_rgba(15,37,51,0.25)] sm:p-8";

  if (sent) {
    return (
      <div className={cardClass}>
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-7 w-7 text-green-600" strokeWidth={2.2} />
        </div>
        <h3 className="mb-2 text-xl font-bold">Vielen Dank!</h3>
        <p className="text-[0.94rem] leading-relaxed text-muted">
          Ihre Anfrage wurde übermittelt. Wir melden uns innerhalb von 24
          Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cardClass}>
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
        label="Telefon"
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
        className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_6px_22px_rgba(43,108,176,0.40)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_10px_30px_rgba(43,108,176,0.50)] disabled:cursor-wait disabled:opacity-70"
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
        Mit Absenden stimmen Sie der Kontaktaufnahme zu. Mehr in der{" "}
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
    <label className="block">
      <span className="mb-1 block text-[0.78rem] font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[0.92rem] text-ink outline-none transition-all placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
    <label className="mb-3 mt-3 block">
      <span className="mb-1 block text-[0.78rem] font-semibold text-ink">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-lg border border-line bg-white px-3.5 py-2.5 text-[0.92rem] text-ink outline-none transition-all placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
