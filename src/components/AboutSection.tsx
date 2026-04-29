import { Check } from "lucide-react";
import LazyVideo from "@/components/LazyVideo";

export default function AboutSection() {
  return (
    <section className="bg-white py-16 px-4 md:py-24 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* ── Text Column ── */}
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-accent">
            ÜBER ALAB
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            Tradition trifft auf innovative Energietechnik.
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed">
            Als Ingenieurbüro und zertifizierter Elektrofachbetrieb sind wir Ihr
            verlässlicher Partner für die Umsetzung zukunftssicherer Energiekonzepte.
            Von der ingenieurmäßigen Planung bis zur normgerechten Installation
            begleiten wir Sie mit fachlicher Expertise und höchstem Qualitätsanspruch.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Ingenieurbüro & zertifizierter Elektrofachbetrieb",
              "Planung und Ausführung aus einer Hand",
              "Maßgeschneiderte Lösungen",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700">
                <Check className="h-5 w-5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>

        </div>

        {/* ── Video Column (Lazy: lädt erst beim Scrollen in den Viewport) ── */}
        <div className="aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-slate-100 shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
          <LazyVideo
            src="/tradition-innovation.mp4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
