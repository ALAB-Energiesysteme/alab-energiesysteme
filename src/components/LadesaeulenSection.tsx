"use client";

import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function LadesaeulenSection() {
  return (
    <div className="font-[Montserrat,sans-serif]">
      <LSHero />
      <LSScrollytelling />
      <LSFaq />
      <LSCtaAbschluss />
      <LSKontaktFormular />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 1 – Hero (Blue with illustration style)
   ═══════════════════════════════════════════════ */
function LSHero() {
  return (
    <section className="relative overflow-hidden bg-[#2b6cb0] pt-[80px]">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-7 py-16 pb-0">
        <div className="grid min-h-[500px] grid-cols-[1fr_1.1fr] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:min-h-0">
          {/* Left: Text */}
          <div className="max-[900px]:text-center">
            <h1 className="mb-6 text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.1] text-white">
              Ladelösung für Tief&shy;garagen
            </h1>
            <p className="mb-8 max-w-[520px] text-[clamp(0.95rem,1.8vw,1.1rem)] leading-[1.7] text-white/80 max-[900px]:mx-auto">
              Vollständige E-Mobility Lösung für Mehrparteienhäuser und WEGs.
              Machen Sie Ihre Tiefgarage jetzt bereit für E-Mobility!
            </p>

            <ul className="mb-10 flex flex-col gap-3 max-[900px]:items-center">
              {[
                "Prüfen der Tiefgarage auf Umsetzbarkeit",
                "Grundinstallation der Netzwerktechnik und Lastmanagements",
                "Hochwertige Wallbox und Stromlieferung für die Stellplätze",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/90">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#fbbf24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-[0.92rem] leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#angebot"
              data-open-angebot="ladesaeulen-hero-beratung"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#fbbf24] px-8 py-4 text-[0.95rem] font-bold text-[#0f2533] shadow-[0_4px_20px_rgba(251,191,36,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(251,191,36,0.4)]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              Jetzt kostenlose Beratung anfordern!
            </a>
          </div>

          {/* Right: Illustration image */}
          <div className="relative flex items-end justify-center max-[900px]:mt-8">
            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"
              alt="E-Auto in Tiefgarage"
              className="h-auto max-h-[480px] w-full rounded-t-[24px] object-cover object-center shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Scrollytelling (Sticky left, scroll right)
   ═══════════════════════════════════════════════ */
const SCROLL_STEPS = [
  {
    num: "1",
    title: "Analyse Professional",
    subtitle: "Das Wichtigste zuerst: Wir klären für Sie die Umsetzbarkeit der Ladelösung ab. Die Analyse Professional umfasst u.a.:",
    features: [
      "Vor-Ort-Begehung, Ermittlung der Gebäudedaten und Aufnahme des Ist-Zustands",
      "Anfrage und Abstimmung mit dem zuständigen Netzbetreiber",
      "Erstellung des Berichts mit Preiskalkulation und Präsentation der Ergebnisse",
      "ggf. Leistungsmessung von mindestens 2 Wochen",
      "Die Hälfte der Kosten werden bei einem Folgeauftrag (Grundinstallation) angerechnet",
    ],
    price: "Preis: ab 2.699 € *",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=900&q=80",
    imageAlt: "Tiefgarage Analyse",
    bgColor: "bg-white",
  },
  {
    num: "2",
    title: "Installation in der Tiefgarage",
    subtitle: "Errichtung der Grundinstallation mit optimaler Raumnutzung:",
    features: [
      "Ausführung sämtlicher Kernlochbohrungen",
      "Installation Netzwerktechnik",
      "Bereitstellung zweier Schnittstellen für das dynamische Lastmanagement schaffen",
      "Umbau Netzanschluss inkl. Messeinrichtung",
    ],
    price: null,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=80",
    imageAlt: "Tiefgarage Installation",
    bgColor: "bg-[#f4f6f8]",
  },
  {
    num: "3",
    title: "Ladepaket für den Stellplatz",
    subtitle: "Ausstattung der einzelnen Stellplätze mit Wallboxen. Die Stellplatzinhaber erhalten ein eigenes Angebot für eine:",
    features: [
      "Wallbox (bis 11 kW Ladeleistung)",
      "RFID-Authentifizierung",
      "Integriertes Lastmanagement",
      "Fachgerechte Installation",
      "Netzbetreiber-Anmeldung",
      "Stromlieferung mit kWh-genauer Abrechnung",
    ],
    price: null,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=80",
    imageAlt: "Ladepaket Stellplatz",
    bgColor: "bg-white",
  },
];

function LSScrollytelling() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);   // wraps right column, gives height
  const panelRef    = useRef<HTMLDivElement>(null);    // the floating text panel
  const stepRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const isDesktop   = useRef(false);

  useEffect(() => {
    /* ── JavaScript fake-sticky:
       position:sticky is broken when html/body has overflow-x:hidden
       (a known browser limitation). We polyfill it manually:
       · Above section   → position:absolute, top:0
       · Inside section  → position:fixed, top:100px
       · Below section   → position:absolute, bottom:0               */
    const TOP_OFFSET = 100; // px from viewport top (below header)

    const update = () => {
      const container = containerRef.current;
      const panel     = panelRef.current;
      if (!container || !panel) return;

      isDesktop.current = window.innerWidth >= 1024;
      if (!isDesktop.current) {
        // Mobile: reset any JS positioning
        panel.style.cssText = "";
        return;
      }

      const cRect    = container.getBoundingClientRect();
      const panelH   = panel.offsetHeight;
      const halfW    = cRect.width / 2;      // panel occupies left half of container

      if (cRect.top > TOP_OFFSET) {
        // Section not yet reached
        Object.assign(panel.style, {
          position : "absolute",
          top      : "0px",
          bottom   : "",
          left     : "0px",
          width    : halfW + "px",
        });
      } else if (cRect.bottom < TOP_OFFSET + panelH) {
        // Section already passed
        Object.assign(panel.style, {
          position : "absolute",
          top      : "",
          bottom   : "0px",
          left     : "0px",
          width    : halfW + "px",
        });
      } else {
        // Panel is in view → pin it fixed
        Object.assign(panel.style, {
          position : "fixed",
          top      : TOP_OFFSET + "px",
          bottom   : "",
          left     : cRect.left + "px",
          width    : halfW + "px",
        });
      }

      // ── Active step detection ──
      const mid = window.innerHeight * 0.5;
      let next = 0;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < mid) next = i;
      });
      setActiveStep(next);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update(); // run once immediately
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = SCROLL_STEPS[activeStep] ?? SCROLL_STEPS[0];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
/* ── Scrollytelling scope ── */
#ls-scroll{ font-family:'Montserrat',sans-serif; }

/* Intro band */
#ls-scroll .lss-intro{
  background:#f4f6f8; padding:80px 0;
}
#ls-scroll .lss-wrap{
  max-width:1320px; margin:0 auto; padding:0 28px;
}
#ls-scroll .lss-intro-inner{
  max-width:900px; margin:0 auto; text-align:center;
}
#ls-scroll .lss-intro-title{
  font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:800;
  line-height:1.25; color:#0f2533; margin:0 0 20px;
}
#ls-scroll .lss-intro-body{
  font-size:1rem; line-height:1.75; color:#5b6b78;
  max-width:700px; margin:0 auto;
}

