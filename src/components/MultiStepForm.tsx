"use client";

import { useState } from "react";

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
import {
  Building2,
  HardHat,
  Hammer,
  RefreshCw,
  Gauge,
  Home,
  Layers,
  DoorOpen,
  TreePine,
  Building,
  Hotel,
  Plug,
  Monitor,
  Car,
  Zap,
  CalendarClock,
  CalendarCheck,
  CalendarRange,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Step data ── */

interface Tile {
  icon: LucideIcon;
  label: string;
  sub?: string;
}

interface Step {
  question: string;
  tiles: Tile[];
  multi?: boolean;
}

const STEPS: Step[] = [
  {
    question: "Um was für ein Projekt handelt es sich?",
    tiles: [
      { icon: Building2, label: "Neubau", sub: "Komplette Neuinstallation" },
      { icon: Hammer, label: "Altbausanierung", sub: "Alles neu machen" },
      {
        icon: RefreshCw,
        label: "Erweiterung / Umbau",
        sub: "z.\u00A0B. Dachausbau, neue Küche",
      },
      {
        icon: Gauge,
        label: "Zählerschrank / Technik",
        sub: "Modernisierung der Verteilung",
      },
    ],
  },
  {
    question: "Welchen Umfang haben die Elektroarbeiten?",
    tiles: [
      { icon: Home, label: "Ganzes Haus", sub: "Komplette Immobilie" },
      { icon: Layers, label: "Einzelne Etage", sub: "Etage / Wohnung" },
      {
        icon: DoorOpen,
        label: "Ein bis zwei Räume",
        sub: "z.\u00A0B. Bad oder Küche",
      },
      {
        icon: TreePine,
        label: "Außenbereich",
        sub: "Gartenlicht, Garage",
      },
    ],
  },
  {
    question: "Um welchen Gebäudetyp handelt es sich?",
    tiles: [
      { icon: Home, label: "Einfamilienhaus" },
      { icon: Building, label: "Doppel-/Reihenhaus" },
      { icon: Hotel, label: "Mehrfamilienhaus" },
      { icon: DoorOpen, label: "Wohnung" },
    ],
  },
  {
    question: "Gibt es spezielle Wünsche für die Ausstattung?",
    multi: true,
    tiles: [
      {
        icon: Plug,
        label: "Klassisch",
        sub: "Standard Licht & Steckdosen",
      },
      {
        icon: Monitor,
        label: "Netzwerktechnik",
        sub: "LAN-Dosen in jedem Raum",
      },
      {
        icon: Car,
        label: "E-Mobilität & PV",
        sub: "Vorbereitung für Wallbox / Photovoltaik",
      },
    ],
  },
  {
    question: "Wann soll das Projekt voraussichtlich starten?",
    tiles: [
      { icon: Zap, label: "So schnell wie möglich" },
      { icon: CalendarClock, label: "In 1 bis 3 Monaten" },
      { icon: CalendarRange, label: "In 3 bis 6 Monaten" },
      {
        icon: HelpCircle,
        label: "Noch unklar",
        sub: "Reine Planungsphase",
      },
    ],
  },
];

const TOTAL = STEPS.length + 1; // +1 for contact step

/* ── Component ── */

export default function MultiStepForm() {
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});
  const [contact, setContact] = useState({
    vorname: "",
    nachname: "",
    firma: "",
    plz: "",
    ort: "",
    strasse: "",
    email: "",
    telefon: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isContactStep = current === STEPS.length;
  const step = !isContactStep ? STEPS[current] : null;
  const selected = selections[current] ?? [];

  function toggleTile(label: string) {
    if (!step) return;
    if (step.multi) {
      setSelections((prev) => {
        const cur = prev[current] ?? [];
        return {
          ...prev,
          [current]: cur.includes(label)
            ? cur.filter((l) => l !== label)
            : [...cur, label],
        };
      });
    } else {
      setSelections((prev) => ({ ...prev, [current]: [label] }));
    }
  }

  function next() {
    if (current < TOTAL - 1) setCurrent((c) => c + 1);
  }
  function prev() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const auswahlen: Record<string, string> = {};
    STEPS.forEach((s, idx) => {
      const sel = selections[idx] ?? [];
      if (sel.length) auswahlen[`Frage_${idx + 1}: ${s.question}`] = sel.join(", ");
    });

    const payload = {
      Quelle: "Gebäudeenergie – Mehrstufiges Anfrageformular",
      Seite: typeof window !== "undefined" ? window.location.href : "",
      ...auswahlen,
      Vorname: contact.vorname,
      Nachname: contact.nachname,
      Firma: contact.firma,
      PLZ: contact.plz,
      Ort: contact.ort,
      Strasse: contact.strasse,
      Email: contact.email,
      Telefon: contact.telefon,
      Zeitstempel: new Date().toISOString(),
    };

    try {
      await fetch(MAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Lead-Versand fehlgeschlagen:", err);
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  const canAdvance = isContactStep
    ? contact.vorname && contact.nachname && contact.plz && contact.telefon
    : selected.length > 0;

  if (submitted) {
    return (
      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
            <CalendarCheck className="h-10 w-10 text-accent" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-ink">
            Vielen Dank für Ihre Anfrage!
          </h2>
          <p className="text-muted leading-relaxed">
            Wir haben Ihre Angaben erhalten und melden uns schnellstmöglich bei
            Ihnen. Unser Team freut sich darauf, Ihr Projekt gemeinsam mit Ihnen
            umzusetzen.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1000px]">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-ink md:text-4xl">
            Kostenfreie Erstberatung vereinbaren
          </h2>
          <p className="text-muted">
            In nur wenigen Schritten zu Ihrem individuellen Angebot.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between text-sm font-medium text-muted">
            <span>
              Schritt {current + 1} von {TOTAL}
            </span>
            <span>{Math.round(((current + 1) / TOTAL) * 100)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${((current + 1) / TOTAL) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="mb-8 text-center text-xl font-bold text-accent md:text-2xl">
          {isContactStep
            ? "Ihre Kontaktdaten"
            : step!.question}
        </h3>

        {/* Tile grid or contact form */}
        {!isContactStep && step ? (
          <div
            className={`mx-auto grid gap-4 ${
              step.tiles.length === 5
                ? "max-w-[900px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                : "max-w-[800px] grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {step.tiles.map((tile) => {
              const isSelected = selected.includes(tile.label);
              return (
                <button
                  key={tile.label}
                  onClick={() => toggleTile(tile.label)}
                  className={`group flex flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                    isSelected
                      ? "border-accent shadow-[0_0_0_1px_var(--color-accent)]"
                      : "border-transparent"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                      isSelected ? "bg-accent/10" : "bg-slate-100 group-hover:bg-accent/5"
                    }`}
                  >
                    <tile.icon
                      className={`h-7 w-7 transition-colors ${
                        isSelected ? "text-accent" : "text-slate-400 group-hover:text-accent"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <div
                      className={`text-sm font-bold leading-snug transition-colors ${
                        isSelected ? "text-accent" : "text-ink"
                      }`}
                    >
                      {tile.label}
                    </div>
                    {tile.sub && (
                      <div className="mt-1 text-xs leading-snug text-muted">
                        {tile.sub}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="mx-auto max-w-[600px] space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Vorname *
                </label>
                <input
                  type="text"
                  required
                  value={contact.vorname}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, vorname: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Max"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Nachname *
                </label>
                <input
                  type="text"
                  required
                  value={contact.nachname}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, nachname: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Mustermann"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  PLZ *
                </label>
                <input
                  type="text"
                  required
                  value={contact.plz}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, plz: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="26676"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Ort
                </label>
                <input
                  type="text"
                  value={contact.ort}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, ort: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Mindelheim"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Straße & Hausnummer
              </label>
              <input
                type="text"
                value={contact.strasse}
                onChange={(e) =>
                  setContact((c) => ({ ...c, strasse: e.target.value }))
                }
                className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Musterstraße 1"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Firma <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                type="text"
                value={contact.firma}
                onChange={(e) =>
                  setContact((c) => ({ ...c, firma: e.target.value }))
                }
                className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Mustermann GmbH"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, email: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="ihre@email.de"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  required
                  value={contact.telefon}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, telefon: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="+49 123 456789"
                />
              </div>
            </div>
          </form>
        )}

        {/* Multi-select hint */}
        {step?.multi && (
          <p className="mt-4 text-center text-sm text-muted">
            Mehrfachauswahl möglich
          </p>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={current === 0}
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition-all hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </button>

          {isContactStep ? (
            <button
              type="submit"
              form="contact-form"
              disabled={!canAdvance || submitting}
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)] disabled:pointer-events-none disabled:opacity-50"
            >
              {submitting ? "Wird gesendet..." : "Anfrage absenden"}
              <Send className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={next}
              disabled={!canAdvance}
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_20px_var(--color-accent-glow)] disabled:pointer-events-none disabled:opacity-50"
            >
              Weiter
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
