"use client";

import { useEffect } from "react";

export default function PrivateVorgehenSection() {
  useEffect(() => {
    const nav = document.getElementById('pv-steps');
    const content = document.getElementById('pv-content');
    if (!nav || !content) return;

    const isMobile = () => window.innerWidth <= 640;

    const getButtons = () => nav.querySelectorAll('.step-button');
    const getTabs = () => content.querySelectorAll('.tab-content');

    function activateTab(id: string) {
      getTabs().forEach(t => t.classList.remove('active'));
      getButtons().forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });

      const tab = document.getElementById('tab-' + id);
      const btn = nav!.querySelector('.step-button[data-tab="' + id + '"]');
      if (!tab || !btn) return;

      tab.classList.add('active');
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      applyResponsiveCollapsible(tab.querySelector('.text-content') as HTMLElement | null);
    }

    const handleNavClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.step-button');
      if (!btn || !nav.contains(btn)) return;
      const id = btn.getAttribute('data-tab');
      if (id) activateTab(id);
    };
    nav.addEventListener('click', handleNavClick, { passive: true });

    function prepareCollapsible() {
      document.querySelectorAll('#pv-content .tab-content .text-content').forEach((tc, i) => {
        const el = tc as HTMLElement;
        if (el.dataset.collapsibleReady === '1') return;

        const titleEl = el.querySelector('.step-title');
        const restNodes = [...el.children].filter(child => child !== titleEl);

        const wrap = document.createElement('div');
        wrap.className = 'collapsible';
        wrap.id = 'collapsible-' + i;
        restNodes.forEach(child => wrap.appendChild(child));
        el.appendChild(wrap);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'collapsible-toggle';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', wrap.id);
        btn.innerHTML = '<span>Mehr anzeigen</span><span class="chev">\u25BE</span>';
        el.appendChild(btn);

        btn.addEventListener('click', () => toggleCollapsible(el, wrap, btn), { passive: true });

        el.dataset.collapsibleReady = '1';
      });
    }

    function toggleCollapsible(tc: HTMLElement, wrap: HTMLElement, btn: HTMLElement) {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        wrap.style.maxHeight = '0px';
        btn.setAttribute('aria-expanded', 'false');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Mehr anzeigen';
        tc.classList.remove('is-expanded');
      } else {
        wrap.style.maxHeight = wrap.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Weniger anzeigen';
        tc.classList.add('is-expanded');
      }
    }

    function applyResponsiveCollapsible(tc: HTMLElement | null) {
      if (!tc) return;
      const wrap = tc.querySelector('.collapsible') as HTMLElement | null;
      const btn = tc.querySelector('.collapsible-toggle') as HTMLElement | null;
      if (!wrap || !btn) return;

      if (isMobile()) {
        wrap.style.maxHeight = '0px';
        btn.style.display = 'inline-flex';
        btn.setAttribute('aria-expanded', 'false');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Mehr anzeigen';
        tc.classList.remove('is-expanded');
      } else {
        wrap.style.maxHeight = 'none';
        btn.style.display = 'none';
        btn.setAttribute('aria-expanded', 'true');
        tc.classList.add('is-expanded');
      }
    }

    function applyResponsiveCollapsibleAll() {
      document.querySelectorAll('#pv-content .tab-content.active .text-content')
        .forEach(el => applyResponsiveCollapsible(el as HTMLElement));
    }

    let rAF: number | null = null;
    const handleResize = () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => applyResponsiveCollapsibleAll());
    };
    window.addEventListener('resize', handleResize);

    prepareCollapsible();
    applyResponsiveCollapsibleAll();

    return () => {
      nav.removeEventListener('click', handleNavClick);
      window.removeEventListener('resize', handleResize);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
/* ==== SECTION (Montserrat + scharfes Rendering) ==== */
.process-section{
  --primary-white:#fff; --secondary-bg:#F8F9FA; --accent-color:#2b6cb0;
  --accent-gradient-start:#2b6cb0; --accent-gradient-end:#6aa6e8;
  --accent-yellow-light:#eaf2fb; --text-dark:#0f2533; --text-muted:#5b6b78;
  --border-color:#E9ECEF; --shadow-lg:0 10px 30px rgba(0,0,0,.07); --radius:16px;
}
.process-section, .process-section *{box-sizing:border-box}
.process-section{
  margin:0;background:var(--secondary-bg);color:var(--text-dark);
  font-family:'Montserrat',system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:optimizeSpeed;
  line-height:1.6;font-size:16px;overflow-x:hidden;padding:3.2rem 1.25rem;
  contain:content;
}
@supports(content-visibility:auto){
  .process-section{content-visibility:auto;contain-intrinsic-size:1200px 800px}
}

/* ==== HEADER (H2) ==== */
.process-section .section-header{text-align:center;max-width:840px;margin:0 auto 2rem}
.process-section .header-badge{
  display:inline-block;background:var(--accent-yellow-light);color:var(--text-dark);
  padding:.4rem 1rem;border-radius:999px;font:.85rem 'Montserrat',sans-serif;font-weight:700;margin-bottom:.65rem
}
.process-section .section-header .section-title{
  font:700 1.6rem 'Montserrat',sans-serif;color:var(--text-dark);
  line-height:1.15;margin-bottom:.35rem;position:relative;padding-bottom:.35rem;letter-spacing:0
}
.process-section .section-header .section-title::after{
  content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:52px;height:2px;background-image:linear-gradient(to right,var(--accent-gradient-start),var(--accent-gradient-end));
  border-radius:2px
}
.process-section .section-header p{font-size:1rem;color:var(--text-muted);margin-top:.25rem}

/* ==== LAYOUT ==== */
.process-layout-container{display:grid;grid-template-columns:280px 1fr;gap:1.5rem;max-width:1200px;margin:0 auto}

/* ==== STEPS NAV ==== */
.process-section .step-navigation{position:relative;contain:layout paint}
.process-section .step-connector{position:absolute;top:22px;left:22px;bottom:22px;width:2px;background:var(--border-color);z-index:1;pointer-events:none}

.process-section .step-button{
  display:flex;align-items:center;width:100%;padding:.9rem;border-radius:12px;cursor:pointer;
  background:transparent;border:1px solid transparent;text-align:left;margin-bottom:.65rem;position:relative;z-index:2;
  transition:background-color .2s,border-color .2s,box-shadow .2s;
}
.process-section .step-button:hover{background:var(--primary-white);box-shadow:0 4px 12px rgba(0,0,0,.06)}
.process-section .step-button.active{background:var(--primary-white);border-color:var(--border-color);box-shadow:0 4px 14px rgba(0,0,0,.05)}

.process-section .step-number{
  width:50px;height:50px;display:grid;place-items:center;border-radius:50%;
  background:var(--primary-white);border:2px solid var(--border-color);color:#6b7280;
  font:700 1.02rem 'Montserrat',sans-serif;margin-right:1rem;transition:background-color .2s,border-color .2s,color .2s
}
.process-section .step-button.active .step-number{
  background-image:linear-gradient(to bottom,var(--accent-gradient-start),var(--accent-gradient-end));
  border-color:var(--accent-color);color:var(--text-dark);
}
.process-section .step-button-title{font:600 1rem 'Montserrat',sans-serif;color:var(--text-dark)}

/* ==== CONTENT CARD ==== */
.process-section .content-display{background:var(--primary-white);border-radius:var(--radius);box-shadow:var(--shadow-lg);overflow:hidden;contain:layout paint}

.process-section .tab-content{display:none}
.process-section .tab-content.active{display:block;animation:fadeInOpacity .16s ease-out}
@media (prefers-reduced-motion: reduce){.process-section .tab-content.active{animation:none}}
@keyframes fadeInOpacity{from{opacity:0}to{opacity:1}}

/* ==== IMAGES ==== */
.process-section .image-container{width:100%;height:300px;background:var(--secondary-bg);overflow:hidden;border-bottom:1px solid var(--border-color)}
.process-section .image-container img{
  width:100%;height:100%;object-fit:cover;object-position:center;image-rendering:auto;filter:none;transform:none;
  -ms-interpolation-mode:bicubic
}
.process-section #tab-1 .image-container img{object-position:center 25%}

/* ==== TEXTBLOCK ==== */
.process-section .text-content{padding:1.5rem 1.75rem}
.process-section .step-title{font:700 1.45rem 'Montserrat',sans-serif;margin-bottom:.45rem;color:var(--text-dark)}
.process-section .step-description{font-weight:500;font-size:1rem;line-height:1.65;color:var(--text-muted);margin-bottom:1.1rem}

/* ==== FEATURE LIST ==== */
.process-section .features-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:.85rem}
.process-section .feature-item{display:flex;align-items:flex-start;gap:.7rem}
.process-section .feature-item i{color:var(--accent-color);font-size:1.18rem;margin-top:4px;flex-shrink:0;width:22px;text-align:center}
.process-section .feature-item h4{font:600 1rem 'Montserrat',sans-serif;margin-bottom:.12rem;color:var(--text-dark)}
.process-section .feature-item p{font-weight:500;font-size:.93rem;color:var(--text-muted);line-height:1.5}

