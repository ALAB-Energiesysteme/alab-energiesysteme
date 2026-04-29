"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Globales Kontakt-/Angebots-Lightbox.
 *
 * Öffnen per:
 *  a) Klick auf beliebiges Element mit Attribut  data-open-angebot="quelle-name"
 *  b) window.dispatchEvent(new CustomEvent('open-angebot-lightbox', { detail: { quelle: 'xyz' } }))
 *
 * Sendet die Formulardaten an den Make.com-Webhook. Das Feld `quelle` enthält die Seite/den Abschnitt,
 * von dem aus der Klick kam, so dass die Quelle in Make.com nachvollziehbar ist.
 */

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
const PRIVACY_URL = "/datenschutz";
const QUEUE_KEY = "alabLeadQueueGlobal";

export default function AngebotLightbox() {
  const [open, setOpen] = useState(false);
  const [quelle, setQuelle] = useState<string>("website");
  const [sending, setSending] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  /* ── Event-Binding ── */
  useEffect(() => {
    const openWith = (q: string) => {
      setQuelle(q || "website");
      setOpen(true);
    };

    const onClickDoc = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-open-angebot]"
      ) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      const q =
        el.getAttribute("data-open-angebot") ||
        document.title ||
        window.location.pathname ||
        "website";
      openWith(q);
    };

    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      openWith(detail.quelle || "website");
    };

    document.addEventListener("click", onClickDoc);
    window.addEventListener("open-angebot-lightbox", onCustom as EventListener);
    return () => {
      document.removeEventListener("click", onClickDoc);
      window.removeEventListener(
        "open-angebot-lightbox",
        onCustom as EventListener
      );
    };
  }, []);

  /* ── ESC schließen + Scroll-Lock ── */
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* ── Offline-Queue ── */
  const getQueue = (): Record<string, unknown>[] => {
    try {
      return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const setQueue = (arr: Record<string, unknown>[]) => {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(arr));
    } catch {}
  };
  const enqueue = (p: Record<string, unknown>) => {
    const q = getQueue();
    q.push(p);
    setQueue(q);
  };

  async function postWithTimeout(body: Record<string, unknown>, ms = 6000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try {
      const res = await fetch(MAKE_URL, {
        method: "POST",
        mode: "cors",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
    } finally {
      clearTimeout(t);
    }
  }

  async function sendWithRetry(body: Record<string, unknown>, attempts = 2) {
    let last: unknown = null;
    for (let i = 0; i < attempts; i++) {
      try {
        await postWithTimeout(body);
        return;
      } catch (err) {
        last = err;
      }
    }
    throw last;
  }

  /* ── Submit ── */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(fd);
    // Honeypot-Check
    if (data.hp_website) {
      setOpen(false);
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 4000);
      return;
    }
    data._ts = new Date().toISOString();
    data.quelle = quelle;
    data.seite_url =
      typeof window !== "undefined" ? window.location.pathname : "";

    setSending(true);
    try {
      if (!navigator.onLine) {
        enqueue(data);
      } else {
        await sendWithRetry(data);
      }
      form.reset();
      setOpen(false);
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 4000);
    } catch {
      enqueue(data);
      setOpen(false);
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 4000);
    } finally {
      setSending(false);
    }
  }

  /* ── Flush Offline-Queue bei Rückkehr online ── */
  useEffect(() => {
    const flush = async () => {
      const q = getQueue();
      if (!q.length || !navigator.onLine) return;
      const remaining: Record<string, unknown>[] = [];
      for (const item of q) {
        try {
          await sendWithRetry(item);
        } catch {
          remaining.push(item);
        }
      }
      setQueue(remaining);
    };
    window.addEventListener("online", flush);
    return () => window.removeEventListener("online", flush);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
#alabAngebotLB {
  --lb-primary: #2b6cb0;
  --lb-primary-deep: #1e4f8b;
  --lb-ink: #0f2533;
  --lb-muted: #5b6b78;
  --lb-muted-2: #7b8794;
  --lb-bg: #ffffff;
  --lb-bg-soft: #f7f8fa;
  --lb-border: #e2e8f0;
  --lb-border-strong: #cbd5e1;
  --lb-radius-md: 12px;
  --lb-radius-lg: 16px;
  --lb-radius-xl: 24px;

  position: fixed; inset: 0;
  background: rgba(15, 37, 51, 0.55);
  backdrop-filter: blur(4px);
  z-index: 9999;
  padding: 12px;
  overflow-y: auto;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
  animation: alabLbFade .2s ease-out;
}
#alabAngebotLB .alab-lb-card {
  background: var(--lb-bg);
  border: 1px solid var(--lb-border);
  border-radius: var(--lb-radius-xl);
  width: 100%; max-width: 560px;
  box-shadow: 0 20px 60px rgba(15, 37, 51, .22), 0 6px 18px rgba(15, 37, 51, .08);
  animation: alabLbSlide .28s cubic-bezier(.16,1,.3,1);
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
  max-height: calc(100vh - 24px);
  overflow-y: auto;
}
#alabAngebotLB .alab-lb-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 18px; border-bottom: 1px solid var(--lb-border);
}
#alabAngebotLB .alab-lb-title {
  display: flex; align-items: center; gap: 10px;
  margin: 0; font-size: 17px; font-weight: 700; color: var(--lb-ink);
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
}
#alabAngebotLB .alab-lb-title svg { width: 22px; height: 22px; color: var(--lb-primary); flex-shrink: 0; }
#alabAngebotLB .alab-lb-close {
  background: var(--lb-bg-soft); border: 1px solid var(--lb-border);
  width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
  display: grid; place-items: center; transition: transform .12s ease, background .12s ease;
}
#alabAngebotLB .alab-lb-close:hover { transform: scale(1.05); background: var(--lb-border); }
#alabAngebotLB .alab-lb-close svg { width: 16px; height: 16px; color: var(--lb-muted); }
#alabAngebotLB .alab-lb-body { padding: 14px 18px 18px; }
#alabAngebotLB .alab-lb-desc {
  margin: 0 0 14px; color: var(--lb-muted); font-size: 13px; line-height: 1.5;
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
}
#alabAngebotLB form { display: flex; flex-direction: column; gap: 10px; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); }
#alabAngebotLB .alab-lb-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
#alabAngebotLB .alab-lb-row.street { grid-template-columns: 2fr 1fr; }
#alabAngebotLB .alab-lb-row.city { grid-template-columns: 1fr 2fr; }
#alabAngebotLB .alab-lb-field { display: flex; flex-direction: column; gap: 4px; }
#alabAngebotLB .alab-lb-field label {
  font-weight: 600; font-size: 12px; color: var(--lb-ink); padding-left: 2px;
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
}
#alabAngebotLB .alab-lb-field input,
#alabAngebotLB .alab-lb-field textarea {
  padding: 10px 12px; border: 1.5px solid var(--lb-border); border-radius: var(--lb-radius-md);
  background: var(--lb-bg-soft); font-size: 14px; color: var(--lb-ink); font-family: inherit;
  transition: border-color .15s ease, box-shadow .15s ease;
}
#alabAngebotLB .alab-lb-field input::placeholder,
#alabAngebotLB .alab-lb-field textarea::placeholder { color: var(--lb-muted-2); }
#alabAngebotLB .alab-lb-field input:hover,
#alabAngebotLB .alab-lb-field textarea:hover { border-color: var(--lb-border-strong); }
#alabAngebotLB .alab-lb-field input:focus,
#alabAngebotLB .alab-lb-field textarea:focus {
  outline: none; border-color: var(--lb-primary);
  box-shadow: 0 0 0 3px rgba(43,108,176,.15);
}
#alabAngebotLB .alab-lb-field textarea { resize: vertical; min-height: 64px; }
#alabAngebotLB .alab-lb-consent {
  display: flex; gap: 8px; align-items: flex-start; font-size: 12px; color: var(--lb-ink); line-height: 1.45;
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
}
#alabAngebotLB .alab-lb-consent a {
  color: var(--lb-primary); text-decoration: underline; font-weight: 700;
}
#alabAngebotLB .alab-lb-consent a:hover { text-decoration: none; }
#alabAngebotLB .alab-lb-submit {
  background: var(--lb-primary); color: #fff; border: none; padding: 11px 20px;
  border-radius: var(--lb-radius-lg); font-weight: 700; font-size: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
  margin-top: 2px; box-shadow: 0 4px 12px rgba(43,108,176,.25);
  transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
}
#alabAngebotLB .alab-lb-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  background: var(--lb-primary-deep);
  box-shadow: 0 6px 20px rgba(43,108,176,.35);
}
#alabAngebotLB .alab-lb-submit:disabled { opacity: .7; cursor: not-allowed; }
#alabAngebotLB .alab-lb-submit svg { width: 20px; height: 20px; }
#alabAngebotLB .alab-lb-hp {
  position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;
}

