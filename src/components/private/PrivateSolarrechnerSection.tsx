"use client";

import { useEffect } from 'react';

export default function PrivateSolarrechnerSection() {
  useEffect(() => {
    const cleanup = (() => {
      'use strict';

      const NF0 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
      const NF1 = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      const NF2 = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const fmtInt = (n: number) => NF0.format(Math.round(n));
      const fmt1  = (n: number) => NF1.format(n);
      const fmt2  = (n: number) => NF2.format(n);
      const $ = (sel: string, ctx: Document | Element = document) => ctx.querySelector(sel);
      const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

      const elStromkosten = $('#stromkosten') as HTMLInputElement | null;
      const elStrompreis  = $('#strompreis') as HTMLInputElement | null;
      const elFlaeche     = $('#dachflaeche') as HTMLInputElement | null;
      const elModule      = $('#pvModule') as HTMLInputElement | null;
      const elBtnMinus    = $('#btnMinus') as HTMLButtonElement | null;
      const elBtnPlus     = $('#btnPlus') as HTMLButtonElement | null;
      const elSpeicher    = $('#speicher') as HTMLInputElement | null;

      const elErzeugung   = $('#erzeugung') as HTMLElement | null;
      const elCO2         = $('#co2ersparnis') as HTMLElement | null;
      const elNetzbezug   = $('#netzbezug') as HTMLElement | null;
      const elSpeicherN   = $('#speichernutzung') as HTMLElement | null;
      const elHausv       = $('#hausverbrauch') as HTMLElement | null;

      const elErsparnis   = $('#ersparnis') as HTMLElement | null;
      const elEinspeisung = $('#einspeisung') as HTMLElement | null;
      const elAmort       = $('#amort') as HTMLElement | null;
      const elGewinn30    = $('#gesamtgewinn') as HTMLElement | null;
      const elMonGewinn   = $('#monatlichGewinn') as HTMLElement | null;

      const lb = $('#contactLightbox') as HTMLElement | null;
      const lbOpen = $('#cta-open') as HTMLElement | null;
      const lbClose = $('#lightbox-close') as HTMLElement | null;

      function fitLightbox(){
        if (window.innerWidth > 640) { resetLightboxScale(); return; }
        const box = lb?.querySelector('.lightbox-container') as HTMLElement | null;
        if (!box) return;
        box.style.transformOrigin = 'top center';
        box.style.transform = '';
        const avail = (window.visualViewport ? window.visualViewport.height : window.innerHeight) - 20;
        const rectH = box.getBoundingClientRect().height;
        const scale = Math.min(1, avail / rectH);
        if (scale < 1){ box.style.transform = 'scale(' + scale + ')'; box.style.margin = '10px auto'; }
        else { box.style.margin = 'auto'; }
      }
      function resetLightboxScale(){
        const box = lb?.querySelector('.lightbox-container') as HTMLElement | null;
        if (!box) return;
        box.style.transform = '';
        box.style.margin = '';
      }
      const openLB = () => { lb!.classList.add('active'); document.documentElement.style.overflow = 'hidden'; requestAnimationFrame(fitLightbox); };
      const closeLB = () => { lb!.classList.remove('active'); document.documentElement.style.overflow = ''; resetLightboxScale(); };

      const onLbOpenClick = () => openLB();
      const onLbCloseClick = () => closeLB();
      const onLbBackdropClick = (e: Event) => { if (e.target === lb) closeLB(); };
      const onResize = () => { if (lb && lb.classList.contains('active')) fitLightbox(); };
      const onVisualViewportResize = () => { if (lb && lb.classList.contains('active')) fitLightbox(); };
      const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLB(); };

      lbOpen?.addEventListener('click', onLbOpenClick, { passive: true });
      lbClose?.addEventListener('click', onLbCloseClick);
      lb?.addEventListener('click', onLbBackdropClick);
      window.addEventListener('resize', onResize);
      if (window.visualViewport){ window.visualViewport.addEventListener('resize', onVisualViewportResize); }
      document.addEventListener('keydown', onKeydown);

      function ensureThanks() {
        let el = document.getElementById('alab-thanks');
        if (el) return el;
        el = document.createElement('div');
        el.id = 'alab-thanks';
        el.setAttribute('role','alertdialog');
        el.innerHTML = '<span class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span><span class="msg">Vielen Dank! Wir melden uns in Kürze.</span><button class="close" aria-label="Schließen"></button>';
        document.body.appendChild(el);
        el.querySelector('.close')?.addEventListener('click', () => el!.classList.remove('show'));
        return el;
      }
      function showThanks(){ const el = ensureThanks(); el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 4000); }

      const moduleKWp = 0.455;
      const kWhPerKWp = 950;
      const co2KgPerKWh = 0.4;
      const feedInEUR = 0.08;
      const investPerKWp = 1200;

      function maxModuleByArea() {
        const fl = clamp(parseFloat(String(elFlaeche?.value ?? '').replace(',', '.')) || 0, 0, 1000);
        const byArea = Math.floor(fl / 2);
        return clamp(byArea, 1, 200);
      }
      function updateModuleClamp(dir = 0) {
        if (!elModule) return;
        const maxByArea = maxModuleByArea();
        let current = parseInt(elModule.value || '1', 10);
        if (Number.isFinite(dir) && dir !== 0) current += dir;
        current = clamp(current, 1, maxByArea);
        elModule.value = String(current);
      }

      let rafPending = false;
      const scheduleRecalc = () => { if (rafPending) return; rafPending = true; requestAnimationFrame(() => { rafPending = false; recalc(); }); };

      const onBtnMinusClick = () => { updateModuleClamp(-1); scheduleRecalc(); };
      const onBtnPlusClick = () => { updateModuleClamp(+1); scheduleRecalc(); };
      const onModuleInput = () => { updateModuleClamp(0);  scheduleRecalc(); };
      const onFlaecheInput = () => { updateModuleClamp(0);  scheduleRecalc(); };

      elBtnMinus?.addEventListener('click', onBtnMinusClick);
      elBtnPlus?.addEventListener('click',  onBtnPlusClick);
      elModule?.addEventListener('input',   onModuleInput);
      elFlaeche?.addEventListener('input',  onFlaecheInput);
      [elStromkosten, elStrompreis, elSpeicher].forEach((el) => el?.addEventListener('input', scheduleRecalc));

      function recalc() {
        const sv = (x: string | undefined) => String(x ?? '').replace(',', '.');
        const stromkosten = Math.max(0, parseFloat(sv(elStromkosten?.value)) || 0);
        const strompreis  = clamp(parseFloat(sv(elStrompreis?.value)) || 0.35, 0.15, 0.80);
        const module      = parseInt(sv(elModule?.value) || '1', 10);
        const withBattery = !!elSpeicher?.checked;

        const jahresverbrauch = (stromkosten * 12) / (strompreis || 0.35);
        const kWp = module * moduleKWp;
        const erzeugung = kWp * kWhPerKWp;

        const svQuote = withBattery ? 0.55 : 0.35;
        const selbstverbrauch = Math.min(erzeugung * svQuote, jahresverbrauch);
        const ueberschuss = Math.max(0, erzeugung - selbstverbrauch);
        const netzbezug = Math.max(0, jahresverbrauch - selbstverbrauch);
        const speichernutzung = withBattery ? Math.min(ueberschuss * 0.6, jahresverbrauch * 0.3) : 0;

        const ersparnisEUR = selbstverbrauch * strompreis;
        const einspeiseEUR = ueberschuss * feedInEUR;
        const cashflowJahr = ersparnisEUR + einspeiseEUR;

        const invest = kWp * investPerKWp;
        const amortJahre = cashflowJahr > 0 ? invest / cashflowJahr : Infinity;

        const gewinn30 = cashflowJahr * 30 - invest;
        const monatGew = gewinn30 / (30 * 12);
        const co2kg = erzeugung * co2KgPerKWh;

        if (elErzeugung) elErzeugung.textContent = fmtInt(erzeugung) + ' kWh';
        if (elCO2) elCO2.textContent       = fmtInt(co2kg) + ' kg';
        if (elNetzbezug) elNetzbezug.textContent = fmtInt(netzbezug) + ' kWh';
        if (elSpeicherN) elSpeicherN.textContent = fmtInt(speichernutzung) + ' kWh';
        if (elHausv) elHausv.textContent     = fmtInt(jahresverbrauch) + ' kWh';

        if (elErsparnis) elErsparnis.textContent   = fmt2(ersparnisEUR) + '  / Jahr';
        if (elEinspeisung) elEinspeisung.textContent = fmt2(einspeiseEUR) + '  / Jahr';
        if (elAmort) elAmort.textContent       = Number.isFinite(amortJahre) ? fmt1(amortJahre) + ' Jahre' : '';
        if (elGewinn30) elGewinn30.textContent    = fmtInt(gewinn30) + ' ';
        if (elMonGewinn) elMonGewinn.textContent   = fmt2(monatGew) + ' ';
      }

      updateModuleClamp(0);
      scheduleRecalc();

      // Lead Form
      const formEl = document.querySelector('#leadForm') as HTMLFormElement | null;
      let onOnline: (() => void) | null = null;
      let onFormSubmit: ((e: Event) => void) | null = null;

      if (formEl) {
        const hp = document.createElement('input');
        hp.type = 'text'; hp.name = 'hp_website'; hp.autocomplete = 'off'; hp.tabIndex = -1; hp.setAttribute('aria-hidden','true');
        Object.assign(hp.style, { position:'absolute', left:'-10000px', width:'1px', height:'1px', overflow:'hidden' });
        formEl.appendChild(hp);

        const consentWrap = document.createElement('div');
        consentWrap.className = 'form-field';
        const consentId = 'consent_dsgvo';
        const PRIVACY_URL = '/datenschutz';
        consentWrap.innerHTML = '<label for="' + consentId + '" class="consent-label" style="display:flex;gap:8px;align-items:flex-start"><input type="checkbox" id="' + consentId + '" name="consent" required /><span>Ich habe die <a href="' + PRIVACY_URL + '" class="privacy-link" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.</span></label>';
        consentWrap.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) e.stopPropagation(); });
        const submitBtn = formEl.querySelector('button[type="submit"]');
        submitBtn?.parentNode?.insertBefore(consentWrap, submitBtn);

        const MAKE_URL = 'https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y';
        const QUEUE_KEY = 'alabLeadQueue';
        const toJSON = (form: HTMLFormElement) => Object.fromEntries(new FormData(form));
        const getQueue = () => { try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch { return []; } };
        const setQueue = (arr: any[]) => { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(arr)); } catch {} };
        const enqueue  = (payload: any) => { const q = getQueue(); q.push(payload); setQueue(q); };

        async function postJSONWithTimeout(url: string, body: any, timeoutMs: number) {
          const controller = new AbortController();
          const t = setTimeout(() => controller.abort(new Error('timeout')), timeoutMs);
          try {
            const res = await fetch(url, {
              method: 'POST', mode: 'cors', keepalive: true,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body), signal: controller.signal
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res;
          } finally { clearTimeout(t); }
        }
        async function sendWithRetry(payload: any, maxAttempts = 2, timeoutMs = 6000) {
          let lastErr: any = null;
          for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try { await postJSONWithTimeout(MAKE_URL, payload, timeoutMs); return; }
            catch (err) { lastErr = err; }
          }
          throw lastErr || new Error('unknown');
        }
        async function flushQueue() {
          const q = getQueue();
          if (!q.length || !navigator.onLine) return;
          const remaining: any[] = [];
          for (const item of q) { try { await sendWithRetry(item); } catch { remaining.push(item); } }
          setQueue(remaining);
        }
        onOnline = flushQueue;
        window.addEventListener('online', onOnline);

        onFormSubmit = async (e: Event) => {
          e.preventDefault();
          const fields: any = toJSON(formEl);
          if (fields.hp_website) { closeLB(); showThanks(); return; }
          fields._ts    = new Date().toISOString();
          fields.Quelle = 'Solarrechner – Privatkunden';
          fields.Seite  = typeof window !== 'undefined' ? window.location.href : '';
          fields.Zeitstempel = new Date().toISOString();

          try {
            fields.calc = {
              stromkosten: elStromkosten?.value ?? '',
              strompreis:  elStrompreis?.value ?? '',
              dachflaeche: elFlaeche?.value ?? '',
              module:      elModule?.value ?? '',
              speicher:    elSpeicher?.checked ? 'ja' : 'nein',
              erzeugung:   elErzeugung?.textContent ?? '',
              netzbezug:   elNetzbezug?.textContent ?? '',
              hausverbrauch: elHausv?.textContent ?? ''
            };
          } catch {}

          if (!navigator.onLine) {
            enqueue(fields);
            closeLB(); showThanks();
            return;
          }

          try {
            await sendWithRetry(fields, 2, 6000);
            formEl.reset();
            closeLB(); showThanks();
            flushQueue();
          } catch (err) {
            enqueue(fields);
            closeLB(); showThanks();
          }
        };
        formEl.addEventListener('submit', onFormSubmit);
      }

      let toastEl: HTMLElement | null = null;
      let hideT: ReturnType<typeof setTimeout> | null = null;
      function toast(msg: string, error = false) {
        if (!toastEl) {
          toastEl = document.createElement('div');
          Object.assign(toastEl.style, { position:'fixed', right:'16px', bottom:'16px', padding:'10px 14px', borderRadius:'12px', boxShadow:'0 4px 10px rgba(0,0,0,.12)', zIndex:'10000' });
          document.body.appendChild(toastEl);
        }
        toastEl.textContent = msg;
        toastEl.style.background = error ? '#fca5a5' : '#2b6cb0';
        toastEl.style.color = error ? '#111827' : '#ffffff';
        toastEl.style.opacity = '1';
        if (hideT) clearTimeout(hideT);
        hideT = setTimeout(() => { if (toastEl) toastEl.style.opacity = '0'; }, 2600);
      }

      // Return cleanup function
      return () => {
        lbOpen?.removeEventListener('click', onLbOpenClick);
        lbClose?.removeEventListener('click', onLbCloseClick);
        lb?.removeEventListener('click', onLbBackdropClick);
        window.removeEventListener('resize', onResize);
        if (window.visualViewport) window.visualViewport.removeEventListener('resize', onVisualViewportResize);
        document.removeEventListener('keydown', onKeydown);
        elBtnMinus?.removeEventListener('click', onBtnMinusClick);
        elBtnPlus?.removeEventListener('click', onBtnPlusClick);
        elModule?.removeEventListener('input', onModuleInput);
        elFlaeche?.removeEventListener('input', onFlaecheInput);
        [elStromkosten, elStrompreis, elSpeicher].forEach((el) => el?.removeEventListener('input', scheduleRecalc));
        if (onOnline) window.removeEventListener('online', onOnline);
        if (formEl && onFormSubmit) formEl.removeEventListener('submit', onFormSubmit);
        // Clean up dynamically created elements
        const thanksEl = document.getElementById('alab-thanks');
        if (thanksEl) thanksEl.remove();
        if (toastEl) { toastEl.remove(); toastEl = null; }
        // Restore overflow
        document.documentElement.style.overflow = '';
      };
    })();

    return cleanup;
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
/* Scope: nur innerhalb #alab-solarcalc */
#alab-solarcalc {
  --primary: #2b6cb0;
  --primary-light: #6aa6e8;
  --primary-gradient: linear-gradient(135deg, #2b6cb0 0%, #6aa6e8 100%);
  --bg-primary: #ffffff;
  --bg-secondary: #f7f8fa;
  --bg-tertiary: #f0f2f5;
  --bg-card: #ffffff;
  --text-primary: #0f2533;
  --text-secondary: #5b6b78;
  --text-muted: #7b8794;
  --border: #e2e8f0;
  --border-light: #cbd5e1;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 10px rgba(0,0,0,.08);
}

