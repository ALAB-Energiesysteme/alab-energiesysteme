import { MapPin } from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Lokales SEO: Einsatzgebiet-Sektion mit echten Ortsnamen
   im ~50 km Radius um Mindelheim. Stärkt das Ranking für
   "... in der Nähe" / "... + Ortsname"-Suchen.
   ────────────────────────────────────────────────────────── */

const ORTE = [
  "Mindelheim",
  "Bad Wörishofen",
  "Memmingen",
  "Türkheim",
  "Kirchheim in Schwaben",
  "Pfaffenhausen",
  "Ottobeuren",
  "Bad Grönenbach",
  "Babenhausen",
  "Krumbach",
  "Buchloe",
  "Kaufbeuren",
  "Marktoberdorf",
  "Illertissen",
  "Schwabmünchen",
  "Bobingen",
  "Landsberg am Lech",
  "Günzburg",
  "Kempten",
  "Unterallgäu",
];

interface EinsatzgebietProps {
  /** z. B. "Photovoltaik", "Wärmepumpen", "Energietechnik" */
  leistung?: string;
}

export default function EinsatzgebietSection({
  leistung = "Energietechnik",
}: EinsatzgebietProps) {
  return (
    <section className="bg-[#f8fafb] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent">
            <MapPin className="h-3.5 w-3.5" />
            Regional verwurzelt
          </span>
          <h2 className="mb-4 max-w-[760px] text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight text-ink">
            {leistung} aus Mindelheim – für Sie in der ganzen Region im Einsatz
          </h2>
          <p className="max-w-[720px] text-[0.96rem] leading-[1.75] text-muted">
            Als Ingenieurbüro und zertifizierter Elektrofachbetrieb mit Sitz in
            87719 Mindelheim sind wir Ihr Partner für {leistung} im gesamten
            Unterallgäu und den angrenzenden Landkreisen – im Umkreis von rund
            50&nbsp;km. Kurze Wege, persönliche Beratung vor Ort und
            zuverlässiger Service mit eigenen Fachkräften.
          </p>
        </div>

        <ul className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-2.5">
          {ORTE.map((ort) => (
            <li
              key={ort}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.85rem] font-medium text-ink shadow-[0_1px_3px_rgba(15,37,51,0.04)]"
            >
              <MapPin className="h-3 w-3 text-accent" />
              {ort}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-[720px] text-center text-[0.88rem] leading-relaxed text-muted">
          Ihr Ort ist nicht dabei? Kein Problem – sprechen Sie uns einfach an.
          Wir realisieren {leistung}-Projekte in ganz Bayern und
          darüber hinaus.
        </p>
      </div>
    </section>
  );
}
