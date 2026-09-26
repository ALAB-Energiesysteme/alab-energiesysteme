import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";
import type { LandingPage as PageContent } from "@/content/landing-pages/types";
import { getLandingPage } from "@/content/landing-pages";
import { bildMasse } from "@/lib/bildMasse";
import LandingInquiryForm from "./LandingInquiryForm";
import LandingTracking from "./LandingTracking";
import LandingStickyCTA from "./LandingStickyCTA";
import s from "./landing.module.css";
import m from "./landingModern.module.css";

/*
  Neue Designsprache (Test auf /lp/waermepumpe-kosten, 26.09.2026):
  heller Einstieg mit Formular im ersten Bildschirm, leichtere Überschriften,
  Akzentfarbe nur für Buttons, Nummern statt Symbole, Flächen statt Trennlinien.
  Inhalte kommen unverändert aus dem Seiteninhalt; die alte Gestaltung (LandingPage.tsx)
  bleibt für alle anderen Seiten bestehen.
*/

const PHONE = { href: "tel:+4982617597176", label: "08261 7597176" };
const TRUST = ["Ingenieurplanung", "Elektrofachbetrieb", "Eigene Montage"];
/** Worauf es bei der Geräteauswahl ankommt – entspricht den Prüfpunkten der Seite */
const AUSWAHL = [
  { title: "Heizlast", text: "bestimmt die nötige Leistung des Geräts." },
  { title: "Aufstellort", text: "entscheidet über Platz, Fundament und Schall." },
  { title: "Heizflächen", text: "legen fest, mit welcher Vorlauftemperatur die Anlage arbeitet." },
];

const nr = (i: number) => String(i + 1).padStart(2, "0");

/** Wörter mit Bindestrich („PV-Anlage“) nie am Bindestrich umbrechen – Arbens Regel: nie mitten im Wort trennen */
function T({ children }: { children: string }) {
  return <>{children.split(/(\S*\p{L}-\p{L}\S*)/u).map((part, i) => (i % 2 ? <span key={i} className={m.nowrap}>{part}</span> : part))}</>;
}

function Referenzbilder() {
  const bilder = [
    { src: "/referenzen-wp/referenzprojekt-waermepumpe-1.jpg", alt: "Von ALAB installierte Luft-Wasser-Wärmepumpe an einem Wohnhaus", label: "ALAB-Projekt", text: "Außengerät einer Luft-Wasser-Wärmepumpe am Wohnhaus" },
    { src: "/optimized/wp-technikraum-speicher-7343874e9a.webp", alt: "Technikraum mit Warmwasser- und Pufferspeicher und Wärmepumpen-Inneneinheit (Beispielbild)", label: "Technikraum (Beispiel)", text: "Warmwasser- und Pufferspeicher mit Inneneinheit" },
  ];
  const masse = bilder.map(bild => bildMasse(bild.src));
  // Spalten proportional zum Seitenverhältnis: beide Bilder gleich hoch, nichts beschnitten
  const spalten = masse.map(ms => (ms ? ms.width / ms.height : 4 / 3).toFixed(3) + "fr").join(" ");
  return <div className={m.photos} style={{ "--photo-cols": spalten } as React.CSSProperties}>
    {bilder.map((bild, i) => {
      const ms = masse[i];
      return <figure key={bild.src} className={m.photo}>
        <div className={m.photoFrame} style={ms ? ({ aspectRatio: `${ms.width} / ${ms.height}` }) : undefined}>
          <Image src={bild.src} alt={bild.alt} fill sizes="(max-width: 860px) 100vw, 50vw" />
        </div>
        <figcaption><strong>{bild.label}</strong><T>{bild.text}</T></figcaption>
      </figure>;
    })}
  </div>;
}

