"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Microsoft Clarity – lädt nur, wenn der User im Cookie-Banner
 * der Kategorie "Statistik / Analyse" zugestimmt hat.
 */

const CLARITY_ID = "x060i3815f";
const STORAGE_KEY = "alab-cookie-consent-v1";

type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
};

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as ConsentChoice;
    return !!parsed.analytics;
  } catch {
    return false;
  }
}

export default function ClarityAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(hasAnalyticsConsent());

    // Bei Consent-Änderung (Cookie-Banner aktualisiert) neu prüfen
    const handler = () => setAllowed(hasAnalyticsConsent());
    window.addEventListener("cookie-consent-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cookie-consent-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!allowed) return null;

  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
      }}
    />
  );
}
