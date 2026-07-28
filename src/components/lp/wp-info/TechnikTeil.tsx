"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Block, Head, PrimaryCta, PhoneCta, STAND } from "./ui";

/* ─────────── 04 · Technik ─────────── */

export function Effizienz() {
  return (
    <Block id="technik">
      <Head
        nr="04"
        kicker="Warum das so günstig ist"
        titel="Nur 29 % Ihrer Heizwärme müssen Sie bezahlen"
        intro="Eine Wärmepumpe erzeugt keine Wärme, sie transportiert sie: aus der Außenluft oder dem Erdreich ins Haus. Deshalb gibt sie ein Vielfaches der Energie ab, die sie an Strom aufnimmt – ein Öl- oder Gaskessel kommt nie über das hinaus, was Sie vorher eingekauft haben."
      />

      <div className="border border-line bg-white p-6 sm:p-9">
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <Baustein
            zahl="1"
            einheit="kWh"
            titel="Strom"
            text="Das ist der Teil, den Sie bezahlen."
          />
          <Zeichen>+</Zeichen>
          <Baustein
            zahl="2,5"
            einheit="kWh"
            titel="Umweltwärme"
            text="Aus der Luft oder dem Erdreich. Kostenlos, unbegrenzt."
            gruen
          />
          <Zeichen>=</Zeichen>
          <Baustein
            zahl="3,5"
            einheit="kWh"
            titel="Heizwärme im Haus"
            text="Dieselbe Wärme, ein Bruchteil der Kosten."
            hervor
          />
        </div>

        <div className="mt-9 border-t border-line pt-7">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[0.95rem] font-bold text-ink">
              Woraus Ihre Heizwärme besteht
            </span>
            <span className="text-[0.83rem] text-muted">
              bei einer Jahresarbeitszahl von 3,5
            </span>
          </div>
          <div className="flex h-12 w-full overflow-hidden">
            <div
              className="flex items-center justify-center bg-accent"
              style={{ width: "28.6%" }}
              title="29 % bezahlter Strom"
            >
              <span className="px-2 text-[0.88rem] font-bold text-white">
                29 %
              </span>
            </div>
            <div className="w-[2px] shrink-0 bg-white" />
            <div
              className="flex items-center justify-center bg-[#2f7d4f]"
              style={{ width: "71.4%" }}
              title="71 % kostenlose Umweltwärme"
            >
              <span className="px-2 text-[0.88rem] font-bold text-white">
                71 % kostenlose Umweltwärme
              </span>
            </div>
          </div>
          <p className="mt-4 text-[0.93rem] leading-[1.7] text-ink/85">
            Zum Vergleich: Bei einer Gasheizung müssen Sie{" "}
            <strong>100 Prozent</strong> der Heizenergie einkaufen – und
            verlieren durch den Verbrennungsvorgang noch einmal rund ein Zehntel
            davon durch den Schornstein.
          </p>
        </div>
      </div>
    </Block>
  );
}

function Baustein({
  zahl,
  einheit,
  titel,
  text,
  hervor = false,
  gruen = false,
}: {
  zahl: string;
  einheit: string;
  titel: string;
  text: string;
  hervor?: boolean;
  gruen?: boolean;
}) {
  return (
    <div
      className={`flex-1 border-t-[3px] p-5 ${
        hervor
          ? "border-t-accent bg-[#eef4fa]"
          : gruen
            ? "border-t-[#2f7d4f] bg-[#f0f7f2]"
            : "border-t-muted/40 bg-[#f5f7f9]"
      }`}
    >
      <div className="flex items-baseline gap-1.5">
        <span
          className={`text-[clamp(2.6rem,6vw,3.6rem)] font-bold leading-none tabular-nums tracking-[-0.03em] ${
            hervor ? "text-accent" : gruen ? "text-[#2f7d4f]" : "text-ink"
          }`}
        >
          {zahl}
        </span>
        <span className="text-[1rem] font-bold text-muted">{einheit}</span>
      </div>
      <div className="mt-3 text-[1.05rem] font-bold text-ink">{titel}</div>
      <p className="mt-1.5 text-[0.87rem] leading-[1.6] text-muted">{text}</p>
    </div>
  );
}