#alab-solarcalc * { box-sizing: border-box; }
#alab-solarcalc { font-family: 'Montserrat', system-ui, Segoe UI, Roboto, Arial, sans-serif; color: var(--text-primary); }

/* Layout */
#alab-solarcalc.solar-calculator-section { background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%); padding: 48px 0; }
#alab-solarcalc .calculator-container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
#alab-solarcalc .calculator-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-2xl); padding: 32px; box-shadow: var(--shadow-sm); /* reduziert */ contain: content; }
#alab-solarcalc .calculator-header { margin-bottom: 24px; }
#alab-solarcalc .calculator-title { font-size: 30px; margin: 0 0 8px; background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
#alab-solarcalc .calculator-subtitle { color: var(--text-secondary); }

#alab-solarcalc .calculator-content { display: grid; grid-template-columns: minmax(320px, 460px) 1fr; gap: 24px; align-items: start; }

/* Virtualisierung/Containment */
#alab-solarcalc #calc-inputs,
#alab-solarcalc #calc-vis,
#alab-solarcalc #calc-results { content-visibility: auto; contain-intrinsic-size: 600px 800px; }

/* Inputs */
#alab-solarcalc .input-group { margin-bottom: 16px; }
#alab-solarcalc .input-label { font-weight: 600; margin-bottom: 8px; display: flex; gap: 8px; align-items: center; color: var(--text-primary); }
#alab-solarcalc .label-icon { width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; }
#alab-solarcalc .label-icon svg { width: 18px; height: 18px; color: var(--primary); }
#alab-solarcalc .input-wrapper { position: relative; }
#alab-solarcalc .calculator-input, #alab-solarcalc .module-input { width: 100%; padding: 12px 48px 12px 14px; background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%); border: 2px solid var(--border); border-radius: var(--radius-md); color: var(--text-primary); font-size: 16px; font-family: inherit; transition: border-color .15s ease, background .15s ease; will-change: border-color, background; }
#alab-solarcalc .calculator-input:hover, #alab-solarcalc .module-input:hover { border-color: var(--border-light); background: var(--bg-card); }
#alab-solarcalc .calculator-input:focus, #alab-solarcalc .module-input:focus { outline: none; border-color: var(--primary); background: var(--bg-card); }
#alab-solarcalc .input-unit { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
#alab-solarcalc .input-hint { display: block; margin-top: 6px; font-size: 12px; color: var(--text-muted); }