export default function LandingPageModern({ page }: { page: PageContent }) {
  const heroMasse = bildMasse(page.heroImage);
  const url = `https://www.alabenergiesysteme.de/lp/${page.slug}`;
  const structuredData = { "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: page.h1, description: page.description, url, serviceType: page.projectType, provider: { "@id": "https://www.alabenergiesysteme.de/#organization" } };
  return <div data-landing-page={page.slug} className={`${s.landing} ${m.modern}`}>
    <a href="#inhalt" className={s.skipLink}>Zum Inhalt</a>
    <header className={m.topbar}>
      <div className={`${m.wrap} ${m.topbarInner}`}>
        <a href="/" className={m.logo} aria-label="ALAB Energiesysteme – Startseite">
          <Image src="/img/logo-alab.png" alt="ALAB Energiesysteme" width={52} height={46} priority />
        </a>
        <div className={m.topActions}>
          <a href={PHONE.href} className={m.topPhone}><Phone size={16} aria-hidden="true" /><span>{PHONE.label}</span></a>
          {/* data-lp-cta="hero": Sobald dieser Kopf aus dem Bild ist, darf die Kontaktleiste unten erscheinen */}
          <a href="#anfrage" className={m.topCta} data-lp-cta="hero">Kosten berechnen</a>
        </div>
      </div>
    </header>
    <LandingTracking slug={page.slug} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

    <main id="inhalt">
      <section className={m.hero} aria-labelledby="page-title">
        <div className={`${m.wrap} ${m.heroGrid}`}>
          <div className={m.heroCopy}>
            <p className={m.kicker}>{page.eyebrow}</p>
            <h1 id="page-title" className={m.h1}><T>{page.h1}</T></h1>
            <p className={m.lead}><T>{page.intro}</T></p>
            <ul className={m.trust}>{TRUST.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div id="anfrage" className={m.heroForm}>
            <LandingInquiryForm {...page} />
          </div>
          <figure className={m.heroVisual}>
            <div className={m.heroFrame} style={heroMasse ? ({ aspectRatio: `${heroMasse.width} / ${heroMasse.height}` }) : undefined}>
              <Image src={page.heroImage} alt={page.heroAlt} fill sizes="(max-width: 1023px) 100vw, 50vw" priority />
            </div>
            <figcaption><T>{page.heroCaption}</T></figcaption>
          </figure>
        </div>
      </section>

      <section className={`${m.section} ${m.surface}`} aria-labelledby="hersteller-title">
        <div className={`${m.wrap} ${m.brandsGrid}`}>
          <div className={m.brandsCopy}>
            <p className={m.kicker}>Geräte führender Hersteller</p>
            <h2 id="hersteller-title" className={m.h2}>Wir arbeiten mit führenden Herstellern von Wärmepumpen</h2>
            <p className={m.text}>Welches Gerät zu Ihnen passt, ergibt sich aus Ihrem Haus, nicht aus der Marke. Drei Punkte entscheiden die Auswahl:</p>
            <ol className={m.criteria}>{AUSWAHL.map((punkt, i) => <li key={punkt.title}><span className={m.num}>{nr(i)}</span><p><strong>{punkt.title}</strong> {punkt.text}</p></li>)}</ol>
          </div>
          {page.manufacturers && <ul className={m.brands} aria-label="Hersteller, mit denen wir arbeiten">
            {page.manufacturers.map(name => <li key={name}><span>{name}</span></li>)}
          </ul>}
        </div>
      </section>

      <section className={m.section} aria-labelledby="focus-title">
        <div className={m.wrap}>
          <div className={m.heading}>
            <h2 id="focus-title" className={m.h2}><T>{page.focusTitle}</T></h2>
            <p className={m.text}><T>{page.focusIntro}</T></p>
          </div>
          <ol className={m.cards}>{page.focusItems.map((item, i) => <li key={item.title} className={m.card}><span className={m.num}>{nr(i)}</span><h3 className={m.h3}><T>{item.title}</T></h3><p><T>{item.text}</T></p></li>)}</ol>
        </div>
      </section>

      <section className={`${m.section} ${m.surface}`} aria-labelledby="services-title">
        <div className={`${m.wrap} ${m.servicesGrid}`}>
          <div className={m.servicesCopy}>
            <h2 id="services-title" className={m.h2}><T>{page.servicesTitle}</T></h2>
            <p className={m.text}>ALAB verbindet Ingenieurplanung mit einem eigenen Elektrofachbetrieb. Wir planen die Technik und übernehmen die abgestimmte Umsetzung.</p>
            <dl className={m.roles}>
              <div><dt>Als Ingenieurbüro</dt><dd>Bestandsaufnahme, Auslegung und Planung</dd></div>
              <div><dt>Als Elektrofachbetrieb</dt><dd>Installation, Anschluss und Prüfung</dd></div>
            </dl>
          </div>
          <ol className={m.positions}>{page.services.map((service, i) => <li key={service.title}><span className={m.num}>{nr(i)}</span><div><h3 className={m.h3}><T>{service.title}</T></h3><p><T>{service.text}</T></p></div></li>)}</ol>
        </div>
      </section>

      <section className={m.section} aria-labelledby="process-title">
        <div className={m.wrap}>
          <div className={m.heading}><h2 id="process-title" className={m.h2}>Vom ersten Gespräch zur Umsetzung</h2></div>
          <ol className={m.steps}>{page.steps.map((step, i) => <li key={step.title}><span className={m.stepNum}>{nr(i)}</span><h3 className={m.h3}><T>{step.title}</T></h3><p><T>{step.text}</T></p></li>)}</ol>
        </div>
      </section>

      <section className={`${m.section} ${m.sectionTight}`} aria-labelledby="references-title">
        <div className={m.wrap}>
          <div className={m.heading}>
            <h2 id="references-title" className={m.h2}>Technik, die vor Ort entsteht</h2>
            <p className={m.text}><T>Außengerät aus einem ALAB-Projekt und ein Beispiel für einen aufgeräumten Technikraum mit Speichern.</T></p>
          </div>
          <Referenzbilder />
        </div>
      </section>

      <section className={`${m.section} ${m.surface}`} aria-labelledby="faq-title">
        <div className={`${m.wrap} ${m.faqGrid}`}>
          <div>
            <h2 id="faq-title" className={m.h2}>Häufige Fragen zur Wärmepumpe</h2>
            <p className={m.text}>Ihre Frage ist nicht dabei? Rufen Sie uns an.</p>
            <a href={PHONE.href} className={m.faqPhone}><Phone size={16} aria-hidden="true" />{PHONE.label}</a>
          </div>
          <div className={m.faqs}>{page.faqs.map(faq => <details key={faq.question} className={m.faq} name={`${page.slug}-faq`}><summary><span><T>{faq.question}</T></span><ChevronDown size={20} aria-hidden="true" /></summary><p><T>{faq.answer}</T></p></details>)}</div>
        </div>
      </section>

      <section className={m.final} aria-labelledby="final-title">
        <div className={`${m.wrap} ${m.finalInner}`}>
          <h2 id="final-title" className={m.h2}><T>{page.formTitle}</T></h2>
          <p className={m.text}>Persönliche Einschätzung vom Ingenieurbüro & Elektrofachbetrieb.</p>
          <div className={m.finalActions}>
            <a href="#anfrage" className={m.button} data-lp-cta="bottom">{page.cta}</a>
            <a href={PHONE.href} className={m.finalPhone}><Phone size={16} aria-hidden="true" />{PHONE.label}</a>
          </div>
        </div>
      </section>

      <nav className={`${m.wrap} ${m.related}`} aria-label="Verwandte Leistungen">
        <span>Passend zu Ihrem Projekt</span>
        {page.related.map(slug => { const related = getLandingPage(slug); return related ? <a key={slug} href={`/lp/${slug}`}>{related.projectType}</a> : null; })}
      </nav>
    </main>
    <LandingStickyCTA cta={page.cta} />
  </div>;
}
