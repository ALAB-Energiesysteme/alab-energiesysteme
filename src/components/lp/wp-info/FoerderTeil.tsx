"use client";

import { useMemo, useState } from "react";
import { Phone } from "lucide-react";
import {
  Block,
  Head,
  Note,
  PrimaryCta,
  PHONE,
  PHONE_DISPLAY,
  eur,
} from "./ui";

/* ─────────── 01 · Förderbausteine ─────────── */

const BAUSTEINE = [
  {
    titel: "Grundförderung",
    wert: "30 %",
    wer: "Alle Antragsteller – auch Vermieter",
    text: "Gilt für jede förderfähige Wärmepumpe, unabhängig von Einkommen und Altanlage.",
  },
  {
    titel: "Klimageschwindigkeitsbonus",
    wert: "16 %",
    wer: "Nur selbstnutzende Eigentümer",
    text: "Für den Austausch einer Öl-, Kohle- oder Gas-Etagenheizung oder einer mindestens 20 Jahre alten Gas-Zentralheizung.",
    warn: "Sinkt ab 1. Februar 2027 halbjährlich",
  },
  {
    titel: "Einkommensbonus",
    wert: "bis 40 %",
    wer: "Selbstnutzer, nach Einkommen gestaffelt",
    text: "40 % bis 30.000 €, 30 % bis 40.000 €, 10 % bis 50.000 € zu versteuerndes Haushaltseinkommen.",
  },
];

const ECKDATEN = [
  { l: "Förderfähige Kosten, 1. Wohneinheit", v: "28.000 €" },
  { l: "Maximaler Zuschuss", v: "22.400 €" },
  { l: "Umsetzungsfrist nach Zusage", v: "36 Monate" },
];

export function FoerderBausteine() {
  return (
    <Block id="foerderung">
      <Head
        nr="01"
        kicker="Förderung"
        titel="Drei Bausteine, maximal 80 Prozent"
        intro="Die KfW-Heizungsförderung (Programm 458) ist ein echter Zuschuss – kein Kredit, keine Rückzahlung. Sie setzt sich aus bis zu drei Bausteinen zusammen, die addiert und bei 80 % gedeckelt werden."
      />

      <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
        {BAUSTEINE.map((b) => (
          <article key={b.titel} className="flex flex-col bg-white p-6">
            <div className="text-[2.4rem] font-bold leading-none tabular-nums tracking-[-0.02em] text-accent">
              {b.wert}
            </div>
            <h3 className="mt-4 text-[1.05rem] font-bold text-ink">
              {b.titel}
            </h3>
            <p className="mt-1 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-muted">
              {b.wer}
            </p>
            <p className="mt-3 flex-1 text-[0.91rem] leading-[1.65] text-muted">
              {b.text}
            </p>
            {b.warn && (
              <p className="mt-4 border-l-[3px] border-l-[#c05621] bg-[#fdf7f3] py-2 pl-3 text-[0.79rem] font-semibold leading-snug text-[#8c3d15]">
                {b.warn}
              </p>
            )}
          </article>
        ))}
      </div>

      <dl className="mt-6 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {ECKDATEN.map((e) => (
          <div key={e.l} className="px-1 py-5 sm:px-6 sm:first:pl-0">
            <dt className="text-[0.82rem] leading-snug text-muted">{e.l}</dt>
            <dd className="mt-1.5 text-[1.5rem] font-bold tabular-nums leading-none text-ink">
              {e.v}
            </dd>
          </div>
        ))}
      </dl>

      <Note tone="warn">
        <strong>Zwei Dinge entscheiden über den Betrag:</strong> Der Antrag muss
        gestellt sein, bevor ein bindender Auftrag an den Fachbetrieb geht –
        üblich ist ein Vertrag mit aufschiebender Bedingung. Und der Klimabonus
        sinkt ab dem 1. Februar 2027 halbjährlich um 4 Prozentpunkte, bis er im
        August 2028 entfällt. Maßgeblich ist das Datum des Antrags, nicht des
        Einbaus.
      </Note>
    </Block>
  );
}

/* ─────────── 02 · Förderrechner ─────────── */

