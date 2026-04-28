"use client";

import LegacyPageEmbed from "@/components/LegacyPageEmbed";
import { gewerbeLandingHtml } from "@/components/legacy-content/gewerbe";

const EXTERNAL_STYLE_HREFS = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap",
];

const CSS_HREFS = [
  "/assets/css/gewerbe/section-hero.css",
  "/assets/css/gewerbe/section3-slideshow.css",
  "/assets/css/gewerbe/section-referenzen.css",
  "/assets/css/gewerbe/section6-benefits.css",
  "/assets/css/gewerbe/section2-pv-calc.css",
  "/assets/css/gewerbe/section7-faq.css",
  "/assets/css/gewerbe/overrides.css",
];

const SCRIPT_SRCS = [
  { src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" },
  { src: "/assets/js/gewerbe/section-hero.js" },
  { src: "/assets/js/gewerbe/section3-slideshow.js" },
  { src: "/assets/js/gewerbe/section-referenzen.js" },
  { src: "/assets/js/gewerbe/section6-benefits.js" },
  { src: "https://cdn.jsdelivr.net/npm/chart.js" },
  { src: "/assets/js/gewerbe/section2-pv-calc.js" },
  { src: "/assets/js/gewerbe/section7-faq-script.js" },
];

export default function GewerblicheLoesungenSection() {
  return (
    <LegacyPageEmbed
      html={gewerbeLandingHtml}
      cssHrefs={CSS_HREFS}
      scriptSrcs={SCRIPT_SRCS}
      externalStyleHrefs={EXTERNAL_STYLE_HREFS}
      useIsolatedFrame
    />
  );
}
