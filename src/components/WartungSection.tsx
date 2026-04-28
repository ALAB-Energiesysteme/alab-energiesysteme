"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Zap,
  FileText,
  AlertTriangle,
  ShieldAlert,
  FileWarning,
  CheckCircle,
  Star,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
  Shield,
  Award,
  MapPin,
  Handshake,
  CircleCheck,
} from "lucide-react";
import HeroCardShowcase from "@/components/HeroCardShowcase";

/* ─── data ─── */
const HERO_BENEFITS = [
  { icon: TrendingUp, text: "Maximale Stromerträge" },
  { icon: Shield, text: "Betriebssicherheit & Brandschutz" },
  { icon: FileText, text: "Erhalt von Garantie & Versicherung" },
];

const RISKS = [
  {
    icon: AlertTriangle,
    title: "Ertragsverlust",
    desc: "Verschmutzungen, unerkannte Moduldefekte (\"Hotspots\") oder nachlassende Wechselrichterleistung können Ihre Stromproduktion um 5 % bis 30 % reduzieren. Ein unbemerkter Leistungsabfall von nur 10 % kann Sie bereits Hunderte von Euro pro Jahr kosten. Besonders Anlagen in landwirtschaftlichen Gebieten sind durch Staub und organische Ablagerungen gefährdet.",
    level: "Hohes Risiko",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: ShieldAlert,
    title: "Sicherheitsrisiken",
    desc: "Gelockerte Klemmen, beschädigte Kabelisolierungen durch UV-Strahlung oder Tierbiss und Defekte in der Elektronik sind ernstzunehmende Gefahren. Sie können zu Kurzschlüssen, Lichtbögen und im schlimmsten Fall zu einem Brand führen. Eine regelmäßige Prüfung durch eine Elektrofachkraft ist unerlässlich für die Sicherheit Ihres Eigentums.",
    level: "Kritisch",
    color: "text-red-600 bg-red-50",
  },
  {
    icon: FileWarning,
    title: "Garantie- & Versicherungsverlust",
    desc: "Viele Versicherungen und Herstellergarantien setzen eine regelmäßige, fachmännisch durchgeführte und dokumentierte Wartung voraus. Ohne ein gültiges Wartungsprotokoll riskieren Sie im Schadensfall, auf den gesamten Kosten sitzen zu bleiben.",
    level: "Mittleres Risiko",
    color: "text-yellow-600 bg-yellow-50",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Sichtprüfung & Mechanik",
    bullets: [
      { bold: "Solarmodule:", text: "Prüfung auf Risse, Hotspots, Verfärbungen, Delamination und Verschmutzung." },
      { bold: "Montagesystem:", text: "Kontrolle auf festen Sitz aller Schrauben und Klemmen; Prüfung der Dachhaut auf Beschädigungen." },
      { bold: "Verkabelung:", text: "Inspektion auf Tierbiss, UV-Schäden, Scheuerstellen und sichere Verlegung." },
    ],
  },
  {
    num: "02",
    icon: Zap,
    title: "Elektrische Systemprüfung",
    bullets: [
      { bold: "Wechselrichter:", text: "Funktionsprüfung, Reinigung der Lüfter, Auslesen des Fehlerspeichers und ggf. Software-Updates." },
      { bold: "Anschlüsse:", text: "Überprüfung aller DC- und AC-seitigen Anschlüsse auf Korrosion und festen Sitz; Prüfung der Überspannungsschutzgeräte." },
      { bold: "Leistungsmessung:", text: "Messung von Strangspannungen und Isolationswiderständen zur Sicherstellung der optimalen Leistung." },
    ],
  },
  {
    num: "03",
    icon: FileText,
    title: "Analyse & Dokumentation",
    bullets: [
      { bold: "Ertragsanalyse:", text: "Abgleich der aktuellen Leistung mit den Soll-Werten und den Daten aus dem Monitoring." },
      { bold: "Wartungsprotokoll:", text: "Sie erhalten ein rechtssicheres Protokoll für Ihre Unterlagen – der entscheidende Nachweis für Versicherung und Garantie." },
      { bold: "Handlungsempfehlungen:", text: "Klare und verständliche Empfehlungen zur Behebung von Mängeln oder zur weiteren Ertragsoptimierung." },
    ],
  },
];

