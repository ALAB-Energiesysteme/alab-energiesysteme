import type { Metadata } from "next";
import Header from "@/components/Header";
import GebaeudeenergieHero from "@/components/GebaeudeenergieHero";
import GebaeudeenergieServices from "@/components/GebaeudeenergieServices";
import EnergietechnikSection from "@/components/EnergietechnikSection";
import ProcessSteps from "@/components/ProcessSteps";
import MultiStepForm from "@/components/MultiStepForm";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Gebäudeenergie & Elektroinstallation Mindelheim – Neubau & Sanierung",
  description:
    "Gebäudeenergie aus 87719 Mindelheim: ALAB Energiesysteme plant und realisiert Elektroinstallation, Schaltanlagenbau und Energietechnik für Neubau und Sanierung – schlüsselfertig vom Ingenieurbüro & zertifizierten Elektrofachbetrieb.",
  alternates: { canonical: `${SITE_URL}/gebaeudeenergie` },
  keywords: [
    "Gebäudeenergie Mindelheim",
    "Gebäudetechnik Mindelheim",
    "Elektroinstallation Neubau",
    "Elektroinstallation Sanierung",
    "Elektriker Neubau Mindelheim",
    "Elektriker Sanierung",
    "Schaltanlagenbau",
    "Unterverteilungsbau",
    "Energietechnik",
    "Smart Home Mindelheim",
    "KNX Elektroinstallation",
    "Hauselektrik Neubau",
    "Modernisierung Elektrik",
    "Elektroplanung",
    "Energieversorgung Gebäude",
    "Zählerschrank modernisieren",
    "Elektroinstallation Allgäu",
    "Elektroinstallation Bayern",
  ],
  openGraph: {
    title:
      "Gebäudeenergie für Neubau & Sanierung – ALAB Energiesysteme Mindelheim",
    description:
      "Schlüsselfertige Elektroinstallation, Schaltanlagenbau und moderne Energietechnik für Neubau und Sanierung – vom Ingenieurbüro & Elektrofachbetrieb in 87719 Mindelheim.",
    url: `${SITE_URL}/gebaeudeenergie`,
    type: "website",
  },
};

const gebJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Gebäudeenergie & Elektroinstallation",
  name: "Gebäudeenergie für Neubau und Sanierung – schlüsselfertig",
  description:
    "Planung und Ausführung der gesamten Gebäudeenergie: Elektroinstallation, Schaltanlagen- und Unterverteilungsbau sowie Smart-Home-Anbindung. Für Neubau und Sanierung – schlüsselfertig vom Ingenieurbüro und Elektrofachbetrieb.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "State", name: "Bayern" },
    { "@type": "Country", name: "Deutschland" },
  ],
  url: `${SITE_URL}/gebaeudeenergie`,
};

export default function GebaeudeenergiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gebJsonLd) }}
      />
      <Header />
      <main>
        <GebaeudeenergieHero />
        <GebaeudeenergieServices />
        <EnergietechnikSection />
        <ProcessSteps />
        <MultiStepForm />
      </main>
    </>
  );
}
