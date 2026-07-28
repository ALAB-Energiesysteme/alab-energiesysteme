"use client";

import { Block, Head, Note, CtaBand, eur } from "./ui";

/* ══════════════════════════════════════════════════════════════
   Was Sie sparen.

   Vergleichsmaßstab ist bewusst die Heizung, die heute im Keller
   steht – nicht ein hypothetischer Neukauf. Genau diese Rechnung
   stellt der Kunde selbst auf.

   Annahmen (Einfamilienhaus, ca. 20.000 kWh Wärmebedarf, 2026):
     Ölheizung   25.000 kWh Öl à 14 ct      → ca. 3.000 €/Jahr
     Gasheizung  22.200 kWh Gas à 11,3 ct   → ca. 2.400 €/Jahr
     Wärmepumpe  5.700 kWh Strom à 24 ct    → ca. 1.500 €/Jahr
   ══════════════════════════════════════════════════════════════ */

const C_OEL = "#7a4bbf";
const C_GAS = "#c05621";
const C_WP = "#2b6cb0";

const KOSTEN = [
  {
    name: "Alte Ölheizung",
    wert: 3000,
    farbe: C_OEL,
    detail: "25.000 kWh Heizöl à 14 ct",
  },
  {
    name: "Gasheizung",
    wert: 2400,
    farbe: C_GAS,
    detail: "22.200 kWh Erdgas à 11,3 ct",
  },
  {
    name: "Wärmepumpe",
    wert: 1500,
    farbe: C_WP,
    detail: "5.700 kWh Wärmestrom à 24 ct",
    hervor: true,
  },
];

const MAX = 3200;

export default function Ersparnis() {
  return (
    <Block id="ersparnis" tone="tint">
      <Head
        nr="03"
        kicker="Ihre Ersparnis"
        titel={
          <>
            Jedes Jahr bis zu{" "}
            <span className="text-accent">1.450 €</span> weniger Heizkosten
          </>
        }
        intro="Der Zuschuss ist der eine Teil. Der andere läuft still weiter: Eine Wärmepumpe braucht für dieselbe Wärme rund ein Viertel der Energiemenge, die eine alte Öl- oder Gasheizung verbrennt. Das schlägt in jeder einzelnen Jahresabrechnung durch."
      />

      {/* Leitkennzahlen */}
      <div className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-1 py-7 sm:px-6 sm:first:pl-0">
          <div className="text-[clamp(2.4rem,6vw,3.4rem)] font-bold leading-none tabular-nums tracking-[-0.03em] text-accent">
            22.400 €
          </div>
          <div className="mt-3 text-[0.95rem] font-bold text-ink">
            Zuschuss vom Staat
          </div>
          <div className="mt-1 text-[0.8rem] leading-snug text-muted">
            einmalig, maximal je Wohneinheit – kein Kredit
          </div>
        </div>
        <div className="px-1 py-7 sm:px-6">
          <div className="text-[clamp(2.4rem,6vw,3.4rem)] font-bold leading-none tabular-nums tracking-[-0.03em] text-ink">
            1.450 €
          </div>
          <div className="mt-3 text-[0.95rem] font-bold text-ink">
            weniger Heizkosten pro Jahr
          </div>
          <div className="mt-1 text-[0.8rem] leading-snug text-muted">
            gegenüber Öl; gegenüber Gas rund 900 €
          </div>
        </div>
        <div className="px-1 py-7 sm:px-6 sm:last:pr-0">
          <div className="text-[clamp(2.4rem,6vw,3.4rem)] font-bold leading-none tabular-nums tracking-[-0.03em] text-ink">
            3 – 8 Jahre
          </div>
          <div className="mt-3 text-[0.95rem] font-bold text-ink">
            bis sich der Mehrpreis amortisiert
          </div>
          <div className="mt-1 text-[0.8rem] leading-snug text-muted">
            je nach Förderquote und bisherigem Brennstoff
          </div>
        </div>
      </div>

      {/* Jahresheizkosten im Vergleich */}
      <figure className="mt-10 border border-line bg-white p-6 sm:p-8">
        <figcaption className="text-[1.05rem] font-bold text-ink">
          Heizkosten pro Jahr – Einfamilienhaus, rund 20.000 kWh Wärmebedarf
        </figcaption>
        <p className="mt-1 text-[0.83rem] leading-snug text-muted">
          Wärmepumpe mit Jahresarbeitszahl 3,5 und Wärmestromtarif nach § 14a
          EnWG. Preise Stand 2026.
        </p>

        <div className="mt-7 space-y-5">
          {KOSTEN.map((k) => (
            <div key={k.name}>
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span
                  className={`text-[0.95rem] ${
                    k.hervor ? "font-bold text-ink" : "font-semibold text-ink/80"
                  }`}
                >
                  {k.name}
                </span>
                <span className="text-[0.78rem] tabular-nums text-muted">
                  {k.detail}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-11 flex-1 bg-[#f0f3f6]">
                  <div
                    className="flex h-full items-center justify-end rounded-r-[4px] pr-3"
                    style={{
                      width: `${(k.wert / MAX) * 100}%`,
                      background: k.farbe,
                    }}
                    title={`${k.name}: ${eur(k.wert)} pro Jahr`}
                  >
                    <span className="text-[0.95rem] font-bold tabular-nums text-white">
                      {eur(k.wert)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ersparnis-Ableitung */}
        <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          <div className="bg-white px-5 py-4">
            <div className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">
              Sie heizen heute mit Öl
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[1.9rem] font-bold leading-none tabular-nums tracking-[-0.02em] text-accent">
                − 1.500 €
              </span>
              <span className="text-[0.85rem] text-muted">pro Jahr</span>
            </div>
          </div>
          <div className="bg-white px-5 py-4">
            <div className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">
              Sie heizen heute mit Gas
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[1.9rem] font-bold leading-none tabular-nums tracking-[-0.02em] text-accent">
                − 900 €
              </span>
              <span className="text-[0.85rem] text-muted">pro Jahr</span>
            </div>
          </div>
        </div>
      </figure>

      <Note>
        <strong>Und dieser Abstand wächst.</strong> Ab dem 1. Januar 2027 greift
        der europäische Emissionshandel für Gebäude. Öl und Gas verteuern sich
        dadurch zusätzlich um schätzungsweise 300 bis 500 € pro Haushalt und
        Jahr – die Wärmepumpe ist davon nicht betroffen.
      </Note>

      <CtaBand
        titel="Was heißt das für Ihr Haus?"
        text="Wir rechnen mit Ihrem tatsächlichen Verbrauch statt mit Durchschnittswerten – und sagen Ihnen konkret, welcher Betrag bei Ihnen jedes Jahr übrig bleibt."
        buttonLabel="Ersparnis berechnen lassen"
        quelle="Wärmepumpe – nach Ersparnis"
      />
    </Block>
  );
}