/* ── Desktop layout ── */
/* Outer relative container – provides height to the absolute panel */
#ls-scroll .lss-outer{
  display:none;
  position:relative;
}
@media(min-width:1024px){
  #ls-scroll .lss-outer{ display:block; }
  #ls-scroll .lss-mobile{ display:none!important; }
}

/* Left floating panel – JS sets position/top/left/width */
#ls-scroll .lss-panel{
  position:absolute;
  top:0; left:0;
  width:50%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:64px 48px 64px 0;
  box-sizing:border-box;
}

/* Right scrolling column – pushes into right half */
#ls-scroll .lss-right{
  margin-left:50%;
  padding:0 0 0 28px;
  box-sizing:border-box;
}

/* Step number bubbles */
#ls-scroll .lss-nums{
  display:flex; align-items:center; gap:12px; margin-bottom:32px;
}
#ls-scroll .lss-num{
  width:40px; height:40px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-weight:800; font-size:.9rem;
  transition:all .35s ease;
  flex-shrink:0;
}
#ls-scroll .lss-num.is-active{
  background:linear-gradient(135deg,#2b6cb0,#6aa6e8);
  color:#fff; transform:scale(1.1);
  box-shadow:0 4px 15px rgba(43,108,176,.3);
}
#ls-scroll .lss-num.is-done{
  background:#2b6cb0; color:#fff; opacity:.45;
}
#ls-scroll .lss-num.is-future{
  background:#e2e8f0; color:#5b6b78;
}

