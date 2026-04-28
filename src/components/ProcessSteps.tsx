"use client";

import { useEffect, useRef, useState } from "react";
import { HardHat, Phone, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
  benefit: string;
  image: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: Phone,
    title: "Kontakt & kostenfreies Erstgespräch",
    text: "Sie nutzen unser kurzes Online-Formular und verraten uns die wichtigsten Eckdaten zu Ihrem Gebäude. Wir rufen Sie zeitnah an, besprechen Ihre Wünsche und klären, ob und wie wir Ihnen am besten helfen können. Dieses erste Gespräch ist für Sie zu 100 % unverbindlich und kostenfrei.",
    benefit: "Kein Risiko, schnelle Einschätzung.",
    image: "/process-step-1.png",
  },
  {
    number: "02",
    icon: Search,
    title: "Die Vor-Ort-Analyse",
    text: "Wenn die Chemie stimmt, kommen wir zu Ihnen. Wir nehmen Ihr Gebäude vom Keller bis zum Dach genau unter die Lupe. Wir prüfen die Bausubstanz, die aktuelle Anlagentechnik und erfassen alle energetischen Schwachstellen. So wissen wir genau, wo das größte Einsparpotenzial für Sie liegt.",
    benefit: "Maßgeschneiderte Lösung statt Standard-Angebot.",
    image: "/process-step-2.png",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Fachgerechte Umsetzung & Begleitung",
    text: "Sie müssen sich nicht mit komplizierten Formularen oder Baupfusch herumschlagen. Wir übernehmen die Beantragung der Fördergelder und begleiten die handwerkliche Umsetzung. Nach Abschluss prüfen wir die Qualität der Arbeiten und stellen alle nötigen Nachweise für Sie aus.",
    benefit: "Zurücklehnen und das Projekt in Profi-Händen wissen.",
    image: "/process-step-3.png",
  },
];

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const update = () => {
      frameId = null;
      const section = sectionRef.current;
      if (!section) return;

      // Skip scrollytelling on smaller screens
      if (window.innerWidth < 1024) {
        setActiveIndex(0);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const total = STEPS.length;

      // Total scroll distance available (section height minus the sticky viewport)
      const scrollable = rect.height - viewportH;
      if (scrollable <= 0) {
        setActiveIndex(0);
        return;
      }

      // How far we have scrolled INTO the section (0 = top sticks, 1 = bottom reached)
      const scrolled = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      // Map progress -> active step index
      const idx = Math.min(
        Math.floor(scrolled * total),
        total - 1,
      );

      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-accent">
            SO ARBEITEN WIR
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-ink md:text-4xl">
            In drei Schritten zu Ihrer optimalen Energielösung
          </h2>
        </div>

        {/* Mobile fallback (stacked cards) */}
        <div className="space-y-8 lg:hidden">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[0_16px_50px_-24px_rgba(15,37,51,0.22)]"
            >
              <div className="relative h-52">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg">
                  {step.number}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10">
                    <step.icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                </div>

                <p className="text-[15px] leading-relaxed text-muted">
                  {step.text}
                </p>

                <div className="mt-5 rounded-2xl bg-accent/5 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    Ihr Vorteil
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {step.benefit}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop scrollytelling
            Section height = (n_steps) * 100vh, so each step gets one full viewport
            of scroll. The inner sticky panel pins to the top while we scroll. */}
        <div
          ref={sectionRef}
          className="relative hidden lg:block"
          style={{ height: `${STEPS.length * 100}vh` }}
        >
          <div className="sticky top-24 h-[calc(100vh-6rem)] min-h-[640px]">
            <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(440px,560px)] items-center gap-16">
              {/* LEFT: text cards (crossfade) */}
              <div className="relative h-full">
                {STEPS.map((step, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <article
                      key={step.number}
                      className="absolute inset-0 flex items-center"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateY(0) scale(1)"
                          : "translateY(24px) scale(0.97)",
                        pointerEvents: isActive ? "auto" : "none",
                        transition:
                          "opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)",
                      }}
                    >
                      <div className="relative w-full max-w-[580px] rounded-[32px] border border-line bg-white p-10 shadow-[0_28px_80px_-32px_rgba(15,37,51,0.22)]">
                        <div className="mb-6 flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-base font-bold text-white shadow-[0_10px_25px_rgba(44,110,190,0.28)]">
                            {step.number}
                          </div>

                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                            <step.icon
                              className="h-6 w-6 text-accent"
                              strokeWidth={1.7}
                            />
                          </div>

                          <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent/80">
                            Schritt {step.number}
                          </span>
                        </div>

                        <h3 className="mb-5 max-w-[480px] text-[2rem] font-bold leading-[1.1] text-ink">
                          {step.title}
                        </h3>

                        <p className="max-w-[500px] text-[1rem] leading-[1.85] text-muted">
                          {step.text}
                        </p>

                        <div className="mt-8 inline-flex max-w-[420px] flex-col rounded-[24px] bg-accent/5 px-5 py-4">
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                            Ihr Vorteil
                          </span>
                          <span className="mt-2 text-base font-semibold text-ink">
                            {step.benefit}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* RIGHT: image stack (crossfade with subtle zoom) */}
              <div className="relative h-full">
                <div className="absolute inset-0 overflow-hidden rounded-[36px] border border-line bg-slate-100 shadow-[0_32px_90px_-34px_rgba(15,37,51,0.35)]">
                  {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={step.number}
                        className="absolute inset-0"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "scale(1)" : "scale(1.06)",
                          transition:
                            "opacity 700ms ease, transform 1200ms ease",
                        }}
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
                      </div>
                    );
                  })}

                  {/* Bottom title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                      Aktiver Schritt
                    </p>
                    <h3 className="max-w-[320px] text-2xl font-bold leading-tight text-white">
                      {STEPS[activeIndex].title}
                    </h3>
                  </div>

                  {/* Counter */}
                  <div className="absolute right-6 top-6 z-20 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    {activeIndex + 1} / {STEPS.length}
                  </div>

                  {/* Progress dots */}
                  <div className="absolute left-6 top-6 z-20 flex flex-col gap-3">
                    {STEPS.map((step, index) => (
                      <div
                        key={step.number}
                        className={`rounded-full transition-all duration-500 ${
                          index === activeIndex
                            ? "h-2.5 w-12 bg-white"
                            : "h-2.5 w-2.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
