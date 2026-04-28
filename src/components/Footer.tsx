"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

/* ── Link data (synced with Header NAV_ITEMS) ── */

const PRIVATKUNDEN = [
  { label: "Photovoltaik", href: "/pv-zuhause" },
  { label: "Wallboxen", href: "/wallbox" },
  { label: "Wärmepumpen", href: "/waermepumpen" },
  { label: "Gebäudeenergie", href: "/gebaeudeenergie" },
  { label: "Beleuchtungstechnik", href: "/beleuchtungstechnik" },
];

const GESCHAEFTSKUNDEN = [
  { label: "Ladesäulen", href: "/ladesaeulen" },
  { label: "Photovoltaik", href: "/gewerbliche-loesungen" },
  { label: "Dachverpachtung", href: "/dachverpachtung" },
  { label: "Servicepakete", href: "/servicepakete" },
  { label: "Montage", href: "/montage" },
  { label: "Wartung", href: "/wartung" },
  { label: "Anlagenmonitoring", href: "/monitoring" },
];

const INFO_RECHT = [
  { label: "Kontakt", href: "/kontakt" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

const MAKE_URL =
  "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";

export default function Footer() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Bitte füllen Sie die Pflichtfelder aus.");
      return;
    }
    if (!consent) {
      setError("Bitte akzeptieren Sie die Datenschutzerklärung.");
      return;
    }

    const p = new URLSearchParams();
    p.set("Quelle", "Footer – Schnellkontakt");
    p.set(
      "Seite",
      typeof window !== "undefined" ? window.location.href : ""
    );
    p.set("Name", form.name.trim());
    p.set("Telefon", form.phone.trim());
    p.set("Email", form.email.trim());
    p.set("Consent", "1");
    p.set("Zeitstempel", new Date().toISOString());

    try {
      const blob = new Blob([p.toString()], {
        type: "application/x-www-form-urlencoded;charset=UTF-8",
      });
      navigator.sendBeacon(MAKE_URL, blob);
    } catch {
      try {
        fetch(MAKE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: p.toString(),
        });
      } catch {}
    }

    setSent(true);
    setForm({ name: "", phone: "", email: "" });
    setConsent(false);
  };

  return (
    <footer
      className="border-t border-[var(--color-line)] bg-white"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* ── Main footer grid ── */}
      <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8 max-[767px]:gap-7 max-[767px]:px-5 max-[767px]:py-10">
        {/* Col 1: Firmendaten */}
        <div>
          <p className="text-sm font-bold text-ink">ALAB Energiesysteme</p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Kastanienweg 6 · 87719 Mindelheim
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              <a
                href="tel:+4982617597176"
                className="transition hover:text-accent"
              >
                08261 7597176
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              <a
                href="mailto:info@alab-energiesysteme.de"
                className="transition hover:text-accent"
              >
                info@alab-energiesysteme.de
              </a>
            </li>
          </ul>
          <a
            href="/kontakt"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent transition hover:text-accent-deep"
          >
            Anfahrt &amp; Karte
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {/* Col 2: Privatkunden */}
        <div>
          <p className="text-sm font-bold text-ink">Privatkunden</p>
          <ul className="mt-3 space-y-1.5">
            {PRIVATKUNDEN.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Geschäftskunden */}
        <div>
          <p className="text-sm font-bold text-ink">Geschäftskunden</p>
          <ul className="mt-3 space-y-1.5">
            {GESCHAEFTSKUNDEN.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Informationen & Recht */}
        <div>
          <p className="text-sm font-bold text-ink">Informationen &amp; Recht</p>
          <ul className="mt-3 space-y-1.5">
            {INFO_RECHT.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5: Schnellkontakt */}
        <div>
          <p className="text-sm font-bold text-ink">
            Schnellkontakt{" "}
            <span className="font-normal text-muted">(Rückruf in 24 h)</span>
          </p>

          {sent ? (
            <div className="mt-3 rounded-[var(--radius-btn)] border border-green-200 bg-green-50 p-3 text-xs font-semibold text-green-800">
              Vielen Dank! Wir melden uns zeitnah bei Ihnen.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
              <p className="text-xs text-muted">
                Kurze Nachricht schicken – wir melden uns zeitnah telefonisch
                oder per E-Mail.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Ihr Name *"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="rounded-[var(--radius-btn)] border border-[var(--color-line)] bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
                />
                <input
                  type="tel"
                  placeholder="Telefon *"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="rounded-[var(--radius-btn)] border border-[var(--color-line)] bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
                />
              </div>
              <input
                type="email"
                placeholder="E-Mail (optional)"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full rounded-[var(--radius-btn)] border border-[var(--color-line)] bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-gray-300 accent-[var(--color-accent)]"
                />
                <span className="text-[11px] leading-tight text-muted">
                  Ich akzeptiere die{" "}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    Datenschutzerklärung
                  </a>
                  .
                </span>
              </div>
              {error && (
                <p className="text-[11px] font-semibold text-red-600">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="rounded-[var(--radius-btn)] bg-accent px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_var(--color-accent-glow)] transition hover:bg-accent-deep"
              >
                Absenden
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[var(--color-line)] bg-[#f4f6f8]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-muted sm:flex-row lg:px-8">
          <p>&copy; {new Date().getFullYear()} ALAB Energiesysteme – Alle Rechte vorbehalten</p>
          <p>
            Kastanienweg 6 · 87719 Mindelheim · Tel.{" "}
            <a href="tel:+4982617597176" className="transition hover:text-accent">
              08261 7597176
            </a>{" "}
            ·{" "}
            <a
              href="mailto:info@alab-energiesysteme.de"
              className="transition hover:text-accent"
            >
              info@alab-energiesysteme.de
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
