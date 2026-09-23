"use client";

import { useEffect } from "react";
import { isLocalPreview } from "@/lib/formSubmission";

/** Re-read consent at the time of the interaction so revocation applies immediately. */
export function hasLandingTrackingConsent(): boolean {
  if (typeof window === "undefined" || isLocalPreview()) return false;
  try {
    const consent: unknown = JSON.parse(window.localStorage.getItem("alab-cookie-consent-v1") || "null");
    if (!consent || typeof consent !== "object") return false;
    const choice = consent as { analytics?: unknown; marketing?: unknown };
    return choice.analytics === true || choice.marketing === true;
  } catch {
    return false;
  }
}

/** Interactions are diagnostic events; only the successful form creates a lead conversion. */
export default function LandingTracking({ slug }: { slug: string }) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!hasLandingTrackingConsent() || !(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>("[data-lp-cta], a[href^='tel:'], a[href^='mailto:']");
      if (!trigger) return;
      const page = trigger?.closest<HTMLElement>("[data-landing-page]");
      const href = trigger.getAttribute("href") || "";
      const isContactLink = href.startsWith("tel:") || href.startsWith("mailto:");
      const isFooterContact = isContactLink && !!trigger.closest("footer") &&
        document.querySelector<HTMLElement>("[data-landing-page]")?.dataset.landingPage === slug;
      if (page?.dataset.landingPage !== slug && !isFooterContact) return;

      const eventName = href.startsWith("tel:") ? "phone_click" : href.startsWith("mailto:") ? "email_click" : "cta_click";
      // Do not include href, query parameters, form values or customer details in analytics.
      const position = isFooterContact ? "footer" : trigger.dataset.lpCta || (trigger.closest("header") ? "header" : "content");
      try {
        const target = window as unknown as { dataLayer?: object[] };
        target.dataLayer = target.dataLayer || [];
        target.dataLayer.push({ event: eventName, page_path: `/lp/${slug}`, form_location: slug, position });
      } catch {
        // Analytics must never interfere with navigation or contacting ALAB.
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [slug]);
  return null;
}
