import type { Metadata } from "next";
import Header from "@/components/Header";
import KontaktSection from "@/components/KontaktSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: {
    absolute: "Kontakt & kostenlose Beratung Mindelheim | ALAB Energiesysteme",
  },
  description:
    "Kontakt zu ALAB Energiesysteme aus Mindelheim ☎ 08261 7597176. Jetzt unverbindlich zu Photovoltaik, Wärmepumpe & Co. beraten lassen – Antwort innerhalb von 24 Stunden.",
  alternates: { canonical: `${SITE_URL}/kontakt` },
  keywords: [
    "Kontakt ALAB Energiesysteme",
    "Photovoltaik anfragen Mindelheim",
    "Elektriker Kontakt Mindelheim",
    "Beratung Energietechnik",
    "Wärmepumpe Anfrage",
  ],
  openGraph: {
    title: "Kontakt – ALAB Energiesysteme Mindelheim",
    description:
      "Jetzt unverbindlich Beratung zu Photovoltaik, Wärmepumpe oder Elektroinstallation anfragen.",
    url: `${SITE_URL}/kontakt`,
    type: "website",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
        <KontaktSection />
      </main>
    </>
  );
}
