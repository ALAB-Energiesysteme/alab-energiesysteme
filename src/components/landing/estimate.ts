import type { LandingPage } from "@/content/landing-pages/types";

/*
  Objektfragen und Richtpreis-Ersteinschätzung der Landingpage-Formulare.

  ALLE Preisannahmen stehen in PREISE – vor dem Livegang von ALAB bestätigen.
  Herkunft der Startwerte:
  - Wärmepumpe: bewusst eher niedrig angesetzt und nie über 40.000 € (Vorgabe Arben, 25.09.2026),
    nach Heizlastklasse gestaffelt.
  - PV privat: 1.000 €/kWp für die reine PV-Anlage, mit Speicher und Wallbox 1.500 €/kWp
    (Vorgabe Arben, 25.09.2026: 10–13 kWp mit Speicher und Wallbox → 15.000 – 20.000 €).
  - PV Gewerbe und Elektro: bewusst KEIN Preis (Vorgabe Arben, 25.09.2026) – größere bzw. aus der
    Ferne schwer einschätzbare Projekte; die Fragen dienen dort nur der Vorqualifizierung.
*/
export const PREISE = {
  waermepumpe: {
    /** Heizlast bis kW → Spanne inkl. Gerät, Montage, Inbetriebnahme (brutto) */
    klassen: [
      { bisKw: 7, spanne: [25000, 29000] },
      { bisKw: 10, spanne: [27000, 31000] },
      { bisKw: 13, spanne: [29000, 34000] },
      { bisKw: 17, spanne: [32000, 37000] },
      { bisKw: Infinity, spanne: [35000, 40000] },
    ],
    /** Obergrenze der angezeigten Spanne – lieber etwas niedriger als abschreckend hoch */
    hoechstpreis: 40000,
    /** Heizlast in W/m² je Dämmzustand, dazu pauschal 1 kW für Warmwasser */
    wattProQm: { neubau: 35, saniert: 50, teilsaniert: 70, unsaniert: 100 },
    neubauAbschlag: 3000,
    oeltankRueckbau: [1000, 2000],
    andereHeizungRueckbau: [0, 1000],
    heizkoerperAnpassung: [0, 1000],
    heizkoerperAnpassungUnsaniert: [0, 2000],
    verteilungUnbekannt: [0, 1500],
    wohnflaecheAnnahme: 140,
    /** KfW-Heizungsförderung (Programm 458) laut ALAB-Förderseite, Stand 28.07.2026 (wp-info/FoerderTeil.tsx):
        30 % Grund + 16 % Klimageschwindigkeitsbonus + bis 40 % Einkommensbonus, gedeckelt bei 80 %,
        auf höchstens 28.000 € förderfähige Kosten (erste Wohneinheit) → max. 22.400 €. Nicht für Neubauten. */
    foerderung: { quoteMax: 0.8, quoteOhneKlimabonus: 0.7, foerderfaehigeKosten: 28000 },
  },
  photovoltaik: {
    /** kWp-Spanne je Jahresverbrauch */
    kwpNachVerbrauch: { bis3: [6, 8], "3bis5": [8, 10], "5bis8": [10, 13], ueber8: [13, 16], unbekannt: [8, 12] },
    /** €/kWp inkl. Montage für die reine PV-Anlage; Speicher und Wallbox als Aufschlag je kWp (mit beidem 1.500 €/kWp) */
    euroProKwp: 1000,
    speicherAufschlagProKwp: 350,
    wallboxAufschlagProKwp: 150,
    /** Speicher an einer vorhandenen Anlage nachrüsten: je kWh plus Einbindung */
    nachruestungEuroProKwh: [350, 450],
    speicherNachruestung: [1500, 2500],
    speicherKwhNachBestand: { bis7: [5, 7.5], "7bis10": [7.5, 10], "10bis15": [10, 12.5], ueber15: [12.5, 15], unbekannt: [7.5, 10] },
  },
} as const;

export type Choice = { value: string; label: string };
export type Question =
  | { id: string; kind: "choice"; short: string; title: string; hint?: string; options: Choice[] }
  | { id: string; kind: "number"; short: string; title: string; hint?: string; unit: string; min: number; max: number; placeholder: string; unknownLabel: string }
  | { id: "plz"; kind: "postal"; short: string; title: string; hint: string };
