"use client";

import { useEffect } from "react";

export default function PrivateKomponentenSection() {
  useEffect(() => {
    const root = document.getElementById("alab-hero");
    if (!root) return;

    const heroWrapper = root.querySelector(".hero-image-wrapper") as HTMLElement | null;
    if (!heroWrapper) return;

    const hotspots: NodeListOf<HTMLElement> = root.querySelectorAll(".hotspot");
    const infoCards: NodeListOf<HTMLElement> = root.querySelectorAll(".info-card");
    const accordionItems: NodeListOf<HTMLElement> = root.querySelectorAll(".accordion-item");
    let activeHotspot: HTMLElement | null = null;
    let activeCard: HTMLElement | null = null;

    function positionCard(hotspot: HTMLElement, card: HTMLElement) {
      const hotspotRect = hotspot.getBoundingClientRect();
      const containerRect = heroWrapper!.getBoundingClientRect();
      const cardWidth = 380;
      const cardHeight = card.offsetHeight || 400;
      const padding = 20;

      const hotspotRelativeLeft = hotspotRect.left - containerRect.left;
      const hotspotRelativeTop = hotspotRect.top - containerRect.top;

      let cardLeft: number, cardTop: number;
      let positionClass = "";

      if (containerRect.right - hotspotRect.right > cardWidth + padding) {
        cardLeft = hotspotRelativeLeft + hotspotRect.width + padding;
        cardTop = hotspotRelativeTop - cardHeight / 2 + hotspotRect.height / 2;
        positionClass = "position-right";
      } else if (hotspotRect.left - containerRect.left > cardWidth + padding) {
        cardLeft = hotspotRelativeLeft - cardWidth - padding;
        cardTop = hotspotRelativeTop - cardHeight / 2 + hotspotRect.height / 2;
        positionClass = "position-left";
      } else {
        cardLeft = hotspotRelativeLeft - cardWidth / 2 + hotspotRect.width / 2;
        cardTop = hotspotRelativeTop + hotspotRect.height + padding;
        positionClass = "position-bottom";
      }

      cardLeft = Math.max(padding, Math.min(cardLeft, containerRect.width - cardWidth - padding));
      cardTop = Math.max(padding, Math.min(cardTop, containerRect.height - cardHeight - padding));

      card.style.left = `${cardLeft}px`;
      card.style.top = `${cardTop}px`;

      card.className = card.className.replace(/position-\w+/g, "");
      card.classList.add(positionClass);
    }

    function removeConnectionLines() {
      const lines = heroWrapper!.querySelectorAll(".connection-line");
      lines.forEach((line) => line.remove());
    }

    function removeHoverLine() {
      const hoverLine = heroWrapper!.querySelector(".hover-line");
      if (hoverLine) hoverLine.remove();
    }

    function createConnectionLine(hotspot: HTMLElement, card: HTMLElement) {
      removeConnectionLines();
      if (!card) return;

      const line = document.createElement("div");
      line.className = "connection-line";
      line.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, #2b6cb0, #6aa6e8);
        z-index: 15;
        pointer-events: none;
        transition: all 0.3s ease;
      `;

      const hotspotRect = hotspot.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const containerRect = heroWrapper!.getBoundingClientRect();

      const hotspotCenterX = hotspotRect.left + hotspotRect.width / 2 - containerRect.left;
      const hotspotCenterY = hotspotRect.top + hotspotRect.height / 2 - containerRect.top;

      if (card.classList.contains("position-right")) {
        const cardConnectX = cardRect.left - containerRect.left;
        line.style.width = `${cardConnectX - hotspotCenterX}px`;
        line.style.height = "2px";
        line.style.left = `${hotspotCenterX}px`;
        line.style.top = `${hotspotCenterY}px`;
      } else if (card.classList.contains("position-left")) {
        const cardConnectX = cardRect.right - containerRect.left;
        line.style.width = `${hotspotCenterX - cardConnectX}px`;
        line.style.height = "2px";
        line.style.left = `${cardConnectX}px`;
        line.style.top = `${hotspotCenterY}px`;
      } else {
        const cardConnectY = cardRect.top - containerRect.top;
        line.style.width = "2px";
        line.style.height = `${cardConnectY - hotspotCenterY}px`;
        line.style.left = `${hotspotCenterX}px`;
        line.style.top = `${hotspotCenterY}px`;
      }

      heroWrapper!.appendChild(line);
    }

    function createHoverLine(hotspot: HTMLElement) {
      const line = document.createElement("div");
      line.className = "hover-line";
      line.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, #2b6cb0, #6aa6e8);
        opacity: 0.3;
        z-index: 14;
        pointer-events: none;
        width: 30px;
        height: 2px;
        transition: all 0.2s ease;
      `;

      const hotspotRect = hotspot.getBoundingClientRect();
      const containerRect = heroWrapper!.getBoundingClientRect();

      const hotspotCenterX = hotspotRect.left + hotspotRect.width / 2 - containerRect.left;
      const hotspotCenterY = hotspotRect.top + hotspotRect.height / 2 - containerRect.top;

      line.style.left = `${hotspotCenterX + hotspotRect.width / 2}px`;
      line.style.top = `${hotspotCenterY}px`;

      heroWrapper!.appendChild(line);
    }

    function closeAllCards() {
      hotspots.forEach((h) => {
        h.classList.remove("active", "inactive");
      });
      infoCards.forEach((card) => {
        card.classList.remove("active");
      });
      removeConnectionLines();
      activeHotspot = null;
      activeCard = null;
    }

    function openCard(hotspot: HTMLElement, card: HTMLElement) {
      hotspot.classList.add("active");
      activeHotspot = hotspot;

      hotspots.forEach((h) => {
        if (h !== hotspot) {
          h.classList.add("inactive");
        }
      });

      positionCard(hotspot, card);
      card.classList.add("active");
      activeCard = card;

      createConnectionLine(hotspot, card);
    }

    function handleHotspotClick(hotspot: HTMLElement) {
      const componentId = hotspot.dataset.component;
      const card = document.getElementById(`${componentId}-card`);
      if (!card) return;

      if (activeHotspot === hotspot) {
        closeAllCards();
        return;
      }

      closeAllCards();

      setTimeout(() => {
        openCard(hotspot, card as HTMLElement);
      }, 100);
    }

    // Desktop hotspot interactions
    const hotspotClickHandlers: Array<{ el: HTMLElement; handler: (e: Event) => void }> = [];
    const hotspotEnterHandlers: Array<{ el: HTMLElement; handler: () => void }> = [];
    const hotspotLeaveHandlers: Array<{ el: HTMLElement; handler: () => void }> = [];

    hotspots.forEach((hotspot) => {
      const clickHandler = (e: Event) => {
        e.stopPropagation();
        handleHotspotClick(hotspot);
      };
      hotspot.addEventListener("click", clickHandler);
      hotspotClickHandlers.push({ el: hotspot, handler: clickHandler });

      const enterHandler = () => {
        if (!activeHotspot) {
          createHoverLine(hotspot);
        }
      };
      hotspot.addEventListener("mouseenter", enterHandler);
      hotspotEnterHandlers.push({ el: hotspot, handler: enterHandler });

      const leaveHandler = () => {
        removeHoverLine();
      };
      hotspot.addEventListener("mouseleave", leaveHandler);
      hotspotLeaveHandlers.push({ el: hotspot, handler: leaveHandler });
    });

    // Mobile accordion interactions – click on .accordion-head toggles .active on parent .accordion-item
    const accordionClickHandlers: Array<{ el: HTMLElement; handler: () => void }> = [];
    accordionItems.forEach((item) => {
      const head = item.querySelector(".accordion-head") as HTMLElement | null;
      const trigger = head || item;
      const handler = () => {
        const componentId = item.dataset.component;
        const wasActive = item.classList.contains("active");

        accordionItems.forEach((i) => {
          i.classList.remove("active");
          const h = i.querySelector(".accordion-head") as HTMLElement | null;
          if (h) h.setAttribute("aria-expanded", "false");
        });

        if (!wasActive) {
          item.classList.add("active");
          if (head) head.setAttribute("aria-expanded", "true");

          const hotspot = root.querySelector(`.hotspot[data-component="${componentId}"]`) as HTMLElement | null;
          if (hotspot && window.innerWidth > 768) {
            hotspot.scrollIntoView({ behavior: "smooth", block: "center" });
            hotspot.classList.add("active");
            setTimeout(() => {
              hotspot.classList.remove("active");
            }, 1000);
          }
        }
      };
      trigger.addEventListener("click", handler);
      accordionClickHandlers.push({ el: trigger, handler });
    });

    // Close card when clicking outside
    const outsideClickHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".hotspot") && !target.closest(".info-card")) {
        closeAllCards();
      }
    };
    document.addEventListener("click", outsideClickHandler);

    // Handle window resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (activeHotspot && activeCard) {
          positionCard(activeHotspot, activeCard);
        }
      }, 100);
    };
    window.addEventListener("resize", resizeHandler);

    // Add SVG overlay for connection lines
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "5";
    svg.style.opacity = "0";
    svg.style.transition = "opacity 0.3s ease";
    heroWrapper.appendChild(svg);
    setTimeout(() => {
      svg.style.opacity = "1";
    }, 100);

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "lineGradient");
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#2b6cb0");
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#6aa6e8");
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Add CSS animations dynamically
    const animStyle = document.createElement("style");
    animStyle.textContent = `
      @keyframes connectionPulse {
        0%, 100% { opacity: 0.3; stroke-dashoffset: 0; }
        50% { opacity: 0.8; stroke-dashoffset: -10; }
      }
    `;
    document.head.appendChild(animStyle);

    // Cleanup
    return () => {
      hotspotClickHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler));
      hotspotEnterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      hotspotLeaveHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseleave", handler));
      accordionClickHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler));
      document.removeEventListener("click", outsideClickHandler);
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(resizeTimeout);
      if (svg.parentNode) svg.parentNode.removeChild(svg);
      if (animStyle.parentNode) animStyle.parentNode.removeChild(animStyle);
      removeConnectionLines();
      removeHoverLine();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
