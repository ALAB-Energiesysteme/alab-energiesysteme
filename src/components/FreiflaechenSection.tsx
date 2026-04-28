"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function FreiflaechenSection() {
  /* ── Carousel state ── */
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showSlide = useCallback(
    (i: number) => {
      const idx = ((i % totalSlides) + totalSlides) % totalSlides;
      setCurrentSlide(idx);
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${-idx * 100}%)`;
      }
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => showSlide(currentSlide + 1), [currentSlide, showSlide]);
  const prevSlide = useCallback(() => showSlide(currentSlide - 1), [currentSlide, showSlide]);

  /* Autoplay */
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(${-next * 100}%)`;
        }
        return next;
      });
    }, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [totalSlides]);

  const pauseAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };
  const resumeAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(${-next * 100}%)`;
        }
        return next;
      });
    }, 5000);
  };

  /* ── FAQ state ── */
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  /* ── Contact modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const openContactModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeContactModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
  };

  const handleFormSubmit = () => {
    if (!formRef.current) return;
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    setSubmitLoading(true);
    /* iframe onLoad triggers success */
  };

  const handleIframeLoad = () => {
    if (submitLoading) {
      setSubmitLoading(false);
      setFormSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setConsentChecked(false);
    if (formRef.current) formRef.current.reset();
  };

  /* ── Smooth scroll helper ── */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ── Side nav active state ── */
  const [activeNav, setActiveNav] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("#alab-freiflaechen section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) current = section.id;
      });
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Particles ── */
  const particlesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = particlesRef.current;
    if (!wrap) return;
    for (let i = 0; i < 30; i++) {
      const el = document.createElement("div");
      el.className = "particle";
      el.style.cssText = `
        position:absolute;border-radius:50%;
        width:${Math.random() * 4 + 2}px;height:${Math.random() * 4 + 2}px;
        background:rgba(255,255,255,${Math.random() * 0.5 + 0.2});
        left:${Math.random() * 100}%; top:${Math.random() * 100}%;
        animation: ff-float ${Math.random() * 10 + 10}s linear infinite;
      `;
      wrap.appendChild(el);
    }
  }, []);

  /* ── AOS init ── */
  useEffect(() => {
    const loadAOS = async () => {
      try {
        // @ts-ignore
        const AOS = (await import("aos")).default;
        // @ts-ignore
        await import("aos/dist/aos.css");
        AOS.init({ duration: 1000, once: false, offset: 100, easing: "ease-out-cubic" });
      } catch (e) {
        /* AOS not available */
      }
    };
    loadAOS();
  }, []);

  /* ── Process toggle on mobile ── */
  const [activeProcess, setActiveProcess] = useState<number | null>(null);
  const toggleProcess = (index: number) => {
    setActiveProcess((prev) => (prev === index ? null : index));
  };

  const cssString = `
/* === ALAB Freiflächen – vollständige Styles (Wix -> 11ty) === */

