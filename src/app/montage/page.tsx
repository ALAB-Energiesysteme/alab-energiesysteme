import type { Metadata } from "next";
import Header from "@/components/Header";
import MontageSection from "@/components/MontageSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: "PV-Montage – Photovoltaik fachgerecht montieren | ALAB Energiesysteme",
  description:
    "Photovoltaik-Montage aus 87719 Mindelheim: ALAB Energiesysteme montiert PV-Anlagen auf Privat- und Gewerbedächern – sauber dokumentiert, normgerecht und mit eigenen Fachkräften.",
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
