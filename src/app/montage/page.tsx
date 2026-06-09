import type { Metadata } from "next";
import Header from "@/components/Header";
import MontageSection from "@/components/MontageSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute: "PV-Montage Mindelheim & Allgäu | ALAB Energiesysteme",
  },
  description:
    "Photovoltaik-Montage vom Fachbetrieb aus Mindelheim: PV-Anlagen auf Privat- & Gewerbedächern, normgerecht montiert mit eigenen Fachkräften & voller Dokumentation.",
  alternates: { canonical: `${SITE_URL}/montage` },
  keywords: ["PV Montage", "Photovoltaik Montage", "Solaranlage Montage", "PV-Montage Bayern"],
  openGraph: {
    title: "PV-Montage mit Ingenieurstandard – ALAB Energiesysteme",
    description:
      "Sauber montierte Photovoltaikanlagen mit eigenem Montageteam und vollständiger Dokumentation.",
    url: `${SITE_URL}/montage`,
    type: "website",
  },
};

export default function MontagePage() {
  return (
    <>
      <Header />
      <main>
        <MontageSection />
      </main>
    </>
  );
}
