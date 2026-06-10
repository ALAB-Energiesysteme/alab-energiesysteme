import type { Metadata } from "next";
import LPPhotovoltaik from "@/components/lp/LPPhotovoltaik";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute:
      "Photovoltaik fürs Eigenheim – kostenloses Festpreisangebot | ALAB",
  },
  description:
    "Eigene Photovoltaikanlage mit Speicher aus Mindelheim – schlüsselfertig zum Festpreis. Jetzt kostenloses Angebot anfordern & Solarpotenzial berechnen.",
  alternates: { canonical: `${SITE_URL}/lp/photovoltaik` },
  robots: {
    index: false, // Landing Page nicht indexieren (kein Duplicate Content mit /pv-zuhause)
    follow: false,
  },
  openGraph: {
    title: "Photovoltaik fürs Eigenheim – Festpreisangebot | ALAB Energiesysteme",
    description:
      "PV-Anlage mit Speicher & Wallbox, schlüsselfertig zum Festpreis. Kostenlose Beratung aus Mindelheim & dem Allgäu.",
    url: `${SITE_URL}/lp/photovoltaik`,
    type: "website",
  },
};

export default function LPPhotovoltaikPage() {
  return <LPPhotovoltaik />;
}
