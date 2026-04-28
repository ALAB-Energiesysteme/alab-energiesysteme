import HeroCardShowcase, {
  type HeroCardShowcaseItem,
} from "@/components/HeroCardShowcase";

const GEWERBE_HERO_CARDS: HeroCardShowcaseItem[] = [
  {
    title: "PV für Gewerbedächer",
    subtitle: "Skalierbar für Hallen und Betriebe",
    text: "Wirtschaftlich geplante Photovoltaiksysteme für Gewerbeflächen, Eigenverbrauch und langfristige Kostensicherheit.",
    image: "/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach1.avif",
  },
  {
    title: "Speicher & Lastmanagement",
    subtitle: "Verbrauch intelligent optimieren",
    text: "Mehr Eigenverbrauch, saubere Lastprofile und ein Energiesystem, das auch im laufenden Betrieb ruhig funktioniert.",
    image: "/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach2.avif",
  },
  {
    title: "Monitoring & Service",
    subtitle: "Dauerhaft wirtschaftlich betreiben",
    text: "Von Live-Daten bis Wartung: Wir begleiten Ihre Anlage so, dass Verfügbarkeit, Transparenz und Ertrag zusammenpassen.",
    image: "/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach3.avif",
  },
];

export default function GewerbeHeroSection() {
  return (
    <HeroCardShowcase
      title="PHOTOVOLTAIK FÜR GESCHÄFTSKUNDEN"
      description="Machen Sie Ihr Unternehmen unabhängig von steigenden Energiepreisen – mit einer maßgeschneiderten PV-Anlage für Gewerbe, Hallen und Betriebsstandorte."
      heroImage="/img/men%C3%BC/pv-gewerbe.jpeg"
      heroImageAlt="Photovoltaikanlage auf einem Gewerbedach"
      cards={GEWERBE_HERO_CARDS}
    />
  );
}
