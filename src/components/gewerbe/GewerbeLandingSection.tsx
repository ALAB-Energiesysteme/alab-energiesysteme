import GewerbeHeroSection from "@/components/gewerbe/GewerbeHeroSection";
import GewerbeSlideshowSection from "@/components/gewerbe/GewerbeSlideshowSection";
import GewerbeVorteileSection from "@/components/gewerbe/GewerbeVorteileSection";
import GewerbeWarumSection from "@/components/gewerbe/GewerbeWarumSection";
import GewerbeReferenzenSection from "@/components/gewerbe/GewerbeReferenzenSection";
import GewerbeFAQSection from "@/components/gewerbe/GewerbeFAQSection";

export default function GewerbeLandingSection() {
  return (
    <>
      <GewerbeHeroSection />
      <GewerbeVorteileSection />
      <GewerbeSlideshowSection />
      <GewerbeWarumSection />
      <GewerbeReferenzenSection />
      <GewerbeFAQSection />
    </>
  );
}
