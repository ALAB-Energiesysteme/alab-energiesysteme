"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  Handshake,
  TrendingUp,
  Shield,
  Users,
  ClipboardList,
  Zap,
  HeartHandshake,
  Target,
  BarChart3,
  Award,
  MessageSquare,
  ChevronDown,
  Building2,
  Sun,
  Flame,
  Wrench,
  UserCheck,
} from "lucide-react";

/* ─── data ─── */

const TRUST_POINTS = [
  { icon: Handshake, text: "Partnerschaftlich" },
  { icon: Shield, text: "Zuverlässig" },
  { icon: TrendingUp, text: "Skalierbar" },
];

const SERVICES = [
  {
    icon: ClipboardList,
    title: "Planung von Photovoltaikanlagen",
    desc: "Wir unterstützen bei der technischen Konzeption von Photovoltaikprojekten – von der ersten Bewertung bis zur umsetzungsorientierten Planung.",
    img: "/assets/img/placeholder-pv-planung.jpg",
  },
  {
    icon: Zap,
    title: "AC-/DC-Montage von Solaranlagen",
    desc: "Wir übernehmen die fachgerechte Montage und unterstützen bei der professionellen Umsetzung von PV-Projekten im privaten und gewerblichen Bereich.",
    img: "/assets/img/placeholder-montage.jpg",
  },
  {
    icon: Flame,
    title: "Planung von Wärmepumpenlösungen",
    desc: "Wir begleiten die technische Planung moderner Wärmepumpensysteme und sorgen für praxisnahe, wirtschaftliche und zukunftsfähige Lösungen.",
    img: "/assets/img/placeholder-waermepumpe.jpg",
  },
  {
    icon: Wrench,
    title: "Technische Entlastung und Projektunterstützung",
    desc: "Wir helfen dabei, Ressourcenengpässe auszugleichen, Projekte sauber umzusetzen und Abläufe effizienter zu gestalten.",
    img: "/assets/img/placeholder-support.jpg",
  },
  {
    icon: HeartHandshake,
    title: "Kooperative Zusammenarbeit auf Augenhöhe",
    desc: "Wir verstehen Partnerschaften nicht als reine Vermittlung, sondern als professionelle Zusammenarbeit mit klaren Abläufen, offener Kommunikation und einem gemeinsamen Qualitätsanspruch.",
    img: "/assets/img/placeholder-kooperation.jpg",
  },
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Zuverlässiger Fachpartner",
    desc: "Sie gewinnen ein Unternehmen an Ihrer Seite, das Projekte strukturiert, lösungsorientiert und mit hoher Sorgfalt begleitet.",
  },
  {
    icon: BarChart3,
    title: "Mehr Kapazität für Ihr Geschäft",
    desc: "Durch die Zusammenarbeit mit ALAB Energiesysteme können Sie mehr Anfragen bedienen, Ihr Leistungsportfolio erweitern und zusätzliche Projekte realisieren.",
  },
  {
    icon: Award,
    title: "Technische Kompetenz",
    desc: "Wir verbinden praktische Umsetzung mit technischem Verständnis und schaffen dadurch belastbare Lösungen für unterschiedlichste Projektanforderungen.",
  },
  {
    icon: Target,
    title: "Stärkung Ihrer Marktposition",
    desc: "Sie können Ihren Kunden zusätzliche Leistungen anbieten, ohne sämtliche Kapazitäten intern aufbauen zu müssen.",
  },
  {
    icon: HeartHandshake,
    title: "Partnerschaftliche Zusammenarbeit",
    desc: "Wir legen Wert auf langfristige Kooperationen, transparente Kommunikation und eine Zusammenarbeit, die beiden Seiten echten Mehrwert bietet.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Erstgespräch und Kennenlernen",
    desc: "In einem unverbindlichen Gespräch klären wir, welche Art der Zusammenarbeit für Ihr Unternehmen sinnvoll ist.",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Bedarf und Potenziale analysieren",
    desc: "Wir besprechen Zielgruppen, Projektarten, Abläufe und mögliche Schnittstellen in der Zusammenarbeit.",
  },
  {
    num: "03",
    icon: UserCheck,
    title: "Kooperationsmodell festlegen",
    desc: "Je nach Partnerstruktur definieren wir ein passendes Vorgehen – von projektbezogener Unterstützung bis zur langfristigen Zusammenarbeit.",
  },
  {
    num: "04",
    icon: Users,
    title: "Gemeinsame Umsetzung",
    desc: "Anschließend starten wir in die operative Zusammenarbeit und setzen Projekte strukturiert und professionell um.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Mit welchen Unternehmen arbeitet ALAB Energiesysteme zusammen?",
    a: "Wir arbeiten unter anderem mit Architekten, Immobilienmaklern, Photovoltaikunternehmen, Projektentwicklern und weiteren gewerblichen Partnern zusammen, die ihren Kunden im Bereich erneuerbare Energien professionelle Lösungen anbieten möchten.",
  },
  {
    q: "Welche Leistungen bietet ALAB im Rahmen einer Partnerschaft an?",
    a: "Zu unseren Kooperationsleistungen zählen insbesondere die Planung von Photovoltaikanlagen, die AC-/DC-Montage von Solaranlagen sowie die Planung von Wärmepumpen.",
  },
  {
    q: "Ist eine projektbezogene Zusammenarbeit möglich?",
    a: "Ja, sowohl projektbezogene Kooperationen als auch langfristige Partnerschaften sind möglich. Die Zusammenarbeit wird individuell auf die Anforderungen des jeweiligen Partners abgestimmt.",
  },
  {
    q: "Unterstützt ALAB auch bei Kapazitätsengpässen?",
    a: "Ja, insbesondere für größere Photovoltaikunternehmen kann die Zusammenarbeit interessant sein, wenn zusätzliche Kapazitäten in der Planung oder Ausführung benötigt werden.",
  },
  {
    q: "Wie kann ich Partner werden?",
    a: "Am einfachsten über das Kontaktformular oder ein direktes Erstgespräch. Anschließend prüfen wir gemeinsam, welche Form der Zusammenarbeit am besten passt.",
  },
];