#alab-solarcalc .module-controls { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
#alab-solarcalc .module-btn { width: 40px; height: 40px; border-radius: var(--radius-md); border: 2px solid var(--border); background: var(--bg-card); color: var(--text-primary); font-size: 18px; font-weight: 700; cursor: pointer; transition: transform .12s ease; box-shadow: var(--shadow-sm); }
#alab-solarcalc .module-btn:hover { transform: translateY(-1px); }
#alab-solarcalc .module-input { width: 80px; text-align: center; padding: 10px; }
#alab-solarcalc .speicher-toggle { margin-left: auto; }
#alab-solarcalc .toggle-label { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-primary); }
#alab-solarcalc .toggle-input { appearance: none; width: 44px; height: 24px; border-radius: 999px; background: var(--border); position: relative; outline: none; transition: background .2s ease; cursor: pointer; }
#alab-solarcalc .toggle-input:checked { background: var(--primary-gradient); }
#alab-solarcalc .toggle-input::after { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; left: 3px; top: 3px; transition: transform .2s ease; }
#alab-solarcalc .toggle-input:checked::after { transform: translateX(20px); }

/* Results */
#alab-solarcalc .calculation-results { margin-top: 20px; border-radius: var(--radius-xl); padding: 20px; background: linear-gradient(135deg, rgba(43,108,176,.05) 0%, rgba(37,99,235,.03) 100%); border: 1px solid var(--border); }
#alab-solarcalc .results-title { font-size: 14px; color: var(--text-secondary); margin-bottom: 12px; }
#alab-solarcalc .result-item { display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px solid var(--border); }
#alab-solarcalc .result-item:first-of-type { border-top: none; }
#alab-solarcalc .result-label { color: var(--text-secondary); }
#alab-solarcalc .result-value { font-weight: 700; color: var(--primary-light); }
#alab-solarcalc .total-result { margin-top: 12px; border-top: 1px solid var(--border); padding-top: 12px; }
#alab-solarcalc .total-value { font-size: 26px; font-weight: 800; margin-top: 6px; background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
#alab-solarcalc .monthly-potential { display: flex; justify-content: space-between; color: var(--text-secondary); margin-top: 6px; font-size: 14px; }
#alab-solarcalc .cta-button { display: inline-block; margin-top: 18px; padding: 14px 22px; border-radius: var(--radius-lg); background: var(--primary-gradient); border: none; color: #ffffff; font-weight: 700; font-size: 16px; cursor: pointer; width: 100%; transition: transform .12s ease; box-shadow: var(--shadow-sm); }
#alab-solarcalc .cta-button:hover { transform: translateY(-1px); }

