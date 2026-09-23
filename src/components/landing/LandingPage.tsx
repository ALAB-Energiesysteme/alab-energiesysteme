import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Phone, Ruler, Zap, House, ClipboardCheck } from "lucide-react";
import Header from "@/components/Header";
import type { LandingPage as PageContent } from "@/content/landing-pages/types";
import { getLandingPage } from "@/content/landing-pages";
import LandingInquiryForm from "./LandingInquiryForm";
import LandingTracking from "./LandingTracking";
import LandingProjectChoice from "./LandingProjectChoice";
import LandingStickyCTA from "./LandingStickyCTA";
import s from "./landing.module.css";
import { bildMasse } from "@/lib/bildMasse";

function CTA({ page, placement }: { page: PageContent; placement: string }) {
  return <a className={s.cta} href="#anfrage" data-lp-cta={placement}>{page.cta}<ArrowRight size={19} aria-hidden="true" /></a>;
}

function Headline({ text }: { text: string }) {
  const separators = [" – ", ": ", " für Mindelheim", " in Mindelheim", " für Neubau", " für Hallendächer", " inklusive Einbau", " & Elektroverteilung"];
  const separator = separators.find(value => text.includes(value));
  if (!separator) return <>{text}</>;
  // Gedankenstrich nicht mitnehmen: die zweite Zeile steht als eigene Ebene.
  const dash = separator === " – ";
  const split = text.indexOf(separator) + (separator === ": " ? separator.length - 1 : 0);
  const lead = dash ? text.slice(0, text.indexOf(separator)) : text.slice(0, split);
  const detail = dash ? text.slice(text.indexOf(separator) + separator.length) : text.slice(split).trimStart();
  return <><span className={s.headlineLead}>{lead}</span>{" "}<span className={s.headlineDetail}>{detail}</span></>;
}

function Inquiry({ page }: { page: PageContent }) {
  return <section id="anfrage" className={`${s.inquiry} ${page.earlyForm ? s.earlyInquiry : ""}`} aria-labelledby="inquiry-title">
    <div className={`${s.container} ${s.inquiryGrid}`}>
      <div className={s.inquiryCopy}>
        <span className={s.eyebrow}>Persönlich & unverbindlich</span>
        <h2 id="inquiry-title">{page.formTitle}</h2>
        <p>{page.formIntro}</p>
        <p className={s.formStepsNote}>In drei kurzen Schritten zu Ihrer Anfrage.</p>
        <ul className={s.formBenefits}><li>Keine Adresse nötig – die PLZ genügt</li><li>Ingenieurbüro & Elektrofachbetrieb</li><li>Persönlicher Ansprechpartner aus Mindelheim</li></ul>
      </div>
      <LandingInquiryForm {...page} />
    </div>
  </section>;
}

