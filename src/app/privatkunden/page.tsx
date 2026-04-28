import type { Metadata } from "next";
import Header from "@/components/Header";
import PrivatkundenOverview from "@/components/PrivatkundenOverview";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Privatkunden – Photovoltaik, Wärmepumpe & Energietechnik fürs Eigenheim",
  description:
    "Energielösungen für Privatkunden aus 87719 Mindelheim: Photovoltaik, Wärmepumpe, Wallbox, Gebäudetechnik & Beleuchtung schlüsselfertig. ALAB Energiesysteme – Ingenieurbüro & zertifizierter Elektrofachbetrieb fürs Eigenheim.",
  alternates: { canonical: `${SITE_URL}/privatkunden` },
  keywords: [
    "Photovoltaik Privatkunden",
    "Energielösung Eigenheim",
    "Solaranlage Privathaus",
    "Wärmepumpe Privat",
    "Wallbox Eigenheim",
    "Elektriker Privat Mindelheim",
    "Hauselektrik",
    "Solaranlage Allgäu",
    "Eigenheim Energietechnik",
    "schlüsselfertige Energietechnik privat",
  ],
  openGraph: {
    title: "Privatkunden – Energielösungen fürs Eigenheim aus Mindelheim",
    description:
      "Photovoltaik, Wärmepumpe, Wallbox & Gebäudetechnik schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb.",
    url: `${SITE_URL}/privatkunden`,
    type: "website",
  },
};

export default function PrivatkundenPage() {
  return (
    <>
      <Header />
      <main>
        <PrivatkundenOverview />
      </main>
    </>
  );
}
