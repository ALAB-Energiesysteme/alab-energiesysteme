"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function WaermepumpenSection() {
  return (
    <>
      <WPHero />
      <WPServices />
      <WPHighlight />
      <WPVorteile />
      <WPLoslegen />
      <WPCta />
      <WPFaq />
    </>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 1 – Hero Video
   ═══════════════════════════════════════════════ */
function WPHero() {
  return (
    <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden max-[900px]:h-[60vh] max-[900px]:min-h-[450px]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.65]"
      >
        <source src="/wp-hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-ink/30 via-ink/50 to-ink/70" />

      <div className="relative z-[3] flex h-full flex-col items-center justify-center px-7 pt-[100px] pb-[60px] text-center">
        <h1 className="m-0 text-[clamp(2.5rem,6vw,4.5rem)] font-light uppercase tracking-[0.15em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.3)]">
          Wärmepumpen für Zuhause
        </h1>
        <p className="mt-5 max-w-[600px] text-[clamp(1rem,2vw,1.3rem)] leading-relaxed text-white/90">
          Nachhaltig heizen mit modernster Technologie – effizient, leise und bis zu 70 % staatlich gefördert.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Service Cards (overlapping hero)
   ═══════════════════════════════════════════════ */
const SERVICES = [
  {
    title: "Wärmepumpen-Installation",
    subtitle: "Komplett-Service aus einer Hand",
    text: "Von der Beratung über die Planung bis zur fachgerechten Installation – wir realisieren Ihre neue Wärmepumpenheizung schlüsselfertig und normgerecht.",
    href: "/kontakt",
    image: "/wp-card-installation.png",
  },
  {
    title: "Förderberatung",
    subtitle: "Bis zu 70 % staatliche Förderung",
    text: "Wir unterstützen Sie bei der Antragstellung und maximieren Ihre Fördersumme. Profitieren Sie von attraktiven staatlichen Zuschüssen für den Umstieg auf erneuerbare Energien.",
    href: "/kontakt",
    image: "/wp-card-foerderung.png",
  },
  {
    title: "PV + Wärmepumpe",
    subtitle: "Die optimale Kombination",
    text: "Nutzen Sie Ihren selbst erzeugten Solarstrom für Ihre Wärmepumpe. So senken Sie Heizkosten weiter und erreichen maximale Unabhängigkeit vom Stromnetz.",
    href: "/privatkunden",
    image: "/wp-card-pv.png",
  },
];

function WPServices() {
  return (
    <section className="relative z-10 -mt-[120px] px-7 pb-20 max-[1000px]:-mt-20">
      <div className="mx-auto grid max-w-[1320px] grid-cols-3 gap-[30px] max-[1000px]:mx-auto max-[1000px]:max-w-[500px] max-[1000px]:grid-cols-1 max-[1000px]:gap-6">
        {SERVICES.map((service) => (
          <article
            key={service.title}
            className="group overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_10px_40px_rgba(15,37,51,0.12)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,37,51,0.18)]"
          >
            <div className="relative flex h-[220px] w-full items-center justify-center overflow-hidden bg-[#f0f6ff]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1000px) 100vw, 33vw"
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <h3 className="mb-2 text-[1.4rem] font-bold text-ink">
                {service.title}
              </h3>
              <p className="mb-4 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-accent">
                {service.subtitle}
              </p>
              <p className="mb-6 text-[0.95rem] leading-[1.65] text-muted">
                {service.text}
              </p>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 – Hochmoderne Wärmepumpen (Feature style)
   ═══════════════════════════════════════════════ */
function WPHighlight() {
  return (
    <section className="bg-[#f4f6f8] px-8 py-[60px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[60px] flex gap-[60px] max-[900px]:flex-col max-[900px]:gap-8">
          <div className="min-w-[280px] shrink-0">
            <h2 className="text-[1.75rem] font-bold leading-[1.3] text-[#0f172a]">
              Hochmoderne{" "}
              <span className="text-accent">Wärmepumpen</span>
            </h2>
            <div className="mt-4 h-[3px] w-[60px] bg-accent" />
          </div>
          <p className="flex-1 text-[0.95rem] leading-[1.7] text-[#475569]">
            Wärmepumpen sind die innovative Lösung, wenn es um nachhaltiges und effizientes Heizen geht.
            Sie gewinnen Energie direkt aus der Umwelt und wandeln diese in Wärme um.
            Als Ingenieurbüro und zertifizierter Elektrofachbetrieb bieten wir Ihnen zukunftsweisende
            Wärmepumpen-Technologie und übernehmen Planung, Installation und Inbetriebnahme mit unseren
            eigenen Fachkräften – aus einer Hand. Die Wärmepumpen überzeugen durch ihr modernes,
            kompaktes Design und zählen zu den leisesten ihrer Klasse. Besonders wirtschaftlich wird
            Ihre Wärmepumpe in Verbindung mit einer Photovoltaikanlage.
          </p>
        </div>

        <div className="mx-auto max-w-[1000px] overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_10px_40px_rgba(15,37,51,0.10)]">
          <div className="grid grid-cols-2 max-[768px]:grid-cols-1">
            <div className="relative h-full min-h-[300px] overflow-hidden max-[768px]:h-[260px]">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
                alt="Familie im Garten"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 max-[768px]:p-6">
              <span className="mb-2 text-[0.85rem] font-bold text-accent">
                Jetzt umsteigen
              </span>
              <h3 className="mb-4 text-[1.5rem] font-bold leading-[1.2] text-ink">
                Wärmepumpe: die Zukunft des Heizens
              </h3>
              <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted">
                Hauptbestandteil unserer Rundum-Sorglos-Lösung ist eine hochwertige
                Luft/Wasser-Wärmepumpe. Sie gehört zu den leisesten und effizientesten
                Geräten auf dem Markt und sorgt für behagliche Wärme in Ihrem Zuhause.
              </p>
              <a
                href="#angebot"
                data-open-angebot="waermepumpen-projekt-start"
                className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-bold text-ink transition-all hover:bg-ink hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                Wärmepumpen-Projekt starten
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Die 5 größten Vorteile (Swipe Cards)
   ═══════════════════════════════════════════════ */
const VORTEILE = [
  {
    num: "01",
    title: "Nachhaltige Wärmequelle",
    text: "Wärmepumpen beziehen ca. 75 % der Energie direkt aus der Umwelt – eine besonders nachhaltige Art zu heizen. Der Wechsel von fossilen Heizsystemen senkt Ihre Heizkosten langfristig.",
    icon: (
      <Image src="/icon-wp-01.png" alt="Nachhaltige Wärmequelle" width={192} height={192} sizes="192px" className="h-48 w-48 object-contain" />
    ),
  },
  {
    num: "02",
    title: "Fachgerechte Installation",
    text: "Unsere eigenen Elektrofachkräfte sorgen für einen reibungslosen und fachmännischen Einbau. Planung, Installation und Inbetriebnahme aus einer Hand – Sie lehnen sich zurück und erleben modernste Heizungstechnik.",
    icon: (
      <Image src="/icon-wp-02.png" alt="Fachgerechte Installation" width={192} height={192} sizes="192px" className="h-48 w-48 object-contain" />
    ),
  },
  {
    num: "03",
    title: "Premium Qualität",
    text: "Wir setzen auf Wärmepumpen mit Premium-Qualität von namenhaften Herstellern. Die Produkte sind mehrfach ausgezeichnet und gehören zu den führenden Geräten ihrer Klasse.",
    icon: (
      <Image src="/icon-wp-03.png" alt="Premium Qualität" width={192} height={192} sizes="192px" className="h-48 w-48 object-contain" />
    ),
  },
  {
    num: "04",
    title: "Kombinierbar mit PV-Anlage",
    text: "Besonders wirtschaftlich wird Ihre Wärmepumpe in Verbindung mit einer Photovoltaikanlage. Nutzen Sie Ihren Solarstrom, um Heizkosten weiter zu senken.",
    icon: (
      <Image src="/icon-wp-04.png" alt="Kombinierbar mit PV-Anlage" width={192} height={192} sizes="192px" className="h-48 w-48 object-contain" />
    ),
  },
  {
    num: "05",
    title: "Attraktive Förderung",
    text: "Sichern Sie sich bis zu 70 % Förderung vom Staat. Wir unterstützen Sie bei der Antragstellung und maximieren Ihre Fördersumme.",
    icon: (
      <Image src="/icon-wp-05.png" alt="Attraktive Förderung" width={192} height={192} sizes="192px" className="h-48 w-48 object-contain" />
    ),
  },
];

function WPVorteile() {
  const [page, setPage] = useState(0);
  const cardsPerView = useCardsPerView();
  const maxPage = Math.max(0, VORTEILE.length - cardsPerView);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  function onTouchStart(e: React.TouchEvent) { touchStart.current = e.targetTouches[0].clientX; }
  function onTouchMove(e: React.TouchEvent) { touchEnd.current = e.targetTouches[0].clientX; }
  function onTouchEnd() {
    const diff = touchStart.current - touchEnd.current;
    if (diff > 60) setPage((p) => Math.min(maxPage, p + 1));
    if (diff < -60) setPage((p) => Math.max(0, p - 1));
  }

  return (
    <section className="px-7 py-[80px]">
      <div className="mx-auto max-w-[1320px]">
        <h2 className="mb-2 text-center text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold text-ink">
          Die 5 größten Vorteile
        </h2>
        <p className="mx-auto mb-10 max-w-[600px] text-center text-[0.95rem] leading-[1.65] text-muted">
          Warum sich der Umstieg auf eine Wärmepumpe mit ALAB lohnt.
        </p>

        {/* Arrows */}
        <div className="mb-6 flex justify-end gap-3 pr-2">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/20 text-ink transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Zurück"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/20 text-ink transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30"
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={page >= maxPage}
            aria-label="Weiter"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Track */}
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${page * (100 / cardsPerView)}%)` }}
          >
            {VORTEILE.map((v, idx) => {
              const isEven = idx % 2 === 0;
              const dotColor = isEven ? "rgba(245,197,24,1)" : "rgba(168,85,247,1)";
              return (
                <div
                  key={v.num}
                  className="relative flex flex-[0_0_calc(50%-12px)] flex-col overflow-hidden rounded-[20px] shadow-[0_10px_40px_rgba(15,37,51,0.18)] max-[640px]:flex-[0_0_100%]"
                  style={{ backgroundColor: "rgb(20, 42, 56)" }}
                >
                  {/* Dot pattern effect bottom-right */}
                  <div
                    className="pointer-events-none absolute bottom-0 right-0 z-10 h-[180px] w-[240px]"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${dotColor} 1.5px, transparent 1.5px)`,
                      backgroundSize: "7px 7px",
                      maskImage: "linear-gradient(135deg, transparent 10%, black 60%)",
                      WebkitMaskImage: "linear-gradient(135deg, transparent 10%, black 60%)",
                    }}
                  />
                  {/* Icon area */}
                  <div className="flex h-[280px] items-center justify-center">
                    {v.icon}
                  </div>
                  {/* Content – Text wird vor dem Punkt-Muster umgebrochen */}
                  <div className="relative z-20 flex flex-1 flex-col px-8 pb-10 pr-[210px] max-[640px]:pr-[160px]">
                    <span className="mb-1 text-[0.85rem] font-bold text-accent">
                      {v.num}
                    </span>
                    <h3 className="mb-3 text-[1.4rem] font-bold leading-[1.2] text-white">
                      {v.title}
                    </h3>
                    <p className="text-[0.9rem] leading-[1.7] text-white/70">
                      {v.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2.5">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              className={`h-2.5 w-2.5 rounded-full border-2 transition-all ${
                i === page
                  ? "scale-125 border-accent bg-accent"
                  : "border-ink/30 bg-transparent hover:border-accent"
              }`}
              onClick={() => setPage(i)}
              aria-label={`Seite ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5 – CTA Banner with House Image
   ═══════════════════════════════════════════════ */
function WPCta() {
  return (
    <section className="relative py-[100px]">
      <div className="mx-auto max-w-[1320px] px-7">
        {/* Text Card */}
        <div className="relative z-10 mx-auto max-w-[700px] rounded-[24px] bg-white/95 px-12 py-14 text-center shadow-[0_15px_50px_rgba(15,37,51,0.12)] backdrop-blur-sm"
          style={{
            backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "right top",
          }}
        >
          <div className="relative rounded-[20px] bg-white/90 px-10 py-12">
            <p className="mb-3 text-[clamp(1.4rem,3vw,1.8rem)] text-ink">
              Werde jetzt <strong>unabhängiger.</strong>
            </p>
            <p className="mb-3 text-[clamp(1.4rem,3vw,1.8rem)] text-ink">
              Leiste deinen Beitrag zum<br />
              <strong>Umweltschutz.</strong>
            </p>
            <p className="mb-8 text-[clamp(1.4rem,3vw,1.8rem)] text-ink">
              Nutze die Gelegenheit um<br />
              <strong>Energiekosten</strong> zu sparen.
            </p>
            <a
              href="#angebot"
              data-open-angebot="waermepumpen-final-cta"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#f5c518] px-8 py-4 text-[0.95rem] font-bold text-ink shadow-[0_4px_12px_rgba(245,197,24,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(245,197,24,0.4)]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              Jetzt Wärmepumpen-Projekt starten
            </a>
          </div>
        </div>

        {/* House Image */}
        <div className="relative -mt-20 h-[550px] overflow-hidden rounded-[24px] max-[768px]:h-[350px]">
          <Image
            src="/wp-haus-unten.png"
            alt="Haus mit Wärmepumpe"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6 – Lass uns loslegen
   ═══════════════════════════════════════════════ */
function WPLoslegen() {
  return (
    <section className="py-[100px]">
      <div className="mx-auto max-w-[1320px] px-7">
        <div className="relative grid grid-cols-[1fr_1.3fr] items-center max-[900px]:grid-cols-1">
          {/* Image */}
          <div className="relative z-10 h-[500px] overflow-hidden rounded-[20px] shadow-[0_15px_50px_rgba(15,37,51,0.18)] max-[900px]:mx-auto max-[900px]:h-[350px] max-[900px]:w-full">
            <Image
              src="/wp-loslegen.jpg"
              alt="Bosch Wärmepumpe am Haus"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Content Card */}
          <div className="-ml-10 rounded-[24px] bg-[#f0f0f0] py-14 pl-20 pr-14 max-[900px]:ml-0 max-[900px]:-mt-10 max-[900px]:px-8 max-[900px]:pt-16">
            <h2 className="mb-5 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-ink">
              Lass uns loslegen
            </h2>
            <p className="mb-10 max-w-[500px] text-[1.05rem] leading-[1.75] text-muted">
              Bei deinem Wärmepumpen-Projekt steht dir ALAB Energiesysteme als verlässlicher Partner zur Seite – Ingenieurbüro und zertifizierter Elektrofachbetrieb mit eigenen Fachkräften. Von der ersten Beratung über die ingenieurmäßige Auslegung bis zur schlüsselfertigen Inbetriebnahme – alles aus einer Hand.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <svg className="h-7 w-7 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1.5 text-[1.1rem] font-bold text-ink">Langlebige Qualität</h3>
                  <p className="text-[0.95rem] leading-[1.65] text-muted">
                    Wärmepumpen gelten als wartungsarme Heizsysteme mit einer hohen Lebensdauer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <svg className="h-7 w-7 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1.5 text-[1.1rem] font-bold text-ink">Vielseitig</h3>
                  <p className="text-[0.95rem] leading-[1.65] text-muted">
                    Passend zu deinen individuellen Gegebenheiten und Anforderungen wird die optimale Wärmepumpen-Größe für dich von unseren Experten geplant.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <svg className="h-6 w-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1.5 text-[1.1rem] font-bold text-ink">Leiser Betrieb</h3>
                  <p className="text-[0.95rem] leading-[1.65] text-muted">
                    Die Vaillant aroTHERM plus ist eine der leisesten ihrer Klasse!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 7 – FAQ Accordion
   ═══════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    question: "Was unterscheidet eine Wärmepumpe von einer herkömmlichen Heizung?",
    answer: (
      <>
        <p>Die meisten deutschen Haushalte verwenden Gas- oder Ölheizungen, die, ähnlich wie viele Wärmepumpen, Wasser in einem Heizkreislauf erhitzen. Diese Systeme erzeugen Wärme, indem sie Gas oder Erdöl verbrennen. Moderne Geräte sind zwar effizient, haben jedoch einen bedeutenden Nachteil: Die verwendeten Brennstoffe sind begrenzt, kosten Geld und verursachen CO2-Emissionen, die die Umwelt belasten.</p>
        <p className="mt-4">Im Gegensatz dazu benötigt eine Wärmepumpe alleinig elektrischen Strom zur Energiegewinnung. Wenn dieser Strom beispielsweise aus einer Solaranlage stammt, arbeitet die Wärmepumpe emissionsfrei. Wir setzen auf moderne Luft-Wasser-Wärmepumpen, die die Umweltwärme aus der umgebenden Außenluft nutzen – effizient, leise und ohne aufwendige Erdarbeiten.</p>
      </>
    ),
  },
  {
    question: "Warum verbraucht eine Wärmepumpe Strom?",
    answer: (
      <>
        <p>Eine Luft-Wasser-Wärmepumpe verwendet Strom, um Wärme aus der Außenluft zu entziehen und sie für das Heizen zu nutzen. Der Strom betreibt den Kompressor, der die Wärme auf ein höheres Temperaturniveau bringt. Zudem wird Strom für den laufenden Betrieb von Pumpen, Ventilatoren und weiteren Hilfsaggregaten benötigt.</p>
        <p className="mt-4">Obwohl die Wärmepumpe Strom benötigt, ist sie sehr effizient, da sie mehr Heizenergie erzeugt, als sie Strom verbraucht. Das macht sie nachhaltig und sparsam beim Heizen.</p>
      </>
    ),
  },
  {
    question: "Was passiert im Inneren einer Wärmepumpe um Energie zu gewinnen?",
    answer: (
      <>
        <p>Eine Luft-Wasser-Wärmepumpe funktioniert, indem sie Wärme aus der Außenluft aufnimmt und auf eine höhere Temperatur anhebt, um Gebäude zu heizen oder zu kühlen. Dies geschieht durch einen Kreislaufprozess, der im Wesentlichen aus vier Hauptkomponenten besteht:</p>
        <Image src="/was-passiert-im-inneren-einer-waermepumpe.webp" alt="Funktionsweise einer Wärmepumpe – Kreislauf mit Verdampfer, Verdichter, Verflüssiger und Expansionsventil" width={600} height={400} sizes="(max-width: 640px) 100vw, 600px" className="my-6 mx-auto max-w-[600px] w-full rounded-lg h-auto" />
        <p className="mt-4"><strong>Verdampfer:</strong><br />Im Verdampfer wird die Wärme aus der Außenluft aufgenommen. Ein Kältemittel verdampft bei niedriger Temperatur, indem es Wärme aus der Quelle aufnimmt.</p>
        <p className="mt-4"><strong>Verdichter:</strong><br />Der verdampfte Kältemittel-Dampf wird in den Verdichter geleitet, der den Druck und die Temperatur des Gases erhöht. Dies führt dazu, dass das Kältemittel sehr heiß wird.</p>
        <p className="mt-4"><strong>Verflüssiger:</strong><br />Das heiße, komprimierte Kältemittel strömt in den Verflüssiger, wo es seine Wärme an das Heizsystem abgibt. Dadurch kondensiert es wieder zu einem flüssigen Zustand.</p>
        <p className="mt-4"><strong>Expansionsventil:</strong><br />Das flüssige Kältemittel durchläuft ein Expansionsventil, das den Druck und die Temperatur des Kältemittels reduziert und es erneut in den Verdampfer führt, um den Kreislauf von vorne zu beginnen: Verdampfen, Verdichten, Verflüssigen, Entspannen.</p>
      </>
    ),
  },
  {
    question: "Funktioniert eine Wärmepumpe auch im Winter?",
    answer: (
      <p>Ja, moderne Luft-Wasser-Wärmepumpen funktionieren auch im Winter zuverlässig. Aufgrund ihrer hohen Effizienz arbeiten sie bei tiefen Außentemperaturen bis ca. -20 °C. Ab dieser Temperatur schaltet sich vorübergehend ein elektrischer Heizstab als Unterstützung zu. Alternativ lässt sich eine Wärmepumpe auch als Hybrid-Anlage mit einer Gasheizung betreiben. So genießen Sie selbst bei tiefen Außentemperaturen im Winter zuverlässig Wärme.</p>
    ),
  },
  {
    question: "Was sind die Voraussetzungen für den Einbau einer Wärmepumpe?",
    answer: (
      <>
        <p>Die wichtigsten Voraussetzungen für den Einbau einer Luft-Wasser-Wärmepumpe sind ein geeigneter Aufstellort für das Außengerät, ausreichend Platz für die Inneneinheit sowie ein möglichst gut gedämmtes Gebäude – idealerweise mit Niedertemperatur-Heizsystem wie einer Fußbodenheizung.</p>
        <p className="mt-4">Zudem müssen die Mindestabstände zu Nachbargebäuden eingehalten werden. Gerne prüfen wir bei einem kostenlosen Beratungsgespräch, ob Ihr Gebäude für eine Wärmepumpe geeignet ist.</p>
      </>
    ),
  },
  {
    question: "Was kostet eine Wärmepumpe?",
    answer: (
      <>
        <p>Die Kosten für eine Luft-Wasser-Wärmepumpe hängen stark von der Heizlast Ihres Gebäudes, dem vorhandenen Heizsystem und den baulichen Gegebenheiten ab. Wir erstellen Ihnen nach einer individuellen Bestandsaufnahme ein transparentes Festpreisangebot – ohne versteckte Kosten.</p>
        <p className="mt-4">Durch staatliche Förderungen von bis zu 70 % können die Investitionskosten zudem erheblich gesenkt werden. Langfristig sparen Sie durch die niedrigen Betriebskosten gegenüber fossilen Heizsystemen deutlich ein.</p>
      </>
    ),
  },
  {
    question: "Gibt es Förderungen?",
    answer: (
      <>
        <p>Ja, der Staat fördert den Einbau von Wärmepumpen mit attraktiven Zuschüssen. Über die Bundesförderung für effiziente Gebäude (BEG) können Sie bis zu 70 % der förderfähigen Kosten erstattet bekommen. Die Förderung setzt sich aus einer Grundförderung, einem Klimageschwindigkeitsbonus und einem Einkommensbonus zusammen.</p>
        <p className="mt-4">Wir unterstützen Sie bei der Antragstellung und sorgen dafür, dass Sie die maximale Fördersumme erhalten. Sprechen Sie uns einfach an!</p>
      </>
    ),
  },
];

function FaqItem({ item, isOpen, onToggle }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div>
      <button
        className="flex w-full items-center justify-between py-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-[1.1rem] font-semibold text-ink max-[640px]:text-[1rem]">
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-ink/60 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div className="pb-6 text-[0.95rem] leading-[1.7] text-muted">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

function WPFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-7 py-[80px]">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-12 text-center text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-ink">
          Du hast noch Fragen?
        </h2>

        <div className="divide-y divide-gray-200">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Hook: cards visible per viewport ── */
function useCardsPerView() {
  const [count, setCount] = useState(2);
  useEffect(() => {
    function calc() {
      setCount(window.innerWidth < 640 ? 1 : 2);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return count;
}