const PACKAGES = [
  {
    name: "Einzel-Wartung",
    desc: "Die flexible Lösung für eine einmalige, gründliche Überprüfung Ihrer Anlage.",
    price: "€ / einmalig",
    period: "auf Anfrage",
    featured: false,
    features: [
      "Umfassende Prüfung nach DIN EN 62446-1",
      "Visuelle & mechanische Kontrolle",
      "Elektrische Systemprüfung & Messungen",
      "Detailliertes Wartungsprotokoll",
    ],
    cta: "Jetzt Termin anfragen",
  },
  {
    name: 'Wartungsvertrag \u201ESorglos\u201C',
    desc: "Das Komplettpaket für maximale Sicherheit und dauerhaft hohe Erträge.",
    price: "€ / Monat",
    period: "auf Anfrage",
    featured: true,
    badge: "Bestseller",
    features: [
      "Alle Leistungen der Einzel-Wartung",
    ],
    highlights: [
      "Jährliche, automatische Terminplanung",
      "Kontinuierliches Online-Monitoring",
      "Proaktive Störungsmeldung & Ferndiagnose",
      "Priorisierter Service im Störfall",
      "Preisvorteil gegenüber Einzelbuchung",
    ],
    cta: "Vertrag anfragen",
  },
];

const FAQ_ITEMS = [
  {
    q: "Wie oft ist eine PV-Wartung wirklich notwendig?",
    a: 'Obwohl f\u00FCr private Anlagen in Deutschland keine gesetzliche Wartungspflicht besteht, empfehlen Experten, Versicherer und Hersteller eine regelm\u00E4\u00DFige \u00DCberpr\u00FCfung. Wir raten zu einer j\u00E4hrlichen Sichtpr\u00FCfung und mechanischen Kontrolle. Eine umfassende wiederkehrende Pr\u00FCfung der elektrischen Anlage nach DIN EN 62446-1 (auch \u201EE-Check PV\u201C genannt) sollte alle vier Jahre durch eine zertifizierte Elektrofachkraft erfolgen.',
  },
  {
    q: "Was kostet eine professionelle PV-Wartung?",
    a: "Die Kosten für eine Standardwartung an einer typischen Photovoltaikanlage auf einem Einfamilienhaus liegen in der Regel zwischen 250 € und 350 €. Der genaue Preis hängt von der Anlagengröße, dem Anlagentyp und der Zugänglichkeit ab. Unser Wartungsvertrag bietet zudem einen attraktiven Preisvorteil gegenüber der jährlichen Einzelbeauftragung.",
  },
  {
    q: "Ist die Reinigung der Module immer inklusive?",
    a: "Die Beurteilung des Verschmutzungsgrades ist fester Bestandteil unserer Wartung. Eine komplette professionelle Reinigung ist jedoch eine separate Leistung. In den meisten Regionen Deutschlands ist eine manuelle Reinigung dank des Selbstreinigungseffekts durch Regen und einer Modulneigung von über 15 Grad nicht jährlich erforderlich.",
  },
  {
    q: "Kann ich die Wartung nicht einfach selbst durchführen?",
    a: "Die regelmäßige Kontrolle Ihrer Ertragsdaten über die App oder am Wechselrichter sowie eine Sichtprüfung vom Boden aus sind sehr zu empfehlen. Arbeiten auf dem Dach bergen jedoch erhebliche Absturzgefahren. Die entscheidenden elektrischen Prüfungen erfordern zudem spezielle Messgeräte und das Fachwissen einer zertifizierten Elektrofachkraft.",
  },
  {
    q: "Meine Anlage ist neu – brauche ich jetzt schon eine Wartung?",
    a: "Ja, eine erste Inspektion nach dem ersten oder zweiten Betriebsjahr ist sehr sinnvoll. So können eventuelle Installationsfehler oder frühzeitige Materialermüdung noch innerhalb der Gewährleistungsfrist des Installateurs erkannt und kostenlos behoben werden.",
  },
];

