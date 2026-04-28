import type { Metadata } from "next";
import Header from "@/components/Header";
import GewerbeLandingSection from "@/components/gewerbe/GewerbeLandingSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Photovoltaik für Gewerbe & Industrie – PV-Anlage schlüsselfertig | ALAB Energiesysteme Mindelheim",
  description:
    "Gewerbliche Photovoltaik aus 87719 Mindelheim: ALAB Energiesysteme plant und realisiert PV-Anlagen für Hallendächer, Betriebsstandorte und Gewerbeimmobilien. Eigenverbrauch maximieren, Energiekosten senken – schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb.",
  alternates: { canonical: `${SITE_URL}/gewerbliche-loesungen` },
  keywords: [
    "Photovoltaik Gewerbe",
    "PV-Anlage Gewerbe",
    "Gewerbe Solaranlage",
    "Photovoltaik Industrie",
    "Hallendach Photovoltaik",
    "PV Gewerbedach",
    "Solaranlage Unternehmen",
    "Eigenverbrauch Gewerbe",
    "Lastmanagement Gewerbe",
    "Photovoltaik Mindelheim Gewerbe",
    "PV-Großanlage",
    "Photovoltaik Allgäu Gewerbe",
    "schlüsselfertige Gewerbe-PV",
    "Photovoltaik Logistik",
    "PV-Anlage Industrie Bayern",
    "Energieversorgung Betrieb",
    "Gewerbliche Energielösung",
  ],
  openGraph: {
    title:
      "Gewerbliche Photovoltaik – Ingenieurmäßige PV-Komplettlösung aus Mindelheim",
    description:
      "Photovoltaik für Hallen, Betriebe und Gewerbeimmobilien. ALAB Energiesysteme aus 87719 Mindelheim plant und realisiert schlüsselfertige PV-Anlagen – Ingenieurbüro & Elektrofachbetrieb.",
    url: `${SITE_URL}/gewerbliche-loesungen`,
    type: "website",
  },
};

const gewerbeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Photovoltaik für Gewerbe & Industrie",
  name: "Gewerbliche Photovoltaikanlage – schlüsselfertig",
  description:
    "Planung, Projektierung und schlüsselfertige Installation von gewerblichen Photovoltaikanlagen auf Hallendächern, Bürogebäuden und Industriestandorten. Mit Lastmanagement, Speicher und Monitoring – ingenieurgetrieben aus einer Hand.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "State", name: "Bayern" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Gewerbe & Industrie",
  },
  url: `${SITE_URL}/gewerbliche-loesungen`,
};

export default function GewerblicheLoesungenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gewerbeJsonLd) }}
      />
      <Header />
      <main>
        <GewerbeLandingSection />
      </main>
    </>
  );
}
