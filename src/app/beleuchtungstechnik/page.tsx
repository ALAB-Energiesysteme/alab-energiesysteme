import type { Metadata } from "next";
import Header from "@/components/Header";
import BeleuchtungstechnikSection from "@/components/BeleuchtungstechnikSection";
import BeleuchtungForm from "@/components/BeleuchtungForm";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Beleuchtungstechnik & Lichtplanung Mindelheim – Neubau & Sanierung",
  description:
    "Professionelle Lichtplanung und Beleuchtungstechnik aus 87719 Mindelheim für Neubau und Sanierung. ALAB Energiesysteme – Ingenieurbüro & Elektrofachbetrieb für architektonische Lichtkonzepte, LED-Umrüstung und Smart-Home-Steuerung. Schlüsselfertig.",
  alternates: { canonical: `${SITE_URL}/beleuchtungstechnik` },
  keywords: [
    "Beleuchtungstechnik Mindelheim",
    "Lichtplanung Mindelheim",
    "Lichtplanung Neubau",
    "Lichtplanung Sanierung",
    "Architekturbeleuchtung",
    "LED-Umrüstung",
    "LED Beleuchtung Sanierung",
    "Innenbeleuchtung planen",
    "Außenbeleuchtung",
    "Smart Home Beleuchtung",
    "DALI Lichtsteuerung",
    "KNX Beleuchtung",
    "Bürobeleuchtung",
    "Restaurantbeleuchtung",
    "Gastronomie Lichtplanung",
    "Lichtkonzept Einfamilienhaus",
    "Beleuchtung Allgäu",
    "Lichtdesign Bayern",
  ],
  openGraph: {
    title:
      "Beleuchtungstechnik & Lichtplanung – Neubau und Sanierung aus Mindelheim",
    description:
      "Architektonische Lichtkonzepte, LED-Technik und Smart-Home-Steuerung – schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb in 87719 Mindelheim.",
    url: `${SITE_URL}/beleuchtungstechnik`,
    type: "website",
  },
};

const beleuchtungJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Beleuchtungstechnik & Lichtplanung",
  name: "Lichtplanung und Beleuchtungstechnik – Neubau & Sanierung",
  description:
    "Architektonische Lichtkonzepte, normgerechte Beleuchtungstechnik und Smart-Home-Steuerung für Neubau und Sanierung. Von der Lichtplanung über den Schaltanlagenbau bis zur fertigen Installation – alles aus einer Hand.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "State", name: "Bayern" },
    { "@type": "Country", name: "Deutschland" },
  ],
  url: `${SITE_URL}/beleuchtungstechnik`,
};

export default function BeleuchtungstechnikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(beleuchtungJsonLd) }}
      />
      <Header />
      <main>
        <BeleuchtungstechnikSection />
        <BeleuchtungForm />
      </main>
    </>
  );
}
