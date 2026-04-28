import { ArrowRight, ChevronDown, Zap } from "lucide-react";

const OVERVIEW = [
  {
    icon: Zap,
    title: "Energieversorgung & Verteilung",
    text: "Von der Hauptverteilung bis zur letzten Steckdose - wir planen und installieren die komplette elektrische Infrastruktur Ihres Gebäudes.",
    anchor: "#energieversorgung",
    isExternal: false,
  },
];

export default function GebaeudeenergieServices() {
  return (
    <section
      id="energieversorgung"
      className="relative z-10 -mt-[100px] px-7 pb-16 max-[1000px]:-mt-16"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[700px]">
          {OVERVIEW.map((item) => (
            <a
              key={item.title}
              href={item.anchor}
              className="group flex items-start gap-5 rounded-[var(--radius-card)] bg-white p-8 shadow-[0_10px_40px_rgba(15,37,51,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(15,37,51,0.15)]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <item.icon className="h-7 w-7 text-accent" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-[1.2rem] font-bold text-ink">
                  {item.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.6] text-muted">
                  {item.text}
                </p>
              </div>
              {item.isExternal ? (
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-accent/50 transition-transform group-hover:translate-x-1" />
              ) : (
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-accent/50 transition-transform group-hover:translate-y-1" />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
