import type { Metadata } from "next";
import Header from "@/components/Header";
import ServicepaketeSection from "@/components/ServicepaketeSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute: "PV-Servicepakete Mindelheim – Wartung & Monitoring | ALAB",
  },
  description:
    "PV-Servicepakete aus Mindelheim: Montage, Wartung, Monitoring & Betriebsführung aus einer Hand – für maximale Erträge, Betriebssicherheit & Werterhalt Ihrer Anlage.",
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