/* Farb-Variablen */
:root{
  --alab-gold:#d4af37; --alab-blue:#5b8def; --alab-dark-blue:#2c5aa0;
  --alab-ink:#0f2533; --alab-gray:#5b6b78; --alab-light-gray:#f8f9fa; --alab-white:#fff;
  --gradient-gold:linear-gradient(135deg,#d4af37 0%,#f4d03f 100%);
  --gradient-blue:linear-gradient(135deg,#5b8def 0%,#2c5aa0 100%);
  --gradient-dark:linear-gradient(135deg,#0f2533 0%,#1a3a52 100%);
  --shadow-sm:0 2px 4px rgba(0,0,0,.05);
  --shadow-md:0 4px 6px rgba(0,0,0,.07);
  --shadow-lg:0 10px 20px rgba(0,0,0,.10);
  --shadow-xl:0 20px 40px rgba(0,0,0,.15);
  --white:var(--alab-white); --gray:var(--alab-gray); --gray-light:var(--alab-light-gray);
  --gray-dark:var(--alab-ink); --primary:var(--alab-ink); --accent:var(--alab-gold);
  --success:#16a34a; --gradient-primary:var(--gradient-blue);
}

/* ===== Side Navigation ===== */
.side-nav{
  position:fixed; right:2rem; top:50%; transform:translateY(-50%);
  background:rgba(255,255,255,.95); backdrop-filter:blur(20px);
  padding:2rem 1.5rem; border-radius:20px; box-shadow:0 10px 40px rgba(0,0,0,.1);
  z-index:1000; min-width:160px;
}
.side-nav-logo{ text-align:center; margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:2px solid rgba(212,175,55,.2) }
.side-nav-logo h3{ font-size:1.5rem; font-weight:800; color:var(--alab-ink) }
.side-nav-logo span{ color:var(--alab-gold); display:block; font-size:.9rem; font-weight:500; margin-top:.25rem }
.side-nav-menu{ display:flex; flex-direction:column; gap:.5rem }
.nav-item{
  position:relative; padding:.75rem 1rem; color:var(--alab-gray); text-decoration:none; font-weight:600;
  font-size:.95rem; transition:.3s; border-radius:10px; text-align:center; display:block; cursor:pointer;
}
.nav-item:hover{ background:rgba(212,175,55,.1); color:var(--alab-gold) }
.nav-item.active{ background:var(--gradient-gold); color:#fff }
.nav-cta{ margin-top:1rem; padding-top:1rem; border-top:1px solid rgba(212,175,55,.2) }
.nav-cta .nav-item{ background:var(--gradient-gold); color:#fff }
.nav-cta .nav-item:hover{ transform:translateY(-2px); box-shadow:0 10px 25px rgba(212,175,55,.3) }

/* ===== Hero ===== */
.hero-modern{ min-height:100vh; position:relative; display:flex; align-items:center; overflow:hidden }
.hero-background{ position:absolute; inset:0; background:var(--gradient-blue); z-index:-1 }
.hero-overlay{ position:absolute; inset:0; background:rgba(15,37,51,.7) }
.hero-content-modern{
  max-width:1400px; margin:0 auto; padding:6rem 2rem;
  position:relative; z-index:1; display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;
}
.hero-text-modern{ max-width:700px; position:relative; z-index:2 }
.hero-badge-modern{
  display:inline-block; padding:.5rem 1rem; background:rgba(212,175,55,.2); border:1px solid var(--alab-gold);
  border-radius:30px; color:#fff; font-size:.875rem; font-weight:700; letter-spacing:1px; margin-bottom:2rem; backdrop-filter:blur(10px);
}
.hero-title-modern{ font-size:3.5rem; font-weight:800; line-height:1.2; color:#fff; margin-bottom:1.5rem }
.text-gradient{ background:var(--gradient-gold); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text }
.hero-description-modern{ font-size:1.25rem; color:rgba(255,255,255,.9); line-height:1.8; margin-bottom:2.5rem }
.hero-cta-group{ display:flex; gap:1rem; flex-wrap:wrap }
.btn-modern{ padding:1rem 2rem; border-radius:30px; font-weight:700; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:.75rem; transition:.3s; font-family:inherit; font-size:inherit; }
.btn-primary-modern{ background:#fff; color:var(--alab-ink) }
.btn-primary-modern:hover{ transform:translateY(-3px); box-shadow:var(--shadow-xl) }
.btn-secondary-modern{ background:transparent; color:#fff; border:2px solid rgba(255,255,255,.3); backdrop-filter:blur(10px) }
.btn-secondary-modern:hover{ background:rgba(255,255,255,.1); border-color:#fff }

.hero-image-3d{ position:relative; perspective:1000px; height:600px }
.hero-image-placeholder{
  width:100%; height:100%; background:url('/assets/img/freiflaechen/freiflaeche_blau.png') center/cover; border-radius:20px;
  transform:rotateY(-15deg) rotateX(5deg); transform-style:preserve-3d; transition:transform .6s;
  box-shadow:20px 20px 60px rgba(0,0,0,.3), -20px -20px 60px rgba(255,255,255,.1); position:relative; overflow:visible;
}
.hero-image-placeholder:hover{ transform:rotateY(-10deg) rotateX(3deg) }
.hero-text-overlay{
  position:absolute; bottom:-50px; left:-50px; background:rgba(212,175,55,.95); backdrop-filter:blur(10px);
  padding:2rem; border-radius:15px; max-width:350px; transform:translateZ(50px); box-shadow:0 20px 40px rgba(0,0,0,.2);
}
.hero-text-overlay h3{ color:#fff; font-size:1.2rem; margin-bottom:.5rem }
.hero-text-overlay p{ color:rgba(255,255,255,.9); font-size:.95rem; line-height:1.5 }

.scroll-indicator-modern{ position:absolute; bottom:2rem; left:50%; transform:translateX(-50%); animation:bounce 2s infinite }
.mouse{ width:30px; height:50px; border:2px solid rgba(255,255,255,.5); border-radius:20px; position:relative }
.wheel{ width:4px; height:10px; background:rgba(255,255,255,.5); border-radius:2px; position:absolute; top:10px; left:50%; transform:translateX(-50%); animation:scroll 2s infinite }

/* ===== Container + Section Header ===== */
#alab-freiflaechen .container{ max-width:1400px; margin:0 auto; padding:0 2rem }
.section-header-modern{ text-align:center; margin-bottom:4rem }
.section-label{ display:inline-block; padding:.5rem 1rem; background:var(--gradient-gold); color:#fff; border-radius:30px; font-size:.75rem; font-weight:700; letter-spacing:2px; margin-bottom:1rem }
.section-title-modern{ font-size:2.5rem; font-weight:800; color:var(--alab-ink); margin-bottom:1rem }
.section-subtitle-modern{ font-size:1.125rem; color:var(--alab-gray); max-width:600px; margin:0 auto }

/* ===== Services ===== */
.services-modern{ padding:5rem 0; background:var(--gray-light) }
.services-grid-modern{ display:grid; grid-template-columns:repeat(auto-fit,minmax(350px,1fr)); gap:2rem; margin-bottom:4rem }
.service-card-modern{
  background:#fff; padding:2rem; border-radius:20px; position:relative; overflow:hidden; transition:.3s; cursor:pointer;
}
.service-card-modern::before{
  content:""; position:absolute; top:0; left:0; right:0; height:4px; background:var(--gradient-blue); transform:scaleX(0); transition:.3s
}
.service-card-modern:hover{ transform:translateY(-10px); box-shadow:var(--shadow-xl) }
.service-card-modern:hover::before{ transform:scaleX(1) }
.service-icon-modern{ width:60px; height:60px; background:var(--gradient-gold); border-radius:15px; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem; transition:.6s cubic-bezier(.68,-.55,.265,1.55) }
.service-icon-modern i{ font-size:1.5rem; color:#fff }
.service-card-modern:hover .service-icon-modern{ transform:rotate(360deg) scale(1.1) }
.service-card-modern h3{ font-size:1.25rem; font-weight:700; color:var(--alab-ink); margin-bottom:1rem }
.service-card-modern p{ color:var(--alab-gray); line-height:1.6 }
.service-hover-content{
  position:absolute; bottom:0; left:0; right:0; background:var(--gradient-blue); color:#fff; padding:1.5rem; transform:translateY(100%); transition:.3s
}
.service-card-modern:hover .service-hover-content{ transform:translateY(0) }
.service-hover-content ul{ list-style:none; margin:0; padding:0; }
.service-hover-content li{ padding:.25rem 0; font-size:.9rem }
.service-hover-content li::before{ content:'\\2192 '; margin-right:.5rem }

/* ===== Technische Leistungen (Carousel) ===== */
.technical-services-modern{ margin-top:4rem; padding-top:4rem; border-top:2px solid rgba(212,175,55,.2); overflow:hidden }
.subsection-title{ text-align:center; font-size:1.75rem; font-weight:700; color:var(--alab-ink); margin-bottom:3rem }
.tech-carousel-container{ position:relative; max-width:1200px; margin:0 auto; padding:0 4rem; overflow:hidden; border-radius:20px }
.tech-carousel{ display:flex; gap:0; transition:transform .5s cubic-bezier(.4,0,.2,1) }
.tech-carousel-item{ min-width:100%; display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; padding:0 1rem; box-sizing:border-box }

.tech-3d-image{ perspective:1500px; height:500px; position:relative }
.tech-image-placeholder{
  width:100%; height:100%; background-size:cover; background-position:center; border-radius:20px;
  transform:rotateY(15deg) rotateX(-5deg); transform-style:preserve-3d; transition:transform .6s;
  box-shadow:25px 25px 50px rgba(0,0,0,.25), -15px -15px 30px rgba(255,255,255,.1); position:relative; display:flex; align-items:center; justify-content:center;
}
.tech-image-placeholder[data-service="Planung"]{ background-image:url('/assets/img/freiflaechen/freiflaechen_planung.png') }
.tech-image-placeholder[data-service="Genehmigung"]{ background-image:url('/assets/img/freiflaechen/freiflaechen_planung2.png') }
.tech-image-placeholder[data-service="Bau"]{ background-image:url('/assets/img/freiflaechen/freiflaechen_planung3.png') }
.tech-image-placeholder[data-service="Finanzierung"]{ background-image:url('/assets/img/freiflaechen/freiflaechen_planung4.png') }
.tech-image-placeholder[data-service="Wartung"]{ background-image:url('/assets/img/freiflaechen/freiflaechen_planung5.png') }
.tech-image-placeholder:hover{ transform:rotateY(10deg) rotateX(-3deg) scale(1.02) }

.tech-content-overlay{
  position:absolute; bottom:30px; right:-80px; background:#fff; padding:2rem; border-radius:15px; max-width:320px;
  transform:translateZ(60px); box-shadow:0 20px 40px rgba(0,0,0,.15); border:2px solid var(--alab-gold)
}
.tech-content-overlay h4{ color:var(--alab-ink); font-size:1.1rem; margin-bottom:1rem; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap }
.tech-content-overlay .tech-icon{ width:40px; height:40px; background:var(--gradient-gold); border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0 }
.tech-content-overlay .tech-icon i{ color:#fff; font-size:1.2rem }
.tech-content-overlay p{ color:var(--alab-gray); line-height:1.6 }

.tech-content-detail{ flex:1; padding:2rem }
.tech-content-detail h3{ font-size:2rem; color:var(--alab-ink); margin-bottom:1rem }
.tech-content-detail p{ color:var(--alab-gray); font-size:1.1rem; line-height:1.8; margin-bottom:2rem }
.tech-features{ list-style:none; display:grid; gap:1rem; margin:0; padding:0; }
.tech-features li{ padding-left:2rem; position:relative; color:var(--alab-ink); font-weight:500 }
.tech-features li::before{ content:'\\2713'; position:absolute; left:0; color:var(--alab-gold); font-weight:700; font-size:1.2rem }

/* Carousel Controls */
.carousel-controls{ display:flex; justify-content:center; gap:1rem; margin-top:3rem }
.carousel-btn{
  width:50px; height:50px; border-radius:50%; background:#fff; border:2px solid var(--alab-gold);
  display:flex; align-items:center; justify-content:center; cursor:pointer; transition:.3s
}
.carousel-btn:hover{ background:var(--gradient-gold); transform:scale(1.1) }
.carousel-btn i{ color:var(--alab-ink); font-size:1.2rem }
.carousel-btn:hover i{ color:#fff }
.carousel-dots{ display:flex; align-items:center; gap:.5rem }
.carousel-dot{ width:10px; height:10px; border-radius:50%; background:var(--alab-gray); opacity:.3; transition:.3s; cursor:pointer; display:inline-block; border:none; }
.carousel-dot.active{ width:30px; border-radius:15px; background:var(--gradient-gold); opacity:1 }

/* ===== Prozess ===== */
.process-modern{ padding:5rem 0; background:#fff }
.process-timeline-modern{ position:relative; max-width:1000px; margin:0 auto }
.timeline-line{ position:absolute; left:30px; top:0; bottom:0; width:2px; background:var(--gradient-blue) }
.process-item-modern{ display:flex; gap:3rem; margin-bottom:3rem; position:relative }
.process-number-modern{
  width:60px; height:60px; background:var(--gradient-gold); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-weight:700; font-size:1.25rem; flex-shrink:0; position:relative; z-index:1
}
.process-content-modern{ flex:1; padding:1.5rem; background:var(--gray-light); border-radius:15px; transition:.3s; position:relative }
.process-content-modern:hover{ background:#fff; box-shadow:var(--shadow-lg) }
.process-content-modern h3{ font-size:1.5rem; font-weight:700; color:var(--alab-ink); margin-bottom:1rem }
.process-content-modern p{ color:var(--alab-gray); margin-bottom:1rem }
.process-details-modern{ max-height:0; overflow:hidden; transition:.5s; opacity:0; margin-top:0 }
.process-content-modern:hover .process-details-modern{ max-height:500px; margin-top:1rem; opacity:1 }
.process-details-modern h4{ font-size:1rem; color:var(--alab-blue); margin-bottom:.5rem }
.process-details-modern ul{ list-style:none; margin:0; padding:0; }
.process-details-modern li{ padding:.25rem 0; color:var(--alab-ink); font-size:.9rem }
.process-details-modern li::before{ content:'\\2713 '; color:var(--success); margin-right:.5rem }

/* ===== Benefits ===== */
.benefits-modern{ padding:5rem 0; background:linear-gradient(135deg, rgba(212,175,55,.05) 0%, rgba(91,141,239,.05) 100%) }
.benefits-grid-modern{ display:grid; grid-template-columns:repeat(auto-fit,minmax(350px,1fr)); gap:2rem }
.benefit-card-modern{ background:#fff; padding:2rem; border-radius:20px; position:relative; transition:.3s; overflow:hidden }
.benefit-card-modern::before{
  content:""; position:absolute; top:-100%; left:-100%; width:300%; height:300%;
  background:radial-gradient(circle, rgba(102,126,234,.1) 0%, transparent 70%); transition:.5s
}
.benefit-card-modern:hover::before{ top:-150%; left:-150%; transform:rotate(45deg) }
.benefit-card-modern:hover{ transform:translateY(-10px); box-shadow:var(--shadow-xl) }
.benefit-icon-modern{ width:70px; height:70px; background:var(--gradient-gold); border-radius:20px; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem }
.benefit-icon-modern i{ font-size:2rem; color:#fff }
.benefit-card-modern h3{ font-size:1.25rem; font-weight:700; color:var(--alab-ink); margin-bottom:1rem }
.benefit-card-modern p{ color:var(--alab-gray); line-height:1.6; margin-bottom:1rem }
.benefit-stats{ display:flex; gap:1rem; margin-top:1rem }
.benefit-stats span{ padding:.25rem .75rem; background:rgba(212,175,55,.1); color:var(--alab-gold); border-radius:15px; font-size:.875rem; font-weight:700 }

/* ===== FAQ ===== */
.faq-modern{ padding:5rem 0; background:#fff }
.faq-wrapper{ display:grid; grid-template-columns:1fr 2fr; gap:4rem; align-items:start; max-width:1200px; margin:0 auto }
.faq-image-placeholder{
  width:100%; height:500px; background:url('/assets/img/freiflaechen/freiflaeche_blau_fragezeichen.png') center/cover;
  border-radius:20px; position:relative; overflow:hidden; box-shadow:var(--shadow-lg)
}
.faq-content{ display:flex; flex-direction:column; gap:1rem }
.faq-item{ background:#fff; border-radius:15px; overflow:hidden; box-shadow:var(--shadow-sm); transition:.3s }
.faq-item:hover{ box-shadow:var(--shadow-md) }
.faq-question{ padding:1.5rem; cursor:pointer; display:flex; align-items:center; gap:1rem; transition:.3s }
.faq-question:hover{ background:rgba(212,175,55,.05) }
.faq-question i{ color:var(--alab-gold); font-size:1.2rem; transition:.3s }
.faq-item.active .faq-question i{ transform:rotate(45deg) }
.faq-question h3{ font-size:1.1rem; font-weight:700; color:var(--alab-ink); margin:0 }
.faq-answer{ max-height:0; overflow:hidden; transition:.5s }
.faq-item.active .faq-answer{ max-height:300px; padding:0 1.5rem 1.5rem }
.faq-answer p{ color:var(--alab-gray); line-height:1.6; margin:0 }

/* ===== Modal ===== */
.lightbox-modal{ display:none; position:fixed; inset:0; background:rgba(0,0,0,.8); z-index:9999; justify-content:center; align-items:center; backdrop-filter:blur(5px) }
.lightbox-modal.show{ display:flex; animation:fadeIn .3s ease }
.lightbox-content{ background:#fff; border-radius:20px; padding:3rem; max-width:500px; width:90%; position:relative; box-shadow:0 30px 60px rgba(0,0,0,.3); animation:slideUp .3s ease }
.lightbox-close{
  position:absolute; top:1.5rem; right:1.5rem; width:40px; height:40px; border-radius:50%; background:var(--alab-light-gray);
  border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:.3s
}
.lightbox-close:hover{ background:var(--gradient-gold); transform:rotate(90deg) }
.lightbox-close i{ font-size:1.2rem; color:var(--alab-ink) }
.lightbox-close:hover i{ color:#fff }
.contact-form{ display:flex; flex-direction:column; gap:1.5rem }
.contact-form h2{ color:var(--alab-ink); font-size:2rem; margin-bottom:1rem; text-align:center }
.form-group{ display:flex; flex-direction:column; gap:.5rem }
.form-group label{ color:var(--alab-ink); font-weight:700; font-size:.95rem }
.form-group input,.form-group textarea{
  padding:.75rem 1rem; border:2px solid rgba(212,175,55,.2); border-radius:10px; font:inherit; font-size:1rem; transition:.3s
}
.form-group input:focus,.form-group textarea:focus{ outline:none; border-color:var(--alab-gold); box-shadow:0 0 0 3px rgba(212,175,55,.1) }
.form-group textarea{ resize:vertical; min-height:120px }
.form-submit{ background:var(--gradient-gold); color:#fff; padding:1rem 2rem; border:none; border-radius:50px; font-size:1.1rem; font-weight:700; cursor:pointer; transition:.3s; margin-top:1rem; font-family:inherit; }
.form-submit:hover{ transform:translateY(-3px); box-shadow:0 10px 30px rgba(212,175,55,.3) }
.form-submit:disabled{ opacity:.5; cursor:not-allowed; transform:none; }
/* Danke-Block */
.form-success{ display:none; text-align:center; padding:2rem; border-radius:16px; background:linear-gradient(135deg, rgba(91,141,239,.08), rgba(212,175,55,.08)); border:1px solid rgba(212,175,55,.35); box-shadow:0 10px 30px rgba(0,0,0,.15) }
.form-success.show{ display:block; animation:popIn .35s ease both; margin-top:1rem }
.form-success .success-icon{ width:76px;height:76px;border-radius:999px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;background:var(--gradient-gold);color:#fff;box-shadow:0 10px 24px rgba(212,175,55,.35);font-size:1.5rem }
.form-success h3{ margin:.25rem 0 .5rem; font-size:1.4rem; color:var(--alab-ink) }
.form-success p{ margin:0; color:var(--alab-gray) }
.form-success .actions{ margin-top:1rem; display:flex; gap:.75rem; justify-content:center; flex-wrap:wrap }
.form-success .btn-close,.form-success .btn-again{
  background:var(--gradient-gold); color:#fff; border:none; border-radius:999px; padding:.75rem 1.25rem; font-weight:700; cursor:pointer;
  box-shadow:0 8px 22px rgba(212,175,55,.3); transition:.2s; font-family:inherit;
}
.form-success .btn-close:hover,.form-success .btn-again:hover{ transform:translateY(-2px); box-shadow:0 14px 28px rgba(212,175,55,.35) }

/* ===== Animations ===== */
@keyframes bounce{0%,20%,50%,80%,100%{transform:translateX(-50%) translateY(0)}40%{transform:translateX(-50%) translateY(-10px)}60%{transform:translateX(-50%) translateY(-5px)}}
@keyframes scroll{0%{opacity:0;transform:translateX(-50%) translateY(0)}10%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(15px)}}
@keyframes fadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes popIn{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}
@keyframes ff-float{
  0%{transform:translateY(0) translateX(0);opacity:0}
  10%{opacity:1} 90%{opacity:1}
  100%{transform:translateY(-100vh) translateX(50px);opacity:0}
}

/* === Freiflächen Overrides: Text bewusst schwarz === */
.hero-title-modern{ color:#000; }
.hero-description-modern{ color:#000; }

.btn-secondary-modern{
  color:#000;
  border-color:rgba(0,0,0,.35);
}
.btn-secondary-modern:hover{
  color:#000;
  border-color:#000;
  background:rgba(0,0,0,.06);
}

.hero-title-modern .text-gradient{
  -webkit-text-fill-color: initial;
}
.hero-title-modern .text-gradient{
  background: none !important;
  color: var(--alab-gold) !important;
  -webkit-text-fill-color: var(--alab-gold) !important;
}

.hero-modern .btn-secondary-modern{
  background: transparent;
  color: var(--alab-ink);
  border: 2px solid rgba(15,37,51,.22);
}

.hero-modern .btn-secondary-modern:hover{
  background: rgba(15,37,51,.05);
  border-color: rgba(15,37,51,.36);
}

/* Gleich breite Kontakt-Buttons */
.contact-cta{
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 24px;
  max-width: 720px;
  margin: 1rem auto 0;
  align-items: center;
}
.contact-cta .btn-modern{
  width: 100%;
  height: 56px;
  border-radius: 999px;
  padding: 0 24px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  text-decoration: none;
}
.contact-cta .btn-modern i{ font-size: 1rem; }

.btn-white,
.btn-primary-modern{
  background: var(--alab-white);
  color: var(--alab-ink);
  border: none;
}

@media (max-width: 640px){
  .contact-cta{ grid-template-columns: 1fr; }
}

/* DSGVO-Einwilligung */
.consent-row{
  display:flex;
  align-items:flex-start;
  gap:.75rem;
  margin:.25rem 0 1rem;
}
.consent-row input[type="checkbox"]{
  width:18px;height:18px; flex:0 0 auto; margin-top:.2rem;
  accent-color: var(--alab-gold);
}
.consent-row label{
  font-family: 'Montserrat', sans-serif;
  font-size:.95rem; line-height:1.45;
  color: var(--alab-ink); font-weight:600;
}
.consent-row a{ color: var(--alab-blue); text-decoration: underline; }
.consent-row .asterisk{ color: var(--alab-gold); margin-left:2px; }

/* Freiflächen: Kontakt-Modal kompakter */
#contactModal .lightbox-content{
  max-width: 460px;
  width: calc(100% - 48px);
  padding: 24px;
  border-radius: 16px;
}
#contactModal .contact-form{ gap: 12px; }

#contactModal .form-group input,
#contactModal .form-group textarea{
  padding: .6rem .8rem;
  font-size: .95rem;
}
#contactModal .form-group textarea{ min-height: 110px; }

#contactModal .form-submit{
  width: auto;
  align-self: center;
  padding: .75rem 1.25rem;
  font-size: 1rem;
}

#contactModal .privacy-row{
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: start;
  gap: .5rem;
  font-size: .9rem;
  line-height: 1.4;
}
#contactModal .privacy-row input[type="checkbox"]{ margin-top: .2rem; }

#contactForm{ max-width: 640px; margin: 0 auto; }

@media (max-width: 420px){
  #contactModal .lightbox-content{ max-width: 96%; padding: 20px; }
}

/* ===== Responsive ===== */
@media (max-width:1024px){
  .hero-title-modern{ font-size:2.5rem }
  .hero-content-modern{ grid-template-columns:1fr }
  .hero-image-3d{ height:400px; margin-top:2rem }
  .tech-carousel-item{ grid-template-columns:1fr }
  .tech-3d-image{ height:350px }
  .tech-content-overlay{ right:20px; max-width:280px }
}
@media (max-width:768px){
  .hero-title-modern{ font-size:2rem }
  .hero-stats-modern{ grid-template-columns:1fr }
  .services-grid-modern,.benefits-grid-modern{ grid-template-columns:1fr }
  .faq-wrapper{ grid-template-columns:1fr; gap:2rem }
}

/* ===== Freiflächen – Hero mobil: Vollbreit + goldener Block unten ===== */
@media (max-width: 1024px){
  .hero-content-modern{
    display:grid;
    grid-template-columns:1fr !important;
    gap:16px;
  }

  .hero-image-3d{
    order:-1;
    position:relative;
    width:100vw;
    height:clamp(460px, 86vh, 620px);
    margin:0 calc(50% - 50vw);
    perspective:none;
  }

  .hero-image-3d .hero-image-placeholder{
    height:100%;
    width:100%;
    transform:none !important;
    background-position:center;
    border-radius:0 0 20px 20px;
    box-shadow:0 10px 28px rgba(0,0,0,.12);
  }

  .hero-image-3d .hero-text-overlay{
    position:absolute !important;
    left:16px; right:16px; bottom:16px;
    top:auto;
    transform:none !important;
    max-width:none;
    margin:0;
  }
}

@media (max-width: 1024px){
  #alab-freiflaechen .hero-content-modern{
    padding: 0 2rem 16px !important;
  }
  #alab-freiflaechen .hero-modern{
    padding-top: 0 !important;
  }
  #alab-freiflaechen .hero-image-3d{
    margin-top: 0 !important;
  }
}

@media (max-width: 1024px){
  .side-nav{ display: none !important; }
}

/* Freiflächen – Überschrift auf Mobile kleiner */
@media (max-width: 768px){
  #alab-freiflaechen .section-title-modern,
  #alab-freiflaechen .section-header-modern h1,
  #alab-freiflaechen .section-header-modern h2{
    font-size: clamp(1.25rem, 7vw, 1.85rem);
    line-height: 1.22;
    text-wrap: balance;
  }
}

@media (max-width: 420px){
  #alab-freiflaechen .section-title-modern,
  #alab-freiflaechen .section-header-modern h1,
  #alab-freiflaechen .section-header-modern h2{
    font-size: clamp(1.15rem, 7.5vw, 1.6rem);
  }
  #alab-freiflaechen .section-header-modern{ margin-bottom: 24px; }
}


/* ==== Technische Leistungen – MOBILE ONLY (<=768px) ==== */
@media (max-width: 768px){
  #alab-freiflaechen .technical-services-modern{ overflow: visible; }
  #alab-freiflaechen .tech-carousel-container{
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }
  #alab-freiflaechen .tech-carousel{
    display: grid !important;
    grid-auto-flow: column !important;
    grid-auto-columns: 100% !important;
    gap: 0 !important;
    padding: 0 !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    -webkit-overflow-scrolling: touch !important;
    transform: none !important;
  }
  #alab-freiflaechen .tech-carousel-item{
    min-width: 100% !important;
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 10px !important;
    padding: 0 !important;
    scroll-snap-align: start !important;
  }

  #alab-freiflaechen .tech-3d-image{
    width: 100% !important;
    aspect-ratio: 16 / 9 !important;
    height: auto !important;
    margin: 0 0 8px !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    perspective: none !important;
    box-shadow: var(--shadow-lg);
  }
  #alab-freiflaechen .tech-image-placeholder{
    width: 100% !important;
    height: 100% !important;
    background-size: cover !important;
    background-position: center center !important;
    transform: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  #alab-freiflaechen .tech-content-overlay{ display: none !important; }

  #alab-freiflaechen .tech-content-detail{ padding: 0 2px 8px !important; }
  #alab-freiflaechen .tech-content-detail h3{
    font-size: 1.2rem !important; line-height: 1.25; margin: .4rem 0 .3rem !important;
  }
  #alab-freiflaechen .tech-content-detail p{
    font-size: .98rem !important; line-height: 1.42 !important; margin: 0 0 .2rem !important;
  }
  #alab-freiflaechen .tech-features{ gap: .5rem !important; }
  #alab-freiflaechen .tech-features li{ font-size: .95rem !important; line-height: 1.35 !important; }

  #alab-freiflaechen .carousel-controls,
  #alab-freiflaechen .carousel-btn{ display: none !important; }

  #alab-freiflaechen .ts-dots{
    display:flex; justify-content:center; gap:8px; margin:8px 0 2px;
  }
  #alab-freiflaechen .ts-dots button{
    width:10px; height:10px; border:0; border-radius:999px; background:#cfd6dd; opacity:.9;
  }
  #alab-freiflaechen .ts-dots button[aria-current="true"]{
    width:28px; height:10px; border-radius:999px;
    background:linear-gradient(90deg,var(--alab-gold),#f4d03f);
  }
}


#alab-freiflaechen { --ts-card-h: 650px; }

@media (max-width: 768px){
  #alab-freiflaechen .tech-carousel-item{
    display:flex !important;
    flex-direction:column !important;
    justify-content:flex-start !important;
    min-height: var(--ts-card-h) !important;
    box-sizing: border-box;
    padding-bottom: 12px !important;
  }

  #alab-freiflaechen .tech-3d-image{
    flex: 0 0 auto !important;
    aspect-ratio: 16 / 9 !important;
    margin: 0 0 12px 0 !important;
  }

  #alab-freiflaechen .tech-content-detail{
    flex: 1 1 auto !important;
    display:flex !important;
    flex-direction:column !important;
  }
  #alab-freiflaechen .tech-content-detail h3{
    margin: 4px 0 .3rem !important;
    line-height: 1.25 !important;
  }
  #alab-freiflaechen .tech-features{ margin-top: .25rem !important; }
}


@media (max-width: 768px){
  #alab-freiflaechen{ --ts-card-h: 650px; }

  #alab-freiflaechen .technical-services-modern{
    margin-bottom: 8px !important;
    padding-bottom: 0 !important;
  }
  #alab-freiflaechen .ts-dots{ margin: 6px 0 2px !important; }
}

/* ==== Prozess: Mobile Cards passen, kein Überstand rechts ==== */
@media (max-width: 768px){
  #alab-freiflaechen{
    --step-number: 48px;
    --step-gap: 12px;
    --step-card-radius: 12px;
    --step-card-min: 0px;
  }

  #alab-freiflaechen .process-modern{ overflow-x: hidden; }

  #alab-freiflaechen .process-item-modern{
    display: grid;
    grid-template-columns: var(--step-number) 1fr;
    align-items: start;
    gap: var(--step-gap);
    margin: 16px 0 20px;
  }

  #alab-freiflaechen .process-number-modern{
    width: var(--step-number);
    height: var(--step-number);
    font-size: .95rem;
  }

  #alab-freiflaechen .timeline-line{
    left: calc(var(--step-number) / 2);
  }

  #alab-freiflaechen .process-content-modern{
    width: 100%;
    max-width: 100%;
    padding: 14px 16px;
    border-radius: var(--step-card-radius);
    box-shadow: var(--shadow-sm);
    min-height: var(--step-card-min);
    box-sizing: border-box;
  }
}