/* Visualization */
#alab-solarcalc .calculator-visualization { padding: 16px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border); box-shadow: var(--shadow-sm); contain: content; }
#alab-solarcalc .visualization-title { color: var(--text-primary); margin: 0 0 16px; font-size: 18px; font-weight: 600; text-align: center; }
#alab-solarcalc .energy-diagram-new { position: relative; background: transparent; border-radius: var(--radius-lg); padding: 8px; min-height: 450px; display: flex; align-items: center; justify-content: center; border: none; contain: layout paint size; }
#alab-solarcalc .diagram-image { width: 100%; max-width: 500px; height: auto; object-fit: contain; z-index: 1; }
#alab-solarcalc .value-overlay { position: absolute; z-index: 2; }
#alab-solarcalc .value-container { background: rgba(255,255,255,.9); border: 1px solid rgba(226,232,240,.6); border-radius: var(--radius-md); padding: 6px 10px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 85px; }
#alab-solarcalc .value-label { font-size: 9px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: .3px; white-space: nowrap; }
#alab-solarcalc .value-number { font-size: 14px; font-weight: 700; background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; white-space: nowrap; }

/* Positioning */
#alab-solarcalc .top-value { top: 20%; left: 50%; transform: translateX(-50%); }
#alab-solarcalc .right-top-value { top: 36%; right:12%; }
#alab-solarcalc .left-bottom-value { left: 16%; bottom: 55%; }
#alab-solarcalc .left-bottom-value-2 { left: 10%; bottom: 15%; }
#alab-solarcalc .bottom-center-value { bottom: 6%; left: 50%; transform: translateX(-50%); }

/* ===== LIGHTBOX DESIGN (optimiert) ===== */
#contactLightbox {
  /* Design-Tokens im gleichen Scope wie der Solarrechner */
  --primary: #2b6cb0;
  --primary-light: #6aa6e8;
  --primary-gradient: linear-gradient(135deg, #2b6cb0 0%, #6aa6e8 100%);
  --bg-primary: #ffffff;
  --bg-secondary: #f7f8fa;
  --bg-tertiary: #f0f2f5;
  --bg-card: #ffffff;
  --text-primary: #0f2533;
  --text-secondary: #5b6b78;
  --text-muted: #7b8794;
  --border: #e2e8f0;
  --border-light: #cbd5e1;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 24px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 10px rgba(0,0,0,.08);

  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 37, 51, 0.55);
  backdrop-filter: blur(4px);
  z-index: 9999;
  padding: 20px;
  overflow-y: auto;
  animation: fadeIn 0.2s ease-out;
  font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
}
#contactLightbox.active { display: flex; align-items: center; justify-content: center; }