export type Answers = Record<string, string>;
export type Estimate = {
  /** „Ihre Wärmepumpe“ – Satzsubjekt für „… könnte ca. X kosten“ */
  subject: string;
  range: [number, number] | null;
  basis: string;
  facts: string[];
  note?: string;
  /** Höchster möglicher Fördersatz (nur Wärmepumpe im Bestand) */
  foerderQuote?: number;
  /** Eigenanteil „ab“: unteres Ende der Preisspanne nach höchstmöglicher Förderung (inkl. Förderdeckel) */
  eigenanteilAb?: number;
  /** Überschrift, wenn bewusst kein Preis genannt wird */
  title?: string;
};
type Page = Pick<LandingPage, "slug" | "category" | "qualifier">;
type Span = readonly [number, number];

export const UNKNOWN = "?";
const choice = (id: string, short: string, title: string, options: [string, string][], hint?: string): Question =>
  ({ id, kind: "choice", short, title, hint, options: options.map(([value, label]) => ({ value, label })) });
const plz = (title = "Wo steht das Objekt?"): Question =>
  ({ id: "plz", kind: "postal", short: "Postleitzahl", title, hint: "Die Postleitzahl genügt für die regionale Einordnung." });
const flaeche = (hint: string): Question =>
  ({ id: "flaeche", kind: "number", short: "Wohnfläche", title: "Wie groß ist die Wohnfläche ungefähr?", hint, unit: "m²", min: 20, max: 3000, placeholder: "z. B. 140", unknownLabel: "Weiß ich nicht genau" });

const has = (text: string | undefined, ...parts: string[]) => !!text && parts.some(part => text.toLowerCase().includes(part));
const add = (a: Span, b: Span): [number, number] => [a[0] + b[0], a[1] + b[1]];
const num = (value: string | undefined) => (value && value !== UNKNOWN && Number.isFinite(Number(value)) ? Number(value) : undefined);
/** Erste Preisstufe, deren Obergrenze (bisKw bzw. bisKwp) den Wert einschließt */
const inBand = (bands: readonly { bisKw?: number; bisKwp?: number; spanne: Span }[], value: number) =>
  bands.find(band => value <= (band.bisKw ?? band.bisKwp ?? Infinity)) ?? bands[bands.length - 1];

/* ── Wärmepumpe ───────────────────────────────────────────── */

function wpVorgaben(vorhaben = "") {
  const neubau = has(vorhaben, "neubau");
  const gas = has(vorhaben, "gas") && !has(vorhaben, "öl");
  const oel = has(vorhaben, "öl") && !has(vorhaben, "gas");
  const heizung = gas ? "gas" : oel ? "oel" : has(vorhaben, "wärmepumpe ersetzen") ? "wp" : undefined;
  return { neubau, heizung };
}

function wpFragen(answers: Answers): Question[] {
  const { neubau, heizung } = wpVorgaben(answers.vorhaben);
  const fragen: Question[] = [flaeche("Die beheizte Fläche aller Etagen, grob geschätzt.")];
  if (!neubau) fragen.push(choice("zustand", "Dämmzustand", "Wie gut ist das Gebäude gedämmt?", [
    ["neubau", "Sehr gut, Neubau oder Neubau-Standard"],
    ["saniert", "Saniert, Dämmung und Fenster erneuert"],
    ["teilsaniert", "Teilweise saniert"],
    ["unsaniert", "Weitgehend unsaniert"],
  ]));
  if (!neubau && !heizung) fragen.push(choice("heizung", "Heizung heute", "Womit heizen Sie heute?", [
    ["gas", "Gas"], ["oel", "Öl"], ["strom", "Nachtspeicher / Strom"], ["andere", "Andere (z. B. Pellets, Fernwärme)"],
  ]));
  const aktuelleHeizung = neubau ? undefined : heizung ?? answers.heizung;
  if (aktuelleHeizung !== "strom") fragen.push(choice("verteilung", "Wärmeverteilung", "Wie wird die Wärme im Haus verteilt?", [
    ["fbh", "Fußbodenheizung"], ["hk", "Heizkörper"], ["beides", "Beides"], ["unbekannt", "Weiß ich nicht"],
  ]));
  return [...fragen, plz()];
}