function Focus({ page }: { page: PageContent }) {
  const isBuilding = page.slug === "elektroinstallation-neubau-sanierung";
  return <section id="vorhaben" className={`${s.section} ${s.container}`} aria-labelledby="focus-title">
    <div className={s.sectionHeading}><span className={s.eyebrow}>Passend zu Ihrem Vorhaben</span><h2 id="focus-title">{page.focusTitle}</h2><p>{page.focusIntro}</p></div>
    <div className={`${s.focusGrid} ${isBuilding ? s.twoColumns : ""}`}>
      {page.focusItems.map((item, i) => <article key={item.title} className={s.focusCard}>
        {i === 0 ? <House aria-hidden="true" /> : i === 1 ? <Ruler aria-hidden="true" /> : <ClipboardCheck aria-hidden="true" />}
        <h3>{item.title}</h3><p>{item.text}</p>
        {isBuilding && <LandingProjectChoice choice={i === 0 ? "Neubau" : "Sanierung / Altbau"} label={i === 0 ? "Neubau anfragen" : "Sanierung anfragen"} />}
      </article>)}
    </div>
    <div className={s.sectionEnd}><CTA page={page} placement="focus" /></div>
    {page.sources && <p className={s.sourceNote}>Offizielle Informationen: {page.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</p>}
  </section>;
}

function Services({ page }: { page: PageContent }) {
  return <section id="leistungen" className={s.services} aria-labelledby="services-title"><div className={`${s.container} ${s.servicesLayout}`}>
    <div className={s.servicesIntro}><span className={s.eyebrow}>Alles aus einer Hand</span><h2 id="services-title">{page.servicesTitle}</h2><p>ALAB verbindet Ingenieurplanung mit einem eigenen Elektrofachbetrieb. Wir planen die Technik und übernehmen die abgestimmte Umsetzung.</p><dl className={s.roles}><div><dt>Als Ingenieurbüro</dt><dd>Bestandsaufnahme, Auslegung und Planung</dd></div><div><dt>Als Elektrofachbetrieb</dt><dd>Installation, Anschluss und Prüfung</dd></div></dl><div className={s.sectionEnd}><CTA page={page} placement="services" /></div></div>
    <ol className={s.servicesGrid}>{page.services.map((service, i) => <li className={s.serviceCard} key={service.title}>
      <span className={s.serviceIndex}>{String(i + 1).padStart(2, "0")}</span><div><h3>{service.title}</h3><p>{service.text}</p></div>
    </li>)}</ol>
  </div></section>;
}

function Process({ page }: { page: PageContent }) {
  return <section id="ablauf" className={`${s.section} ${s.container}`} aria-labelledby="process-title">
    <div className={s.sectionHeading}><span className={s.eyebrow}>Ein klarer Ablauf</span><h2 id="process-title">Vom ersten Gespräch zur Umsetzung.</h2></div>
    <ol className={s.steps} style={{ "--step-count": page.steps.length } as React.CSSProperties}>{page.steps.map((step, i) => <li key={step.title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
  </section>;
}

type Referenzbild = { src: string; alt: string; label: string; text: string };

/**
 * Bildpaar und Einleitung je Kategorie. Beispielbilder, die keine ALAB-Projekte
 * zeigen, werden in Einleitung bzw. Bildunterschrift als Beispiel benannt.
 */
type Referenzlink = { href: string; text: string } | null;

function referenzenFuer(category: PageContent["category"]): { eyebrow: string; intro: string; bilder: [Referenzbild, Referenzbild]; link: Referenzlink } {
  switch (category) {
    case "photovoltaik":
      return {
        eyebrow: "Einblicke in unsere Arbeit",
        intro: "Bilder aus unserer bestehenden Projekt- und Montagegalerie.",
        bilder: [
          { src: "/optimized/pv-wohnhaus-referenz-856cc714ea.webp", alt: "Photovoltaikanlage auf dem Ziegeldach eines Wohnhauses – ALAB-Referenzprojekt", label: "Photovoltaik", text: "Solarstrom vom eigenen Hausdach" },
          { src: "/optimized/pv-dachmontage-referenz-fd067d535e.webp", alt: "Montierte Unterkonstruktion auf einem Ziegeldach vor dem Auflegen der PV-Module – ALAB-Referenzprojekt", label: "Dachmontage", text: "Unterkonstruktion während der Montage" },
        ],
        link: { href: "/pv-zuhause#ref-gallery-private", text: "Zu unseren Referenzen" },
      };
    case "elektro":
      return {
        eyebrow: "Beispiele aus der Elektrotechnik",
        intro: "Beispielbilder: So sieht ein aufgeräumter Zählerschrank und Technikraum aus.",
        bilder: [
          { src: "/optimized/elektro-zaehlerschrank-8ce18f2c51.webp", alt: "Geöffneter Zählerschrank mit Zählerplatz, Sicherungsverteilung und Klemmen", label: "Zählerschrank", text: "Zählerplatz und Verteilung übersichtlich aufgebaut" },
          { src: "/optimized/elektro-speicher-wechselrichter-124ae04b35.webp", alt: "Stromspeicher und Wechselrichter mit Kabelführung in einem Technikraum", label: "Speicher & Wechselrichter", text: "Energietechnik sauber in den Technikraum eingebunden" },
        ],
        link: null,
      };
    case "waermepumpe":
      return {
        eyebrow: "Wärmepumpe innen und außen",
        intro: "Außengerät aus einem ALAB-Projekt und ein Beispiel für einen aufgeräumten Technikraum mit Speichern.",
        bilder: [
          { src: "/optimized/wp-technikraum-speicher-7343874e9a.webp", alt: "Technikraum mit Warmwasser- und Pufferspeicher und Wärmepumpen-Inneneinheit (Beispielbild)", label: "Technikraum · Beispiel", text: "Warmwasser- und Pufferspeicher mit Inneneinheit" },
          { src: "/referenzen-wp/referenzprojekt-waermepumpe-1.jpg", alt: "Von ALAB installierte Luft-Wasser-Wärmepumpe an einem Wohnhaus", label: "ALAB-Projekt", text: "Außengerät einer Luft-Wasser-Wärmepumpe am Wohnhaus" },
        ],
        link: null,
      };
    default:
      return {
        eyebrow: "Einblicke in unsere Arbeit",
        intro: "Bilder aus unserer bestehenden Projekt- und Montagegalerie.",
        bilder: [
          { src: "/optimized/anlage1-G-b07a12bd8c.webp", alt: "Montierte Photovoltaikmodule auf einem Gewerbedach aus der ALAB-Projektgalerie", label: "Photovoltaik", text: "Installierte Anlage auf einem Gewerbedach" },
          { src: "/optimized/anlage6-M-2a21833081.webp", alt: "ALAB-Montagefahrzeug vor installierten Wechselrichtern", label: "Elektro & Montage", text: "Wechselrichter und elektrische Einbindung" },
        ],
        link: { href: "/montage", text: "Zur Montagegalerie" },
      };
  }
}

function References({ page }: { page: PageContent }) {
  const { eyebrow, intro, bilder, link } = referenzenFuer(page.category);
  // Originalformat je Bild; Spalten proportional zum Seitenverhältnis → beide Bilder gleich hoch, nichts beschnitten
  const masse = bilder.map(bild => bildMasse(bild.src));
  const verhaeltnis = masse.map(m => (m ? m.width / m.height : 4 / 3));
  const referenzStil = { "--ref-cols": `${verhaeltnis[0].toFixed(3)}fr ${verhaeltnis[1].toFixed(3)}fr` } as React.CSSProperties;
  return <section className={`${s.section} ${s.container}`} aria-labelledby="references-title">
    <div className={s.referenceHeading}><div className={s.sectionHeading}><span className={s.eyebrow}>{eyebrow}</span><h2 id="references-title">Technik, die vor Ort entsteht.</h2><p>{intro}</p></div>{link && <a href={link.href} className={s.textLink}>{link.text}<ArrowUpRight size={18} aria-hidden="true" /></a>}</div>
    <div className={s.references} style={referenzStil}>
      {bilder.map((bild, i) => <figure key={bild.src}>
        <div style={masse[i] ? ({ "--ref-ratio": `${masse[i]!.width} / ${masse[i]!.height}` } as React.CSSProperties) : undefined}><Image src={bild.src} alt={bild.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <figcaption><span>{bild.label}</span>{bild.text}</figcaption>
      </figure>)}
    </div>
  </section>;
}

function FAQs({ page }: { page: PageContent }) {
  return <section className={s.faqSection} aria-labelledby="faq-title"><div className={`${s.container} ${s.faqGrid}`}>
    <div className={s.faqHeading}><span className={s.eyebrow}>FAQ</span><h2 id="faq-title">Häufige Fragen {page.category === "waermepumpe" ? "zur Wärmepumpe" : page.category === "elektro" ? "zur Elektroinstallation" : "zur Photovoltaik"}</h2><p className={s.faqIntro}>Ihre Frage ist nicht dabei?</p><a href="tel:+4982617597176" className={s.faqPhone}>08261 7597176</a></div>
    <div>{page.faqs.map(faq => <details key={faq.question} className={s.faq} name={`${page.slug}-faq`}><summary>{faq.question}<ChevronDown size={20} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
  </div></section>;
}

export default function LandingPage({ page }: { page: PageContent }) {
  const processFirst = page.slug === "waermepumpe-foerderung";
  // Rahmen im Originalformat des Bildes: kein Beschnitt, keine Hochskalierung
  const heroMasse = bildMasse(page.heroImage);
  const heroStil = heroMasse ? ({ "--hero-ratio": `${heroMasse.width} / ${heroMasse.height}` } as React.CSSProperties) : undefined;
  const url = `https://www.alabenergiesysteme.de/lp/${page.slug}`;
  const structuredData = { "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: page.h1, description: page.description, url, serviceType: page.projectType, provider: { "@id": "https://www.alabenergiesysteme.de/#organization" }, areaServed: ["Mindelheim", "Unterallgäu", "Allgäu"] };
  return <div data-landing-page={page.slug} className={s.landing}>
    <a href="#inhalt" className={s.skipLink}>Zum Inhalt</a>
    <Header landingCta={page.cta} />
    <LandingTracking slug={page.slug} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <main id="inhalt">
      <section className={s.hero} aria-labelledby="page-title"><div className={`${s.container} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <span className={s.eyebrow}>{page.eyebrow}</span>
          <h1 id="page-title"><Headline text={page.h1} /></h1><p className={s.heroIntro}>{page.intro}</p>
          <div className={s.heroActions}><CTA page={page} placement="hero" /><a href="tel:+4982617597176" className={s.phone}><Phone size={16} aria-hidden="true" /><span>08261 7597176</span></a></div>
          <ul className={s.benefits}><li>Ingenieur&shy;planung</li><li>Elektro&shy;fachbetrieb</li><li>Eigene Montage</li></ul>
        </div>
        <figure className={`${s.heroVisual} ${page.heroImage.includes("team") ? s.heroTeam : ""}`} style={heroStil}>
          <Image src={page.heroImage} alt={page.heroAlt} fill sizes="(max-width: 1023px) 100vw, 48vw" priority />
        </figure>
      </div></section>
      {page.earlyForm && <Inquiry page={page} />}
      <Focus page={page} />
      {!page.earlyForm && <Inquiry page={page} />}
      {processFirst && <Process page={page} />}
      <Services page={page} />
      {!processFirst && <Process page={page} />}
      <References page={page} />
      {page.solarCalculator && <aside className={`${s.container} ${s.calculator}`}><div><span className={s.eyebrow}>Erste Orientierung</span><h2>Wie könnte Ihre PV-Anlage aussehen?</h2><p>Unser bestehender Solarrechner liefert eine modellhafte Einschätzung. Die technische Prüfung und das individuelle Angebot folgen persönlich.</p></div><a href="/pv-zuhause#alab-solarcalc" className={s.textLink}>Zum Solarrechner<ArrowUpRight aria-hidden="true" size={20} /></a></aside>}
      <FAQs page={page} />
      <section className={s.finalCta}><div className={s.container}><h2>{page.formTitle}</h2><p>Persönliche Einschätzung vom Ingenieurbüro & Elektrofachbetrieb aus Mindelheim.</p><CTA page={page} placement="bottom" /><a href="tel:+4982617597176" className={s.finalPhone}>08261 7597176</a></div></section>
      <nav className={`${s.container} ${s.related}`} aria-label="Verwandte Leistungen"><span>Passend zu Ihrem Projekt</span>{page.related.map(slug => { const related = getLandingPage(slug); return related ? <a key={slug} href={`/lp/${slug}`}>{related.projectType}<ArrowUpRight size={15} aria-hidden="true" /></a> : null; })}</nav>
    </main>
    <LandingStickyCTA cta={page.cta} />
  </div>;
}