const FEATURES = [
  { icon: Award, title: "Zertifizierte Fachkompetenz", desc: "Professionelles Team mit regelmäßigen Schulungen zu VDE-/DGUV-Standards für maximale Sicherheit und Qualität." },
  { icon: MapPin, title: "Regional & Schnell", desc: "Als Ihr Partner vor Ort sind wir schnell bei Ihnen. Keine langen Wartezeiten, keine anonymen Callcenter – nur direkter und persönlicher Service." },
  { icon: Handshake, title: "Herstellerunabhängig & Fair", desc: "Wir warten Photovoltaikanlagen aller gängigen Hersteller. Unsere Beratung ist unabhängig und zielt allein auf die optimale Leistung Ihrer Anlage ab." },
  { icon: CircleCheck, title: "Transparenz & Qualität", desc: "Klare Angebote ohne versteckte Kosten und ein detailliertes Protokoll nach jeder Wartung. Ihre Zufriedenheit ist unser höchster Anspruch." },
];

const TESTIMONIALS = [
  { quote: "Nach der Wartung durch ALAB Energiesysteme hat unsere Anlage sofort 10 % mehr Ertrag gebracht. Der Service war pünktlich, professionell und jeden Cent wert.", initials: "FM", name: "Familie M. aus München" },
  { quote: "Das Wartungsprotokoll war extrem detailliert. Endlich habe ich die Sicherheit, dass für meine Versicherung alles korrekt dokumentiert ist. Absolut empfehlenswert!", initials: "JS", name: "J. Schmidt, Ulm" },
];

/* ─── animate-on-scroll hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("animate-in"); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── sections ─── */

const WT_CARDS = [
  {
    title: "Maximale Stromerträge",
    subtitle: "Ertragssicherung & Leistungsprüfung",
    text: "Verschmutzungen, Hotspots und unerkannte Moduldefekte können Ihre Produktion um 5–30 % reduzieren. Wir erkennen und beheben diese Probleme frühzeitig.",
    image: "/assets/img/wartung/anlage1_W.jpeg",
  },
  {
    title: "Betriebssicherheit & Brandschutz",
    subtitle: "Zertifizierter Fachservice",
    text: "Gelockerte Klemmen, beschädigte Kabelisolierungen und defekte Elektronik sind ernsthafte Gefahren. Regelmäßige Prüfungen durch Elektrofachkräfte sind unerlässlich.",
    image: "/assets/img/wartung/anlage2_W.jpeg",
  },
  {
    title: "Garantie & Versicherung",
    subtitle: "Erhalt aller Ansprüche",
    text: "Viele Versicherungen und Herstellergarantien setzen dokumentierte Wartung voraus. Ohne gültiges Wartungsprotokoll riskieren Sie den vollen Schadenersatz.",
    image: "/assets/img/wartung/anlage1_W.jpeg",
  },
];