/* Text */
#ls-scroll .lss-step-title{
  font-size:clamp(1.4rem,2.5vw,2rem); font-weight:800;
  color:#0f2533; margin:0 0 16px; line-height:1.25;
}
#ls-scroll .lss-step-sub{
  font-size:.95rem; line-height:1.7; color:#5b6b78; margin:0 0 24px;
}
#ls-scroll .lss-features{
  list-style:none; padding:0; margin:0;
  display:flex; flex-direction:column; gap:12px;
}
#ls-scroll .lss-feat{
  display:flex; align-items:flex-start; gap:12px;
}
#ls-scroll .lss-feat-icon{
  margin-top:3px; width:16px; height:16px; flex-shrink:0; color:#2b6cb0;
}
#ls-scroll .lss-feat-text{
  font-size:.9rem; line-height:1.6; color:#5b6b78;
}
#ls-scroll .lss-price{
  margin-top:24px; font-size:1.1rem; font-weight:800; color:#2b6cb0;
}

/* Image rows */
#ls-scroll .lss-img-row{
  min-height:90vh; display:flex; align-items:center; padding:64px 0;
}
#ls-scroll .lss-img-inner{
  width:100%; overflow:hidden; border-radius:24px;
  box-shadow:0 15px 50px rgba(15,37,51,.12);
}
#ls-scroll .lss-img-inner img{
  height:500px; width:100%; object-fit:cover; display:block;
  transition:transform .7s ease, opacity .7s ease;
}
#ls-scroll .lss-img-inner img.img-active{
  transform:scale(1); opacity:1;
}
#ls-scroll .lss-img-inner img.img-inactive{
  transform:scale(1.03); opacity:.65;
}

