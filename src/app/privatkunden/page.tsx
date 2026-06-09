import type { Metadata } from "next";
import Header from "@/components/Header";
import PrivatkundenOverview from "@/components/PrivatkundenOverview";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute:
      "Photovoltaik & Wärmepumpe fürs Eigenheim Mindelheim | ALAB",
  },
  description:
    "Energielösungen fürs Eigenheim aus Mindelheim: Photovoltaik, Wärmepumpe, Wallbox & Gebäudetechnik schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb. Jetzt kostenlos beraten lassen!",
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
