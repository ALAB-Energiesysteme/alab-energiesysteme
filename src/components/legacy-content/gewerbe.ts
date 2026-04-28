export const gewerbeLandingHtml = String.raw`
<div id="gewerbe-landing" aria-label="Gewerbliche Photovoltaik Landing">

<!-- Hero -->
  <section class="hero-section">
    <div class="hero-background">
      <div class="gradient-overlay"></div>
      <div class="pattern-overlay"></div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <!-- Text -->
        <div class="hero-text">
          <h1 class="hero-title">
            Senken Sie Ihre <span class="highlight">Stromkosten um bis zu 70%</span> mit gewerblicher Photovoltaik
          </h1>

          <p class="hero-description">
            Machen Sie Ihr Unternehmen unabhÃ¤ngig von steigenden Energiepreisen.
            Mit einer maÃŸgeschneiderten PV-Anlage produzieren Sie gÃ¼nstigen Solarstrom
            fÃ¼r nur 8â€“12 Cent/kWh â€“ und das Ã¼ber 20+ Jahre garantiert.
          </p>

          <div class="cta-group">
            <button class="btn btn-primary btn-compact" id="openCalculator">
              <span>Kostenlose Beratung anfordern</span>
              <svg class="btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="trust-indicators">
            <div class="trust-item">
              <span class="trust-number">20+</span>
              <span class="trust-label">Projekte realisiert</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <span class="trust-number">5 Jahre</span>
              <span class="trust-label">Leistungsgarantie</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <span class="trust-number">4â€“6 Jahre</span>
              <span class="trust-label">Amortisation</span>
            </div>
          </div>
        </div>

        <!-- Visual -->
        <div class="hero-visual">
          <div class="stats-card floating">
            <div class="stats-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stats-content">
              <div class="stats-value">70%</div>
              <div class="stats-label">Eigenverbrauchsquote mÃ¶glich</div>
            </div>
          </div>

          <div class="savings-card floating-delayed">
            <div class="savings-header"><span>Ihre jÃ¤hrliche Ersparnis berechnen</span></div>
            <div class="savings-amount">
              <span class="currency">â‚¬</span>
              <span class="amount" id="savingsCounter">45.000</span>
            </div>
            <div class="savings-chart" aria-hidden="true">
              <div class="chart-bar" style="height:100%"></div>
              <div class="chart-bar" style="height:85%"></div>
              <div class="chart-bar" style="height:90%"></div>
              <div class="chart-bar" style="height:75%"></div>
              <div class="chart-bar" style="height:95%"></div>
            </div>

          </div>

          <lottie-player
            src="https://lottie.host/8bf07d1f-d5e4-4e3a-ba97-6e0d91e8e85e/fgxYKPmf5H.json"
            background="transparent" speed="0.8"
            style="width:100%;height:auto;max-width:500px" loop autoplay>
          </lottie-player>
        </div>
      </div>
    </div>
  </section>

  <!-- Benefits -->
  <section class="benefits-section" id="benefits">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Ihre Vorteile mit gewerblicher Photovoltaik</h2>
        <p class="section-subtitle">Profitieren Sie von maximaler Wirtschaftlichkeit und Planungssicherheit</p>
      </div>

      <div class="benefits-grid">
        <!-- 1 -->
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="benefit-title">Krisensichere Stromversorgung</h3>
          <p class="benefit-description">SchÃ¼tzen Sie Ihr Unternehmen vor StromausfÃ¤llen und NetzinstabilitÃ¤ten. Mit Batteriespeicher sind Sie autark und produktionsfÃ¤hig.</p>
          <div class="benefit-metric"><span class="metric-value">100%</span><span class="metric-label">Versorgungssicherheit</span></div>
        </div>

        <!-- 2 -->
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="benefit-title">Fixe Stromgestehungskosten</h3>
          <p class="benefit-description">Kalkulieren Sie mit stabilen Energiekosten von 8â€“12 Cent/kWh statt volatilen Marktpreisen von 30+ Cent.</p>
          <div class="benefit-metric"><span class="metric-value">8â€“12</span><span class="metric-label">Cent/kWh Solarstrom</span></div>
        </div>

        <!-- 3 -->
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="benefit-title">Schnelle Amortisation</h3>
          <p class="benefit-description">Durch hohe Eigenverbrauchsquoten und staatliche FÃ¶rderungen amortisiert sich Ihre Anlage bereits nach 4â€“6 Jahren.</p>
          <div class="benefit-metric"><span class="metric-value">4â€“6</span><span class="metric-label">Jahre Payback</span></div>
        </div>

        <!-- 4 -->
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3zM13 13l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="benefit-title">COâ‚‚-Reduktion & Image</h3>
          <p class="benefit-description">Verbessern Sie Ihre COâ‚‚-Bilanz um bis zu 500 Tonnen jÃ¤hrlich und stÃ¤rken Sie Ihr nachhaltiges Unternehmensimage.</p>
          <div class="benefit-metric"><span class="metric-value">500t</span><span class="metric-label">COâ‚‚ Einsparung/Jahr</span></div>
        </div>

        <!-- 5 -->
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="benefit-title">FÃ¶rdermittel & Steuervorteile</h3>
          <p class="benefit-description">Nutzen Sie attraktive KfW-Kredite, regionale FÃ¶rderungen und AbschreibungsmÃ¶glichkeiten fÃ¼r maximale RentabilitÃ¤t.</p>
          <div class="benefit-metric"><span class="metric-value">40%</span><span class="metric-label">InvestitionsfÃ¶rderung</span></div>
        </div>

        <!-- 6 -->
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="benefit-title">Wertsteigerung der Immobilie</h3>
          <p class="benefit-description">ErhÃ¶hen Sie den Wert Ihrer Gewerbeimmobilie nachhaltig durch moderne Energietechnik und ESG-KonformitÃ¤t.</p>
          <div class="benefit-metric"><span class="metric-value">+15%</span><span class="metric-label">Immobilienwert</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div class="modal" id="contactModal" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="modal-backdrop"></div>
    <div class="modal-content" role="document">
      <div class="modal-header">
        <h2 class="modal-title">Kostenlose Beratung anfordern</h2>
        <button class="modal-close" id="closeModal" aria-label="SchlieÃŸen">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <form id="contactForm">
          <div class="form-step" id="step1">
            <p class="form-intro">
              Erhalten Sie innerhalb von 48 Stunden eine kostenlose Wirtschaftlichkeitsberechnung
              fÃ¼r Ihre gewerbliche Photovoltaikanlage.
            </p>

            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Vorname*</label>
                <input type="text" id="firstName" name="firstName" required>
              </div>
              <div class="form-group">
                <label for="lastName">Nachname*</label>
                <input type="text" id="lastName" name="lastName" required>
              </div>
            </div>

            <div class="form-group">
              <label for="company">Unternehmen*</label>
              <input type="text" id="company" name="company" required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">E-Mail*</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group">
                <label for="phone">Telefon*</label>
                <input type="tel" id="phone" name="phone" required>
              </div>
            </div>

            <div class="form-group">
              <label for="consumption">JÃ¤hrlicher Stromverbrauch (kWh)</label>
              <input type="number" id="consumption" name="consumption" placeholder="z. B. 150000">
            </div>

            <div class="form-group">
              <label for="roofArea">VerfÃ¼gbare DachflÃ¤che (mÂ²)</label>
              <input type="number" id="roofArea" name="roofArea" placeholder="z. B. 1500">
            </div>

            <div class="form-group">
              <label for="message">Ihre Nachricht (optional)</label>
              <textarea id="message" name="message" rows="3" placeholder="Gibt es besondere Anforderungen oder Fragen?"></textarea>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="privacy" name="privacy" required>
                <span>Ich akzeptiere die <a href="https://www.alabenergiesysteme.de/datenschutz/" target="_blank" rel="noopener noreferrer">DatenschutzerklÃ¤rung</a>
                  und stimme der Verarbeitung meiner Daten zu.*</span>
              </label>
            </div>

            <button type="submit" class="btn btn-submit">
              <span>Kostenlose Beratung anfordern</span>
              <svg class="btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="form-step success-step" id="successStep">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="success-title">Vielen Dank fÃ¼r Ihre Anfrage!</h3>
            <p class="success-message">
              Wir melden uns innerhalb von 48 Stunden mit einer detaillierten Wirtschaftlichkeitsberechnung.
            </p>
            <button type="button" class="btn btn-secondary" id="closeSuccess">Fenster schlieÃŸen</button>
          </div>
        </form>
      </div>
    </div>
  </div>

<!-- Fullscreen Slideshow Section -->
    <section class="fullscreen-slideshow" id="slideshow">
        <!-- Slides Container -->
        <div class="slides-container" id="slidesContainer">
            <!-- Slide 1 -->
            <div class="slide active" data-slide="0">
                <div class="slide-background">
                    <img src="/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach1.avif" 
                         alt="Kostenfaktor Energie â€“ Photovoltaik fÃ¼r Unternehmen"
                         class="slide-image"
                         loading="eager"
                         fetchpriority="high">
                    <div class="slide-overlay"></div>
                </div>
                <div class="slide-content">
                    <div class="container">
                        <div class="content-wrapper">
                            <span class="slide-number">01</span>
                            <h2 class="slide-title">Vom Kostenfaktor zum Wettbewerbsvorteil</h2>
                            <div class="slide-text">
                                <p>
                                Energiepreise sind ein Risiko fÃ¼r Ihre Kalkulation. Die LÃ¶sung liegt auf Ihrem eigenen Dach. Machen Sie sich unabhÃ¤ngig von volatilen MÃ¤rkten: Eine eigene PV-Anlage tauscht unkalkulierbare StrompreiserhÃ¶hungen gegen fixierte, niedrige Gestehungskosten â€“ und das fÃ¼r Jahrzehnte.
                                </p>
                            </div>
                            <div class="slide-badge">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                                <span>Langfristige Planungssicherheit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Slide 2 -->
            <div class="slide" data-slide="1">
                <div class="slide-background">
                    <img data-src="/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach2.avif" 
                         alt="Wie stark lassen sich Strompreise senken"
                         class="slide-image lazy"
                         loading="lazy">
                    <div class="slide-overlay"></div>
                </div>
                <div class="slide-content">
                    <div class="container">
                        <div class="content-wrapper">
                            <span class="slide-number">02</span>
                            <h2 class="slide-title">Die Rechnung ist eindeutig: 10 Cent statt 30 Cent</h2>
                            <div class="slide-text">
                                <p>
                                    Das Einsparpotenzial ist enorm: Je nach Eigenverbrauchsquote kÃ¶nnen Unternehmen ihre Stromkosten um bis zu <strong>80 %</strong> reduzieren. 
                                    Der selbst erzeugte Solarstrom kostet im Schnitt nur ca. <strong>8-12 Cent/kWh</strong> â€“ ein Bruchteil der aktuellen Netzstrompreise.
                                </p>
                                <p>
                                    Zum Vergleich: Gewerbekunden zahlten 2024 im Durchschnitt <strong>30,52 Cent/kWh</strong>. 
                                    Je hÃ¶her der Eigenverbrauch, desto schneller amortisiert sich die Investition.
                                </p>
                            </div>
                            <div class="slide-badge ">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                                </svg>
                                <span>Bis zu 80% Kostenersparnis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Slide 3 -->
            <div class="slide" data-slide="2">
                <div class="slide-background">
                    <img data-src="/assets/img/gewerbliche-loesungen/pv-gewerbe-gewerbedach3.avif" 
                         alt="Ab wann lohnt sich eine PV-Anlage"
                         class="slide-image lazy"
                         loading="lazy">
                    <div class="slide-overlay"></div>
                </div>
                <div class="slide-content">
                    <div class="container">
                        <div class="content-wrapper">
                            <span class="slide-number">03</span>
                            <h2 class="slide-title">Ab wann lohnt sich eine Photovoltaikanlage?</h2>
                            <div class="slide-text">
                                <p>
                                    Eine PV-Anlage ist immer dann wirtschaftlich interessant, wenn ein hoher Eigenverbrauch besteht. 
                                    Vor allem Betriebe mit energieintensiven Prozessen erreichen kurze Amortisationszeiten.
                                </p>
                                <p>
                                    Ab rund <strong>1.000 mÂ²</strong> DachflÃ¤che lassen sich besonders attraktive Anlagen realisieren. 
                                    Doch auch kleinere Unternehmen profitieren â€“ durch Leasing, Contracting oder Direktkauf ohne hohe Anfangsinvestitionen.
                                </p>
                            </div>
                            <div class="slide-badge">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                </svg>
                                <span>Schnelle Amortisation in 4-6 Jahren</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Navigation Controls -->
        <div class="slideshow-controls">
            <!-- Progress Indicators -->
            <div class="progress-indicators">
                <button class="progress-dot active" data-slide="0" aria-label="Zu Slide 1">
                    <span class="progress-fill"></span>
                </button>
                <button class="progress-dot" data-slide="1" aria-label="Zu Slide 2">
                    <span class="progress-fill"></span>
                </button>
                <button class="progress-dot" data-slide="2" aria-label="Zu Slide 3">
                    <span class="progress-fill"></span>
                </button>
            </div>
            
            <!-- Arrow Navigation -->
            <button class="nav-arrow nav-arrow-prev" id="prevSlide" aria-label="Vorheriges Slide">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <button class="nav-arrow nav-arrow-next" id="nextSlide" aria-label="NÃ¤chstes Slide">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </section>
    
    <!-- JavaScript -->

<section id="ref-gallery" class="section reveal" aria-labelledby="ref-title">
  <div class="container">
    <h2 id="ref-title" class="section-title">Referenzen</h2>
    <p class="section-subtitle center">
      Ein kleiner Auszug betreuter Anlagen â€“ sauber installiert, Ã¼berwacht und dokumentiert.
    </p>

    <div class="rg" role="region" aria-roledescription="carousel" aria-label="Referenzgalerie">
      <button class="rg__nav rg__nav--prev" type="button" aria-label="ZurÃ¼ck">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="rg__viewport" tabindex="0">
        <ul class="rg__track">
          
          
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage10_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage10_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 10"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage2_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage2_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 2"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage3_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage3_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 3"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage4_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage4_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 4"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage5_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage5_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 5"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage6_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage6_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 6"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage7_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage7_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 7"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage8_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage8_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 8"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage9_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage9_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 9"
                    decoding="async" loading="lazy" draggable="false">
                </div>
              </a>
            </li>
          
            <li class="rg__slide">
              <a class="rg__figure" href="/assets/img/referenzen-gewerbe/anlage1_G.avif">
                <div class="rg__media">
                  <img
                    src="/assets/img/referenzen-gewerbe/anlage1_G.avif"
                    alt="Gewerbliche Photovoltaik-Referenz 1"
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

<!-- Why ALAB Section -->
    <section class="why-section">
        <div class="container">
            <!-- Section Header -->
            <div class="section-header">
                <h2 class="section-title">
                    Warum <span class="highlight"> Unternehmen</span> auf ALAB Energiesysteme setzen
                </h2>
                <p class="section-subtitle">
                    Ingenieurgetriebene PV-KomplettlÃ¶sungen fÃ¼r Gewerbe und Industrie â€“ von der prÃ¤zisen Planung 
                    bis zur sauberen Inbetriebnahme, normgerecht dokumentiert und wirtschaftlich gedacht.
                </p>
            </div>
            
            <!-- Features Grid -->
            <div class="features-grid">
                <!-- Feature 1: Sicherheit -->
                <article class="feature-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.5 12.5l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title">Sicherheit & NormenkonformitÃ¤t</h3>
                        <p class="feature-description">
                            Wir planen und bauen nach aktuellen VDE-, VOB- und VdS-Vorgaben. Revisionsunterlagen (DWG), 
                            Blitz-/Brandschutz-Konzepte und saubere Dokumentation sorgen fÃ¼r eine reibungslose Abnahme â€“ 
                            auch bei anspruchsvollen GewerbedÃ¤chern.
                        </p>
                        <ul class="feature-list">
                            <li>VDE/VOB/VdS-konform</li>
                            <li>VollstÃ¤ndige Dokumentation</li>
                            <li>Brandschutz-Konzepte</li>
                        </ul>
                    </div>
                </article>
                
                <!-- Feature 2: Vertragssicherheit -->
                <article class="feature-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title">Vertragssicherheit & finanzielle VerlÃ¤sslichkeit</h3>
                        <p class="feature-description">
                            Transparente Angebote, VOB-gerechte Abwicklung und belastbare Projektsteuerung. 
                            FÃ¼r Generalunternehmer, IngenieurbÃ¼ros und Ã¶ffentliche Auftraggeber bieten wir klare 
                            ZustÃ¤ndigkeiten und terminsichere Umsetzung.
                        </p>
                        <ul class="feature-list">
                            <li>Transparente Angebote</li>
                            <li>VOB-gerechte Abwicklung</li>
                            <li>Terminsichere Umsetzung</li>
                        </ul>
                    </div>
                </article>
                
                <!-- Feature 3: Effizienz -->
                <article class="feature-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title">Effizienz & PrÃ¤zision in der Umsetzung</h3>
                        <p class="feature-description">
                            Engineering-QualitÃ¤t vom Layout Ã¼ber Unterkonstruktion und Statik bis zur ZÃ¤hler-/Schutztechnik. 
                            Kurze Bauzeiten, saubere BaustellenfÃ¼hrung, digitale Ãœberwachung â€“ fÃ¼r maximale Performance 
                            und minimale Stillstandszeiten.
                        </p>
                        <ul class="feature-list">
                            <li>Engineering-QualitÃ¤t</li>
                            <li>Kurze Bauzeiten</li>
                            <li>Digitale Ãœberwachung</li>
                        </ul>
                    </div>
                </article>
            </div>
            
            <!-- Value Proposition -->
            <div class="value-proposition">
                <div class="value-content">
                    <h3 class="value-title">KomplettlÃ¶sung aus einer Hand</h3>
                    <p class="value-text">
                        Mit ALAB Energiesysteme erhalten Sie eine wirtschaftliche und zukunftssichere PV-LÃ¶sung zur 
                        nachhaltigen Reduktion Ihrer Energiekosten. Wir begleiten Sie von der <strong>Konzeption Ã¼ber 
                        Installation bis zur Wartung</strong> â€“ alles aus einer Hand.
                    </p>
                    <p class="value-text">
                        Unsere maÃŸgeschneiderten Systeme machen Unternehmen jeder GrÃ¶ÃŸe unabhÃ¤ngiger von Strompreisschwankungen 
                        und steigern zugleich die Energieeffizienz â€“ inklusive Monitoring und transparenten Leistungskennzahlen.
                    </p>
                </div>
            </div>
            
            <!-- CTA Section -->
            <div class="cta-section">
                <div class="cta-content">
                    <h3 class="cta-title">Bereit fÃ¼r Ihr PV-Projekt?</h3>
                    <p class="cta-description">
                        Sprechen wir Ã¼ber Ihr Projekt und finden gemeinsam die optimale LÃ¶sung fÃ¼r Ihr Unternehmen.
                    </p>
                </div>
                <button class="cta-button"id="openWhyContact">
                    <span>Jetzt unverbindlich anfragen</span>
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    </section>
    
    <!-- Contact Modal -->
    <div class="modal"id="whyContactModal">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Kontaktaufnahme</h3>
                <button class="modal-close"id="closeWhyModal">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            
            <div class="modal-body">
                <!-- Contact Form -->
                <form id="whyContactForm" class="contact-form">
                    <div class="form-step active" id="formStep">
                        <div class="form-group">
                            <label for="firma">Firmenname <span class="required">*</span></label>
                            <input type="text" id="firma" name="firma" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="strasse">StraÃŸe <span class="required">*</span></label>
                                <input type="text" id="strasse" name="strasse" required>
                            </div>
                            <div class="form-group small">
                                <label for="hausnr">Nr. <span class="required">*</span></label>
                                <input type="text" id="hausnr" name="hausnr" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="plz">PLZ <span class="required">*</span></label>
                                <input type="text" id="plz" name="plz" maxlength="5" pattern="[0-9]{5}" required>
                            </div>
                            <div class="form-group">
                                <label for="ort">Ort <span class="required">*</span></label>
                                <input type="text" id="ort" name="ort" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="tel">Telefon</label>
                                <input type="tel" id="tel" name="tel">
                            </div>
                            <div class="form-group">
                                <label for="email">E-Mail <span class="required">*</span></label>
                                <input type="email" id="email" name="email" required>
                            </div>
                        </div>
                        
                        <div class="checkbox-group">
                            <input type="checkbox" id="privacyWhy" name="privacy" required>
                            <label for="privacy">
                                Ich habe die <a href="https://www.alabenergiesysteme.de/datenschutz/" target="_blank">DatenschutzerklÃ¤rung</a> 
                                gelesen und bin mit der Verarbeitung meiner Angaben zur Kontaktaufnahme einverstanden. <span class="required">*</span>
                            </label>
                        </div>
                        
                        <button type="submit" class="submit-button">
                            <span>Anfrage absenden</span>
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Success Step -->
                    <div class="form-step" id="successStep">
                        <div class="success-content">
                            <div class="success-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h3>Vielen Dank fÃ¼r Ihre Anfrage!</h3>
                            <p>
                                Wir haben Ihre Anfrage erhalten und melden uns zeitnah mit einer qualifizierten 
                                EinschÃ¤tzung zu Potenzial, Auslegung und Einsparwirkung.
                            </p>
                            <button type="button" class="close-button"id="closeWhySuccess"> Fenster schlieÃŸen</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- JavaScript -->

<!-- Calculator Section -->
    <section class="calculator-section">
        <div class="container">
            <div class="calculator-grid">
                <!-- Left Content -->
                <div class="calculator-content">
                    <!-- Trust Badge -->
                    <div class="trust-badge">
                        <div class="trust-rating">
                            <span class="rating-number">5.0</span>
                            <div class="rating-stars">
                                <svg class="star" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
                        <span class="trust-text">Ãœber 20 zufriedene Unternehmenskunden</span>
                    </div>
                    
                    <!-- Headline -->
                    <h1 class="calculator-title">
                        Ihr <span class="highlight">PV-Wirtschaftlichkeits-Check</span> 
                        in nur 2 Minuten
                    </h1>
                    
                    <p class="calculator-description">
                        Erhalten Sie eine fundierte ErsteinschÃ¤tzung zu Ihrem Solarpotenzial. 
                        Kostenlos, unverbindlich und basierend auf realen Marktdaten.
                    </p>
                    
                    <!-- Benefits List -->
                    <div class="benefits-list">
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="benefit-text">
                                <strong>Individuelle ROI-Berechnung</strong>
                                <span>Stromkosten-Einsparung, Eigenverbrauchsquote & Amortisationszeitraum</span>
                            </div>
                        </div>
                        
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="benefit-text">
                                <strong>Technische Machbarkeitsanalyse</strong>
                                <span>Optimale AnlagengrÃ¶ÃŸe, Speicherdimensionierung & Ladeinfrastruktur</span>
                            </div>
                        </div>
                        
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="benefit-text">
                                <strong>Aktuelle FÃ¶rderÃ¼bersicht</strong>
                                <span>KfW-Programme, regionale ZuschÃ¼sse & steuerliche Vorteile</span>
                            </div>
                        </div>
                        
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="benefit-text">
                                <strong>Management-Summary als PDF</strong>
                                <span>Kompakte Entscheidungsvorlage fÃ¼r Ihre GeschÃ¤ftsfÃ¼hrung</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- CTA Button -->
                    <div class="cta-wrapper">
                        <button class="btn-calculate" id="startCalculation">
                            <span>Wirtschaftlichkeits-Check starten</span>
                            <svg class="btn-arrow" viewBox="0 0 20 20" fill="none">
                                <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        
                        <div class="time-indicator">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                            </svg>
                            <span>Nur 2 Min. Zeitaufwand</span>
                        </div>
                    </div>
                </div>
                
                <!-- Right Visual Card -->
                <div class="results-preview">
                    <div class="preview-badge">
                        <span class="badge-icon">ðŸ“Š</span>
                        <span>Live-Beispielrechnung</span>
                    </div>
                    
                    <!-- Animated Metrics -->
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">JÃ¤hrliche Ersparnis</span>
                                <div class="metric-trend positive">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value">
                                <span class="currency">â‚¬</span>
                                <span class="number" data-target="125800">0</span>
                            </div>
                            <div class="metric-subtext">bei 350.000 kWh Verbrauch</div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">COâ‚‚-Reduktion</span>
                                <div class="metric-trend positive">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value">
                                <span class="number" data-target="580">0</span>
                                <span class="unit">t/Jahr</span>
                            </div>
                            <div class="metric-subtext">COâ‚‚-Einsparung</div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-label">Autarkiegrad</span>
                                <div class="metric-trend">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value">
                                <span class="number" data-target="85">0</span>
                                <span class="unit">%</span>
                            </div>
                            <div class="metric-subtext">UnabhÃ¤ngigkeit vom Netz</div>
                        </div>
                        
                        <div class="metric-card highlight-card">
                            <div class="metric-header">
                                <span class="metric-label">Amortisation</span>
                                <div class="metric-trend">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value">
                                <span class="number" data-target="5.2">0</span>
                                <span class="unit">Jahre</span>
                            </div>
                            <div class="metric-subtext">Return on Investment</div>
                        </div>
                    </div>
                    
                    <!-- Chart Container -->
                    <div class="chart-container">
                        <canvas id="savingsChart"></canvas>
                    </div>
                    
                    <!-- Info Text -->
                    <p class="preview-info">
                        * Beispielwerte basierend auf durchschnittlichen Gewerbeprojekten. 
                        Ihre individuellen Werte erhalten Sie nach dem Quick-Check.
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Calculator Modal -->
    <div class="modal" id="calculatorModal">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">PV-Wirtschaftlichkeits-Check</h2>
                <button class="modal-close" id="closeCalculator">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            
            <div class="modal-body">
                <!-- Progress Bar -->
                <div class="calc-progress-bar">
  <div class="calc-progress-fill" id="progressFill"></div>
</div>
                
                <form id="calculatorForm">
                    <!-- Step 1: Company Data -->
                    <div class="form-step active" id="step1">
                        <h3 class="step-title">Schritt 1: Unternehmensdaten</h3>
                        <p class="step-description">FÃ¼r eine prÃ¤zise Berechnung benÃ¶tigen wir einige Grundinformationen.</p>
                        
                        <div class="form-group">
                            <label for="companyName">Unternehmensname*</label>
                            <input type="text" id="companyName" name="companyName" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="street">StraÃŸe*</label>
                                <input type="text" id="street" name="street" required>
                            </div>
                            <div class="form-group small">
                                <label for="houseNumber">Nr.*</label>
                                <input type="text" id="houseNumber" name="houseNumber" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="zipCode">PLZ*</label>
                                <input type="text" id="zipCode" name="zipCode" maxlength="5" pattern="\d{5}" required>
                            </div>
                            <div class="form-group">
                                <label for="city">Stadt*</label>
                                <input type="text" id="city" name="city" required>
                            </div>
                        </div>
                        
                        <div class="form-navigation">
                            <button type="button" class="btn-next" onclick="nextStep(1)">
                                <span>Weiter</span>
                                <svg viewBox="0 0 20 20" fill="none">
                                    <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Step 2: Energy Data -->
                    <div class="form-step" id="step2">
                        <h3 class="step-title">Schritt 2: Energieverbrauch</h3>
                        <p class="step-description">Diese Angaben helfen uns, Ihr Einsparpotenzial zu berechnen.</p>
                        
                        <div class="form-group">
                            <label for="annualConsumption">JÃ¤hrlicher Stromverbrauch (kWh)*</label>
                            <input type="number" id="annualConsumption" name="annualConsumption" placeholder="z.B. 250000" required>
                            <span class="input-hint">Den Wert finden Sie in Ihrer letzten Jahresabrechnung</span>
                        </div>
                        
                        <div class="form-group">
                            <label for="roofArea">VerfÃ¼gbare DachflÃ¤che (mÂ²)</label>
                            <input type="number" id="roofArea" name="roofArea" placeholder="z.B. 1500">
                            <span class="input-hint">GeschÃ¤tzte nutzbare FlÃ¤che fÃ¼r PV-Module</span>
                        </div>
                        
                        <div class="form-group">
                            <label for="currentPrice">Aktueller Strompreis (Cent/kWh)</label>
                            <input type="number" id="currentPrice" name="currentPrice" placeholder="z.B. 32" step="0.1">
                            <span class="input-hint">Ihr durchschnittlicher Arbeitspreis inkl. Umlagen</span>
                        </div>
                        
                        <div class="form-navigation">
                            <button type="button" class="btn-back" onclick="previousStep(2)">
                                <svg viewBox="0 0 20 20" fill="none">
                                    <path d="M13 10H7m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>ZurÃ¼ck</span>
                            </button>
                            <button type="button" class="btn-next" onclick="nextStep(2)">
                                <span>Weiter</span>
                                <svg viewBox="0 0 20 20" fill="none">
                                    <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Step 3: Contact Data -->
                    <div class="form-step" id="step3">
                        <h3 class="step-title">Schritt 3: Kontaktdaten</h3>
                        <p class="step-description">FÃ¼r die Zusendung Ihrer individuellen Analyse.</p>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="contactPerson">Ansprechpartner*</label>
                                <input type="text" id="contactPerson" name="contactPerson" required>
                            </div>
                            <div class="form-group">
                                <label for="position">Position</label>
                                <input type="text" id="position" name="position" placeholder="z.B. GeschÃ¤ftsfÃ¼hrer">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">E-Mail*</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Telefon</label>
                                <input type="tel" id="phone" name="phone" placeholder="z.B. 0821 123456">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">ZusÃ¤tzliche Informationen</label>
                            <textarea id="message" name="message" rows="3" placeholder="Besondere Anforderungen oder Fragen?"></textarea>
                        </div>
                        
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="privacy" name="privacy" required>
                                <span>Ich akzeptiere die <a href="https://www.alabenergiesysteme.de/datenschutz/" target="_blank" rel="noopener">DatenschutzerklÃ¤rung</a>
und stimme der Kontaktaufnahme zu.*</span>
                            </label>
                        </div>
                        
                        <div class="form-navigation">
                            <button type="button" class="btn-back" onclick="previousStep(3)">
                                <svg viewBox="0 0 20 20" fill="none">
                                    <path d="M13 10H7m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>ZurÃ¼ck</span>
                            </button>
                            <button type="submit" class="btn-submit">
                                <span>Analyse anfordern</span>
                                <svg viewBox="0 0 20 20" fill="none">
                                    <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Success Step -->
                    <div class="form-step" id="successStep">
                        <div class="success-container">
                            <div class="success-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h3 class="success-title">Vielen Dank fÃ¼r Ihre Anfrage!</h3>
                            <p class="success-message">
                                Wir haben Ihre Daten erhalten und erstellen gerade Ihre individuelle 
                                Wirtschaftlichkeitsanalyse. Sie erhalten diese innerhalb von 24 Stunden 
                                per E-Mail zugeschickt.
                            </p>
                            
                            <div class="success-features">
                                <h4>Was Sie erwartet:</h4>
                                <ul>
                                    <li>âœ“ Detaillierte Wirtschaftlichkeitsberechnung</li>
                                    <li>âœ“ Technisches Anlagenkonzept</li>
                                    <li>âœ“ Management-Summary als PDF</li>
                                </ul>
                            </div>
                            
                            <button type="button" class="btn-close-modal" onclick="closeModal()">
                                Fenster schlieÃŸen
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- JavaScript -->

<!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <!-- Section Header -->
            <div class="section-header">
                <h2 class="section-title">
                    HÃ¤ufige Fragen zur <span class="highlight">Photovoltaik</span> fÃ¼r Unternehmen
                </h2>
                <p class="section-subtitle">
                    Antworten auf die wichtigsten Fragen rund um Investition, FÃ¶rderung und Wirtschaftlichkeit.
                </p>
            </div>
            
            <!-- Main Layout: Sidebar + Content -->
            <div class="faq-layout">
                <!-- Left Sidebar: Navigation -->
                <aside class="faq-sidebar">
                    <!-- Category Navigation -->
                    <nav class="category-nav">
                        <h3 class="nav-title">Kategorien</h3>
                        <button class="category-btn active" data-category="all">
                            <span class="category-label">Alle Fragen</span>
                            <span class="category-count">7</span>
                        </button>
                        <button class="category-btn" data-category="kosten">
                            <span class="category-label">Kosten & Investition</span>
                            <span class="category-count">2</span>
                        </button>
                        <button class="category-btn" data-category="wirtschaftlichkeit">
                            <span class="category-label">Wirtschaftlichkeit</span>
                            <span class="category-count">3</span>
                        </button>
                        <button class="category-btn" data-category="steuer">
                            <span class="category-label">FÃ¶rderung & Steuern</span>
                            <span class="category-count">2</span>
                        </button>
                    </nav>
                </aside>
                
                <!-- Right Content: FAQ Items -->
                <div class="faq-content">
            
            <!-- FAQ Accordion -->
            <div class="faq-accordion" id="faqAccordion">
                <!-- FAQ Item 1: Kosten -->
                <article class="faq-item" data-category="kosten" data-keywords="kosten anschaffungskosten investition preis">
                    <button class="faq-question" aria-expanded="false">
                        <span class="question-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span class="question-text">Wie hoch sind die typischen Anschaffungskosten fÃ¼r eine gewerbliche PV-Anlage?</span>
                        <span class="toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <div class="answer-content">
                            <p>Die Gesamtkosten richten sich nach AnlagengrÃ¶ÃŸe, Dachbeschaffenheit und Komponenten. Im Schnitt bewegen sich Investitionen bei <strong>ca. 500â€“1.000&nbsp;â‚¬ pro kWp</strong>. GrÃ¶ÃŸere Anlagen sind pro kWp in der Regel gÃ¼nstiger.</p>
                        </div>
                    </div>
                </article>
                
                <!-- FAQ Item 2: FÃ¶rderungen -->
                <article class="faq-item" data-category="steuer" data-keywords="fÃ¶rderung zuschÃ¼sse kfw contracting">
                    <button class="faq-question" aria-expanded="false">
                        <span class="question-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span class="question-text">Gibt es FÃ¶rderungen oder ZuschÃ¼sse fÃ¼r Unternehmen?</span>
                        <span class="toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <div class="answer-content">
                            <p>Ja. Unternehmen profitieren von <strong>KfW-FÃ¶rderkrediten</strong>, regionalen ZuschÃ¼ssen und steuerlichen AbschreibungsmÃ¶glichkeiten. Auch <strong>Contracting-Modelle</strong> ermÃ¶glichen Investitionen ohne Eigenkapital.</p>
                        </div>
                    </div>
                </article>
                
                <!-- FAQ Item 3: Amortisation -->
                <article class="faq-item" data-category="wirtschaftlichkeit" data-keywords="amortisation dauer rendite roi">
                    <button class="faq-question" aria-expanded="false">
                        <span class="question-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span class="question-text">Wie lange dauert es, bis sich eine PV-Anlage amortisiert?</span>
                        <span class="toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <div class="answer-content">
                            <p>In den meisten FÃ¤llen <strong>5 bis 10 Jahre</strong>. Der Zeitraum hÃ¤ngt vom Strompreis, der Eigenverbrauchsquote und den FÃ¶rderbedingungen ab. Steigende Energiepreise verkÃ¼rzen die Amortisationszeit zusÃ¤tzlich.</p>
                        </div>
                    </div>
                </article>
                
                <!-- FAQ Item 4: Betriebskosten -->
                <article class="faq-item" data-category="kosten" data-keywords="betriebskosten wartung laufende kosten">
                    <button class="faq-question" aria-expanded="false">
                        <span class="question-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span class="question-text">Mit welchen Betriebskosten muss nach der Installation gerechnet werden?</span>
                        <span class="toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <div class="answer-content">
                            <p>Eine PV-Anlage verursacht nur geringe laufende Kosten: <strong>Inspektionen, Versicherung und gelegentliche Reinigung</strong>. Ãœblicherweise unter <strong>2&nbsp;% der Investitionssumme pro Jahr</strong>.</p>
                        </div>
                    </div>
                </article>
                
                <!-- FAQ Item 5: Niedrige Strompreise -->
                <article class="faq-item" data-category="wirtschaftlichkeit" data-keywords="wirtschaftlichkeit strompreis eigenstrom rentabilitÃ¤t">
                    <button class="faq-question" aria-expanded="false">
                        <span class="question-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span class="question-text">Lohnt sich eine PV-Anlage auch bei niedrigen Strompreisen?</span>
                        <span class="toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <div class="answer-content">
                            <p>Ja. Eigenstrom ist meist gÃ¼nstiger als Netzstrom. Zudem schÃ¼tzt eine PV-Anlage vor kÃ¼nftigen PreiserhÃ¶hungen und macht Energiekosten langfristig berechenbarer.</p>
                        </div>
                    </div>
                </article>
                
                <!-- FAQ Item 6: Ãœberschuss verkaufen -->
                <article class="faq-item" data-category="wirtschaftlichkeit" data-keywords="einspeisung Ã¼berschuss verkauf ppa direktvermarktung">
                    <button class="faq-question" aria-expanded="false">
                        <span class="question-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span class="question-text">Kann Ã¼berschÃ¼ssiger Solarstrom verkauft werden?</span>
                        <span class="toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <div class="answer-content">
                            <p>Ja. Nicht genutzter Solarstrom wird ins Ã¶ffentliche Netz eingespeist und vergÃ¼tet. Alternativ kÃ¶nnen Ã¼ber Direktvermarktung oder StromabnahmevertrÃ¤ge (PPA) zusÃ¤tzliche Einnahmen erzielt werden.</p>
                        </div>
                    </div>
                </article>
                
                <!-- FAQ Item 7: Steuerliche Vorteile -->
                <article class="faq-item" data-category="steuer" data-keywords="steuern steuerlich afa abschreibung iab investitionsabzugsbetrag">
                    <button class="faq-question" aria-expanded="false">
                        <span class="question-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span class="question-text">Welche steuerlichen Vorteile bringt eine PV-Anlage fÃ¼r Unternehmen?</span>
                        <span class="toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <div class="answer-content">
                            <p>PV-Anlagen kÃ¶nnen Ã¼ber die <strong>AfA</strong> abgeschrieben werden. Zudem erlaubt der <strong>Investitionsabzugsbetrag (IAB)</strong>, bis zu 50&nbsp;% der Kosten schon vorab steuerlich geltend zu machen. Konkrete Details klÃ¤ren Sie am besten mit Ihrem Steuerberater.</p>
                        </div>
                    </div>
                </article>
            </div>
            </div>
            </div>
            
            <!-- Contact Form Footer -->
            <div class="contact-footer">
                <div class="contact-header">
                    <h3>Noch Fragen? Kontaktieren Sie uns direkt!</h3>
                    <p>Unser Expertenteam berÃ¤t Sie gerne persÃ¶nlich zu Ihrem individuellen PV-Projekt.</p>
                </div>
                <form class="compact-contact-form" id="compactContactForm">
                    <div class="form-row">
                        <input type="text" placeholder="Firmenname *" id="compactFirma" required>
                        <input type="email" placeholder="E-Mail *" id="compactEmail" required>
                        <input type="tel" placeholder="Telefon" id="compactTel">
                    </div>
                    <div class="form-row">
                        <textarea placeholder="Ihre Nachricht (optional)" id="compactMessage" rows="3"></textarea>
                        <button type="submit" class="submit-btn">
                            <span>Nachricht senden</span>
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <label class="checkbox-label">
                        <input type="checkbox" id="compactPrivacy" required>
                        <span>Ich akzeptiere die <a href="https://www.alabenergiesysteme.de/datenschutz/" target="_blank">DatenschutzerklÃ¤rung</a> *</span>
                    </label>
                </form>
                <div class="success-message" id="successMessage">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Vielen Dank! Wir melden uns zeitnah bei Ihnen.</span>
                </div>
            </div>
        </div>
    </section>
    
    <!-- JavaScript -->

</div>
`;

