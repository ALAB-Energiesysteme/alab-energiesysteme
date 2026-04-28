"use client";

import { useEffect, useRef, useState } from "react";

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const categories = [
  { key: "alle", label: "Alle Fragen", count: 7 },
  { key: "kosten", label: "Kosten & Investition", count: 2 },
  { key: "wirtschaftlichkeit", label: "Wirtschaftlichkeit", count: 3 },
  { key: "steuer", label: "F\u00F6rderung & Steuern", count: 2 },
];

const faqItems: FAQItem[] = [
  {
    category: "kosten",
    question:
      "Wie hoch sind die typischen Anschaffungskosten f\u00FCr eine gewerbliche PV-Anlage?",
    answer:
      "Die Gesamtkosten richten sich nach Anlagengr\u00F6\u00DFe, Dachbeschaffenheit und Komponenten. Im Schnitt bewegen sich Investitionen bei ca. 500\u20131.000 EUR pro kWp. Gr\u00F6\u00DFere Anlagen sind pro kWp in der Regel g\u00FCnstiger.",
  },
  {
    category: "steuer",
    question: "Gibt es F\u00F6rderungen oder Zusch\u00FCsse f\u00FCr Unternehmen?",
    answer:
      "Ja. Unternehmen profitieren von KfW-F\u00F6rderkrediten, regionalen Zusch\u00FCssen und steuerlichen Abschreibungsm\u00F6glichkeiten. Auch Contracting-Modelle erm\u00F6glichen Investitionen ohne Eigenkapital.",
  },
  {
    category: "wirtschaftlichkeit",
    question:
      "Wie lange dauert es, bis sich eine PV-Anlage amortisiert?",
    answer:
      "In den meisten F\u00E4llen 5 bis 10 Jahre. Der Zeitraum h\u00E4ngt vom Strompreis, der Eigenverbrauchsquote und den F\u00F6rderbedingungen ab. Steigende Energiepreise verk\u00FCrzen die Amortisationszeit zus\u00E4tzlich.",
  },
  {
    category: "kosten",
    question:
      "Mit welchen Betriebskosten muss nach der Installation gerechnet werden?",
    answer:
      "Eine PV-Anlage verursacht nur geringe laufende Kosten: Inspektionen, Versicherung und gelegentliche Reinigung. \u00DCblicherweise unter 2\u00A0% der Investitionssumme pro Jahr.",
  },
  {
    category: "wirtschaftlichkeit",
    question:
      "Lohnt sich eine PV-Anlage auch bei niedrigen Strompreisen?",
    answer:
      "Ja. Eigenstrom ist meist g\u00FCnstiger als Netzstrom. Zudem sch\u00FCtzt eine PV-Anlage vor k\u00FCnftigen Preiserh\u00F6hungen und macht Energiekosten langfristig berechenbarer.",
  },
  {
    category: "wirtschaftlichkeit",
    question: "Kann \u00FCbersch\u00FCssiger Solarstrom verkauft werden?",
    answer:
      "Ja. Nicht genutzter Solarstrom wird ins \u00F6ffentliche Netz eingespeist und verg\u00FCtet. Alternativ k\u00F6nnen \u00FCber Direktvermarktung oder Stromabnahmevertr\u00E4ge (PPA) zus\u00E4tzliche Einnahmen erzielt werden.",
  },
  {
    category: "steuer",
    question:
      "Welche steuerlichen Vorteile bringt eine PV-Anlage f\u00FCr Unternehmen?",
    answer:
      "PV-Anlagen k\u00F6nnen \u00FCber die AfA abgeschrieben werden. Zudem erlaubt der Investitionsabzugsbetrag (IAB), bis zu 50\u00A0% der Kosten schon vorab steuerlich geltend zu machen. Konkrete Details kl\u00E4ren Sie am besten mit Ihrem Steuerberater.",
  },
];

