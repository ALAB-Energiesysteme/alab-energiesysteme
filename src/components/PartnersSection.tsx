"use client";

const PARTNERS = [
  {
    src: "https://static.wixstatic.com/media/cac2b9_30a0f5509bd94f38baebd03f74921168~mv2.png",
    alt: "Partner 1",
  },
  {
    src: "https://static.wixstatic.com/media/cac2b9_67051ace07f749c6a537597702eac410~mv2.png",
    alt: "Partner 2",
  },
  {
    src: "https://static.wixstatic.com/media/cac2b9_44893d70e92d43e5ae9c43fb9327dadc~mv2.png",
    alt: "Partner 4",
  },
  {
    src: "https://static.wixstatic.com/media/cac2b9_32aeac9dd267408e9d25aeb2416fd957~mv2.png",
    alt: "Partner 5",
  },
];

// Duplicate for seamless loop
const ALL_PARTNERS = [...PARTNERS, ...PARTNERS];

export default function PartnersSection() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-[50px] text-center">
          <h2 className="mb-3 text-[2.2rem] font-bold text-[#1e3a5f]">
            Unsere Partner
          </h2>
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-gold">
            Zusammenarbeit auf Augenhöhe
          </p>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-5 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-[2] before:w-[100px] before:bg-gradient-to-r before:from-white before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-[2] after:w-[100px] after:bg-gradient-to-l after:from-white after:to-transparent">
          <ul className="flex w-max animate-marquee items-center gap-20 list-none">
            {ALL_PARTNERS.map((partner, i) => (
              <li key={`${partner.alt}-${i}`} className="shrink-0">
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-[90px] w-auto opacity-80 transition-all duration-300 hover:scale-105 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
