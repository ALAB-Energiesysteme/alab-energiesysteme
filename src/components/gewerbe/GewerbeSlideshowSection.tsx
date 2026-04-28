"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach1.avif",
    badge: "Langfristige Planungssicherheit",
    title: "Vom Kostenfaktor zum Wettbewerbsvorteil",
    paragraphs: [
      "Energiepreise sind ein Risiko für Ihre Kalkulation. Die Lösung liegt auf Ihrem eigenen Dach. Machen Sie sich unabhängig von volatilen Märkten: Eine eigene PV-Anlage tauscht unkalkulierbare Strompreiserhöhungen gegen fixierte, niedrige Gestehungskosten – und das für Jahrzehnte.",
    ],
  },
  {
    image: "/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach2.avif",
    badge: "Bis zu 80% Kostenersparnis",
    title: "Die Rechnung ist eindeutig: 10 Cent statt 30 Cent",
    paragraphs: [
      "Das Einsparpotenzial ist enorm: Je nach Eigenverbrauchsquote können Unternehmen ihre Stromkosten um bis zu 80\u00A0% reduzieren. Der selbst erzeugte Solarstrom kostet im Schnitt nur ca. 8–12 Cent/kWh – ein Bruchteil der aktuellen Netzstrompreise.",
      "Zum Vergleich: Gewerbekunden zahlten 2024 im Durchschnitt 30,52 Cent/kWh. Je höher der Eigenverbrauch, desto schneller amortisiert sich die Investition.",
    ],
  },
  {
    image: "/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach3.avif",
    badge: "Schnelle Amortisation in 4–6 Jahren",
    title: "Ab wann lohnt sich eine Photovoltaikanlage?",
    paragraphs: [
      "Eine PV-Anlage ist immer dann wirtschaftlich interessant, wenn ein hoher Eigenverbrauch besteht. Vor allem Betriebe mit energieintensiven Prozessen erreichen kurze Amortisationszeiten.",
      "Ab rund 1.000\u00A0m² Dachfläche lassen sich besonders attraktive Anlagen realisieren. Doch auch kleinere Unternehmen profitieren – durch Leasing, Contracting oder Direktkauf ohne hohe Anfangsinvestitionen.",
    ],
  },
];

export default function GewerbeSlideshowSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  /* Auto-advance */
  function startAuto() {
    stopAuto();
    timerRef.current = setInterval(() => {
      setDirection("next");
      setActive((prev) => (prev + 1) % slides.length);
    }, 7000);
  }
  function stopAuto() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }
  function resetAuto() { stopAuto(); startAuto(); }

  function goTo(i: number) {
    setDirection(i > active ? "next" : "prev");
    setActive(i);
    resetAuto();
  }
  function goPrev() {
    setDirection("prev");
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
    resetAuto();
  }
  function goNext() {
    setDirection("next");
    setActive((prev) => (prev + 1) % slides.length);
    resetAuto();
  }

  useEffect(() => {
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keyboard */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    };
    el.addEventListener("keydown", handler as EventListener);
    return () => el.removeEventListener("keydown", handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
#gewerbe-slideshow{
  --primary:#2b6cb0; --primary-light:#6aa6e8; --primary-dark:#1e4f8b;
  font-family:'Montserrat',sans-serif;
  position:relative; overflow:hidden;
  /* section fills viewport height but min 600px */
  height:clamp(600px, 80vh, 900px);
  background:#0f2533;
}

/* ─── Background images ─── */
#gewerbe-slideshow .gs-bg{
  position:absolute; inset:0; z-index:0;
}
#gewerbe-slideshow .gs-bg-slide{
  position:absolute; inset:0;
  opacity:0; transition: opacity 1s cubic-bezier(.4,0,.2,1);
  will-change:opacity;
}
#gewerbe-slideshow .gs-bg-slide.gs-active{
  opacity:1; z-index:1;
}
#gewerbe-slideshow .gs-bg-slide img{
  width:100%; height:100%; object-fit:cover; display:block;
  /* subtle slow zoom on active slide */
  transform:scale(1.04);
  transition: transform 8s cubic-bezier(.2,.6,.2,1);
}
#gewerbe-slideshow .gs-bg-slide.gs-active img{
  transform:scale(1);
}

