import type { Metadata } from "next";
import Header from "@/components/Header";
import ServicepaketeSection from "@/components/ServicepaketeSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Servicepakete für PV-Anlagen – Wartung, Monitoring & Service | ALAB Energiesysteme",
  description:
    "Wartung, Monitoring und Service für Photovoltaikanlagen aus 87719 Mindelheim. ALAB Energiesysteme bietet Servicepakete für maximale Erträge, Betriebssicherheit und Werterhalt Ihrer PV-Anlage.",
  alternates: { canonical: `${SITE_URL}/servicepakete` },
  keywords: [
    "PV Wartung",
    "Photovoltaik Service",
    "PV Anlagenmonitoring",
    "Solaranlage Wartung",
    "PV Betreuung Mindelheim",
    "Photovoltaik-Service Allgäu",
  ],
  openGraph: {
    title: "PV-Servicepakete – Wartung, Monitoring & Service aus Mindelheim",
    description:
      "Professionelle Servicepakete für Ihre Photovoltaikanlage – Wartung, Monitoring und Reparaturen.",
    url: `${SITE_URL}/servicepakete`,
    type: "website",
  },
};

export default function ServicepaketePage() {
  return (
    <>
      <Header />
      <main>
        <ServicepaketeSection />
      </main>
    </>
  );
}
