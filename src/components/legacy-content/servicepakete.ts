export const servicepaketeHtml = String.raw`
<div id="alab-services">
  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>

  <section class="hero-premium" aria-labelledby="hero-title">
    <div class="hero-background" aria-hidden="true">
      <span class="hero-orb hero-orb--gold"></span>
      <span class="hero-orb hero-orb--blue"></span>
      <span class="hero-grid"></span>
    </div>

    <div class="container hero-layout">
      <div class="hero-copy reveal">
        <h1 id="hero-title" class="hero-title">
          Solarservices aus einer Hand fuer Montage, Betrieb, Verfuegbarkeit und dokumentierte Nachweise
        </h1>
        <p class="hero-subtitle">
          ALAB begleitet Photovoltaikanlagen strukturiert ueber den gesamten Lebenszyklus:
          von Montage und Inbetriebnahme ueber Wartung und Monitoring bis zu Pruefungen,
          Leistungsanalysen und geordneten Betreiberprozessen.
        </p>

        <div class="hero-actions">
          <a class="btn btn--primary open-contact" href="/kontakt" data-service="Solarservices Beratung">
            <i class="fas fa-envelope" aria-hidden="true"></i>
            <span>Beratung anfragen</span>
          </a>
          <a class="btn btn--outline-light" href="#service-architektur">
            <span>Leistungsbild ansehen</span>
            <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <div class="hero-pillar-grid">
          <article class="hero-pillar">
            <span class="hero-pillar__label">Service 01</span>
            <strong>Montage &amp; Inbetriebnahme</strong>
            <p>Technisch sauber ausgefuehrt, nachvollziehbar dokumentiert und in klare Prozesse eingebettet.</p>
          </article>
          <article class="hero-pillar">
            <span class="hero-pillar__label">Service 02</span>
            <strong>Laufende Wartung &amp; Monitoring</strong>
            <p>Fuer hohe Verfuegbarkeit, erkennbare Abweichungen und langfristig kontrollierten Anlagenbetrieb.</p>
          </article>
          <article class="hero-pillar">
            <span class="hero-pillar__label">Service 03</span>
            <strong>Pruefungen &amp; Nachweise</strong>
            <p>Mit Thermografie, Leistungscheck und sauberer Dokumentation fuer Betreiber und Versicherer.</p>
          </article>
        </div>
      </div>

      <div class="hero-visual reveal">
        <div class="hero-visual-shell">
          <div class="hero-visual-image">
            <img src="/img/men%C3%BC/servicepakete.jpeg" alt="Solarservice und Anlagenbetreuung von ALAB" loading="eager">
          </div>

          <div class="hero-visual-panel">
            <span class="hero-visual-panel__kicker">ALAB Servicearchitektur</span>
            <h2>Strukturierte Betreuung statt einzelner Servicebausteine</h2>
            <ul>
              <li>Montage, Wartung und Monitoring aus einer klaren technischen Logik.</li>
              <li>Pruefbare Berichte, Messungen und abgestimmte Betreiberablaeufe.</li>
              <li>Schnelle Fehlererkennung mit sauber dokumentierten Handlungswegen.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <main id="main-content" class="services-main">
    <section id="service-architektur" class="section section-surface" aria-labelledby="core-services-title">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">KERNLEISTUNGEN</span>
          <h2 id="core-services-title" class="section-title">Unsere drei zentralen Servicebereiche</h2>
          <p class="section-intro">
            Drei Service-Saeulen, die den laufenden Betrieb Ihrer Solaranlage technisch, organisatorisch und wirtschaftlich absichern.
          </p>
        </div>

        <div class="service-grid">
          <article class="service-card reveal">
            <span class="service-card__accent" aria-hidden="true"></span>
            <div class="service-card__icon"><i class="fas fa-tools" aria-hidden="true"></i></div>
            <p class="service-card__eyebrow">MONTAGE</p>
            <h3>Montage und Inbetriebnahme</h3>
            <p class="service-card__copy">
              Sorgfaeltig vorbereitet, fachgerecht verbaut und mit sauberer Uebergabe in den Betrieb ueberfuehrt.
            </p>
            <ul class="service-card__list">
              <li>Statik- und Layoutpruefung mit sauberer Vermessung.</li>
              <li>Montage von Unterkonstruktion und Modulen nach Herstellervorgaben.</li>
              <li>DC-Verkabelung inkl. String-Plan, Beschriftung und Messprotokoll.</li>
              <li>Uebergabe der AC-Seite und Netzanbindung optional abgestimmt.</li>
              <li>Inbetriebnahme und strukturierte Schulung gemeinsam mit Ihnen.</li>
            </ul>
            <div class="service-card__footer">
              <a class="btn btn--outline-dark" href="/montage/">Zur Montage-Seite</a>
            </div>
          </article>

          <article class="service-card reveal">
            <span class="service-card__accent" aria-hidden="true"></span>
            <div class="service-card__icon"><i class="fas fa-wrench" aria-hidden="true"></i></div>
            <p class="service-card__eyebrow">WARTUNG</p>
            <h3>Wartung fuer Betriebssicherheit und Werterhalt</h3>
            <p class="service-card__copy">
              Regelmaessig geplant, transparent priorisiert und auf den stoerungsarmen Betrieb Ihrer Anlage ausgerichtet.
            </p>
            <ul class="service-card__list">
              <li>Regelmaessige Sicht- und Funktionspruefungen mit Checkliste.</li>
              <li>Thermografie und Kennlinienmessung bei Bedarf integriert.</li>
              <li>Reinigung, Nachziehen von Klemmen und geordnetes Kabelmanagement.</li>
              <li>Verschleiss, Bautausch und gezielte Fehlerbehebung.</li>
              <li>Ausfuehrlicher Bericht mit Massnahmen und Priorisierung.</li>
            </ul>
            <div class="service-card__footer">
              <a class="btn btn--outline-dark" href="/wartung/">Zur Wartungs-Seite</a>
            </div>
          </article>

          <article class="service-card reveal">
            <span class="service-card__accent" aria-hidden="true"></span>
            <div class="service-card__icon"><i class="fas fa-chart-line" aria-hidden="true"></i></div>
            <p class="service-card__eyebrow">MONITORING</p>
            <h3>Monitoring fuer Frueherkennung und Verfuegbarkeit</h3>
            <p class="service-card__copy">
              Laufende Datensicht, fruehe Abweichungserkennung und belastbare Reportings fuer einen kontrollierten Anlagenbetrieb.
            </p>
            <ul class="service-card__list">
              <li>24/7-Ueberwachung von Erzeugung, Verbrauch und Speicher.</li>
              <li>Automatisierte Alarme bei Abweichungen per E-Mail oder SMS.</li>
              <li>Performance-Analysen, Degradations-Check und Benchmarks.</li>
              <li>Laufende Datenreports fuer Betriebsfuehrung und Reporting.</li>
              <li>Fruehzeitige Fehlererkennung fuer maximale Verfuegbarkeit.</li>
            </ul>
            <div class="service-card__footer">
              <a class="btn btn--outline-dark" href="/monitoring/">Zum Monitoring</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-extensions" aria-labelledby="extensions-title">
      <div class="container">
        <div class="section-header section-header--narrow reveal">
          <span class="section-kicker">ERWEITERTE SERVICES</span>
          <h2 id="extensions-title" class="section-title">Ergaenzende Kompetenzmodule fuer sichere Betreiberprozesse</h2>
          <p class="section-intro">
            Diese Leistungen sind keine Randthemen, sondern technisch wertvolle Erweiterungen fuer Uebergabe, Absicherung und geordnete Betriebsfaehigkeit.
          </p>
        </div>

        <div class="extension-grid">
          <article class="extension-card reveal">
            <div class="extension-card__icon"><i class="fas fa-bolt" aria-hidden="true"></i></div>
            <div class="extension-card__body">
              <div class="extension-card__meta">
                <span class="micro-badge">Zertifiziert</span>
                <p class="extension-card__eyebrow">NETZ- / EINSATZSTROM-CHECK</p>
              </div>
              <h3>Absicherung fuer Netzersatz- und Einsatzstromszenarien</h3>
              <p>
                Wir pruefen Umschaltung, Lastverhalten und dokumentieren die Ergebnisse so,
                dass Betreiber, Projektverantwortliche und Versicherer belastbare Nachweise erhalten.
              </p>
              <ul class="extension-card__list">
                <li>Insel- und Umschalt-Test mit Lastpruefsteuerung und Probelauf.</li>
                <li>Dokumentation fuer Versicherung, Betreiberhandbuch und interne Freigaben.</li>
              </ul>
              <div class="extension-card__footer">
                <a class="btn btn--outline-dark open-contact" href="/kontakt" data-service="Netz-/Einsatzstrom-Check">Check anfragen</a>
              </div>
            </div>
          </article>

          <article class="extension-card reveal extension-card--offset">
            <div class="extension-card__icon"><i class="fas fa-graduation-cap" aria-hidden="true"></i></div>
            <div class="extension-card__body">
              <div class="extension-card__meta">
                <span class="micro-badge">Kompetenz</span>
                <p class="extension-card__eyebrow">SCHULUNG &amp; UEBERGABE</p>
              </div>
              <h3>Betreiberwissen und Uebergabe mit klaren Zustaendigkeiten</h3>
              <p>
                Damit Monitoring, Alarmierung und Anlagenbetrieb sauber funktionieren,
                strukturieren wir die Uebergabe nachvollziehbar und praxisnah fuer Ihr Team.
              </p>
              <ul class="extension-card__list">
                <li>Einweisung fuer Hausmeister, Betreiberteam und Monitoring-Workflows.</li>
                <li>Alarm- und Gefahrenmeldeprozess mit klaren Verantwortlichkeiten.</li>
                <li>Hinweis auf fachgerechte Servicegrenzen und keine Eigenwartung.</li>
              </ul>
              <div class="extension-card__footer">
                <a class="btn btn--outline-dark open-contact" href="/kontakt" data-service="Schulung &amp; Uebergabe">Uebergabe abstimmen</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-rhythm" id="wartungsrhythmus" aria-labelledby="rhythm-title">
      <div class="container">
        <div class="rhythm-shell reveal">
          <div class="section-header section-header--narrow">
            <span class="section-kicker">WARTUNGSRHYTHMUS</span>
            <h2 id="rhythm-title" class="section-title">Empfohlene Wartungsintervalle fuer unterschiedliche Anlagentypen</h2>
            <p class="section-intro">
              Als technischer Leitfaden gedacht: ruhig strukturiert, fachlich praezise und direkt auf die Anforderungen Ihrer Anlage ausgerichtet.
            </p>
          </div>

          <div class="rhythm-grid">
            <article class="rhythm-card reveal">
              <div class="rhythm-card__icon"><i class="fas fa-industry" aria-hidden="true"></i></div>
              <div class="rhythm-card__headline">
                <p class="rhythm-card__eyebrow">Gewerbe &gt; 30 kWp</p>
                <span class="rhythm-badge">2x jaehrlich</span>
              </div>
              <ul class="rhythm-card__list">
                <li>Sicht- und Funktionspruefung fuer elektrische und mechanische Komponenten.</li>
                <li>Aktualisierung von Dokumentation, Protokollen und Wartungsstand.</li>
                <li>Zwischencheck nach Extremwetter oder relevanten Ereignissen.</li>
              </ul>
            </article>

            <article class="rhythm-card reveal">
              <div class="rhythm-card__icon"><i class="fas fa-building" aria-hidden="true"></i></div>
              <div class="rhythm-card__headline">
                <p class="rhythm-card__eyebrow">Flachdach</p>
                <span class="rhythm-badge">Fruehjahr &amp; Herbst</span>
              </div>
              <ul class="rhythm-card__list">
                <li>Befestigungen pruefen, nachziehen und Lastverteilung kontrollieren.</li>
                <li>Entwaesserung, Kies-Verschiebungen und Dachdetails mitpruefen.</li>
                <li>Kurz-Einweisung des Betreiberteams optional in den Termin integrieren.</li>
              </ul>
            </article>

            <article class="rhythm-card reveal">
              <div class="rhythm-card__icon"><i class="fas fa-seedling" aria-hidden="true"></i></div>
              <div class="rhythm-card__headline">
                <p class="rhythm-card__eyebrow">Freiflaeche / Industrie</p>
                <span class="rhythm-badge">laufend / saisonal</span>
              </div>
              <ul class="rhythm-card__list">
                <li>Vegetationsmanagement sowie Kontrolle von Zaun-, Tor- und Schutzbereichen.</li>
                <li>Stichproben-IR, Drohnen-Thermografie und Inspektionsrunden nach Bedarf.</li>
                <li>Fehlerbeseitigung und saisonale Serviceeinsaetze geordnet planen.</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-advisory-cta" aria-labelledby="advisory-title">
      <div class="container">
        <div class="advisory-panel reveal">
          <div class="advisory-copy">
            <span class="section-kicker section-kicker--light">BERATUNG &amp; KONTAKT</span>
            <h2 id="advisory-title" class="advisory-title">Lassen Sie Ihre Anlage fachlich bewerten und betreuen.</h2>
            <p class="advisory-text">
              Wir schauen auf Montagezustand, Betriebsdaten, Wartungsbedarf und pruefbare Nachweise,
              damit aus einzelnen Leistungen ein abgestimmtes Servicekonzept wird.
            </p>
          </div>

          <div class="advisory-actions">
            <a href="tel:+4982617597176" class="btn btn--primary">
              <i class="fas fa-phone" aria-hidden="true"></i>
              <span>Jetzt anrufen</span>
            </a>
            <a href="/kontakt" class="btn btn--outline-light open-contact" data-service="Solarservices Beratung">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              <span>Kontaktieren</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="pruefleistungen" class="section section-diagnostics" aria-labelledby="diagnostics-title">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">WEITERE LEISTUNGEN &amp; PRUEFUNGEN</span>
          <h2 id="diagnostics-title" class="section-title">Analyse- und Pruefleistungen fuer Performance, Sicherheit und Nachweise</h2>
          <p class="section-intro">
            Technisch praezise Leistungen, die Stoerungen sichtbar machen, Soll-Ist-Abweichungen bewerten und dokumentierbare Entscheidungsgrundlagen liefern.
          </p>
        </div>

        <div class="diagnostic-grid">
          <article class="diagnostic-card reveal">
            <span class="diagnostic-card__accent" aria-hidden="true"></span>
            <div class="diagnostic-card__icon"><i class="fas fa-camera-retro" aria-hidden="true"></i></div>
            <div class="diagnostic-card__meta">
              <span class="micro-badge">Praezise Analyse</span>
              <p class="diagnostic-card__eyebrow">THERMOGRAFIE</p>
            </div>
            <h3>Thermografie fuer fruehe Fehlererkennung</h3>
            <p>
              Wir identifizieren thermische Auffaelligkeiten, die auf Hotspots, Zell- oder Diodenfehler,
              Kontaktprobleme oder Verschattung hindeuten koennen.
            </p>
            <ul class="diagnostic-card__list">
              <li>Erkennung von Hotspots, Zell- und Diodenfehlern sowie Verschattungsproblemen.</li>
              <li>Bericht mit Befundliste, Dokumentation und Handlungsempfehlungen.</li>
            </ul>
            <div class="diagnostic-card__footer">
              <a href="/kontakt" class="btn btn--outline-dark open-contact" data-service="Thermografie">Mehr erfahren</a>
            </div>
          </article>

          <article class="diagnostic-card reveal">
            <span class="diagnostic-card__accent" aria-hidden="true"></span>
            <div class="diagnostic-card__icon"><i class="fas fa-wave-square" aria-hidden="true"></i></div>
            <div class="diagnostic-card__meta">
              <span class="micro-badge">IEC 61724</span>
              <p class="diagnostic-card__eyebrow">LEISTUNGSCHECK</p>
            </div>
            <h3>Leistungscheck mit normnaher Kennzahlenbewertung</h3>
            <p>
              Wir vergleichen Betriebsdaten strukturiert mit den erwartbaren Leistungswerten
              und machen Ertragsverluste oder Anomalien nachvollziehbar sichtbar.
            </p>
            <ul class="diagnostic-card__list">
              <li>Kennzahlen nach IEC 61724 wie PR, Verfuegbarkeit und Ausfallzeiten.</li>
              <li>Soll-Ist-Abgleich inklusive Witterungsnormalisierung und Einordnung.</li>
            </ul>
            <div class="diagnostic-card__footer">
              <a href="/kontakt" class="btn btn--outline-dark open-contact" data-service="Leistungscheck">Mehr erfahren</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-final-cta" aria-labelledby="final-cta-title">
      <div class="container">
        <div class="final-cta-panel reveal">
          <div class="final-cta-copy">
            <span class="section-kicker section-kicker--light">ABSCHLUSS</span>
            <h2 id="final-cta-title" class="final-cta-title">
              Lassen Sie Montage, Wartung, Monitoring und Pruefungen strukturiert aus einer Hand betreuen.
            </h2>
            <p class="final-cta-text">
              ALAB verbindet Ausfuehrung, Betriebsbegleitung und Nachweise zu einem ruhigen,
              professionellen Serviceauftritt mit klaren Ansprechpartnern und nachvollziehbaren Prozessen.
            </p>
          </div>

          <div class="final-cta-actions">
            <a class="btn btn--primary open-contact" href="/kontakt" data-service="Servicepakete Abschluss-CTA">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              <span>Service anfragen</span>
            </a>
            <a class="btn btn--outline-light" href="tel:+4982617597176">
              <i class="fas fa-phone" aria-hidden="true"></i>
              <span>08261 7597176</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div class="modal" id="contactModal" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="modal__dialog">
      <div class="modal__header">
        <span class="modal__title">Kontaktanfrage</span>
        <button class="modal__close" aria-label="Schliessen" id="closeModal">&times;</button>
      </div>

      <div class="modal__body">
        <form id="leadForm">
          <div id="leadFormFields" class="form-grid">
            <div class="input-field">
              <label for="name">Name</label>
              <input id="name" name="name" required>
            </div>
            <div class="input-field">
              <label for="phone">Telefon</label>
              <input id="phone" name="phone" inputmode="tel">
            </div>
            <div class="input-field input-field--full">
              <label for="email">E-Mail</label>
              <input id="email" name="email" type="email" required>
            </div>
            <div class="input-field input-field--full">
              <label for="message">Nachricht</label>
              <textarea id="message" name="message" placeholder="Wie koennen wir helfen?"></textarea>
            </div>
            <div class="input-field input-field--full input-field--consent">
              <label class="checkbox-inline">
                <input id="accept" type="checkbox">
                <span>
                  Ich stimme der Kontaktaufnahme zur Angebotserstellung zu und habe die
                  <a href="https://www.alabenergiesysteme.de/datenschutz/" target="_blank" rel="noopener noreferrer">Datenschutzerklaerung</a> gelesen.*
                </span>
              </label>
            </div>

            <input type="hidden" id="service" name="service" value="Allgemeine Anfrage">
            <input type="hidden" name="form_location" value="servicepakete">
          </div>

          <div id="formSuccess" class="form-success" aria-hidden="true">
            <div class="success-icon"><i class="fas fa-check" aria-hidden="true"></i></div>
            <h3>Danke fuer Ihre Anfrage!</h3>
            <p>Wir melden uns innerhalb von 24 Stunden.</p>
            <div class="form-success__actions">
              <button type="button" id="successAgain" class="btn btn--primary">Weitere Anfrage</button>
              <button type="button" id="successClose" class="btn btn--ghost">Schliessen</button>
            </div>
          </div>

          <div class="modal__footer" id="leadFormFooter">
            <button type="button" class="btn btn--ghost" id="cancelModal">Abbrechen</button>
            <button type="submit" class="btn btn--primary" id="submitBtn">Anfrage senden</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<noscript><style>#alab-services .reveal{opacity:1 !important;transform:none !important}</style></noscript>
`;





