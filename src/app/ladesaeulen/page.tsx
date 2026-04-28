import type { Metadata } from "next";
import Header from "@/components/Header";
import LadesaeulenSection from "@/components/LadesaeulenSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Ladesäulen für Gewerbe & Industrie – Ladeinfrastruktur aus Mindelheim",
  description:
    "Ladeinfrastruktur für Unternehmen, Hotels, Parkplätze und Mitarbeiterparkplätze. ALAB Energiesysteme aus 87719 Mindelheim plant und installiert AC- und DC-Ladesäulen schlüsselfertig – Ingenieurbüro & Elektrofachbetrieb.",
  alternates: { canonical: `${SITE_URL}/ladesaeulen` },
  keywords: [
    "Ladesäulen Gewerbe",
    "Ladeinfrastruktur",
    "Ladestation Unternehmen",
    "DC-Schnellladesäule",
    "AC-Ladestation",
    "Ladepark Hotel",
    "Mitarbeiterparkplatz Laden",
    "Ladesäulen Mindelheim",
    "Ladeinfrastruktur Allgäu",
    "öffentliches Laden",
  ],
  openGraph: {
    title: "Ladesäulen & Ladeinfrastruktur für Unternehmen – aus Mindelheim",
    description:
      "AC- & DC-Ladesäulen für Gewerbe, Hotels und Parkplätze – schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb.",
    url: `${SITE_URL}/ladesaeulen`,
    type: "website",
  },
};

export default function LadesaeulenPage() {
  return (
    <>
      <Header />
      <main>
        <LadesaeulenSection />
      </main>
    </>
  );
}
