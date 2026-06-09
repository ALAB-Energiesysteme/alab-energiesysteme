import type { Metadata } from "next";
import Header from "@/components/Header";
import GeschaeftskundenOverview from "@/components/GeschaeftskundenOverview";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute:
      "Energielösungen für Gewerbe Mindelheim | ALAB Energiesysteme",
  },
  description:
    "Gewerbliche Energietechnik aus Mindelheim: Photovoltaik, Ladesäulen, Hallenelektrik & Gebäudetechnik schlüsselfertig vom Ingenieurbüro. Betriebskosten senken – jetzt anfragen!",
  alternates: { canonical: `${SITE_URL}/geschaeftskunden` },
  keywords: [
    "Photovoltaik Gewerbe",
    "Ladesäulen Gewerbe",
    "Hallenelektrik",
    "Gewerbe Energielösung",
    "Energietechnik Unternehmen",
    "Gewerbe Mindelheim",
    "Industrie PV",
    "Lastmanagement Betrieb",
  ],
  openGraph: {
    title: "Geschäftskunden – gewerbliche Energietechnik aus Mindelheim",
    description:
      "Photovoltaik, Ladesäulen, Hallenelektrik – schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb.",
    url: `${SITE_URL}/geschaeftskunden`,
    type: "website",
  },
};

export default function GeschaeftskundenPage() {
  return (
    <>
      <Header />
      <main>
        <GeschaeftskundenOverview />
      </main>
    </>
  );
}
