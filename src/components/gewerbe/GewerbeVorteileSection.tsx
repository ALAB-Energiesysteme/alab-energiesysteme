"use client";

import { useEffect, useRef } from "react";

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Krisensichere Stromversorgung",
    description:
      "Sch\u00FCtzen Sie Ihr Unternehmen vor Stromausf\u00E4llen und Netzinstabilit\u00E4ten. Mit Batteriespeicher sind Sie autark und produktionsf\u00E4hig.",
    metricValue: "100%",
    metricLabel: "Versorgungssicherheit",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    title: "Fixe Stromgestehungskosten",
    description:
      "Kalkulieren Sie mit stabilen Energiekosten von 8\u201312 Cent/kWh statt volatilen Marktpreisen von 30+ Cent.",
    metricValue: "8\u201312",
    metricLabel: "Cent/kWh Solarstrom",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Schnelle Amortisation",
    description:
      "Durch hohe Eigenverbrauchsquoten und staatliche F\u00F6rderungen amortisiert sich Ihre Anlage bereits nach 4\u20136 Jahren.",
    metricValue: "4\u20136",
    metricLabel: "Jahre Payback",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
      </svg>
    ),
    title: "CO\u2082-Reduktion & Image",
    description:
      "Verbessern Sie Ihre CO\u2082-Bilanz um bis zu 500 Tonnen j\u00E4hrlich und st\u00E4rken Sie Ihr nachhaltiges Unternehmensimage.",
    metricValue: "500t",
    metricLabel: "CO\u2082 Einsparung/Jahr",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    title: "F\u00F6rdermittel & Steuervorteile",
    description:
      "Nutzen Sie attraktive KfW-Kredite, regionale F\u00F6rderungen und Abschreibungsm\u00F6glichkeiten f\u00FCr maximale Rentabilit\u00E4t.",
    metricValue: "40%",
    metricLabel: "Investitionsf\u00F6rderung",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Wertsteigerung der Immobilie",
    description:
      "Erh\u00F6hen Sie den Wert Ihrer Gewerbeimmobilie nachhaltig durch moderne Energietechnik und ESG-Konformit\u00E4t.",
    metricValue: "+15%",
    metricLabel: "Immobilienwert",
  },
];

const sectionStyles = `
  #gewerbe-vorteile {
    background: #ffffff;
    padding: 5rem 0;
    font-family: 'Montserrat', sans-serif;
  }

  #gewerbe-vorteile .gv-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 28px;
  }

  #gewerbe-vorteile .gv-header {
    text-align: center;
    margin-bottom: 0;
  }

  #gewerbe-vorteile .gv-badge {
    padding: 6px 18px;
    background: linear-gradient(135deg, #1e4f8b, #6aa6e8);
    border-radius: 20px;
    font-size: .75rem;
    font-weight: 600;
    letter-spacing: .5px;
    text-transform: uppercase;
    color: #fff;
    display: inline-block;
    margin-bottom: 1rem;
  }

  #gewerbe-vorteile .gv-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: #0f2533;
    margin-bottom: .5rem;
  }

  #gewerbe-vorteile .gv-underline {
    width: 64px;
    height: 4px;
    background: linear-gradient(135deg, #2b6cb0, #6aa6e8);
    border-radius: 2px;
    margin: 0 auto;
  }

  #gewerbe-vorteile .gv-subtitle {
    font-size: .95rem;
    line-height: 1.6;
    max-width: 800px;
    color: #5b6b78;
    margin: 1rem auto 3rem;
  }

  #gewerbe-vorteile .gv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  #gewerbe-vorteile .gv-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 32px 28px;
    transition: transform .3s ease, box-shadow .3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .05);
    opacity: 0;
    transform: translateY(30px);
  }

  #gewerbe-vorteile .gv-card.gv-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity .6s ease, transform .6s ease, box-shadow .3s ease;
  }

  #gewerbe-vorteile .gv-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(43, 108, 176, .12);
  }

  #gewerbe-vorteile .gv-card.gv-visible:hover {
    transform: translateY(-6px);
  }

  #gewerbe-vorteile .gv-icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(43, 108, 176, .1), rgba(106, 166, 232, .1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    color: #2b6cb0;
  }

  #gewerbe-vorteile .gv-card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f2533;
    margin-bottom: .5rem;
  }

  #gewerbe-vorteile .gv-card-desc {
    font-size: .92rem;
    line-height: 1.65;
    color: #5b6b78;
    margin-bottom: 1rem;
  }

  #gewerbe-vorteile .gv-metric {
    display: flex;
    align-items: baseline;
    gap: .5rem;
  }

  #gewerbe-vorteile .gv-metric-value {
    font-size: 1.6rem;
    font-weight: 800;
    background: linear-gradient(135deg, #2b6cb0, #6aa6e8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  #gewerbe-vorteile .gv-metric-label {
    font-size: .8rem;
    color: #5b6b78;
  }

  @media (max-width: 1024px) {
    #gewerbe-vorteile .gv-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    #gewerbe-vorteile {
      padding: 3rem 0;
    }
    #gewerbe-vorteile .gv-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function GewerbeVorteileSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".gv-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const delay = Number(card.dataset.index) * 120;
            setTimeout(() => {
              card.classList.add("gv-visible");
            }, delay);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gewerbe-vorteile">
      <style dangerouslySetInnerHTML={{ __html: sectionStyles }} />
      <div className="gv-container">
        <div className="gv-header">
          <span className="gv-badge">Ihre Vorteile</span>
          <h2 className="gv-title">
            Ihre Vorteile mit gewerblicher Photovoltaik
          </h2>
          <div className="gv-underline" />
          <p className="gv-subtitle">
            Profitieren Sie von maximaler Wirtschaftlichkeit und
            Planungssicherheit
          </p>
        </div>
        <div className="gv-grid" ref={gridRef}>
          {benefits.map((benefit, index) => (
            <div className="gv-card" key={index} data-index={index}>
              <div className="gv-icon">{benefit.icon}</div>
              <h3 className="gv-card-title">{benefit.title}</h3>
              <p className="gv-card-desc">{benefit.description}</p>
              <div className="gv-metric">
                <span className="gv-metric-value">{benefit.metricValue}</span>
                <span className="gv-metric-label">{benefit.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
