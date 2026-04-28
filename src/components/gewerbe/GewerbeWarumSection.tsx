"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const sectionStyles = `
#gewerbe-warum {
  font-family: 'Montserrat', sans-serif;
  --primary: #2b6cb0;
  --primary-light: #6aa6e8;
  --primary-dark: #1e4f8b;
  --primary-gradient: linear-gradient(135deg, #2b6cb0, #6aa6e8);
  --text-dark: #0f2533;
  --text-muted: #5b6b78;
  background: #f8fafc;
  padding: 5rem 0;
}

#gewerbe-warum .gw-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 28px;
}

#gewerbe-warum .gw-header {
  text-align: center;
}

#gewerbe-warum .gw-badge {
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

#gewerbe-warum .gw-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #0f2533;
  margin: 0 0 .75rem;
}

#gewerbe-warum .gw-underline {
  width: 60px;
  height: 3px;
  background: var(--primary-gradient);
  border-radius: 2px;
  margin: 0 auto .75rem;
}

#gewerbe-warum .gw-subtitle {
  font-size: .95rem;
  line-height: 1.6;
  color: #5b6b78;
  max-width: 800px;
  margin: .75rem auto 3rem;
}

#gewerbe-warum .gw-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 4rem;
}

#gewerbe-warum .gw-card {
  background: #fff;
  border-radius: 20px;
  padding: 36px 28px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 14px rgba(0,0,0,.05);
  transition: transform .3s, box-shadow .3s;
  opacity: 0;
  transform: translateY(30px);
}

#gewerbe-warum .gw-card.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity .6s ease, transform .6s ease, box-shadow .3s;
}

#gewerbe-warum .gw-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(43,108,176,.1);
}

#gewerbe-warum .gw-card.visible:hover {
  transform: translateY(-4px);
}

#gewerbe-warum .gw-card-number {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2b6cb0, #6aa6e8);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 1.25rem;
}

#gewerbe-warum .gw-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f2533;
  margin-bottom: .75rem;
}

#gewerbe-warum .gw-card-desc {
  font-size: .92rem;
  line-height: 1.65;
  color: #5b6b78;
  margin-bottom: 1.25rem;
}

#gewerbe-warum .gw-card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

#gewerbe-warum .gw-card-list li {
  font-size: .88rem;
  color: #0f2533;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: .6rem;
}

#gewerbe-warum .gw-check-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(43,108,176,.1), rgba(106,166,232,.15));
  color: #2b6cb0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: .65rem;
}

#gewerbe-warum .gw-value-block {
  background: linear-gradient(135deg, #0f2533 0%, #1a3a52 100%);
  border-radius: 24px;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
}

#gewerbe-warum .gw-value-block.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity .6s ease, transform .6s ease;
}

#gewerbe-warum .gw-value-title {
  font-size: clamp(1.3rem, 2.5vw, 1.6rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
}

#gewerbe-warum .gw-value-text {
  font-size: .95rem;
  line-height: 1.7;
  color: rgba(255,255,255,.8);
  margin: 0 0 1rem;
}

#gewerbe-warum .gw-value-text:last-child {
  margin-bottom: 0;
}

#gewerbe-warum .gw-cta-card {
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
}

#gewerbe-warum .gw-cta-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 .75rem;
}

#gewerbe-warum .gw-cta-desc {
  font-size: .92rem;
  line-height: 1.6;
  color: rgba(255,255,255,.7);
  margin: 0 0 1.5rem;
}

#gewerbe-warum .gw-cta-btn {
  display: inline-block;
  padding: 14px 28px;
  background: var(--primary-gradient);
  border-radius: 999px;
  color: #fff;
  font-weight: 700;
  font-size: .95rem;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  transition: transform .2s, box-shadow .2s;
}

#gewerbe-warum .gw-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(43,108,176,.35);
}

