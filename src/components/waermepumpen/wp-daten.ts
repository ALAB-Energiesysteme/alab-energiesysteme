/* ════════════════════════════════════════════════════════════
   Inhalte der Wärmepumpen-Landingpage /lp/waermepumpen
   (Kontakt, Hero-Bild, Referenzen, FAQ) an einer Stelle.
   ════════════════════════════════════════════════════════════ */

export const PHONE = "+4982617597176";
export const PHONE_DISPLAY = "08261 7597176";
/* Öffnungszeiten laut LocalBusiness-Schema in layout.tsx */
export const OEFFNUNGSZEITEN = "Mo–Fr 8–17 Uhr";

/** Ziel aller primären CTAs: das Ersteinschätzungs-Formular */
export const FORM_ANKER = "anfrage";

/* ─── Hero-Bild ───
   Aktuell ein Herstellerfoto (Bosch). Sobald ein eigenes ALAB-Projektfoto
   vorliegt, nur hier austauschen (Querformat, mind. 1600 px breit). */
export const HERO_BILD = {
  src: "/waermepumpe-bosch.jpg",
  alt: "Luft-Wasser-Wärmepumpe im Außenbereich eines Wohnhauses",
};

/* ─── Referenzen ───
   Nur ECHTE ALAB-Wärmepumpenprojekte eintragen. Solange die Liste leer
   ist, wird der Referenz-Abschnitt nicht angezeigt.
   Bild z. B. unter /public/referenzen-wp/ ablegen.

   Beispiel für einen Eintrag:
   {
     bild: "/referenzen-wp/projekt-1.jpg",
     alt: "Wärmepumpe an einem Einfamilienhaus in Mindelheim",
     gebaeudetyp: "Einfamilienhaus",
     bestand: "Bestand",
     region: "Mindelheim",
     technik: "Luft-Wasser-Wärmepumpe, ersetzt Ölheizung, Heizkörper",
   },
*/
export type WpReferenz = {
  bild: string;
  alt: string;
  gebaeudetyp: string;
  bestand: "Bestand" | "Neubau";
  region: string;
  technik: string;
};

export const WP_REFERENZEN: WpReferenz[] = [];

/* ─── FAQ (kaufrelevant) ─── */
export const FAQ: { frage: string; antwort: string }[] = [
  {
    frage: "Funktioniert eine Wärmepumpe im Altbau?",
    antwort:
      "In vielen Fällen ja. Entscheidend sind die Heizlast des Gebäudes und die Vorlauftemperatur, die Ihre Heizflächen benötigen – nicht das Baujahr allein. Beides ermitteln wir, bevor wir eine Anlage empfehlen. Oft genügen gezielte Anpassungen, etwa einzelne größere Heizkörper.",
  },
  {
    frage: "Funktioniert eine Wärmepumpe mit Heizkörpern?",
    antwort:
      "Ja, eine Fußbodenheizung ist keine Voraussetzung. Wichtig ist, dass Ihre Heizkörper die Räume auch mit niedrigerer Vorlauftemperatur ausreichend erwärmen. Das prüfen wir anhand der Heizlast und empfehlen, falls nötig, den Tausch einzelner Heizkörper.",
  },
  {
    frage: "Was kostet eine Wärmepumpe?",
    antwort:
      "Das hängt von Heizlast, Gebäudegröße, vorhandenem Heizsystem, Speicher, Hydraulik, Elektroinstallation, Leitungswegen und Montageaufwand ab. Pauschalpreise wären deshalb nicht seriös. Nach der Bestandsaufnahme erhalten Sie von uns ein transparentes Festpreisangebot.",
  },
  {
    frage: "Welche Größe brauche ich?",
    antwort:
      "Die Leistung richtet sich nach der Heizlast Ihres Gebäudes, nicht allein nach der Wohnfläche. Eine zu große Wärmepumpe taktet häufig und arbeitet ineffizient, eine zu kleine reicht an kalten Tagen nicht aus. Deshalb legen wir die Anlage auf Basis einer Heizlastermittlung aus.",
  },
  {
    frage: "Muss der Zählerschrank erneuert werden?",
    antwort:
      "Nicht in jedem Fall. Ob Ihr Zählerschrank den aktuellen technischen Anforderungen entspricht und Platz für die Wärmepumpe bietet, prüfen wir als Elektrofachbetrieb vorab. Ist eine Anpassung nötig, übernehmen wir sie selbst und weisen sie im Angebot aus.",
  },
  {
    frage: "Welche Förderung gibt es?",
    antwort:
      "Für den Umstieg auf eine Wärmepumpe gibt es staatliche Zuschüsse. Höhe und Voraussetzungen hängen unter anderem davon ab, ob Sie das Haus selbst bewohnen und welche Heizung ersetzt wird – und sie ändern sich regelmäßig. Wir prüfen die aktuell geltenden Programme für Ihr Vorhaben und unterstützen Sie bei der Antragstellung.",
  },
  {
    frage: "Wie lange dauert der Einbau?",
    antwort:
      "Die Montage vor Ort dauert bei einem Einfamilienhaus meist nur wenige Tage. Wie lange es insgesamt bis zur Inbetriebnahme dauert, hängt von Planung, Förderantrag und Lieferzeiten ab. Den konkreten Zeitplan stimmen wir mit Ihnen ab.",
  },
  {
    frage: "Kann die Wärmepumpe mit PV kombiniert werden?",
    antwort:
      "Ja. Mit einer Photovoltaikanlage erzeugen Sie einen Teil des Stroms für Ihre Wärmepumpe selbst. Ein Stromspeicher und ein Energiemanagement helfen, den Eigenverbrauch zu erhöhen. Als Elektrofachbetrieb planen und installieren wir PV, Speicher, Wärmepumpe und Wallbox aus einer Hand.",
  },
];