function Zeichen({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center text-[1.8rem] font-bold text-muted/50 lg:w-8"
    >
      {children}
    </div>
  );
}

/* ─────────── 05 · Die drei häufigsten Einwände ─────────── */

const EINWAENDE = [
  {
    mythos: "Im Altbau funktioniert eine Wärmepumpe nicht.",
    fakt: "Eine Feldstudie hat 77 Wärmepumpen in Bestandsgebäuden bis Baujahr 1990 über vier Jahre vermessen. Ergebnis: durchschnittliche Jahresarbeitszahl 3,4 – ohne Sanierung auf Neubaustandard. Entscheidend sind Heizkörper und Hydraulik, nicht das Baujahr.",
  },
  {
    mythos: "Ohne Fußbodenheizung geht gar nichts.",
    fakt: "Flächenheizungen sind ideal, aber keine Bedingung. Ausreichend groß dimensionierte Heizkörper kommen mit 45 bis 55 °C Vorlauf aus. Oft genügt es, zwei oder drei zu klein geratene Heizkörper zu tauschen.",
  },
  {
    mythos: "Der Strompreis macht die Ersparnis wieder kaputt.",
    fakt: "Wärmepumpen laufen über einen separaten Zähler mit eigenem Wärmestromtarif. Über § 14a EnWG kommen reduzierte Netzentgelte hinzu. Realistisch sind 2026 rund 20 bis 28 ct/kWh statt 30 bis 36 ct im Haushaltstarif.",
  },
];

export function Einwaende() {
  return (
    <Block id="einwaende" tone="tint">
      <Head
        nr="05"
        kicker="Fakten-Check"
        titel="Die drei häufigsten Einwände"
      />

      <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
        {EINWAENDE.map((m) => (
          <article key={m.mythos} className="bg-white p-6">
            <p className="flex items-start gap-2.5 text-[0.97rem] font-bold leading-snug text-ink">
              <X
                className="mt-[3px] h-4 w-4 shrink-0 text-[#c05621]"
                strokeWidth={3}
              />
              „{m.mythos}"
            </p>
            <p className="mt-3 flex items-start gap-2.5 border-t border-line pt-3 text-[0.91rem] leading-[1.65] text-muted">
              <Check
                className="mt-[3px] h-4 w-4 shrink-0 text-[#2f7d4f]"
                strokeWidth={3}
              />
              <span>{m.fakt}</span>
            </p>
          </article>
        ))}
      </div>
    </Block>
  );
}

/* ─────────── Abschluss ─────────── */

const ABLAUF = [
  {
    nr: "1",
    titel: "Kurzes Gespräch",
    text: "Wir klären, welche Boni bei Ihnen greifen – das dauert keine 15 Minuten.",
  },
  {
    nr: "2",
    titel: "Vor-Ort-Termin & Festpreis",
    text: "Heizlast, Heizkörper, Aufstellort. Danach ein Angebot ohne versteckte Positionen.",
  },
  {
    nr: "3",
    titel: "Förderantrag & Einbau",
    text: "Den KfW-Antrag stellen wir für Sie – vor Auftragserteilung. Einbau in 4 bis 6 Wochen.",
  },
];