/* ==== Prozess (mobil) – saubere Breite + Wortumbruch ==== */
@media (max-width: 768px){
  #alab-freiflaechen .process-content-modern{
    width: 100%;
    max-width: 100%;
    margin-right: 0;
    box-sizing: border-box;
    cursor: pointer;
  }
  #alab-freiflaechen .process-content-modern h3{
    overflow-wrap: anywhere;
    word-break: break-word;
    hyphens: auto;
    -webkit-hyphens: auto;
  }

  #alab-freiflaechen .process-details-modern{
    transition: max-height .35s ease, opacity .25s ease, margin .25s ease;
  }
  #alab-freiflaechen .process-item-modern.active .process-details-modern{
    max-height: 600px;
    opacity: 1;
    margin-top: .6rem;
  }
}

/* ===== Freiflächen – Kontakt-Modal: mobile optimiert ===== */
@media (max-width: 480px){
  #alab-freiflaechen #contactModal .lightbox-content{
    box-sizing: border-box;
    width: 92vw !important;
    max-width: 92vw !important;
    margin: 0 auto;
    padding: 16px 16px 18px !important;
    border-radius: 14px !important;
  }

  #alab-freiflaechen #contactModal .contact-form h2{
    font-size: clamp(1.15rem, 5.2vw, 1.5rem) !important;
    line-height: 1.2 !important;
    margin: 0 0 10px !important;
    padding-right: 40px;
    word-break: break-word;
    hyphens: auto;
    text-align: center;
  }

  #alab-freiflaechen #contactModal .lightbox-close{
    width: 32px !important;
    height: 32px !important;
    top: 10px !important;
    right: 10px !important;
  }

  #alab-freiflaechen #contactModal .form-group{ gap: 6px; }
  #alab-freiflaechen #contactModal .form-group label{
    font-size: .9rem !important;
  }
  #alab-freiflaechen #contactModal .form-group input,
  #alab-freiflaechen #contactModal .form-group textarea{
    width: 100%;
    max-width: 100%;
    font-size: 16px !important;
    padding: .65rem .8rem !important;
  }
  #alab-freiflaechen #contactModal .form-group textarea{
    min-height: 110px !important;
  }

  #alab-freiflaechen #contactModal .privacy-row{
    grid-template-columns: 20px 1fr !important;
    gap: .5rem !important;
  }
  #alab-freiflaechen #contactModal .privacy-row input[type="checkbox"]{
    width: 20px; height: 20px;
    margin-top: .15rem;
  }

  #alab-freiflaechen #contactModal .form-submit{
    width: 100% !important;
    max-width: 360px;
    height: 48px;
    font-size: 1rem !important;
    margin: 8px auto 0 !important;
    display: block;
  }
}

