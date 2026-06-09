import type { Metadata } from "next";
import Header from "@/components/Header";
import MonitoringSection from "@/components/MonitoringSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute: "PV-Monitoring & Anlagenüberwachung Mindelheim | ALAB",
  },
  description:
    "PV-Monitoring aus Mindelheim: Live-Daten zu Produktion & Autarkie, intelligente Alarme und KPI-Reports. Maximale Erträge proaktiv sichern – jetzt informieren!",
  alternates: { canonical: `${SITE_URL}/monitoring` },
  keywords: [
    "PV Monitoring",
    "Photovoltaik Monitoring",
    "Anlagenüberwachung Solaranlage",
    "PV Live-Daten",
    "Solaranlage Performance",
  ],
  openGraph: {
    title: "PV-Anlagenmonitoring – Live-Daten & Alarme",
    description:
      "Proaktiv messbar: Anlagenmonitoring für maximale Erträge und Transparenz.",
    url: `${SITE_URL}/monitoring`,
    type: "website",
  },
};

export default function MonitoringPage() {
  return (
    <>
      <Header />
      <main>
        <MonitoringSection />
      </main>
    </>
  );
}
