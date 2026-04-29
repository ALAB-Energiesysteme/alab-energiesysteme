import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Privatkunden",
    subtitle: "Für Ihr Zuhause von morgen",
    text: "Photovoltaik, Wärmepumpen, Wallboxen und mehr – wir beraten Sie persönlich und realisieren Ihr Energieprojekt mit eigenen Fachkräften.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    href: "/privatkunden",
  },
  {
    title: "Geschäftskunden",
    subtitle: "Für Ihr Unternehmen von morgen",
    text: "Von der Hallenelektrik über Ladesäulen bis zur gewerblichen PV-Anlage – maßgeschneiderte Energielösungen für maximale Wirtschaftlichkeit.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    href: "/geschaeftskunden",
  },
  {
    title: "Dachverpachtung",
    subtitle: "Passives Einkommen generieren",
    text: "Verpachten Sie Ihr Dach und profitieren Sie von regelmäßigen Einnahmen – ohne eigene Investition. Wir übernehmen Planung, Installation und Wartung.",
    image:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80",
    href: "/dachverpachtung",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative z-10 -mt-[120px] px-7 pb-20 max-[1000px]:-mt-20 max-[767px]:px-4 max-[767px]:pb-12 max-[767px]:-mt-14">
      <div className="mx-auto grid max-w-[1320px] grid-cols-3 gap-[30px] max-[1000px]:mx-auto max-[1000px]:max-w-[500px] max-[1000px]:grid-cols-1 max-[1000px]:gap-6 max-[767px]:gap-4">
        {SERVICES.map((service) => (
          <article
            key={service.title}
            className="group overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_10px_40px_rgba(15,37,51,0.12)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,37,51,0.18)]"
          >
            <div className="h-[220px] w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.08]"
              />
            </div>
            <div className="p-7 max-[767px]:p-5">
              <h3 className="mb-2 text-[1.4rem] font-bold text-ink max-[767px]:mb-1.5 max-[767px]:text-[1.15rem]">
                {service.title}
              </h3>
              <p className="mb-4 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-accent max-[767px]:mb-3 max-[767px]:text-[0.72rem]">
                {service.subtitle}
              </p>
              <p className="mb-6 text-[0.95rem] leading-[1.65] text-muted max-[767px]:mb-4 max-[767px]:text-[0.88rem] max-[767px]:leading-[1.55]">
                {service.text}
              </p>
              <a
                href={service.href}
                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)] max-[767px]:w-full max-[767px]:justify-center"
              >
                Mehr erfahren
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