const FORM_FIELDS = [
  { name: "company", label: "Unternehmensname", type: "text", required: true },
  { name: "contact", label: "Ansprechpartner", type: "text", required: true },
  { name: "position", label: "Position im Unternehmen", type: "text", required: false },
  { name: "email", label: "E-Mail-Adresse", type: "email", required: true },
  { name: "phone", label: "Telefonnummer", type: "tel", required: false },
  { name: "branche", label: "Branche", type: "text", required: false },
  { name: "kooperation", label: "Art der Kooperation", type: "text", required: false },
];

/* ─── animate-on-scroll hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("animate-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── sections ─── */

/* 1. Hero */
function PWHero() {
  const ref = useReveal();
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* placeholder bg */}
      <div className="absolute inset-0">
        <img
          src="/assets/img/placeholder-partner-hero.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      </div>
      <div
        ref={ref}
        className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 py-28 lg:flex-row lg:items-center lg:py-36 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        {/* text */}
        <div className="lg:w-3/5 space-y-6">
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            Partner werden
          </span>
          <h1
            className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Ihr starker Partner für Photovoltaik- und Wärmepumpenprojekte
          </h1>
          <p className="max-w-xl text-lg text-white/70">
            ALAB Energiesysteme unterstützt Unternehmen bei der Planung sowie
            der AC-/DC-Montage von Solaranlagen und bei der technischen
            Umsetzung moderner Wärmepumpenlösungen – zuverlässig, professionell
            und partnerschaftlich.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#angebot"
              data-open-angebot="partner-werden-hero-kooperationsanfrage"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition hover:bg-accent-deep"
            >
              Kooperationsanfrage senden <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#angebot"
              data-open-angebot="partner-werden-hero-partnergespraech"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Partnergespräch vereinbaren
            </a>
          </div>
          {/* trust pills */}
          <div className="flex flex-wrap gap-4 pt-4">
            {TRUST_POINTS.map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur"
              >
                <b.icon className="h-4 w-4 text-accent" />
                {b.text}
              </div>
            ))}
          </div>
        </div>
        {/* hero image */}
        <div className="hidden lg:block lg:w-2/5">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] shadow-2xl">
            <img
              src="/assets/img/placeholder-partner-hero-side.jpg"
              alt="ALAB Partnerschaft"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 rounded-[var(--radius-card)] ring-1 ring-white/10" />
            {/* overlay card */}
            <div className="absolute bottom-4 left-4 right-4 rounded-[var(--radius-btn)] bg-ink/80 p-4 backdrop-blur">
              <p className="text-xs font-semibold text-accent">
                Für Unternehmen
              </p>
              <p className="mt-1 text-sm text-white/80">
                Professionelle Lösungen im Bereich Photovoltaik und Wärmepumpen
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. Vertrauensaufbau */
function PWTrust() {
  const ref = useReveal();
  return (
    <section className="bg-[#f4f6f8] py-24">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* image */}
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
            <img
              src="/assets/img/placeholder-partner-vertrauen.jpg"
              alt="Partnerschaftliche Zusammenarbeit"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          {/* text */}
          <div className="space-y-6">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent">
              Zusammenarbeit
            </span>
            <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
              Gemeinsam mehr Projekte erfolgreich realisieren
            </h2>
            <p className="text-muted leading-relaxed">
              Die Nachfrage nach Photovoltaikanlagen, Wärmepumpen und
              intelligenten Energielösungen wächst kontinuierlich. Gleichzeitig
              steigen die Anforderungen an Planung, Koordination, Ausführung und
              Qualität. Genau hier setzen wir an: ALAB Energiesysteme
              unterstützt Unternehmen als starker Partner im Hintergrund oder
              als sichtbarer technischer Umsetzungspartner vor Ort.
            </p>
            <p className="text-muted leading-relaxed">
              Wir bringen technisches Know-how, Praxiserfahrung und eine
              lösungsorientierte Arbeitsweise zusammen. Unser Ziel ist es,
              Kooperationen aufzubauen, die für beide Seiten wirtschaftlich
              sinnvoll sind und den Endkunden ein professionelles Ergebnis
              bieten.
            </p>
            {/* USP highlight */}
            <div className="rounded-[var(--radius-btn)] border-l-4 border-accent bg-accent/5 p-5">
              <p className="text-sm font-semibold text-ink">
                Technische Kompetenz, saubere Umsetzung und partnerschaftliche
                Zusammenarbeit – dafür steht ALAB Energiesysteme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4. Leistungen für Partner */
function PWServices() {
  const ref = useReveal();
  return (
    <section className="bg-white py-24">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <span className="block text-xs font-bold uppercase tracking-widest text-accent">
          Leistungen
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Was wir in die Partnerschaft einbringen
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Von der Planung bis zur Umsetzung – wir bieten Ihnen ein breites
          Leistungsspektrum für eine erfolgreiche Zusammenarbeit.
        </p>

        {/* services grid: 3 top, 2 bottom centered */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`group overflow-hidden rounded-[var(--radius-card)] bg-[#f4f6f8] shadow-[0_10px_40px_rgba(15,37,51,0.06)] transition hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(15,37,51,0.14)] ${
                i >= 3 ? "lg:col-span-1 lg:last:col-start-2" : ""
              }`}
            >
              {/* image placeholder */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white shadow">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. Vorteile */
function PWBenefits() {
  const ref = useReveal();
  return (
    <section className="bg-[#f4f6f8] py-24">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="text-center">
          <span className="block text-xs font-bold uppercase tracking-widest text-accent">
            Vorteile
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
            Ihre Vorteile auf einen Blick
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={`rounded-[var(--radius-card)] bg-white p-8 shadow-[0_10px_40px_rgba(15,37,51,0.08)] transition hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(15,37,51,0.14)] ${
                /* center the last 2 items on large screens */
                BENEFITS.length === 5 && i >= 3
                  ? "sm:col-span-1 lg:first-of-type:col-start-1"
                  : ""
              }`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <b.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-ink">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. Prozess / Zusammenarbeit */
function PWProcess() {
  const ref = useReveal();
  return (
    <section className="bg-white py-24">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <span className="block text-xs font-bold uppercase tracking-widest text-accent">
          Ablauf
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Einfach, klar und professionell
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          In vier Schritten zur erfolgreichen Partnerschaft – transparent und
          unkompliziert.
        </p>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-[56px] hidden h-[3px] bg-accent/15 lg:block" />

          {PROCESS_STEPS.map((s) => (
            <div key={s.num} className="relative text-center">
              {/* number badge */}
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-[0_4px_12px_var(--color-accent-glow)]">
                {s.num}
              </div>
              <div className="mt-6 rounded-[var(--radius-card)] bg-[#f4f6f8] p-6 shadow-sm">
                <s.icon className="mx-auto mb-3 h-6 w-6 text-accent" />
                <h3 className="text-base font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 7. Kooperationsansatz */
function PWApproach() {
  const ref = useReveal();
  return (
    <section className="bg-ink py-24 text-white">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent">
              Unser Ansatz
            </span>
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Partnerschaften mit Substanz statt lose Kontakte
            </h2>
            <p className="text-white/70 leading-relaxed">
              Wir suchen keine beliebigen Kontakte, sondern gezielt Unternehmen
              und Multiplikatoren, mit denen eine professionelle und nachhaltige
              Zusammenarbeit möglich ist. Für uns steht nicht der kurzfristige
              Einzelabschluss im Mittelpunkt, sondern der Aufbau tragfähiger
              Kooperationen mit klarer Qualität, sauberer Kommunikation und
              einem gemeinsamen Anspruch an gute Ergebnisse.
            </p>
            <p className="text-white/70 leading-relaxed">
              Gerade in einem stark wachsenden Markt ist Verlässlichkeit
              entscheidend. Deshalb setzen wir auf klare Prozesse, verbindliche
              Absprachen und eine Zusammenarbeit, die Ihre Leistungen sinnvoll
              ergänzt.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: Sun, text: "Photovoltaik" },
                { icon: Flame, text: "Wärmepumpen" },
                { icon: Building2, text: "Gewerblich & Privat" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80"
                >
                  <item.icon className="h-4 w-4 text-accent" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          {/* image */}
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-2xl">
            <img
              src="/assets/img/placeholder-partner-approach.jpg"
              alt="Kooperationsansatz ALAB"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 rounded-[var(--radius-card)] ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 8. Abschluss-CTA */
function PWCtaMid() {
  const ref = useReveal();
  return (
    <section className="bg-[#f0f6ff] py-24">
      <div
        ref={ref}
        className="mx-auto max-w-4xl px-6 text-center opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <span className="block text-xs font-bold uppercase tracking-widest text-accent">
          Nächster Schritt
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Lassen Sie uns über eine Zusammenarbeit sprechen
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Ob Architekturbüro, Immobilienunternehmen, Projektentwickler oder
          etabliertes Photovoltaikunternehmen – wenn Sie einen fachlich starken
          Partner für Photovoltaik und Wärmepumpen suchen, freuen wir uns auf
          den Austausch.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Gemeinsam schaffen wir Lösungen, die technisch überzeugen,
          wirtschaftlich sinnvoll sind und neue Potenziale für beide Seiten
          eröffnen.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#angebot"
            data-open-angebot="partner-werden-final-kooperationsanfrage"
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition hover:bg-accent-deep"
          >
            Jetzt Kooperationsanfrage stellen <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#angebot"
            data-open-angebot="partner-werden-final-partnergespraech"
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-accent text-accent px-6 py-3 text-sm font-semibold transition hover:bg-accent hover:text-white"
          >
            Unverbindliches Partnergespräch anfragen
          </a>
        </div>
      </div>
    </section>
  );
}

/* 9. Kontaktformular */
function PWContact() {
  const ref = useReveal();
  return (
    <section id="kontakt" className="bg-white py-24">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="grid gap-12 lg:grid-cols-2">
          {/* left: info */}
          <div className="space-y-6">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent">
              Kontakt
            </span>
            <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
              Ihr Ansprechpartner für Kooperationen
            </h2>
            <p className="text-muted leading-relaxed">
              Sie möchten prüfen, ob eine Zusammenarbeit sinnvoll ist? Senden
              Sie uns Ihre Anfrage und wir melden uns zeitnah für ein
              persönliches Gespräch.
            </p>
            {/* contact info */}
            <div className="space-y-4 pt-4">
              <a
                href="tel:+4982617597176"
                className="flex items-center gap-4 rounded-[var(--radius-card)] bg-[#f4f6f8] p-5 transition hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted">Telefon</p>
                  <p className="text-sm font-semibold text-ink">
                    08261 7597176
                  </p>
                </div>
              </a>
              <a
                href="mailto:info@alab-energiesysteme.de"
                className="flex items-center gap-4 rounded-[var(--radius-card)] bg-[#f4f6f8] p-5 transition hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted">E-Mail</p>
                  <p className="text-sm font-semibold text-ink">
                    info@alab-energiesysteme.de
                  </p>
                </div>
              </a>
            </div>
            {/* placeholder image */}
            <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_40px_rgba(15,37,51,0.12)]">
              <img
                src="/assets/img/placeholder-partner-kontakt.jpg"
                alt="ALAB Energiesysteme Team"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>

          {/* right: form */}
          <div className="rounded-[var(--radius-card)] bg-[#f4f6f8] p-8 shadow-[0_10px_40px_rgba(15,37,51,0.06)] md:p-10">
            <h3 className="text-xl font-bold text-ink">
              Kooperationsanfrage senden
            </h3>
            <p className="mt-2 text-sm text-muted">
              Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.
            </p>
            <form className="mt-8 space-y-5">
              {FORM_FIELDS.map((f) => (
                <div key={f.name}>
                  <label
                    htmlFor={f.name}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    {f.label}
                    {f.required && <span className="text-accent"> *</span>}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    className="w-full rounded-[var(--radius-btn)] border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  Nachricht / Projektanfrage
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-[var(--radius-btn)] border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <label htmlFor="privacy" className="text-xs text-muted">
                  Ich stimme der{" "}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    Datenschutzerklärung
                  </a>{" "}
                  zu. *
                </label>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition hover:bg-accent-deep"
              >
                Anfrage absenden <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 10. FAQ */
function PWFaq() {
  const ref = useReveal();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-[#f4f6f8] py-24">
      <div
        ref={ref}
        className="mx-auto max-w-3xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <span className="block text-center text-xs font-bold uppercase tracking-widest text-accent">
          FAQ
        </span>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-ink md:text-4xl">
          Häufige Fragen zur Partnerschaft
        </h2>
        <div className="mt-12 divide-y divide-gray-200">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left text-base font-semibold text-ink transition hover:text-accent"
              >
                {item.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 11. Final CTA */
function PWFinalCta() {
  const ref = useReveal();
  return (
    <section className="bg-ink py-24">
      <div
        ref={ref}
        className="mx-auto max-w-4xl px-6 opacity-0 translate-y-6 transition-all duration-700 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="rounded-[var(--radius-card)] bg-white/5 p-10 text-center ring-1 ring-white/10 backdrop-blur md:p-14">
          <span className="block text-xs font-bold uppercase tracking-widest text-accent">
            Jetzt starten
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
            Bereit für eine starke Partnerschaft?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Kontaktieren Sie uns noch heute und lassen Sie uns gemeinsam
            herausfinden, wie wir Ihr Geschäft mit professionellen
            Energielösungen stärken können.
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
export default function PartnerWerdenSection() {
  return (
    <main className="font-[family-name:var(--font-sans)]">
      <PWHero />
      <PWTrust />
      <PWServices />
      <PWBenefits />
      <PWProcess />
      <PWApproach />
      <PWCtaMid />
      <PWContact />
      <PWFaq />
      <PWFinalCta />
    </main>
  );
}