/* Mobile stacked */
#ls-scroll .lss-mobile-card{ padding:0; }
#ls-scroll .lss-mobile-card.bg-alt{ background:#f4f6f8; }
#ls-scroll .lss-mobile-inner{
  max-width:1320px; margin:0 auto; padding:48px 20px;
}
#ls-scroll .lss-mob-img{
  height:260px; width:100%; object-fit:cover; border-radius:20px;
  display:block; margin-bottom:28px;
  box-shadow:0 10px 40px rgba(15,37,51,.1);
}
#ls-scroll .lss-mob-title{
  font-size:1.5rem; font-weight:800; color:#0f2533; margin:0 0 12px;
}
#ls-scroll .lss-mob-sub{
  font-size:.92rem; line-height:1.7; color:#5b6b78; margin:0 0 16px;
}
      `}} />

      <section id="ls-scroll">
        {/* ── Intro band ── */}
        <div className="lss-intro">
          <div className="lss-wrap">
            <div className="lss-intro-inner">
              <h2 className="lss-intro-title">
                Statten Sie jetzt Ihre Tiefgarage mit einer zukunftsfähigen und einfach umsetzbaren E-Mobility-Lösung aus.
              </h2>
              <p className="lss-intro-body">
                Profitieren Sie von unserer Rundum-Sorglos-Lösung inklusive Lade- und Lastmanagement.
                Von der Analyse über die Installation bis zur Stromlieferung – alles aus einer Hand von ALAB Energiesysteme.
              </p>
            </div>
          </div>
        </div>

        {/* ── Desktop scrollytelling ── */}
        <div className="lss-wrap">
          {/*
            lss-outer: position:relative  → contains the absolute-panel
                       height comes from lss-right (normal flow)
          */}
          <div className="lss-outer" ref={containerRef}>

            {/* Floating text panel — JS repositions this */}
            <div className="lss-panel" ref={panelRef}>
              <div className="lss-nums">
                {SCROLL_STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`lss-num ${
                      i === activeStep ? "is-active" : i < activeStep ? "is-done" : "is-future"
                    }`}
                  >
                    {s.num}
                  </div>
                ))}
              </div>
              <h3 className="lss-step-title">{step.num}. {step.title}</h3>
              <p className="lss-step-sub">{step.subtitle}</p>
              <ul className="lss-features">
                {step.features.map((f, fi) => (
                  <li key={fi} className="lss-feat">
                    <svg className="lss-feat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="lss-feat-text">{f}</span>
                  </li>
                ))}
              </ul>
              {step.price && <p className="lss-price">{step.price}</p>}
            </div>

            {/* Right column — normal flow, provides height to lss-outer */}
            <div className="lss-right">
              {SCROLL_STEPS.map((s, i) => (
                <div
                  key={i}
                  className="lss-img-row"
                  ref={(el) => { stepRefs.current[i] = el; }}
                >
                  <div className="lss-img-inner">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      className={i === activeStep ? "img-active" : "img-inactive"}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile stacked ── */}
        <div className="lss-mobile">
          {SCROLL_STEPS.map((s, i) => (
            <div key={i} className={`lss-mobile-card${i % 2 === 1 ? " bg-alt" : ""}`}>
              <div className="lss-mobile-inner">
                <img src={s.image} alt={s.imageAlt} className="lss-mob-img" />
                <h3 className="lss-mob-title">{s.num}. {s.title}</h3>
                <p className="lss-mob-sub">{s.subtitle}</p>
                <ul className="lss-features">
                  {s.features.map((f, fi) => (
                    <li key={fi} className="lss-feat">
                      <svg className="lss-feat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="lss-feat-text">{f}</span>
                    </li>
                  ))}
                </ul>
                {s.price && <p className="lss-price">{s.price}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 – FAQ Accordion
   ═══════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    question: "Was sind die ersten Schritte für die Umsetzung?",
    answer: "Sprechen Sie Ihren Vermieter des Hauses, Ihrer Wohnung oder in selbstgenutzten Eigentumswohnungen Ihre Hausverwaltung an. Sie können sich auch direkt an uns wenden. Wir informieren Sie über das weitere Vorgehen.",
  },
  {
    question: "Ist der Einbau von Wallboxen in meiner Wohnanlage möglich?",
    answer: "Das wird im Rahmen unserer Analyse Professional detailliert geprüft. Unsere Experten begutachten die Tiefgarage vor Ort, ermitteln alle relevanten Gebäudedaten und stimmen sich mit dem Netzbetreiber ab. Am Ende erhalten Sie einen klaren Bericht mit Handlungsempfehlungen.",
  },
  {
    question: "Gibt es auch eine Ladelösung für mein Eigenheim?",
    answer: "Ja! Für Eigenheim-Besitzer bieten wir unseren Wallbox-Service mit Vor-Ort-Installationscheck an. Besuchen Sie unsere Wallbox-Seite für alle Details zu Festpreisen, Installation und Fördermöglichkeiten.",
  },
  {
    question: "Ist eine Besichtigung der Tiefgarage vor Ort nötig?",
    answer: "Ja, die Vor-Ort-Begehung ist Teil der Analyse Professional. Nur so können wir alle technischen Gegebenheiten zuverlässig prüfen. Die Hälfte der Kosten für die Analyse wird bei einem Folgeauftrag angerechnet.",
  },
  {
    question: "Reicht der vorhandene Hausanschluss aus?",
    answer: "Das wird im Rahmen der Analyse Professional ermittelt. Dank dynamischem Lastmanagement ist eine Erweiterung des Hausanschlusses oft nicht nötig. Das Lastmanagement verteilt die verfügbare Leistung intelligent auf alle Ladepunkte.",
  },
  {
    question: "Wieviel Ladeleistung steht mir an meinem persönlichem Ladepunkt zur Verfügung?",
    answer: "Die verfügbare Ladeleistung hängt von der Hausanschlussleistung und dem eingesetzten Lastmanagement-Typ ab. Im Rahmen der Analyse Professional ermitteln wir Ihren individuellen Leistungsbedarf. Unsere Wallboxen unterstützen bis zu 11 kW Ladeleistung.",
  },
  {
    question: "Was bedeutet Lastmanagement?",
    answer: "Lastmanagement ist eine intelligente Steuerung, die die verfügbare Leistung optimal auf alle Ladepunkte verteilt. Es verhindert eine Überlastung des Hausanschlusses und sorgt dafür, dass alle Fahrzeuge zuverlässig geladen werden – auch bei vielen gleichzeitigen Ladevorgängen.",
  },
  {
    question: "Was ist der Unterschied zwischen einem statischen und dynamischen Lastmanagement?",
    answer: "Beim statischen Lastmanagement wird eine feste Leistung gleichmäßig auf alle Ladepunkte aufgeteilt. Das dynamische Lastmanagement misst hingegen in Echtzeit den Gesamtverbrauch des Gebäudes und passt die Ladeleistung adaptiv an. So steht z.B. nachts, wenn weniger Strom verbraucht wird, deutlich mehr Ladeleistung zur Verfügung.",
  },
];

function LSFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-[100px]">
      <div className="mx-auto max-w-[1320px] px-7">
        <h2 className="mb-14 text-center text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.2] text-[#0f2533]">
          Alle Fragen und Antworten<br />auf einen Blick
        </h2>

        <div className="mx-auto max-w-[900px]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-[#e2e8f0]">
              <button
                className="flex w-full items-center justify-between py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="pr-4 text-[clamp(0.95rem,1.8vw,1.1rem)] font-semibold text-[#0f2533]">
                  {item.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-[#5b6b78] transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  open === i ? "max-h-[500px] pb-6" : "max-h-0"
                }`}
              >
                <p className="text-[0.92rem] leading-[1.75] text-[#5b6b78]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – CTA Abschluss (Card on parking image)
   ═══════════════════════════════════════════════ */