/* ==== BUTTON ==== */
.process-section .gemini-button{
  display:inline-flex;align-items:center;gap:.6rem;margin-top:.9rem;padding:.6rem 1.1rem;border:none;border-radius:999px;
  background-image:linear-gradient(to right,var(--accent-gradient-start),var(--accent-gradient-end));
  color:var(--text-dark);font:700 .95rem 'Montserrat',sans-serif;cursor:pointer;transition:box-shadow .18s,transform .18s;
  box-shadow:0 2px 10px rgba(0,0,0,.08)
}
.process-section .gemini-button:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(43,108,176,.28)}
.process-section .inline-cta{color:var(--accent-color);font-weight:700;text-decoration:none}
.process-section .inline-cta:hover{text-decoration:underline}
.process-section .trust-line{font-size:.98rem !important;color:var(--text-muted);margin-top:1.1rem !important;font-weight:600}

/* ==== MODAL ==== */
.process-section .gemini-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:1000;display:none;align-items:center;justify-content:center;opacity:0;transition:opacity .18s ease}
.process-section .gemini-modal-overlay.visible{display:flex;opacity:1}
.process-section .gemini-modal{
  background:var(--primary-white);border-radius:var(--radius);padding:1.5rem;width:90%;max-width:560px;
  box-shadow:0 10px 40px rgba(0,0,0,.2)
}
.process-section .gemini-modal-header{display:flex;justify-content:space-between;align-items:center;padding-bottom:.75rem;border-bottom:1px solid var(--border-color);margin-bottom:1rem}
.process-section .gemini-modal-title{font:700 1.1rem 'Montserrat',sans-serif}
.process-section .gemini-modal-close{background:none;border:none;font-size:1.4rem;cursor:pointer;color:#6b7280}
.process-section .gemini-modal-input-area textarea{width:100%;min-height:96px;border-radius:8px;border:1px solid var(--border-color);padding:.65rem;font:500 1rem 'Montserrat',sans-serif;resize:vertical;margin-bottom:.85rem}
.process-section .gemini-modal-input-area button{width:100%}
.process-section .gemini-modal-loader{display:none;text-align:center;padding:1.25rem 0}
.process-section .spinner{width:36px;height:36px;border:4px solid var(--border-color);border-top-color:var(--accent-color);border-radius:50%;animation:pvVorgehenSpin 1s linear infinite}
@keyframes pvVorgehenSpin{to{transform:rotate(360deg)}}
.process-section .gemini-modal-response-area{margin-top:1rem;white-space:pre-wrap}
.process-section .gemini-modal-response-area p{line-height:1.6}
.process-section .gemini-modal-response-area strong{display:block;margin-bottom:.4rem;font:700 .98rem 'Montserrat',sans-serif}

/* ==== Error shake ==== */
.process-section .shake-error{animation:pvVorgehenShake .6s cubic-bezier(.36,.07,.19,.97) both;border-color:#dc3545!important}
@keyframes pvVorgehenShake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}

/* ==== RESPONSIVE ==== */
@media(max-width:1024px){
  .process-section .process-layout-container{grid-template-columns:1fr}
  .process-section .step-connector{display:none}

  .process-section .section-header{margin-bottom:1rem}
  .process-section .section-header .section-title{font-size:1.55rem;padding-bottom:.35rem;margin-bottom:.35rem}
  .process-section .section-header p{font-size:.98rem;margin-top:.2rem}

  .process-section .step-navigation{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:space-between;margin-top:.45rem}
  .process-section .step-button{flex:1 1 calc(50% - .4rem);padding:.65rem .55rem;text-align:center;flex-direction:column}
  .process-section .step-number{margin:0 0 .35rem 0;width:42px;height:42px;font-size:.92rem}
  .process-section .step-button-title{font-size:.88rem}

  .process-section .image-container{height:220px}
  .process-section .text-content{padding:1.15rem 1rem}
  .process-section .step-title{font-size:1.32rem}
  .process-section .step-description{font-size:.98rem;margin-bottom:.9rem}
  .process-section .features-list{gap:.7rem}
}

@media(max-width:768px){
  .process-section{padding:2rem 1rem}
  .process-section .section-header .section-title{font-size:1.45rem}
  .process-section .step-button-title{font-size:.86rem}
  .process-section .step-number{width:40px;height:40px}
  .process-section .image-container{height:200px}
  .process-section .text-content{padding:1rem .75rem}
}

@media (max-width:420px){
  .process-section{padding:1.5rem .75rem}
  .process-section .header-badge{font-size:.78rem;padding:.35rem .8rem}
  .process-section .section-header .section-title{font-size:1.28rem}
  .process-section .section-header p{font-size:.95rem}
  .process-section .image-container{height:180px}
  .process-section .features-list{gap:.6rem}
  .process-section .feature-item p{font-size:.9rem}
  .process-section .step-button-title{font-size:.8rem}
}
/* === Bildschärfe === */
.process-section .image-container img{
  image-rendering: -webkit-optimize-contrast;
  image-rendering: auto;
  filter: contrast(1.02) saturate(1.02);
  transform: none !important;
  backface-visibility: hidden;
  will-change: auto;
}

/* === Collapsible NUR mobil === */
.process-section .text-content .collapsible{
  overflow: visible;
  max-height: none;
}
.process-section .collapsible-toggle{
  display: none;
}

@media (max-width:640px){
  .process-section .text-content .collapsible{
    overflow: hidden;
    max-height: 0;
    transition: max-height .28s ease;
  }
  .process-section .text-content.is-expanded .collapsible{
    max-height: 9999px;
  }

  .process-section .collapsible-toggle{
    display:inline-flex; align-items:center; gap:.5rem;
    margin-top:.6rem; padding:.5rem .85rem;
    border:1px solid var(--border-color); border-radius:999px;
    background:#fff; color:var(--text-dark); cursor:pointer;
    font:600 .93rem 'Montserrat',sans-serif;
    transition: background-color .15s, box-shadow .15s, border-color .15s;
  }
  .process-section .collapsible-toggle:hover{ box-shadow:0 2px 10px rgba(0,0,0,.06) }
  .process-section .collapsible-toggle .chev{ display:inline-block; transition: transform .25s ease; }
  .process-section .text-content.is-expanded .collapsible-toggle .chev{ transform: rotate(180deg); }

  .process-section .text-content .collapsible::after{ content:none !important; }
}
@media (max-width:640px){
  .process-section .text-content{ padding:.75rem .75rem; }

  .process-section .step-title{
    font-size:1.18rem;
    line-height:1.2;
    margin-bottom:.35rem;
    letter-spacing:0;
  }
  .process-section .step-description{
    font-size:.92rem;
    line-height:1.5;
    margin-bottom:.7rem;
    color:var(--text-muted);
    font-weight:500;
  }

  .process-section .features-list{ gap:.55rem; }
  .process-section .feature-item{ gap:.5rem; }

  .process-section .feature-item i{
    font-size:1rem;
    width:18px;
    margin-top:2px;
  }

  .process-section .features-list h4{
    font-size:.95rem;
    line-height:1.3;
    margin-bottom:.1rem;
    font-weight:600;
  }
  .process-section .features-list p{
    font-size:.88rem;
    line-height:1.45;
    color:var(--text-muted);
    font-weight:500;
  }

  .process-section .gemini-button{
    padding:.5rem .85rem;
    font-size:.88rem;
    margin-top:.55rem;
  }
}

@media (max-width:420px){
  .process-section .step-title{ font-size:1.12rem; }
  .process-section .step-description{ font-size:.9rem; }
  .process-section .feature-item i{ font-size:.95rem; width:16px; }
  .process-section .features-list h4{ font-size:.92rem; }
  .process-section .features-list p{ font-size:.86rem; }
  .process-section .gemini-button{ font-size:.86rem; padding:.45rem .8rem; }
}

/* ===== DESKTOP: feste Bildhöhe ===== */
.process-section{
  --image-desktop-h: 420px;
}

@media (min-width:1025px){
  .process-section .content-display .image-container{
    height: var(--image-desktop-h) !important;
    overflow: hidden;
    border-bottom: 1px solid var(--border-color);
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }
  .process-section .content-display .image-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transform: none !important;
    filter: none !important;
  }

  .process-section #tab-1 .image-container img{ object-position: center 35%; }
  .process-section #tab-2 .image-container img{ object-position: center 50%; }
  .process-section #tab-3 .image-container img{ object-position: center 45%; }
  .process-section #tab-4 .image-container img{ object-position: center 40%; }
}
      `}} />

      <section className="process-section" id="pv-process" aria-label="Ihr Weg zur PV-Anlage">
        <div className="section-header">
          <span className="header-badge">So einfach geht&apos;s</span>
          <h2 className="section-title">Ihr Weg zur PV-Anlage – planungssicher, rechtssicher, wirtschaftlich</h2>
          <p>In <strong>4 klaren Schritten</strong> zur maßgeschneiderten Anlage.</p>
        </div>

        <div className="process-layout-container">
          <div className="step-navigation" id="pv-steps" role="tablist" aria-label="Schritte">
            <div className="step-connector" aria-hidden="true"></div>
            <button className="step-button active" data-tab="1" role="tab" aria-selected="true" aria-controls="tab-1">
              <div className="step-number">01</div>
              <span className="step-button-title">Beratung &amp; Planung</span>
            </button>
            <button className="step-button" data-tab="2" role="tab" aria-selected="false" aria-controls="tab-2">
              <div className="step-number">02</div>
              <span className="step-button-title">Auftrag &amp; Abwicklung</span>
            </button>
            <button className="step-button" data-tab="3" role="tab" aria-selected="false" aria-controls="tab-3">
              <div className="step-number">03</div>
              <span className="step-button-title">Installation</span>
            </button>
            <button className="step-button" data-tab="4" role="tab" aria-selected="false" aria-controls="tab-4">
              <div className="step-number">04</div>
              <span className="step-button-title">Service &amp; Betrieb</span>
            </button>
          </div>

          <div className="content-display" id="pv-content">
            <div id="tab-1" className="tab-content active" role="tabpanel" aria-labelledby="tab-1">
              <div className="image-container">
                <img src="/assets/img/private-loesungen/pv-privat-vorgehen-planung.png" alt="Detaillierter technischer Plan einer Photovoltaikanlage für ein Einfamilienhaus." loading="lazy" width={588} height={331} />
              </div>
              <div className="text-content">
                <h3 className="step-title">Beratung &amp; Planung</h3>
                <p className="step-description">Wir analysieren Bedarf, Standort &amp; Verschattung (auf Wunsch mit Drohne) und entwickeln ein wirtschaftliches, maßgeschneidertes Konzept.</p>
                <ul className="features-list">
                  <li className="feature-item"><i className="fas fa-chart-pie"></i><div><h4>Bedarfsanalyse</h4><p>Passende Anlagengröße und Lastprofil.</p></div></li>
                  <li className="feature-item"><i className="fas fa-map-marked-alt"></i><div><h4>Potenzial-Check</h4><p>Ausrichtung, Statik, Verschattung.</p></div></li>
                  <li className="feature-item"><i className="fas fa-file-invoice-dollar"></i><div><h4>Transparentes Angebot</h4><p>Klare Positionen ohne versteckte Kosten.</p></div></li>
                </ul>
              </div>
            </div>

            <div id="tab-2" className="tab-content" role="tabpanel" aria-labelledby="tab-2">
              <div className="image-container">
                <img src="/assets/img/private-loesungen/pv-privat-vorgehen-abwicklung.png" alt="Projektleiter bespricht die Auftragsabwicklung einer Photovoltaikanlage mit dem Kunden." loading="lazy" width={588} height={331} />
              </div>
              <div className="text-content">
                <h3 className="step-title">Auftrag &amp; Abwicklung</h3>
                <p className="step-description">Fester Projektleiter, Termin- und Materialkoordination sowie komplette Formalitäten mit VNB und Behörden.</p>
                <ul className="features-list">
                  <li className="feature-item"><i className="fas fa-user-tie"></i><div><h4>Projektleitung</h4><p>Ein Ansprechpartner, klare Timeline.</p></div></li>
                  <li className="feature-item"><i className="fas fa-gavel"></i><div><h4>Bürokratie</h4><p>VNB-Anmeldung &amp; Genehmigungen.</p></div></li>
                  <li className="feature-item"><i className="fas fa-truck"></i><div><h4>Logistik</h4><p>Pünktliche Lieferung, saubere Abläufe.</p></div></li>
                </ul>
              </div>
            </div>

            <div id="tab-3" className="tab-content" role="tabpanel" aria-labelledby="tab-3">
              <div className="image-container">
                <img src="/assets/img/private-loesungen/pv-privat-vorgehen-installation.jpeg" alt="Fachgerechte Installation von Solarmodulen auf einem Ziegeldach." loading="lazy" width={588} height={392} />
              </div>
              <div className="text-content">
                <h3 className="step-title">Installation</h3>
                <p className="step-description">Zertifizierte Montage, normgerechte DC/AC-Installation, Inbetriebnahme und Einweisung inkl. Monitoring-App.</p>
                <ul className="features-list">
                  <li className="feature-item"><i className="fas fa-hard-hat"></i><div><h4>Fachmontage</h4><p>DIN/VDE-konform, sauber &amp; sicher.</p></div></li>
                  <li className="feature-item"><i className="fas fa-bolt"></i><div><h4>Elektro</h4><p>Erfahrene Elektriker, geprüfte Qualität.</p></div></li>
                  <li className="feature-item"><i className="fas fa-mobile-alt"></i><div><h4>Einweisung</h4><p>Funktionen &amp; Monitoring verständlich erklärt.</p></div></li>
                </ul>
              </div>
            </div>

            <div id="tab-4" className="tab-content" role="tabpanel" aria-labelledby="tab-4">
              <div className="image-container">
                <img src="/assets/img/private-loesungen/pv-privat-vorgehen-betrieb.jpeg" alt="Fertige Photovoltaikanlage im Betrieb bei Sonnenuntergang." loading="lazy" width={588} height={392} />
              </div>
              <div className="text-content">
                <h3 className="step-title">Service &amp; Betrieb</h3>
                <p className="step-description">O&amp;M mit Monitoring (Alarme, PR), jährlicher Sicht-/E-Prüfung, Reaktionszeit &lt;48 h sowie Garantie-/Versicherungsabwicklung.</p>
                <ul className="features-list">
                  <li className="feature-item"><i className="fas fa-award"></i><div><h4>Doku</h4><p>Unterlagen &amp; Garantien sauber aufbereitet.</p></div></li>
                  <li className="feature-item"><i className="fas fa-life-ring"></i><div><h4>Support</h4><p>Langfristige Begleitung im Betrieb.</p></div></li>
                  <li className="feature-item"><i className="fas fa-chart-line"></i><div><h4>Wartung</h4><p>Professionelle Pakete &amp; Monitoring.</p></div></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


