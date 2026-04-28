"use client";

import { useEffect } from "react";

const SLIDES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const BASE = "/assets/img/referenzen-gewerbe/";

export default function GewerbeReferenzenSection() {
  useEffect(() => {
    const hosts = document.querySelectorAll("#ref-gallery-gewerbe");
    if (!hosts.length) return;

    const cleanups: (() => void)[] = [];

    hosts.forEach((host) => {
      const wrap = host.querySelector(".rg") as HTMLElement | null;
      const vp = host.querySelector(".rg__viewport") as HTMLElement | null;
      const slides = Array.from(host.querySelectorAll(".rg__slide")) as HTMLElement[];
      const prev = host.querySelector(".rg__nav--prev") as HTMLElement | null;
      const next = host.querySelector(".rg__nav--next") as HTMLElement | null;
      const dotsC = host.querySelector(".rg__dots") as HTMLElement | null;
      if (!wrap || !vp || !slides.length || !dotsC) return;

      const dotClickHandlers: { button: HTMLButtonElement; handler: () => void }[] = [];

      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Slide " + (i + 1));
        const handler = () => { goToLoop(i); resetAuto(); };
        b.addEventListener("click", handler);
        dotsC.appendChild(b);
        dotClickHandlers.push({ button: b, handler });
      });

      let active = 0;

      function alignTo(i: number, smooth = true) {
        i = Math.max(0, Math.min(i, slides.length - 1));
        const s = slides[i];
        const vpRect = vp!.getBoundingClientRect();
        const sRect = s.getBoundingClientRect();
        const delta = sRect.left - vpRect.left;
        vp!.scrollBy({ left: delta, behavior: smooth ? "smooth" : "auto" });
      }

      function nearestIndex() {
        const vpRect = vp!.getBoundingClientRect();
        let best = 0, bestDist = Infinity;
        slides.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          const d = Math.abs(r.left - vpRect.left);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        return best;
      }

      function markActive(i: number) {
        active = i;
        slides.forEach((s, k) => s.setAttribute("aria-selected", String(k === i)));
        Array.from(dotsC!.children).forEach((d, k) => d.setAttribute("aria-selected", String(k === i)));
      }

      function goToLoop(i: number) {
        if (i < 0) i = slides.length - 1;
        if (i > slides.length - 1) i = 0;
        alignTo(i);
        markActive(i);
      }

      const onPrev = () => { goToLoop(active - 1); resetAuto(); };
      const onNext = () => { goToLoop(active + 1); resetAuto(); };
      prev?.addEventListener("click", onPrev);
      next?.addEventListener("click", onNext);

      const onKeydown = (e: Event) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "ArrowLeft") { ke.preventDefault(); goToLoop(active - 1); resetAuto(); }
        if (ke.key === "ArrowRight") { ke.preventDefault(); goToLoop(active + 1); resetAuto(); }
      };
      wrap.addEventListener("keydown", onKeydown);

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { markActive(nearestIndex()); ticking = false; });
      };
      vp.addEventListener("scroll", onScroll);

      let drag = { on: false, id: 0, startX: 0, startLeft: 0, moved: false };

      const onPointerDown = (e: Event) => {
        const pe = e as PointerEvent;
        drag.on = true; drag.id = pe.pointerId; drag.startX = pe.clientX; drag.startLeft = vp!.scrollLeft; drag.moved = false;
        vp!.setPointerCapture(drag.id); stopAuto();
      };
      const onPointerMove = (e: Event) => {
        if (!drag.on) return;
        const pe = e as PointerEvent;
        const dx = pe.clientX - drag.startX;
        if (Math.abs(dx) > 3) drag.moved = true;
        vp!.scrollLeft = drag.startLeft - dx;
      };
      const onPointerUp = () => {
        if (!drag.on) return;
        vp!.releasePointerCapture(drag.id);
        drag.on = false;
        alignTo(nearestIndex());
        setTimeout(startAuto, 200);
      };
      const onClick = (e: Event) => {
        if (drag.moved) { e.preventDefault(); drag.moved = false; }
      };

      vp.addEventListener("pointerdown", onPointerDown);
      vp.addEventListener("pointermove", onPointerMove);
      vp.addEventListener("pointerup", onPointerUp);
      vp.addEventListener("click", onClick, true);

      let timer: ReturnType<typeof setInterval> | null = null;
      function startAuto() { stopAuto(); timer = setInterval(() => goToLoop(active + 1), 3500); }
      function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }
      function resetAuto() { stopAuto(); startAuto(); }

      const onPointerEnter = () => stopAuto();
      const onPointerLeave = () => startAuto();
      wrap.addEventListener("pointerenter", onPointerEnter);
      wrap.addEventListener("pointerleave", onPointerLeave);

      Array.from(dotsC.children).forEach((d, k) => d.setAttribute("aria-selected", String(k === active)));
      slides.forEach((s, k) => s.setAttribute("aria-selected", String(k === active)));
      markActive(active);
      alignTo(active, false);

      const onLoad = () => setTimeout(() => { alignTo(active, false); startAuto(); }, 80);
      window.addEventListener("load", onLoad);

      cleanups.push(() => {
        stopAuto();
        prev?.removeEventListener("click", onPrev);
        next?.removeEventListener("click", onNext);
        wrap.removeEventListener("keydown", onKeydown);
        vp.removeEventListener("scroll", onScroll);
        vp.removeEventListener("pointerdown", onPointerDown);
        vp.removeEventListener("pointermove", onPointerMove);
        vp.removeEventListener("pointerup", onPointerUp);
        vp.removeEventListener("click", onClick, true);
        wrap.removeEventListener("pointerenter", onPointerEnter);
        wrap.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("load", onLoad);
        dotClickHandlers.forEach(({ button, handler }) => {
          button.removeEventListener("click", handler);
        });
        dotsC.innerHTML = "";
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
#ref-gallery-gewerbe{
  --gold-1:#2b6cb0;
  --gold-2:#6aa6e8;
  --ink:#0f2533;
  --muted:#5b6b78;
  --bg:#f8fafc;
  --gap:20px;
  --visible:3;
  --slide: calc((100% - (var(--visible) - 1) * var(--gap)) / var(--visible));
  background: var(--bg);
  padding: 4rem 0;
}
#ref-gallery-gewerbe .container{
  max-width:2000px; margin:0 auto; padding:0 2rem;
}
#ref-gallery-gewerbe .section-title{
  text-align:center; font-weight:800; font-size:clamp(1.75rem,3vw,2.25rem); color:var(--ink); margin:0;
}
#ref-gallery-gewerbe .section-title::after{
  content:""; display:block; width:64px; height:4px; border-radius:8px; margin:.6rem auto 0;
  background:linear-gradient(90deg,var(--gold-1),var(--gold-2));
}
#ref-gallery-gewerbe .section-subtitle{
  text-align:center; color:var(--muted); max-width:820px; margin:.75rem auto 2.5rem; line-height:1.7;
}
#ref-gallery-gewerbe .rg{ position:relative; }
#ref-gallery-gewerbe .rg__viewport{
  overflow-x:auto; -webkit-overflow-scrolling:touch; scroll-behavior:smooth;
  scroll-snap-type:x mandatory; scroll-snap-stop:always; outline:none; padding-bottom:4px; scrollbar-width:none;
}
#ref-gallery-gewerbe .rg__viewport::-webkit-scrollbar{ display:none; }
#ref-gallery-gewerbe .rg__track{
  display:flex; align-items:stretch; gap:var(--gap); padding:0;
}
#ref-gallery-gewerbe .rg__track::before,
#ref-gallery-gewerbe .rg__track::after{
  content:none;
}
#ref-gallery-gewerbe .rg__slide{
  list-style:none; flex:0 0 var(--slide); max-width:var(--slide); scroll-snap-align:start;
}
@media (max-width:1100px){ #ref-gallery-gewerbe .rg{ --visible:2; } }
@media (max-width:680px){ #ref-gallery-gewerbe .rg{ --visible:1; } }
#ref-gallery-gewerbe .rg__figure{ display:block; text-decoration:none; color:inherit; }
#ref-gallery-gewerbe .rg__media{
  --radius:16px; --ratio:16/9; aspect-ratio:var(--ratio); width:100%; border-radius:var(--radius);
  overflow:hidden; background:#f3f6fa; box-shadow:0 10px 28px rgba(15,37,51,.12);
}
#ref-gallery-gewerbe .rg__media > img{
  width:100%; height:100%; display:block; object-fit:cover; object-position:center;
}
@supports not (aspect-ratio: 1) {
  #ref-gallery-gewerbe .rg__media{ position:relative; }
  #ref-gallery-gewerbe .rg__media::before{ content:""; display:block; padding-top:56.25%; }
  #ref-gallery-gewerbe .rg__media > img{ position:absolute; inset:0; }
}
#ref-gallery-gewerbe .rg__nav{
  position:absolute; top:50%; transform:translateY(-50%);
  width:44px; height:44px; border:1px solid rgba(15,37,51,.08); border-radius:999px; cursor:pointer;
  color:var(--ink);
  background:rgba(255,255,255,.92);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow:0 4px 14px rgba(15,37,51,.10), 0 1px 3px rgba(15,37,51,.06);
  display:inline-flex; align-items:center; justify-content:center;
  transition: transform .2s ease, background .2s ease, box-shadow .2s ease, color .2s ease;
  z-index:2;
}
#ref-gallery-gewerbe .rg__nav:hover{
  background:var(--gold-1); color:#fff;
  box-shadow:0 6px 18px rgba(43,108,176,.30);
  transform:translateY(-50%) scale(1.05);
}
#ref-gallery-gewerbe .rg__nav--prev{ left:14px; }
#ref-gallery-gewerbe .rg__nav--next{ right:14px; }
#ref-gallery-gewerbe .rg__nav:focus-visible{
  outline:none; box-shadow:0 0 0 3px rgba(43,108,176,.30);
}
#ref-gallery-gewerbe .rg__dots{
  display:flex; gap:8px; justify-content:center; margin-top:16px;
}
#ref-gallery-gewerbe .rg__dots button{
  width:28px; height:6px; border:0; border-radius:999px; background:#dfe6ee; cursor:pointer;
}
#ref-gallery-gewerbe .rg__dots button[aria-selected="true"]{
  background:linear-gradient(90deg,var(--gold-1),var(--gold-2));
}
@media (max-width: 768px) {
  #ref-gallery-gewerbe{
    --visible: 1; --gap: 12px;
    --slide: calc((100% - (var(--visible) - 1) * var(--gap)) / var(--visible));
    padding: 2.25rem 0;
  }
  #ref-gallery-gewerbe .rg__track::before,
  #ref-gallery-gewerbe .rg__track::after{ flex: 0 0 0 !important; }
  #ref-gallery-gewerbe .rg__media{ --ratio: 4/3; --radius: 18px; box-shadow: 0 8px 22px rgba(15,37,51,.12); }
  #ref-gallery-gewerbe .container{ padding: 0 1rem; }
  #ref-gallery-gewerbe .rg__dots{ margin-top: 12px; gap: 6px; }
  #ref-gallery-gewerbe .rg__dots button{ width: 22px; height: 5px; }
  /* Swipe-Buttons auf Mobile komplett ausblenden – native Wischgeste reicht */
  #ref-gallery-gewerbe .rg__nav{ display: none !important; }
}
      `}} />

      <section id="ref-gallery-gewerbe" className="section reveal" aria-labelledby="ref-title-gewerbe">
        <div className="container">
          <h2 id="ref-title-gewerbe" className="section-title">Referenzen</h2>
          <p className="section-subtitle center">
            Ein kleiner Auszug betreuter Anlagen – sauber installiert, überwacht und dokumentiert.
          </p>

          <div className="rg" role="region" aria-roledescription="carousel" aria-label="Referenzgalerie (Gewerbe)">
            <button className="rg__nav rg__nav--prev" type="button" aria-label="Zurück">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="rg__viewport" tabIndex={0}>
              <ul className="rg__track">
                {SLIDES.map((n) => {
                  const src = `${BASE}anlage${n}_G.avif`;
                  return (
                    <li key={n} className="rg__slide">
                      <a className="rg__figure" href={src}>
                        <div className="rg__media">
                          <img src={src} alt={`Gewerbliche Photovoltaik-Referenz ${n}`} decoding="async" loading="lazy" draggable={false} />
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button className="rg__nav rg__nav--next" type="button" aria-label="Weiter">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="rg__dots" aria-label="Slides"></div>
          </div>
        </div>
      </section>
    </>
  );
}