const EINKOMMEN = [
  { id: "u30", label: "bis 30.000 €", bonus: 40 },
  { id: "u40", label: "30.001 – 40.000 €", bonus: 30 },
  { id: "u50", label: "40.001 – 50.000 €", bonus: 10 },
  { id: "ue50", label: "über 50.000 €", bonus: 0 },
] as const;

const ALTHEIZUNG = [
  { id: "alt", label: "Öl, Kohle, Gas-Etage oder Gas ab 20 Jahre", bonus: 16 },
  { id: "neu", label: "Gasheizung unter 20 Jahre / keine Altanlage", bonus: 0 },
] as const;

export function Foerderrechner() {
  const [kosten, setKosten] = useState(30000);
  const [selbstnutzer, setSelbstnutzer] = useState(true);
  const [altheizung, setAltheizung] = useState<"alt" | "neu">("alt");
  const [einkommen, setEinkommen] =
    useState<(typeof EINKOMMEN)[number]["id"]>("u40");

  const r = useMemo(() => {
    const grund = 30;
    const klima = selbstnutzer
      ? (ALTHEIZUNG.find((o) => o.id === altheizung)?.bonus ?? 0)
      : 0;
    const eink = selbstnutzer
      ? (EINKOMMEN.find((o) => o.id === einkommen)?.bonus ?? 0)
      : 0;
    const roh = grund + klima + eink;
    const satz = Math.min(roh, 80);
    const foerderfaehig = Math.min(kosten, 28000);
    const zuschuss = Math.round((foerderfaehig * satz) / 100);
    return {
      grund,
      klima,
      eink,
      roh,
      satz,
      gedeckelt: roh > 80,
      foerderfaehig,
      zuschuss,
      eigenanteil: kosten - zuschuss,
    };
  }, [kosten, selbstnutzer, altheizung, einkommen]);

  return (
    <Block id="rechner" tone="tint">
      <Head
        nr="02"
        kicker="Selbst prüfen"
        titel="Was bleibt bei Ihnen hängen?"
        intro="Eine unverbindliche Überschlagsrechnung nach den seit 21. Juli 2026 geltenden Sätzen. Maßgeblich ist immer die Prüfung durch die KfW."
      />

      <div className="grid grid-cols-1 border border-line lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-line bg-white p-6 sm:p-7 lg:border-b-0 lg:border-r">
          <Feld>Geschätzte Gesamtkosten der Anlage</Feld>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-[1.75rem] font-bold tabular-nums text-ink">
              {eur(kosten)}
            </span>
            <span className="text-[0.78rem] text-muted">
              typisch: 27.000 – 40.000 €
            </span>
          </div>
          <input
            type="range"
            min={15000}
            max={45000}
            step={500}
            value={kosten}
            onChange={(e) => setKosten(Number(e.target.value))}
            className="mb-7 w-full accent-[#2b6cb0]"
            aria-label="Gesamtkosten der Wärmepumpe"
          />

          <Feld>Wer stellt den Antrag?</Feld>
          <Reihe className="mb-7">
            <Wahl
              aktiv={selbstnutzer}
              onClick={() => setSelbstnutzer(true)}
              label="Selbstnutzende Eigentümer"
            />
            <Wahl
              aktiv={!selbstnutzer}
              onClick={() => setSelbstnutzer(false)}
              label="Vermieter / Kapitalanleger"
            />
          </Reihe>

          <div className={selbstnutzer ? "" : "pointer-events-none opacity-40"}>
            <Feld>Welche Heizung wird ersetzt?</Feld>
            <Reihe className="mb-7">
              {ALTHEIZUNG.map((o) => (
                <Wahl
                  key={o.id}
                  aktiv={altheizung === o.id}
                  onClick={() => setAltheizung(o.id)}
                  label={o.label}
                />
              ))}
            </Reihe>

            <Feld>Zu versteuerndes Haushaltseinkommen (Jahr)</Feld>
            <Reihe>
              {EINKOMMEN.map((o) => (
                <Wahl
                  key={o.id}
                  aktiv={einkommen === o.id}
                  onClick={() => setEinkommen(o.id)}
                  label={o.label}
                />
              ))}
            </Reihe>
            <p className="mt-3 text-[0.76rem] leading-snug text-muted">
              Maßgeblich ist der Durchschnitt des zu versteuernden Einkommens
              der vorletzten beiden Jahre. Mit mindestens einem
              kindergeldberechtigten Kind dürfen 10.000 € abgezogen werden.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-[#0f2533] p-6 text-white sm:p-7">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white/50">
            Ihr Fördersatz
          </p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-[3.6rem] font-bold leading-none tabular-nums tracking-[-0.03em]">
              {r.satz}
            </span>
            <span className="pb-2 text-[1.4rem] font-bold text-white/60">%</span>
          </div>

          <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-5 text-[0.89rem]">
            <Zeile label="Grundförderung" wert={`${r.grund} %`} />
            <Zeile
              label="Klimageschwindigkeitsbonus"
              wert={`${r.klima} %`}
              blass={r.klima === 0}
            />
            <Zeile
              label="Einkommensbonus"
              wert={`${r.eink} %`}
              blass={r.eink === 0}
            />
            {r.gedeckelt && (
              <Zeile
                label={`Deckel (rechnerisch ${r.roh} %)`}
                wert="max. 80 %"
                blass
              />
            )}
          </ul>

          <div className="mt-6 space-y-4 border-t border-white/15 pt-5">
            <Gross
              label="Förderfähige Kosten"
              wert={eur(r.foerderfaehig)}
              hinweis={
                kosten > 28000
                  ? `von ${eur(kosten)} – gedeckelt bei 28.000 €`
                  : undefined
              }
            />
            <Gross label="Zuschuss der KfW" wert={eur(r.zuschuss)} hervor />
            <Gross label="Ihr Eigenanteil" wert={eur(r.eigenanteil)} />
          </div>

          <div className="mt-7 border-t border-white/15 pt-5">
            <PrimaryCta
              label="Ergebnis prüfen lassen"
              quelle="Wärmepumpe – nach Rechner"
              variant="light"
              className="w-full"
            />
            <a
              href={`tel:${PHONE}`}
              className="mt-3 flex items-center justify-center gap-2 text-[0.85rem] font-bold text-white/80 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <p className="mt-5 text-[0.73rem] leading-snug text-white/40">
            Ohne Gewähr. Nicht berücksichtigt: kommunale Zuschüsse, steuerliche
            Effekte, Kosten für Zählerplatz oder Heizkörpertausch.
          </p>
        </div>
      </div>
    </Block>
  );
}

/* ─── kleine Bausteine des Rechners ─── */

function Feld({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-muted">
      {children}
    </p>
  );
}

function Reihe({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;
}

function Wahl({
  aktiv,
  onClick,
  label,
}: {
  aktiv: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktiv}
      className={`cursor-pointer rounded-[3px] border px-3.5 py-2 text-[0.83rem] font-semibold transition-colors ${
        aktiv
          ? "border-accent bg-accent text-white"
          : "border-line bg-white text-muted hover:border-accent/50 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function Zeile({
  label,
  wert,
  blass = false,
}: {
  label: string;
  wert: string;
  blass?: boolean;
}) {
  return (
    <li
      className={`flex items-center justify-between gap-3 ${
        blass ? "text-white/40" : "text-white/85"
      }`}
    >
      <span>{label}</span>
      <span className="font-bold tabular-nums">{wert}</span>
    </li>
  );
}

function Gross({
  label,
  wert,
  hinweis,
  hervor = false,
}: {
  label: string;
  wert: string;
  hinweis?: string;
  hervor?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <span className="block text-[0.89rem] leading-snug text-white/70">
          {label}
        </span>
        {hinweis && (
          <span className="mt-0.5 block text-[0.72rem] leading-snug text-white/40">
            {hinweis}
          </span>
        )}
      </div>
      <span
        className={`shrink-0 tabular-nums leading-none ${
          hervor
            ? "text-[1.55rem] font-bold text-[#7db4ea]"
            : "text-[1.15rem] font-bold text-white"
        }`}
      >
        {wert}
      </span>
    </div>
  );
}