/* Danke-Toast */
#alabAngebotThanks {
  position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%);
  background: #fff; color: var(--lb-ink, #0f2533); border: 1px solid #e2e8f0;
  border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,.12);
  padding: 12px 14px; display: flex; align-items: center; gap: 10px;
  z-index: 10000; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
  animation: alabThanksIn .22s ease-out;
}
#alabAngebotThanks .chk {
  width: 18px; height: 18px; border-radius: 50%;
  background: #2b6cb0; display: inline-grid; place-items: center; color: #fff;
}
#alabAngebotThanks .chk svg { width: 12px; height: 12px; }

@keyframes alabLbFade { from { opacity: 0 } to { opacity: 1 } }
@keyframes alabLbSlide { from { transform: translateY(10px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes alabThanksIn { from { transform: translateX(-50%) translateY(20px); opacity: 0 } to { transform: translateX(-50%) translateY(0); opacity: 1 } }

@media (max-width: 640px) {
  #alabAngebotLB { padding: 6px; align-items: flex-start; }
  #alabAngebotLB .alab-lb-card { border-radius: 14px; max-height: calc(100vh - 12px); margin-top: 4px; }
  #alabAngebotLB .alab-lb-header { padding: 10px 14px; }
  #alabAngebotLB .alab-lb-title { font-size: 15px; gap: 8px; }
  #alabAngebotLB .alab-lb-title svg { width: 18px; height: 18px; }
  #alabAngebotLB .alab-lb-close { width: 28px; height: 28px; }
  #alabAngebotLB .alab-lb-body { padding: 10px 14px 14px; }
  #alabAngebotLB .alab-lb-desc { font-size: 12px; margin-bottom: 10px; line-height: 1.4; }
  #alabAngebotLB form { gap: 8px; }
  /* Mobile: 2-Spalten-Grid für kurze Felder beibehalten, damit das Formular ohne Scrollen passt */
  #alabAngebotLB .alab-lb-row { gap: 8px; }
  #alabAngebotLB .alab-lb-field label { font-size: 11px; }
  #alabAngebotLB .alab-lb-field input,
  #alabAngebotLB .alab-lb-field textarea { padding: 8px 10px; font-size: 13px; }
  #alabAngebotLB .alab-lb-field textarea { min-height: 48px; }
  #alabAngebotLB .alab-lb-consent { font-size: 11px; }
  #alabAngebotLB .alab-lb-submit { padding: 9px 14px; font-size: 13px; }
}
        `,
        }}
      />

      {open && (
        <div
          id="alabAngebotLB"
          role="dialog"
          aria-modal="true"
          aria-labelledby="alab-lb-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="alab-lb-card">
            <div className="alab-lb-header">
              <h2 className="alab-lb-title" id="alab-lb-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Kostenloses Angebot anfordern
              </h2>
              <button
                type="button"
                className="alab-lb-close"
                onClick={() => setOpen(false)}
                aria-label="Schließen"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="alab-lb-body">
              <p className="alab-lb-desc">
                Füllen Sie das Formular aus und wir erstellen Ihnen ein individuelles Angebot.
                Kostenlos und unverbindlich.
              </p>
              <form ref={formRef} onSubmit={onSubmit} autoComplete="on" noValidate={false}>
                <input type="hidden" name="quelle_input" value={quelle} readOnly />
                <input
                  type="text"
                  name="hp_website"
                  className="alab-lb-hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="alab-lb-row">
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-vorname">Vorname *</label>
                    <input
                      type="text"
                      id="alab-lb-vorname"
                      name="vorname"
                      required
                      placeholder="Max"
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-nachname">Nachname *</label>
                    <input
                      type="text"
                      id="alab-lb-nachname"
                      name="nachname"
                      required
                      placeholder="Mustermann"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="alab-lb-row">
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-email">E-Mail</label>
                    <input
                      type="email"
                      id="alab-lb-email"
                      name="email"
                      placeholder="max@beispiel.de"
                      autoComplete="email"
                    />
                  </div>
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-telefon">Telefon *</label>
                    <input
                      type="tel"
                      id="alab-lb-telefon"
                      name="telefon"
                      required
                      placeholder="+49 123 456789"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="alab-lb-row">
                  <div className="alab-lb-field" style={{ width: "100%" }}>
                    <label htmlFor="alab-lb-firma">Firma (optional)</label>
                    <input
                      type="text"
                      id="alab-lb-firma"
                      name="firma"
                      placeholder="Mustermann GmbH"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="alab-lb-row street">
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-strasse">Straße *</label>
                    <input
                      type="text"
                      id="alab-lb-strasse"
                      name="strasse"
                      required
                      placeholder="Musterstraße"
                      autoComplete="address-line1"
                    />
                  </div>
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-hausnummer">Hausnummer *</label>
                    <input
                      type="text"
                      id="alab-lb-hausnummer"
                      name="hausnummer"
                      required
                      placeholder="12a"
                      autoComplete="address-line2"
                    />
                  </div>
                </div>

                <div className="alab-lb-row city">
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-plz">PLZ *</label>
                    <input
                      type="text"
                      id="alab-lb-plz"
                      name="plz"
                      required
                      placeholder="87719"
                      inputMode="numeric"
                      pattern="[0-9]{4,5}"
                      autoComplete="postal-code"
                    />
                  </div>
                  <div className="alab-lb-field">
                    <label htmlFor="alab-lb-ort">Ort *</label>
                    <input
                      type="text"
                      id="alab-lb-ort"
                      name="ort"
                      required
                      placeholder="Mindelheim"
                      autoComplete="address-level2"
                    />
                  </div>
                </div>

                <div className="alab-lb-field">
                  <label htmlFor="alab-lb-nachricht">Nachricht (optional)</label>
                  <textarea
                    id="alab-lb-nachricht"
                    name="nachricht"
                    rows={4}
                    placeholder="Haben Sie spezielle Wünsche oder Fragen?"
                  />
                </div>

                <label className="alab-lb-consent">
                  <input type="checkbox" name="consent" required />
                  <span>
                    Ich habe die{" "}
                    <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen und stimme der Verarbeitung meiner Daten zu.
                  </span>
                </label>

                <button type="submit" className="alab-lb-submit" disabled={sending}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                  {sending ? "Senden…" : "Angebot anfordern"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showThanks && (
        <div id="alabAngebotThanks" role="alertdialog">
          <span className="chk">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span>Vielen Dank! Wir melden uns in Kürze.</span>
        </div>
      )}
    </>
  );
}
