import Image from "next/image";
import { ArrowRight, ChevronDown, Flame, Heater, Home, HousePlus, Phone } from "lucide-react";
import WPLeadForm from "./WPLeadForm";
import { WPKlickTracking, WPStickyLeiste } from "./WPInteraktion";
import {
  FAQ,
  FORM_ANKER,
  HERO_BILD,
  OEFFNUNGSZEITEN,
  PHONE,
  PHONE_DISPLAY,
  WP_REFERENZEN,
} from "./wp-daten";

/* ════════════════════════════════════════════════════════════
   /lp/waermepumpen – Conversion-Seite für Google-Ads-Traffic

   Designsprache: Ingenieurbüro + Gebäudetechnik, nicht Template.
   - Flächen: Weiß als Basis, #f5f7f9 sparsam, Dunkelblau (ink) NUR
     für Conversion-Bereiche (Formular, Abschluss), Blau (accent) nur
     für CTAs und kleine Highlights.
   - Struktur über Typografie, Weißraum und feine Linien statt Karten.
   - Rundungen: Karten 12 px · große Bilder 16 px · Felder 8 px ·
     Buttons Pille.
   - Achtung: globals.css überschreibt mobil u. a. py-16/20/24, gap-10+,
     mb-/mt-8+, p-7+, px-6+ und text-xl+ – hier deshalb feste Werte.

   Reihenfolge: Hero → Eignung → Formular → Leistung → (Referenzen) →
   Förderung → PV → Warum ALAB → FAQ → Abschluss-CTA
   ════════════════════════════════════════════════════════════ */

const ANKER = `#${FORM_ANKER}`;
const SEKTION = "px-5 py-[80px] sm:px-8 lg:px-10 lg:py-[128px]";
const CONTAINER = "mx-auto max-w-[1240px]";

export default function WaermepumpenLP() {
  return (
    <>
      <Hero />
      <Eignung />
      <Ersteinschaetzung />
      <AusEinerHand />
      {WP_REFERENZEN.length > 0 && <Referenzen />}
      <Foerderung />
      <PvKombination />
      <WarumAlab />
      <Faq />
      <AbschlussCta />
      <WPStickyLeiste />
      <WPKlickTracking />
    </>
  );
}

/* ─── Bausteine ─── */

function Kicker({ children, hell = false }: { children: React.ReactNode; hell?: boolean }) {
  return (
    <p className={`mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] ${hell ? "text-[#a9cdf5]" : "text-accent"}`}>
      {children}
    </p>
  );
}

function H2({ children, hell = false }: { children: React.ReactNode; hell?: boolean }) {
  return (
    <h2 className={`text-balance text-[1.875rem] font-bold leading-[1.14] tracking-[-0.02em] sm:text-[2.25rem] lg:text-[2.75rem] ${hell ? "text-white" : "text-ink"}`}>
      {children}
    </h2>
  );
}

function Lead({ children, hell = false }: { children: React.ReactNode; hell?: boolean }) {
  return (
    <p className={`mt-6 text-[1.0625rem] leading-[1.6] lg:text-[1.15rem] ${hell ? "text-white/75" : "text-muted"}`}>
      {children}
    </p>
  );
}

function PrimaerCta({
  position,
  children,
  id,
  hell = false,
  hero = false,
  className = "",
}: {
  position: string;
  children: React.ReactNode;
  id?: string;
  hell?: boolean;
  /** Hero: mobil weiß auf dunklem Foto, ab Desktop blau auf Weiß */
  hero?: boolean;
  className?: string;
}) {
  const weiss = "bg-white text-ink shadow-[0_10px_28px_-12px_rgba(0,0,0,0.5)] hover:bg-[#eef4fb]";
  const blau =
    "bg-gradient-to-r from-accent-deep to-accent text-white shadow-[0_10px_26px_-12px_rgba(30,79,139,0.7)] hover:shadow-[0_14px_30px_-12px_rgba(30,79,139,0.8)]";
  const farbe = hero
    ? `${weiss} lg:bg-gradient-to-r lg:from-accent-deep lg:to-accent lg:text-white lg:shadow-[0_10px_26px_-12px_rgba(30,79,139,0.7)]`
    : hell
      ? weiss
      : blau;
  return (
    <a
      id={id}
      href={ANKER}
      data-cta={position}
      className={`group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-full px-6 text-center text-[0.95rem] font-bold leading-tight transition-all duration-300 hover:-translate-y-0.5 min-[400px]:text-[1rem] sm:px-8 ${farbe} ${className}`}
    >
      {children}
      <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-[3px] max-sm:hidden" strokeWidth={2.2} />
    </a>
  );
}

