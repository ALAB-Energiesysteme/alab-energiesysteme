"use client";

import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────
   DSGVO-konformer Cookie-Banner mit Google Consent Mode v2
   ────────────────────────────────────────────────────── */

const STORAGE_KEY = "alab-cookie-consent-v1";

type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
};

type GtagFn = (
  command: "consent",
  action: "default" | "update",
  params: Record<string, "granted" | "denied">,
) => void;

declare global {
  interface Window {
    dataLayer?: object[];
    gtag?: GtagFn;
  }
}

function readStored(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentChoice;
  } catch {
    return null;
  }
}

function applyConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  const dl = (window.dataLayer = window.dataLayer || []);
  // GTM/GA4 Consent Mode v2 – Update mit User-Entscheidung
  dl.push({
    event: "cookie_consent_update",
    consent: choice,
  } as object);

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: choice.marketing ? "granted" : "denied",
      ad_user_data: choice.marketing ? "granted" : "denied",
      ad_personalization: choice.marketing ? "granted" : "denied",
      analytics_storage: choice.analytics ? "granted" : "denied",
      personalization_storage: choice.preferences ? "granted" : "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [preferences, setPreferences] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (!stored) {
      // Banner nach kurzer Verzögerung zeigen (nicht sofort beim Laden – wirkt aufdringlich)
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
    // Bei Wiederbesuchen: bereits gespeicherte Zustimmung erneut an GTM senden
    applyConsent(stored);
    setAnalytics(stored.analytics);
    setMarketing(stored.marketing);
    setPreferences(stored.preferences);
  }, []);

  // Auch via Footer-Link wieder öffenbar
  useEffect(() => {
    const handler = () => {
      const stored = readStored();
      if (stored) {
        setAnalytics(stored.analytics);
        setMarketing(stored.marketing);
        setPreferences(stored.preferences);
      }
      setShowSettings(true);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);

  function save(choice: ConsentChoice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    } catch {
      /* localStorage gesperrt – Consent bleibt nur für diese Session */
    }
    applyConsent(choice);
    setOpen(false);
    setShowSettings(false);
  }

  function acceptAll() {
    save({
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    });
  }

  function rejectAll() {
    save({
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    });
  }

  function saveCustom() {
    save({
      analytics,
      marketing,
      preferences,
      timestamp: new Date().toISOString(),
    });
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop nur bei Detail-Einstellungen */}
      {showSettings && (
        <div
          aria-hidden
          className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        className={`fixed z-[9999] ${
          showSettings
            ? "left-1/2 top-1/2 max-h-[88vh] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto"
            : "bottom-4 left-1/2 w-[min(92vw,720px)] -translate-x-1/2 sm:bottom-6"
        } rounded-[20px] border border-line bg-white p-6 shadow-[0_24px_60px_-12px_rgba(15,37,51,0.25)] sm:p-7`}
      >
        {!showSettings ? (
          <>
            <h2
              id="cookie-title"
              className="mb-2 text-[1.1rem] font-bold text-ink"
            >
              🍪 Wir respektieren Ihre Privatsphäre
            </h2>
            <p className="mb-5 text-[0.92rem] leading-relaxed text-muted">
              Wir nutzen Cookies und ähnliche Technologien, um diese Website
              bestmöglich an Ihre Bedürfnisse anzupassen sowie unsere Inhalte zu
              verbessern. Nicht-essenzielle Cookies werden nur mit Ihrer
              Zustimmung gesetzt. Mehr Details in unserer{" "}
              <a
                href="/datenschutz"
                className="font-semibold text-accent underline underline-offset-2 hover:text-accent-deep"
              >
                Datenschutzerklärung
              </a>
              .
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-ink transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
              >
                Einstellungen
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-ink transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-accent px-6 py-2.5 text-[0.88rem] font-bold text-white shadow-[0_4px_14px_rgba(43,108,176,0.35)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                Alle akzeptieren
              </button>
            </div>
          </>
        ) : (
          <>
            <h2
              id="cookie-title"
              className="mb-2 text-[1.1rem] font-bold text-ink"
            >
              Cookie-Einstellungen
            </h2>
            <p className="mb-5 text-[0.9rem] leading-relaxed text-muted">
              Wählen Sie selbst, welche Kategorien Sie zulassen möchten. Die
              technisch notwendigen Cookies sind für den Betrieb der Seite
              unverzichtbar.
            </p>

            <div className="mb-5 space-y-3">
              <ConsentRow
                title="Notwendig"
                description="Diese Cookies werden für den sicheren Betrieb der Seite (z. B. Formulare, Spam-Schutz) benötigt und sind nicht deaktivierbar."
                checked
                disabled
                onChange={() => {}}
              />
              <ConsentRow
                title="Funktionalität"
                description="Speichert Komfort-Einstellungen wie Sprache oder Anzeigepräferenzen."
                checked={preferences}
                onChange={setPreferences}
              />
              <ConsentRow
                title="Statistik / Analyse"
                description="Anonyme Nutzungsdaten via Google Analytics, damit wir die Seite verbessern können."
                checked={analytics}
                onChange={setAnalytics}
              />
              <ConsentRow
                title="Marketing"
                description="Cookies für gezielte Werbung und Erfolgsmessung von Kampagnen (z. B. Google Ads)."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-ink transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={saveCustom}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-ink transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
              >
                Auswahl speichern
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-accent px-6 py-2.5 text-[0.88rem] font-bold text-white shadow-[0_4px_14px_rgba(43,108,176,0.35)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                Alle akzeptieren
              </button>
            </div>

            <p className="mt-5 text-[0.78rem] text-muted">
              Sie können Ihre Einstellungen jederzeit über den Link
              „Cookie-Einstellungen" im Footer ändern. Details:{" "}
              <a
                href="/datenschutz"
                className="text-accent underline underline-offset-2 hover:text-accent-deep"
              >
                Datenschutzerklärung
              </a>
              .
            </p>
          </>
        )}
      </div>
    </>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
        disabled
          ? "border-line bg-line/30"
          : checked
          ? "border-accent/40 bg-accent/5"
          : "border-line bg-white hover:border-accent/30"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-accent"
      />
      <div>
        <div className="text-[0.92rem] font-semibold text-ink">{title}</div>
        <div className="text-[0.82rem] leading-relaxed text-muted">
          {description}
        </div>
      </div>
    </label>
  );
}
