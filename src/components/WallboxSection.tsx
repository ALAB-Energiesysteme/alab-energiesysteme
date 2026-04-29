"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function WallboxSection() {
  return (
    <>
      <WBHero />
      <WBServices />
      <WBFestpreis />
      <WBSchritte />
      <WBCheckLohnt />
      <WBFormular />
      <WBFaq />
    </>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 1 – Hero Slider
   ═══════════════════════════════════════════════ */
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80",
    alt: "Elektroauto laden",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    alt: "E-Mobilität Zuhause",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    alt: "Eigenheim mit Ladestation",
  },
];

function WBHero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1.2s] ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] tracking-tight">
          Wallboxen für Zuhause
        </h1>
        <p className="max-w-[600px] text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/85">
          Laden Sie Ihr Elektrofahrzeug bequem und sicher zu Hause – mit unserer professionellen Wallbox-Installation.
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Service Cards (overlapping hero)
   ═══════════════════════════════════════════════ */
const SERVICES = [
  {
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Wallbox-Installation",
    text: "Fachgerechte Montage und Inbetriebnahme Ihrer Ladestation durch unsere zertifizierten Elektriker.",
  },
  {
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Vor-Ort-Check",
    text: "Professionelle Prüfung der Gegebenheiten bei Ihnen zu Hause für ein individuelles Festpreisangebot.",
  },
  {
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M22 10H2M7 15h4" />
      </svg>
    ),
    title: "Förderberatung",
    text: "Wir beraten Sie zu allen verfügbaren Fördermöglichkeiten und helfen bei der Antragstellung.",
  },
];

