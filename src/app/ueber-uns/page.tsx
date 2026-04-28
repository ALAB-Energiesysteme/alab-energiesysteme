import type { Metadata } from "next";
import Header from "@/components/Header";
import UeberUnsSection from "@/components/UeberUnsSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: "Über uns – ALAB Energiesysteme Mindelheim",
  description:
    "ALAB Energiesysteme – inhabergeführtes Ingenieurbüro & zertifizierter Elektrofachbetrieb aus 87719 Mindelheim. Eigene Ingenieure und Fachkräfte planen und realisieren Energietechnik schlüsselfertig in ganz Deutschland.",
  alternates: { canonical: `${SITE_URL}/ueber-uns` },
  keywords: [
    "ALAB Energiesysteme über uns",
    "Ingenieurbüro Mindelheim",
    "Elektrofachbetrieb Allgäu",
    "Inhabergeführter Elektrofachbetrieb",
    "Team ALAB Energiesysteme",
    "Energietechnik Bayern",
  ],
  openGraph: {
    title: "Über ALAB Energiesysteme – Ingenieurbüro & Elektrofachbetrieb",
    description:
      "Inhabergeführtes Ingenieurbüro & Elektrofachbetrieb aus 87719 Mindelheim. Planung und Ausführung aus einer Hand – deutschlandweit.",
    url: `${SITE_URL}/ueber-uns`,
    type: "website",
  },
};

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main>
        <UeberUnsSection />
      </main>
    </>
  );
}
