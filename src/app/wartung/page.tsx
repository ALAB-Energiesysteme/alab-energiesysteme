import type { Metadata } from "next";
import Header from "@/components/Header";
import WartungSection from "@/components/WartungSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: "PV-Wartung – Photovoltaik-Wartung & Instandhaltung | ALAB Energiesysteme",
  description:
    "Professionelle Wartung Ihrer Photovoltaikanlage durch ALAB Energiesysteme aus 87719 Mindelheim: Maximale Erträge, volle Betriebssicherheit und Erhalt von Garantie und Versicherungsschutz – mit zertifiziertem Fachservice.",
  alternates: { canonical: `${SITE_URL}/wartung` },
  keywords: [
    "PV Wartung",
    "Photovoltaik Wartung",
    "Solaranlage Wartung Mindelheim",
    "PV-Inspektion",
    "Anlagencheck Photovoltaik",
  ],
  openGraph: {
    title: "PV-Wartung – maximale Erträge sichern",
    description:
      "Zertifizierte Wartung für Photovoltaikanlagen – mehr Ertrag, mehr Sicherheit.",
    url: `${SITE_URL}/wartung`,
    type: "website",
  },
};

export default function WartungPage() {
  return (
    <>
      <Header />
      <main>
        <WartungSection />
      </main>
    </>
  );
}