function WBServices() {
  return (
    <section className="relative z-20 -mt-[120px] px-7 pb-16">
      <div className="mx-auto grid max-w-[1320px] grid-cols-3 gap-6 max-[900px]:grid-cols-1">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="rounded-[var(--radius-card,16px)] bg-white p-8 shadow-[0_8px_30px_rgba(15,37,51,0.10)] transition-transform hover:-translate-y-1"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4f6f8] text-[#2b6cb0]">
              {s.icon}
            </div>
            <h3 className="mb-2 text-lg font-bold text-[#0f2533]">{s.title}</h3>
            <p className="text-[0.9rem] leading-relaxed text-[#5b6b78]">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 – Wallbox zum Festpreis
   ═══════════════════════════════════════════════ */
function WBFestpreis() {
  return (
    <section className="py-[100px]">
      <div className="mx-auto max-w-[1320px] px-7">
        <div className="overflow-hidden rounded-[24px] bg-[#e8f0fe]">
          <div className="grid grid-cols-[1fr_1.4fr] items-center max-[900px]:grid-cols-1">
            {/* Wallbox Image */}
            <div className="flex items-center justify-center p-12 max-[900px]:p-8">
              <div className="relative">
                <img
                  src="/wallbox-bild.png"
                  alt="go-e Wallbox"
                  className="h-[350px] w-auto object-contain max-[900px]:h-[250px]"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-14 max-[900px]:p-8 max-[900px]:pt-0">
              <h2 className="mb-8 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-[#0f2533]">
                Wallbox zum Festpreis
              </h2>

              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-[#2b6cb0]" />
                  <p className="text-[1rem] leading-[1.7] text-[#0f2533]">
                    Entscheide dich bereits heute unverbindlich für unsere hochwertige Wallbox
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-[#2b6cb0]" />
                  <p className="text-[1rem] leading-[1.7] text-[#0f2533]">
                    Festes Angebot mit transparenter Preisstruktur nach individueller Vor-Ort-Prüfung
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-[#2b6cb0]" />
                  <p className="text-[1rem] leading-[1.7] text-[#0f2533]">
                    Sonderkonditionen für Bestandskunden von ALAB Energiesysteme
                  </p>
                </li>
              </ul>

              <a
                href="#angebot"
                data-open-angebot="wallbox-details-ansehen"
                className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-[#0d7377] px-8 py-4 text-[0.95rem] font-bold text-white shadow-[0_4px_15px_rgba(13,115,119,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(13,115,119,0.4)]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                Wallbox Details ansehen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – In 3 Schritten zur Wallbox
   ═══════════════════════════════════════════════ */
function WBSchritte() {
  return (
    <section className="py-[100px] bg-white">
      <div className="mx-auto max-w-[1320px] px-7 text-center">
        <h2 className="mb-4 text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#0f2533]">
          In 3 Schritten zur Wallbox<br />für dein Zuhause
        </h2>
        <p className="mx-auto mb-16 max-w-[700px] text-[1.05rem] leading-[1.7] text-[#5b6b78]">
          Mit unserem ALAB Vor-Ort-Installationscheck erhältst du ein Angebot für deine Wallbox mit Installation – auf Basis einer fachgerechten Prüfung der individuellen Voraussetzungen vor Ort bei dir zu Hause.
        </p>

        {/* Steps */}
        <div className="relative grid grid-cols-3 gap-8 max-[768px]:grid-cols-1 max-[768px]:gap-12">
          {/* Connecting line */}
          <div className="absolute top-[60px] left-[20%] right-[20%] h-[3px] bg-gradient-to-r from-[#4ade80] via-[#facc15] to-[#4ade80] max-[768px]:hidden" />

          {/* Step 1 */}
          <div className="relative flex flex-col items-center">
            <div className="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#f0fdf4] shadow-[0_4px_20px_rgba(74,222,128,0.15)]">
              <img src="/27-Agreement.gif" alt="Installationscheck" className="h-16 w-16 object-contain" />
            </div>
            <p className="mb-2 text-[1.1rem] font-bold text-[#22c55e]">1. Schritt</p>
            <h3 className="mb-3 text-[1.15rem] font-bold text-[#0f2533]">Vor-Ort-Installationscheck</h3>
            <p className="max-w-[320px] text-[0.92rem] leading-[1.65] text-[#5b6b78]">
              Fachgerechte Prüfung der Situation vor Ort durch unsere eigenen Elektrofachkräfte. So erhältst du eine kompetente Einschätzung deiner individuellen Voraussetzungen.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center">
            <div className="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#f0fdf4] shadow-[0_4px_20px_rgba(74,222,128,0.15)]">
              <img src="/Icon-Haus-Auto-laden.gif" alt="Festpreisangebot" className="h-16 w-16 object-contain" />
            </div>
            <p className="mb-2 text-[1.1rem] font-bold text-[#22c55e]">2. Schritt</p>
            <h3 className="mb-3 text-[1.15rem] font-bold text-[#0f2533]">Festpreisangebot</h3>
            <p className="max-w-[320px] text-[0.92rem] leading-[1.65] text-[#5b6b78]">
              Festpreisangebot für die Wallbox mit Installation bei dir zu Hause – bei Annahme innerhalb von zwei Wochen werden die Kosten aus Schritt 1 angerechnet.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center">
            <div className="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#fefce8] shadow-[0_4px_20px_rgba(250,204,21,0.15)]">
              <img src="/11-Construction-Worker.gif" alt="Installation" className="h-16 w-16 object-contain" />
            </div>
            <p className="mb-2 text-[1.1rem] font-bold text-[#22c55e]">3. Schritt</p>
            <h3 className="mb-3 text-[1.15rem] font-bold text-[#0f2533]">Installation und Inbetriebnahme</h3>
            <p className="max-w-[320px] text-[0.92rem] leading-[1.65] text-[#5b6b78]">
              Installation der Wallbox mit anschließender Einweisung – durchgeführt von unseren eigenen Fachkräften.
            </p>
          </div>
        </div>

        <a
          href="#angebot"
          data-open-angebot="wallbox-vor-ort-check"
          className="mt-14 inline-flex items-center gap-2.5 rounded-full bg-[#f5c518] px-8 py-4 text-[0.95rem] font-bold text-[#0f2533] shadow-[0_4px_12px_rgba(245,197,24,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(245,197,24,0.4)]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          ALAB Vor-Ort-Check beauftragen
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6 – Der Check, der sich lohnt
   ═══════════════════════════════════════════════ */
function WBCheckLohnt() {
  return (
    <section className="py-[100px]">
      <div className="mx-auto max-w-[1320px] px-7">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#0f2533]">
            Der Check, der sich lohnt
          </h2>
          <p className="mx-auto max-w-[700px] text-[1.05rem] leading-[1.7] text-[#5b6b78]">
            Mit dem ALAB Vor-Ort-Installationscheck macht dir ALAB Energiesysteme den Weg zur Wallbox einfach und preislich transparent.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 max-[900px]:grid-cols-1">
          {/* Card 1 – Dark */}
          <div className="overflow-hidden rounded-[24px] bg-[#0f2533] p-10 text-white shadow-[0_10px_40px_rgba(15,37,51,0.2)]">
            <div className="mb-8 flex items-center justify-center">
              <div className="flex h-[220px] w-[220px] items-center justify-center rounded-full bg-white/10">
                <svg className="h-24 w-24 text-[#6bb8ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M9 15l2 2 4-4" />
                </svg>
              </div>
            </div>
            <h3 className="mb-4 text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold">
              Endlich Klarheit vor dem Wallbox-Einbau
            </h3>
            <p className="text-[0.95rem] leading-[1.7] text-white/75">
              Die Installation einer Wallbox kann mit hohen Kosten verbunden sein – je nach den Gegebenheiten vor Ort. Nach dem ALAB Vor-Ort-Installationscheck erhältst du ein Festpreisangebot für die Wallbox mit Installation. Somit hast du Klarheit über die Kosten, die auf dich zukommen.
            </p>
          </div>

          {/* Card 2 – Light */}
          <div className="overflow-hidden rounded-[24px] border border-gray-200 bg-white p-10 shadow-[0_10px_40px_rgba(15,37,51,0.08)]"
            style={{
              backgroundImage: "radial-gradient(circle at bottom right, #d1fae5 0%, transparent 50%)",
            }}
          >
            <div className="mb-8 flex items-center justify-center">
              <img
                src="/tesla-wallbox.avif"
                alt="Tesla Wallbox"
                className="h-[220px] w-auto object-contain"
              />
            </div>
            <h3 className="mb-4 text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold text-[#0f2533]">
              Sonderkonditionen für Kunden von ALAB Energiesysteme
            </h3>
            <p className="mb-3 text-[0.95rem] leading-[1.7] text-[#5b6b78]">
              Als besonderes Extra für unsere Bestandskunden erhältst du attraktive Sonderkonditionen auf unsere hochwertigen Wallboxen.
            </p>
            <p className="text-[0.92rem] leading-[1.7] text-[#5b6b78]">
              Übrigens: Auch wer jetzt mit ALAB Energiesysteme startet, profitiert von unseren Vorzugskonditionen für die Wallbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 8 – ALAB Vor-Ort-Installationscheck Formular
   ═══════════════════════════════════════════════ */
function WBFormular() {
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    strasse: "",
    adresszusatz: "",
    plz: "",
    ort: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-[100px]">
      <div className="mx-auto max-w-[1320px] px-7">
        <div className="mx-auto max-w-[800px]">
          {/* Card */}
          <div className="rounded-[24px] bg-white p-10 shadow-[0_10px_50px_rgba(15,37,51,0.08)] max-[600px]:p-6">
            <h2 className="mb-3 text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-[#0f2533]">
              ALAB Vor-Ort-Installationscheck
            </h2>

            {/* Progress bar */}
            <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[25%] rounded-full bg-[#f5c518]" />
            </div>

            {/* Info box */}
            <div className="mb-8 rounded-[12px] bg-[#fef9e7] px-6 py-5">
              <p className="text-[0.9rem] leading-[1.7] text-[#0f2533]">
                <strong>Wichtig zu wissen:</strong> Mit dieser Bestellung erwirbst du zunächst nur den Vor-Ort-Installationscheck, nicht die Wallbox. Nach dem Check erhältst du ein Festpreisangebot für deine Wallbox und die Installation. Wird das Angebot durch dich innerhalb von 4 Wochen angenommen, wird der ALAB Vor-Ort-Installationscheck komplett angerechnet.
              </p>
            </div>

            {/* Form */}
            <h3 className="mb-6 text-[1.1rem] font-bold text-[#0f2533]">
              Installationsadresse der Wallbox
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 max-[600px]:grid-cols-1">
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-medium text-[#0f2533]">
                  Vorname: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vorname"
                  value={form.vorname}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[8px] border border-gray-300 px-4 py-3 text-[0.95rem] text-[#0f2533] outline-none transition-colors focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#2b6cb0]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-medium text-[#0f2533]">
                  Nachname: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nachname"
                  value={form.nachname}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[8px] border border-gray-300 px-4 py-3 text-[0.95rem] text-[#0f2533] outline-none transition-colors focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#2b6cb0]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-medium text-[#0f2533]">
                  Straße und Hausnummer: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="strasse"
                  value={form.strasse}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[8px] border border-gray-300 px-4 py-3 text-[0.95rem] text-[#0f2533] outline-none transition-colors focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#2b6cb0]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-medium text-[#0f2533]">
                  Adresszusatz:
                </label>
                <input
                  type="text"
                  name="adresszusatz"
                  value={form.adresszusatz}
                  onChange={handleChange}
                  className="w-full rounded-[8px] border border-gray-300 px-4 py-3 text-[0.95rem] text-[#0f2533] outline-none transition-colors focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#2b6cb0]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-medium text-[#0f2533]">
                  Postleitzahl: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="plz"
                  value={form.plz}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  className="w-full rounded-[8px] border border-gray-300 px-4 py-3 text-[0.95rem] text-[#0f2533] outline-none transition-colors focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#2b6cb0]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-medium text-[#0f2533]">
                  Ort: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ort"
                  value={form.ort}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[8px] border border-gray-300 px-4 py-3 text-[0.95rem] text-[#0f2533] outline-none transition-colors focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#2b6cb0]/20"
                />
              </div>
            </div>

            <p className="mt-4 text-[0.8rem] text-red-500">* Pflichtfeld</p>

            <div className="mt-8 text-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0f2533] px-8 py-3.5 text-[0.95rem] font-bold text-[#0f2533] transition-all hover:bg-[#0f2533] hover:text-white"
              >
                Nächster Schritt
              </button>
            </div>
          </div>
        </div>

        {/* Image below form */}
        <div className="mx-auto mt-[-40px] max-w-[900px] overflow-hidden rounded-[20px]">
          <img
            src="/wallbox-bild-unten.png"
            alt="Wallbox Installation"
            className="h-[450px] w-full object-cover max-[768px]:h-[300px]"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 9 – FAQ Accordion
   ═══════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    question: "Was ist eine Wallbox?",
    answer: (
      <p>Eine Wallbox ist eine Ladestation für Elektrofahrzeuge, die an der Wand montiert wird. Sie ermöglicht das sichere und schnelle Laden zu Hause – deutlich schneller als über eine herkömmliche Haushaltssteckdose. Eine Wallbox kommuniziert mit dem Fahrzeug und passt die Ladeleistung optimal an.</p>
    ),
  },
  {
    question: "Warum sollte ich eine Wallbox installieren lassen?",
    answer: (
      <p>Das Laden über eine normale Steckdose ist langsam und kann bei dauerhafter Nutzung ein Sicherheitsrisiko darstellen. Eine Wallbox bietet bis zu 5x schnelleres Laden, ist auf Dauerbelastung ausgelegt und verfügt über integrierte Schutzfunktionen. Zudem wird die Installation durch einen Fachbetrieb sichergestellt.</p>
    ),
  },
  {
    question: "Wie lange dauert die Installation einer Wallbox?",
    answer: (
      <p>Die eigentliche Montage dauert in der Regel zwischen 2 und 4 Stunden. Bei aufwändigeren Elektroinstallationen, etwa wenn ein neuer Stromkreis gelegt werden muss, kann es etwas länger dauern. Unser Vor-Ort-Check klärt vorab, welcher Aufwand bei dir zu erwarten ist.</p>
    ),
  },
  {
    question: "Was kostet die Installation einer Wallbox?",
    answer: (
      <p>Die Kosten variieren je nach den örtlichen Gegebenheiten. Mit unserem Vor-Ort-Installationscheck erhältst du ein verbindliches Festpreisangebot – transparent und ohne versteckte Kosten. Die Kosten der Vor-Ort-Prüfung werden bei Beauftragung der Installation vollständig angerechnet. Bestandskunden von ALAB Energiesysteme erhalten zusätzlich Sonderkonditionen auf die Wallbox.</p>
    ),
  },
  {
    question: "Gibt es Förderungen für Wallboxen?",
    answer: (
      <p>Es gibt verschiedene Förderprogramme auf Bundes- und Landesebene für private Ladeinfrastruktur. Die Verfügbarkeit und Höhe der Förderung kann variieren. Wir beraten dich gerne zu den aktuellen Fördermöglichkeiten und unterstützen dich bei der Antragstellung.</p>
    ),
  },
  {
    question: "Welche Wallbox ist die richtige für mich?",
    answer: (
      <p>Die optimale Wallbox hängt von verschiedenen Faktoren ab: deinem Fahrzeugtyp, der gewünschten Ladeleistung und den elektrischen Voraussetzungen vor Ort. Im Rahmen unseres Vor-Ort-Checks beraten wir dich individuell und empfehlen die passende Lösung für deine Anforderungen.</p>
    ),
  },
];

function WBFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[100px] bg-white">
      <div className="mx-auto max-w-[900px] px-7">
        <h2 className="mb-14 text-center text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#0f2533]">
          Du hast noch Fragen?
        </h2>

        <div className="flex flex-col">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-7 text-left"
                >
                  <span className="pr-4 text-[clamp(1rem,2vw,1.2rem)] font-semibold text-[#0f2533]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#5b6b78] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-[0.95rem] leading-[1.75] text-[#5b6b78]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