function WTRisks() {
  const ref = useReveal();
  return (
    <section className="bg-[#f4f6f8] py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <span className="block text-xs font-bold uppercase tracking-widest text-accent">Herausforderungen</span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Ihre PV-Anlage ist robust – aber nicht unbesiegbar.</h2>
        <p className="mt-4 max-w-3xl text-muted">
          Eine Photovoltaikanlage ist eine Hightech-Investition, die auf Langlebigkeit ausgelegt ist. Doch Witterung, Umwelteinflüsse und elektrischer Verschleiß hinterlassen Spuren. Viele Probleme entwickeln sich schleichend und bleiben oft unbemerkt – bis der finanzielle Schaden spürbar ist.
        </p>

        {/* image + text */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-ink">Typische Probleme einer PV-Anlage</h3>
            <p className="text-muted">
              Verschmutzungen, Hotspots, nachlassende Wechselrichterleistung und mechanische Abnutzung können die Effizienz Ihrer Anlage erheblich beeinträchtigen. Unsere Experten identifizieren diese Probleme frühzeitig.
            </p>
            <ul className="space-y-3">
              {["Regelmäßige Inspektion aller Komponenten", "Frühzeitige Erkennung von Defekten", "Maximierung Ihrer Erträge"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
            <img src="/assets/img/wartung/anlage2_W.jpeg" alt="Typische PV-Probleme" className="w-full object-cover" />
          </div>
        </div>

        {/* risk cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {RISKS.map((r) => (
            <div key={r.title} className="rounded-[var(--radius-card)] bg-white p-8 shadow-[0_10px_40px_rgba(15,37,51,0.08)] transition hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(15,37,51,0.14)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <r.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-ink">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{r.desc}</p>
              <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${r.color}`}>
                {r.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WTProcess() {
  const ref = useReveal();
  return (
    <section className="bg-white py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <span className="block text-xs font-bold uppercase tracking-widest text-accent">Unser Prozess</span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Transparenz und Gründlichkeit: Unser Wartungsprozess nach DIN&nbsp;EN&nbsp;62446-1.
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Wir überlassen nichts dem Zufall. Unser Wartungsservice folgt einem standardisierten Prüfverfahren, das sich an den strengen Vorgaben der relevanten Industrienormen orientiert.
        </p>

        <div className="relative mt-16 space-y-12 pl-8 before:absolute before:left-[15px] before:top-0 before:h-full before:w-[3px] before:rounded-full before:bg-accent/20 md:pl-12 md:before:left-[23px]">
          {PROCESS_STEPS.map((s) => (
            <div key={s.num} className="relative">
              {/* number badge */}
              <div className="absolute -left-8 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white md:-left-12 md:h-12 md:w-12 md:text-sm">
                {s.num}
              </div>
              <div className="rounded-[var(--radius-card)] bg-[#f4f6f8] p-8 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <s.icon className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                </div>
                <ul className="space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b.bold} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong className="text-ink">{b.bold}</strong> {b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* thermography box */}
        <div className="mt-14 rounded-[var(--radius-card)] border border-accent/20 bg-accent/5 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15">
              <Search className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">Optional: Thermografie-Analyse mit Drohne</h3>
              <p className="mt-1 text-sm text-muted">
                Entdecken Sie, was dem bloßen Auge verborgen bleibt. Mit unserer hochauflösenden Wärmebildkamera identifizieren wir unsichtbare Defekte wie Zellbrüche oder fehlerhafte Lötstellen (Hotspots), bevor sie zu größeren Schäden oder Ertragsausfällen führen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WTPackages() {
  const ref = useReveal();
  return (
    <section id="packages" className="bg-[#f4f6f8] py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <span className="block text-xs font-bold uppercase tracking-widest text-accent">Unsere Pakete</span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Wählen Sie das passende Servicepaket für Ihre Anlage.
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Ob einmalige Inspektion oder unser Rundum-Sorglos-Wartungsvertrag – wir haben die richtige Lösung für Ihre Bedürfnisse.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-[var(--radius-card)] p-8 shadow-[0_10px_40px_rgba(15,37,51,0.08)] transition hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(15,37,51,0.14)] ${
                pkg.featured ? "bg-ink text-white ring-2 ring-accent" : "bg-white"
              }`}
            >
              {pkg.featured && pkg.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white shadow">
                  {pkg.badge}
                </span>
              )}
              <h3 className={`text-2xl font-bold ${pkg.featured ? "text-white" : "text-ink"}`}>{pkg.name}</h3>
              <p className={`mt-2 text-sm ${pkg.featured ? "text-white/70" : "text-muted"}`}>{pkg.desc}</p>
              <div className="mt-6 mb-6">
                <span className={`text-3xl font-extrabold ${pkg.featured ? "text-accent" : "text-accent"}`}>{pkg.price}</span>
                <span className={`ml-2 text-sm ${pkg.featured ? "text-white/60" : "text-muted"}`}>{pkg.period}</span>
              </div>
              <ul className="space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <CheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.featured ? "text-accent" : "text-accent"}`} />
                    <span className={pkg.featured ? "text-white/80" : "text-muted"}>{f}</span>
                  </li>
                ))}
                {pkg.highlights?.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className={`font-semibold ${pkg.featured ? "text-white" : "text-ink"}`}>{h}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#angebot"
                data-open-angebot={`wartung-paket-${pkg.name?.toLowerCase().replace(/\s+/g,"-") || "standard"}`}
                className={`mt-8 flex items-center justify-center gap-2 rounded-[var(--radius-btn)] px-6 py-3 text-sm font-semibold transition ${
                  pkg.featured
                    ? "bg-accent text-white shadow-[0_4px_12px_var(--color-accent-glow)] hover:bg-accent-deep"
                    : "border border-accent text-accent hover:bg-accent hover:text-white"
                }`}
              >
                {pkg.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WTFaq() {
  const ref = useReveal();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-white py-24">
      <div ref={ref} className="mx-auto max-w-3xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <span className="block text-center text-xs font-bold uppercase tracking-widest text-accent">FAQ</span>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-ink md:text-4xl">Antworten auf Ihre häufigsten Fragen</h2>
        <div className="mt-12 divide-y divide-gray-200">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left text-base font-semibold text-ink transition hover:text-accent"
              >
                {item.q}
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-5" : "max-h-0"}`}>
                <p className="text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WTWhyUs() {
  const ref = useReveal();
  return (
    <section className="bg-[#f4f6f8] py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <span className="block text-xs font-bold uppercase tracking-widest text-accent">Warum ALAB</span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Warum ALAB Energiesysteme? Ihr Vorteil ist unsere Expertise.
        </h2>

        {/* image + text */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
            <img src="/assets/img/wartung/anlage3_W.jpeg" alt="ALAB Wartungsteam" className="w-full object-cover" />
          </div>
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-ink">Ihr zuverlässiger Partner</h3>
            <p className="text-muted">
              Mit jahrelanger Erfahrung und zertifizierten Fachkräften bieten wir Ihnen einen Service, auf den Sie sich verlassen können. Wir behandeln Ihre Anlage wie unsere eigene.
            </p>
            <ul className="space-y-3">
              {["Über 20 zufriedene Kunden", "Erfahrene Fachkräfte", "Schneller und zuverlässiger Service"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink">
                  <Star className="h-5 w-5 text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* feature cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-[var(--radius-card)] bg-white p-7 shadow-[0_10px_40px_rgba(15,37,51,0.08)] transition hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(15,37,51,0.14)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <f.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div key={t.initials} className="rounded-[var(--radius-card)] bg-white p-8 shadow-[0_10px_40px_rgba(15,37,51,0.08)]">
              <p className="text-sm italic leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <div className="flex gap-0.5 text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WTCta() {
  const ref = useReveal();
  return (
    <section id="contact" className="bg-ink py-24">
      <div ref={ref} className="mx-auto max-w-4xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <div className="rounded-[var(--radius-card)] bg-white/5 p-10 text-center ring-1 ring-white/10 backdrop-blur md:p-14">
          <span className="block text-xs font-bold uppercase tracking-widest text-accent">Kontakt</span>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
            Schützen Sie Ihre Investition. Handeln Sie jetzt.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Warten Sie nicht, bis kleine Probleme zu teuren Reparaturen werden. Kontaktieren Sie uns noch heute für ein unverbindliches und kostenloses Angebot.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a
              href="tel:+4982617597176"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition hover:bg-accent-deep"
            >
              <Phone className="h-4 w-4" /> 08261 7597176
            </a>
            <a
              href="mailto:info@alab-energiesysteme.de"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> info@alab-energiesysteme.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── main export ─── */
export default function WartungSection() {
  return (
    <>
      <HeroCardShowcase
        title="PROFESSIONELLE PV-WARTUNG"
        description="Maximale Stromerträge, volle Betriebssicherheit und Erhalt von Garantie und Versicherungsschutz – mit unserem zertifizierten Fachservice."
        heroImage="/img/men%C3%BC/wartung.jpeg"
        heroImageAlt="Wartung einer Photovoltaikanlage"
        cards={WT_CARDS}
      />
      <WTRisks />
      <WTProcess />
      <WTPackages />
      <WTFaq />
      <WTWhyUs />
      <WTCta />
    </>
  );
}