@media (max-width: 360px){
  #alab-freiflaechen #contactModal .lightbox-content{
    width: 94vw !important;
    max-width: 94vw !important;
    padding: 14px !important;
  }
}

/* Hero mobil ohne seitliche Lücke */
@media (max-width: 1024px){
  #alab-freiflaechen .hero-content-modern{
    padding: 0 0 16px !important;
  }

  #alab-freiflaechen .hero-text-modern{
    padding: 0 16px !important;
  }

  #alab-freiflaechen .hero-image-3d{
    position: relative;
    width: 100dvw;
    left: 50%;
    margin-left: -50dvw;
    right: 50%;
    margin-right: -50dvw;
    height: clamp(460px, 86vh, 620px);
  }
  #alab-freiflaechen .hero-image-3d .hero-image-placeholder{
    width: 100%;
    height: 100%;
    border-radius: 0 0 20px 20px;
  }
}


/* Freiflächen – Hero: Absatz kleiner + 2. Überschrift ausblenden (nur mobil) */
@media (max-width: 768px){
  #alab-freiflaechen .hero-description-modern{
    font-size: clamp(.95rem, 3.6vw, 1.05rem);
    line-height: 1.55;
  }
  #alab-freiflaechen .hero-text-modern p:first-of-type{
    font-size: clamp(.95rem, 3.6vw, 1.05rem);
    line-height: 1.55;
  }

  #alab-freiflaechen .hero-description-modern + :is(h2,h3){
    display: none !important;
  }
  #alab-freiflaechen .hero-text-modern h3:nth-of-type(2){
    display: none !important;
  }
}


