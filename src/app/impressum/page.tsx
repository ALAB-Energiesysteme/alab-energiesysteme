import type { Metadata } from "next";
import Header from "@/components/Header";
import ImpressumSection from "@/components/ImpressumSection";

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von ALAB Energiesysteme e. K., Kastanienweg 6, 87719 Mindelheim.",
  alternates: { canonical: `${SITE_URL}/impressum` },
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main>
        <ImpressumSection />
      </main>
    </>
  );
}