/* === ALAB Hero/Hotspot – vollständig gekapselt unter #alab-hero === */

/* Component Scope Reset */
#alab-hero,
#alab-hero * {
  box-sizing: border-box;
}

/* CSS Variables nur für das Modul */
#alab-hero{
  --accent-gradient-start: #2b6cb0;
  --accent-gradient-end: #6aa6e8;
  --text-primary: #2D3436;
  --text-secondary: #636E72;
  --background-light: #F8F9FA;
  --background-white: #FFFFFF;
  --border-light: #E9ECEF;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,.04), 0 2px 4px -1px rgba(0,0,0,.06);
  --shadow-lg: 0 10px 25px -5px rgba(0,0,0,.06), 0 10px 10px -5px rgba(0,0,0,.04);
  --shadow-xl: 0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.05);
  --shadow-2xl: 0 25px 50px -12px rgba(0,0,0,.10), 0 12px 25px -8px rgba(0,0,0,.05);
  --shadow-glow: 0 0 40px rgba(43,108,176,.15);
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Montserrat', sans-serif;
  --container-max-width: 1400px;
  --spacing-xs: .5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  color: var(--text-primary);
  background-color: #fff;
  line-height: 1.6;
  min-height: 100%;
  overflow-x: hidden;
  font-family: var(--font-body);
}

