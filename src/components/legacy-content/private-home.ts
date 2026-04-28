export const privateHomeHtml = String.raw`
<section class="hero">
  <div class="hero-background">
    <!-- Hintergrundvideo -->
    <video playsinline autoplay muted loop id="heroVideo">
      <source src="/assets/img/private-loesungen/file.mp4" type="video/mp4">
      Ihr Browser unterstÃ¼tzt das Video-Tag nicht.
    </video>

    <!-- Overlay fÃ¼r bessere Lesbarkeit -->
    <div class="video-overlay"></div>
    <div class="gradient-orb gradient-orb-1"></div>
    <div class="gradient-orb gradient-orb-2"></div>
    <div class="grid-pattern"></div>
  </div>

  <div class="container">
    <div class="hero-content">
      <div class="hero-left">
        <div class="hero-badge">
          <span class="badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </span>
          <span>Zertifizierte Solarexperten</span>
        </div>

        <h1 class="hero-title">
          <span class="title-line">Solarenergie fÃ¼r</span>
          <span class="title-line gradient-text">Ihr Zuhause</span>
        </h1>

        <p class="hero-description">
          Nutzen Sie die Kraft der Sonne und werden Sie unabhÃ¤ngig von steigenden Strompreisen.
          Wir planen Ihre maÃŸgeschneiderte Photovoltaikanlage mit hÃ¶chster PrÃ¤zision.
        </p>

        <div class="hero-benefits">
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span>Bis zu 85% Stromkosten sparen</span>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span>Staatliche FÃ¶rderung inklusive</span>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span>20 Jahre Leistungsgarantie</span>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">30+</div>
            <div class="stat-label">Installierte Anlagen</div>
          </div>
          <div class="stat">
            <div class="stat-value">500+ KW</div>
            <div class="stat-label">Gesamtleistung</div>
          </div>
          <div class="stat">
            <div class="stat-value">98%</div>
            <div class="stat-label">Kundenzufriedenheit</div>
          </div>
        </div>
      </div>

      <div class="hero-right">
        <div class="form-card">
          <div class="form-glow"></div>
          <div class="form-header">
            <h2>Kostenloses Angebot</h2>
            <p>In nur 2 Minuten zu Ihrer individuellen Kalkulation</p>
          </div>

          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="progress-steps">
              <span class="step-number active" data-step="1">1</span>
              <span class="step-number" data-step="2">2</span>
              <span class="step-number" data-step="3">3</span>
              <span class="step-number" data-step="4">4</span>
              <span class="step-number" data-step="5">5</span>
            </div>
          </div>

          <form id="solarForm" autocomplete="off" novalidate>
            <!-- STEP 1 -->
            <div class="form-step active" data-step="1">
              <label class="form-label">Welche Art von GebÃ¤ude haben Sie?</label>
              <div class="radio-grid">
                <div class="radio-card">
                  <input type="radio" id="einfamilienhaus" name="gebaeudeart" value="Einfamilienhaus" required>
                  <label for="einfamilienhaus">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    <span>Einfamilienhaus</span>
                  </label>
                </div>
                <div class="radio-card">
                  <input type="radio" id="mehrfamilienhaus" name="gebaeudeart" value="Mehrfamilienhaus">
                  <label for="mehrfamilienhaus">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 21h18"></path>
                        <path d="M3 7v14"></path>
                        <path d="M21 7v14"></path>
                        <path d="M3 7l9-4 9 4"></path>
                        <path d="M9 21V11"></path>
                        <path d="M15 21V11"></path>
                      </svg>
                    </span>
                    <span>Mehrfamilienhaus</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- STEP 2 -->
            <div class="form-step" data-step="2">
              <label class="form-label">Welche Dachform haben Sie?</label>
              <div class="radio-grid">
                <div class="radio-card">
                  <input type="radio" id="satteldach" name="dachform" value="Satteldach" required>
                  <label for="satteldach">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12l9-9 9 9"></path>
                        <path d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"></path>
                      </svg>
                    </span>
                    <span>Satteldach</span>
                  </label>
                </div>
                <div class="radio-card">
                  <input type="radio" id="flachdach" name="dachform" value="Flachdach">
                  <label for="flachdach">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="10" width="18" height="11" rx="1"></rect>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    <span>Flachdach</span>
                  </label>
                </div>
                <div class="radio-card">
                  <input type="radio" id="walmdach" name="dachform" value="Walmdach">
                  <label for="walmdach">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3l-9 9h4v8h10v-8h4z"></path>
                      </svg>
                    </span>
                    <span>Walmdach</span>
                  </label>
                </div>
                <div class="radio-card">
                  <input type="radio" id="pultdach" name="dachform" value="Pultdach">
                  <label for="pultdach">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 16l9-9 9 5"></path>
                        <path d="M5 14v6a1 1 0 001 1h12a1 1 0 001-1v-9"></path>
                      </svg>
                    </span>
                    <span>Pultdach</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- STEP 3 -->
            <div class="form-step" data-step="3">
              <label class="form-label">JÃ¤hrlicher Stromverbrauch</label>
              <div class="input-group">
                <input type="number" name="stromverbrauch" class="form-input" min="0" step="1" placeholder="z.B. 3500" required>
                <span class="input-suffix">kWh/Jahr</span>
              </div>
              <span class="input-hint">Finden Sie den Wert auf Ihrer letzten Stromrechnung</span>
            </div>

            <!-- STEP 4 -->
            <div class="form-step" data-step="4">
              <label class="form-label">Interesse an zusÃ¤tzlichen Komponenten?</label>
              <div class="radio-grid">
                <div class="radio-card">
                  <input type="radio" id="nur-pv" name="zusatzkomponenten" value="Nur PV" required>
                  <label for="nur-pv">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="7" height="9"></rect>
                        <rect x="14" y="3" width="7" height="5"></rect>
                        <rect x="14" y="12" width="7" height="9"></rect>
                        <rect x="3" y="16" width="7" height="5"></rect>
                      </svg>
                    </span>
                    <span>Nur PV</span>
                  </label>
                </div>
                <div class="radio-card">
                  <input type="radio" id="mit-speicher" name="zusatzkomponenten" value="Mit Speicher">
                  <label for="mit-speicher">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="8" x2="15" y2="8"></line>
                        <line x1="9" y1="12" x2="15" y2="12"></line>
                        <line x1="9" y1="16" x2="15" y2="16"></line>
                        <line x1="12" y1="4" x2="12" y2="2"></line>
                      </svg>
                    </span>
                    <span>Mit Speicher</span>
                  </label>
                </div>
                <div class="radio-card">
                  <input type="radio" id="mit-wallbox" name="zusatzkomponenten" value="Mit Wallbox">
                  <label for="mit-wallbox">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18.92 2.01C18.72 1.42 18.16 1 17.5 1h-11c-.66 0-1.21.42-1.42 1.01L3 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8l-2.08-5.99z"></path>
                        <circle cx="7.5" cy="12.5" r="1.5"></circle>
                        <circle cx="16.5" cy="12.5" r="1.5"></circle>
                        <path d="M5 8h14"></path>
                      </svg>
                    </span>
                    <span>Mit Wallbox</span>
                  </label>
                </div>
                <div class="radio-card">
                  <input type="radio" id="komplett" name="zusatzkomponenten" value="Komplettpaket">
                  <label for="komplett">
                    <span class="radio-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 9v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9"></path>
                        <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"></path>
                      </svg>
                    </span>
                    <span>Komplettpaket</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- STEP 5 -->
            <div class="form-step" data-step="5">
              <label class="form-label">Ihre Kontaktdaten</label>
              <div class="contact-grid">
                <div class="form-field">
                  <input type="text" name="vorname" class="form-input" placeholder="Vorname" required>
                </div>
                <div class="form-field">
                  <input type="text" name="nachname" class="form-input" placeholder="Nachname" required>
                </div>
                <div class="form-field">
                  <input type="email" name="email" class="form-input" placeholder="E-Mail-Adresse" required>
                </div>
                <div class="form-field">
                  <input type="tel" name="telefon" class="form-input" placeholder="Telefonnummer" required>
                </div>
                <div class="form-field form-field-full">
                  <input type="text" name="adresse" class="form-input" placeholder="Adresse (StraÃŸe, Hausnr., PLZ, Ort)" required>
                </div>
              </div>
              <span class="input-hint">Ihre Daten werden vertraulich behandelt</span>
            </div>
          </form>

          <div class="form-navigation">
            <button type="button" class="btn btn-secondary" id="prevBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              ZurÃ¼ck
            </button>
            <button type="button" class="btn btn-primary" id="nextBtn">
              Weiter
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section class="process-section" id="pv-process" aria-label="Ihr Weg zur PV-Anlage">
  <div class="section-header">
    <span class="header-badge">So einfach geht's</span>
    <h2 class="section-title">Ihr Weg zur PV-Anlage â€“ planungssicher, rechtssicher, wirtschaftlich</h2>
    <p>In <strong>4 klaren Schritten</strong> zur maÃŸgeschneiderten Anlage.</p>
  </div>

  <div class="process-layout-container">
    <!-- Step Navigation -->
    <div class="step-navigation" id="pv-steps" role="tablist" aria-label="Schritte">
      <div class="step-connector" aria-hidden="true"></div>
      <button class="step-button active" data-tab="1" role="tab" aria-selected="true" aria-controls="tab-1">
        <div class="step-number">01</div>
        <span class="step-button-title">Beratung & Planung</span>
      </button>
      <button class="step-button" data-tab="2" role="tab" aria-selected="false" aria-controls="tab-2">
        <div class="step-number">02</div>
        <span class="step-button-title">Auftrag & Abwicklung</span>
      </button>
      <button class="step-button" data-tab="3" role="tab" aria-selected="false" aria-controls="tab-3">
        <div class="step-number">03</div>
        <span class="step-button-title">Installation</span>
      </button>
      <button class="step-button" data-tab="4" role="tab" aria-selected="false" aria-controls="tab-4">
        <div class="step-number">04</div>
        <span class="step-button-title">Service & Betrieb</span>
      </button>
    </div>

    <!-- Content Display -->
    <div class="content-display" id="pv-content">
      <!-- Step 1 -->
      <div id="tab-1" class="tab-content active" role="tabpanel" aria-labelledby="tab-1">
        <div class="image-container">
          <img
            src="/assets/img/private-loesungen/pv-privat-vorgehen-planung.png"
            alt="Detaillierter technischer Plan einer Photovoltaikanlage fÃ¼r ein Einfamilienhaus."
            loading="lazy" width="588" height="331">
        </div>
        <div class="text-content">
          <h3 class="step-title">Beratung & Planung</h3>
          <p class="step-description">Wir analysieren Bedarf, Standort & Verschattung (auf Wunsch mit Drohne) und entwickeln ein wirtschaftliches, maÃŸgeschneidertes Konzept.</p>
          <ul class="features-list">
            <li class="feature-item"><i class="fas fa-chart-pie"></i><div><h4>Bedarfsanalyse</h4><p>Passende AnlagengrÃ¶ÃŸe und Lastprofil.</p></div></li>
            <li class="feature-item"><i class="fas fa-map-marked-alt"></i><div><h4>Potenzial-Check</h4><p>Ausrichtung, Statik, Verschattung.</p></div></li>
            <li class="feature-item"><i class="fas fa-file-invoice-dollar"></i><div><h4>Transparentes Angebot</h4><p>Klare Positionen ohne versteckte Kosten.</p></div></li>
          </ul>
        </div>
      </div>

      <!-- Step 2 -->
      <div id="tab-2" class="tab-content" role="tabpanel" aria-labelledby="tab-2">
        <div class="image-container">
          <img
            src="/assets/img/private-loesungen/pv-privat-vorgehen-abwicklung.png"
            alt="Projektleiter bespricht die Auftragsabwicklung einer Photovoltaikanlage mit dem Kunden."
            loading="lazy" width="588" height="331">
        </div>
        <div class="text-content">
          <h3 class="step-title">Auftrag & Abwicklung</h3>
          <p class="step-description">Fester Projektleiter, Termin- und Materialkoordination sowie komplette FormalitÃ¤ten mit VNB und BehÃ¶rden.</p>
          <ul class="features-list">
            <li class="feature-item"><i class="fas fa-user-tie"></i><div><h4>Projektleitung</h4><p>Ein Ansprechpartner, klare Timeline.</p></div></li>
            <li class="feature-item"><i class="fas fa-gavel"></i><div><h4>BÃ¼rokratie</h4><p>VNB-Anmeldung & Genehmigungen.</p></div></li>
            <li class="feature-item"><i class="fas fa-truck"></i><div><h4>Logistik</h4><p>PÃ¼nktliche Lieferung, saubere AblÃ¤ufe.</p></div></li>
          </ul>
        </div>
      </div>

      <!-- Step 3 -->
      <div id="tab-3" class="tab-content" role="tabpanel" aria-labelledby="tab-3">
        <div class="image-container">
          <img
            src="/assets/img/private-loesungen/pv-privat-vorgehen-installation.jpeg"
            alt="Fachgerechte Installation von Solarmodulen auf einem Ziegeldach."
            loading="lazy" width="588" height="392">
        </div>
        <div class="text-content">
          <h3 class="step-title">Installation</h3>
          <p class="step-description">Zertifizierte Montage, normgerechte DC/AC-Installation, Inbetriebnahme und Einweisung inkl. Monitoring-App.</p>
          <ul class="features-list">
            <li class="feature-item"><i class="fas fa-hard-hat"></i><div><h4>Fachmontage</h4><p>DIN/VDE-konform, sauber & sicher.</p></div></li>
            <li class="feature-item"><i class="fas fa-bolt"></i><div><h4>Elektro</h4><p>Erfahrene Elektriker, geprÃ¼fte QualitÃ¤t.</p></div></li>
            <li class="feature-item"><i class="fas fa-mobile-alt"></i><div><h4>Einweisung</h4><p>Funktionen & Monitoring verstÃ¤ndlich erklÃ¤rt.</p></div></li>
          </ul>
        </div>
      </div>

      <!-- Step 4 -->
      <div id="tab-4" class="tab-content" role="tabpanel" aria-labelledby="tab-4">
        <div class="image-container">
          <img
            src="/assets/img/private-loesungen/pv-privat-vorgehen-betrieb.jpeg"
            alt="Fertige Photovoltaikanlage im Betrieb bei Sonnenuntergang."
            loading="lazy" width="588" height="392">
        </div>
        <div class="text-content">
          <h3 class="step-title">Service & Betrieb</h3>
          <p class="step-description">O&M mit Monitoring (Alarme, PR), jÃ¤hrlicher Sicht-/E-PrÃ¼fung, Reaktionszeit &lt;48 h sowie Garantie-/Versicherungsabwicklung.</p>
          <ul class="features-list">
            <li class="feature-item"><i class="fas fa-award"></i><div><h4>Doku</h4><p>Unterlagen & Garantien sauber aufbereitet.</p></div></li>
            <li class="feature-item"><i class="fas fa-life-ring"></i><div><h4>Support</h4><p>Langfristige Begleitung im Betrieb.</p></div></li>
            <li class="feature-item"><i class="fas fa-chart-line"></i><div><h4>Wartung</h4><p>Professionelle Pakete & Monitoring.</p></div></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>



<section id="alab-hero" class="komp-section">
  <div class="alab-container">
    <header class="section-header">
      <span class="eyebrow">HOCHWERTIGE KOMPONENTEN</span>
      <h2>Unter der Motorhaube Ihrer PV-Anlage</h2>
      <p class="subtitle">Entdecken Sie die QualitÃ¤t jeder einzelnen Komponente durch interaktive Exploration</p>
    </header>

    <div class="hotspot-container">
      <!-- linke Stats -->
      <aside class="side-panel left-panel">
        <div class="stat-card">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div class="stat-value">10&nbsp;kWp</div>
          <div class="stat-label">Systemleistung</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div class="stat-value">25&nbsp;Jahre</div>
          <div class="stat-label">Garantie</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div class="stat-value">8â€“10</div>
          <div class="stat-label">Jahre Amortisation</div>
        </div>
      </aside>

      <!-- Hero-Bild + Hotspots -->
      <div class="hero-image-wrapper">
        <img class="hero-image" alt="PV-Anlage Explosionsansicht"
             src="/assets/img/private-loesungen/pv-privat-haus_aufgeteilt.avif">

        <button class="hotspot" data-component="solar-module" style="top:19.02%;left:46.94%;" aria-label="Solarmodule">
          <span class="hotspot-pulse"></span>
          <span class="hotspot-inner"><span class="hotspot-icon">1</span></span>
          <span class="hotspot-label">Solarmodule</span>
        </button>

        <button class="hotspot" data-component="mounting" style="top:31.23%;left:44.11%;" aria-label="Unterkonstruktion">
          <span class="hotspot-pulse"></span>
          <span class="hotspot-inner"><span class="hotspot-icon">2</span></span>
          <span class="hotspot-label">Unterkonstruktion</span>
        </button>

        <button class="hotspot" data-component="monitoring" style="top:42.07%;left:42.84%;" aria-label="Ziegelersatzplatten">
          <span class="hotspot-pulse"></span>
          <span class="hotspot-inner"><span class="hotspot-icon">3</span></span>
          <span class="hotspot-label">Ziegelersatzplatten</span>
        </button>

        <button class="hotspot" data-component="inverter" style="top:71.32%;left:17.56%;" aria-label="Wechselrichter">
          <span class="hotspot-pulse"></span>
          <span class="hotspot-inner"><span class="hotspot-icon">4</span></span>
          <span class="hotspot-label">Wechselrichter</span>
        </button>

        <button class="hotspot" data-component="battery" style="top:81.64%;left:54.05%;" aria-label="Batteriespeicher">
          <span class="hotspot-pulse"></span>
          <span class="hotspot-inner"><span class="hotspot-icon">5</span></span>
          <span class="hotspot-label">Batteriespeicher</span>
        </button>
      </div>

      <!-- rechte Features -->
      <aside class="side-panel right-panel">
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            </svg>
          </div>
          <h4>COâ‚‚-Einsparung</h4>
          <p>Bis zu 5&nbsp;t COâ‚‚ pro Jahr</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
          </div>
          <h4>Smart Control</h4>
          <p>App-Steuerung &amp; Monitoring</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h4>Wartung</h4>
          <p>Minimaler Aufwand</p>
        </div>
      </aside>

      
      <article class="info-card" id="solar-module-card" role="dialog" aria-modal="false" aria-labelledby="solar-module-title">
        <div class="info-card-content">
          <div class="info-card-image">
            <img src="/assets/img/private-loesungen/pv-privat-module.png" alt="Hochleistungs-Solarmodule">
          </div>
          <h3 id="solar-module-title">Solarmodule</h3>
          <p>Hocheffiziente Module wandeln Sonnenlicht in Strom um. Doppelglas-Varianten bieten besonders lange Lebensdauer und edle Optik.</p>
          <ul class="specs-list">
            <li><span class="spec-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </span>400â€“490&nbsp;Wp Leistung</li>
            <li><span class="spec-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </span>Hagelschutz-zertifiziert</li>
            <li><span class="spec-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </span>Bifaziale Option</li>
          </ul>
        </div>
      </article>

      <article class="info-card" id="inverter-card" role="dialog" aria-modal="false" aria-labelledby="inverter-title">
        <div class="info-card-content">
          <div class="info-card-image">
            <img src="/assets/img/private-loesungen/pv-privat-wechselrichter.avif" alt="Hybrid-Wechselrichter">
          </div>
          <h3 id="inverter-title">Wechselrichter</h3>
          <p>Wandelt Gleichstrom (DC) vom Dach in Wechselstrom (AC) fÃ¼r Haus &amp; Netz. Als Hybrid-Version direkt speicherfÃ¤hig.</p>
          <ul class="specs-list">
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></span>AC-Netzeinspeisung</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>App-Steuerung</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>FlÃ¼sterleiser Betrieb</li>
          </ul>
        </div>
      </article>

      <article class="info-card" id="battery-card" role="dialog" aria-modal="false" aria-labelledby="battery-title">
        <div class="info-card-content">
          <div class="info-card-image">
            <img src="/assets/img/private-loesungen/pv-privat-batteriespeicher.jpg" alt="Batteriespeicher">
          </div>
          <h3 id="battery-title">Batteriespeicher</h3>
          <p>Speichert Ãœberschuss fÃ¼r die Abendstunden. So steigt der Eigenverbrauch und die UnabhÃ¤ngigkeit vom Strompreis.</p>
          <ul class="specs-list">
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg></span>Mehr Autarkie</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.2 4.2l4.2 4.2m5.6 5.6l4.2 4.2M1 12h6m6 0h6M4.2 19.8l4.2-4.2m5.6-5.6l4.2-4.2"/></svg></span>95 % Entladetiefe</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>NotstromfÃ¤hig</li>
          </ul>
        </div>
      </article>

      <article class="info-card" id="mounting-card" role="dialog" aria-modal="false" aria-labelledby="mounting-title">
        <div class="info-card-content">
          <div class="info-card-image">
            <img src="/assets/img/private-loesungen/pv-privat-unterkonstruktion.jpg" alt="Unterkonstruktion">
          </div>
          <h3 id="mounting-title">Unterkonstruktion</h3>
          <p>Aerodynamisch optimiertes Montagesystem aus eloxiertem Aluminium. TÃœV-geprÃ¼ft fÃ¼r alle Dacharten und Windlasten bis 200 km/h.</p>
          <ul class="specs-list">
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></span>Statisch geprÃ¼ft</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></span>KorrosionsbestÃ¤ndig</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>FÃ¼r alle Dachtypen</li>
          </ul>
        </div>
      </article>

      <article class="info-card" id="monitoring-card" role="dialog" aria-modal="false" aria-labelledby="monitoring-title">
        <div class="info-card-content">
          <div class="info-card-image">
            <img src="/assets/img/private-loesungen/pv-privat-metalldachplatten.jpg" alt="Ziegelersatzplatte">
          </div>
          <h3 id="monitoring-title">Ziegelersatzplatte</h3>
          <p>Ersetzt einzelne Dachziegel und schafft eine regensichere, tragfÃ¤hige Anbindung fÃ¼r die Haken â€“ ohne das Dach zu schwÃ¤chen.</p>
          <ul class="specs-list">
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>Saubere, dichte LÃ¶sung</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>Belastbar &amp; langlebig</li>
            <li><span class="spec-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span>Einfacher Austausch</li>
          </ul>
        </div>
      </article>
    </div>

    <!-- Mobile Liste -->
    <div class="mobile-component-list">
      <div class="component-accordion">
        <button class="accordion-item" data-component="solar-module">
          <span class="accordion-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg>
          </span>
          <span class="accordion-title">Hochleistungs-Solarmodule</span>
          <span class="accordion-arrow">â€º</span>
        </button>
        <button class="accordion-item" data-component="inverter">
          <span class="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
          <span class="accordion-title">Hybrid-Wechselrichter</span><span class="accordion-arrow">â€º</span>
        </button>
        <button class="accordion-item" data-component="battery">
          <span class="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg></span>
          <span class="accordion-title">Batteriespeicher</span><span class="accordion-arrow">â€º</span>
        </button>
        <button class="accordion-item" data-component="mounting">
          <span class="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></svg></span>
          <span class="accordion-title">Unterkonstruktion</span><span class="accordion-arrow">â€º</span>
        </button>
        <button class="accordion-item" data-component="monitoring">
          <span class="accordion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
          <span class="accordion-title">Ziegelersatzplatte</span><span class="accordion-arrow">â€º</span>
        </button>
      </div>
    </div>
  </div>
</section>


<section id="alab-solarcalc" class="solar-calculator-section" aria-label="Solarrechner">
  <div class="calculator-container">
    <div class="calculator-card">
      <header class="calculator-header">
        <div>
          <h2 class="calculator-title">Solarrechner</h2>
          <p class="calculator-subtitle">
            In 60 Sekunden zu Ihrer PV-Kalkulation â€“ mit Erzeugung, Hausverbrauch, Netzbezug,
            Speicherwirkung und Amortisation. Kostenlos &amp; unverbindlich.
          </p>
          <small class="input-hint" aria-live="polite">Keine Weitergabe Ihrer Daten.</small>
        </div>
      </header>

      <div class="calculator-content">
        <!-- Inputs -->
        <div class="calculator-inputs" id="calc-inputs">
          <div class="input-group">
            <label class="input-label" for="stromkosten">
              <span class="label-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              </span>
              Monatliche Stromkosten
            </label>
            <div class="input-wrapper">
              <input type="number" id="stromkosten" class="calculator-input" value="110" min="0" step="1" inputmode="decimal" autocomplete="on" />
              <span class="input-unit" aria-hidden="true">â‚¬</span>
            </div>
            <small class="input-hint">Wird mit dem Strompreis in Jahresverbrauch umgerechnet.</small>
          </div>

          <div class="input-group">
            <label class="input-label" for="strompreis">
              <span class="label-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </span>
              Strompreis pro kWh
            </label>
            <div class="input-wrapper">
              <input type="number" id="strompreis" class="calculator-input" value="0.35" min="0.10" max="1" step="0.01" inputmode="decimal" autocomplete="on" />
              <span class="input-unit" aria-hidden="true">â‚¬</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label" for="dachflaeche">
              <span class="label-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              </span>
              Nutzbare DachflÃ¤che
            </label>
            <div class="input-wrapper">
              <input type="number" id="dachflaeche" class="calculator-input" value="40" min="10" step="1" inputmode="decimal" autocomplete="on" />
              <span class="input-unit" aria-hidden="true">mÂ²</span>
            </div>
            <small class="input-hint">Automatische Begrenzung: min(200, FlÃ¤che/2 mÂ² je Modul).</small>
          </div>

          <div class="input-group">
            <label class="input-label" for="pvModule">
              <span class="label-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </span>
              PV-Module
            </label>
            <div class="module-controls">
              <button type="button" class="module-btn" id="btnMinus" aria-label="Ein Modul weniger" aria-controls="pvModule">âˆ’</button>
              <input type="number" id="pvModule" class="module-input" value="12" min="1" max="200" inputmode="numeric" />
              <button type="button" class="module-btn" id="btnPlus" aria-label="Ein Modul mehr" aria-controls="pvModule">+</button>
              <div class="speicher-toggle">
                <label class="toggle-label" for="speicher">
                  <input type="checkbox" id="speicher" class="toggle-input" />
                  <span>Speicher</span>
                </label>
              </div>
            </div>
            <small class="input-hint">Automatische Begrenzung: min(200, FlÃ¤che/2 mÂ² je Modul).</small>
          </div>

          <section class="calculation-results" id="calc-results" aria-live="polite">
            <h3 class="results-title">Dein durchschnittliches Solarpotenzial:</h3>
            <div class="result-item"><span class="result-label">Stromkosten-Ersparnis</span><span class="result-value" id="ersparnis">â€“</span></div>
            <div class="result-item"><span class="result-label">EinspeisevergÃ¼tung</span><span class="result-value" id="einspeisung">â€“</span></div>
            <div class="result-item"><span class="result-label">Amortisationsdauer</span><span class="result-value" id="amort">â€“</span></div>
            <div class="total-result">
              <div><strong>Gewinn Ã¼ber 30 Jahre</strong></div>
              <div class="total-value" id="gesamtgewinn">â€“</div>
              <div class="monthly-potential"><span>Monatliches Gewinnpotenzial</span><span id="monatlichGewinn">â€“</span></div>
            </div>
            <button class="cta-button" id="cta-open">Weiter zur Anfrage</button>
          </section>
        </div>

        <!-- Visualization -->
        <div class="calculator-visualization" id="calc-vis">
          <h3 class="visualization-title">JÃ¤hrliche Durchschnittswerte fÃ¼r Energieproduktion und Verbrauch</h3>
          <div class="energy-diagram-new">
            <img class="diagram-image" src="/assets/img/private-loesungen/pv-privat-solarrechner.png" alt="Solar Energy Flow Diagram" width="500" height="400" decoding="async" loading="lazy" fetchpriority="low" />
            <div class="value-overlay top-value"><div class="value-container"><span class="value-label">ERZEUGUNG</span><span class="value-number" id="erzeugung">â€“ kWh</span></div></div>
            <div class="value-overlay right-top-value"><div class="value-container"><span class="value-label">COâ‚‚-ERSPARNIS</span><span class="value-number" id="co2ersparnis">â€“ kg</span></div></div>
            <div class="value-overlay left-bottom-value"><div class="value-container"><span class="value-label">NETZBEZUG</span><span class="value-number" id="netzbezug">â€“ kWh</span></div></div>
            <div class="value-overlay left-bottom-value-2"><div class="value-container"><span class="value-label">SPEICHERNUTZUNG</span><span class="value-number" id="speichernutzung">â€“ kWh</span></div></div>
            <div class="value-overlay bottom-center-value"><div class="value-container"><span class="value-label">HAUSVERBRAUCH</span><span class="value-number" id="hausverbrauch">â€“ kWh</span></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact Lightbox (direkt nach der Section platzieren) -->
<div id="contactLightbox" class="lightbox-backdrop" role="dialog" aria-modal="true" aria-labelledby="lightboxTitle">
  <div class="lightbox-container">
    <div class="lightbox-header">
      <div class="lightbox-title-wrapper">
        <svg class="lightbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <h2 id="lightboxTitle">Kostenloses PV-Angebot anfordern</h2>
      </div>
      <button class="lightbox-close" id="lightbox-close" aria-label="SchlieÃŸen" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="lightbox-body">
      <p class="lightbox-description">FÃ¼llen Sie das Formular aus und wir erstellen Ihnen ein individuelles Angebot fÃ¼r Ihre PV-Anlage. Kostenlos und unverbindlich.</p>
      <form id="leadForm" class="lightbox-form" autocomplete="on">
        <div class="form-row">
          <div class="form-field">
            <label for="vorname">Vorname *</label>
            <input type="text" id="vorname" name="vorname" required placeholder="Max" autocomplete="given-name" />
          </div>
          <div class="form-field">
            <label for="nachname">Nachname *</label>
            <input type="text" id="nachname" name="nachname" required placeholder="Mustermann" autocomplete="family-name" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="email">E-Mail *</label>
            <input type="email" id="email" name="email" required placeholder="max@beispiel.de" autocomplete="email" />
          </div>
          <div class="form-field">
            <label for="telefon">Telefon</label>
            <input type="tel" id="telefon" name="telefon" placeholder="+49 123 456789" autocomplete="tel" />
          </div>
        </div>
        <div class="form-field">
          <label for="adresse">Adresse *</label>
          <input type="text" id="adresse" name="adresse" required placeholder="MusterstraÃŸe 1, 12345 Musterstadt" autocomplete="address-line1" />
        </div>
        <div class="form-field">
          <label for="nachricht">Nachricht (optional)</label>
          <textarea id="nachricht" name="nachricht" rows="4" placeholder="Haben Sie spezielle WÃ¼nsche oder Fragen?"></textarea>
        </div>
        <button type="submit" class="lightbox-submit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
          </svg>
          <span class="btn-text">Angebot anfordern</span>
        </button>
      </form>
    </div>
  </div>
</div>



<section id="ref-gallery-private" class="section reveal" aria-labelledby="ref-title-private">
  <div class="container">
    <h2 id="ref-title-private" class="section-title">Referenzen</h2>
    <p class="section-subtitle center">
      Ein kleiner Auszug realisierter Privat-PV-Anlagen â€“ sauber geplant, montiert und dokumentiert.
    </p>

    <div class="rg" role="region" aria-roledescription="carousel" aria-label="Referenzgalerie (Privat)">
      <button class="rg__nav rg__nav--prev" type="button" aria-label="ZurÃ¼ck">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="rg__viewport" tabindex="0">
        <ul class="rg__track">
          
          
          
          

          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage1_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage1_P.avif"
                    alt="Private Photovoltaik-Referenz 1"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage2_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage2_P.avif"
                    alt="Private Photovoltaik-Referenz 2"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage3_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage3_P.avif"
                    alt="Private Photovoltaik-Referenz 3"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage4_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage4_P.avif"
                    alt="Private Photovoltaik-Referenz 4"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage5_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage5_P.avif"
                    alt="Private Photovoltaik-Referenz 5"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage6_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage6_P.avif"
                    alt="Private Photovoltaik-Referenz 6"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage12_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage12_P.avif"
                    alt="Private Photovoltaik-Referenz 12"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage7_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage7_P.avif"
                    alt="Private Photovoltaik-Referenz 7"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage8_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage8_P.avif"
                    alt="Private Photovoltaik-Referenz 8"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage9_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage9_P.avif"
                    alt="Private Photovoltaik-Referenz 9"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage10_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage10_P.avif"
                    alt="Private Photovoltaik-Referenz 10"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-privat/anlage11_P.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-privat/anlage11_P.avif"
                    alt="Private Photovoltaik-Referenz 11"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
        </ul>
      </div>

      <button class="rg__nav rg__nav--next" type="button" aria-label="Weiter">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="rg__dots" aria-label="Slides"></div>
    </div>
  </div>
</section>



<div id="privat-vorteile">
<section class="intro-section" id="intro">
  <div class="container">
    <div class="intro-content">
      <div class="section-badge">Zukunft beginnt heute</div>
      <h2 class="section-title">
        Photovoltaik fÃ¼r Ihr Zuhause â€“
        <span class="highlight">Eine lohnenswerte Investition</span>
      </h2>
      <p class="section-description">
        Mit einer Photovoltaikanlage senken Sie Ihre Stromkosten und machen sich unabhÃ¤ngig von steigenden Energiepreisen.
        Durch staatliche <span style="color:#000;font-weight:600;">FÃ¶rderungen und Steuervorteile</span> wird die Anschaffung zusÃ¤tzlich attraktiv.
        Ã–kologisch gesehen leisten Sie einen wichtigen Beitrag zum Klimaschutz, indem Sie den
        <span class="eco-badge">COâ‚‚-AusstoÃŸ reduzieren</span> und auf saubere Sonnenenergie setzen.
        Langfristig steigern Sie den Wert Ihrer Immobilie und profitieren von einer nachhaltigen, grÃ¼nen Energiequelle.
      </p>

      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-value">25</div>
          <div class="stat-label">Jahre Garantie</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">80%</div>
          <div class="stat-label">Kostenersparnis</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">100%</div>
          <div class="stat-label">GrÃ¼ne Energie</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="benefit-section" id="benefit-1">
  <div class="container benefit-container">
    <div class="benefit-visual">
      <div class="icon-wrapper">
        <div class="icon-background"></div>
        <svg class="benefit-icon" viewBox="0 0 240 240" aria-hidden="true">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#E5C44D"/><stop offset="100%" style="stop-color:#F3D663"/>
            </linearGradient>
          </defs>
          <g class="icon-lightning">
            <path d="M130 40 L90 120 L110 120 L100 200 L150 100 L130 100 Z"
                  fill="none" stroke="url(#gradient1)" stroke-width="3"
                  stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="120" cy="120" r="80" fill="none" stroke="url(#gradient1)" stroke-width="2" opacity="0.3"/>
            <circle cx="120" cy="120" r="95" fill="none" stroke="url(#gradient1)" stroke-width="1" opacity="0.2"/>
          </g>
        </svg>
        <div class="floating-particles">
          <div class="particle"></div><div class="particle"></div><div class="particle"></div>
        </div>
      </div>
    </div>

    <div class="benefit-content">
      <div class="section-label">Vorteil 01</div>
      <h2 class="benefit-title">Energieeinsparung &<br><span class="text-gradient">UnabhÃ¤ngigkeit</span></h2>
      <p class="benefit-description">
        Mit einer hochwertigen Photovoltaikanlage senken Sie Ihre Stromkosten um bis zu
        <span class="highlight-stat">80%</span> und machen sich langfristig unabhÃ¤ngig von steigenden Energiepreisen â€“
        fÃ¼r <span class="feature-tag">finanzielle Planungssicherheit</span> und <span class="feature-tag">grÃ¼nes Gewissen</span>.
      </p>
      <div class="benefit-features">
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>Sofortige Kostensenkung</span></div>
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>UnabhÃ¤ngigkeit vom Stromnetz</span></div>
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>Langfristige Wertsteigerung</span></div>
      </div>
    </div>
  </div>
</section>

<section class="benefit-section reverse" id="benefit-2">
  <div class="container benefit-container">
    <div class="benefit-visual">
      <div class="icon-wrapper">
        <div class="icon-background"></div>
        <svg class="benefit-icon" viewBox="0 0 240 240" aria-hidden="true">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#E5C44D"/><stop offset="100%" style="stop-color:#F3D663"/>
            </linearGradient>
          </defs>
          <g class="icon-modules">
            <rect x="60" y="60" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1)" stroke-width="3"/>
            <rect x="140" y="60" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1)" stroke-width="3"/>
            <rect x="60" y="140" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1)" stroke-width="3"/>
            <rect x="140" y="140" width="40" height="40" rx="5" fill="none" stroke="url(#gradient1)" stroke-width="3"/>
            <path d="M100 80 L140 80 M80 100 L80 140 M160 100 L160 140 M100 160 L140 160"
                  stroke="url(#gradient1)" stroke-width="2" opacity="0.6"/>
            <circle cx="120" cy="120" r="5" fill="url(#gradient1)"/>
          </g>
        </svg>
        <div class="floating-particles">
          <div class="particle"></div><div class="particle"></div><div class="particle"></div>
        </div>
      </div>
    </div>

    <div class="benefit-content">
      <div class="section-label">Vorteil 02</div>
      <h2 class="benefit-title">Zukunftssichere<br><span class="text-gradient">Erweiterbarkeit</span></h2>
      <p class="benefit-description">
        Starten Sie jetzt mit Ihrer Basis-PV-Anlage und erweitern Sie das System spÃ¤ter mÃ¼helos um
        <span class="feature-tag">Batteriespeicher</span> oder eine <span class="feature-tag">Wallbox fÃ¼r Ihr E-Fahrzeug</span> â€“
        damit Ihre Eigenverbrauchsquote und Rendite weiter steigen.
      </p>
      <div class="benefit-features">
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>Modulares System</span></div>
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>Flexible Erweiterung</span></div>
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>Zukunftssichere Investition</span></div>
      </div>
    </div>
  </div>
</section>

<section class="benefit-section" id="benefit-3">
  <div class="container benefit-container">
    <div class="benefit-visual">
      <div class="icon-wrapper">
        <div class="icon-background"></div>
        <svg class="benefit-icon" viewBox="0 0 240 240" aria-hidden="true">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#E5C44D"/><stop offset="100%" style="stop-color:#F3D663"/>
            </linearGradient>
          </defs>
          <g class="icon-monitoring">
            <rect x="70" y="40" width="100" height="160" rx="10" fill="none" stroke="url(#gradient1)" stroke-width="3"/>
            <line x1="70" y1="170" x2="170" y2="170" stroke="url(#gradient1)" stroke-width="2"/>
            <circle cx="120" cy="185" r="8" fill="none" stroke="url(#gradient1)" stroke-width="2"/>
            <polyline points="90,130 105,110 125,140 140,100 155,120"
                      fill="none" stroke="url(#gradient1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="90" cy="130" r="4" fill="url(#gradient1)"/>
            <circle cx="105" cy="110" r="4" fill="url(#gradient1)"/>
            <circle cx="125" cy="140" r="4" fill="url(#gradient1)"/>
            <circle cx="140" cy="100" r="4" fill="url(#gradient1)"/>
            <circle cx="155" cy="120" r="4" fill="url(#gradient1)"/>
          </g>
        </svg>
        <div class="floating-particles">
          <div class="particle"></div><div class="particle"></div><div class="particle"></div>
        </div>
      </div>
    </div>

    <div class="benefit-content">
      <div class="section-label">Vorteil 03</div>
      <h2 class="benefit-title">Smartes<br><span class="text-gradient">Monitoring</span></h2>
      <p class="benefit-description">
        Behalten Sie Ertrag und Performance Ihrer Anlage jederzeit im <span class="text-accent">Blick</span> â€“
        per <span class="feature-tag">Smartphone-App</span>. So sichern Sie maximale VerfÃ¼gbarkeit und
        <span class="feature-tag">sorgfreie Stromproduktion</span>.
      </p>
      <div class="benefit-features">
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>Echtzeit-Ãœberwachung</span></div>
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>Performance-Analysen</span></div>
        <div class="feature-item"><div class="feature-icon">âœ“</div><span>FehlerfrÃ¼herkennung</span></div>
      </div>
    </div>
  </div>
</section>
</div>
`;