.lightbox-container { background: var(--bg-card); border-radius: var(--radius-2xl); width: 100%; max-width: 640px; box-shadow: 0 20px 60px rgba(15, 37, 51, 0.22), 0 6px 18px rgba(15, 37, 51, 0.08); border: 1px solid var(--border); transform: translateZ(0); opacity: 0; animation: lightboxSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); contain: content; }
.lightbox-header { background: #ffffff; padding: 20px 24px; border-bottom: 1px solid var(--border); border-radius: var(--radius-2xl) var(--radius-2xl) 0 0; display: flex; justify-content: space-between; align-items: center; }
.lightbox-title-wrapper { display: flex; align-items: center; gap: 12px; }
.lightbox-icon { width: 28px; height: 28px; color: var(--primary); flex-shrink: 0; }
.lightbox-header h2 { margin: 0; font-size: 20px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); }
.lightbox-close { background: var(--bg-secondary); border: 1px solid var(--border); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform .12s ease; flex-shrink: 0; }
.lightbox-close:hover { transform: scale(1.05); }
.lightbox-close svg { width: 20px; height: 20px; color: var(--text-secondary); }
.lightbox-body { padding: 20px 24px 24px; }
.lightbox-description { margin: 0 0 24px; color: var(--text-secondary); font-size: 14px; line-height: 1.6; text-align: left; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); }

.lightbox-form { display: flex; flex-direction: column; gap: 18px; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); }
.form-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.form-row.form-row-street { grid-template-columns: 2fr 1fr; }
.form-row.form-row-city { grid-template-columns: 1fr 2fr; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field label { font-weight: 600; font-size: 13px; color: var(--text-primary); padding-left: 2px; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); }
.form-field input, .form-field textarea { color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; }
.form-field input::placeholder, .form-field textarea::placeholder { color: var(--text-muted); }
.form-field input, .form-field textarea { padding: 13px 16px; border: 1.5px solid var(--border); border-radius: var(--radius-md); background: var(--bg-secondary); font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); font-size: 15px; transition: border-color .15s ease, box-shadow .15s ease; color: var(--text-primary); }
.form-field input:hover, .form-field textarea:hover { border-color: var(--border-light); }
.form-field input:focus, .form-field textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.15); }
.form-field textarea { resize: vertical; min-height: 100px; }

.lightbox-submit { background: var(--primary); color: #ffffff; border: none; padding: 15px 24px; border-radius: var(--radius-lg); font-weight: 700; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; margin-top: 8px; box-shadow: 0 4px 12px rgba(43, 108, 176, 0.25); transition: transform .12s ease, box-shadow .12s ease, background .12s ease; font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif); letter-spacing: 0.01em; }
.lightbox-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(43, 108, 176, 0.35); background: #1e4f8b; }
.lightbox-submit:active { transform: translateY(0); }
.lightbox-submit svg { width: 20px; height: 20px; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes lightboxSlideIn { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { #alab-solarcalc *, #contactLightbox *, .lightbox-container * { transition: none !important; animation: none !important; } }
@media (max-width: 768px) {
  #alab-solarcalc .calculator-content { grid-template-columns: 1fr; }
  #alab-solarcalc .calculator-card { padding: 20px; }
  #alab-solarcalc .energy-diagram-new { min-height: 380px; }
  #alab-solarcalc .value-overlay { position: static; transform: none !important; margin-bottom: 10px; }
  #alab-solarcalc .diagram-image { max-width: 100%; }
  #alab-solarcalc .value-container { min-width: auto; flex-direction: row; justify-content: space-between; width: 100%; padding: 8px 10px; }
  #alab-solarcalc .value-label { font-size: 10px; }
  #alab-solarcalc .value-number { font-size: 13px; }

  .lightbox-container { max-width: 100%; margin: 0; border-radius: var(--radius-xl); display: flex; flex-direction: column; max-height: 90vh; }
  .lightbox-header { padding: 18px; }
  .lightbox-header h2 { font-size: 20px; }
  .lightbox-body { padding: 18px; overflow-y: auto; }
  .form-row { grid-template-columns: 1fr; gap: 18px; }
}


/* ==== Lightbox-Form: Text schwarz statt wei ==== */
#contactLightbox .lightbox-description { color: var(--text-primary) !important; }

#contactLightbox .form-field label {
  color: var(--text-primary) !important;
}

#contactLightbox .form-field input,
#contactLightbox .form-field textarea {
  color: var(--text-primary) !important;              /* sichtbarer Text */
  -webkit-text-fill-color: var(--text-primary) !important; /* Safari/Autofill */
  background: var(--bg-secondary);                    /* belasse dein Design */
  caret-color: var(--text-primary);
}

/* Platzhalter neutral/dunkler grau */
#contactLightbox .form-field input::placeholder,
#contactLightbox .form-field textarea::placeholder {
  color: var(--text-secondary) !important;
  opacity: 1;
}

/* Autofill (Chrome/Safari): Text ebenfalls schwarz halten */
#contactLightbox .form-field input:-webkit-autofill,
#contactLightbox .form-field textarea:-webkit-autofill {
  -webkit-text-fill-color: var(--text-primary) !important;
  box-shadow: 0 0 0 1000px var(--bg-secondary) inset !important; /* Hintergrund angleichen */
}

/* DSGVO-Checkbox-Text ebenfalls schwarz */
#contactLightbox .form-field input[type="checkbox"] + label,
#contactLightbox .form-field label input[type="checkbox"] {
  color: var(--text-primary) !important;
}

/* Consent-Label Styling + Link-Farbe */
#contactLightbox .consent-label { gap: 8px; }
#contactLightbox .consent-label a.privacy-link{
  color: var(--primary);
  text-decoration: underline;
  font-weight: 700;
}
#contactLightbox .consent-label a.privacy-link:hover{
  text-decoration: none;
}


/* =========================
   MOBILE COMPACT OVERRIDES
   ========================= */

