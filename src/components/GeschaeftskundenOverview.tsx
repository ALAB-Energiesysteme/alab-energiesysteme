"use client";

import {
  ArrowRight,
  Star,
  Phone,
  CheckCircle,
  Home,
  Building2,
  Factory,
  Warehouse,
  HelpCircle,
  Users,
  Sun as SunIcon,
  BatteryCharging as BatteryIcon,
  Flame as FlameIcon,
  Zap as ZapIcon,
  Lightbulb as LightbulbIcon,
  ShieldCheck as ShieldIcon,
  ThumbsUp,
  ThumbsDown,
  Send,
  ChevronLeft,
} from "lucide-react";

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
import { useEffect, useState } from "react";
import HeroCardShowcase, {
  type HeroCardShowcaseItem,
} from "@/components/HeroCardShowcase";

/* ═══════════════════════════════════════════════
   SERVICE DATA
   ═══════════════════════════════════════════════ */
interface ServiceItem {
  image: string;
  title: string;
  description: string;
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    image: "/img/geschaeftskunden/ladesaeulen-geschaeftskunden.png",
    title: "Ladesäulen",
    description:
      "Professionelle Ladeinfrastruktur für Ihren Betrieb – von der Wallbox bis zur Schnellladesäule.",
    href: "/ladesaeulen",
  },
  {
    image: "/img/geschaeftskunden/pv-gewerbe-geschaeftskunden.png",
    title: "Photovoltaik für Ihr Gewerbe",
    description:
      "Senken Sie Ihre Stromkosten um bis zu 70 % mit einer maßgeschneiderten gewerblichen PV-Anlage.",
    href: "/gewerbliche-loesungen",
  },
  {
    image: "/img/geschaeftskunden/servicepaketen-geschaeftskunden.png",
    title: "Servicepakete",
    description:
      "Montage, Wartung, Monitoring und Betriebsführung für Ihre PV-Anlage – alles in einem Paket.",
    href: "/servicepakete",
  },
  {
    image: "/img/geschaeftskunden/dachverpachtung-geschaeftskunden.png",
    title: "Dachverpachtung",
    description:
      "Vermieten Sie Ihre Dachfläche und profitieren Sie ohne eigene Investition von der Energiewende.",
    href: "/dachverpachtung",
  },
];

const GK_HERO_CARDS: HeroCardShowcaseItem[] = [
  {
    title: "PV für Gewerbedächer",
    subtitle: "Skalierbar für Hallen und Betriebe",
    text: "Wirtschaftlich geplante Photovoltaiksysteme für Gewerbeflächen, Eigenverbrauch und langfristige Kostensicherheit.",
    image: "/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach1.png",
    imageMode: "contain",
    imageBgClassName: "bg-[#eef4fc]",
  },
  {
    title: "Speicher & Lastmanagement",
    subtitle: "Verbrauch intelligent optimieren",
    text: "Mehr Eigenverbrauch, saubere Lastprofile und ein Energiesystem, das auch im laufenden Betrieb ruhig funktioniert.",
    image: "/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach2.jpg",
  },
  {
    title: "Monitoring & Service",
    subtitle: "Dauerhaft wirtschaftlich betreiben",
    text: "Von Live-Daten bis Wartung: Wir begleiten Ihre Anlage so, dass Verfügbarkeit, Transparenz und Ertrag zusammenpassen.",
    image: "/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach3.png",
    imageMode: "contain",
    imageBgClassName: "bg-[#eef4fc]",
  },
];

/* ═══════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote:
      "Die PV-Anlage auf unserer Lagerhalle wurde termingerecht und sauber installiert. Die Beratung war von Anfang an transparent und professionell.",
    name: "Thomas K.",
    location: "Geschäftsführer, Mindelheim",
  },
  {
    quote:
      "Wir haben unsere komplette Hallenelektrik modernisieren lassen. Das Team hat effizient gearbeitet und den laufenden Betrieb kaum gestört.",
    name: "Andrea H.",
    location: "Betriebsleiterin, Friesoythe",
  },
  {
    quote:
      "Die Ladeinfrastruktur für unseren Fuhrpark wurde perfekt geplant. Unsere Mitarbeiter laden jetzt bequem während der Arbeitszeit.",
    name: "Markus R.",
    location: "Flottenmanager, Cloppenburg",
  },
];

/* ═══════════════════════════════════════════════
   USP DATA
   ═══════════════════════════════════════════════ */
