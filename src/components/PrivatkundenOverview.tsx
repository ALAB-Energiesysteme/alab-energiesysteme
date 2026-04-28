"use client";

import {
  ArrowRight,
  Star,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ServiceItem {
  image: string;
  title: string;
  description: string;
  href: string;
  objectPosition?: string;
}

const SERVICES: ServiceItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    title: "Photovoltaik",
    description:
      "Solarstrom vom eigenen Dach – maßgeschneiderte PV-Anlagen für maximale Unabhängigkeit und Ersparnis.",
    href: "/pv-zuhause",
  },
  {
    image: "/wallbox-bild.png",
    title: "Wallboxen",
    description:
      "Intelligente Ladelösungen für Ihr Elektrofahrzeug – sicher, schnell und perfekt integriert.",
    href: "/wallbox",
  },
  {
    image: "/wp-card-installation.png",
    title: "Wärmepumpen",
    description:
      "Effizient heizen mit modernster Technologie – bis zu 70 % staatlich gefördert.",
    href: "/waermepumpen",
  },
  {
    image: "/gebaeudeenergie-card.png",
    title: "Gebäudeenergie",
    description:
      "Energieversorgung, Schaltanlagen und Elektroinstallation – normgerecht und zukunftssicher.",
    href: "/gebaeudeenergie",
    objectPosition: "center 70%",
  },
  {
    image: "/beleuchtung-restaurant.png",
    title: "Beleuchtungstechnik",
    description:
      "Architektonische Lichtplanung und professionelle Installation – alles aus einer Hand.",
    href: "/beleuchtungstechnik",
  },
  {
    image: "/servicepaketen-bild.jpeg",
    title: "Service & Wartung",
    description:
      "Professionelle PV-Wartung und Anlagenüberwachung – für maximale Erträge und Sicherheit.",
    href: "/wartung",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Erstklassiger Service und professionelle Umsetzung! Die Solaranlage wurde termingerecht und sauber installiert. Bin rundum zufrieden – klare Empfehlung!",
    name: "Zehra",
  },
  {
    quote:
      "Top Ablauf von Anfang bis Ende. Eine super Kommunikation, saubere Planung und die Anlage war in drei Tagen montiert. Ein fester Ansprechpartner war jederzeit erreichbar und die Abstimmung lief super. Dazu gab's eine ausführliche Dokumentation. Anlage läuft einwandfrei, weshalb ich ALAB Energiesysteme klar empfehle.",
    name: "Asim Berisha",
  },
  {
    quote:
      "Top Firma, freundliche, kompetente Mitarbeiter - sehr zu empfehlen!",
    name: "Beatrix Düthorn",
  },
];

const USPS = [
  "Persönliche Beratung und Planung für Ihr Zuhause",
  "Eigene Fachkräfte für Installation und Service",
  "Regionale Nähe und schnelle Erreichbarkeit",
  "Effiziente und nachhaltige Technik",
  "Qualität, die man spürt – von Anfang an",
];