function TextLink({ href, position, children }: { href: string; position?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      data-cta={position}
      className="group text-[1rem] font-semibold leading-[1.6] text-ink underline decoration-ink/20 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
      {/* inline statt flex: der Pfeil bleibt beim Umbruch direkt am letzten Wort */}
      <ArrowRight className="ml-2 inline-block h-4 w-4 align-[-2px] transition-transform duration-300 group-hover:translate-x-[3px]" strokeWidth={2.2} />
    </a>
  );
}

function TelefonLink({ position, hell = false }: { position: string; hell?: boolean }) {
  return (
    <a
      href={`tel:${PHONE}`}
      data-pos={position}
      className={`inline-flex items-center gap-2.5 text-[1.05rem] font-bold transition-colors ${hell ? "text-white hover:text-[#a9cdf5]" : "text-ink hover:text-accent"}`}
    >
      <Phone className={`h-[18px] w-[18px] ${hell ? "text-[#a9cdf5]" : "text-accent"}`} />
      {PHONE_DISPLAY}
    </a>
  );
}

/* ════════════════════════════════════════════════════════════
   1 · HERO
   Mobil/Tablet: Foto abgedunkelt als Hintergrund, nur Eyebrow, H1 in
   zwei Ebenen, Zweizeiler, CTA, Telefon, Trust-Zeile.
   Desktop: 52 / 48, großes Foto rechts, Höhe folgt der Textspalte.
   ════════════════════════════════════════════════════════════ */
