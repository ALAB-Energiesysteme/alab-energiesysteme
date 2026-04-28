import { Check, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-white py-16 px-4 md:py-24 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* ── Text Column ── */}
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-[#2b6cb0]">
            ÜBER ALAB
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            Tradition trifft auf innovative Energietechnik.
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed">
            Wir sind Ihr verlässlicher Partner für die Umsetzung zukunftssicherer
            Energiekonzepte. Von der ersten Planung bis zur finalen Installation
            begleiten wir Sie mit fachlicher Expertise und höchstem
            Qualitätsanspruch.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Zertifizierter Fachbetrieb",
              "Maßgeschneiderte Lösungen",
              "Alles aus einer Hand",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700">
                <Check className="h-5 w-5 shrink-0 text-[#2b6cb0]" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#team"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#2b6cb0] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(43,108,176,0.35)] transition hover:bg-[#1e4f8b] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,108,176,0.35)]"
          >
            Lernen Sie das Team kennen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* ── Image Column ── */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1621905252507-b35492CC74b4?auto=format&fit=crop&w=800&q=80"
            alt="Techniker bei der Installation einer Solaranlage"
            className="w-full h-auto rounded-[18px] object-cover shadow-[0_10px_40px_rgba(15,37,51,0.12)]"
          />
        </div>
      </div>
    </section>
  );
}