/* dark overlay – stronger on right side where text sits */
#gewerbe-slideshow .gs-overlay{
  position:absolute; inset:0; z-index:2;
  background:
    linear-gradient(90deg,
      rgba(15,37,51,.35) 0%,
      rgba(15,37,51,.55) 40%,
      rgba(15,37,51,.82) 70%,
      rgba(15,37,51,.92) 100%
    );
}
/* bottom gradient for progress bar area */
#gewerbe-slideshow .gs-overlay::after{
  content:''; position:absolute; left:0; right:0; bottom:0; height:120px;
  background:linear-gradient(to top, rgba(15,37,51,.7), transparent);
  z-index:3;
}

/* ─── Content panel (right side) ─── */
#gewerbe-slideshow .gs-content{
  position:relative; z-index:5;
  height:100%; display:flex; align-items:center; justify-content:flex-end;
  max-width:1320px; margin:0 auto; padding:0 48px;
}

#gewerbe-slideshow .gs-panel{
  max-width:540px; width:100%;
  position:relative;
}

/* slide content animation */
#gewerbe-slideshow .gs-slide-content{
  position:absolute; top:50%; left:0; right:0;
  transform:translateY(-50%);
  opacity:0; pointer-events:none;
  transition: opacity .6s ease, transform .6s cubic-bezier(.4,0,.2,1);
}
#gewerbe-slideshow .gs-slide-content.gs-entering-next{
  transform:translateY(-40%); opacity:0;
}
#gewerbe-slideshow .gs-slide-content.gs-entering-prev{
  transform:translateY(-60%); opacity:0;
}
#gewerbe-slideshow .gs-slide-content.gs-active{
  position:relative; top:auto; transform:translateY(0);
  opacity:1; pointer-events:auto;
  transition: opacity .7s ease .15s, transform .7s cubic-bezier(.16,1,.3,1) .15s;
}

/* text elements */
#gewerbe-slideshow .gs-slide-num{
  display:inline-flex; align-items:center; justify-content:center;
  width:36px; height:36px; border-radius:10px;
  background:linear-gradient(135deg, var(--primary), var(--primary-light));
  color:#fff; font-weight:800; font-size:.85rem;
  margin-bottom:20px; box-shadow:0 4px 16px rgba(43,108,176,.35);
}

#gewerbe-slideshow .gs-slide-badge{
  display:inline-block;
  padding:6px 16px; border-radius:999px;
  background:rgba(106,166,232,.15); border:1px solid rgba(106,166,232,.25);
  color:#b9d8ff; font-size:.72rem; font-weight:600;
  letter-spacing:.6px; text-transform:uppercase;
  margin-bottom:20px;
}

#gewerbe-slideshow .gs-slide-title{
  font-size:clamp(1.5rem,3vw,2.2rem); font-weight:800;
  color:#fff; line-height:1.2; margin:0 0 16px;
  letter-spacing:-.02em;
}

#gewerbe-slideshow .gs-slide-text{
  font-size:.95rem; line-height:1.8; color:rgba(255,255,255,.75);
  margin:0 0 12px;
}
#gewerbe-slideshow .gs-slide-text:last-of-type{
  margin-bottom:0;
}

/* ─── Navigation arrows ─── */
#gewerbe-slideshow .gs-arrows{
  position:absolute; left:48px; bottom:0;
  display:flex; gap:10px; z-index:10;
  /* vertically aligned with progress bar */
  transform:translateY(calc(-50% - 30px));
  top:50%;
}
#gewerbe-slideshow .gs-arrow{
  width:48px; height:48px; border-radius:50%;
  border:1px solid rgba(255,255,255,.2);
  background:rgba(255,255,255,.06); backdrop-filter:blur(10px);
  color:rgba(255,255,255,.8); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:all .25s ease;
}
#gewerbe-slideshow .gs-arrow:hover{
  background:rgba(255,255,255,.15); border-color:rgba(255,255,255,.35);
  color:#fff; transform:scale(1.06);
}
#gewerbe-slideshow .gs-arrow svg{
  width:18px; height:18px;
}

/* ─── Progress bar / dots (bottom center) ─── */
#gewerbe-slideshow .gs-progress{
  position:absolute; bottom:36px; left:50%; transform:translateX(-50%);
  z-index:10; display:flex; align-items:center; gap:12px;
}