/* ======================================================
   FREIFLÄCHEN – EXTRA COMPACT MOBILE
   ====================================================== */

#alab-freiflaechen{ position:relative; overflow-x:clip; touch-action:pan-y; }
@supports not (overflow: clip){ #alab-freiflaechen{ overflow-x:hidden; } }

/* ====== <= 768px ====== */
@media (max-width: 768px){
  #alab-freiflaechen{ font-size:.95rem; line-height:1.45; }
  #alab-freiflaechen .container{ padding:0 14px; }

  #alab-freiflaechen .hero-content-modern{ gap:12px !important; }
  #alab-freiflaechen .hero-badge-modern{ padding:.4rem .8rem; font-size:.8rem; margin-bottom:.8rem; }
  #alab-freiflaechen .hero-title-modern{ font-size: clamp(1.6rem, 5.2vw, 2rem); margin-bottom:.5rem; }
  #alab-freiflaechen .hero-description-modern{ font-size:.98rem; line-height:1.55; margin-bottom:1rem; }
  #alab-freiflaechen .hero-cta-group{ gap:.6rem; }

  #alab-freiflaechen .btn-modern{ padding:.7rem 1.1rem; font-size:.93rem; border-radius:999px; }
  #alab-freiflaechen .btn-modern i{ font-size:.95em; }

  #alab-freiflaechen .section-header-modern{ margin-bottom:24px; }
  #alab-freiflaechen .section-label{ padding:.35rem .7rem; font-size:.7rem; }
  #alab-freiflaechen .section-title-modern{ font-size: clamp(1.25rem, 5.4vw, 1.7rem); margin-bottom:.35rem; }
  #alab-freiflaechen .section-subtitle-modern{ font-size:.98rem; }

  #alab-freiflaechen .services-modern{ padding: 36px 0; }
  #alab-freiflaechen .services-grid-modern{ gap:14px; margin-bottom:24px; }
  #alab-freiflaechen .service-card-modern{ padding:14px; border-radius:14px; }
  #alab-freiflaechen .service-icon-modern{ width:52px; height:52px; border-radius:12px; margin-bottom:.9rem; }
  #alab-freiflaechen .service-icon-modern i{ font-size:1.25rem; }
  #alab-freiflaechen .service-card-modern h3{ font-size:1.05rem; margin-bottom:.45rem; }
  #alab-freiflaechen .service-card-modern p{ font-size:.98rem; line-height:1.5; }
  #alab-freiflaechen .service-hover-content{ padding:1rem; }

  #alab-freiflaechen .subsection-title{ font-size:1.25rem; margin-bottom:16px; }
  #alab-freiflaechen .tech-content-detail{ padding:0 2px 6px !important; }
  #alab-freiflaechen .tech-content-detail h3{ font-size:1.15rem !important; margin:.35rem 0 .25rem !important; }
  #alab-freiflaechen .tech-content-detail p{ font-size:.95rem !important; margin:0 0 .2rem !important; }
  #alab-freiflaechen .tech-features{ gap:.45rem !important; }
  #alab-freiflaechen .tech-features li{ font-size:.95rem !important; }

  #alab-freiflaechen .process-modern{ padding:36px 0; }
  #alab-freiflaechen .process-item-modern{ gap:10px; margin-bottom:14px; }
  #alab-freiflaechen .process-number-modern{ width:46px; height:46px; font-size:.95rem; }
  #alab-freiflaechen .timeline-line{ left:23px; }
  #alab-freiflaechen .process-content-modern{ padding:12px 14px; border-radius:12px; }
  #alab-freiflaechen .process-content-modern h3{ font-size:1.05rem; margin-bottom:.4rem; }
  #alab-freiflaechen .process-content-modern p{ margin-bottom:.4rem; }

  #alab-freiflaechen .benefits-modern{ padding:36px 0; }
  #alab-freiflaechen .benefits-grid-modern{ gap:14px; }
  #alab-freiflaechen .benefit-card-modern{ padding:14px; border-radius:14px; }
  #alab-freiflaechen .benefit-icon-modern{ width:56px; height:56px; border-radius:14px; margin-bottom:.9rem; }
  #alab-freiflaechen .benefit-icon-modern i{ font-size:1.4rem; }
  #alab-freiflaechen .benefit-card-modern h3{ font-size:1.05rem; margin-bottom:.35rem; }
  #alab-freiflaechen .benefit-card-modern p{ font-size:.98rem; margin-bottom:.4rem; }
  #alab-freiflaechen .benefit-stats{ gap:.5rem; margin-top:.5rem; }
  #alab-freiflaechen .benefit-stats span{ font-size:.8rem; padding:.2rem .6rem; }

  #alab-freiflaechen .faq-modern{ padding:36px 0; }
  #alab-freiflaechen .faq-wrapper{ gap:16px; }
  #alab-freiflaechen .faq-image-placeholder{ height:360px; border-radius:14px; }
  #alab-freiflaechen .faq-content{ gap:.6rem; }
  #alab-freiflaechen .faq-item{ border-radius:12px; }
  #alab-freiflaechen .faq-question{ padding:12px 14px; gap:.6rem; }
  #alab-freiflaechen .faq-question h3{ font-size:1rem; }
  #alab-freiflaechen .faq-answer{ font-size:.98rem; }
  #alab-freiflaechen .faq-item.active .faq-answer{ padding:0 14px 12px; }
}

/* ====== <= 480px (XS) ====== */
@media (max-width: 480px){
  #alab-freiflaechen{ font-size:.9rem; line-height:1.4; }
  #alab-freiflaechen .container{ padding:0 10px; }

  #alab-freiflaechen .hero-title-modern{ font-size: clamp(1.35rem, 5.4vw, 1.6rem); }
  #alab-freiflaechen .hero-description-modern{ font-size:.93rem; }

  #alab-freiflaechen .service-card-modern{ padding:12px; border-radius:12px; }
  #alab-freiflaechen .service-icon-modern{ width:48px; height:48px; border-radius:10px; }
  #alab-freiflaechen .service-card-modern h3{ font-size:1rem; }

  #alab-freiflaechen .process-number-modern{ width:42px; height:42px; font-size:.9rem; }
  #alab-freiflaechen .timeline-line{ left:21px; }
  #alab-freiflaechen .process-content-modern{ padding:10px 12px; border-radius:10px; }

  #alab-freiflaechen .benefit-card-modern{ padding:12px; border-radius:12px; }
  #alab-freiflaechen .benefit-icon-modern{ width:48px; height:48px; border-radius:12px; }

  #alab-freiflaechen .faq-image-placeholder{ height:300px; }
  #alab-freiflaechen .faq-question{ padding:10px 12px; }
  #alab-freiflaechen .faq-item.active .faq-answer{ padding:0 12px 10px; }

  #alab-freiflaechen .btn-modern{ padding:.6rem 1rem; font-size:.9rem; }
}

@media (max-width: 420px){
  #alab-freiflaechen{ --ts-card-h: 560px; }
}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssString }} />

      <div id="alab-freiflaechen">
        {/* ===== Side Navigation ===== */}
        <nav className="side-nav" id="sideNav">
          <div className="side-nav-logo">
            <h3>ALAB</h3>
            <span>Energiesysteme</span>
          </div>
          <div className="side-nav-menu">
            <a
              className={`nav-item${activeNav === "home" ? " active" : ""}`}
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
            >
              Start
            </a>
            <a
              className={`nav-item${activeNav === "services" ? " active" : ""}`}
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}
            >
              Leistungen
            </a>
            <a
              className={`nav-item${activeNav === "process" ? " active" : ""}`}
              href="#process"
              onClick={(e) => { e.preventDefault(); scrollToSection("process"); }}
            >
              Ablauf
            </a>
            <a
              className={`nav-item${activeNav === "benefits" ? " active" : ""}`}
              href="#benefits"
              onClick={(e) => { e.preventDefault(); scrollToSection("benefits"); }}
            >
              Vorteile
            </a>
            <a
              className={`nav-item${activeNav === "faq" ? " active" : ""}`}
              href="#faq"
              onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}
            >
              FAQ
            </a>
            <div className="nav-cta">
              <a
                className="nav-item"
                href="#angebot"
                data-open-angebot="freiflaechen-nav-beratung"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("open-angebot-lightbox", {
                        detail: { quelle: "freiflaechen-nav-beratung" },
                      })
                    );
                  }
                }}
              >
                Kostenlos beraten
              </a>
            </div>
          </div>
        </nav>

        {/* ===== Hero ===== */}
        <section className="hero-modern" id="home">
          <div className="hero-background">
            <div className="hero-overlay"></div>
            <div className="hero-particles" id="particles" ref={particlesRef}></div>
          </div>

          <div className="hero-content-modern">
            <div className="hero-text-modern" data-aos="fade-up">
              <div className="hero-badge-modern">PHOTOVOLTAIK FREIFL&Auml;CHEN</div>
              <h1 className="hero-title-modern">
                Freifl&auml;che als renditestarke <span className="text-gradient">Photovoltaikanlage</span> nutzen
              </h1>
              <p className="hero-description-modern">
                Sie verf&uuml;gen &uuml;ber eine ungenutzte Fl&auml;che und m&ouml;chten sie gewinnbringend als Photovoltaikanlage nutzen?
                Mit unserer schl&uuml;sselfertigen Rundum-L&ouml;sung begleiten wir Sie von der Machbarkeitsanalyse und
                Genehmigungsbeantragung bis zur finalen Installation.
              </p>
              <h2 className="hero-subtitle-modern">Nutzen Sie unbebaute Fl&auml;chen f&uuml;r nachhaltige Solarenergie</h2>

              <div className="hero-cta-group">
                <button
                  className="btn-modern btn-secondary-modern"
                  data-open-angebot="freiflaechen-hero-beratung"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(
                        new CustomEvent("open-angebot-lightbox", {
                          detail: { quelle: "freiflaechen-hero-beratung" },
                        })
                      );
                    }
                  }}
                >
                  <span>Kostenlose Beratung</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <button className="btn-modern btn-secondary-modern" onClick={() => scrollToSection("faq")}>
                  <span>FAQ ansehen</span>
                  <i className="fas fa-question-circle"></i>
                </button>
              </div>
            </div>

            <div className="hero-image-3d" data-aos="fade-left" data-aos-delay="200">
              <div className="hero-image-placeholder">
                <div className="hero-text-overlay">
                  <h3>Ihr Projekt - Unsere Expertise</h3>
                  <p>Von der Planung bis zur Inbetriebnahme alles aus einer Hand.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator-modern">
            <div className="mouse"><div className="wheel"></div></div>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section className="services-modern" id="services">
          <div className="container">
            <div className="section-header-modern" data-aos="fade-up">
              <span className="section-label">IHRE VORTEILE</span>
              <h2 className="section-title-modern">Freifl&auml;che clever nutzen: Renditestarke Photovoltaikkraftwerke f&uuml;r Land &amp; Gewerbe</h2>
            </div>

            <div className="services-grid-modern">
              <div className="service-card-modern" data-aos="fade-up" data-aos-delay="100">
                <div className="service-icon-modern"><i className="fas fa-coins"></i></div>
                <h3>Attraktive Pacht- und Einspeise-Einnahmen</h3>
                <p>Planbare Einnahmen aus Pachtmodellen und Einspeiseverg&uuml;tung f&uuml;r Landwirte &amp; Gewerbe.</p>
                <div className="service-hover-content">
                  <ul>
                    <li>Langfristige Pachtvertr&auml;ge</li>
                    <li>Garantierte Einspeiseverg&uuml;tung</li>
                    <li>Inflationsgesch&uuml;tzte Ertr&auml;ge</li>
                  </ul>
                </div>
              </div>

              <div className="service-card-modern" data-aos="fade-up" data-aos-delay="200">
                <div className="service-icon-modern"><i className="fas fa-chart-line"></i></div>
                <h3>Hohe Gesamtrendite &amp; langfristige Sicherheit</h3>
                <p>Nachhaltige Renditen durch festgeschriebene Einspeisevertr&auml;ge &uuml;ber 20+ Jahre.</p>
                <div className="service-hover-content">
                  <ul>
                    <li>6-10% Rendite p.a.</li>
                    <li>Wertsteigerung der Fl&auml;che</li>
                    <li>Krisensichere Investition</li>
                  </ul>
                </div>
              </div>

              <div className="service-card-modern" data-aos="fade-up" data-aos-delay="300">
                <div className="service-icon-modern"><i className="fas fa-hand-holding-usd"></i></div>
                <h3>Staatliche F&ouml;rdermittel &amp; Steuerverg&uuml;nstigungen</h3>
                <p>Investitionszusch&uuml;sse, Abschreibungen und regionale F&ouml;rderprogramme.</p>
                <div className="service-hover-content">
                  <ul>
                    <li>KfW-F&ouml;rderung</li>
                    <li>Steuerliche Vorteile</li>
                    <li>Regionale Zusch&uuml;sse</li>
                  </ul>
                </div>
              </div>

              <div className="service-card-modern" data-aos="fade-up" data-aos-delay="400">
                <div className="service-icon-modern"><i className="fas fa-leaf"></i></div>
                <h3>Nachhaltiges Image &amp; messbare CO&#x2082;-Reduktion</h3>
                <p>Positionieren Sie sich als &Ouml;ko-Pionier und leisten aktiven Beitrag zur Energiewende.</p>
                <div className="service-hover-content">
                  <ul>
                    <li>500t CO&#x2082; Einsparung/MWp</li>
                    <li>Nachhaltigkeitszertifikate</li>
                    <li>Imagegewinn</li>
                  </ul>
                </div>
              </div>

              <div className="service-card-modern" data-aos="fade-up" data-aos-delay="500">
                <div className="service-icon-modern"><i className="fas fa-tools"></i></div>
                <h3>Echtzeit-Monitoring &amp; proaktive Wartung</h3>
                <p>Online-&Uuml;berwachung mit Fr&uuml;hwarnsystemen f&uuml;r maximale Anlagenleistung.</p>
                <div className="service-hover-content">
                  <ul>
                    <li>24/7 Fern&uuml;berwachung</li>
                    <li>Predictive Maintenance</li>
                    <li>Performance Reports</li>
                  </ul>
                </div>
              </div>

              <div className="service-card-modern" data-aos="fade-up" data-aos-delay="600">
                <div className="service-icon-modern"><i className="fas fa-handshake"></i></div>
                <h3>Rundum-sorglos Projektmanagement</h3>
                <p>Von Machbarkeitsanalyse bis zur schl&uuml;sselfertigen Installation aus einer Hand.</p>
                <div className="service-hover-content">
                  <ul>
                    <li>Komplettservice</li>
                    <li>Ein Ansprechpartner</li>
                    <li>Garantierte Termine</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technische Leistungen – Carousel */}
            <div className="technical-services-modern">
              <h3 className="subsection-title" data-aos="fade-up">Unsere technischen Leistungen</h3>

              <div className="tech-carousel-container">
                <div
                  className="tech-carousel"
                  id="techCarousel"
                  ref={carouselRef}
                  onMouseEnter={pauseAutoplay}
                  onMouseLeave={resumeAutoplay}
                >
                  <div className="tech-carousel-item">
                    <div className="tech-3d-image" data-aos="fade-right">
                      <div className="tech-image-placeholder" data-service="Planung">
                        <div className="tech-content-overlay">
                          <h4>
                            <div className="tech-icon"><i className="fas fa-drafting-compass"></i></div>
                            Planung
                          </h4>
                          <p>Professionelle Anlagenplanung mit modernsten Tools</p>
                        </div>
                      </div>
                    </div>
                    <div className="tech-content-detail" data-aos="fade-left">
                      <h3>Planung</h3>
                      <p>Unsere Ingenieure entwickeln ma&szlig;geschneiderte Photovoltaik-L&ouml;sungen f&uuml;r Ihre Freifl&auml;che mit h&ouml;chster Effizienz und Wirtschaftlichkeit.</p>
                      <ul className="tech-features">
                        <li>Detaillierte Standortanalyse und Fl&auml;chenbewertung</li>
                        <li>3D-Verschattungsanalyse und Ertragssimulation</li>
                        <li>Optimiertes Anlagenlayout f&uuml;r maximale Leistung</li>
                        <li>Statische Berechnungen und Windlastanalysen</li>
                      </ul>
                    </div>
                  </div>

                  <div className="tech-carousel-item">
                    <div className="tech-3d-image">
                      <div className="tech-image-placeholder" data-service="Genehmigung">
                        <div className="tech-content-overlay">
                          <h4>
                            <div className="tech-icon"><i className="fas fa-file-contract"></i></div>
                            Genehmigungsmanagement
                          </h4>
                          <p>Komplette Abwicklung aller beh&ouml;rdlichen Verfahren f&uuml;r Sie.</p>
                        </div>
                      </div>
                    </div>
                    <div className="tech-content-detail">
                      <h3>Genehmigungsmanagement</h3>
                      <p>Wir &uuml;bernehmen die komplette Abwicklung s&auml;mtlicher Genehmigungsverfahren und sorgen f&uuml;r eine reibungslose Projektumsetzung.</p>
                      <ul className="tech-features">
                        <li>Bauleitplanung und Bauantragsstellung</li>
                        <li>Umweltvertr&auml;glichkeitspr&uuml;fungen</li>
                        <li>EEG-Registrierung und Netzanmeldung</li>
                        <li>Kommunikation mit Beh&ouml;rden und &Auml;mtern</li>
                      </ul>
                    </div>
                  </div>

                  <div className="tech-carousel-item">
                    <div className="tech-3d-image">
                      <div className="tech-image-placeholder" data-service="Bau">
                        <div className="tech-content-overlay">
                          <h4>
                            <div className="tech-icon"><i className="fas fa-hard-hat"></i></div>
                            Bau &amp; Installation
                          </h4>
                          <p>Schl&uuml;sselfertige Errichtung mit h&ouml;chsten Qualit&auml;tsstandards.</p>
                        </div>
                      </div>
                    </div>
                    <div className="tech-content-detail">
                      <h3>Bau &amp; Installation</h3>
                      <p>Professionelle Errichtung Ihrer Photovoltaikanlage durch unser erfahrenes Montageteam mit Qualit&auml;tsgarantie.</p>
                      <ul className="tech-features">
                        <li>Baustellenvorbereitung und Infrastruktur</li>
                        <li>Montage der Unterkonstruktion</li>
                        <li>Installation von Modulen und Wechselrichtern</li>
                        <li>Netzanbindung und Inbetriebnahme</li>
                      </ul>
                    </div>
                  </div>

                  <div className="tech-carousel-item">
                    <div className="tech-3d-image">
                      <div className="tech-image-placeholder" data-service="Finanzierung">
                        <div className="tech-content-overlay">
                          <h4>
                            <div className="tech-icon"><i className="fas fa-euro-sign"></i></div>
                            Finanzierung &amp; F&ouml;rderung
                          </h4>
                          <p>Ma&szlig;geschneiderte Finanzierungskonzepte f&uuml;r Ihr Projekt.</p>
                        </div>
                      </div>
                    </div>
                    <div className="tech-content-detail">
                      <h3>Finanzierung &amp; F&ouml;rderung</h3>
                      <p>Wir entwickeln optimale Finanzierungskonzepte und unterst&uuml;tzen Sie bei der Beantragung aller verf&uuml;gbaren F&ouml;rdermittel.</p>
                      <ul className="tech-features">
                        <li>Individuelle Finanzierungsberatung</li>
                        <li>F&ouml;rdermittelbeantragung (EEG, KfW)</li>
                        <li>Wirtschaftlichkeitsberechnungen</li>
                        <li>Power Purchase Agreements (PPA)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="tech-carousel-item">
                    <div className="tech-3d-image">
                      <div className="tech-image-placeholder" data-service="Wartung">
                        <div className="tech-content-overlay">
                          <h4>
                            <div className="tech-icon"><i className="fas fa-cog"></i></div>
                            Betrieb &amp; Wartung
                          </h4>
                          <p>24/7 Monitoring und professionelle Anlagenbetreuung.</p>
                        </div>
                      </div>
                    </div>
                    <div className="tech-content-detail">
                      <h3>Betrieb &amp; Wartung</h3>
                      <p>Langfristige Betriebsf&uuml;hrung mit modernster &Uuml;berwachungstechnik f&uuml;r maximale Verf&uuml;gbarkeit und Ertr&auml;ge.</p>
                      <ul className="tech-features">
                        <li>24/7 Fern&uuml;berwachung und Monitoring</li>
                        <li>Pr&auml;ventive Wartung und St&ouml;rungsbeseitigung</li>
                        <li>Performance Ratio Optimierung</li>
                        <li>J&auml;hrliche Leistungsberichte</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="carousel-controls">
                  <button className="carousel-btn" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
                  <div className="carousel-dots" id="carouselDots">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <span
                        key={i}
                        className={`carousel-dot${i === currentSlide ? " active" : ""}`}
                        onClick={() => showSlide(i)}
                      />
                    ))}
                  </div>
                  <button className="carousel-btn" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Process ===== */}
        <section className="process-modern" id="process">
          <div className="container">
            <div className="section-header-modern" data-aos="fade-up">
              <span className="section-label">PROJEKTABLAUF</span>
              <h2 className="section-title-modern">Ihr Weg zum eigenen Solarpark</h2>
              <p className="section-subtitle-modern">Der strukturierte Ablauf zum Bau Ihrer Freifl&auml;chenanlage</p>
            </div>

            <div className="process-timeline-modern">
              <div className="timeline-line"></div>

              {[
                {
                  num: "01",
                  title: "Erstberatung & Machbarkeitsstudie",
                  desc: "Kostenlose Erstanalyse Ihrer Fl\u00e4che mit Ertragsprognose und Wirtschaftlichkeitsberechnung.",
                  detailTitle: "Detaillierte Leistungen:",
                  details: [
                    "Fl\u00e4cheneignungspr\u00fcfung (Gr\u00f6\u00dfe, Ausrichtung, Verschattung)",
                    "Netzanschlusspr\u00fcfung und Einspeisepunkt-Analyse",
                    "Bodengutachten und Baugrunduntersuchung",
                    "Ertragssimulation mit PVsyst",
                  ],
                },
                {
                  num: "02",
                  title: "Detailplanung & Engineering",
                  desc: "Erstellung der technischen Planung, Layoutoptimierung und Auslegung aller Komponenten.",
                  detailTitle: "Technische Ausarbeitung:",
                  details: [
                    "Anlagenlayout und Modulbelegungsplan",
                    "Unterkonstruktion und Statikberechnung",
                    "DC/AC-Verkabelungsplan und Stringplan",
                    "Wechselrichterauslegung und Stationenplanung",
                  ],
                },
                {
                  num: "03",
                  title: "Genehmigungsverfahren",
                  desc: "Einholung aller erforderlichen Genehmigungen und Durchf\u00fchrung der Bauleitplanung.",
                  detailTitle: "Genehmigungsverfahren umfasst:",
                  details: [
                    "Bauantrag nach BauGB oder BImSchG",
                    "Umweltvertr\u00e4glichkeitspr\u00fcfung (UVP)",
                    "Naturschutzfachliche Stellungnahmen",
                    "Netzanschlussbegehren beim Netzbetreiber",
                  ],
                },
                {
                  num: "04",
                  title: "Finanzierung & F\u00f6rderung",
                  desc: "Sicherung der optimalen Finanzierung und Beantragung aller verf\u00fcgbaren F\u00f6rdermittel.",
                  detailTitle: "Finanzierungsoptionen:",
                  details: [
                    "EEG-F\u00f6rderung und Marktpr\u00e4mienmodell",
                    "KfW-Kredite und F\u00f6rderprogramme",
                    "Power Purchase Agreements (PPA)",
                    "B\u00fcrgerbeteiligungsmodelle",
                  ],
                },
                {
                  num: "05",
                  title: "Bau & Installation",
                  desc: "Professionelle Errichtung Ihrer Anlage mit eigenem Fachpersonal und l\u00fcckenloser Qualit\u00e4tskontrolle.",
                  detailTitle: "Leistungsumfang:",
                  details: [
                    "Baustellenvorbereitung und Infrastruktur",
                    "Montage der Unterkonstruktion",
                    "Installation von Modulen und Wechselrichtern",
                    "Netzanbindung, Pr\u00fcfung und Dokumentation",
                  ],
                },
                {
                  num: "06",
                  title: "Inbetriebnahme & Betrieb",
                  desc: "Technische Abnahme, Netzanbindung und Start der professionellen Betriebsf\u00fchrung.",
                  detailTitle: "Betriebsf\u00fchrung umfasst:",
                  details: [
                    "24/7 Fern\u00fcberwachung und Monitoring",
                    "Regelm\u00e4\u00dfige Wartung nach DIN VDE",
                    "Performance Ratio Analyse",
                  ],
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`process-item-modern${activeProcess === index ? " active" : ""}`}
                  data-aos="fade-up"
                  onClick={() => toggleProcess(index)}
                >
                  <div className="process-number-modern">{step.num}</div>
                  <div className="process-content-modern">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                    <div className="process-details-modern">
                      <h4>{step.detailTitle}</h4>
                      <ul>
                        {step.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Benefits ===== */}
        <section className="benefits-modern" id="benefits">
          <div className="container">
            <div className="section-header-modern" data-aos="fade-up">
              <span className="section-label">WICHTIGE INFORMATIONEN</span>
              <h2 className="section-title-modern">Freifl&auml;chen-Photovoltaik f&uuml;r Kommunen und Unternehmen</h2>
              <p className="section-subtitle-modern">Faktenwissen und Entscheidungshilfen f&uuml;r Ihre nachhaltige Energieprojekte</p>
            </div>

            <div className="benefits-grid-modern">
              <div className="benefit-card-modern" data-aos="zoom-in" data-aos-delay="100">
                <div className="benefit-icon-modern"><i className="fas fa-landmark"></i></div>
                <h3>Kommunale Wertsch&ouml;pfung</h3>
                <p>Gemeinden profitieren durch Gewerbesteuer (bis zu 70% der Ertr&auml;ge), Pachteinnahmen und lokale Arbeitspl&auml;tze. &sect;6 EEG erm&ouml;glicht 0,2 ct/kWh direkte Beteiligung.</p>
                <div className="benefit-stats"><span>70% Gewerbesteuer</span><span>0,2 ct/kWh</span></div>
              </div>

              <div className="benefit-card-modern" data-aos="zoom-in" data-aos-delay="200">
                <div className="benefit-icon-modern"><i className="fas fa-calculator"></i></div>
                <h3>Wirtschaftliche Fakten</h3>
                <p>Aktuelle Stromgestehungskosten: 3-6 ct/kWh. Amortisation nach 8-12 Jahren. Rendite: 6-10% p.a. &uuml;ber 25+ Jahre Laufzeit.</p>
                <div className="benefit-stats"><span>6-10% Rendite</span><span>25+ Jahre</span></div>
              </div>

              <div className="benefit-card-modern" data-aos="zoom-in" data-aos-delay="300">
                <div className="benefit-icon-modern"><i className="fas fa-file-contract"></i></div>
                <h3>Rechtliche Grundlagen</h3>
                <p>Privilegierung nach &sect;35 BauGB f&uuml;r Fl&auml;chen bis 200m entlang Autobahnen/Schienenwegen. Keine Versiegelung - nur 2-3% der Fl&auml;che bebaut.</p>
                <div className="benefit-stats"><span>&sect;35 BauGB</span><span>2-3% Versiegelung</span></div>
              </div>

              <div className="benefit-card-modern" data-aos="zoom-in" data-aos-delay="400">
                <div className="benefit-icon-modern"><i className="fas fa-seedling"></i></div>
                <h3>Biodiversit&auml;t &amp; Agri-PV</h3>
                <p>Agri-PV erm&ouml;glicht 80% landwirtschaftliche Nutzung bei gleichzeitiger Stromproduktion.</p>
                <div className="benefit-stats"><span>3x Artenvielfalt</span><span>80% Agrar-Nutzung</span></div>
              </div>

              <div className="benefit-card-modern" data-aos="zoom-in" data-aos-delay="500">
                <div className="benefit-icon-modern"><i className="fas fa-chart-area"></i></div>
                <h3>Fl&auml;chenbedarf &amp; Potenzial</h3>
                <p>1 Hektar = 1 MWp = Strom f&uuml;r 300 Haushalte. Deutschland ben&ouml;tigt nur 0,5% der Landesfl&auml;che f&uuml;r komplette Energiewende.</p>
                <div className="benefit-stats"><span>1 Ha = 1 MWp</span><span>300 Haushalte</span></div>
              </div>

              <div className="benefit-card-modern" data-aos="zoom-in" data-aos-delay="600">
                <div className="benefit-icon-modern"><i className="fas fa-globe"></i></div>
                <h3>Klimaschutz konkret</h3>
                <p>1 MWp spart j&auml;hrlich 500t CO&#x2082;. Energetische Amortisation nach 1-2 Jahren. Recyclingquote der Module: &gt;95%.</p>
                <div className="benefit-stats"><span>500t CO&#x2082;/Jahr</span><span>95% Recycling</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="faq-modern" id="faq">
          <div className="container">
            <div className="section-header-modern" data-aos="fade-up">
              <span className="section-label">H&Auml;UFIGE FRAGEN</span>
              <h2 className="section-title-modern">Alles Wichtige zu Freifl&auml;chen-PV</h2>
              <p className="section-subtitle-modern">Antworten auf Ihre wichtigsten Fragen zu Photovoltaik-Freifl&auml;chenanlagen</p>
            </div>

            <div className="faq-wrapper">
              <div className="faq-image-placeholder" data-aos="fade-right"></div>

              <div className="faq-content" data-aos="fade-left">
                {[
                  {
                    q: "Wie viel Fl\u00e4che ben\u00f6tige ich f\u00fcr eine rentable Anlage?",
                    a: "Ab einer Fl\u00e4che von 2-3 Hektar k\u00f6nnen Freifl\u00e4chenanlagen wirtschaftlich betrieben werden. Pro Hektar l\u00e4sst sich etwa 1 MWp installierte Leistung realisieren, was Strom f\u00fcr etwa 300 Haushalte liefert.",
                  },
                  {
                    q: "Welche Genehmigungen sind erforderlich?",
                    a: "Je nach Gr\u00f6\u00dfe und Standort sind unterschiedliche Genehmigungen n\u00f6tig. Bei Anlagen \u00fcber 750 kWp ist meist eine Baugenehmigung erforderlich. Wir \u00fcbernehmen f\u00fcr Sie die komplette Abwicklung aller beh\u00f6rdlichen Verfahren.",
                  },
                  {
                    q: "Wie lange dauert die Realisierung eines Projekts?",
                    a: "Von der ersten Planung bis zur Inbetriebnahme vergehen typischerweise 12-18 Monate. Die reine Bauzeit betr\u00e4gt je nach Anlagengr\u00f6\u00dfe 2-4 Monate.",
                  },
                  {
                    q: "Welche Rendite kann ich erwarten?",
                    a: "Bei optimalen Bedingungen sind Renditen von 6-10% p.a. \u00fcber die Laufzeit von 25+ Jahren realistisch. Die genaue Rendite h\u00e4ngt von Faktoren wie Standort, Globalstrahlung und Strompreisentwicklung ab.",
                  },
                  {
                    q: "Kann ich meine Fl\u00e4che weiterhin landwirtschaftlich nutzen?",
                    a: "Ja! Mit Agri-PV Konzepten ist eine Doppelnutzung m\u00f6glich. Zwischen den Modulreihen kann Landwirtschaft betrieben werden oder die Fl\u00e4che zur Beweidung genutzt werden. So bleiben bis zu 80% der Fl\u00e4che landwirtschaftlich nutzbar.",
                  },
                ].map((faq, index) => (
                  <div key={index} className={`faq-item${activeFaq === index ? " active" : ""}`}>
                    <div className="faq-question" onClick={() => toggleFaq(index)}>
                      <i className="fas fa-plus"></i>
                      <h3>{faq.q}</h3>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Contact CTA + Modal ===== */}
        <section
          className="contact-modern"
          id="contact"
          style={{ padding: "5rem 0", background: "var(--gradient-dark)" }}
        >
          <div className="container">
            <div className="section-header-modern" data-aos="fade-up">
              <span className="section-label" style={{ background: "var(--white)", color: "var(--primary)" }}>
                KONTAKT
              </span>
              <h2 className="section-title-modern" style={{ color: "var(--white)" }}>
                Starten Sie Ihr Solarprojekt
              </h2>
              <p className="section-subtitle-modern" style={{ color: "rgba(255,255,255,0.8)" }}>
                Wir beraten Sie kostenlos und unverbindlich
              </p>
            </div>

            <div className="contact-cta">
              <button
                className="btn-modern btn-primary-modern"
                data-open-angebot="freiflaechen-final-nachricht"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("open-angebot-lightbox", {
                        detail: { quelle: "freiflaechen-final-nachricht" },
                      })
                    );
                  }
                }}
              >
                <i className="fas fa-envelope"></i>
                <span>Nachricht senden</span>
              </button>

              <a className="btn-modern btn-primary-modern btn-white" href="tel:+4982617597176">
                <i className="fas fa-phone"></i>
                <span>08261 7597176</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        <div
          className={`lightbox-modal${modalOpen ? " show" : ""}`}
          id="contactModal"
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("lightbox-modal")) closeContactModal();
          }}
        >
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeContactModal}>
              <i className="fas fa-times"></i>
            </button>

            <form
              className="contact-form"
              id="contactForm"
              ref={formRef}
              action="https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y"
              method="POST"
              target="formSink"
            >
              <input type="hidden" name="Quelle" value="Dachverpachtung – Freiflächen-Beratungsformular" />
              <h2>Kostenloses Beratungsgespr&auml;ch</h2>

              <div className="form-group" style={formSubmitted ? { display: "none" } : {}}>
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group" style={formSubmitted ? { display: "none" } : {}}>
                <label htmlFor="firma">Firma (optional)</label>
                <input type="text" id="firma" name="firma" />
              </div>
              <div className="form-group" style={formSubmitted ? { display: "none" } : {}}>
                <label htmlFor="email">E-Mail *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group" style={formSubmitted ? { display: "none" } : {}}>
                <label htmlFor="phone">Telefonnummer</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group" style={formSubmitted ? { display: "none" } : {}}>
                <label htmlFor="area">Verf&uuml;gbare Fl&auml;che (in Hektar)</label>
                <input type="text" id="area" name="area" />
              </div>
              <div className="form-group" style={formSubmitted ? { display: "none" } : {}}>
                <label htmlFor="message">Ihre Nachricht *</label>
                <textarea id="message" name="message" required placeholder="Beschreiben Sie Ihr Projekt..."></textarea>
              </div>

              <div className="consent-row" style={formSubmitted ? { display: "none" } : {}}>
                <input
                  type="checkbox"
                  id="ff-consent"
                  required
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                />
                <label htmlFor="ff-consent">
                  Ich stimme der Kontaktaufnahme zur Angebotserstellung zu und habe die{" "}
                  <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
                    Datenschutzerkl&auml;rung
                  </a>{" "}
                  gelesen.<span className="asterisk">*</span>
                </label>
              </div>

              <button
                type="submit"
                className="form-submit"
                style={formSubmitted ? { display: "none" } : {}}
                disabled={!consentChecked || submitLoading}
              >
                {submitLoading ? "Wird gesendet\u2026" : "Anfrage senden"}
              </button>

              <div className={`form-success${formSubmitted ? " show" : ""}`} id="formSuccess" role="status" aria-live="polite">
                <div className="success-icon"><i className="fas fa-check"></i></div>
                <h3>Danke f&uuml;r Ihre Anfrage!</h3>
                <p>Wir haben Ihre Angaben erhalten und melden uns innerhalb von 24&nbsp;Stunden.</p>
                <div className="actions">
                  <button type="button" className="btn-again" onClick={resetForm}>
                    Weitere Anfrage
                  </button>
                  <button type="button" className="btn-close" onClick={closeContactModal}>
                    Schlie&szlig;en
                  </button>
                </div>
              </div>
            </form>

            <iframe
              name="formSink"
              ref={iframeRef}
              style={{ display: "none", width: 0, height: 0, border: 0 }}
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
