import type { Metadata } from "next";
import Header from "@/components/Header";
import FreiflaechenSection from "@/components/FreiflaechenSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute:
      "Freiflächen-Photovoltaik & Solarpark Bayern | ALAB Energiesysteme",
  },
  description:
    "Freiflächen-PV aus Mindelheim: PV-Großanlagen auf Acker- & Konversionsflächen für Landwirte & Investoren. Verpachtung, EPC & schlüsselfertige Umsetzung. Jetzt Fläche prüfen lassen!",
  alternates: { canonical: `${SITE_URL}/freiflaechen` },
  keywords: [
    "Freiflächen Photovoltaik",
    "PV Freifläche",
    "Solarpark Bayern",
    "Photovoltaik Acker",
    "Freiflächenanlage",
    "PV-Großanlage Allgäu",
    "Solaranlage Landwirtschaft",
    "Solar Investor",
  ],
  openGraph: {
    title: "Freiflächen-Photovoltaik – Solarparks für Landwirte und Investoren",
    description:
      "Großflächen-PV schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb aus Mindelheim.",
    url: `${SITE_URL}/freiflaechen`,
    type: "website",
  },
};

export default function FreiflaechenPage() {
  return (
    <>
      <Header />
      <main>
        <FreiflaechenSection />
      </main>
    </>
  );
}