/*  640px */
@media (max-width:640px){
  /* Section + Card */
  #alab-solarcalc.solar-calculator-section{ padding: 28px 0; }
  #alab-solarcalc .calculator-container{ padding: 0 12px; }
  #alab-solarcalc .calculator-card{ padding: 16px; border-radius: var(--radius-xl); }

  /* Header */
  #alab-solarcalc .calculator-title{ font-size: 22px; margin-bottom: 6px; }
  #alab-solarcalc .calculator-subtitle{ font-size: 14px; line-height: 1.5; }
  #alab-solarcalc .input-hint{ font-size: 11px; }

  /* Grid */
  #alab-solarcalc .calculator-content{ grid-template-columns: 1fr; gap: 16px; }

  /* Inputs */
  #alab-solarcalc .input-group{ margin-bottom: 12px; }
  #alab-solarcalc .input-label{ font-size: 13px; gap: 6px; }
  #alab-solarcalc .label-icon{ width: 16px; height: 16px; }
  #alab-solarcalc .label-icon svg{ width: 16px; height: 16px; }
  #alab-solarcalc .calculator-input,
  #alab-solarcalc .module-input{
    padding: 10px 40px 10px 12px;
    font-size: 15px;
    border-radius: var(--radius-md);
  }
  #alab-solarcalc .input-unit{ right: 10px; font-size: 13px; }

  /* Module controls */
  #alab-solarcalc .module-controls{ gap: 8px; margin-top: 4px; }
  #alab-solarcalc .module-btn{ width: 34px; height: 34px; font-size: 16px; }
  #alab-solarcalc .module-input{ width: 64px; padding: 8px; }
  #alab-solarcalc .toggle-input{ width: 38px; height: 22px; }
  #alab-solarcalc .toggle-input::after{ width: 16px; height: 16px; left: 3px; top: 3px; }
  #alab-solarcalc .toggle-input:checked::after{ transform: translateX(16px); }

  /* Results */
  #alab-solarcalc .calculation-results{ padding: 14px; border-radius: var(--radius-lg); }
  #alab-solarcalc .results-title{ font-size: 12px; margin-bottom: 8px; }
  #alab-solarcalc .result-item{ padding: 8px 0; }
  #alab-solarcalc .result-label{ font-size: 13px; }
  #alab-solarcalc .result-value{ font-size: 14px; }
  #alab-solarcalc .total-result{ margin-top: 10px; padding-top: 10px; }
  #alab-solarcalc .total-value{ font-size: 22px; margin-top: 4px; }
  #alab-solarcalc .monthly-potential{ font-size: 12px; }
  #alab-solarcalc .cta-button{ margin-top: 12px; padding: 12px 16px; font-size: 15px; }

  /* Visualization */
  #alab-solarcalc .visualization-title{ font-size: 16px; margin-bottom: 10px; }
  #alab-solarcalc .energy-diagram-new{ min-height: 300px; padding: 6px; }
  #alab-solarcalc .diagram-image{ max-width: 420px; }
  /* Unter 768px werden Overlays bereits gestackt  hier nur noch kompakter */
  #alab-solarcalc .value-container{ padding: 6px 8px; gap: 2px; }
  #alab-solarcalc .value-label{ font-size: 9px; }
  #alab-solarcalc .value-number{ font-size: 12px; }
}

/*  420px  noch etwas dichter */
@media (max-width:420px){
  /* Section/Card */
  #alab-solarcalc.solar-calculator-section{ padding: 22px 0; }
  #alab-solarcalc .calculator-container{ padding: 0 10px; }
  #alab-solarcalc .calculator-card{ padding: 14px; }

  /* Header */
  #alab-solarcalc .calculator-title{ font-size: 20px; }
  #alab-solarcalc .calculator-subtitle{ font-size: 13px; }

  /* Inputs */
  #alab-solarcalc .input-label{ font-size: 12px; }
  #alab-solarcalc .calculator-input,
  #alab-solarcalc .module-input{ font-size: 14px; padding: 9px 38px 9px 11px; }
  #alab-solarcalc .module-btn{ width: 32px; height: 32px; font-size: 15px; }
  #alab-solarcalc .module-input{ width: 58px; }
  #alab-solarcalc .input-hint{ font-size: 10px; }

  /* Results */
  #alab-solarcalc .results-title{ font-size: 11px; }
  #alab-solarcalc .result-label{ font-size: 12px; }
  #alab-solarcalc .result-value{ font-size: 13px; }
  #alab-solarcalc .total-value{ font-size: 20px; }
  #alab-solarcalc .cta-button{ font-size: 14px; padding: 11px 14px; }

  /* Visualization */
  #alab-solarcalc .visualization-title{ font-size: 15px; }
  #alab-solarcalc .energy-diagram-new{ min-height: 260px; }
  #alab-solarcalc .value-container{ padding: 5px 8px; }
  #alab-solarcalc .value-label{ font-size: 8.5px; }
  #alab-solarcalc .value-number{ font-size: 11.5px; }
}

/* ===== Kontakt-Formular Lightbox  Mobile Compact ===== */
@media (max-width:640px){
  #contactLightbox{ padding: 12px; }
  .lightbox-container{ max-width: 100%; border-radius: var(--radius-xl); }
  .lightbox-header{ padding: 14px 16px; }
  .lightbox-title-wrapper{ gap: 10px; }
  .lightbox-icon{ width: 24px; height: 24px; }
  .lightbox-header h2{ font-size: 18px; }
  .lightbox-close{ width: 32px; height: 32px; }
  .lightbox-close svg{ width: 18px; height: 18px; }

  .lightbox-body{ padding: 14px 16px 16px; }
  .lightbox-description{ font-size: 14px; margin-bottom: 16px; }
  .lightbox-form{ gap: 14px; }
  .form-row{ grid-template-columns: 1fr; gap: 12px; }
  .form-field label{ font-size: 12px; }
  .form-field input, .form-field textarea{
    font-size: 14px; padding: 11px 12px; border-radius: var(--radius-md);
  }
  .lightbox-submit{ padding: 12px 16px; font-size: 15px; }
  #contactLightbox .consent-label{ gap: 8px; }
  #contactLightbox .consent-label input[type="checkbox"]{ transform: scale(.95); }
}

@media (max-width:420px){
  .lightbox-header{ padding: 12px 14px; }
  .lightbox-header h2{ font-size: 17px; }
  .lightbox-body{ padding: 12px 14px 14px; }
  .lightbox-description{ font-size: 13px; }
  .form-field input, .form-field textarea{ font-size: 13.5px; padding: 10px 12px; }
  .lightbox-submit{ font-size: 14px; padding: 11px 14px; }
}




