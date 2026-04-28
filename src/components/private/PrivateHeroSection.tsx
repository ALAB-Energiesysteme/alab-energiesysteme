import HeroCardShowcase, {
  type HeroCardShowcaseItem,
} from "@/components/HeroCardShowcase";

const PRIVATE_HERO_CARDS: HeroCardShowcaseItem[] = [
  {
    title: "Photovoltaik für Zuhause",
    subtitle: "Individuell geplant für Ihr Eigenheim",
    text: "Sauber ausgelegte Solaranlagen für Dachflächen, Verbrauchsprofil und langfristige Wirtschaftlichkeit.",
    image: "/pv-fuer-zuhause-hero.png",
  },
  {
    title: "Stromspeicher & Autarkie",
    subtitle: "Mehr Eigenverbrauch, weniger Netzbezug",
    text: "Speicherlösungen, die Ihren Solarstrom gezielt in die Abend- und Nachtstunden verlängern.",
    image: "/batteriespeicher-autarkie.png",
  },
  {
    title: "Wallbox & E-Mobilität",
    subtitle: "Solarstrom direkt ins Fahrzeug laden",
    text: "Intelligente Wallbox-Konzepte für komfortables Laden zu Hause und eine saubere PV-Kopplung.",
    image: "/wallbox-bild.png",
  },
];

export default function PrivateHeroSection() {
  return (
    <HeroCardShowcase
      title="PHOTOVOLTAIK FÜR ZUHAUSE"
      description="Erzeugen Sie Ihren eigenen Strom, senken Sie dauerhaft Ihre Energiekosten und schaffen Sie ein ruhig geplantes Energiesystem mit hochwertiger Technik."
      heroImage="/img/men%C3%BC/pv-zuhause.jpeg"
      heroImageAlt="Photovoltaikanlage auf einem Wohnhaus"
      cards={PRIVATE_HERO_CARDS}
    />
  );
}