function wpSchaetzung(answers: Answers): Estimate {
  const p = PREISE.waermepumpe;
  const vorgaben = wpVorgaben(answers.vorhaben);
  const heizung = vorgaben.neubau ? undefined : vorgaben.heizung ?? answers.heizung;
  const zustand = (vorgaben.neubau ? "neubau" : answers.zustand ?? "teilsaniert") as keyof typeof p.wattProQm;
  const flaecheQm = num(answers.flaeche) ?? p.wohnflaecheAnnahme;
  const heizlast = flaecheQm * p.wattProQm[zustand] / 1000 + 1;
  let range = [...inBand(p.klassen, heizlast).spanne] as [number, number];
  if (vorgaben.neubau) range = add(range, [-p.neubauAbschlag, -p.neubauAbschlag]);
  if (heizung === "oel") range = add(range, p.oeltankRueckbau);
  if (heizung === "andere") range = add(range, p.andereHeizungRueckbau);
  if (answers.verteilung === "hk") range = add(range, zustand === "unsaniert" ? p.heizkoerperAnpassungUnsaniert : p.heizkoerperAnpassung);
  if (answers.verteilung === "beides") range = add(range, p.heizkoerperAnpassung);
  if (answers.verteilung === "unbekannt") range = add(range, p.verteilungUnbekannt);

  const facts = [`Heizlast grob geschätzt: ca. ${Math.round(heizlast)} kW`];
  if (num(answers.flaeche) === undefined) facts.push(`Wohnfläche angenommen: ${p.wohnflaecheAnnahme} m²`);
  if (heizung === "oel") facts.push("Rückbau des Öltanks eingerechnet");
  return {
    subject: "Ihre Wärmepumpe",
    range,
    basis: vorgaben.neubau ? "inklusive Gerät, Montage und Inbetriebnahme" : "inklusive Gerät, Montage und Inbetriebnahme, vor Abzug möglicher Förderung",
    facts,
    // Klimageschwindigkeitsbonus nur beim Austausch fossiler Heizungen bzw. Nachtspeicher – nicht bei Pellets, Fernwärme oder alter Wärmepumpe
    foerderQuote: vorgaben.neubau ? undefined : heizung === "wp" || heizung === "andere" ? p.foerderung.quoteOhneKlimabonus : p.foerderung.quoteMax,
    note: heizlast > 17 ? "Bei dieser Heizlast prüfen wir auch eine Lösung aus zwei Geräten." : undefined,
  };
}

/* ── Photovoltaik privat ──────────────────────────────────── */

function pvVorgaben(vorhaben = "") {
  const nurSpeicher = has(vorhaben, "speicher für vorhandene");
  const speicher = has(vorhaben, "ohne speicher") ? "nein"
    : has(vorhaben, "mit speicher", "speicher und", "und speicher") ? "ja" : undefined;
  const wallbox = has(vorhaben, "wallbox") ? "ja" : undefined;
  return { nurSpeicher, speicher, wallbox, erweiterung: has(vorhaben, "erweitern") };
}

const verbrauchFrage = choice("verbrauch", "Stromverbrauch", "Wie hoch ist Ihr Stromverbrauch pro Jahr?", [
  ["bis3", "bis 3.000 kWh"], ["3bis5", "3.000 bis 5.000 kWh"], ["5bis8", "5.000 bis 8.000 kWh"], ["ueber8", "über 8.000 kWh"], ["unbekannt", "Weiß ich nicht"],
], "Steht auf Ihrer Jahresabrechnung. Mit Wärmepumpe oder E-Auto meist über 5.000 kWh.");

