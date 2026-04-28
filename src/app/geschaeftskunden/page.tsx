import type { Metadata } from "next";
import Header from "@/components/Header";
import GeschaeftskundenOverview from "@/components/GeschaeftskundenOverview";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Geschäftskunden – Photovoltaik, Ladesäulen & Energietechnik für Gewerbe",
  description:
    "Gewerbliche Energielösungen aus 87719 Mindelheim: Photovoltaik, Ladesäulen, Hallenelektrik und Gebäudetechnik schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb. Eigenverbrauch optimieren, Betriebskosten senken.",
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
