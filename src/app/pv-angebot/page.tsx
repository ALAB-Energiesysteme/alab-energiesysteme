import type { Metadata } from "next";
import PvAngebotLP from "@/components/lp/PvAngebotLP";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute:
      "Kostenloses PV-Angebot – bis zu 80 % Stromkosten sparen | ALAB",
  },
  description:
    "PV-Anlage schlüsselfertig zum Festpreis vom Ingenieurbüro & Elektrofachbetrieb aus Mindelheim. Jetzt in 60 Sekunden Ersparnis berechnen & kostenloses Angebot sichern.",
  alternates: { canonical: `${SITE_URL}/pv-angebot` },
  robots: {
    // Reine Ads-/Kampagnen-Seite: nicht indexieren,
    // kein Duplicate Content mit /pv-zuhause
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Kostenloses PV-Angebot sichern | ALAB Energiesysteme",
    description:
      "Bis zu 80 % Stromkosten sparen mit Ihrer eigenen PV-Anlage. Festpreis, eigene Elektriker, Antwort in 48 h.",
    url: `${SITE_URL}/pv-angebot`,
    type: "website",
  },
};

export default function PvAngebotPage() {
  return <PvAngebotLP />;
}
