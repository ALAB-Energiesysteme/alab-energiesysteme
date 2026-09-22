import type { Metadata } from "next";
import Header from "@/components/Header";
import WaermepumpenLP from "@/components/waermepumpen/WaermepumpenLP";
import { FORM_ANKER } from "@/components/waermepumpen/wp-daten";

const SITE_URL = "https://www.alabenergiesysteme.de";
const PFAD = "/lp/waermepumpen";

export const metadata: Metadata = {
  title: {
    absolute: "Wärmepumpe Mindelheim & Unterallgäu – Planung & Einbau | ALAB",
  },
  description:
    "Wärmepumpe vom Ingenieurbüro & Elektrofachbetrieb aus Mindelheim: Planung, Hydraulik, Elektro und Inbetriebnahme aus einer Hand. Kostenlose Ersteinschätzung.",
  alternates: { canonical: `${SITE_URL}${PFAD}` },
  robots: {
    // Anzeigen-Landingpage: nicht im Google-Index, wie die übrigen LPs.
    // Die normale Seite /waermepumpen bleibt die indexierte Version.
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Wärmepumpe für Ihr Zuhause – Planung & Einbau aus einer Hand",
    description:
      "ALAB Energiesysteme aus 87719 Mindelheim: Ingenieurbüro & Elektrofachbetrieb für Wärmepumpe, Hydraulik, Elektroinstallation und Inbetriebnahme.",
    url: `${SITE_URL}${PFAD}`,
    type: "website",
  },
};

export default function LpWaermepumpenPage() {
  return (
    <>
      <Header ctaHref={`#${FORM_ANKER}`} ctaLabel="Angebot anfordern" />
      <main>
        <WaermepumpenLP />
      </main>
    </>
  );
}
