import {
  Zap,
  Settings,
  Cable,
  Power,
  BarChart3,
  Wrench,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  text: string;
}

const SERVICES: Service[] = [
  { icon: Settings, text: "Planung & Montage elektrischer Energieversorgungsanlagen" },
  { icon: Zap, text: "Planung & Realisierung aller Elektroinstallationsarbeiten" },
  { icon: Power, text: "Schaltanlagenbau" },
  { icon: Cable, text: "Installation, Inbetriebnahme & Austausch von Energietechnik" },
  { icon: Wrench, text: "Wartung & Instandhaltung elektrischer Schaltanlagen" },
];

export default function EnergietechnikSection() {
  return (
    <section id="energieversorgung" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        {/* Kicker */}
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
          Unser Leistungsspektrum
        </div>

        {/* Headline */}
        <h2 className="mb-6 max-w-3xl text-3xl font-bold leading-tight text-ink md:text-4xl">
          Energietechnik, die Ihre Versorgung{" "}
          <span className="text-accent">sicher und effizient</span> macht.
        </h2>

        {/* Accent bar */}
        <div className="mb-10 h-[3px] w-[60px] rounded-full bg-accent" />

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Intro text */}
          <div>
            <p className="text-[0.95rem] leading-[1.75] text-muted">
              Im Bereich Energietechnik fokussieren wir uns auf die zuverlässige,
              umweltschonende und effektive Energieversorgung der Gesellschaft.
              Bedeutsam sind insbesondere Verfahren, die Energie effizient
              umwandeln, sicher transportieren und nutzbar machen. Das
              Leistungsspektrum unseres in Mindelheim sitzenden Ingenieurbüros
              und Elektrofachbetriebs umfasst:
            </p>

            <p className="mt-6 text-[0.95rem] leading-[1.75] text-muted">
              Im Fokus stehen erneuerbare Energien sowie moderne Konzepte zur
              sicheren Energieverteilung im Gebäude. Davon zeugen beispielsweise
              unsere Konzepte zur Energieverteilung mittels Schaltanlagen- und
              Unterverteilungsbau – ingenieurmäßig geplant und durch unsere
              eigenen Fachkräfte normgerecht umgesetzt.
            </p>

            <a
              href="#angebot"
              data-open-angebot="energietechnik-beratung"
              className="group mt-8 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)]"
            >
              Jetzt beraten lassen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right: Service list */}
          <div className="rounded-[var(--radius-card)] border border-line bg-[#f8fafb] p-8 shadow-[0_10px_40px_rgba(15,37,51,0.06)] md:p-10">
            <ul className="space-y-5">
              {SERVICES.map((service) => (
                <li key={service.text} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <service.icon className="h-5 w-5 text-accent" strokeWidth={2} />
                  </div>
                  <span className="pt-2 text-[0.95rem] font-medium leading-snug text-ink">
                    {service.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
