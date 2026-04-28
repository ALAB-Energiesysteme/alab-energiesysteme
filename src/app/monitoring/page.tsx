import type { Metadata } from "next";
import Header from "@/components/Header";
import MonitoringSection from "@/components/MonitoringSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "PV-Monitoring – Anlagenüberwachung & Live-Daten | ALAB Energiesysteme",
  description:
    "Anlagenmonitoring für Photovoltaikanlagen aus 87719 Mindelheim: Live-Daten zu Produktion und Autarkie, intelligente Alarme und KPI-Reports. Proaktiv, messbar und sicher.",
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
