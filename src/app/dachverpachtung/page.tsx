import type { Metadata } from "next";
import Header from "@/components/Header";
import DachverpachtungSection from "@/components/DachverpachtungSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Dachverpachtung für Photovoltaik – Pachteinnahmen für Ihr Dach | ALAB Energiesysteme",
  description:
    "Dachflächen verpachten für Photovoltaik: ALAB Energiesysteme aus Mindelheim übernimmt Planung, Bau, Betrieb und Versicherung. Sichere Pachteinnahmen über 20+ Jahre für Landwirte und Gewerbe.",
  alternates: { canonical: `${SITE_URL}/dachverpachtung` },
  keywords: [
    "Dachverpachtung Photovoltaik",
    "Dachfläche verpachten",
    "Solar Dachpacht",
    "PV Dach verpachten Bauernhof",
    "Hallendach verpachten",
    "Dachpacht Landwirtschaft",
    "Großdach Photovoltaik",
    "Dachsanierung mit PV",
  ],
  openGraph: {
    title: "Dachverpachtung für Photovoltaik – sichere Pachteinnahmen",
    description:
      "Verpachten Sie Ihr Dach – ALAB Energiesysteme übernimmt alles. Planung, Bau, Versicherung und Betrieb über 20+ Jahre.",
    url: `${SITE_URL}/dachverpachtung`,
    type: "website",
  },
};

export default function DachverpachtungPage() {
  return (
    <>
      <Header />
      <main>
        <DachverpachtungSection />
      </main>
    </>
  );
}