function pvFragen(answers: Answers): Question[] {
  const v = pvVorgaben(answers.vorhaben);
  if (v.nurSpeicher) return [
    choice("bestand", "Vorhandene Anlage", "Wie groß ist Ihre vorhandene PV-Anlage?", [
      ["bis7", "bis 7 kWp"], ["7bis10", "7 bis 10 kWp"], ["10bis15", "10 bis 15 kWp"], ["ueber15", "über 15 kWp"], ["unbekannt", "Weiß ich nicht"],
    ]),
    verbrauchFrage,
    plz(),
  ];
  const fragen: Question[] = [
    choice("dach", "Dachform", "Welche Dachform hat Ihr Haus?", [
      ["sattel", "Satteldach"], ["pult", "Pultdach"], ["walm", "Walm- oder Zeltdach"], ["flach", "Flachdach"], ["anderes", "Anderes / weiß ich nicht"],
    ]),
    verbrauchFrage,
  ];
  if (!v.speicher) fragen.push(choice("speicher", "Stromspeicher", "Soll ein Stromspeicher dazukommen?", [
    ["ja", "Ja, mit Speicher"], ["nein", "Nein, ohne Speicher"], ["offen", "Noch offen, bitte beides zeigen"],
  ]));
  if (!v.wallbox) fragen.push(choice("wallbox", "Wallbox", "Soll eine Wallbox mit eingeplant werden?", [
    ["ja", "Ja"], ["nein", "Nein"], ["spaeter", "Vielleicht später"],
  ]));
  return [...fragen, plz()];
}

function pvSchaetzung(answers: Answers): Estimate {
  const p = PREISE.photovoltaik;
  const v = pvVorgaben(answers.vorhaben);

  if (v.nurSpeicher) {
    const kwh = p.speicherKwhNachBestand[(answers.bestand ?? "unbekannt") as keyof typeof p.speicherKwhNachBestand];
    return {
      subject: "Ihr Stromspeicher",
      range: add([kwh[0] * p.nachruestungEuroProKwh[0], kwh[1] * p.nachruestungEuroProKwh[1]], p.speicherNachruestung),
      basis: "inklusive Montage, Einbindung und Inbetriebnahme",
      facts: [`Speichergröße ca. ${deZahl(kwh[0])} bis ${deZahl(kwh[1])} kWh`],
    };
  }

  const kwp = p.kwpNachVerbrauch[(answers.verbrauch ?? "unbekannt") as keyof typeof p.kwpNachVerbrauch];
  const mitWallbox = (v.wallbox ?? answers.wallbox) === "ja";
  const mitSpeicher = (v.speicher ?? answers.speicher) === "ja";
  const offen = !v.speicher && answers.speicher === "offen";
  const proKwp = p.euroProKwp + (mitSpeicher ? p.speicherAufschlagProKwp : 0) + (mitWallbox ? p.wallboxAufschlagProKwp : 0);

  const facts = [`Anlagengröße ca. ${kwp[0]} bis ${kwp[1]} kWp`];
  if (mitSpeicher) facts.push(`Stromspeicher ca. ${kwp[0]} bis ${kwp[1]} kWh eingerechnet`);
  if (mitWallbox) facts.push("Wallbox eingerechnet");
  if (offen) facts.push(`Mit Stromspeicher (ca. ${kwp[0]} bis ${kwp[1]} kWh) kämen ca. ${formatRange([kwp[0] * p.speicherAufschlagProKwp, kwp[1] * p.speicherAufschlagProKwp])} hinzu`);
  const range: [number, number] = [kwp[0] * proKwp, kwp[1] * proKwp];
  return {
    subject: "Ihre PV-Anlage",
    range,
    basis: "inklusive Montage und Inbetriebnahme",
    facts,
    note: v.erweiterung ? "Bei einer Erweiterung prüfen wir zusätzlich Wechselrichter und Zählerschrank der vorhandenen Anlage." : undefined,
  };
}

/* ── Photovoltaik Gewerbe (Fragen ohne Preis) ─────────────── */

function gewerbeFragen(): Question[] {
  return [
    { id: "flaeche", kind: "number", short: "Dachfläche", title: "Wie groß ist die Dachfläche ungefähr?", hint: "Eine grobe Angabe genügt, zum Beispiel Hallenlänge mal Hallenbreite.", unit: "m²", min: 50, max: 200000, placeholder: "z. B. 1.200", unknownLabel: "Weiß ich nicht" },
    choice("dachart", "Dacheindeckung", "Welche Dacheindeckung hat das Gebäude?", [
      ["trapez", "Trapezblech"], ["sandwich", "Sandwichpaneele"], ["flach", "Flachdach mit Folie oder Bitumen"], ["faserzement", "Faserzement / Wellplatten"], ["unbekannt", "Weiß ich nicht"],
    ]),
    choice("verbrauch", "Stromverbrauch", "Wie hoch ist Ihr Stromverbrauch pro Jahr?", [
      ["bis50", "bis 50.000 kWh"], ["50bis200", "50.000 bis 200.000 kWh"], ["200bis1000", "200.000 kWh bis 1 Mio. kWh"], ["ueber1000", "über 1 Mio. kWh"], ["unbekannt", "Weiß ich nicht"],
    ]),
    plz("Wo steht das Gebäude?"),
  ];
}

