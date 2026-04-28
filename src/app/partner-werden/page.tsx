import type { Metadata } from "next";
import Header from "@/components/Header";
import PartnerWerdenSection from "@/components/PartnerWerdenSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title:
    "Partner werden – Kooperation für Architekten, Makler & PV-Unternehmen",
  description:
    "Werden Sie Partner von ALAB Energiesysteme. Kooperationen für Architekten, Immobilienmakler und Photovoltaikunternehmen – Planung, AC/DC-Montage und Wärmepumpenlösungen aus einer Hand. Ingenieurbüro & Elektrofachbetrieb aus Mindelheim.",
  alternates: { canonical: `${SITE_URL}/partner-werden` },
  keywords: [
    "Partner werden ALAB Energiesysteme",
    "Kooperation Photovoltaik",
    "PV Partnerschaft",
    "Architekten Partner",
    "Immobilienmakler PV",
    "Subunternehmer Photovoltaik",
    "Generalunternehmer Energietechnik",
  ],
  openGraph: {
    title: "Partner werden – Kooperation mit ALAB Energiesysteme",
    description:
      "Kooperationen für Architekten, Makler und PV-Unternehmen – Planung & Ausführung aus einer Hand.",
    url: `${SITE_URL}/partner-werden`,
    type: "website",
  },
};

export default function PartnerWerdenPage() {
  return (
    <>
      <Header />
      <main>
        <PartnerWerdenSection />
      </main>
    </>
  );
}
