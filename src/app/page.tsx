import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import DeutschlandSection from "@/components/DeutschlandSection";

export const metadata: Metadata = {
  title:
    "ALAB Energiesysteme Mindelheim – Photovoltaik, Wärmepumpe & Elektroinstallation",
  description:
    "ALAB Energiesysteme aus 87719 Mindelheim – Ingenieurbüro & zertifizierter Elektrofachbetrieb. Planung und schlüsselfertige Umsetzung von Photovoltaik, Wärmepumpe, Wallbox, Gebäudeenergie & Beleuchtungstechnik für Privat- und Gewerbekunden.",
  alternates: { canonical: "https://www.alabenergiesysteme.de" },
  keywords: [
    "ALAB Energiesysteme",
    "Energiesysteme Mindelheim",
    "Ingenieurbüro Mindelheim",
    "Elektrofachbetrieb Mindelheim",
    "Elektriker Mindelheim",
    "Photovoltaik Mindelheim",
    "Wärmepumpe Mindelheim",
    "Wallbox Mindelheim",
    "Solaranlage Allgäu",
    "Energiekonzept Bayern",
    "schlüsselfertige Energietechnik",
    "Gebäudeenergie Mindelheim",
    "Beleuchtungstechnik Mindelheim",
  ],
  openGraph: {
    title:
      "ALAB Energiesysteme Mindelheim – Ingenieurbüro & Elektrofachbetrieb",
    description:
      "Photovoltaik, Wärmepumpe, Wallbox, Gebäudeenergie & Beleuchtungstechnik aus 87719 Mindelheim. Planung und Ausführung aus einer Hand – schlüsselfertig.",
    url: "https://www.alabenergiesysteme.de",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <AboutSection />
        <DeutschlandSection />
      </main>
    </>
  );
}