function gewerbeSchaetzung(): Estimate {
  return {
    subject: "Ihre PV-Anlage",
    range: null,
    basis: "",
    facts: [],
    title: "Ihr Vorhaben ist ein größeres Projekt",
    note: "Einen Preis nennen wir deshalb nicht pauschal: Dachfläche, Statik und Ihr Stromverbrauch machen hier einen großen Unterschied. Dafür benötigen wir genauere Daten.",
  };
}

/* ── Elektro (Fragen ohne Preis) ──────────────────────────── */

type ElektroArt = "zaehler" | "installation" | "anschluss" | "offen";

function elektroArt(slug: string, vorhaben = ""): { art: ElektroArt; installation?: "neubau" | "sanierung" | "teil" } {
  if (slug === "zaehlerschrank-modernisieren" || has(vorhaben, "zähler", "verteilung")) return { art: "zaehler" };
  if (has(vorhaben, "wallbox", "energietechnik")) return { art: "anschluss" };
  if (has(vorhaben, "neubau")) return { art: "installation", installation: "neubau" };
  if (has(vorhaben, "sanierung", "altbau")) return { art: "installation", installation: "sanierung" };
  if (has(vorhaben, "teilmodernisierung", "umbau", "erweiterung")) return { art: "installation", installation: "teil" };
  if (has(vorhaben, "noch offen")) return { art: "offen" };
  return { art: "installation" };
}

function elektroFragen(slug: string, answers: Answers): Question[] {
  const { art, installation } = elektroArt(slug, answers.vorhaben);
  if (art === "zaehler") return [
    choice("zaehler", "Anzahl Zähler", "Wie viele Stromzähler hat das Gebäude?", [["1", "Einen"], ["2", "Zwei"], ["3", "Drei oder mehr"]]),
    choice("alter", "Alter der Anlage", "Wie alt ist die Elektroanlage ungefähr?", [
      ["vor1970", "vor 1970"], ["1970bis1990", "1970 bis 1990"], ["1991bis2010", "1991 bis 2010"], ["nach2010", "nach 2010"], ["unbekannt", "Weiß ich nicht"],
    ]),
    choice("uv", "Unterverteilung", "Soll der Sicherungskasten (Unterverteilung) mit erneuert werden?", [
      ["ja", "Ja, mit erneuern"], ["nein", "Nein, nur den Zählerschrank"], ["unbekannt", "Weiß ich nicht, bitte prüfen"],
    ]),
    plz(),
  ];
  if (art === "anschluss") return [
    choice("anschluss", "Anschluss", "Was soll angeschlossen werden?", [["wallbox", "Wallbox"], ["wp", "Wärmepumpe"], ["pv", "PV-Anlage"], ["mehrere", "Mehreres davon"]]),
    choice("zsAlter", "Zählerschrank", "Wie alt ist Ihr Zählerschrank?", [["jung", "Jünger als 20 Jahre"], ["alt", "Älter als 20 Jahre"], ["unbekannt", "Weiß ich nicht"]]),
    plz(),
  ];
  const gebaeude = choice("gebaeude", "Gebäude", "Um welches Gebäude geht es?", [
    ["efh", "Einfamilienhaus"], ["dhh", "Doppelhaushälfte / Reihenhaus"], ["wohnung", "Wohnung"], ["mfh", "Mehrfamilienhaus"],
  ]);
  if (art === "offen") return [gebaeude, plz()];
  const fragen: Question[] = [];
  if (!installation) fragen.push(choice("umfang", "Umfang", "Welcher Umfang ist geplant?", [
    ["neubau", "Neubau"], ["sanierung", "Komplette Erneuerung im Bestand"], ["teil", "Teilmodernisierung"], ["pruefung", "Nur Prüfung der Anlage"],
  ]));
  if (answers.umfang === "pruefung") return [...fragen, gebaeude, plz()];
  return [...fragen, gebaeude, flaeche("Grob geschätzt genügt."),
    choice("ausstattung", "Ausstattung", "Welche Ausstattung wünschen Sie?", [
      ["standard", "Standard"], ["komfort", "Komfort: mehr Steckdosen, Netzwerk, Außenbereich"], ["smart", "Smart Home (z. B. KNX)"],
    ]),
    plz()];
}