/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN COMPONENT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function PrivatkundenOverview() {
  return (
    <>
      <PKHero />
      <PKServices />
      <PKAbout />
      <PKBeratungsformular />
      <PKTestimonials />
      <PKCta />
    </>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HERO + SERVICES (overlapping)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function PKHero() {
  return (
    <section className="relative w-full overflow-visible bg-ink">
      {/* Background image â€" taller to allow cards to overlap */}
      <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden md:h-[60vh] md:min-h-[480px] max-[767px]:h-[42vh] max-[767px]:min-h-[300px] max-[479px]:h-[38vh] max-[479px]:min-h-[260px]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/40 via-ink/50 to-ink/80" />
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SERVICES GRID (overlapping into hero)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function PKServices() {
  return (
    <section
      id="leistungen"
      className="relative z-10 -mt-[180px] scroll-mt-24 px-4 pb-20 sm:px-6 md:-mt-[200px] lg:px-8"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 text-center max-[767px]:mb-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-white/70 max-[479px]:tracking-[0.08em]">
            Für Ihr Zuhause von morgen
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl [text-shadow:0_4px_20px_rgba(0,0,0,0.3)]">
            Unsere Leistungen
          </h2>
          <div className="mx-auto h-[3px] w-14 rounded-full bg-accent" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-[767px]:gap-4">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_4px_20px_rgba(15,37,51,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(15,37,51,0.12)]"
            >
              {/* Image */}
              <div className="h-[200px] w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  style={{ objectPosition: s.objectPosition }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-7 max-[767px]:p-5">
                <h3 className="mb-3 text-xl font-bold text-ink max-[767px]:mb-2 max-[767px]:text-[1.05rem]">{s.title}</h3>
                <p className="mb-6 text-[0.95rem] leading-relaxed text-muted max-[767px]:mb-4 max-[767px]:text-[0.9rem] max-[767px]:leading-[1.55]">
                  {s.description}
                </p>

                {/* Arrow link */}
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ABOUT / USP SECTION
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function PKAbout() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left – Text */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Warum ALAB Energiesysteme
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Weil Erfahrung und Nähe den Unterschied machen.
          </h2>
          <div className="mb-8 h-[3px] w-14 rounded-full bg-accent" />

          <p className="mb-6 text-[0.95rem] leading-relaxed text-muted">
            Als Ingenieurbüro und zertifizierter Elektrofachbetrieb verbinden wir
            ingenieurmäßige Planung, Erfahrung und moderne Technik zu Lösungen, die
            langfristig funktionieren. Wir kümmern uns um Auslegung, Installation und
            Betreuung von HLSE-Systemen und modernen Energiesystemen im
            Privatkundenbereich. Dabei stehen Ihre individuellen Wünsche im Mittelpunkt.
          </p>
          <p className="mb-8 text-[0.95rem] leading-relaxed text-muted">
            Von der ersten Beratung bis zur fertigen Anlage begleiten wir Sie persönlich und
            verlässlich. Unser Team aus eigenen Ingenieuren und Fachkräften sorgt für
            normgerechte Ausführung, kurze Wege und schnelle Erreichbarkeit. Auch nach der
            Installation bleiben wir an Ihrer Seite: Wartung, Reparaturen und Service aus
            einer Hand.
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
        </div>

        {/* Right â€" Image */}
        <div>
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.1)]">
            <img
              src="/caddy-vor-wechselrichter.jpg"
              alt="Caddy vor Wechselrichter"
              className="h-[320px] w-full object-cover max-[767px]:h-[220px] max-[479px]:h-[190px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TESTIMONIALS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function PKTestimonials() {
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
              {/* Quote mark */}
              <span className="absolute -top-2 left-6 text-5xl font-bold leading-none text-accent/40">
                &ldquo;
              </span>

              {/* Stars */}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BERATUNGSFORMULAR (Multi-Step)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

import {
  Home,
  Building2,
  Hotel,
  Layers,
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

/* â"€â"€â"€ Types â"€â"€â"€ */
interface TileOption {
  icon: React.ElementType;
  label: string;
  value: string;
}

/* â"€â"€â"€ Step definitions â"€â"€â"€ */
const STEP_HAUSTYP: TileOption[] = [
  { icon: Home, label: "Reihenhaus", value: "reihenhaus" },
  { icon: Building2, label: "Doppelhaus", value: "doppelhaus" },
  { icon: Home, label: "Einfamilienhaus", value: "einfamilienhaus" },
  { icon: Hotel, label: "Mehrfamilienhaus", value: "mehrfamilienhaus" },
  { icon: HelpCircle, label: "Sonstiges", value: "sonstiges" },
];

const STEP_PERSONEN: TileOption[] = [
  { icon: Users, label: "1-2 Personen", value: "1-2" },
  { icon: Users, label: "3-5 Personen", value: "3-5" },
  { icon: Users, label: "Mehr als 5 Personen", value: "5+" },
];

const STEP_LEISTUNG: TileOption[] = [
  { icon: FlameIcon, label: "Wärmepumpe", value: "waermepumpe" },
  { icon: SunIcon, label: "Photovoltaik", value: "pv" },
  { icon: BatteryIcon, label: "Wallbox", value: "wallbox" },
  { icon: ZapIcon, label: "Gebäudeenergie", value: "gebaeudeenergie" },
  { icon: LightbulbIcon, label: "Beleuchtungstechnik", value: "beleuchtung" },
  { icon: ShieldIcon, label: "Service & Wartung", value: "wartung" },
];

const STEP_JA_NEIN: TileOption[] = [
  { icon: ThumbsUp, label: "Ja", value: "ja" },
  { icon: ThumbsDown, label: "Nein", value: "nein" },
];

function PKBeratungsformular() {
  const [step, setStep] = useState(0);
  const [haustyp, setHaustyp] = useState("");
  const [personen, setPersonen] = useState("");
  const [leistung, setLeistung] = useState("");
  const [pvVorhanden, setPvVorhanden] = useState("");
  const [wpVorhanden, setWpVorhanden] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    firma: "",
    plz: "",
    ort: "",
    email: "",
    telefon: "",
  });

  /* Determine which conditional steps we need */
  const needsPvQuestion = leistung === "waermepumpe" || (leistung !== "pv" && leistung !== "waermepumpe" && leistung !== "");
  const needsWpQuestion = leistung === "pv" || (leistung !== "pv" && leistung !== "waermepumpe" && leistung !== "");

  /* Build dynamic steps array */
  type StepDef =
    | { type: "tiles"; title: string; options: TileOption[]; value: string; onSelect: (v: string) => void; auto?: boolean }
    | { type: "contact" }
    | { type: "success" };

  const steps: StepDef[] = [
    {
      type: "tiles",
      title: "Um welchen Haustyp handelt es sich?",
      options: STEP_HAUSTYP,
      value: haustyp,
      onSelect: (v: string) => { setHaustyp(v); setStep((s) => s + 1); },
      auto: true,
    },
    {
      type: "tiles",
      title: "Wie viele Personen leben in Ihrem Zuhause?",
      options: STEP_PERSONEN,
      value: personen,
      onSelect: (v: string) => { setPersonen(v); setStep((s) => s + 1); },
      auto: true,
    },
    {
      type: "tiles",
      title: "Für welche Leistung interessieren Sie sich?",
      options: STEP_LEISTUNG,
      value: leistung,
      onSelect: (v: string) => {
        setLeistung(v);
        setPvVorhanden("");
        setWpVorhanden("");
        setStep((s) => s + 1);
      },
      auto: true,
    },
  ];

  /* Conditional steps based on leistung */
  if (leistung === "waermepumpe") {
    /* WP selected â†’ ask about PV */
    steps.push({
      type: "tiles",
      title: "Photovoltaik bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: pvVorhanden,
      onSelect: (v: string) => { setPvVorhanden(v); setStep((s) => s + 1); },
      auto: true,
    });
  } else if (leistung === "pv") {
    /* PV selected â†’ ask about WP */
    steps.push({
      type: "tiles",
      title: "Wärmepumpe bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: wpVorhanden,
      onSelect: (v: string) => { setWpVorhanden(v); setStep((s) => s + 1); },
      auto: true,
    });
  } else if (leistung !== "") {
    /* Anything else â†’ ask WP first, then PV */
    steps.push({
      type: "tiles",
      title: "Wärmepumpe bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: wpVorhanden,
      onSelect: (v: string) => { setWpVorhanden(v); setStep((s) => s + 1); },
      auto: true,
    });
    steps.push({
      type: "tiles",
      title: "Photovoltaik bereits vorhanden?",
      options: STEP_JA_NEIN,
      value: pvVorhanden,
      onSelect: (v: string) => { setPvVorhanden(v); setStep((s) => s + 1); },
      auto: true,
    });
  }

  steps.push({ type: "contact" });
  steps.push({ type: "success" });

  const totalVisibleSteps = steps.length - 1; /* exclude success */
  const currentStep = steps[step];
  const progress = Math.round(((step + 1) / totalVisibleSteps) * 100);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      Quelle: "Privatkunden – Erstberatung (mehrstufig)",
      Seite: typeof window !== "undefined" ? window.location.href : "",
      Haustyp: haustyp,
      Personen: personen,
      Leistung: leistung,
      PV_vorhanden: pvVorhanden,
      WP_vorhanden: wpVorhanden,
      Vorname: form.vorname,
      Nachname: form.nachname,
      Firma: form.firma,
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
    <section id="erstberatung" className="scroll-mt-24 bg-accent px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
          Kostenfreie Erstberatung vereinbaren
        </h2>

        {/* Progress bar */}
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

        {/* â"€â"€â"€ Tile steps â"€â"€â"€ */}
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

        {/* â"€â"€â"€ Contact form â"€â"€â"€ */}
        {currentStep?.type === "contact" && (
          <div className="mx-auto max-w-[650px] text-center">
            <h3 className="mb-8 text-xl font-bold text-white md:text-2xl">
              Ihre Kontaktdaten
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(["vorname", "nachname", "firma", "plz", "ort", "email", "telefon"] as const).map((field) => {
                const isOptional = field === "firma";
                return (
                  <input
                    key={field}
                    type={field === "email" ? "email" : field === "telefon" ? "tel" : "text"}
                    placeholder={
                      field === "vorname" ? "Vorname*" :
                      field === "nachname" ? "Nachname*" :
                      field === "firma" ? "Firma (optional)" :
                      field === "plz" ? "PLZ*" :
                      field === "ort" ? "Ort*" :
                      field === "email" ? "E-Mail-Adresse*" :
                      "Telefonnummer für Rückfragen*"
                    }
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="rounded-xl border-0 bg-white px-5 py-4 text-sm text-ink shadow-sm outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-accent-deep"
                    required={!isOptional}
                  />
                );
              })}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={
                submitting || !form.vorname || !form.nachname || !form.plz || !form.ort || !form.email || !form.telefon
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

        {/* â"€â"€â"€ Success â"€â"€â"€ */}
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CTA
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function PKCta() {
  return (
    <section className="bg-[#f8fafb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[800px] text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
          Kostenfreie Erstberatung
        </p>
        <h2 className="mb-4 text-3xl font-bold text-ink md:text-4xl">
          Bereit für Ihr nächstes Projekt?
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-[0.95rem] leading-relaxed text-muted">
          Egal ob Photovoltaik, Wärmepumpe oder Wallbox – wir beraten Sie persönlich
          und unverbindlich. Gemeinsam finden wir die optimale Lösung für Ihr Zuhause.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#angebot"
            data-open-angebot="privatkunden-overview-cta"
            className="group inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
          >
            Angebot einholen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#angebot"
            data-open-angebot="privatkunden-overview-direkt-anrufen"
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