#alab-hero .alab-container{
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

#alab-hero .section-header{
  text-align: center;
  margin-bottom: calc(var(--spacing-xl)*1.5);
  position: relative;
  animation: alab-fadeInDown .8s cubic-bezier(.2,.6,.2,1);
}

#alab-hero .eyebrow{
  display: inline-block;
  background: linear-gradient(135deg,var(--accent-gradient-start),var(--accent-gradient-end));
  color: var(--text-primary);
  padding: 8px 20px;
  border-radius: 24px;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
  position: relative;
  box-shadow: 0 4px 15px rgba(43,108,176,.2);
  animation: alab-slideInUp .6s cubic-bezier(.2,.6,.2,1);
}

@keyframes alab-fadeInDown{
  from{opacity:0; transform:translateY(-20px)}
  to{opacity:1; transform:translateY(0)}
}
@keyframes alab-slideInUp{
  from{opacity:0; transform:translateY(20px)}
  to{opacity:1; transform:translateY(0)}
}

#alab-hero .title{
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--text-primary) 0%, #4A5568 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: alab-fadeIn .8s cubic-bezier(.2,.6,.2,1) .2s both;
  letter-spacing: -.02em;
}

#alab-hero .subtitle{
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
  animation: alab-fadeIn .8s cubic-bezier(.2,.6,.2,1) .4s both;
}

@keyframes alab-fadeIn{
  from{opacity:0; transform:translateY(10px)}
  to{opacity:1; transform:translateY(0)}
}

#alab-hero .hotspot-container{
  position: relative;
  margin-bottom: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

#alab-hero .hero-image-wrapper{
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: var(--radius-xl);
  overflow: visible;
  padding: 20px;
  filter: drop-shadow(0 10px 30px rgba(43,108,176,.08));
}

#alab-hero .hero-image{
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  max-height: 600px;
}

#alab-hero .hotspot{
  position: absolute;
  width: 56px;
  height: 56px;
  cursor: pointer;
  z-index: 40;
  transform: translate(-50%, -50%);
  transition: transform .25s cubic-bezier(.2,.6,.2,1);
  will-change: transform;
  -webkit-font-smoothing: antialiased;
  backface-visibility: hidden;
}
#alab-hero .hotspot > *{ pointer-events: none; }

/* Moderne Ring-Pulse-Animation: expandierender, sanft ausblendender Ring */
#alab-hero .hotspot-pulse{
  position: absolute; top:50%; left:50%;
  width: 38px; height: 38px;
  margin: -19px 0 0 -19px;
  border-radius: 50%;
  border: 2px solid rgba(43,108,176,.55);
  opacity: 0;
  animation: alab-ring-pulse 2.4s cubic-bezier(.2,.6,.2,1) infinite;
  will-change: transform, opacity;
}
/* Zweiter, versetzter Ring für mehr Tiefe */
#alab-hero .hotspot-pulse::after{
  content: '';
  position: absolute; inset: -2px;
  border-radius: 50%;
  border: 2px solid rgba(106,166,232,.45);
  animation: alab-ring-pulse 2.4s cubic-bezier(.2,.6,.2,1) infinite;
  animation-delay: 1.2s;
}

#alab-hero .hotspot-inner{
  position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width: 38px; height: 38px; border-radius: 50%;
  background:
    radial-gradient(circle at 32% 28%, rgba(255,255,255,.35) 0%, transparent 55%),
    linear-gradient(140deg, #1e4f8b 0%, #2b6cb0 48%, #4a87c8 100%);
  display:flex; align-items:center; justify-content:center;
  box-shadow:
    0 1px 2px rgba(15,37,51,.2),
    0 6px 16px rgba(43,108,176,.38),
    0 0 0 3px #ffffff,
    0 0 0 4px rgba(43,108,176,.18);
  transition: transform .25s cubic-bezier(.2,.6,.2,1), box-shadow .25s ease, background .25s ease;
  border: 0;
}

#alab-hero .hotspot-icon{
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  font-family: var(--font-heading);
  text-shadow: 0 1px 2px rgba(15,37,51,.4);
  letter-spacing: .01em;
  user-select: none;
}

#alab-hero .hotspot-label{
  position:absolute; top:-40px; left:50%; transform:translateX(-50%) scale(.9);
  background: linear-gradient(135deg,#FFFFFF 0%, #FAFAFA 100%);
  padding: 8px 16px; border-radius:24px; font-size:.9rem; font-weight:600; white-space:nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04), 0 0 0 1px rgba(43,108,176,.2);
  opacity:0; pointer-events:none; transition: opacity .15s ease, transform .15s cubic-bezier(.4,0,.2,1);
  border:1px solid rgba(43,108,176,.3); z-index:100;
}
#alab-hero .hotspot:hover{ transform: translate(-50%, -50%); }
#alab-hero .hotspot:hover .hotspot-pulse{ animation-play-state: paused; opacity: 0; }
#alab-hero .hotspot:hover .hotspot-pulse::after{ animation-play-state: paused; }
#alab-hero .hotspot:hover .hotspot-inner{
  transform: translate(-50%,-50%) scale(1.08);
  box-shadow:
    0 2px 4px rgba(15,37,51,.25),
    0 10px 24px rgba(43,108,176,.5),
    0 0 0 3px #ffffff,
    0 0 0 5px rgba(43,108,176,.28);
}
#alab-hero .hotspot:hover .hotspot-label{ opacity:1; transform:translateX(-50%) scale(1) translateY(-2px); }

