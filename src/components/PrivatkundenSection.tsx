import Link from "next/link";
import {
  ArrowRight,
  Percent,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import HeroCardShowcase, {
  type HeroCardShowcaseItem,
} from "@/components/HeroCardShowcase";

interface Benefit {
  icon: LucideIcon;
  text: string;
}

interface Step {
  number: string;
  title: string;
  text: string;
}

const PRIVATE_HERO_CARDS: HeroCardShowcaseItem[] = [
  {
    title: "Photovoltaik fuer Zuhause",
    subtitle: "Individuell geplant fuer Ihr Eigenheim",
    text: "Sauber ausgelegte Solaranlagen fuer Dachflaechen, Verbrauchsprofil und langfristige Wirtschaftlichkeit.",
    image: "/img/private-loesungen/pv-privat-haus_aufgeteilt.png",
    imageMode: "contain",
    imageBgClassName: "bg-[#eef4fc]",
  },
  {
    title: "Stromspeicher & Autarkie",
    subtitle: "Mehr Eigenverbrauch, weniger Netzbezug",
    text: "Speicherloesungen, die Ihren Solarstrom gezielt in die Abend- und Nachtstunden verlaengern.",
    image: "/img/private-loesungen/pv-privat-batteriespeicher.jpg",
  },
  {
    title: "Wallbox & E-Mobilitaet",
    subtitle: "Solarstrom direkt ins Fahrzeug laden",
    text: "Intelligente Wallbox-Konzepte fuer komfortables Laden zu Hause und eine saubere PV-Kopplung.",
    image: "/Icon-Haus-Auto-laden.gif",
    imageMode: "contain",
    imageBgClassName: "bg-[#eef4fc]",
  },
];

const BENEFITS: Benefit[] = [
  { icon: Percent, text: "Bis zu 80 % Stromkosten sparen" },
  {
    icon: ShieldCheck,
    text: "Unabhaengig von steigenden Energiepreisen",
  },
  { icon: TrendingUp, text: "Wertsteigerung Ihrer Immobilie" },
];

const STEPS: Step[] = [
  {
    number: "01",
    title: "Beratung & Planung",
    text: "Kostenlose Erstberatung, Dachanalyse und individuelle Anlagenplanung.",
  },
  {
    number: "02",
    title: "Installation & Inbetriebnahme",
    text: "Fachgerechte Montage durch unser Expertenteam mit vollstaendiger Dokumentation.",
  },
  {
    number: "03",
    title: "Foerderung & Anmeldung",
    text: "Wir kuemmern uns um Foerdermittel, Netzanmeldung und Einspeiseverguetung.",
  },
];

export default function PrivatkundenSection() {
  return (
    <>
      <HeroCardShowcase
        title="PHOTOVOLTAIK FUER ZUHAUSE"
        description="Erzeugen Sie Ihren eigenen Strom, senken Sie dauerhaft Ihre Energiekosten und schaffen Sie ein ruhig geplantes Energiesystem mit hochwertiger Technik."
        heroImage="/img/men%C3%BC/pv-zuhause.jpeg"
        heroImageAlt="Photovoltaikanlage auf einem Wohnhaus"
        cards={PRIVATE_HERO_CARDS}
      />

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              Ihre Vorteile mit ALAB Energiesysteme
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.text}
                className="flex flex-col items-center rounded-[var(--radius-card)] border border-line bg-white p-8 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <benefit.icon
                    className="h-7 w-7 text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm font-bold text-ink">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              In drei Schritten zu Ihrer Solaranlage
            </h2>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-accent/20 md:left-6" />

            <div className="space-y-8">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="relative flex gap-5 md:gap-6"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg md:h-12 md:w-12">
                    {step.number}
                  </div>
                  <div className="flex-1 rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
                    <h3 className="mb-1 text-lg font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            Starten Sie jetzt in Ihre Energiezukunft
          </h2>
          <p className="mb-8 text-white/80">
            Kontaktieren Sie uns fuer eine unverbindliche Beratung.
          </p>
          <Link
            href="#angebot"
            data-open-angebot="privatkunden-footer-cta"
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-white px-6 py-3 text-sm font-semibold text-accent shadow transition-all hover:-translate-y-0.5"
          >
            Jetzt Beratung anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