export function Abschluss() {
  return (
    <Block id="beratung" tone="ink">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <div className="border-b border-white/20 pb-3">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white/55">
              Nächster Schritt
            </span>
          </div>
          <h2 className="mt-5 text-[clamp(1.55rem,3vw,2.25rem)] font-bold leading-[1.18] tracking-[-0.012em] text-white">
            Lassen Sie Ihre Förderfähigkeit prüfen, bevor der Bonus sinkt
          </h2>
          <p className="mt-4 max-w-[600px] text-[1rem] leading-[1.75] text-white/70">
            Sie bekommen eine ehrliche Einschätzung für Ihr Gebäude, die
            passende Förderquote und ein Festpreisangebot. Wenn sich eine
            Wärmepumpe bei Ihnen nicht rechnet, sagen wir Ihnen das auch.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryCta
              label="Kostenlose Förderprüfung anfordern"
              quelle="Wärmepumpe – Abschluss"
              variant="light"
            />
            <PhoneCta variant="light" />
          </div>
          <p className="mt-4 text-[0.8rem] text-white/50">
            Mo–Fr 8:00–17:00 Uhr · Antwort innerhalb von 24 Stunden
          </p>
        </div>

        <ol className="space-y-px">
          {ABLAUF.map((s) => (
            <li key={s.nr} className="flex items-start gap-4 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 text-[0.9rem] font-bold text-white">
                {s.nr}
              </span>
              <div>
                <p className="text-[0.97rem] font-bold text-white">{s.titel}</p>
                <p className="mt-1 text-[0.87rem] leading-[1.6] text-white/60">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-10 border-t border-white/15 pt-6 text-[0.78rem] leading-[1.7] text-white/40">
        Stand aller Angaben: {STAND}. Förderkonditionen ändern sich – maßgeblich
        ist immer die aktuelle Veröffentlichung der KfW. Diese Seite dient der
        Information und ersetzt keine Rechts-, Steuer- oder Energieberatung.
        Beispielrechnungen sind Modellwerte für ein durchschnittliches
        Einfamilienhaus.
      </p>
    </Block>
  );
}

/* ─────────── 06 · FAQ ─────────── */

const FAQ = [
  {
    q: "Bekomme ich wirklich 80 Prozent?",
    a: "Nur, wenn drei Bedingungen zusammenkommen: Sie nutzen die Immobilie selbst, Sie ersetzen eine Öl-, Kohle- oder Gas-Etagenheizung beziehungsweise eine mindestens 20 Jahre alte Gas-Zentralheizung, und Ihr zu versteuerndes Haushaltseinkommen liegt bei höchstens 30.000 € im Jahr. Der häufigste Fall in der Praxis sind 46 Prozent oder 70 bis 76 Prozent, wenn ein Einkommensbonus greift.",
  },
  {
    q: "Wie läuft der Antrag ab?",
    a: "Zuerst Angebot einholen, dann einen Vertrag mit aufschiebender Bedingung abschließen, anschließend über das KfW-Zuschussportal beantragen. Nach der Zusage haben Sie 36 Monate Zeit für die Umsetzung. Den Antrag übernehmen wir für Sie.",
  },
  {
    q: "Was ist mit Vermietern?",
    a: "Für vermietete Wohneinheiten gibt es aktuell nur die Grundförderung von 30 Prozent. Klimageschwindigkeits- und Einkommensbonus sind selbstnutzenden Eigentümern vorbehalten.",
  },
  {
    q: "Lohnt sich Warten auf 2027?",
    a: "Nach heutigem Stand nicht. Der Klimabonus sinkt zum 1. Februar 2027 von 16 auf 12 Prozent, die förderfähigen Höchstkosten fallen um 750 €. Ein angekündigter Wertschöpfungsbonus für EU-Geräte soll lediglich eine gleichzeitige Halbierung der Grundförderung ausgleichen.",
  },
  {
    q: "Wie lange dauert der Einbau?",
    a: "Der Austausch selbst dauert im Einfamilienhaus in der Regel zwei bis vier Arbeitstage. Dazu kommen einige Wochen für Heizlastberechnung, Angebot, Förderantrag und Anmeldung beim Netzbetreiber.",
  },
];

export function Faq() {
  const [offen, setOffen] = useState<number | null>(0);
  return (
    <Block id="faq">
      <Head nr="06" kicker="Häufige Fragen" titel="Kurz und direkt beantwortet" />

      <div className="border-t border-line">
        {FAQ.map((item, i) => {
          const auf = offen === i;
          return (
            <div key={item.q} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOffen(auf ? null : i)}
                aria-expanded={auf}
                className="flex w-full cursor-pointer items-center justify-between gap-5 py-4 text-left"
              >
                <span className="text-[1rem] font-bold text-ink">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-accent transition-transform duration-300 ${
                    auf ? "rotate-180" : ""
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  auf ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[840px] pb-5 text-[0.93rem] leading-[1.7] text-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Block>
  );
}