#alab-hero .hotspot.active .hotspot-pulse{ animation: none; opacity: 0; }
#alab-hero .hotspot.active .hotspot-inner{
  transform: translate(-50%,-50%) scale(1.12);
  background:
    radial-gradient(circle at 32% 28%, rgba(255,255,255,.45) 0%, transparent 55%),
    linear-gradient(140deg, #173f70 0%, #1e4f8b 48%, #2b6cb0 100%);
  box-shadow:
    0 2px 6px rgba(15,37,51,.3),
    0 12px 30px rgba(43,108,176,.6),
    0 0 0 3px #ffffff,
    0 0 0 6px rgba(43,108,176,.32);
}
#alab-hero .hotspot.inactive{ opacity:.4; pointer-events:none; }

@keyframes alab-ring-pulse{
  0%   { transform: scale(1);   opacity: .7; }
  70%  { transform: scale(1.9); opacity: 0;  }
  100% { transform: scale(1.9); opacity: 0;  }
}

#alab-hero .info-card{
  position:absolute;
  background: rgba(255,255,255,.98);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0,0,0,.08), 0 2px 10px rgba(0,0,0,.04), 0 0 0 1px rgba(43,108,176,.1);
  padding: var(--spacing-lg);
  width: 380px; z-index:30; opacity:0; visibility:hidden;
  transform: scale(.95) translateY(10px);
  transition: opacity .25s ease, transform .25s cubic-bezier(.4,0,.2,1), visibility .25s;
  pointer-events:none; border:1px solid rgba(43,108,176,.2);
  backface-visibility:hidden;
}
#alab-hero .info-card.active{ opacity:1; visibility:visible; transform: scale(1) translateY(0); pointer-events:auto; }
#alab-hero .info-card::before{
  content:''; position:absolute; width:2px; height:30px;
  background: linear-gradient(135deg,var(--accent-gradient-start),var(--accent-gradient-end));
  opacity:0; transition:opacity .3s ease;
}
#alab-hero .info-card.active::before{ opacity:1; }

#alab-hero .info-card.position-bottom{ top: calc(100% + 16px); left:50%; transform:translateX(-50%); }
#alab-hero .hotspot-container.has-card{ padding-bottom: 24rem; }

#alab-hero .info-card-content{ display:flex; flex-direction:column; gap: var(--spacing-sm); }
#alab-hero .info-card-image{
  width:100%; height:180px; border-radius: var(--radius-md); overflow:hidden;
  margin-bottom: var(--spacing-xs);
  background: linear-gradient(135deg,#f5f5f5 0%, #e8e8e8 100%);
  display:flex; align-items:center; justify-content:center;
}
#alab-hero .info-card-image img{ width:100%; height:100%; object-fit:contain; padding:10px; }

#alab-hero .info-card h3{
  font-family: var(--font-heading); font-size:1.35rem; font-weight:700; color:var(--text-primary);
  margin-bottom: var(--spacing-sm); position:relative; padding-left:24px;
}
#alab-hero .info-card h3::before{
  content:''; position:absolute; left:0; top:50%; transform:translateY(-50%);
  width:4px; height:24px; background: linear-gradient(180deg,var(--accent-gradient-start),var(--accent-gradient-end));
  border-radius:2px;
}
#alab-hero .info-card p{ font-size:.95rem; color:var(--text-secondary); line-height:1.6; margin-bottom: var(--spacing-sm); }

#alab-hero .specs-list{ list-style:none; padding: var(--spacing-md) 0 0; border-top:1px solid rgba(43,108,176,.15); margin-top: var(--spacing-sm); }
#alab-hero .specs-list li{
  display:flex; align-items:center; gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-xs); font-size:.9rem; color:var(--text-primary);
  transition: transform .3s ease, background .3s ease; border-radius: var(--radius-sm); position:relative;
}
#alab-hero .specs-list li:hover{ background: rgba(43,108,176,.05); transform: translateX(5px); }
#alab-hero .spec-icon{ font-size:1.1rem; display:inline-flex; align-items:center; justify-content:center; min-width:24px; }
#alab-hero .spec-icon svg{ stroke:#2b6cb0; transition: transform .3s ease, stroke .3s ease; }
#alab-hero .specs-list li:hover .spec-icon svg{ stroke: var(--accent-gradient-end); transform: scale(1.15); }

#alab-hero .side-panel{ display:flex; flex-direction:column; gap: var(--spacing-md); width:200px; flex-shrink:0; }
#alab-hero .left-panel{ align-items:flex-end; }
#alab-hero .right-panel{ align-items:flex-start; }

