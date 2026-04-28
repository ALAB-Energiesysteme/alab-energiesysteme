import type { Metadata } from "next";
import Header from "@/components/Header";
import PrivateLoesungenSection from "@/components/PrivateLoesungenSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Photovoltaik Einfamilienhaus Mindelheim – PV-Anlage schlüsselfertig planen & installieren",
  description:
    "Photovoltaik fürs Einfamilienhaus aus 87719 Mindelheim: ALAB Energiesysteme plant und installiert Ihre PV-Anlage mit Stromspeicher und Wallbox – schlüsselfertig, normgerecht und wirtschaftlich. Ingenieurbüro & Elektrofachbetrieb mit Festpreisgarantie.",
  alternates: { canonical: `${SITE_URL}/pv-zuhause` },
  keywords: [
    "Photovoltaik Einfamilienhaus",
    "PV-Anlage Einfamilienhaus",
    "Solaranlage Einfamilienhaus",
    "Photovoltaik Mindelheim",
    "PV-Anlage Mindelheim",
    "Photovoltaik Allgäu",
    "Photovoltaik Bayern",
    "Stromspeicher Einfamilienhaus",
    "Solar mit Speicher",
    "Eigenverbrauch Solarstrom",
    "Solaranlage planen lassen",
    "schlüsselfertige PV-Anlage",
    "Solaranlage privat",
    "Photovoltaik Auslegung",
    "Photovoltaik Komplettanlage",
  ],
  openGraph: {
    title:
      "Photovoltaik fürs Einfamilienhaus – ALAB Energiesysteme Mindelheim",
    description:
      "Schlüsselfertige PV-Anlage für Ihr Einfamilienhaus aus 87719 Mindelheim. Planung, Installation und Service aus einer Hand – Ingenieurbüro & Elektrofachbetrieb.",
    url: `${SITE_URL}/pv-zuhause`,
    type: "website",
  },
};

const pvJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Photovoltaik für Einfamilienhäuser",
  name: "Photovoltaikanlage Einfamilienhaus – schlüsselfertig",
  description:
    "Planung und schlüsselfertige Installation von Photovoltaikanlagen mit Stromspeicher und Wallbox für Einfamilienhäuser. Ingenieurmäßige Auslegung, normgerechte Montage und persönliche Betreuung – alles aus einer Hand.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "City", name: "Mindelheim" },
    { "@type": "State", name: "Bayern" },
    { "@type": "Country", name: "Deutschland" },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Eigenheimbesitzer",
  },
  url: `${SITE_URL}/pv-zuhause`,
};

export default function PvZuhausePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pvJsonLd) }}
      />
      <Header />
      <main>
        <PrivateLoesungenSection />
      </main>
    </>
  );
}
