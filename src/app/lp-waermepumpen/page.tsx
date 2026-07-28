import type { Metadata } from "next";
import WaermepumpeInfo from "@/components/lp/WaermepumpeInfo";

const SITE_URL = "https://www.alabenergiesysteme.de";
const PFAD = "/lp-waermepumpen";

export const metadata: Metadata = {
  title:
    "Wärmepumpe: bis 22.400 € Zuschuss & 1.450 € weniger Heizkosten pro Jahr",
  description:
    "Neue KfW-Heizungsförderung seit 21.07.2026: bis zu 80 % Zuschuss, maximal 22.400 €. Dazu jedes Jahr bis zu 1.450 € niedrigere Heizkosten. Alle Zahlen mit offengelegten Annahmen – Stand Juli 2026.",
  alternates: { canonical: `${SITE_URL}${PFAD}` },
  robots: {
    // Bewusst nicht im Google-Index und nicht mit der Website verlinkt:
    // Die Seite ist nur über direkten Aufruf bzw. Anzeigen erreichbar.
    index: false,
    follow: false,
  },
  openGraph: {
    title: "22.400 € Zuschuss und 1.450 € weniger Heizkosten pro Jahr",
    description:
      "Neue Heizungsförderung seit 21. Juli 2026: bis zu 80 % Zuschuss. Ersparnis, Amortisation und Effizienz im Altbau – mit offengelegten Annahmen.",
    url: `${SITE_URL}${PFAD}`,
    type: "article",
  },
};

export default function LpWaermepumpenPage() {
  return <WaermepumpeInfo />;
}