#alab-hero .stat-card{
  background: rgba(255,255,255,.7); backdrop-filter: blur(10px);
  border-radius: var(--radius-lg); padding: var(--spacing-md); text-align:center;
  box-shadow: var(--shadow-lg); transition: transform .4s cubic-bezier(.2,.6,.2,1), box-shadow .4s, border-color .4s, background .4s;
  width:100%; border:1px solid rgba(43,108,176,.15); position:relative; overflow:hidden;
}
#alab-hero .stat-card::before{
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background: linear-gradient(90deg,var(--accent-gradient-start),var(--accent-gradient-end));
  opacity:0; transition:opacity .3s ease;
}
#alab-hero .stat-card:hover{
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl), 0 0 30px rgba(43,108,176,.1);
  border-color: var(--accent-gradient-start);
  background: rgba(255,255,255,.85);
}
#alab-hero .stat-card:hover::before{ opacity:1; }
#alab-hero .stat-icon{ font-size:2rem; margin-bottom: var(--spacing-xs); display:flex; align-items:center; justify-content:center; }
#alab-hero .stat-icon svg{ stroke: var(--text-primary); transition: transform .3s ease, stroke .3s ease; }
#alab-hero .stat-card:hover .stat-icon svg{ stroke:#2b6cb0; transform: scale(1.1); }
#alab-hero .stat-value{ font-family: var(--font-heading); font-size:1.5rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
#alab-hero .stat-label{ font-size:.85rem; color:var(--text-secondary); font-weight:500; }

#alab-hero .feature-card{
  background: linear-gradient(135deg, rgba(255,255,255,.6), rgba(43,108,176,.05));
  backdrop-filter: blur(8px);
  border:1px solid rgba(43,108,176,.2);
  border-radius: var(--radius-md);
  padding: var(--spacing-md); width:100%;
  transition: transform .4s cubic-bezier(.2,.6,.2,1), border-color .4s, box-shadow .4s;
  position:relative; overflow:hidden;
}
#alab-hero .feature-card::after{
  content:''; position:absolute; inset:0; background: linear-gradient(135deg, transparent, rgba(43,108,176,.1));
  opacity:0; transition: opacity .3s ease;
}
#alab-hero .feature-card:hover{ transform: translateX(-8px) scale(1.02); border-color: var(--accent-gradient-start); box-shadow: var(--shadow-lg), 0 0 20px rgba(43,108,176,.15); }
#alab-hero .feature-card:hover::after{ opacity:1; }
#alab-hero .feature-icon{ font-size:1.5rem; margin-bottom: var(--spacing-xs); display:flex; align-items:center; justify-content:flex-start; }
#alab-hero .feature-icon svg{ stroke: var(--text-primary); transition: transform .3s ease, stroke .3s ease; }
#alab-hero .feature-card:hover .feature-icon svg{ stroke:#2b6cb0; transform: rotate(-5deg) scale(1.1); }
#alab-hero .feature-card h4{ font-family: var(--font-heading); font-size:.9rem; font-weight:600; color:var(--text-primary); margin-bottom:4px; }
#alab-hero .feature-card p{ font-size:.8rem; color: var(--text-secondary); line-height:1.4; }

#alab-hero .mobile-component-list{ display:none; }
#alab-hero .component-accordion{ display:flex; flex-direction:column; gap: var(--spacing-sm); }

/* Wrapper: enthält Head-Button + Body-Panel */
#alab-hero .accordion-item{
  position:relative;
  background: rgba(255,255,255,.7);
  backdrop-filter: blur(8px);
  border:1px solid rgba(43,108,176,.15);
  border-radius: var(--radius-md);
  overflow:hidden;
  transition: border-color .3s ease, box-shadow .3s ease, background .3s ease;
}
#alab-hero .accordion-item::before{
  content:''; position:absolute; left:0; top:0; bottom:0; width:4px;
  background: linear-gradient(180deg,var(--accent-gradient-start),var(--accent-gradient-end));
  transform: scaleY(0); transform-origin: top;
  transition: transform .3s ease; z-index:1;
}
#alab-hero .accordion-item.active{
  border-color: var(--accent-gradient-start);
  box-shadow: var(--shadow-lg);
  background: rgba(255,255,255,.92);
}
#alab-hero .accordion-item.active::before{ transform: scaleY(1); }

/* Head: sichtbarer, tappbarer Kopf */
#alab-hero .accordion-head{
  display:flex; align-items:center; gap: var(--spacing-sm);
  padding: 14px 16px;
  width:100%;
  background: transparent; border:0;
  font-family: var(--font-body); font-size:1rem; color: var(--text-primary);
  cursor:pointer; text-align:left; position:relative; z-index:2;
  min-height: 52px;
  -webkit-tap-highlight-color: transparent;
}
#alab-hero .accordion-head:focus-visible{ outline: 2px solid var(--accent-gradient-start); outline-offset: 2px; border-radius: var(--radius-md); }
#alab-hero .accordion-icon{ font-size:1.5rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; width:24px; height:24px; transition: transform .3s ease; }
#alab-hero .accordion-icon svg{ width:22px; height:22px; stroke: var(--text-primary); transition: stroke .3s ease; }
#alab-hero .accordion-item.active .accordion-icon svg{ stroke:#2b6cb0; }
#alab-hero .accordion-title{ flex:1; font-weight:600; font-size:.98rem; line-height:1.25; }
#alab-hero .accordion-arrow{
  font-size:1.25rem; line-height:1; color: var(--text-secondary);
  transition: transform .3s ease, color .3s ease; flex-shrink:0;
}
#alab-hero .accordion-item.active .accordion-arrow{ transform: rotate(90deg); color: var(--accent-gradient-start); }