@media (max-width: 1024px) {
  #gewerbe-warum .gw-cards-grid {
    grid-template-columns: 1fr;
  }
  #gewerbe-warum .gw-value-block {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  #gewerbe-warum {
    padding: 3rem 0;
  }
  #gewerbe-warum .gw-card {
    padding: 28px 22px;
  }
}
`;

const cards = [
  {
    number: "01",
    title: "Sicherheit & Normenkonformit\u00e4t",
    desc: "Wir planen und bauen nach aktuellen VDE-, VOB- und VdS-Vorgaben. Revisionsunterlagen (DWG), Blitz-/Brandschutz-Konzepte und saubere Dokumentation sorgen f\u00fcr eine reibungslose Abnahme \u2013 auch bei anspruchsvollen Gewerbeda\u0308chern.",
    list: ["VDE/VOB/VdS-konform", "Vollst\u00e4ndige Dokumentation", "Brandschutz-Konzepte"],
  },
  {
    number: "02",
    title: "Vertragssicherheit",
    desc: "Transparente Angebote, VOB-gerechte Abwicklung und belastbare Projektsteuerung. F\u00fcr Generalunternehmer, Ingenieurb\u00fcros und \u00f6ffentliche Auftraggeber bieten wir klare Zust\u00e4ndigkeiten und terminsichere Umsetzung.",
    list: ["Transparente Angebote", "VOB-gerechte Abwicklung", "Terminsichere Umsetzung"],
  },
  {
    number: "03",
    title: "Effizienz & Pr\u00e4zision",
    desc: "Engineering-Qualit\u00e4t vom Layout \u00fcber Unterkonstruktion und Statik bis zur Z\u00e4hler-/Schutztechnik. Kurze Bauzeiten, saubere Baustellenf\u00fchrung, digitale \u00dcberwachung \u2013 f\u00fcr maximale Performance und minimale Stillstandszeiten.",
    list: ["Engineering-Qualit\u00e4t", "Kurze Bauzeiten", "Digitale \u00dcberwachung"],
  },
];

export default function GewerbeWarumSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".gw-card, .gw-value-block");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gewerbe-warum" ref={sectionRef}>
      <style dangerouslySetInnerHTML={{ __html: sectionStyles }} />

      <div className="gw-container">
        <div className="gw-header">
          <span className="gw-badge">Warum ALAB</span>
          <h2 className="gw-title">
            Warum Unternehmen auf ALAB Energiesysteme setzen
          </h2>
          <div className="gw-underline" />
          <p className="gw-subtitle">
            Ingenieurgetriebene PV-Komplettl&ouml;sungen f&uuml;r Gewerbe und
            Industrie &ndash; von der pr&auml;zisen Planung bis zur sauberen
            Inbetriebnahme, normgerecht dokumentiert und wirtschaftlich gedacht.
          </p>
        </div>

        <div className="gw-cards-grid">
          {cards.map((card) => (
            <div className="gw-card" key={card.number}>
              <div className="gw-card-number">{card.number}</div>
              <div className="gw-card-title">{card.title}</div>
              <p className="gw-card-desc">{card.desc}</p>
              <ul className="gw-card-list">
                {card.list.map((item) => (
                  <li key={item}>
                    <span className="gw-check-circle">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gw-value-block">
          <div className="gw-value-left">
            <h3 className="gw-value-title">
              Komplettl&ouml;sung aus einer Hand
            </h3>
            <p className="gw-value-text">
              Mit ALAB Energiesysteme erhalten Sie eine wirtschaftliche und
              zukunftssichere PV-L&ouml;sung zur nachhaltigen Reduktion Ihrer
              Energiekosten. Wir begleiten Sie von der Konzeption &uuml;ber
              Installation bis zur Wartung &ndash; alles aus einer Hand.
            </p>
            <p className="gw-value-text">
              Unsere ma&szlig;geschneiderten Systeme machen Unternehmen jeder
              Gr&ouml;&szlig;e unabh&auml;ngiger von
              Strompreisschwankungen und steigern zugleich die
              Energieeffizienz &ndash; inklusive Monitoring und transparenten
              Leistungskennzahlen.
            </p>
          </div>

          <div className="gw-cta-card">
            <h4 className="gw-cta-title">
              Bereit f&uuml;r Ihr PV-Projekt?
            </h4>
            <p className="gw-cta-desc">
              Sprechen wir &uuml;ber Ihr Projekt und finden gemeinsam die
              optimale L&ouml;sung f&uuml;r Ihr Unternehmen.
            </p>
            <Link href="/kontakt" className="gw-cta-btn">
              Jetzt unverbindlich anfragen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