#gewerbe-slideshow .gs-dot{
  width:48px; height:3px; border-radius:999px;
  background:rgba(255,255,255,.2); cursor:pointer;
  position:relative; overflow:hidden;
  transition:background .3s;
  border:0; padding:0;
}
#gewerbe-slideshow .gs-dot::after{
  content:''; position:absolute; inset:0; border-radius:999px;
  background:linear-gradient(90deg, var(--primary-light), #fff);
  transform:scaleX(0); transform-origin:left;
  transition:none;
}
#gewerbe-slideshow .gs-dot.gs-dot-active::after{
  transform:scaleX(1);
  transition:transform 7s linear;
}
#gewerbe-slideshow .gs-dot.gs-dot-done::after{
  transform:scaleX(1);
  transition:none;
}

/* slide counter */
#gewerbe-slideshow .gs-counter{
  color:rgba(255,255,255,.5); font-size:.75rem; font-weight:600;
  letter-spacing:.5px; margin-left:8px;
}

/* ─── Responsive ─── */
@media(max-width:1024px){
  #gewerbe-slideshow .gs-arrows{
    left:28px;
  }
  #gewerbe-slideshow .gs-content{
    padding:0 32px;
  }
}

@media(max-width:768px){
  #gewerbe-slideshow{
    height:auto; min-height:0;
  }
  /* stack: image on top, text below */
  #gewerbe-slideshow .gs-bg{
    position:relative; height:280px;
  }
  #gewerbe-slideshow .gs-bg-slide{
    /* only show active */
  }
  #gewerbe-slideshow .gs-overlay{
    background:linear-gradient(to bottom,
      rgba(15,37,51,.15) 0%,
      rgba(15,37,51,.6) 70%,
      rgba(15,37,51,.95) 100%
    );
  }
  #gewerbe-slideshow .gs-content{
    padding:28px 20px 80px;
    justify-content:flex-start;
  }
  #gewerbe-slideshow .gs-panel{
    max-width:100%;
  }
  #gewerbe-slideshow .gs-slide-title{
    font-size:1.4rem;
  }
  #gewerbe-slideshow .gs-slide-text{
    font-size:.9rem;
  }
  #gewerbe-slideshow .gs-arrows{
    left:auto; right:20px; top:240px; transform:none;
    flex-direction:row;
  }
  #gewerbe-slideshow .gs-arrow{
    width:40px; height:40px;
  }
  #gewerbe-slideshow .gs-progress{
    bottom:24px;
  }
  #gewerbe-slideshow .gs-dot{
    width:36px;
  }
}

@media(max-width:480px){
  #gewerbe-slideshow .gs-slide-text{
    font-size:.85rem; line-height:1.7;
  }
  #gewerbe-slideshow .gs-slide-badge{
    font-size:.68rem;
  }
}
      `}} />

      <section
        id="gewerbe-slideshow"
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Gewerbe-Diashow"
        tabIndex={0}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        {/* ── Background images ── */}
        <div className="gs-bg">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`gs-bg-slide${i === active ? " gs-active" : ""}`}
              aria-hidden={i !== active}
            >
              <img
                src={slide.image}
                alt=""
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
          <div className="gs-overlay" />
        </div>

        {/* ── Left arrows ── */}
        <div className="gs-arrows">
          <button className="gs-arrow" onClick={goPrev} aria-label="Vorheriger Slide" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="gs-arrow" onClick={goNext} aria-label="Nächster Slide" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        </div>

        {/* ── Content (right side) ── */}
        <div className="gs-content">
          <div className="gs-panel">
            {slides.map((slide, i) => {
              let className = "gs-slide-content";
              if (i === active) {
                className += " gs-active";
              } else if (direction === "next") {
                className += " gs-entering-next";
              } else {
                className += " gs-entering-prev";
              }
              return (
                <div key={i} className={className} aria-hidden={i !== active}>
                  <div className="gs-slide-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="gs-slide-badge">{slide.badge}</div>
                  <h2 className="gs-slide-title">{slide.title}</h2>
                  {slide.paragraphs.map((p, j) => (
                    <p key={j} className="gs-slide-text">{p}</p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Progress dots (bottom center) ── */}
        <div className="gs-progress">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`gs-dot${i === active ? " gs-dot-active" : i < active ? " gs-dot-done" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              type="button"
            />
          ))}
          <span className="gs-counter">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </section>
    </>
  );
}