/* Body: ausklappbarer Inhalt */
#alab-hero .accordion-body{
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s cubic-bezier(.2,.6,.2,1);
}
#alab-hero .accordion-item.active .accordion-body{
  max-height: 1200px;
}
#alab-hero .accordion-body-inner{
  padding: 4px 16px 16px 16px;
  display:flex; flex-direction:column; gap: 12px;
  border-top: 1px solid rgba(43,108,176,.1);
  margin-top: 2px;
  padding-top: 14px;
}
#alab-hero .accordion-image{
  width:100%; aspect-ratio: 16/10; border-radius: var(--radius-sm); overflow:hidden;
  background: linear-gradient(135deg,#f5f7fa 0%, #e8edf3 100%);
  display:flex; align-items:center; justify-content:center;
}
#alab-hero .accordion-image img{ width:100%; height:100%; object-fit:contain; padding:8px; display:block; }
#alab-hero .accordion-body p{
  font-size: .92rem; line-height: 1.55; color: var(--text-secondary); margin: 0;
}
#alab-hero .accordion-specs{
  list-style:none; padding:0; margin:0;
  display:flex; flex-direction:column; gap:8px;
  padding-top: 10px; border-top: 1px solid rgba(43,108,176,.1);
}
#alab-hero .accordion-specs li{
  display:flex; align-items:center; gap:10px;
  font-size: .88rem; color: var(--text-primary); line-height:1.35;
}
#alab-hero .accordion-specs li::before{
  content:''; flex-shrink:0;
  width: 18px; height: 18px; border-radius: 50%;
  background:
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg>") no-repeat center / 12px 12px,
    linear-gradient(135deg,#2b6cb0,#6aa6e8);
}

@media (max-width:1200px){
  #alab-hero .side-panel{ width:150px; }
  #alab-hero .stat-value{ font-size:1.25rem; }
  #alab-hero .feature-card h4{ font-size:.85rem; }
}
@media (max-width:968px){
  #alab-hero .hotspot-container{ flex-direction: column; }
  #alab-hero .side-panel{ width:100%; flex-direction:row; justify-content:center; }
  #alab-hero .left-panel, #alab-hero .right-panel{ align-items:center; }
  #alab-hero .stat-card, #alab-hero .feature-card{ max-width:200px; }
}
@media (max-width:768px){
  #alab-hero .alab-container{ padding: var(--spacing-lg) var(--spacing-sm); }
  #alab-hero .hotspot-container{ display:none; }
  #alab-hero .mobile-component-list{ display:block; }
  #alab-hero .title{ font-size:1.75rem; }
  #alab-hero .subtitle{ font-size:1rem; }
}
@media (min-width:769px) and (max-width:1024px){
  #alab-hero .info-card{ width:320px; }
  #alab-hero .hero-image-wrapper{ max-width:100%; }
}

@media print{
  #alab-hero .hotspot,
  #alab-hero .info-card{ display:none !important; }
}

@media (prefers-reduced-motion: reduce){
  #alab-hero *{
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}

@media (prefers-contrast: high){
  #alab-hero .hotspot-inner{ border:2px solid var(--text-primary); }
  #alab-hero .info-card{ border:2px solid var(--text-primary); }
}

/* === Quadratische Box hinter Zahlenbadge entfernen (Button-Reset) === */
#alab-hero .hotspot{
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  appearance: none;
  -webkit-appearance: none;
}

#alab-hero .hotspot::before,
#alab-hero .hotspot::after,
#alab-hero .hotspot-inner::before,
#alab-hero .hotspot-inner::after{
  content: none !important;
  display: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

#alab-hero .hotspot > .badge-bg,
#alab-hero .hotspot > .hotspot-bg{
  display: none !important;
}

/* === Kompaktere Stat-Boxen === */
#alab-hero {
  --stat-panel-w: 140px;
  --stat-pad: 12px;
  --stat-radius: 12px;
  --stat-icon-size: 1.4rem;
  --stat-value-size: 1.1rem;
  --stat-label-size: 0.78rem;
  --stat-gap: 10px;
}

#alab-hero .side-panel{
  width: var(--stat-panel-w);
  gap: var(--stat-gap);
}

#alab-hero .stat-card{
  padding: var(--stat-pad);
  border-radius: var(--stat-radius);
  box-shadow: var(--shadow-sm);
}

#alab-hero .stat-card:hover{
  transform: translateY(-4px) scale(1.01);
  box-shadow: var(--shadow-md);
}

#alab-hero .stat-icon{ font-size: var(--stat-icon-size); margin-bottom: 6px; }
#alab-hero .stat-value{ font-size: var(--stat-value-size); margin-bottom: 2px; }
#alab-hero .stat-label{ font-size: var(--stat-label-size); }

