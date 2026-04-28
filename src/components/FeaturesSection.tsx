import { Hand, Lightbulb, ClipboardCheck, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  number: string;
  label: string;
}

const FEATURES: Feature[] = [
  { icon: Hand, number: "100%", label: "Alles aus einer Hand" },
  { icon: Lightbulb, number: "2in1", label: "Ingenieurbüro & Fachbetrieb" },
  { icon: ClipboardCheck, number: "Lückenlos", label: "Qualitätskontrolle" },
  { icon: Globe, number: "A–Z", label: "Analyse bis Netzanschluss" },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#f4f6f8] py-[60px] px-8 max-[767px]:py-10 max-[767px]:px-4 max-[479px]:py-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Top: Title + Description */}
        <div className="mb-[60px] flex gap-[60px] max-[900px]:flex-col max-[900px]:gap-8 max-[767px]:mb-8 max-[767px]:gap-5">
          <div className="min-w-[280px] shrink-0 max-[767px]:min-w-0">
            <h2 className="text-[1.75rem] font-bold leading-[1.3] text-[#0f172a] max-[767px]:text-[1.4rem] max-[767px]:leading-[1.25]">
              Ihr Partner für{" "}
              <span className="text-[#0369a1]">
                Energie- und Gebäudetechnik
              </span>
            </h2>
            <div className="mt-4 h-[3px] w-[60px] bg-[#0284c7] max-[767px]:mt-3 max-[767px]:w-[48px]" />
          </div>

          <p className="flex-1 text-[0.95rem] leading-[1.7] text-[#475569] max-[767px]:text-[0.9rem] max-[767px]:leading-[1.55]">
            ALAB Energiesysteme bündelt die analytische Expertise eines
            spezialisierten Ingenieurbüros mit der praktischen
            Ausführungskompetenz eines zertifizierten Elektrofachbetriebs. In
            der Planungsphase entwickeln wir fundierte, gebäudespezifische
            Energiekonzepte und fokussieren uns auf die technisch und
            wirtschaftlich optimale Auslegung von Systemen wie
            Photovoltaikanlagen, Stromspeichern und
            Energiemanagementlösungen. Diese planerische Basis setzen wir
            anschließend mit unserem eigenen Fachpersonal in die Praxis um. Als
            eingetragener Elektrofachbetrieb übernehmen wir die normgerechte,
            sichere Installation und die finale Inbetriebnahme der Anlagen
            direkt vor Ort.
          </p>
        </div>

        {/* Bottom: Key Features */}
        <div className="grid grid-cols-4 gap-6 text-center max-[900px]:grid-cols-2 max-[767px]:gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center"
            >
              <feature.icon className="mb-3 h-12 w-12 text-[#0284c7] max-[767px]:mb-2 max-[767px]:h-10 max-[767px]:w-10" strokeWidth={1.5} />
              <div className="mb-1 text-2xl font-bold text-[#0f172a] max-[767px]:text-[1.15rem]">
                {feature.number}
              </div>
              <div className="text-[0.8rem] text-[#64748b] max-[767px]:text-[0.72rem]">
                {feature.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
