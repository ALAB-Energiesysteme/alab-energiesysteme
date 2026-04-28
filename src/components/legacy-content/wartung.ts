export const wartungHtml = String.raw`
<div id="alab-wartung">
    <!-- Loading Animation -->
    <div class="loader-wrapper">
        <div class="loader"></div>
    </div>


    <!-- Progress Indicator -->
    <div class="progress-indicator"></div>

    <div>
        <!-- Hero Section -->
        <section class="hero" id="hero">
            <div class="hero-background">
                <div class="hero-pattern"></div>
            </div>
            <div class="container">
                <div class="hero-content">
                  
                    <h1 class="hero-title animate-slide-up">
                        Professionelle PV-Wartung: Maximieren Sie Ihren Ertrag, minimieren Sie Ihr Risiko.
                    </h1>
                    <p class="hero-subtitle animate-slide-up">
                        Sichern Sie die Langlebigkeit, Sicherheit und volle LeistungsfÃ¤higkeit Ihrer Photovoltaikanlage mit unserem zertifizierten Fachservice.
                    </p>
                    <div class="hero-cta-group animate-slide-up">
                        <a href="#contact" class="btn btn-primary btn-large">
                            <span>Jetzt kostenloses Angebot anfordern</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                        <a href="#packages" class="btn btn-secondary btn-large">
                            <span>Pakete ansehen</span>
                        </a>
                    </div>
                    <div class="hero-benefits animate-fade-in">
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <span>Maximale StromertrÃ¤ge</span>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <span>Betriebssicherheit & Brandschutz</span>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <i class="fas fa-file-contract"></i>
                            </div>
                            <span>Erhalt von Garantie & Versicherung</span>
                        </div>
                    </div>
                </div>
                <div class="hero-image animate-float">
                   <div class="solar-panel-3d">
                      <img
                          class="image-fill"
                          src="/assets/img/wartung/anlage1_W.jpeg"
                          alt="Photovoltaikanlage â€“ Wartung und Inspektion"
                          width="1200" height="800"
                          loading="eager" decoding="async"
                        >
                    </div>

                </div>
            </div>
            <div class="hero-wave">
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style="display: block;">
                    <path d="M0,100 C360,20 720,180 1440,100 L1440,200 L0,200 Z" fill="#f8f9fa"></path>
                </svg>
            </div>
        </section>

        <!-- Problem Section -->
        <section class="problem-section" id="problem">
            <div class="container">
                <div class="section-header">
                    <span class="section-badge">Herausforderungen</span>
                    <h2>Ihre PV-Anlage ist robust â€“ aber nicht unbesiegbar.</h2>
                    <p class="section-description">
                        Eine Photovoltaikanlage ist eine Hightech-Investition, die auf Langlebigkeit ausgelegt ist. Doch Witterung, UmwelteinflÃ¼sse und elektrischer VerschleiÃŸ hinterlassen Spuren. Viele Probleme entwickeln sich schleichend und bleiben oft unbemerkt â€“ bis der finanzielle Schaden bereits spÃ¼rbar ist. Handeln Sie, bevor es zu spÃ¤t ist.
                    </p>
                </div>

                <!-- IMAGE PLACEHOLDER 2 - Two column layout with text -->
                <div class="image-text-grid">
                    <div class="image-text-content">
                        <h3>Typische Probleme einer PV-Anlage</h3>
                        <p>Verschmutzungen, Hotspots, nachlassende Wechselrichterleistung und mechanische Abnutzung kÃ¶nnen die Effizienz Ihrer Anlage erheblich beeintrÃ¤chtigen. Unsere Experten identifizieren diese Probleme frÃ¼hzeitig und helfen Ihnen, kostspielige AusfÃ¤lle zu vermeiden.</p>
                        <ul class="problem-list">
                            <li><i class="fas fa-check-circle"></i> RegelmÃ¤ÃŸige Inspektion aller Komponenten</li>
                            <li><i class="fas fa-check-circle"></i> FrÃ¼hzeitige Erkennung von Defekten</li>
                            <li><i class="fas fa-check-circle"></i> Maximierung Ihrer ErtrÃ¤ge</li>
                        </ul>
                    </div>
                    <div style="min-height:350px; border-radius: var(--radius-xl); overflow:hidden">
                      <img
                          class="image-fill"
                          src="/assets/img/wartung/anlage2_W.jpeg"
                          alt="Typische PV-Probleme: Hotspots und Verschmutzung"
                          width="1200" height="800"
                          loading="lazy" decoding="async"
                         >
                    </div>

                </div>

                <div class="risk-grid">
                    <div class="risk-card">
                        <div class="risk-icon-wrapper">
                            <div class="risk-icon">
                                <svg class="risk-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <h3>Ertragsverlust</h3>
                        <p>Verschmutzungen, unerkannte Moduldefekte ("Hotspots") oder nachlassende Wechselrichterleistung kÃ¶nnen Ihre Stromproduktion um 5% bis 30% reduzieren. Ein unbemerkter Leistungsabfall von nur 10% kann Sie bereits Hunderte von Euro pro Jahr kosten. Besonders Anlagen in landwirtschaftlichen Gebieten sind durch Staub und organische Ablagerungen gefÃ¤hrdet.</p>
                        <div class="risk-indicator">
                            <svg class="risk-badge-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                            </svg>
                            <span class="risk-level high">Hohes Risiko</span>
                        </div>
                    </div>

                    <div class="risk-card">
                        <div class="risk-icon-wrapper danger">
                            <div class="risk-icon">
                                <svg class="risk-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                </svg>
                            </div>
                        </div>
                        <h3>Sicherheitsrisiken</h3>
                        <p>Gelockerte Klemmen, beschÃ¤digte Kabelisolierungen durch UV-Strahlung oder Tierbiss und Defekte in der Elektronik sind ernstzunehmende Gefahren. Sie kÃ¶nnen zu KurzschlÃ¼ssen, LichtbÃ¶gen und im schlimmsten Fall zu einem Brand fÃ¼hren. Eine regelmÃ¤ÃŸige PrÃ¼fung durch eine Elektrofachkraft ist unerlÃ¤sslich fÃ¼r die Sicherheit Ihres Eigentums.</p>
                        <div class="risk-indicator">
                            <svg class="risk-badge-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                            </svg>
                            <span class="risk-level critical">Kritisch</span>
                        </div>
                    </div>

                    <div class="risk-card">
                        <div class="risk-icon-wrapper warning">
                            <div class="risk-icon">
                                <svg class="risk-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <h3>Garantie- & Versicherungsverlust</h3>
                        <p>Viele Versicherungen und Herstellergarantien setzen eine regelmÃ¤ÃŸige, fachmÃ¤nnisch durchgefÃ¼hrte und dokumentierte Wartung voraus. Ohne ein gÃ¼ltiges Wartungsprotokoll riskieren Sie im Schadensfall, auf den gesamten Kosten sitzen zu bleiben. WÃ¤re Ihre Anlage heute wirklich abgesichert?</p>
                        <div class="risk-indicator">
                            <svg class="risk-badge-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                            </svg>
                            <span class="risk-level medium">Mittleres Risiko</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Solution Section -->
        <section class="solution-section" id="solution">
            <div class="container">
                <div class="section-header">
                    <span class="section-badge">Unser Prozess</span>
                    <h2>Transparenz und GrÃ¼ndlichkeit: Unser Wartungsprozess nach DIN EN 62446-1.</h2>
                    <p class="section-description">
                        Wir Ã¼berlassen nichts dem Zufall. Unser Wartungsservice folgt einem standardisierten PrÃ¼fverfahren, das sich an den strengen Vorgaben der relevanten Industrienormen orientiert. So gewÃ¤hrleisten wir hÃ¶chste QualitÃ¤t und Sicherheit fÃ¼r Ihre Anlage.
                    </p>
                </div>

                <div class="process-timeline">
                    <div class="timeline-progress"></div>
                    
                    <div class="process-step" data-step="1">
                        <div class="step-connector"></div>
                        <div class="step-number">
                            <span>01</span>
                            <div class="step-pulse"></div>
                        </div>
                        <div class="step-content">
                            <div class="step-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <h3>SichtprÃ¼fung & Mechanik</h3>
                            <ul class="step-list">
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Solarmodule:</strong> PrÃ¼fung auf Risse, Hotspots, VerfÃ¤rbungen, Delamination und Verschmutzung.
                                    </div>
                                </li>
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Montagesystem:</strong> Kontrolle auf festen Sitz aller Schrauben und Klemmen; PrÃ¼fung der Dachhaut auf BeschÃ¤digungen.
                                    </div>
                                </li>
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Verkabelung:</strong> Inspektion auf Tierbiss, UV-SchÃ¤den, Scheuerstellen und sichere Verlegung.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="process-step" data-step="2">
                        <div class="step-connector"></div>
                        <div class="step-number">
                            <span>02</span>
                            <div class="step-pulse"></div>
                        </div>
                        <div class="step-content">
                            <div class="step-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <h3>Elektrische SystemprÃ¼fung</h3>
                            <ul class="step-list">
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Wechselrichter:</strong> FunktionsprÃ¼fung, Reinigung der LÃ¼fter, Auslesen des Fehlerspeichers und ggf. Software-Updates.
                                    </div>
                                </li>
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>AnschlÃ¼sse:</strong> ÃœberprÃ¼fung aller DC- und AC-seitigen AnschlÃ¼sse auf Korrosion und festen Sitz; PrÃ¼fung der ÃœberspannungsschutzgerÃ¤te.
                                    </div>
                                </li>
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Leistungsmessung:</strong> Messung von Strangspannungen und IsolationswiderstÃ¤nden zur Sicherstellung der optimalen Leistung.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="process-step" data-step="3">
                        <div class="step-connector"></div>
                        <div class="step-number">
                            <span>03</span>
                            <div class="step-pulse"></div>
                        </div>
                        <div class="step-content">
                            <div class="step-icon">
                                <i class="fas fa-chart-pie"></i>
                            </div>
                            <h3>Analyse & Dokumentation</h3>
                            <ul class="step-list">
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Ertragsanalyse:</strong> Abgleich der aktuellen Leistung mit den Soll-Werten und den Daten aus dem Monitoring.
                                    </div>
                                </li>
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Detailliertes Wartungsprotokoll:</strong> Sie erhalten ein rechtssicheres Protokoll fÃ¼r Ihre Unterlagen â€“ der entscheidende Nachweis fÃ¼r Versicherung und Garantie.
                                    </div>
                                </li>
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <strong>Handlungsempfehlungen:</strong> Klare und verstÃ¤ndliche Empfehlungen zur Behebung von MÃ¤ngeln oder zur weiteren Ertragsoptimierung.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="thermography-box">
                    <div class="thermography-content">
                        <div class="thermography-icon">
                            <i class="fas fa-helicopter"></i>
                        </div>
                        <div class="thermography-text">
                            <h3>Optional: Thermografie-Analyse mit Drohne</h3>
                            <p>Entdecken Sie, was dem bloÃŸen Auge verborgen bleibt. Mit unserer hochauflÃ¶senden WÃ¤rmebildkamera identifizieren wir unsichtbare Defekte wie ZellbrÃ¼che oder fehlerhafte LÃ¶tstellen (Hotspots), bevor sie zu grÃ¶ÃŸeren SchÃ¤den oder ErtragsausfÃ¤llen fÃ¼hren.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Packages Section -->
        <section class="packages-section" id="packages">
            <div class="container">
                <div class="section-header">
                    <span class="section-badge">Unsere Pakete</span>
                    <h2>WÃ¤hlen Sie das passende Servicepaket fÃ¼r Ihre Anlage.</h2>
                    <p class="section-description">
                        Ob einmalige Inspektion oder unser Rundum-Sorglos-Wartungsvertrag â€“ wir haben die richtige LÃ¶sung fÃ¼r Ihre BedÃ¼rfnisse und bieten Ihnen volle Kostentransparenz.
                    </p>
                </div>

                <div class="packages-grid">
                    <div class="package-card">
                        <div class="package-header">
                            <h3>Einzel-Wartung</h3>
                            <p>Die flexible LÃ¶sung fÃ¼r eine einmalige, grÃ¼ndliche ÃœberprÃ¼fung Ihrer Anlage.</p>
                        </div>
                        <div class="package-price">
                            <span class="currency"></span>
                            <span class="amount">â‚¬ / einmalig </span>
                            <span class="period">auf Anfrage</span>
                        </div>
                        <ul class="package-features">
                            <li>
                                <i class="fas fa-check"></i>
                                <span>Umfassende PrÃ¼fung nach DIN EN 62446-1</span>
                            </li>
                            <li>
                                <i class="fas fa-check"></i>
                                <span>Visuelle & mechanische Kontrolle</span>
                            </li>
                            <li>
                                <i class="fas fa-check"></i>
                                <span>Elektrische SystemprÃ¼fung & Messungen</span>
                            </li>
                            <li>
                                <i class="fas fa-check"></i>
                                <span>Detailliertes Wartungsprotokoll</span>
                            </li>
                        </ul>
                        <a href="#contact" class="btn btn-outline btn-block">
                            <span>Jetzt Termin anfragen</span>
                        </a>
                    </div>

                    <div class="package-card featured">
                        <div class="package-badge">Bestseller</div>
                        <div class="package-header">
                            <h3>Wartungsvertrag "Sorglos"</h3>
                            <p>Das Komplettpaket fÃ¼r maximale Sicherheit und dauerhaft hohe ErtrÃ¤ge.</p>
                        </div>
                        <div class="package-price">
                            <span class="currency"></span>
                            <span class="amount">â‚¬ / Monat</span>
                            <span class="period">auf Anfrage</span>
                        </div>
                        <ul class="package-features">
                            <li>
                                <i class="fas fa-check"></i>
                                <span>Alle Leistungen der Einzel-Wartung</span>
                            </li>
                            <li class="highlight">
                                <i class="fas fa-star"></i>
                                <span><strong>JÃ¤hrliche, automatische Terminplanung</strong></span>
                            </li>
                            <li class="highlight">
                                <i class="fas fa-star"></i>
                                <span><strong>Kontinuierliches Online-Monitoring</strong></span>
                            </li>
                            <li class="highlight">
                                <i class="fas fa-star"></i>
                                <span><strong>Proaktive StÃ¶rungsmeldung & Ferndiagnose</strong></span>
                            </li>
                            <li class="highlight">
                                <i class="fas fa-star"></i>
                                <span><strong>Priorisierter Service im StÃ¶rfall</strong></span>
                            </li>
                            <li class="highlight">
                                <i class="fas fa-star"></i>
                                <span><strong>Preisvorteil gegenÃ¼ber Einzelbuchung</strong></span>
                            </li>
                        </ul>
                        <a href="#contact" class="btn btn-primary btn-block">
                            <span>Vertrag anfragen</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section" id="faq">
            <div class="container">
                <div class="section-header">
                    <span class="section-badge">FAQ</span>
                    <h2>Antworten auf Ihre hÃ¤ufigsten Fragen</h2>
                </div>

                <div class="faq-container">
                    <div class="faq-item">
                        <button class="faq-question">
                            <span>Wie oft ist eine PV-Wartung wirklich notwendig?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="faq-answer">
                            <p>Obwohl fÃ¼r private Anlagen in Deutschland keine gesetzliche Wartungspflicht besteht, empfehlen Experten, Versicherer und Hersteller eine regelmÃ¤ÃŸige ÃœberprÃ¼fung. Wir raten zu einer jÃ¤hrlichen SichtprÃ¼fung und mechanischen Kontrolle. Eine umfassende wiederkehrende PrÃ¼fung der elektrischen Anlage nach DIN EN 62446-1 (auch "E-Check PV" genannt) sollte alle vier Jahre durch eine zertifizierte Elektrofachkraft erfolgen. Dies sichert nicht nur den Ertrag, sondern ist oft auch Voraussetzung fÃ¼r den vollen Versicherungsschutz.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            <span>Was kostet eine professionelle PV-Wartung?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="faq-answer">
                            <p>Die Kosten fÃ¼r eine Standardwartung an einer typischen Photovoltaikanlage auf einem Einfamilienhaus liegen in der Regel zwischen 250 â‚¬ und 350 â‚¬. Der genaue Preis hÃ¤ngt von der AnlagengrÃ¶ÃŸe, dem Anlagentyp und der ZugÃ¤nglichkeit ab. Bedenken Sie, dass diese Kosten eine Investition sind, die Sie vor weitaus hÃ¶heren Ausgaben durch unentdeckte SchÃ¤den oder ErtragsausfÃ¤lle schÃ¼tzt. Unser Wartungsvertrag bietet zudem einen attraktiven Preisvorteil gegenÃ¼ber der jÃ¤hrlichen Einzelbeauftragung.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            <span>Ist die Reinigung der Module immer inklusive?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="faq-answer">
                            <p>Die Beurteilung des Verschmutzungsgrades ist fester Bestandteil unserer Wartung. Eine komplette professionelle Reinigung ist jedoch eine separate Leistung. In den meisten Regionen Deutschlands ist eine manuelle Reinigung dank des Selbstreinigungseffekts durch Regen und einer Modulneigung von Ã¼ber 15 Grad nicht jÃ¤hrlich erforderlich. Eine Reinigung wird nur dann wirtschaftlich sinnvoll, wenn hartnÃ¤ckige Verschmutzungen wie Vogelkot, Flechten oder starke Ablagerungen aus Landwirtschaft und Industrie vorliegen, die den Ertrag messbar mindern. Wir beraten Sie hierzu ehrlich und bedarfsgerecht.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            <span>Kann ich die Wartung nicht einfach selbst durchfÃ¼hren?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="faq-answer">
                            <p>Die regelmÃ¤ÃŸige Kontrolle Ihrer Ertragsdaten Ã¼ber die App oder am Wechselrichter sowie eine SichtprÃ¼fung vom Boden aus sind sehr zu empfehlen. Arbeiten auf dem Dach bergen jedoch erhebliche Absturzgefahren und sollten nur von Profis mit entsprechender SicherungsausrÃ¼stung durchgefÃ¼hrt werden. Die entscheidenden elektrischen PrÃ¼fungen erfordern zudem spezielle MessgerÃ¤te und das Fachwissen einer zertifizierten Elektrofachkraft. Eine unsachgemÃ¤ÃŸe Handhabung kann nicht nur zu SchÃ¤den fÃ¼hren, sondern liefert Ihnen auch nicht das notwendige, rechtssichere Protokoll fÃ¼r Ihre Versicherung und GarantieansprÃ¼che.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            <span>Meine Anlage ist neu â€“ brauche ich jetzt schon eine Wartung?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="faq-answer">
                            <p>Ja, eine erste Inspektion nach dem ersten oder zweiten Betriebsjahr ist sehr sinnvoll. So kÃ¶nnen eventuelle Installationsfehler oder frÃ¼hzeitige MaterialermÃ¼dung noch innerhalb der GewÃ¤hrleistungsfrist des Installateurs erkannt und kostenlos behoben werden. Zudem wird sichergestellt, dass Ihre Anlage von Anfang an mit optimaler Leistung lÃ¤uft.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Why Us Section -->
        <section class="why-us-section" id="why-us">
            <div class="container">
                <div class="section-header">
                    <span class="section-badge">Warum ALAB</span>
                    <h2>Warum ALAB Energiesysteme? Ihr Vorteil ist unsere Expertise.</h2>
                </div>

                <!-- IMAGE PLACEHOLDER 3 - Two column layout with features -->
                <div class="image-text-grid" style="margin-bottom: var(--spacing-3xl);">
                    <div style="min-height:350px; border-radius: var(--radius-xl); overflow:hidden">
                       <img
                         class="image-fill"
                         src="/assets/img/wartung/anlage3_W.jpeg"
                         alt="ALAB Wartungsteam â€“ regional, schnell, zertifiziert"
                         width="1200" height="800"
                         loading="lazy" decoding="async"
                        >
                    </div>

                    <div class="image-text-content">
                        <h3>Ihr zuverlÃ¤ssiger Partner</h3>
                        <p>Mit jahrelanger Erfahrung und zertifizierten FachkrÃ¤ften bieten wir Ihnen einen Service, auf den Sie sich verlassen kÃ¶nnen. Wir behandeln Ihre Anlage wie unsere eigene und sorgen dafÃ¼r, dass sie stets optimal lÃ¤uft.</p>
                        <ul class="problem-list">
                            <li><i class="fas fa-star"></i> Ãœber 20 zufriedene Kunden</li>
                            <li><i class="fas fa-star"></i> Erfahrene FachkrÃ¤fte</li>
                            <li><i class="fas fa-star"></i> Schneller und zuverlÃ¤ssiger Service</li>
                        </ul>
                    </div>
                </div>

                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <h3>Zertifizierte Fachkompetenz</h3>
                        <p>Professionelles Team mit regelmÃ¤ÃŸigen Schulungen zu VDE-/DGUV-Standards fÃ¼r maximale Sicherheit und QualitÃ¤t.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <h3>Regional & Schnell</h3>
                        <p>Als Ihr Partner vor Ort sind wir schnell bei Ihnen, wenn Sie uns brauchen. Keine langen Wartezeiten, keine anonymen Callcenter â€“ nur direkter und persÃ¶nlicher Service.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <h3>HerstellerunabhÃ¤ngig & Fair</h3>
                        <p>Wir warten Photovoltaikanlagen aller gÃ¤ngigen Hersteller. Unsere Beratung ist unabhÃ¤ngig und zielt allein auf die optimale Leistung und Langlebigkeit Ihrer Anlage ab.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Transparenz & QualitÃ¤t</h3>
                        <p>Sie erhalten von uns klare Angebote ohne versteckte Kosten und ein detailliertes Protokoll nach jeder Wartung. Ihre Zufriedenheit ist unser hÃ¶chster Anspruch.</p>
                    </div>
                </div>

                <!-- Testimonials -->
                <div class="testimonials">
                    <div class="testimonial-card">
                        <div class="testimonial-quote">
                            <i class="fas fa-quote-left"></i>
                            <p>"Nach der Wartung durch ALAB Energiesysteme hat unsere Anlage sofort 10% mehr Ertrag gebracht. Der Service war pÃ¼nktlich, professionell und jeden Cent wert."</p>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">FM</div>
                            <div class="author-info">
                                <strong>Familie M. aus MÃ¼nchen</strong>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-card">
                        <div class="testimonial-quote">
                            <i class="fas fa-quote-left"></i>
                            <p>"Das Wartungsprotokoll war extrem detailliert. Endlich habe ich die Sicherheit, dass fÃ¼r meine Versicherung alles korrekt dokumentiert ist. Absolut empfehlenswert!"</p>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">JS</div>
                            <div class="author-info">
                                <strong>J. Schmidt, Ulm</strong>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section" id="contact">
            <div class="container">
                <div class="contact-wrapper">
                    <div class="contact-info">
                        <span class="section-badge">Kontakt</span>
                        <h2>SchÃ¼tzen Sie Ihre Investition. Handeln Sie jetzt.</h2>
                        <p>Warten Sie nicht, bis kleine Probleme zu teuren Reparaturen werden. Eine professionelle Wartung ist die beste Versicherung fÃ¼r Ihren Solarertrag. Kontaktieren Sie uns noch heute fÃ¼r ein unverbindliches und kostenloses Angebot.</p>
                        
                        <div class="contact-details">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <p>Oder rufen Sie uns direkt an:</p>
                                    <a href="tel:+4982617597176" class="contact-link">08261 7597176</a>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <p>E-Mail:</p>
                                    <a href="mailto:info@alab-energiesysteme.de" class="contact-link">info@alab-energiesysteme.de</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form id="contactForm" class="contact-form">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Ihr Name*" required>
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" placeholder="Ihre E-Mail-Adresse*" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" name="phone" placeholder="Ihre Telefonnummer (optional)">
                        </div>
                        <div class="form-group">
                            <textarea name="message" placeholder="Ihre Nachricht (optional)" rows="4"></textarea>
                        </div>
                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="privacy" name="privacy" required>
                            <label for="privacy">
                                Ich stimme der <a href="/datenschutz" target="_blank" rel="noopener noreferrer">DatenschutzerklÃ¤rung</a> zu.*
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">
                            <span>Angebot anfordern</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </div>

 
</div>
`;

