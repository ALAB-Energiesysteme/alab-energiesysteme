"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import styles from "./LandingStickyCTA.module.css";

type Props = { cta: string };

/** A second contact opportunity after the hero, hidden around forms and dialogs. */
export default function LandingStickyCTA({ cta }: Props) {
  const barRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const landing = barRef.current?.closest("[data-landing-page]");
    const hero = landing?.querySelector<HTMLElement>("[data-lp-cta='hero']");
    const inquiry = landing?.querySelector<HTMLElement>("#anfrage");
    if (!hero || !inquiry || !("IntersectionObserver" in window)) return;

    let heroPassed = false;
    let inquiryVisible = true;
    let updateFrame = 0;
    const mobile = window.matchMedia("(max-width: 767px)");

    function hasVisibleDialog() {
      return Array.from(document.querySelectorAll<HTMLElement>(
        '[role="dialog"], [role="alertdialog"], dialog[open]',
      )).some(dialog => {
        // The mobile navigation remains mounted inside an aria-hidden wrapper.
        if (dialog.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
        const computed = window.getComputedStyle(dialog);
        return computed.display !== "none" && computed.visibility !== "hidden" &&
          computed.visibility !== "collapse" && dialog.getClientRects().length > 0;
      });
    }

    function updateVisibility() {
      updateFrame = 0;
      const editing = document.activeElement?.matches(
        'input, textarea, select, [contenteditable="true"]',
      );
      setVisible(mobile.matches && heroPassed && !inquiryVisible && !editing && !hasVisibleDialog());
    }

    function scheduleUpdate() {
      if (!updateFrame) updateFrame = window.requestAnimationFrame(updateVisibility);
    }

    const intersections = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        } else if (entry.target === inquiry) {
          inquiryVisible = entry.isIntersecting;
        }
      }
      scheduleUpdate();
    }, { threshold: 0 });
    intersections.observe(hero);
    intersections.observe(inquiry);

    const overlays = new MutationObserver(scheduleUpdate);
    overlays.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["aria-hidden", "aria-modal", "hidden", "inert", "open", "class", "style"],
    });
    mobile.addEventListener("change", scheduleUpdate);
    document.addEventListener("focusin", scheduleUpdate);
    document.addEventListener("focusout", scheduleUpdate);

    return () => {
      intersections.disconnect();
      overlays.disconnect();
      mobile.removeEventListener("change", scheduleUpdate);
      document.removeEventListener("focusin", scheduleUpdate);
      document.removeEventListener("focusout", scheduleUpdate);
      if (updateFrame) window.cancelAnimationFrame(updateFrame);
    };
  }, []);

  return (
    <nav ref={barRef} className={styles.bar} aria-label="Direktkontakt" hidden={!visible}>
      <div className={styles.actions}>
        <a className={styles.phone} href="tel:+4982617597176" data-lp-cta="sticky">
          <Phone size={17} aria-hidden="true" />
          <span>Anrufen</span>
        </a>
        <a className={styles.primary} href="#anfrage" data-lp-cta="sticky">
          <span>{cta}</span>
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