/* ===== Lightbox: mobil ohne Scroll, kompakter ===== */
@media (max-width:640px){
  #contactLightbox{ padding: 10px; }
  .lightbox-container{
    width: min(560px, 94vw);
    max-height: none;              /* Messung via JS, kein automatisches Scrollen */
    border-radius: 18px;
  }
  .lightbox-header{ padding: 12px 14px; }
  .lightbox-title-wrapper{ gap: 8px; }
  .lightbox-icon{ width: 22px; height: 22px; }
  .lightbox-header h2{ font-size: 18px; }
  .lightbox-close{ width: 30px; height: 30px; }
  .lightbox-close svg{ width: 18px; height: 18px; }

  .lightbox-body{
    padding: 12px 14px 14px;
    overflow: visible !important;  /* KEIN inneres Scrollen */
  }
  .lightbox-description{
    font-size: 14px; line-height: 1.45; margin-bottom: 12px;
    color: var(--text-primary) !important;
  }
  .lightbox-form{ gap: 12px; }
  .form-row{ grid-template-columns: 1fr; gap: 10px; }
  .form-field label{ font-size: 12px; }
  .form-field input, .form-field textarea{
    font-size: 14px; padding: 10px 12px; border-radius: 10px;
  }
  .form-field textarea{ min-height: 72px; }
  .lightbox-submit{ padding: 11px 12px; font-size: 15px; border-radius: 12px; }
  #contactLightbox .consent-label{ gap: 8px; }
  #contactLightbox .consent-label input[type="checkbox"]{ transform: scale(.95); }
}

/* ===== PV-Module: Zahl nie abgeschnitten, ohne Spinners ===== */
#alab-solarcalc .module-input{
  width: 76px; min-width: 76px;   /* genug Platz für 2-3 Ziffern */
  text-align: center;
  font-variant-numeric: tabular-nums;
}
#alab-solarcalc input[type="number"]::-webkit-outer-spin-button,
#alab-solarcalc input[type="number"]::-webkit-inner-spin-button{ -webkit-appearance: none; margin: 0; }
#alab-solarcalc input[type="number"]{ -moz-appearance: textfield; }

@media (max-width:640px){
  #alab-solarcalc .module-input{ width: 76px; min-width: 76px; }
  #alab-solarcalc .module-btn{ width: 34px; height: 34px; font-size: 16px; }
}


