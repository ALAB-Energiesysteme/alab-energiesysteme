import type { Metadata } from "next";
import Header from "@/components/Header";
import WaermepumpenSection from "@/components/WaermepumpenSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Wärmepumpe Mindelheim – Luft-Wasser-Wärmepumpe planen & einbauen lassen",
  description:
    "Luft-Wasser-Wärmepumpe aus 87719 Mindelheim: ALAB Energiesysteme plant und installiert Ihre Wärmepumpe schlüsselfertig – inkl. Förderantrag (BEG bis 70 %), Inbetriebnahme und Wartung. Ingenieurbüro & zertifizierter Elektrofachbetrieb.",
  alternates: { canonical: `${SITE_URL}/waermepumpen` },
  keywords: [
    "Wärmepumpe Mindelheim",
    "Wärmepumpe Allgäu",
    "Wärmepumpe Bayern",
    "Luft-Wasser-Wärmepumpe",
    "Wärmepumpe Einfamilienhaus",
    "Wärmepumpe einbauen",
    "Wärmepumpe Förderung",
    "BEG Förderung Wärmepumpe",
    "Wärmepumpe schlüsselfertig",
    "Vaillant aroTHERM",
    "Wärmepumpe Sanierung",
    "Wärmepumpe Neubau",
    "Wärmepumpe Heizung tauschen",
    "Heizungstausch Mindelheim",
    "Hybridheizung Wärmepumpe",
    "Wärmepumpen-Installation",
    "Wärmepumpe Ingenieur",
  ],
  openGraph: {
    title:
      "Luft-Wasser-Wärmepumpe – schlüsselfertig vom Ingenieurbüro & Elektrofachbetrieb",
    description:
      "ALAB Energiesysteme aus 87719 Mindelheim plant und installiert Wärmepumpen schlüsselfertig – inklusive BEG-Förderantrag und Inbetriebnahme.",
    url: `${SITE_URL}/waermepumpen`,
    type: "website",
  },
};

const wpJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Wärmepumpen-Planung und Installation",
  name: "Luft-Wasser-Wärmepumpe – schlüsselfertig inkl. Förderung",
  description:
    "Planung, Auslegung und schlüsselfertige Installation moderner Luft-Wasser-Wärmepumpen für Sanierung und Neubau. Inklusive Beratung zur BEG-Förderung (bis 70 %), hydraulischem Abgleich und Inbetriebnahme.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "City", name: "Mindelheim" },
    { "@type": "State", name: "Bayern" },
    { "@type": "Country", name: "Deutschland" },
  ],
  url: `${SITE_URL}/waermepumpen`,
};

const wpFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was unterscheidet eine Wärmepumpe von einer herkömmlichen Heizung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine Luft-Wasser-Wärmepumpe nutzt die Umweltwärme aus der Außenluft und benötigt nur elektrischen Strom – ohne fossile Brennstoffe. Sie arbeitet emissionsfrei, wenn der Strom aus einer eigenen Photovoltaikanlage stammt.",
      },
    },
    {
      "@type": "Question",
      name: "Funktioniert eine Wärmepumpe auch im Winter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, moderne Luft-Wasser-Wärmepumpen arbeiten effizient bis ca. -20 °C. Bei extremen Temperaturen unterstützt ein elektrischer Heizstab. Alternativ ist auch ein Hybrid-Betrieb mit einer bestehenden Gasheizung möglich.",
      },
    },
    {
      "@type": "Question",
      name: "Was sind die Voraussetzungen für den Einbau einer Wärmepumpe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein geeigneter Aufstellort für das Außengerät, Platz für die Inneneinheit und ein möglichst gut gedämmtes Gebäude – idealerweise mit Niedertemperatur-Heizsystem wie einer Fußbodenheizung. Mindestabstände zu Nachbargebäuden müssen eingehalten werden.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet eine Wärmepumpe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kosten hängen stark von Heizlast, vorhandenem Heizsystem und baulichen Gegebenheiten ab. Wir erstellen nach einer individuellen Bestandsaufnahme ein transparentes Festpreisangebot ohne versteckte Kosten. Durch staatliche BEG-Förderung sind bis zu 70 % Zuschuss möglich.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es Förderungen für Wärmepumpen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, über die Bundesförderung für effiziente Gebäude (BEG) sind bis zu 70 % der förderfähigen Kosten erstattungsfähig. ALAB Energiesysteme unterstützt bei der Antragstellung.",
      },
    },
  ],
};

export default function WaermepumpenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wpJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wpFaqJsonLd) }}
      />
      <Header />
      <main>
        <WaermepumpenSection />
      </main>
    </>
  );
}