const USPS = [
  "Maßgeschneiderte Lösungen für Gewerbe und Industrie",
  "Eigene Elektromeister und Fachkräfte",
  "Minimale Betriebsunterbrechung bei der Installation",
  "Wartung, Monitoring und Service aus einer Hand",
  "Regionale Nähe und schnelle Reaktionszeiten",
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function GeschaeftskundenOverview() {
  return (
    <>
      <GKHero />
      <GKServices />
      <GKAbout />
      <GKBeratungsformular />
      <GKCta />
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO (image only, cards overlap)
   ═══════════════════════════════════════════════ */
function GKHero() {
  return (
    <section className="relative w-full overflow-visible bg-ink">
      <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden md:h-[60vh] md:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/40 via-ink/50 to-ink/80" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES GRID (overlapping into hero)
   ═══════════════════════════════════════════════ */
function GKServices() {
  return (
    <section
      id="leistungen"
      className="relative z-10 -mt-[180px] scroll-mt-24 px-4 pb-20 sm:px-6 md:-mt-[200px] lg:px-8"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-white/70">
            Für Ihr Unternehmen von morgen
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl [text-shadow:0_4px_20px_rgba(0,0,0,0.3)]">
            Unsere Leistungen
          </h2>
          <div className="mx-auto h-[3px] w-14 rounded-full bg-accent" />
        </div>

        {/* 4 Karten – 1 / 2 / 4 Spalten responsiv */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_4px_20px_rgba(15,37,51,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(15,37,51,0.12)]"
            >
              <div className="h-[200px] w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-[1.1rem] font-bold text-ink">{s.title}</h3>
                <p className="mb-5 flex-1 text-[0.9rem] leading-relaxed text-muted">
                  {s.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT / USP SECTION
   ═══════════════════════════════════════════════ */
function GKAbout() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Warum ALAB Energiesysteme
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Ihr Partner für gewerbliche Energielösungen.
          </h2>
          <div className="mb-8 h-[3px] w-14 rounded-full bg-accent" />

          <p className="mb-6 text-[0.95rem] leading-relaxed text-muted">
            Ob Photovoltaik, Ladeinfrastruktur oder Hallenelektrik – als Ingenieurbüro und
            zertifizierter Elektrofachbetrieb planen und realisieren wir gewerbliche
            Energieprojekte mit höchster Qualität. Wir setzen auf eigene Ingenieure und
            Fachkräfte, kurze Kommunikationswege und transparente Prozesse.
          </p>
          <p className="mb-8 text-[0.95rem] leading-relaxed text-muted">
            Von der Erstberatung über die Projektierung bis zur Inbetriebnahme begleiten wir Sie
            durchgängig. Unser Ziel: maximale Wirtschaftlichkeit und minimale Betriebsunterbrechung
            für Ihr Unternehmen.
          </p>

          <p className="mb-5 text-sm font-bold text-ink">Was uns auszeichnet:</p>
          <ul className="space-y-3">
            {USPS.map((usp) => (
              <li key={usp} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
                <span className="text-[0.95rem] text-muted">{usp}</span>
              </li>
            ))}
          </ul>

          <a
            href="#angebot"
            data-open-angebot="geschaeftskunden-projekt-anfragen"
            className="group mt-10 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
          >
            Jetzt Projekt anfragen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="flex flex-col gap-8">
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.1)]">
            <img
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
              alt="ALAB Energiesysteme gewerbliches Projekt"
              className="h-[320px] w-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   BERATUNGSFORMULAR (Multi-Step)
   ═══════════════════════════════════════════════ */

interface TileOption {
  icon: React.ElementType;
  label: string;
  value: string;
}

const STEP_GEBAEUDE: TileOption[] = [
  { icon: Warehouse, label: "Lagerhalle", value: "lagerhalle" },
  { icon: Factory, label: "Produktionshalle", value: "produktionshalle" },
  { icon: Building2, label: "Bürogebäude", value: "buerogebaeude" },
  { icon: Home, label: "Gewerbefläche", value: "gewerbeflaeche" },
  { icon: HelpCircle, label: "Sonstiges", value: "sonstiges" },
];

const STEP_MITARBEITER: TileOption[] = [
  { icon: Users, label: "1–10 Mitarbeiter", value: "1-10" },
  { icon: Users, label: "11–50 Mitarbeiter", value: "11-50" },
  { icon: Users, label: "Über 50 Mitarbeiter", value: "50+" },
];

const STEP_LEISTUNG_GK: TileOption[] = [
  { icon: ZapIcon, label: "Hallenelektroinstallation", value: "hallenelektro" },
  { icon: BatteryIcon, label: "Ladesäulen", value: "ladesaeulen" },
  { icon: SunIcon, label: "Photovoltaik", value: "pv" },
  { icon: FlameIcon, label: "Wärmepumpen", value: "waermepumpe" },
  { icon: ShieldIcon, label: "Servicepakete", value: "service" },
  { icon: LightbulbIcon, label: "Dachverpachtung", value: "dachverpachtung" },
];

const STEP_JA_NEIN: TileOption[] = [
  { icon: ThumbsUp, label: "Ja", value: "ja" },
  { icon: ThumbsDown, label: "Nein", value: "nein" },
];

function GKBeratungsformular() {
  const [step, setStep] = useState(0);
  const [gebaeude, setGebaeude] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState("");
  const [leistung, setLeistung] = useState("");
  const [pvVorhanden, setPvVorhanden] = useState("");
  const [wpVorhanden, setWpVorhanden] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firma: "",
    ansprechpartner: "",
    plz: "",
    ort: "",
    email: "",
    telefon: "",
  });

  type StepDef =
    | { type: "tiles"; title: string; options: TileOption[]; value: string; onSelect: (v: string) => void }
    | { type: "contact" }
    | { type: "success" };

  const steps: StepDef[] = [
    {
      type: "tiles",
      title: "Um welchen Gebäudetyp handelt es sich?",
      options: STEP_GEBAEUDE,
      value: gebaeude,
      onSelect: (v) => { setGebaeude(v); setStep((s) => s + 1); },
    },
    {
      type: "tiles",
      title: "Wie viele Mitarbeiter hat Ihr Unternehmen?",
      options: STEP_MITARBEITER,
      value: mitarbeiter,
      onSelect: (v) => { setMitarbeiter(v); setStep((s) => s + 1); },
    },
    {
      type: "tiles",
      title: "Für welche Leistung interessieren Sie sich?",
      options: STEP_LEISTUNG_GK,
      value: leistung,
      onSelect: (v) => {
        setLeistung(v);
        setPvVorhanden("");
        setWpVorhanden("");
        setStep((s) => s + 1);
      },
    },
  ];

  if (leistung === "waermepumpe") {
    steps.push({
      type: "tiles",
      title: "Photovoltaik bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: pvVorhanden,
      onSelect: (v) => { setPvVorhanden(v); setStep((s) => s + 1); },
    });
  } else if (leistung === "pv") {
    steps.push({
      type: "tiles",
      title: "Wärmepumpe bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: wpVorhanden,
      onSelect: (v) => { setWpVorhanden(v); setStep((s) => s + 1); },
    });
  } else if (leistung !== "") {
    steps.push({
      type: "tiles",
      title: "Wärmepumpe bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: wpVorhanden,
      onSelect: (v) => { setWpVorhanden(v); setStep((s) => s + 1); },
    });
    steps.push({
      type: "tiles",
      title: "Photovoltaik bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: pvVorhanden,
      onSelect: (v) => { setPvVorhanden(v); setStep((s) => s + 1); },
    });
  }

  steps.push({ type: "contact" });
  steps.push({ type: "success" });

  const totalVisibleSteps = steps.length - 1;
  const currentStep = steps[step];
  const progress = Math.round(((step + 1) / totalVisibleSteps) * 100);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      Quelle: "Geschäftskunden – Erstberatung (mehrstufig)",
      Seite: typeof window !== "undefined" ? window.location.href : "",
      Gebaeudetyp: gebaeude,
      Mitarbeiter: mitarbeiter,
      Leistung: leistung,
      PV_vorhanden: pvVorhanden,
      WP_vorhanden: wpVorhanden,
      Firma: form.firma,
      Ansprechpartner: form.ansprechpartner,
      PLZ: form.plz,
      Ort: form.ort,
      Email: form.email,
      Telefon: form.telefon,
      Zeitstempel: new Date().toISOString(),
    };

    try {
      await fetch(MAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Lead-Versand fehlgeschlagen:", err);
    }

    setStep(steps.length - 1);
    setSubmitting(false);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <section id="erstberatung-gk" className="scroll-mt-24 bg-accent px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
          Kostenfreie Erstberatung vereinbaren
        </h2>

        {currentStep?.type !== "success" && (
          <div className="mx-auto mt-8 mb-10 max-w-[600px]">
            <div className="mb-2 flex justify-between text-xs font-semibold text-white/70">
              <span>Schritt {step + 1} von {totalVisibleSteps}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {currentStep?.type === "tiles" && (
          <div className="text-center">
            <h3 className="mb-8 text-xl font-bold text-white md:text-2xl">
              {currentStep.title}
            </h3>
            <div className={`mx-auto grid gap-4 ${
              currentStep.options.length === 2
                ? "max-w-[500px] grid-cols-2"
                : currentStep.options.length === 3
                ? "max-w-[700px] grid-cols-1 sm:grid-cols-3"
                : currentStep.options.length === 5
                ? "max-w-[900px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                : "max-w-[900px] grid-cols-2 sm:grid-cols-3"
            }`}>
              {currentStep.options.map((opt) => {
                const isSelected = currentStep.value === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => currentStep.onSelect(opt.value)}
                    className={`group flex flex-col items-center gap-4 rounded-[var(--radius-card)] border-2 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] ${
                      isSelected
                        ? "border-accent-deep shadow-[0_0_0_2px_var(--color-accent-deep)]"
                        : "border-transparent"
                    }`}
                  >
                    <opt.icon
                      className="h-12 w-12 text-accent transition-transform duration-200 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-semibold text-ink">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                onClick={goBack}
                className="mx-auto mt-8 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-ink/80 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink"
              >
                <ChevronLeft className="h-4 w-4" />
                Zurück
              </button>
            )}
          </div>
        )}

        {currentStep?.type === "contact" && (
          <div className="mx-auto max-w-[650px] text-center">
            <h3 className="mb-8 text-xl font-bold text-white md:text-2xl">
              Ihre Kontaktdaten
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(["firma", "ansprechpartner", "plz", "ort", "email", "telefon"] as const).map((field) => {
                const isOptional = field === "firma";
                return (
                  <input
                    key={field}
                    type={field === "email" ? "email" : field === "telefon" ? "tel" : "text"}
                    placeholder={
                      field === "firma" ? "Firmenname (optional)" :
                      field === "ansprechpartner" ? "Ansprechpartner*" :
                      field === "plz" ? "PLZ*" :
                      field === "ort" ? "Ort*" :
                      field === "email" ? "E-Mail-Adresse*" :
                      "Telefonnummer*"
                    }
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="rounded-xl border-0 bg-white px-5 py-4 text-sm text-ink shadow-sm outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-accent-deep"
                    required={!isOptional}
                  />
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                submitting || !form.ansprechpartner || !form.plz || !form.ort || !form.email || !form.telefon
              }
              className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-ink px-10 py-4 text-sm font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-0.5 hover:bg-ink-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Wird gesendet..." : "Jetzt anfragen"}
            </button>

            <div className="mt-4">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-ink/80 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink"
              >
                <ChevronLeft className="h-4 w-4" />
                Zurück
              </button>
            </div>
          </div>
        )}

        {currentStep?.type === "success" && (
          <div className="mx-auto max-w-[500px] rounded-[var(--radius-card)] bg-white p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" strokeWidth={2} />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-ink">Vielen Dank!</h3>
            <p className="text-[0.95rem] leading-relaxed text-muted">
              Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════ */
function GKTestimonials() {
  return (
    <section className="bg-ink px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Unsere Kundenstimmen
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-14 rounded-full bg-accent" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <span className="absolute -top-2 left-6 text-5xl font-bold leading-none text-accent/40">
                &ldquo;
              </span>
              <div className="mb-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mb-6 text-[0.95rem] italic leading-relaxed text-white/80">
                &bdquo;{t.quote}&ldquo;
              </p>
              <div>
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-white/50">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════ */
function GKCta() {
  return (
    <section className="bg-[#f8fafb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[800px] text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
          Projekt starten
        </p>
        <h2 className="mb-4 text-3xl font-bold text-ink md:text-4xl">
          Bereit für Ihr nächstes Projekt?
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-[0.95rem] leading-relaxed text-muted">
          Von der Erstberatung bis zur Inbetriebnahme – wir realisieren Ihr gewerbliches
          Energieprojekt professionell und termingerecht.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#angebot"
            data-open-angebot="geschaeftskunden-cta-final"
            className="group inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
          >
            Angebot einholen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+4982617597176"
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line px-8 py-4 text-sm font-semibold text-ink transition-all hover:border-accent/40 hover:bg-accent/5"
          >
            <Phone className="h-4 w-4" />
            Direkt anrufen
          </a>
        </div>
      </div>
    </section>
  );
}