function LSCtaAbschluss() {
  return (
    <section className="relative py-[100px]">
      <div className="mx-auto max-w-[1320px] px-7">
        <div className="relative overflow-hidden rounded-[28px]">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=1400&q=80"
            alt="Tiefgarage mit Elektroautos"
            className="h-[550px] w-full object-cover max-[768px]:h-[700px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Card overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div
              className="max-w-[600px] rounded-[24px] bg-white/95 px-10 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-sm"
              style={{
                backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                backgroundPosition: "right top",
              }}
            >
              <div className="rounded-[18px] bg-white/90 px-8 py-10">
                <p className="mb-2 text-[clamp(1.1rem,2.5vw,1.4rem)] leading-[1.4] text-[#0f2533]">
                  Machen Sie Ihre Tiefgarage jetzt bereit für die
                </p>
                <p className="mb-2 text-[clamp(1.1rem,2.5vw,1.4rem)] font-bold leading-[1.4] text-[#0f2533]">
                  E-Mobilität von morgen!
                </p>
                <p className="mb-2 text-[clamp(1.1rem,2.5vw,1.4rem)] leading-[1.4] text-[#0f2533]">
                  Jetzt kostenlose Beratung <strong>anfordern</strong>
                </p>
                <p className="mb-8 text-[clamp(1.1rem,2.5vw,1.4rem)] leading-[1.4] text-[#0f2533]">
                  Unsere Experten melden sich<br /><strong>zeitnah bei Ihnen.</strong>
                </p>
                <a
                  href="#angebot"
                  data-open-angebot="ladesaeulen-mid-beratung"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#fbbf24] px-8 py-4 text-[0.95rem] font-bold text-[#0f2533] shadow-[0_4px_15px_rgba(251,191,36,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                  Jetzt kostenlose Beratung anfordern!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5 – Kontaktformular
   ═══════════════════════════════════════════════ */
function LSKontaktFormular() {
  const [step, setStep] = useState(1);
  const [stellplaetze, setStellplaetze] = useState("");
  const [duplex, setDuplex] = useState("");
  const [rolle, setRolle] = useState("");

  return (
    <section id="kontakt" className="py-[100px] bg-[#f4f6f8]">
      <div className="mx-auto max-w-[1320px] px-7">
        <div className="mx-auto max-w-[800px]">
          <h2 className="mb-3 text-center text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-[#0f2533]">
            Ladelösung für Tiefgaragen
          </h2>
          <p className="mb-10 text-center text-[1.05rem] text-[#5b6b78]">
            Jetzt kostenlose Beratung anfordern!
          </p>

          {/* Progress bar */}
          <div className="mb-10 flex items-center gap-3">
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-[#2b6cb0]" : "bg-[#e2e8f0]"}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-[#2b6cb0]" : "bg-[#e2e8f0]"}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 ? "bg-[#2b6cb0]" : "bg-[#e2e8f0]"}`} />
          </div>

          {/* Info Banner */}
          <div className="mb-8 rounded-2xl bg-[#fef3cd] px-6 py-5">
            <p className="text-[0.92rem] leading-[1.65] text-[#0f2533]">
              <strong>Wichtig zu wissen:</strong> Mit dieser Anfrage erhalten Sie zunächst eine kostenlose Beratung. Unsere Experten prüfen Ihre individuellen Gegebenheiten und erstellen Ihnen ein maßgeschneidertes Angebot.
            </p>
          </div>

          {/* Step 1 – Objekt */}
          {step === 1 && (
            <div>
              <h3 className="mb-6 text-[1.2rem] font-bold text-[#0f2533]">Angaben zum Objekt</h3>

              <div className="mb-6">
                <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                  Anzahl Stellplätze <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 max-[600px]:flex-col">
                  {["0-20", "21-50", "50+"].map((opt) => (
                    <button
                      key={opt}
                      className={`flex-1 rounded-xl border-2 px-5 py-3.5 text-[0.95rem] font-semibold transition-all ${
                        stellplaetze === opt
                          ? "border-[#2b6cb0] bg-[#2b6cb0]/5 text-[#2b6cb0]"
                          : "border-[#e2e8f0] text-[#5b6b78] hover:border-[#2b6cb0]/30"
                      }`}
                      onClick={() => setStellplaetze(opt)}
                    >
                      {opt} Stellplätze
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    PLZ <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" placeholder="z.B. 86150" />
                </div>
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    Ort <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" placeholder="z.B. Augsburg" />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                  Straße und Hausnummer <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" placeholder="z.B. Musterstraße 12" />
              </div>

              <div className="mb-8">
                <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                  Duplex-Parkplätze vorhanden?
                </label>
                <div className="flex gap-3">
                  {["Ja", "Nein"].map((opt) => (
                    <button
                      key={opt}
                      className={`rounded-xl border-2 px-8 py-3.5 text-[0.95rem] font-semibold transition-all ${
                        duplex === opt
                          ? "border-[#2b6cb0] bg-[#2b6cb0]/5 text-[#2b6cb0]"
                          : "border-[#e2e8f0] text-[#5b6b78] hover:border-[#2b6cb0]/30"
                      }`}
                      onClick={() => setDuplex(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full rounded-xl bg-[#2b6cb0] py-4 text-[0.95rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,108,176,0.3)]"
                onClick={() => setStep(2)}
              >
                Nächster Schritt
              </button>
            </div>
          )}

          {/* Step 2 – Hausverwaltung */}
          {step === 2 && (
            <div>
              <h3 className="mb-6 text-[1.2rem] font-bold text-[#0f2533]">Angaben zur Hausverwaltung</h3>

              <div className="mb-6">
                <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                  Name der Hausverwaltung
                </label>
                <input type="text" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" placeholder="Optional" />
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    E-Mail der Hausverwaltung
                  </label>
                  <input type="email" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" placeholder="Optional" />
                </div>
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    Telefon der Hausverwaltung
                  </label>
                  <input type="tel" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" placeholder="Optional" />
                </div>
              </div>

              <div className="mb-8">
                <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                  Gesamtanzahl Stellplätze
                </label>
                <input type="number" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" placeholder="Optional" />
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 rounded-xl border-2 border-[#e2e8f0] py-4 text-[0.95rem] font-bold text-[#5b6b78] transition-all hover:border-[#2b6cb0]/30"
                  onClick={() => setStep(1)}
                >
                  Zurück
                </button>
                <button
                  className="flex-1 rounded-xl bg-[#2b6cb0] py-4 text-[0.95rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,108,176,0.3)]"
                  onClick={() => setStep(3)}
                >
                  Nächster Schritt
                </button>
              </div>
            </div>
          )}

          {/* Step 3 – Persönliche Daten */}
          {step === 3 && (
            <div>
              <h3 className="mb-6 text-[1.2rem] font-bold text-[#0f2533]">Ihre persönlichen Daten</h3>

              <div className="mb-6 grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    Vorname <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" />
                </div>
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    Nachname <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    E-Mail <span className="text-red-500">*</span>
                  </label>
                  <input type="email" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" />
                </div>
                <div>
                  <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" className="w-full rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[#2b6cb0]" />
                </div>
              </div>

              <div className="mb-8">
                <label className="mb-2 block text-[0.9rem] font-semibold text-[#0f2533]">
                  Ihre Rolle <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Mieter", "Eigentümer", "WEG-Sprecher", "Hausverwalter", "Bauträger", "Gewerbetreibender"].map((opt) => (
                    <button
                      key={opt}
                      className={`rounded-xl border-2 px-5 py-3 text-[0.9rem] font-semibold transition-all ${
                        rolle === opt
                          ? "border-[#2b6cb0] bg-[#2b6cb0]/5 text-[#2b6cb0]"
                          : "border-[#e2e8f0] text-[#5b6b78] hover:border-[#2b6cb0]/30"
                      }`}
                      onClick={() => setRolle(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Datenschutz */}
              <div className="mb-8 flex items-start gap-3">
                <input type="checkbox" id="datenschutz" className="mt-1 h-5 w-5 shrink-0 rounded border-[#e2e8f0] accent-[#2b6cb0]" />
                <label htmlFor="datenschutz" className="text-[0.85rem] leading-[1.6] text-[#5b6b78]">
                  Ich habe die <a href="https://www.alabenergiesysteme.de/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-[#2b6cb0] underline">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu. <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 rounded-xl border-2 border-[#e2e8f0] py-4 text-[0.95rem] font-bold text-[#5b6b78] transition-all hover:border-[#2b6cb0]/30"
                  onClick={() => setStep(2)}
                >
                  Zurück
                </button>
                <button
                  className="flex-1 rounded-xl bg-[#2b6cb0] py-4 text-[0.95rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,108,176,0.3)]"
                  onClick={() => alert("Anfrage gesendet! Vielen Dank.")}
                >
                  Kostenlose Beratung anfordern
                </button>
              </div>

              <p className="mt-4 text-center text-[0.8rem] text-[#5b6b78]">
                * Pflichtfeld
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
