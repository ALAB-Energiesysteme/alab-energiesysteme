"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";

interface Project {
  tags: string;
  title: string;
  text: string;
  image: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    tags: "E-Mobilität \u00B7 Speichersystem \u00B7 Photovoltaik",
    title: "Blema Kircheis",
    text: "Seit über 150 Jahren zählt die BLEMA als Innovationstreiber für die Herstellung von Verpackungsmaschinen, da sie mit viel Leidenschaft und Präzision das Denkbare möglich machen. Mit der Kraft der Sonne gehen sie zukunftsorientiert voran.",
    image:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2000&auto=format&fit=crop",
    href: "#",
  },
  {
    tags: "Pacht \u00B7 Photovoltaik",
    title: "Blumen und Café Geissler UG",
    text: "Bei Blumen und Cafe Geissler in Grünhain-Beierfeld trifft Genuss auf Nachhaltigkeit. Während die Kunden sich an den Blumen und Leckereien erfreuen, profitiert die Region im Hintergrund durch die Nutzung der Dachflächen für die nachhaltige Energieproduktion.",
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=2000&auto=format&fit=crop",
    href: "#",
  },
  {
    tags: "Gebäudeenergie \u00B7 Photovoltaik",
    title: "Musterfirma Logistik GmbH",
    text: "Effiziente Energieversorgung für große Lagerhallen. Durch unsere maßgeschneiderte Lösung konnte die Musterfirma ihre Energiekosten drastisch senken und leistet durch die vollständige Nutzung der Dachfläche einen aktiven Beitrag zum Klimaschutz in der Region.",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=2000&auto=format&fit=crop",
    href: "#",
  },
  {
    tags: "Pacht \u00B7 E-Mobilität \u00B7 Photovoltaik",
    title: "Landwirtschaftsbetrieb Meier",
    text: "Die großen Dachflächen von landwirtschaftlichen Betrieben bieten enormes Potenzial. Mit unserem Dachpacht-Modell erhält die Familie Meier verlässliche Einnahmen, ohne eigene Investitionen tätigen zu müssen – während wir den Ausbau erneuerbarer Energien fördern.",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2000&auto=format&fit=crop",
    href: "#",
  },
  {
    tags: "Speichersystem \u00B7 Photovoltaik",
    title: "Gemeindezentrum Neustadt",
    text: "Vorbild für öffentliche Einrichtungen. Die Ausstattung des neuen Gemeindezentrums mit modernster Solar- und Speichertechnik sichert nicht nur eine nachhaltige Eigenversorgung, sondern entlastet auch die langfristigen kommunalen Haushalte spürbar.",
    image:
      "https://images.unsplash.com/photo-1584276433299-4a00508a8e1e?q=80&w=2000&auto=format&fit=crop",
    href: "#",
  },
];

export default function ReferencesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = PROJECTS.length;

  return (
    <section className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Header */}
      <div className="mb-12 lg:mb-16">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-[670px] text-3xl font-bold leading-tight text-ink lg:text-4xl">
            Unsere Referenzen
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-deep"
          >
            Alle Referenzen anzeigen
          </a>
        </div>

        <div className="max-w-[670px] space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            Ob Unternehmen, landwirtschaftlicher Betrieb, öffentliche
            Einrichtung oder Immobilienverwalter: Bei uns finden Sie individuelle
            Lösungen, die zu Ihrem Bedarf passen – technisch durchdacht,
            wirtschaftlich sinnvoll und nachhaltig umgesetzt.
          </p>
          <p>
            Wir sprechen Ihre Sprache – und liefern genau die Energie, die Sie
            brauchen. Unsere Referenzen sprechen für sich.
          </p>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        speed={600}
        spaceBetween={40}
        allowTouchMove={false}
        className="overflow-visible"
      >
        {PROJECTS.map((project, i) => (
          <SwiperSlide key={project.title}>
            <div className="grid grid-cols-1 items-center lg:grid-cols-12">
              {/* Image (right, background layer) */}
              <div className="z-0 h-[300px] w-full sm:h-[400px] lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:h-[550px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full rounded-2xl object-cover shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]"
                />
              </div>

              {/* Text card (left, foreground) */}
              <div className="relative z-10 mx-4 -mt-12 flex h-auto flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] md:p-10 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mt-0 lg:p-12">
                {/* Counter */}
                <div className="mb-6 text-[13px] font-medium text-slate-400">
                  <span className="font-bold text-accent">{i + 1}</span> /{" "}
                  {total}
                </div>

                {/* Tags */}
                <div className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">
                  {project.tags}
                </div>

                {/* Title & Text */}
                <h3 className="mb-4 text-2xl font-bold leading-tight text-ink lg:text-[28px]">
                  {project.title}
                </h3>
                <p className="mb-10 text-[15px] leading-relaxed text-muted">
                  {project.text}
                </p>

                {/* Nav + CTA */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
                  >
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>

                  <div className="flex gap-2">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      disabled={activeIndex === 0}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
                      aria-label="Vorheriger Slide"
                    >
                      <ArrowLeft className="h-[18px] w-[18px]" />
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      disabled={activeIndex === total - 1}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
                      aria-label="Nächster Slide"
                    >
                      <ArrowRight className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
