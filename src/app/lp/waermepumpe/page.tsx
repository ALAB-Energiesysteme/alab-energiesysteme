import type { Metadata } from "next";
import LPWaermepumpe from "@/components/lp/LPWaermepumpe";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Wärmepumpe in Mindelheim einbauen lassen – kostenfreies Festpreisangebot",
  description:
    "Luft-Wasser-Wärmepumpe schlüsselfertig aus 87719 Mindelheim: Festpreisangebot ohne versteckte Kosten, BEG-Förderung bis 70 %, Einbau in 4–6 Wochen. Jetzt kostenlos beraten lassen.",
  alternates: { canonical: `${SITE_URL}/lp/waermepumpe` },
  robots: {
    index: false, // Landing Page nicht in Google-Index (nur über Ads erreichbar)
    follow: false,
  },
  openGraph: {
    title:
      "Wärmepumpe schlüsselfertig – ALAB Energiesysteme Mindelheim",
    description:
      "Bis zu 70 % Förderung sichern. Festpreisangebot, Einbau in 4-6 Wochen. Kostenfreie Beratung.",
    url: `${SITE_URL}/lp/waermepumpe`,
    type: "website",
  },
};

export default function LPWaermepumpePage() {
  return <LPWaermepumpe />;
}