// Weiche Trennstellen (\u00ad): mobil stehen die drei Begriffe in schmalen Spalten
const HERO_TRUST = ["Ingenieur\u00adplanung", "Elektro\u00adfachbetrieb", "Eigene Montage"];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-[52px] pt-[128px] lg:pb-[72px] lg:pt-[144px]">
      <div className="mx-auto grid max-w-[1320px] px-5 sm:px-8 lg:grid-cols-[52fr_48fr] lg:items-stretch lg:gap-[64px] lg:px-10">
        <div className="relative z-10 flex min-w-0 flex-col justify-center">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white/75 min-[400px]:text-[0.72rem] sm:text-[0.78rem] sm:tracking-[0.14em] lg:text-accent">
            Wärmepumpen-Fachbetrieb aus Mindelheim
          </p>

          <h1 className="text-[2.25rem] font-bold leading-[1.08] tracking-[-0.025em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.3)] sm:text-[3rem] lg:text-[clamp(3rem,3.9vw,3.9rem)] lg:text-ink lg:[text-shadow:none]">
            <span className="block text-balance">Wärmepumpe für Ihr Zuhause.</span>
            <span className="mt-1 block text-balance font-medium text-white/70 lg:text-muted">
              Planung &amp; Einbau aus einer Hand.
            </span>
          </h1>

          <p className="mt-6 max-w-[540px] text-[1.0625rem] leading-[1.6] text-white/85 lg:mt-7 lg:text-[1.15rem] lg:text-muted">
            Bestehende Gas- oder Ölheizung ersetzen? Wir prüfen Ihr Gebäude und
            übernehmen Planung, Hydraulik, Elektro und Inbetriebnahme.
          </p>

          <div className="mt-[32px] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8 lg:mt-10">
            <PrimaerCta id="wp-hero-cta" position="hero" hero className="w-full sm:w-auto">
              Wärmepumpen-Angebot anfordern
            </PrimaerCta>
            <a
              href={`tel:${PHONE}`}
              data-pos="hero"
              className="inline-flex h-[56px] w-full items-center justify-center gap-2.5 rounded-full border border-white/35 text-[1rem] font-bold text-white transition-colors hover:border-white/60 sm:h-auto sm:w-auto sm:justify-start sm:rounded-none sm:border-0 lg:text-ink lg:hover:text-accent"
            >
              <Phone className="h-[18px] w-[18px] text-[#a9cdf5] lg:text-accent" />
              <span className="text-left leading-tight">
                {PHONE_DISPLAY}
                <span className="hidden text-[0.8rem] font-medium text-white/70 sm:block lg:text-muted">
                  {OEFFNUNGSZEITEN}
                </span>
              </span>
            </a>
          </div>

          {/* Trust-Zeile: feine senkrechte Linien statt Punkte – bricht mobil sauber */}
          <ul className="mt-9 grid grid-cols-3 border-t border-white/20 pt-5 text-[0.84rem] font-medium leading-snug text-white/85 sm:flex sm:text-[0.92rem] lg:mt-12 lg:border-line lg:text-ink/75">
            {HERO_TRUST.map((t) => (
              <li
                key={t}
                className="border-l border-white/20 px-3 first:border-l-0 first:pl-0 sm:px-4 lg:border-line"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Foto: mobil/Tablet als abgedunkelter Hintergrund (wie die übrigen
            ALAB-Heros), erst unterhalb des 96-px-Headers, damit dieser weiß
            bleibt; ab Desktop großes Bild in der rechten Spalte. */}
        <div className="absolute inset-x-0 bottom-0 top-[96px] bg-ink lg:relative lg:inset-auto lg:bg-transparent">
          <div className="absolute inset-0 lg:relative lg:h-full lg:min-h-[500px] lg:overflow-hidden lg:rounded-[16px] lg:bg-[#e9eef3]">
            <Image
              src={HERO_BILD.src}
              alt={HERO_BILD.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover object-[40%_center] max-lg:brightness-[0.7]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/60 to-ink/85 lg:hidden"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   2 · EIGNUNG – vier Punkte ohne Karten, nur feine Linien
   ════════════════════════════════════════════════════════════ */
const EIGNUNG = [
  { icon: Home, titel: "Altbau & Bestand", text: "Entscheidend sind Heizlast und Vorlauftemperatur – nicht das Baujahr." },
  { icon: Heater, titel: "Heizkörper", text: "Eine Fußbodenheizung ist keine Pflicht. Wir prüfen Ihre Heizflächen." },
  { icon: Flame, titel: "Öl oder Gas ersetzen", text: "Wir binden die Wärmepumpe in Ihre vorhandene Heizverteilung ein." },
  { icon: HousePlus, titel: "Neubau", text: "Wärmepumpe, Flächenheizung und Elektro von Anfang an abgestimmt." },
];

function Eignung() {
  return (
    <section className={`bg-white ${SEKTION}`}>
      <div className={CONTAINER}>
        <div className="max-w-[720px]">
          <Kicker>Eignung</Kicker>
          <H2>Ist Ihr Gebäude für eine Wärmepumpe geeignet?</H2>
        </div>

        <ul className="mt-[48px] border-t border-line lg:mt-[72px] lg:grid lg:grid-cols-4 lg:gap-x-[40px] lg:border-t-0">
          {EIGNUNG.map(({ icon: Icon, titel, text }) => (
            <li key={titel} className="flex gap-4 border-b border-line py-6 lg:block lg:border-b-0 lg:border-t lg:border-ink/15 lg:pb-0 lg:pt-8">
              <Icon className="mt-1 h-[22px] w-[22px] shrink-0 text-accent lg:mb-5 lg:mt-0" strokeWidth={1.6} />
              <div>
                <h3 className="text-[1.2rem] font-bold leading-snug text-ink lg:text-[1.3rem]">{titel}</h3>
                <p className="mt-2 text-[1rem] leading-[1.6] text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-[44px] lg:mt-[64px]">
          <PrimaerCta position="eignung" className="w-full sm:w-auto">
            Mein Haus prüfen lassen
          </PrimaerCta>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   3 · FRÜHES LEADFORMULAR – Dunkelblau = hier handeln
   ════════════════════════════════════════════════════════════ */
function Ersteinschaetzung() {
  return (
    <section
      id={FORM_ANKER}
      tabIndex={-1}
      aria-labelledby="wp-formular-titel"
      className={`scroll-mt-[84px] bg-gradient-to-br from-ink to-ink-light outline-none ${SEKTION}`}
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-[40px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-[88px]">
        <div>
          <Kicker hell>Kostenlos &amp; unverbindlich</Kicker>
          <h2 id="wp-formular-titel" className="text-[1.875rem] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[2.25rem] lg:text-[2.75rem]">
            Kostenlose Ersteinschätzung
          </h2>
          <Lead hell>
            Vier kurze Schritte – danach melden wir uns persönlich und
            besprechen, welche Wärmepumpe zu Ihrem Gebäude passt.
          </Lead>
          <ul className="mt-[40px] hidden border-t border-white/15 lg:block">
            {[
              "Keine Adresse nötig – die PLZ genügt",
              "Einschätzung durch Ingenieurbüro & Elektrofachbetrieb",
              "Persönlicher Ansprechpartner aus Mindelheim",
            ].map((t) => (
              <li key={t} className="border-b border-white/15 py-4 text-[1rem] text-white/85">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <WPLeadForm />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   4 · ALLES AUS EINER HAND – große Nummern statt Icons
   ════════════════════════════════════════════════════════════ */
const ABLAUF = [
  { titel: "Gebäudeanalyse", text: "Heizlast, Bestand und technische Voraussetzungen." },
  { titel: "Planung", text: "Auslegung von Wärmepumpe, Speicher, Hydraulik und Elektro." },
  { titel: "Wärmepumpe", text: "Aufstellung und Montage von Außen- und Inneneinheit." },
  { titel: "Hydraulik", text: "Einbindung ins Heizsystem und hydraulischer Abgleich." },
  { titel: "Elektroinstallation", text: "Zuleitung, Absicherung und Zählerschrank durch unseren Elektrofachbetrieb." },
  { titel: "Inbetriebnahme", text: "Einstellung, Funktionsprüfung und Einweisung." },
];

function AusEinerHand() {
  return (
    <section className={`bg-white ${SEKTION}`}>
      <div className={`${CONTAINER} lg:grid lg:grid-cols-[5fr_7fr] lg:gap-[96px]`}>
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Kicker>Alles aus einer Hand</Kicker>
          <H2>Von der Heizlast bis zum Elektroanschluss</H2>
          <Lead>
            ALAB ist Ingenieurbüro und Elektrofachbetrieb zugleich – kein
            Vermittler. Sie beauftragen direkt den Betrieb, der plant und
            einbaut.
          </Lead>
          <dl className="mt-[40px] border-t border-line text-[1rem]">
            <div className="border-b border-line py-4">
              <dt className="font-bold text-ink">Als Ingenieurbüro</dt>
              <dd className="mt-1 text-muted">Heizlastermittlung, Auslegung, Planung</dd>
            </div>
            <div className="border-b border-line py-4">
              <dt className="font-bold text-ink">Als Elektrofachbetrieb</dt>
              <dd className="mt-1 text-muted">Anschluss, Absicherung, Zählerschrank</dd>
            </div>
          </dl>
        </div>

        <ol className="mt-[56px] border-b border-line lg:mt-0">
          {ABLAUF.map(({ titel, text }, i) => (
            <li key={titel} className="grid grid-cols-[64px_1fr] gap-4 border-t border-line py-7 sm:grid-cols-[88px_1fr] lg:py-9">
              <span className="text-[2.25rem] font-light leading-none tracking-[-0.03em] text-ink/25 tabular-nums lg:text-[2.75rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.2rem] font-bold leading-snug text-ink lg:text-[1.3rem]">{titel}</h3>
                <p className="mt-2 text-[1rem] leading-[1.6] text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   5 · REFERENZEN (nur echte Projekte aus wp-daten.ts)
   ════════════════════════════════════════════════════════════ */
function Referenzen() {
  return (
    <section className={`bg-white ${SEKTION} lg:pt-0`}>
      <div className={CONTAINER}>
        <div className="max-w-[720px]">
          <Kicker>Referenzen</Kicker>
          <H2>Wärmepumpen von ALAB in der Region</H2>
        </div>
        <div className="mt-[48px] grid gap-x-[32px] gap-y-[48px] sm:grid-cols-2 lg:mt-[72px] lg:grid-cols-3">
          {WP_REFERENZEN.map((r) => (
            <article key={r.bild}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#e9eef3]">
                <Image
                  src={r.bild}
                  alt={r.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-accent">
                {r.bestand} · {r.region}
              </p>
              <h3 className="mt-2 text-[1.2rem] font-bold text-ink">{r.gebaeudetyp}</h3>
              <p className="mt-2 text-[1rem] leading-[1.6] text-muted">{r.technik}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   6 · FÖRDERUNG – editorial, bewusst ohne Prozentsätze/Beträge,
   damit nichts veraltet. Konkrete Werte nennen wir im Gespräch.
   ════════════════════════════════════════════════════════════ */
function Foerderung() {
  return (
    <section className="bg-white px-5 pb-[80px] sm:px-8 lg:px-10 lg:pb-[128px]">
      <div className={`${CONTAINER} border-t border-line pt-[64px] lg:grid lg:grid-cols-[5fr_7fr] lg:gap-[96px] lg:pt-[112px]`}>
        <h2 className="text-ink">
          <span className="block text-[3rem] font-bold leading-none tracking-[-0.035em] sm:text-[4rem] lg:text-[5rem]">
            Förderung
          </span>
          <span className="mt-4 block text-[1.15rem] font-medium leading-snug text-muted lg:text-[1.3rem]">
            Staatliche Zuschüsse für Ihre Wärmepumpe
          </span>
        </h2>

        <div className="mt-[40px] lg:mt-2">
          <p className="text-[1.0625rem] leading-[1.6] text-ink/80 lg:text-[1.15rem]">
            Wie hoch der Zuschuss ausfällt, hängt von Ihrer Situation ab – etwa
            davon, ob Sie das Haus selbst bewohnen und welche Heizung ersetzt
            wird. Förderhöhen und Bedingungen ändern sich regelmäßig; maßgeblich
            sind die Regeln des Fördergebers zum Zeitpunkt der Antragstellung.
          </p>
          <ul className="mt-9 border-t border-line text-[1rem] text-ink">
            {[
              "Wir prüfen, welche Programme aktuell für Ihr Vorhaben gelten.",
              "Wir unterstützen Sie bei der Antragstellung.",
              "Wir achten darauf, dass Antrag und Auftrag in der richtigen Reihenfolge erfolgen.",
            ].map((t) => (
              <li key={t} className="border-b border-line py-4 leading-snug">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <TextLink href={ANKER} position="foerderung">
              Förderung in der Ersteinschätzung prüfen lassen
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   7 · PV + WÄRMEPUMPE – großer visueller Break (echtes ALAB-Projekt)
   ════════════════════════════════════════════════════════════ */
const SYSTEM = ["Photovoltaik", "Stromspeicher", "Wärmepumpe", "Wallbox", "Energiemanagement"];

function PvKombination() {
  return (
    <section className="bg-white lg:grid lg:min-h-[640px] lg:grid-cols-2">
      <figure className="relative aspect-[4/3] lg:aspect-auto">
        {/* Echtes ALAB-Referenzprojekt; Fokus auf das Außengerät (bei ca. 46 % / 60 %) */}
        <Image
          src="/referenzen-wp/referenzprojekt-waermepumpe-1.jpg"
          alt="Von ALAB installierte Luft-Wasser-Wärmepumpe an einem Wohnhaus"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[46%_60%]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-5 pb-4 pt-12 text-[0.85rem] font-medium text-white sm:px-8 lg:px-10">
          Wärmepumpen-Projekt von ALAB Energiesysteme
        </figcaption>
      </figure>

      <div className="flex items-center px-5 py-[72px] sm:px-8 lg:px-[88px] lg:py-[112px]">
        <div className="max-w-[540px]">
          <Kicker>Gesamtsystem</Kicker>
          <H2>Wärmepumpe + Photovoltaik</H2>
          <Lead>
            Strom erzeugen, speichern und für Wärme und Mobilität nutzen. Als
            Elektrofachbetrieb plant und installiert ALAB das komplette
            Energiesystem Ihres Hauses – abgestimmt und aus einer Hand.
          </Lead>
          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6 text-[1rem] font-semibold text-ink">
            {SYSTEM.map((s) => (
              <li key={s} className="flex items-center gap-3">
                <span className="h-[6px] w-[6px] shrink-0 bg-accent" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-[40px] flex flex-col items-stretch gap-6 sm:items-start">
            <PrimaerCta position="pv_kombination" className="w-full sm:w-auto">
              Wärmepumpe mit PV anfragen
            </PrimaerCta>
            <TextLink href="/pv-zuhause">Mehr zur Photovoltaik</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   8 · WARUM ALAB – vier starke Aussagen, keine Icons
   ════════════════════════════════════════════════════════════ */
const GRUENDE = [
  { titel: "Ingenieurmäßige Planung", text: "Auslegung auf Basis der Heizlast Ihres Gebäudes." },
  { titel: "Eigener Elektrofachbetrieb", text: "Anschluss, Absicherung und Zählerschrank aus eigener Hand." },
  { titel: "Eigene Monteure", text: "Montage und Inbetriebnahme durch unser eigenes Team – keine Vermittlung." },
  { titel: "Ein Ansprechpartner", text: "Von der Analyse bis zur Inbetriebnahme – direkt aus Mindelheim." },
];

function WarumAlab() {
  return (
    <section className={`bg-[#f5f7f9] ${SEKTION}`}>
      <div className={`${CONTAINER} lg:grid lg:grid-cols-[5fr_7fr] lg:gap-[96px]`}>
        <div>
          <Kicker>Warum ALAB</Kicker>
          <H2>Planung und Einbau vom Fachbetrieb</H2>
          <Lead>ALAB Energiesysteme · Kastanienweg 6 · 87719 Mindelheim</Lead>
        </div>
        <ul className="mt-[48px] grid gap-x-[48px] sm:grid-cols-2 lg:mt-0">
          {GRUENDE.map(({ titel, text }) => (
            <li key={titel} className="border-t border-ink/15 py-7">
              <h3 className="text-[1.25rem] font-bold leading-snug text-ink lg:text-[1.35rem]">{titel}</h3>
              <p className="mt-2 text-[1rem] leading-[1.6] text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   9 · FAQ – native <details>, kein JavaScript
   ════════════════════════════════════════════════════════════ */
function Faq() {
  return (
    <section className={`bg-white ${SEKTION}`}>
      <div className={`${CONTAINER} lg:grid lg:grid-cols-[5fr_7fr] lg:gap-[96px]`}>
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Kicker>FAQ</Kicker>
          <H2>Häufige Fragen zur Wärmepumpe</H2>
          <p className="mt-6 text-[1rem] text-muted">Ihre Frage ist nicht dabei?</p>
          <p className="mt-2">
            <TelefonLink position="faq" />
          </p>
        </div>

        <div className="mt-[40px] border-t border-line lg:mt-0">
          {FAQ.map((f) => (
            <details key={f.frage} name="wp-faq" className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[1.08rem] font-semibold leading-snug text-ink transition-colors hover:text-accent lg:text-[1.15rem] [&::-webkit-details-marker]:hidden">
                {f.frage}
                <ChevronDown className="h-5 w-5 shrink-0 text-ink/40 transition-transform duration-300 group-open:rotate-180" strokeWidth={1.8} />
              </summary>
              <p className="pb-7 pr-2 text-[1rem] leading-[1.6] text-muted sm:pr-12">{f.antwort}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   10 · ABSCHLUSS-CTA – Dunkelblau = hier handeln
   ════════════════════════════════════════════════════════════ */
function AbschlussCta() {
  return (
    <section className={`bg-gradient-to-br from-ink to-ink-light ${SEKTION}`}>
      <div className="mx-auto max-w-[860px] text-center">
        <h2 className="text-balance text-[1.875rem] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[2.5rem] lg:text-[3.1rem]">
          Lassen Sie prüfen, welche Wärmepumpe zu Ihrem Haus passt
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-[1.0625rem] leading-[1.6] text-white/75 lg:text-[1.15rem]">
          Kostenlose Ersteinschätzung vom Ingenieurbüro &amp; Elektrofachbetrieb
          aus Mindelheim.
        </p>
        <div className="mt-[40px] flex flex-col items-stretch justify-center gap-5 sm:flex-row sm:items-center sm:gap-10">
          <PrimaerCta position="abschluss" hell>
            Wärmepumpen-Angebot anfordern
          </PrimaerCta>
          <p>
            <TelefonLink position="abschluss" hell />
          </p>
        </div>
      </div>
    </section>
  );
}
