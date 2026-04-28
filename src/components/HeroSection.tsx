"use client";

export default function HeroSection() {
  return (
    <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden max-[900px]:h-[60vh] max-[900px]:min-h-[450px] max-[479px]:h-[52vh] max-[479px]:min-h-[360px]">
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onEnded={(event) => {
          event.currentTarget.currentTime = 0;
          void event.currentTarget.play();
        }}
      >
        <source src="/homepage-video-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-ink/30 via-ink/50 to-ink/70" />

      <div className="relative z-[3] flex h-full flex-col items-center justify-center px-5 pb-[60px] pt-[100px] text-center max-[767px]:px-4 max-[767px]:pb-10 max-[767px]:pt-20">
        <h1 className="m-0 text-[clamp(1.75rem,6vw,4.5rem)] font-light uppercase tracking-[0.15em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.3)] max-[479px]:tracking-[0.1em]">
          Energie im Fokus
        </h1>
        <p className="mt-4 max-w-[640px] text-[clamp(0.9rem,2vw,1.3rem)] leading-relaxed text-white/90 max-[767px]:mt-3">
          Ihr Ingenieurbüro &amp; Elektrofachbetrieb für innovative Energielösungen –
          von der Gebäudeinstallation bis zur nachhaltigen Solarenergie.
        </p>
      </div>
    </section>
  );
}