export default function GewerbeFAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("alle");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredItems =
    activeCategory === "alle"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    setOpenIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === openIndex) {
        el.style.maxHeight = el.scrollHeight + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIndex, filteredItems]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="gewerbe-faq" ref={sectionRef}>
      <style>{`
        #gewerbe-faq {
          background: #ffffff;
          padding: 5rem 0;
          font-family: 'Montserrat', sans-serif;
        }
        #gewerbe-faq *,
        #gewerbe-faq *::before,
        #gewerbe-faq *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        #gewerbe-faq .faq-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px;
        }

        /* --- Header --- */
        #gewerbe-faq .faq-header {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity .7s ease, transform .7s ease;
        }

        #gewerbe-faq .faq-badge {
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

        #gewerbe-faq .faq-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #0f2533;
        }
        #gewerbe-faq .faq-title::after {
          content: "";
          display: block;
          width: 64px;
          height: 4px;
          border-radius: 8px;
          margin: .6rem auto 0;
          background: linear-gradient(90deg, #2b6cb0, #6aa6e8);
        }

        #gewerbe-faq .faq-subtitle {
          font-size: .95rem;
          line-height: 1.6;
          color: #5b6b78;
          max-width: 800px;
          margin: .75rem auto 3rem;
        }

        /* --- Layout --- */
        #gewerbe-faq .faq-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity .7s ease .15s, transform .7s ease .15s;
        }

        /* --- Sidebar --- */
        #gewerbe-faq .faq-sidebar {
          position: sticky;
          top: 120px;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        #gewerbe-faq .faq-cat-btn {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          cursor: pointer;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
          font-size: .9rem;
          font-weight: 500;
          color: #5b6b78;
          transition: all .2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        #gewerbe-faq .faq-cat-btn:hover {
          border-color: rgba(43, 108, 176, .2);
        }
        #gewerbe-faq .faq-cat-btn.active {
          background: linear-gradient(135deg, rgba(43,108,176,.08), rgba(106,166,232,.06));
          border-color: #2b6cb0;
          color: #2b6cb0;
          font-weight: 600;
        }

        #gewerbe-faq .faq-cat-count {
          background: rgba(43, 108, 176, .1);
          border-radius: 999px;
          padding: 2px 10px;
          font-size: .78rem;
          font-weight: 600;
          color: #2b6cb0;
        }

        /* --- FAQ Items --- */
        #gewerbe-faq .faq-list {
          display: flex;
          flex-direction: column;
        }

        #gewerbe-faq .faq-item {
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color .2s, box-shadow .2s;
          margin-bottom: 12px;
          background: #fff;
        }
        #gewerbe-faq .faq-item:hover {
          border-color: rgba(43, 108, 176, .2);
        }
        #gewerbe-faq .faq-item.active {
          border-color: #2b6cb0;
          box-shadow: 0 4px 14px rgba(43, 108, 176, .08);
        }

        #gewerbe-faq .faq-question {
          width: 100%;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #0f2533;
        }

        #gewerbe-faq .faq-arrow {
          width: 20px;
          height: 20px;
          color: #5b6b78;
          transition: transform .3s ease;
          flex-shrink: 0;
        }
        #gewerbe-faq .faq-arrow.open {
          transform: rotate(180deg);
          color: #2b6cb0;
        }

        #gewerbe-faq .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height .35s cubic-bezier(.4, 0, .2, 1);
        }
        #gewerbe-faq .faq-answer-inner {
          padding: 0 24px 20px;
          font-size: .95rem;
          line-height: 1.7;
          color: #5b6b78;
        }

        /* --- Responsive --- */
        @media (max-width: 768px) {
          #gewerbe-faq .faq-layout {
            grid-template-columns: 1fr;
          }
          #gewerbe-faq .faq-sidebar {
            position: static;
            flex-direction: row;
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 1rem;
            -webkit-overflow-scrolling: touch;
          }
          #gewerbe-faq .faq-cat-btn {
            white-space: nowrap;
            padding: 8px 16px;
            border-radius: 999px;
            font-size: .85rem;
            width: auto;
          }
        }
      `}</style>

      <div className="faq-container">
        {/* Header */}
        <div className="faq-header" data-reveal>
          <span className="faq-badge">FAQ</span>
          <h2 className="faq-title">H&auml;ufig gestellte Fragen</h2>
          <p className="faq-subtitle">
            Finden Sie Antworten auf die wichtigsten Fragen rund um gewerbliche
            Photovoltaikanlagen, Kosten, Wirtschaftlichkeit und
            F&ouml;rderungen.
          </p>
        </div>

        {/* Layout */}
        <div className="faq-layout" data-reveal>
          {/* Sidebar */}
          <div className="faq-sidebar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`faq-cat-btn${activeCategory === cat.key ? " active" : ""}`}
                data-category={cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span>{cat.label}</span>
                <span className="faq-cat-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {filteredItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.question}
                  className={`faq-item${isOpen ? " active" : ""}`}
                  data-category={item.category}
                >
                  <button
                    className="faq-question"
                    onClick={() => handleToggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`faq-arrow${isOpen ? " open" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div
                    className="faq-answer"
                    ref={(el) => {
                      answerRefs.current[i] = el;
                    }}
                  >
                    <div className="faq-answer-inner">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
