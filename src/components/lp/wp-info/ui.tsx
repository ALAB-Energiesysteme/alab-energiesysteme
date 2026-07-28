"use client";

import { ArrowRight, Phone } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   Design-Primitiven der Wärmepumpen-Informationsseite.

   Bewusst anderer Charakter als die übrige Website: flach statt
   Verlauf, Haarlinien statt Schatten, kleine Radien, nummerierte
   Abschnitte, tabellarische Ziffern. Ziel ist der Eindruck eines
   geprüften Fachberichts, nicht einer Marketingseite.
   ══════════════════════════════════════════════════════════════ */

export const PHONE = "+498261759717";
export const PHONE_DISPLAY = "08261 7597176";
export const STAND = "28. Juli 2026";

/* Serienfarben, validiert auf CVD-Trennung (ΔE 20.9 protan / 28.1 tritan) */
export const C_WP = "#2b6cb0";
export const C_GAS = "#c05621";

export const eur = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";

/* ─── Abschnittsrahmen ─── */

export function Block({
  id,
  children,
  tone = "white",
}: {
  id?: string;
  children: React.ReactNode;
  tone?: "white" | "tint" | "ink";
}) {
  const cls =
    tone === "tint"
      ? "bg-[#f5f7f9] border-t border-line"
      : tone === "ink"
        ? "bg-[#0f2533] text-white"
        : "bg-white border-t border-line";
  return (
    <section id={id} className={`scroll-mt-[112px] ${cls}`}>
      <div className="mx-auto max-w-[1120px] px-6 py-[68px] lg:px-8 lg:py-[88px]">
        {children}
      </div>
    </section>
  );
}

/* ─── Nummerierter Abschnittskopf ─── */

export function Head({
  nr,
  kicker,
  titel,
  intro,
  light = false,
}: {
  nr: string;
  kicker: string;
  titel: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <header className="mb-9">
      <div
        className={`flex items-center gap-3 border-b pb-3 ${
          light ? "border-white/20" : "border-line"
        }`}
      >
        <span
          className={`font-mono text-[0.78rem] font-bold tabular-nums tracking-[0.1em] ${
            light ? "text-[#7db4ea]" : "text-accent"
          }`}
        >
          {nr}
        </span>
        <span
          className={`text-[0.72rem] font-bold uppercase tracking-[0.2em] ${
            light ? "text-white/55" : "text-muted"
          }`}
        >
          {kicker}
        </span>
      </div>
      <h2
        className={`mt-5 max-w-[880px] text-[clamp(1.55rem,3vw,2.25rem)] font-bold leading-[1.18] tracking-[-0.012em] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {titel}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-[790px] text-[1rem] leading-[1.75] ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

/* ─── Hinweiskasten ─── */

export function Note({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warn";
}) {
  const warn = tone === "warn";
  return (
    <div
      className={`mt-8 border-l-[3px] py-4 pl-5 pr-4 ${
        warn
          ? "border-l-[#c05621] bg-[#fdf7f3]"
          : "border-l-accent bg-[#f1f5fa]"
      }`}
    >
      <p className="text-[0.93rem] leading-[1.7] text-ink/85">{children}</p>
    </div>
  );
}

/* ─── Kennzahl mit Haarlinien-Raster ─── */

export function Metric({
  wert,
  label,
  fuss,
  light = false,
}: {
  wert: string;
  label: string;
  fuss?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`border-t-2 pt-4 ${light ? "border-t-[#7db4ea]" : "border-t-accent"}`}
    >
      <div
        className={`text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-none tabular-nums tracking-[-0.02em] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {wert}
      </div>
      <div
        className={`mt-2.5 text-[0.88rem] font-semibold leading-snug ${
          light ? "text-white/85" : "text-ink/80"
        }`}
      >
        {label}
      </div>
      {fuss && (
        <div
          className={`mt-1 text-[0.75rem] leading-snug ${
            light ? "text-white/45" : "text-muted"
          }`}
        >
          {fuss}
        </div>
      )}
    </div>
  );
}

/* ─── Flache Karte ─── */

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-line bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Buttons ─── */

export function PrimaryCta({
  label,
  quelle,
  variant = "accent",
  className = "",
}: {
  label: string;
  quelle: string;
  variant?: "accent" | "light";
  className?: string;
}) {
  const styles =
    variant === "light"
      ? "bg-white text-[#0f2533] hover:bg-[#eaf1f8]"
      : "bg-accent text-white hover:bg-accent-deep";
  return (
    <button
      type="button"
      data-open-angebot={quelle}
      className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-[4px] px-6 py-3.5 text-[0.93rem] font-bold transition-colors ${styles} ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

export function PhoneCta({
  variant = "dark",
  label,
}: {
  variant?: "dark" | "light";
  label?: string;
}) {
  const styles =
    variant === "light"
      ? "border-white/35 text-white hover:border-white hover:bg-white/10"
      : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white";
  return (
    <a
      href={`tel:${PHONE}`}
      className={`inline-flex items-center justify-center gap-2 rounded-[4px] border px-6 py-3.5 text-[0.93rem] font-bold transition-colors ${styles}`}
    >
      <Phone className="h-4 w-4" />
      {label ?? PHONE_DISPLAY}
    </a>
  );
}

/* ─── Inline-CTA innerhalb eines Abschnitts ─── */

export function CtaBand({
  titel,
  text,
  buttonLabel,
  quelle,
}: {
  titel: string;
  text: string;
  buttonLabel: string;
  quelle: string;
}) {
  return (
    <div className="mt-10 flex flex-col items-start gap-6 border border-accent/25 bg-[#f1f5fa] px-6 py-6 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-[620px]">
        <p className="text-[1.05rem] font-bold leading-snug text-ink">
          {titel}
        </p>
        <p className="mt-1.5 text-[0.92rem] leading-[1.65] text-muted">{text}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
        <PrimaryCta label={buttonLabel} quelle={quelle} />
        <a
          href={`tel:${PHONE}`}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-2 text-[0.88rem] font-bold text-ink transition-colors hover:text-accent"
        >
          <Phone className="h-4 w-4" />
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