/* Mobil: Visualisierung komplett ausblenden und Abstände schließen */
@media (max-width:840px){
  #alab-solarcalc .calculator-visualization{
    display: none !important;
  }
  /* Grid sauber auf 1 Spalte ohne Extra-Gap */
  #alab-solarcalc .calculator-content{
    grid-template-columns: 1fr;
    gap: 14px; /* gern anpassen */
  }
}
/* Danke-Banner */
#alab-thanks {
  position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%) translateY(20px);
  background: #fff; color: var(--text-primary); border: 1px solid var(--border);
  border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,.12);
  padding: 12px 14px; display: none; align-items: center; gap: 10px; z-index: 10000;
}
#alab-thanks.show { display: flex; animation: alabThanksIn .22s ease-out forwards; }
#alab-thanks .check {
  width: 18px; height: 18px; border-radius: 50%; background: var(--primary); display: inline-grid; place-items: center;
}
#alab-thanks .check svg { width: 12px; height: 12px; color: #0f2533; }
#alab-thanks .msg { font-weight: 600; }
#alab-thanks .close {
  margin-left: 6px; background: transparent; border: 0; cursor: pointer; color: var(--text-secondary);
  width: 28px; height: 28px; border-radius: 50%;
}
@keyframes alabThanksIn { to { transform: translateX(-50%) translateY(0); } }
      `}} />

      <section id="alab-solarcalc" className="solar-calculator-section" aria-label="Solarrechner">
        <div className="calculator-container">
          <div className="calculator-card">
            <header className="calculator-header">
              <div>
                <h2 className="calculator-title">Solarrechner</h2>
                <p className="calculator-subtitle">
                  In 60 Sekunden zu Ihrer PV-Kalkulation – mit Erzeugung, Hausverbrauch, Netzbezug,
                  Speicherwirkung und Amortisation. Kostenlos &amp; unverbindlich.
                </p>
                <small className="input-hint" aria-live="polite">Keine Weitergabe Ihrer Daten.</small>
              </div>
            </header>

            <div className="calculator-content">
              <div className="calculator-inputs" id="calc-inputs">
                <div className="input-group">
                  <label className="input-label" htmlFor="stromkosten">
                    <span className="label-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                    </span>
                    Monatliche Stromkosten
                  </label>
                  <div className="input-wrapper">
                    <input type="number" id="stromkosten" className="calculator-input" defaultValue="110" min="0" step="1" inputMode="decimal" autoComplete="on" />
                    <span className="input-unit" aria-hidden="true">€</span>
                  </div>
                  <small className="input-hint">Wird mit dem Strompreis in Jahresverbrauch umgerechnet.</small>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="strompreis">
                    <span className="label-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    </span>
                    Strompreis pro kWh
                  </label>
                  <div className="input-wrapper">
                    <input type="number" id="strompreis" className="calculator-input" defaultValue="0.35" min="0.10" max="1" step="0.01" inputMode="decimal" autoComplete="on" />
                    <span className="input-unit" aria-hidden="true"></span>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="dachflaeche">
                    <span className="label-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                    </span>
                    Nutzbare Dachfläche
                  </label>
                  <div className="input-wrapper">
                    <input type="number" id="dachflaeche" className="calculator-input" defaultValue="40" min="10" step="1" inputMode="decimal" autoComplete="on" />
                    <span className="input-unit" aria-hidden="true">m²</span>
                  </div>
                  <small className="input-hint">Automatische Begrenzung: min(200, Fläche/2 m² je Modul).</small>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="pvModule">
                    <span className="label-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                    </span>
                    PV-Module
                  </label>
                  <div className="module-controls">
                    <button type="button" className="module-btn" id="btnMinus" aria-label="Ein Modul weniger" aria-controls="pvModule">−</button>
                    <input type="number" id="pvModule" className="module-input" defaultValue="12" min="1" max="200" inputMode="numeric" />
                    <button type="button" className="module-btn" id="btnPlus" aria-label="Ein Modul mehr" aria-controls="pvModule">+</button>
                    <div className="speicher-toggle">
                      <label className="toggle-label" htmlFor="speicher">
                        <input type="checkbox" id="speicher" className="toggle-input" />
                        <span>Speicher</span>
                      </label>
                    </div>
                  </div>
                  <small className="input-hint">Automatische Begrenzung: min(200, Fläche/2 m² je Modul).</small>
                </div>

                <section className="calculation-results" id="calc-results" aria-live="polite">
                  <h3 className="results-title">Dein durchschnittliches Solarpotenzial:</h3>
                  <div className="result-item"><span className="result-label">Stromkosten-Ersparnis</span><span className="result-value" id="ersparnis"></span></div>
                  <div className="result-item"><span className="result-label">Einspeisevergütung</span><span className="result-value" id="einspeisung"></span></div>
                  <div className="result-item"><span className="result-label">Amortisationsdauer</span><span className="result-value" id="amort"></span></div>
                  <div className="total-result">
                    <div><strong>Gewinn über 30 Jahre</strong></div>
                    <div className="total-value" id="gesamtgewinn"></div>
                    <div className="monthly-potential"><span>Monatliches Gewinnpotenzial</span><span id="monatlichGewinn"></span></div>
                  </div>
                  <button className="cta-button" id="cta-open">Weiter zur Anfrage</button>
                </section>
              </div>

              <div className="calculator-visualization" id="calc-vis">
                <h3 className="visualization-title">Jährliche Durchschnittswerte für Energieproduktion und Verbrauch</h3>
                <div className="energy-diagram-new">
                  <img className="diagram-image" src="/assets/img/private-loesungen/pv-privat-solarrechner.png" alt="Solar Energy Flow Diagram" width="500" height="400" decoding="async" loading="lazy" fetchPriority="low" />
                  <div className="value-overlay top-value"><div className="value-container"><span className="value-label">ERZEUGUNG</span><span className="value-number" id="erzeugung"> kWh</span></div></div>
                  <div className="value-overlay right-top-value"><div className="value-container"><span className="value-label">CO₂-ERSPARNIS</span><span className="value-number" id="co2ersparnis"> kg</span></div></div>
                  <div className="value-overlay left-bottom-value"><div className="value-container"><span className="value-label">NETZBEZUG</span><span className="value-number" id="netzbezug"> kWh</span></div></div>
                  <div className="value-overlay left-bottom-value-2"><div className="value-container"><span className="value-label">SPEICHERNUTZUNG</span><span className="value-number" id="speichernutzung"> kWh</span></div></div>
                  <div className="value-overlay bottom-center-value"><div className="value-container"><span className="value-label">HAUSVERBRAUCH</span><span className="value-number" id="hausverbrauch"> kWh</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Lightbox */}
      <div id="contactLightbox" className="lightbox-backdrop" role="dialog" aria-modal="true" aria-labelledby="lightboxTitle">
        <div className="lightbox-container">
          <div className="lightbox-header">
            <div className="lightbox-title-wrapper">
              <svg className="lightbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <h2 id="lightboxTitle">Kostenloses PV-Angebot anfordern</h2>
            </div>
            <button className="lightbox-close" id="lightbox-close" aria-label="Schließen" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="lightbox-body">
            <p className="lightbox-description">Füllen Sie das Formular aus und wir erstellen Ihnen ein individuelles Angebot für Ihre PV-Anlage. Kostenlos und unverbindlich.</p>
            <form id="leadForm" className="lightbox-form" autoComplete="on">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="lb-vorname">Vorname *</label>
                  <input type="text" id="lb-vorname" name="vorname" required placeholder="Max" autoComplete="given-name" />
                </div>
                <div className="form-field">
                  <label htmlFor="lb-nachname">Nachname *</label>
                  <input type="text" id="lb-nachname" name="nachname" required placeholder="Mustermann" autoComplete="family-name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="lb-email">E-Mail</label>
                  <input type="email" id="lb-email" name="email" placeholder="max@beispiel.de" autoComplete="email" />
                </div>
                <div className="form-field">
                  <label htmlFor="lb-telefon">Telefon *</label>
                  <input type="tel" id="lb-telefon" name="telefon" required placeholder="+49 123 456789" autoComplete="tel" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field" style={{ width: "100%" }}>
                  <label htmlFor="lb-firma">Firma (optional)</label>
                  <input type="text" id="lb-firma" name="firma" placeholder="Mustermann GmbH" autoComplete="organization" />
                </div>
              </div>
              <div className="form-row form-row-street">
                <div className="form-field">
                  <label htmlFor="lb-strasse">Straße *</label>
                  <input type="text" id="lb-strasse" name="strasse" required placeholder="Musterstraße" autoComplete="address-line1" />
                </div>
                <div className="form-field">
                  <label htmlFor="lb-hausnummer">Hausnummer *</label>
                  <input type="text" id="lb-hausnummer" name="hausnummer" required placeholder="12a" autoComplete="address-line2" />
                </div>
              </div>
              <div className="form-row form-row-city">
                <div className="form-field">
                  <label htmlFor="lb-plz">PLZ *</label>
                  <input type="text" id="lb-plz" name="plz" required placeholder="87719" inputMode="numeric" pattern="[0-9]{4,5}" autoComplete="postal-code" />
                </div>
                <div className="form-field">
                  <label htmlFor="lb-ort">Ort *</label>
                  <input type="text" id="lb-ort" name="ort" required placeholder="Mindelheim" autoComplete="address-level2" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="lb-nachricht">Nachricht (optional)</label>
                <textarea id="lb-nachricht" name="nachricht" rows={4} placeholder="Haben Sie spezielle Wünsche oder Fragen?"></textarea>
              </div>
              <button type="submit" className="lightbox-submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
                <span className="btn-text">Angebot anfordern</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}



