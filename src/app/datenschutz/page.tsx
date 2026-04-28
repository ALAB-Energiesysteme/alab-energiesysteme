import type { Metadata } from "next";
import Header from "@/components/Header";
import DatenschutzSection from "@/components/DatenschutzSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von ALAB Energiesysteme e. K., Mindelheim.",
  alternates: { canonical: `${SITE_URL}/datenschutz` },
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main>
        <DatenschutzSection />
      </main>
    </>
  );
}
