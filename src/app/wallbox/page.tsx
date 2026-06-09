import type { Metadata } from "next";
import Header from "@/components/Header";
import WallboxSection from "@/components/WallboxSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute:
      "Wallbox installieren Mindelheim & Allgäu | ALAB Energiesysteme",
  },
  description:
    "Wallbox vom Elektrofachbetrieb aus Mindelheim ⚡ Planung & Installation mit PV-Kopplung, Lastmanagement & Festpreis. Jetzt kostenloses Angebot sichern!",
  alternates: { canonical: `${SITE_URL}/wallbox` },
  keywords: [
    "Wallbox Mindelheim",
    "Wallbox installieren",
    "E-Auto Ladestation",
    "Wallbox Einfamilienhaus",
    "Wallbox PV",
    "Wallbox Solar",
    "11 kW Wallbox",
    "Wallbox Förderung",
    "Wallbox Allgäu",
    "Vor-Ort-Installationscheck Wallbox",
  ],
  openGraph: {
    title: "Wallbox installieren in Mindelheim – ALAB Energiesysteme",
    description:
      "Wallbox-Installation mit PV-Kopplung und Festpreisangebot. Ingenieurbüro & Elektrofachbetrieb aus 87719 Mindelheim.",
    url: `${SITE_URL}/wallbox`,
    type: "website",
  },
};

export default function WallboxPage() {
  return (
    <>
      <Header />
      <main>
        <WallboxSection />
      </main>
    </>
  );
}