@media (min-width: 1280px){
  #alab-hero {
    --stat-panel-w: 130px;
    --stat-pad: 10px;
    --stat-icon-size: 1.3rem;
    --stat-value-size: 1.05rem;
    --stat-label-size: 0.76rem;
  }
}
      `}} />

      <section id="alab-hero" className="komp-section">
        <div className="alab-container">
          <header className="section-header">
            <span className="eyebrow">HOCHWERTIGE KOMPONENTEN</span>
            <h2>Unter der Motorhaube Ihrer PV-Anlage</h2>
            <p className="subtitle">Entdecken Sie die Qualität jeder einzelnen Komponente durch interaktive Exploration</p>
          </header>

          <div className="hotspot-container">
            {/* linke Stats */}
            <aside className="side-panel left-panel">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div className="stat-value">10&nbsp;kWp</div>
                <div className="stat-label">Systemleistung</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div className="stat-value">25&nbsp;Jahre</div>
                <div className="stat-label">Garantie</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="stat-value">8–10</div>
                <div className="stat-label">Jahre Amortisation</div>
              </div>
            </aside>

            {/* Hero-Bild + Hotspots */}
            <div className="hero-image-wrapper">
              <img className="hero-image" alt="PV-Anlage Explosionsansicht"
                   src="/img/private-loesungen/pv-privat-haus_aufgeteilt.png" />

              <button className="hotspot" data-component="solar-module" style={{top:"19.02%",left:"46.94%"}} aria-label="Solarmodule">
                <span className="hotspot-pulse"></span>
                <span className="hotspot-inner"><span className="hotspot-icon">1</span></span>
                <span className="hotspot-label">Solarmodule</span>
              </button>

              <button className="hotspot" data-component="mounting" style={{top:"31.23%",left:"44.11%"}} aria-label="Unterkonstruktion">
                <span className="hotspot-pulse"></span>
                <span className="hotspot-inner"><span className="hotspot-icon">2</span></span>
                <span className="hotspot-label">Unterkonstruktion</span>
              </button>

              <button className="hotspot" data-component="monitoring" style={{top:"42.07%",left:"42.84%"}} aria-label="Ziegelersatzplatten">
                <span className="hotspot-pulse"></span>
                <span className="hotspot-inner"><span className="hotspot-icon">3</span></span>
                <span className="hotspot-label">Ziegelersatzplatten</span>
              </button>

              <button className="hotspot" data-component="inverter" style={{top:"71.32%",left:"17.56%"}} aria-label="Wechselrichter">
                <span className="hotspot-pulse"></span>
                <span className="hotspot-inner"><span className="hotspot-icon">4</span></span>
                <span className="hotspot-label">Wechselrichter</span>
              </button>

              <button className="hotspot" data-component="battery" style={{top:"81.64%",left:"54.05%"}} aria-label="Batteriespeicher">
                <span className="hotspot-pulse"></span>
                <span className="hotspot-inner"><span className="hotspot-icon">5</span></span>
                <span className="hotspot-label">Batteriespeicher</span>
              </button>
            </div>

            {/* rechte Features */}
            <aside className="side-panel right-panel">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  </svg>
                </div>
                <h4>CO₂-Einsparung</h4>
                <p>Bis zu 5&nbsp;t CO₂ pro Jahr</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <h4>Smart Control</h4>
                <p>App-Steuerung &amp; Monitoring</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <h4>Wartung</h4>
                <p>Minimaler Aufwand</p>
              </div>
            </aside>

            {/* Info-Karten */}
            <article className="info-card" id="solar-module-card" role="dialog" aria-modal="false" aria-labelledby="solar-module-title">
              <div className="info-card-content">
                <div className="info-card-image">
                  <img src="/img/private-loesungen/pv-privat-module.png" alt="Hochleistungs-Solarmodule" />
                </div>
                <h3 id="solar-module-title">Solarmodule</h3>
                <p>Hocheffiziente Module wandeln Sonnenlicht in Strom um. Doppelglas-Varianten bieten besonders lange Lebensdauer und edle Optik.</p>
                <ul className="specs-list">
                  <li><span className="spec-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </span>400–490&nbsp;Wp Leistung</li>
                  <li><span className="spec-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </span>Hagelschutz-zertifiziert</li>
                  <li><span className="spec-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  </span>Bifaziale Option</li>
                </ul>
              </div>
            </article>

            <article className="info-card" id="inverter-card" role="dialog" aria-modal="false" aria-labelledby="inverter-title">
              <div className="info-card-content">
                <div className="info-card-image">
                  <img src="/img/private-loesungen/pv-privat-wechselrichter.png" alt="Hybrid-Wechselrichter" />
                </div>
                <h3 id="inverter-title">Wechselrichter</h3>
                <p>Wandelt Gleichstrom (DC) vom Dach in Wechselstrom (AC) für Haus &amp; Netz. Als Hybrid-Version direkt speicherfähig.</p>
                <ul className="specs-list">
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></span>AC-Netzeinspeisung</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>App-Steuerung</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>Flüsterleiser Betrieb</li>
                </ul>
              </div>
            </article>

            <article className="info-card" id="battery-card" role="dialog" aria-modal="false" aria-labelledby="battery-title">
              <div className="info-card-content">
                <div className="info-card-image">
                  <img src="/img/private-loesungen/pv-privat-batteriespeicher.jpg" alt="Batteriespeicher" />
                </div>
                <h3 id="battery-title">Batteriespeicher</h3>
                <p>Speichert Überschuss für die Abendstunden. So steigt der Eigenverbrauch und die Unabhängigkeit vom Strompreis.</p>
                <ul className="specs-list">
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg></span>Mehr Autarkie</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.2 4.2l4.2 4.2m5.6 5.6l4.2 4.2M1 12h6m6 0h6M4.2 19.8l4.2-4.2m5.6-5.6l4.2-4.2"/></svg></span>95 % Entladetiefe</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>Notstromfähig</li>
                </ul>
              </div>
            </article>

            <article className="info-card" id="mounting-card" role="dialog" aria-modal="false" aria-labelledby="mounting-title">
              <div className="info-card-content">
                <div className="info-card-image">
                  <img src="/img/private-loesungen/pv-privat-unterkonstruktion.jpg" alt="Unterkonstruktion" />
                </div>
                <h3 id="mounting-title">Unterkonstruktion</h3>
                <p>Aerodynamisch optimiertes Montagesystem aus eloxiertem Aluminium. TÜV-geprüft für alle Dacharten und Windlasten bis 200 km/h.</p>
                <ul className="specs-list">
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></span>Statisch geprüft</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></span>Korrosionsbeständig</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>Für alle Dachtypen</li>
                </ul>
              </div>
            </article>

            <article className="info-card" id="monitoring-card" role="dialog" aria-modal="false" aria-labelledby="monitoring-title">
              <div className="info-card-content">
                <div className="info-card-image">
                  <img src="/img/private-loesungen/pv-privat-metalldachplatten.jpg" alt="Ziegelersatzplatte" />
                </div>
                <h3 id="monitoring-title">Ziegelersatzplatte</h3>
                <p>Ersetzt einzelne Dachziegel und schafft eine regensichere, tragfähige Anbindung für die Haken – ohne das Dach zu schwächen.</p>
                <ul className="specs-list">
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>Saubere, dichte Lösung</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>Belastbar &amp; langlebig</li>
                  <li><span className="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span>Einfacher Austausch</li>
                </ul>
              </div>
            </article>
          </div>

          {/* Mobile Liste */}
          <div className="mobile-component-list">
            <div className="component-accordion">
              <div className="accordion-item" data-component="solar-module">
                <button type="button" className="accordion-head" aria-expanded="false">
                  <span className="accordion-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg>
                  </span>
                  <span className="accordion-title">Hochleistungs-Solarmodule</span>
                  <span className="accordion-arrow" aria-hidden="true">›</span>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <div className="accordion-image">
                      <img src="/img/private-loesungen/pv-privat-module.png" alt="Hochleistungs-Solarmodule" loading="lazy" />
                    </div>
                    <p>Hocheffiziente Module wandeln Sonnenlicht in Strom um. Doppelglas-Varianten bieten besonders lange Lebensdauer und edle Optik.</p>
                    <ul className="accordion-specs">
                      <li>400–490 Wp Leistung</li>
                      <li>Hagelschutz-zertifiziert</li>
                      <li>Bifaziale Option</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item" data-component="inverter">
                <button type="button" className="accordion-head" aria-expanded="false">
                  <span className="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
                  <span className="accordion-title">Hybrid-Wechselrichter</span>
                  <span className="accordion-arrow" aria-hidden="true">›</span>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <div className="accordion-image">
                      <img src="/img/private-loesungen/pv-privat-wechselrichter.png" alt="Hybrid-Wechselrichter" loading="lazy" />
                    </div>
                    <p>Wandelt Gleichstrom (DC) vom Dach in Wechselstrom (AC) für Haus &amp; Netz. Als Hybrid-Version direkt speicherfähig.</p>
                    <ul className="accordion-specs">
                      <li>AC-Netzeinspeisung</li>
                      <li>App-Steuerung</li>
                      <li>Flüsterleiser Betrieb</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item" data-component="battery">
                <button type="button" className="accordion-head" aria-expanded="false">
                  <span className="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg></span>
                  <span className="accordion-title">Batteriespeicher</span>
                  <span className="accordion-arrow" aria-hidden="true">›</span>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <div className="accordion-image">
                      <img src="/img/private-loesungen/pv-privat-batteriespeicher.jpg" alt="Batteriespeicher" loading="lazy" />
                    </div>
                    <p>Speichert Überschuss für die Abendstunden. So steigt der Eigenverbrauch und die Unabhängigkeit vom Strompreis.</p>
                    <ul className="accordion-specs">
                      <li>Mehr Autarkie</li>
                      <li>95 % Entladetiefe</li>
                      <li>Notstromfähig</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item" data-component="mounting">
                <button type="button" className="accordion-head" aria-expanded="false">
                  <span className="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></svg></span>
                  <span className="accordion-title">Unterkonstruktion</span>
                  <span className="accordion-arrow" aria-hidden="true">›</span>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <div className="accordion-image">
                      <img src="/img/private-loesungen/pv-privat-unterkonstruktion.jpg" alt="Unterkonstruktion" loading="lazy" />
                    </div>
                    <p>Aerodynamisch optimiertes Montagesystem aus eloxiertem Aluminium. TÜV-geprüft für alle Dacharten und Windlasten bis 200 km/h.</p>
                    <ul className="accordion-specs">
                      <li>Statisch geprüft</li>
                      <li>Korrosionsbeständig</li>
                      <li>Für alle Dachtypen</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item" data-component="monitoring">
                <button type="button" className="accordion-head" aria-expanded="false">
                  <span className="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
                  <span className="accordion-title">Ziegelersatzplatte</span>
                  <span className="accordion-arrow" aria-hidden="true">›</span>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <div className="accordion-image">
                      <img src="/img/private-loesungen/pv-privat-metalldachplatten.jpg" alt="Ziegelersatzplatte" loading="lazy" />
                    </div>
                    <p>Ersetzt einzelne Dachziegel und schafft eine regensichere, tragfähige Anbindung für die Haken – ohne das Dach zu schwächen.</p>
                    <ul className="accordion-specs">
                      <li>Saubere, dichte Lösung</li>
                      <li>Belastbar &amp; langlebig</li>
                      <li>Einfacher Austausch</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

