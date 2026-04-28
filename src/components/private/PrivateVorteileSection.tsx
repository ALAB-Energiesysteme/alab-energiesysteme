"use client";

import { useEffect } from "react";

export default function PrivateVorteileSection() {
  useEffect(() => {
    const root = document.getElementById('privat-vorteile');
    if (!root) return;

    const observerOptions: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          if (entry.target.classList.contains('benefit-visual')) {
            const paths = entry.target.querySelectorAll('path, rect, line, polyline, circle');
            paths.forEach((p, i) => setTimeout(() => { (p as HTMLElement).style.animation = 'drawPath 2s ease forwards'; }, i * 100));
          }
        }
      });
    }, observerOptions);

    root.querySelectorAll('.benefit-content, .benefit-visual, .cta-badge, .cta-title, .cta-subtitle, .btn, .cta-trust')
      .forEach(el => animateOnScroll.observe(el));

    const mouseMoveHandlers: { wrapper: Element; moveHandler: (e: MouseEvent) => void; leaveHandler: () => void }[] = [];

    root.querySelectorAll('.icon-wrapper').forEach(wrapper => {
      const moveHandler = (e: MouseEvent) => {
        const r = (wrapper as HTMLElement).getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        const icon = wrapper.querySelector('.benefit-icon') as HTMLElement | null;
        if (icon) icon.style.transform = `translate(-50%, -50%) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
        wrapper.querySelectorAll('.particle').forEach((p, i) => (p as HTMLElement).style.transform = `translate(${dx * (i + 1) * 5}px, ${dy * (i + 1) * 5}px)`);
      };
      const leaveHandler = () => {
        const icon = wrapper.querySelector('.benefit-icon') as HTMLElement | null;
        if (icon) icon.style.transform = 'translate(-50%, -50%) rotateY(0) rotateX(0)';
        wrapper.querySelectorAll('.particle').forEach(p => (p as HTMLElement).style.transform = 'translate(0,0)');
      };
      wrapper.addEventListener('mousemove', moveHandler as EventListener);
      wrapper.addEventListener('mouseleave', leaveHandler as EventListener);
      mouseMoveHandlers.push({ wrapper, moveHandler, leaveHandler });
    });

    const linkClickHandlers: { link: Element; handler: (e: Event) => void }[] = [];

    root.querySelectorAll('a[href^="http"]').forEach(link => {
      const handler = (e: Event) => {
        if (link.getAttribute('target') !== '_blank') {
          e.preventDefault();
          const href = link.getAttribute('href');
          (root as HTMLElement).style.opacity = '0';
          setTimeout(() => { window.location.href = href!; }, 300);
        }
      };
      link.addEventListener('click', handler);
      linkClickHandlers.push({ link, handler });
    });

    const btnClickHandlers: { btn: Element; handler: () => void }[] = [];

    root.querySelectorAll('.btn').forEach(btn => {
      const handler = () => {
        const label = btn.textContent || 'CTA';
        if (typeof (window as any).gtag !== 'undefined') (window as any).gtag('event', 'click', { event_category: 'CTA', event_label: label });
      };
      btn.addEventListener('click', handler);
      btnClickHandlers.push({ btn, handler });
    });

    return () => {
      animateOnScroll.disconnect();
      mouseMoveHandlers.forEach(({ wrapper, moveHandler, leaveHandler }) => {
        wrapper.removeEventListener('mousemove', moveHandler as EventListener);
        wrapper.removeEventListener('mouseleave', leaveHandler as EventListener);
      });
      linkClickHandlers.forEach(({ link, handler }) => {
        link.removeEventListener('click', handler);
      });
      btnClickHandlers.forEach(({ btn, handler }) => {
        btn.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
#privat-vorteile{
  --primary-gold:#2b6cb0;
  --gold-light:#6aa6e8;
  --gold-dark:#1e4f8b;
  --text-dark:#2c3e50;
  --text-medium:#5a6c7d;
  --text-light:#94a3b8;
  --white:#ffffff;
  --bg-light:#fafafa;
  --shadow-sm:0 2px 10px rgba(0,0,0,.05);
  --shadow-md:0 10px 30px rgba(0,0,0,.08);
  --shadow-lg:0 20px 60px rgba(0,0,0,.12);
  --shadow-xl:0 30px 80px rgba(0,0,0,.15);
}
#privat-vorteile .container{ max-width:1280px; margin:0 auto; padding:0 24px; width:100%; }
#privat-vorteile .intro-section{ padding:60px 0; background:var(--bg-light); }
#privat-vorteile .intro-content{ text-align:center; }
#privat-vorteile .section-badge{ display:inline-block; padding:6px 18px; background:linear-gradient(135deg,var(--gold-dark),var(--gold-light)); color:#fff; border-radius:20px; font-size:.75rem; font-weight:600; letter-spacing:.5px; text-transform:uppercase; margin-bottom:15px; }
#privat-vorteile .section-title{ font-size:clamp(1.5rem,3vw,2rem); font-weight:600; margin-bottom:20px; color:var(--text-dark); }
#privat-vorteile .section-title .highlight{ background:linear-gradient(135deg,var(--gold-dark),var(--gold-light)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
#privat-vorteile .section-description{ font-size:.95rem; line-height:1.6; max-width:800px; margin:0 auto 30px; color:var(--text-medium); }
#privat-vorteile .stats-row{ display:flex; justify-content:center; gap:40px; margin:30px 0 0; flex-wrap:wrap; }
#privat-vorteile .stat-item{ text-align:center; }
#privat-vorteile .stat-value{ font-size:1.8rem; font-weight:700; color:var(--primary-gold); display:block; }
#privat-vorteile .stat-label{ font-size:.85rem; color:var(--text-medium); margin-top:5px; }
#privat-vorteile .benefit-section{ padding:60px 0; position:relative; overflow:hidden; }
#privat-vorteile .benefit-section.alt-bg{ background:var(--bg-light); }
#privat-vorteile .benefit-container{ display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center; }
#privat-vorteile .benefit-section.reverse .benefit-container{ direction:rtl; }
#privat-vorteile .benefit-section.reverse .benefit-content{ direction:ltr; }
#privat-vorteile .benefit-visual{ position:relative; display:flex; justify-content:center; align-items:center; }
#privat-vorteile .icon-wrapper{ position:relative; width:250px; height:250px; margin:0 auto; }
#privat-vorteile .icon-background{ position:absolute; inset:0; background:radial-gradient(circle, rgba(43,108,176,.1) 0%, transparent 70%); border-radius:50%; animation:rotateGlow 20s linear infinite; }
@keyframes rotateGlow{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
#privat-vorteile .benefit-icon{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:150px; height:150px; }
#privat-vorteile .icon-lightning path{ stroke-dasharray:500; stroke-dashoffset:500; animation:drawPath 2s ease forwards; }
#privat-vorteile .icon-modules rect, #privat-vorteile .icon-modules path{ stroke-dasharray:200; stroke-dashoffset:200; animation:drawPath 2s ease forwards; }
#privat-vorteile .icon-monitoring rect, #privat-vorteile .icon-monitoring line, #privat-vorteile .icon-monitoring polyline{ stroke-dasharray:300; stroke-dashoffset:300; animation:drawPath 2s ease forwards; }
@keyframes drawPath{ to{ stroke-dashoffset:0 } }
#privat-vorteile .floating-particles{ position:absolute; inset:0; }
#privat-vorteile .particle{ position:absolute; width:4px; height:4px; background:var(--primary-gold); border-radius:50%; opacity:.6; }
#privat-vorteile .particle:nth-child(1){ top:20%; left:30%; animation:float 6s ease-in-out infinite; }
#privat-vorteile .particle:nth-child(2){ top:60%; right:20%; animation:float 8s ease-in-out infinite 1s; }
#privat-vorteile .particle:nth-child(3){ bottom:30%; left:20%; animation:float 7s ease-in-out infinite 2s; }
@keyframes float{0%,100%{transform:translate(0,0)}25%{transform:translate(10px,-20px)}50%{transform:translate(-10px,10px)}75%{transform:translate(20px,-10px)}}
#privat-vorteile .benefit-content{ opacity:0; transform:translateX(-50px); }
#privat-vorteile .benefit-section .benefit-content{ transform:translateX(50px); }
#privat-vorteile .benefit-content.in-view{ opacity:1; transform:translateX(0); transition:all .8s cubic-bezier(.16,1,.3,1); }
#privat-vorteile .section-label{ display:inline-block; padding:4px 12px; background:rgba(43,108,176,.1); border-radius:15px; color:var(--primary-gold); font-size:.75rem; font-weight:600; letter-spacing:.5px; text-transform:uppercase; margin-bottom:15px; }
#privat-vorteile .benefit-title{ font-size:clamp(1.5rem,3vw,2.2rem); font-weight:600; margin-bottom:20px; }
#privat-vorteile .text-gradient{ background:linear-gradient(135deg,var(--gold-dark),var(--gold-light)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
#privat-vorteile .benefit-description{ font-size:.95rem; line-height:1.6; color:var(--text-medium); margin-bottom:25px; }
#privat-vorteile .highlight-stat{ font-size:1.1em; font-weight:700; color:var(--primary-gold); padding:0 3px; }
#privat-vorteile .feature-tag{ display:inline-block; padding:2px 8px; background:rgba(43,108,176,.1); border-radius:4px; color:var(--text-dark); font-weight:600; font-size:.9rem; }
#privat-vorteile .benefit-features{ display:flex; flex-direction:column; gap:12px; }
#privat-vorteile .feature-item{ display:flex; align-items:center; gap:12px; padding:10px 15px; background:#fff; border-radius:8px; box-shadow:var(--shadow-sm); transition:.3s; }
#privat-vorteile .feature-item:hover{ transform:translateX(10px); box-shadow:var(--shadow-md); }
#privat-vorteile .feature-icon{ width:24px; height:24px; background:linear-gradient(135deg,var(--gold-dark),var(--gold-light)); color:#fff; display:flex; align-items:center; justify-content:center; border-radius:50%; font-weight:700; font-size:.8rem; flex-shrink:0; }
#privat-vorteile .feature-item span{ color:var(--text-dark); font-weight:500; font-size:.9rem; }
#privat-vorteile .cta-section{ padding:120px 0; position:relative; overflow:hidden; background:#fff; }
@media (max-width:1024px){
  #privat-vorteile .benefit-container{ gap:40px; }
  #privat-vorteile .icon-wrapper{ width:200px; height:200px; }
  #privat-vorteile .benefit-icon{ width:120px; height:120px; }
}
@media (max-width:768px){
  #privat-vorteile .intro-section{ padding:40px 0; }
  #privat-vorteile .benefit-section{ padding:40px 0; }
  #privat-vorteile .benefit-container{ grid-template-columns:1fr; gap:30px; direction:ltr; }
  #privat-vorteile .icon-wrapper{ width:180px; height:180px; margin:0 auto; }
  #privat-vorteile .benefit-icon{ width:100px; height:100px; }
  #privat-vorteile .benefit-title{ font-size:1.5rem; }
}
@media (max-width: 768px){
  #privat-vorteile .benefit-visual, #privat-vorteile .icon-wrapper, #privat-vorteile .icon-background, #privat-vorteile .floating-particles { display: none !important; }
  #privat-vorteile .benefit-section { padding: 28px 0 !important; }
  #privat-vorteile .benefit-container { grid-template-columns: 1fr !important; gap: 18px !important; }
}
@media (max-width: 480px){
  .modal-content{ width: 92%; border-radius: 16px; max-height: 86svh; overflow-y: auto; overscroll-behavior: contain; }
  .modal-header{ padding: 14px 16px; }
  .modal-header h2{ font-size: 20px; line-height: 1.2; margin: 0; }
  .modal-close{ width: 32px; height: 32px; font-size: 26px; }
  .modal-body{ padding: 14px 16px; }
  .lead-form{ grid-template-columns: 1fr; gap: 10px; }
  .lead-form .form-group{ gap: 6px; }
  .lead-form label{ font-size: 13px; line-height: 1.2; }
  .lead-form input, .lead-form textarea{ padding: 10px 12px; font-size: 15px; border-radius: 10px; }
  .lead-form textarea{ min-height: 80px; }
  .submit-btn{ padding: 12px 16px; font-size: 15px; margin-top: 8px; }
}
      `}} />

      <div id="privat-vorteile">
        <section className="intro-section" id="intro">
          <div className="container">
            <div className="intro-content">
              <div className="section-badge">Zukunft beginnt heute</div>
              <h2 className="section-title">
                Photovoltaik für Ihr Zuhause –
                <span className="highlight">Eine lohnenswerte Investition</span>
              </h2>
              <p className="section-description">
                Mit einer Photovoltaikanlage senken Sie Ihre Stromkosten und machen sich unabhängig von steigenden Energiepreisen.
                Durch staatliche <span style={{color:'#000',fontWeight:600}}>Förderungen und Steuervorteile</span> wird die Anschaffung zusätzlich attraktiv.
                Ökologisch gesehen leisten Sie einen wichtigen Beitrag zum Klimaschutz, indem Sie den
                <span className="eco-badge">CO₂-Ausstoß reduzieren</span> und auf saubere Sonnenenergie setzen.
                Langfristig steigern Sie den Wert Ihrer Immobilie und profitieren von einer nachhaltigen, grünen Energiequelle.
              </p>

              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-value">25</div>
                  <div className="stat-label">Jahre Garantie</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">80%</div>
                  <div className="stat-label">Kostenersparnis</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Grüne Energie</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefit-section" id="benefit-1">
          <div className="container benefit-container">
            <div className="benefit-visual">
              <div className="icon-wrapper">
                <div className="icon-background"></div>
                <svg className="benefit-icon" viewBox="0 0 240 240" aria-hidden="true">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#2b6cb0'}} /><stop offset="100%" style={{stopColor:'#6aa6e8'}} />
                    </linearGradient>
                  </defs>
                  <g className="icon-lightning">
                    <path d="M130 40 L90 120 L110 120 L100 200 L150 100 L130 100 Z" fill="none" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="120" cy="120" r="80" fill="none" stroke="url(#gradient1)" strokeWidth="2" opacity="0.3" />
                    <circle cx="120" cy="120" r="95" fill="none" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
                  </g>
                </svg>
                <div className="floating-particles">
                  <div className="particle"></div><div className="particle"></div><div className="particle"></div>
                </div>
              </div>
            </div>
            <div className="benefit-content">
              <div className="section-label">Vorteil 01</div>
              <h2 className="benefit-title">Energieeinsparung &amp;<br /><span className="text-gradient">Unabhängigkeit</span></h2>
              <p className="benefit-description">Mit einer hochwertigen Photovoltaikanlage senken Sie Ihre Stromkosten um bis zu <span className="highlight-stat">80%</span> und machen sich langfristig unabhängig von steigenden Energiepreisen – für <span className="feature-tag">finanzielle Planungssicherheit</span> und <span className="feature-tag">grünes Gewissen</span>.</p>
              <div className="benefit-features">
                <div className="feature-item"><div className="feature-icon">✓</div><span>Sofortige Kostensenkung</span></div>
                <div className="feature-item"><div className="feature-icon">✓</div><span>Unabhängigkeit vom Stromnetz</span></div>
                <div className="feature-item"><div className="feature-icon">✓</div><span>Langfristige Wertsteigerung</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefit-section reverse" id="benefit-2">
          <div className="container benefit-container">
            <div className="benefit-visual">
              <div className="icon-wrapper">
                <div className="icon-background"></div>
                <svg className="benefit-icon" viewBox="0 0 240 240" aria-hidden="true">
                  <defs>
                    <linearGradient id="gradient1b" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#2b6cb0'}} /><stop offset="100%" style={{stopColor:'#6aa6e8'}} />
                    </linearGradient>
                  </defs>
                  <g className="icon-modules">
                    <rect x="60" y="60" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1b)" strokeWidth="3" />
                    <rect x="140" y="60" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1b)" strokeWidth="3" />
                    <rect x="60" y="140" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1b)" strokeWidth="3" />
                    <rect x="140" y="140" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1b)" strokeWidth="3" />
                    <path d="M100 80 L140 80 M80 100 L80 140 M160 100 L160 140 M100 160 L140 160" stroke="url(#gradient1b)" strokeWidth="2" opacity="0.6" />
                    <circle cx="120" cy="120" r="5" fill="url(#gradient1b)" />
                  </g>
                </svg>
                <div className="floating-particles">
                  <div className="particle"></div><div className="particle"></div><div className="particle"></div>
                </div>
              </div>
            </div>
            <div className="benefit-content">
              <div className="section-label">Vorteil 02</div>
              <h2 className="benefit-title">Zukunftssichere<br /><span className="text-gradient">Erweiterbarkeit</span></h2>
              <p className="benefit-description">Starten Sie jetzt mit Ihrer Basis-PV-Anlage und erweitern Sie das System später mühelos um <span className="feature-tag">Batteriespeicher</span> oder eine <span className="feature-tag">Wallbox für Ihr E-Fahrzeug</span> – damit Ihre Eigenverbrauchsquote und Rendite weiter steigen.</p>
              <div className="benefit-features">
                <div className="feature-item"><div className="feature-icon">✓</div><span>Modulares System</span></div>
                <div className="feature-item"><div className="feature-icon">✓</div><span>Flexible Erweiterung</span></div>
                <div className="feature-item"><div className="feature-icon">✓</div><span>Zukunftssichere Investition</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefit-section" id="benefit-3">
          <div className="container benefit-container">
            <div className="benefit-visual">
              <div className="icon-wrapper">
                <div className="icon-background"></div>
                <svg className="benefit-icon" viewBox="0 0 240 240" aria-hidden="true">
                  <defs>
                    <linearGradient id="gradient1c" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#2b6cb0'}} /><stop offset="100%" style={{stopColor:'#6aa6e8'}} />
                    </linearGradient>
                  </defs>
                  <g className="icon-monitoring">
                    <rect x="70" y="40" width="100" height="160" rx="10" fill="none" stroke="url(#gradient1c)" strokeWidth="3" />
                    <line x1="70" y1="170" x2="170" y2="170" stroke="url(#gradient1c)" strokeWidth="2" />
                    <circle cx="120" cy="185" r="8" fill="none" stroke="url(#gradient1c)" strokeWidth="2" />
                    <polyline points="90,130 105,110 125,140 140,100 155,120" fill="none" stroke="url(#gradient1c)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="90" cy="130" r="4" fill="url(#gradient1c)" />
                    <circle cx="105" cy="110" r="4" fill="url(#gradient1c)" />
                    <circle cx="125" cy="140" r="4" fill="url(#gradient1c)" />
                    <circle cx="140" cy="100" r="4" fill="url(#gradient1c)" />
                    <circle cx="155" cy="120" r="4" fill="url(#gradient1c)" />
                  </g>
                </svg>
                <div className="floating-particles">
                  <div className="particle"></div><div className="particle"></div><div className="particle"></div>
                </div>
              </div>
            </div>
            <div className="benefit-content">
              <div className="section-label">Vorteil 03</div>
              <h2 className="benefit-title">Smartes<br /><span className="text-gradient">Monitoring</span></h2>
              <p className="benefit-description">Behalten Sie Ertrag und Performance Ihrer Anlage jederzeit im <span className="text-accent">Blick</span> – per <span className="feature-tag">Smartphone-App</span>. So sichern Sie maximale Verfügbarkeit und <span className="feature-tag">sorgfreie Stromproduktion</span>.</p>
              <div className="benefit-features">
                <div className="feature-item"><div className="feature-icon">✓</div><span>Echtzeit-Überwachung</span></div>
                <div className="feature-item"><div className="feature-icon">✓</div><span>Performance-Analysen</span></div>
                <div className="feature-item"><div className="feature-icon">✓</div><span>Fehlerfrüherkennung</span></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