function elektroSchaetzung(): Estimate {
  return {
    subject: "Ihr Vorhaben",
    range: null,
    basis: "",
    facts: [],
    title: "Ihr Projekt lässt sich aus der Ferne schwer einschätzen",
    note: "Einen Preis nennen wir deshalb nicht pauschal: Bei Elektroarbeiten hängt er stark vom Zustand Ihrer Anlage und vom genauen Umfang ab. Dafür benötigen wir genauere Daten.",
  };
}

/* ── Öffentliche Schnittstelle ────────────────────────────── */

/** Die Seitenfrage (qualifier) ist immer die erste Frage; danach folgen die Objektfragen. */
export function buildQuestions(page: Page, answers: Answers): Question[] {
  const first = choice("vorhaben", "Vorhaben", page.qualifier.label, page.qualifier.options.map(option => [option, option]));
  const rest = page.category === "waermepumpe" ? wpFragen(answers)
    : page.category === "photovoltaik" ? pvFragen(answers)
    : page.category === "gewerbe" ? gewerbeFragen()
    : elektroFragen(page.slug, answers);
  return [first, ...rest];
}

export function estimate(page: Page, answers: Answers): Estimate {
  const result = page.category === "waermepumpe" ? wpSchaetzung(answers)
    : page.category === "photovoltaik" ? pvSchaetzung(answers)
    : page.category === "gewerbe" ? gewerbeSchaetzung()
    : elektroSchaetzung();
  // Nur bei der Wärmepumpe wird die Spanne verengt; die PV-Spanne folgt direkt Arbens €/kWp-Vorgabe.
  let range = result.range && roundRange(page.category === "waermepumpe" ? narrow(result.range) : result.range);
  const hoechstpreis = page.category === "waermepumpe" ? PREISE.waermepumpe.hoechstpreis : Infinity;
  if (range && range[1] > hoechstpreis) range = [Math.min(range[0], hoechstpreis - 3000), hoechstpreis];
  const f = PREISE.waermepumpe.foerderung;
  // Nur der günstigste Wert als „ab“ – ohne hohe Obergrenze, aber mit Förderdeckel, damit die Zahl stimmt
  const eigenanteilAb = range && result.foerderQuote
    ? Math.floor((range[0] - Math.min(range[0], f.foerderfaehigeKosten) * result.foerderQuote) / 100) * 100
    : undefined;
  return { ...result, range, eigenanteilAb };
}

/** Richtpreis bewusst als schmale Spanne: höchstens ±9 % um die Mitte der errechneten Werte */
function narrow([min, max]: [number, number]): [number, number] {
  const mid = (min + max) / 2;
  return max - min > mid * 0.18 ? [mid * 0.91, mid * 1.09] : [min, max];
}

/** Anzeige einer Antwort in der Zusammenfassung */
export function answerLabel(question: Question, value: string | undefined): string {
  if (value === undefined || value === "") return "keine Angabe";
  if (question.kind === "choice") return question.options.find(option => option.value === value)?.label ?? value;
  if (question.kind === "number") return value === UNKNOWN ? question.unknownLabel : `${deZahl(Number(value))} ${question.unit}`;
  return value;
}

export function summarize(page: Page, answers: Answers) {
  return buildQuestions(page, answers).map(question => ({ id: question.id, label: question.short, value: answerLabel(question, answers[question.id]) }));
}

function roundRange([min, max]: [number, number]): [number, number] {
  const step = (value: number) => (value < 5000 ? 100 : value < 10000 ? 500 : value < 100000 ? 1000 : 5000);
  return [Math.floor(min / step(min)) * step(min), Math.ceil(max / step(max)) * step(max)];
}

export function deZahl(value: number) {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(value);
}

export function formatRange(range: [number, number]) {
  const [min, max] = roundRange(range);
  return `${deZahl(min)} bis ${deZahl(max)} €`;
}
