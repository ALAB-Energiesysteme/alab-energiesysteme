"use client";

export interface HeroCardShowcaseItem {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  href?: string;
  imageAlt?: string;
  imageMode?: "cover" | "contain";
  imageBgClassName?: string;
}

interface HeroCardShowcaseProps {
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt?: string;
  cards: HeroCardShowcaseItem[];
}

function HeroCard({ card }: { card: HeroCardShowcaseItem }) {
  const cardContent = (
    <>
      <div
        className={`flex h-[220px] w-full items-center justify-center overflow-hidden ${
          card.imageBgClassName ?? "bg-[#eef4fc]"
        }`}
      >
        <img
          src={card.image}
          alt={card.imageAlt ?? card.title}
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
            card.imageMode === "contain" ? "object-contain p-5" : "object-cover"
          }`}
        />
      </div>
      <div className="p-7">
        <h3 className="mb-2 text-[1.4rem] font-bold text-ink">{card.title}</h3>
        <p className="mb-4 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-accent">
          {card.subtitle}
        </p>
        <p className="text-[0.95rem] leading-[1.65] text-muted">{card.text}</p>
      </div>
    </>
  );

  const className =
    "group overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_10px_40px_rgba(15,37,51,0.12)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,37,51,0.18)]";

  if (card.href) {
    return (
      <a href={card.href} className={className}>
        {cardContent}
      </a>
    );
  }

  return <article className={className}>{cardContent}</article>;
}

export default function HeroCardShowcase({
  title,
  description,
  heroImage,
  heroImageAlt = "",
  cards,
}: HeroCardShowcaseProps) {
  return (
    <>
      <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden max-[900px]:h-[60vh] max-[900px]:min-h-[450px]">
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-ink/30 via-ink/50 to-ink/70" />

        <div className="relative z-[3] flex h-full flex-col items-center justify-center px-7 pt-[100px] pb-[60px] text-center">
          <h1 className="m-0 max-w-[1100px] text-[clamp(2.35rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.3)]">
            {title}
          </h1>
          <p className="mt-5 max-w-[640px] text-[clamp(1rem,1.8vw,1.15rem)] font-medium leading-[1.8] text-white/85">
            {description}
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-[120px] px-7 pb-20 max-[1000px]:-mt-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-3 gap-[30px] max-[1000px]:mx-auto max-[1000px]:max-w-[500px] max-[1000px]:grid-cols-1 max-[1000px]:gap-6">
          {cards.map((card) => (
            <HeroCard key={card.title} card={card} />
          ))}
        </div>
      </section>
    </>
  );
}
