export const montageHtml = String.raw`
<div id="alab-montage">
  <section class="hero-modern" aria-labelledby="hero-title">
    <div class="hero-background" aria-hidden="true">
      <span class="hero-orb hero-orb--gold"></span>
      <span class="hero-orb hero-orb--blue"></span>
      <span class="hero-grid"></span>
    </div>

    <div class="container hero-layout">
      <div class="hero-copy reveal">
        <span class="hero-badge">PV-MONTAGE</span>
        <h1 id="hero-title" class="hero-title-modern">Montage mit Ingenieurstandard, sauberer Ausfuehrung und klarer Dokumentation</h1>
        <p class="hero-description-modern">
          Wir montieren Photovoltaikanlagen so, wie es zu Ihrem aktuellen ALAB-Auftritt passt:
          klar strukturiert, hochwertig, technisch sauber und sichtbar professionell.
        </p>

        <div class="hero-actions">
          <a class="btn-modern btn-primary-modern open-contact" href="/kontakt" data-service="Montage">
            <i class="fas fa-hammer" aria-hidden="true"></i>
            <span>Montage anfragen</span>
          </a>
          <a class="btn-modern btn-secondary-modern" href="#montage-ablauf">
            <span>Ablauf ansehen</span>
            <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <div class="hero-facts">
          <article class="fact-card">
            <span class="fact-label">Fokus</span>
            <strong>Saubere Dach- und Modulmontage</strong>
            <p>Mit klaren Fluchten, sicheren Klemmbereichen und sauber gefuehrten Kabelwegen.</p>
          </article>
          <article class="fact-card">
            <span class="fact-label">Qualitaet</span>
            <strong>Normgerecht und nachvollziehbar</strong>
            <p>Von der Unterkonstruktion bis zur Fotodokumentation bleibt alles pruefbar.</p>
          </article>
          <article class="fact-card">
            <span class="fact-label">Praxis</span>
            <strong>Montage fuer Wohnbau und Gewerbe</strong>
            <p>Passend fuer Einzelprojekte, Nachruestungen, Demontage und Neuaufbau.</p>
          </article>
        </div>
      </div>

      <div class="hero-visual reveal">
        <div class="visual-shell">
          <div class="visual-image">
            <img src="/assets/img/referenzen-montage/anlage1_M.jpg" alt="Montierte Photovoltaikanlage von ALAB Energiesysteme" loading="eager">
          </div>
          <div class="visual-panel">
            <span class="visual-panel__eyebrow">ALAB Montageprozess</span>
            <h2>Planvoll montiert statt nur schnell verschraubt</h2>
            <ul>
              <li>Unterkonstruktion, Modulfeld und Kabelwege aus einem sauberen Ablauf.</li>
              <li>Technische Nachweise und Fotodokumentation direkt mitgedacht.</li>
              <li>Ruhiger, hochwertiger Auftritt passend zum neuen Seitendesign.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-surface reveal" aria-labelledby="overview-title">
    <div class="container">
      <div class="section-header-modern">
        <span class="section-label">LEISTUNGSBILD</span>
        <h2 id="overview-title" class="section-title-modern">Was die Montage-Seite jetzt transportieren soll</h2>
        <p class="section-subtitle-modern">
          Nicht die alte Serviceoptik, sondern dieselbe moderne Handschrift wie auf Ihren neuen Seiten:
          kraftvolle Kontraste, grosszuegige Flaechen, klare Typografie und ein technischer Premium-Eindruck.
        </p>
      </div>

      <div class="service-grid-modern">
        <article class="service-card-modern">
          <div class="service-icon-modern"><i class="fas fa-drafting-compass" aria-hidden="true"></i></div>
          <h3>Unterkonstruktion und Dachschutz</h3>
          <p>Belastbar geplant, sauber gesetzt und auf Dichtigkeit, Lastverteilung und Langlebigkeit ausgelegt.</p>
        </article>

        <article class="service-card-modern">
          <div class="service-icon-modern"><i class="fas fa-network-wired" aria-hidden="true"></i></div>
          <h3>Strukturierte Kabelwege</h3>
          <p>Trennung, Beschriftung und Fuehrung bleiben uebersichtlich, wartbar und technisch nachvollziehbar.</p>
        </article>

        <article class="service-card-modern">
          <div class="service-icon-modern"><i class="fas fa-solar-panel" aria-hidden="true"></i></div>
          <h3>Praezise Modulintegration</h3>
          <p>Saubere Fluchten, klare Reihenbilder und korrekte Klemmbereiche fuer ein hochwertiges Gesamtbild.</p>
        </article>

        <article class="service-card-modern">
          <div class="service-icon-modern"><i class="fas fa-clipboard-check" aria-hidden="true"></i></div>
          <h3>Nachweise und Dokumentation</h3>
          <p>Messwerte, Fotoreport und As-Built-Unterlagen machen die Qualitaet auch nach Projektende sichtbar.</p>
        </article>
      </div>
    </div>
  </section>

  <section id="ref-gallery" class="section references-section reveal" aria-labelledby="ref-title">
    <div class="container">
      <div class="section-header-modern section-header-modern--narrow">
        <span class="section-label">REFERENZEN</span>
        <h2 id="ref-title" class="section-title-modern">Einblicke in die Montagepraxis</h2>
        <p class="section-subtitle-modern">
          Projekte aus dem Bestand, die zeigen, wie die neue Seite wirken soll:
          technisch klar, hochwertig und deutlich naeher an Ihrem aktuellen Markenauftritt.
        </p>
      </div>

      <div class="rg" role="region" aria-roledescription="carousel" aria-label="Referenzgalerie Montage">
        <button class="rg__nav rg__nav--prev" type="button" aria-label="Zurueck">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="rg__viewport" tabindex="0">
          <ul class="rg__track">
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage1_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage1_M.jpg"
                      alt="Montierte Photovoltaikanlage auf Flachdach"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Flachdach mit sauberem Modulraster</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage2_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage2_M.jpg"
                      alt="Photovoltaik-Montage auf Hallendach"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Hallendach mit sauber gefuehrten Reihen</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage3_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage3_M.jpg"
                      alt="Montageprojekt mit grossflaechiger PV-Anlage"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Grossflaechige Anlage in der Umsetzung</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage4_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage4_M.jpg"
                      alt="Montierte PV-Anlage auf Gewerbedach"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Gewerbedach mit ausgerichteter Unterkonstruktion</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage5_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage5_M.jpg"
                      alt="Photovoltaik-Referenz mit Modulfeldern"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Modulfelder mit klarer Fluchtenfuehrung</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage6_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage6_M.jpg"
                      alt="PV-Montage aus der Praxis"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Montagebild aus laufendem Projekt</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage7_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage7_M.jpg"
                      alt="Fertig montierte Solarmodule auf Dachflaeche"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Saubere Montage auf Bestandsdach</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage8_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage8_M.jpg"
                      alt="Dachanlage mit Photovoltaik-Modulen"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">PV-System mit strukturierter Belegung</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage9_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage9_M.jpg"
                      alt="Montage-Referenz einer Solaranlage"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Installiertes Dachsystem mit klarer Linienfuehrung</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage10_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage10_M.jpg"
                      alt="Referenz einer montierten PV-Anlage"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Montage auf gewerblich genutzter Flaeche</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage11_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage11_M.jpg"
                      alt="Photovoltaik-Anlage nach der Montage"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Projekt mit dokumentierter Ausfuehrung</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage12_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage12_M.jpg"
                      alt="PV-Module in sauberer Reihenanordnung"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Reihenbild mit ruhigem technischen Look</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage13_M.jpeg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage13_M.jpeg"
                      alt="Montageprojekt mit Solarmodulen"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Referenzfoto aus der Montagepraxis</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage14_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage14_M.jpg"
                      alt="Dachbelegung mit Photovoltaik-Modulen"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Dachbelegung mit praeziser Ausrichtung</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage15_M.jpeg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage15_M.jpeg"
                      alt="Installierte Photovoltaikanlage im Einsatz"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Fertigstellung mit sauberer Moduloptik</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage16_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage16_M.jpg"
                      alt="PV-Montage auf Dachflaeche"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Montage mit sauber integrierten Modulfeldern</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage17_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage17_M.jpg"
                      alt="Photovoltaikprojekt nach abgeschlossener Montage"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Referenzprojekt mit dokumentierter Qualitaet</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage18_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage18_M.jpg"
                      alt="Montierte Solaranlage auf Gebaeude"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Projektaufnahme aus dem Anlagenbestand</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage19_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage19_M.jpg"
                      alt="PV-Anlage auf Dach mit klarer Modulstruktur"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Technisch sauberes Rasterbild</span>
                </a>
              </li>
            
              <li class="rg__slide">
                <a class="rg__figure" href="/assets/img/referenzen-montage/anlage20_M.jpg">
                  <div class="rg__media">
                    <img
                      src="/assets/img/referenzen-montage/anlage20_M.jpg"
                      alt="Abgeschlossenes Photovoltaik-Montageprojekt"
                      sizes="(max-width:680px) 100vw, (max-width:1100px) 48vw, 32vw"
                      decoding="async"
                      loading="lazy"
                      draggable="false">
                  </div>
                  <span class="rg__cap">Fertige Anlage aus der ALAB Montagepraxis</span>
                </a>
              </li>
            
          </ul>
        </div>

        <button class="rg__nav rg__nav--next" type="button" aria-label="Weiter">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="rg__dots" aria-label="Slides"></div>
      </div>
    </div>
  </section>

  <section id="montage-ablauf" class="section process-section reveal" aria-labelledby="steps-title">
    <div class="container">
      <div class="section-header-modern section-header-modern--narrow">
        <span class="section-label">MONTAGEABLAUF</span>
        <h2 id="steps-title" class="section-title-modern">So fuehren wir Montageprojekte strukturiert aus</h2>
        <p class="section-subtitle-modern">
          Der Ablauf bleibt fachlich derselbe, wirkt aber jetzt visuell aufgeraeumt und deutlich naeher am
          Design Ihrer neueren Seiten.
        </p>
      </div>

      <ol class="steps" itemscope itemtype="https://schema.org/HowTo">
        <li class="step" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
          <div class="step__dot" aria-hidden="true">
            <span class="badge">01</span>
          </div>
          <article class="process-card" itemprop="itemListElement">
            <span class="laserbar" aria-hidden="true"></span>
            <p class="step-kicker">Vorbereitung</p>
            <h3 class="card__title" itemprop="name">Fachgerechter Verbau der Unterkonstruktion</h3>
            <p class="lead">Stabiles Fundament, korrosionsgeschuetzte Tragteile und ein sauber vorbereiteter Dachaufbau.</p>
            <ul class="card__list">
              <li>Ballastierung gemaess Hersteller- und Normvorgaben.</li>
              <li>Ausnivellieren fuer optimale Neigung, Lastverteilung und genaue Verankerung.</li>
              <li>Durchdringungen und sensible Stellen dauerhaft und sauber abgedichtet.</li>
            </ul>
          </article>
        </li>

        <li class="step" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
          <div class="step__dot" aria-hidden="true">
            <span class="badge">02</span>
          </div>
          <article class="process-card" itemprop="itemListElement">
            <span class="laserbar" aria-hidden="true"></span>
            <p class="step-kicker">Verkabelung</p>
            <h3 class="card__title" itemprop="name">Strukturierte Verlegung der DC-Kabel</h3>
            <p class="lead">Uebersichtliche Strangfuehrung mit Zug-, Biege- und Knickschutz fuer spaetere Wartbarkeit.</p>
            <ul class="card__list">
              <li>Normkonforme Wegefuehrung mit klarer Trennung im Kabelkanal.</li>
              <li>Dauerhafte, witterungsfeste Befestigung von Kanaelen, Schellen und Durchfuehrungen.</li>
              <li>Stringlabel, Beschriftung und sauber geplante Kabelreserven nach Plan.</li>
            </ul>
          </article>
        </li>

        <li class="step" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
          <div class="step__dot" aria-hidden="true">
            <span class="badge">03</span>
          </div>
          <article class="process-card" itemprop="itemListElement">
            <span class="laserbar" aria-hidden="true"></span>
            <p class="step-kicker">Modulfeld</p>
            <h3 class="card__title" itemprop="name">Modulintegration und Fixierung</h3>
            <p class="lead">Praezise ausgerichtet, korrekt geklemmt und sichtbar hochwertig im Gesamtbild.</p>
            <ul class="card__list">
              <li>Klemmbereiche und Anzugsdrehmomente nach Vorgabe, Potentialausgleich mitgedacht.</li>
              <li>Exakte Reihen und Fluchten fuer ein ruhiges, professionelles Anlagenbild.</li>
              <li>Optional mit zusaetzlicher Fotodokumentation des finalen Modulrasters.</li>
            </ul>
          </article>
        </li>

        <li class="step" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
          <div class="step__dot" aria-hidden="true">
            <span class="badge">04</span>
          </div>
          <article class="process-card" itemprop="itemListElement">
            <span class="laserbar" aria-hidden="true"></span>
            <p class="step-kicker">Abschluss</p>
            <h3 class="card__title" itemprop="name">Dokumentation und Nachweise</h3>
            <p class="lead">Messbar gute Qualitaet durch Protokolle, Fotoreport und nachvollziehbare Uebergabe.</p>
            <ul class="card__list">
              <li>Messungen fuer Isolations- und Stromwerte sowie sichtbare Qualitaetspruefung.</li>
              <li>Abnahmeprotokoll, Beschilderung und digitale Uebergabe der Montageunterlagen.</li>
              <li>Sauber dokumentierte Basis fuer Betrieb, Wartung und spaetere Erweiterungen.</li>
            </ul>
          </article>
        </li>
      </ol>

      <div class="process-cta">
        <a class="btn-modern btn-secondary-modern open-contact" href="/kontakt" data-service="Montage">
          <span>Mehr zur Montage anfragen</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </section>

  <section class="section section-surface section-surface--soft reveal" aria-labelledby="quality-title">
    <div class="container">
      <div class="section-header-modern">
        <span class="section-label">QUALITAET UND SICHERHEIT</span>
        <h2 id="quality-title" class="section-title-modern">Montage, Nachweise und Zusatzleistungen auf einen Blick</h2>
        <p class="section-subtitle-modern">
          Diese Inhalte waren bereits da, sind jetzt aber im Stil Ihrer neuen Seiten organisiert:
          luftiger, praeziser und deutlich hochwertiger in der Wahrnehmung.
        </p>
      </div>

      <div class="quality-grid">
        <article class="quality-card">
          <h3>Befestigungs- und Drehmomentnachweis</h3>
          <ul class="card__list">
            <li>Stichproben-Auszugsversuche der Dachbefestigung.</li>
            <li>Drehmoment-Protokolle fuer Klemmen und Schienen in digitaler Form.</li>
          </ul>
        </article>

        <article class="quality-card">
          <h3>Dachhautschutz und Notabdichtung</h3>
          <ul class="card__list">
            <li>Abdeckmatten, Kantenschutz und sensible Bearbeitung der Dachflaeche.</li>
            <li>Regen-Notplan mit temporaeren Abdichtungen fuer kritische Bauphasen.</li>
          </ul>
        </article>

        <article class="quality-card">
          <h3>Kabelwege und Kennzeichnung</h3>
          <ul class="card__list">
            <li>Klare Trennung im Kabelkanal und brandlastarme Wege mit Beschilderung.</li>
            <li>Durchdringungen und Schnittstellen sauber dokumentiert.</li>
          </ul>
        </article>

        <article class="quality-card">
          <h3>Kran, Logistik und Sperrbereiche</h3>
          <ul class="card__list">
            <li>Kran- und Hebekonzepte mit klaren Sperrzonen und sauberer Baustellenlogik.</li>
            <li>Anwohnerinformation und strukturierte Materialfluesse fuer ruhige Bauablaeufe.</li>
          </ul>
        </article>

        <article class="quality-card">
          <h3>Demontage und Wiederaufbau</h3>
          <ul class="card__list">
            <li>Rueckbau bestehender Anlagen mit geordneter Erfassung der Komponenten.</li>
            <li>Neuaufbau demontierter oder komplett neuer Systeme am passenden Standort.</li>
          </ul>
        </article>

        <article class="quality-card">
          <h3>As-Built-Dokumentation und Recycling</h3>
          <ul class="card__list">
            <li>Fotoreport, Messwerte und relevante Unterlagen werden digital uebergeben.</li>
            <li>Verpackungsruecknahme und fachgerechte Entsorgung mitgedacht.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="section cta-section-modern reveal" aria-labelledby="cta-title">
    <div class="container">
      <div class="cta-panel">
        <div class="cta-copy">
          <span class="section-label section-label--light">KONTAKT</span>
          <h2 id="cta-title" class="cta-title">Die Montage-Seite ist jetzt auf Ihr aktuelles Design ausgerichtet. Als Naechstes koennen wir Monitoring, Wartung oder Servicepakete angleichen.</h2>
          <p class="cta-text">
            Wenn Sie moechten, ziehen wir die restlichen Service-Unterseiten im selben Stil nach,
            damit der gesamte Bereich visuell konsistent wirkt.
          </p>
        </div>

        <div class="cta-actions">
          <a class="btn-modern btn-primary-modern btn-primary-modern--light open-contact" href="/kontakt" data-service="Montage">
            <i class="fas fa-envelope" aria-hidden="true"></i>
            <span>Kontakt aufnehmen</span>
          </a>
          <a class="btn-modern btn-secondary-modern btn-secondary-modern--light" href="tel:+4982617597176">
            <i class="fas fa-phone" aria-hidden="true"></i>
            <span>08261 7597176</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.alabenergiesysteme.de/" },
        { "@type": "ListItem", "position": 2, "name": "Montage", "item": "https://www.alabenergiesysteme.de/montage/" }
      ]
    },
    {
      "@type": "Service",
      "name": "Photovoltaik-Montage",
      "serviceType": "PV-Montage",
      "provider": { "@type": "Organization", "name": "ALAB Energiesysteme" },
      "areaServed": "DE",
      "url": "https://www.alabenergiesysteme.de/montage/"
    }
  ]
}
</script>
<noscript><style>#alab-montage .reveal{opacity:1!important;transform:none!important}</style></noscript>
`;

