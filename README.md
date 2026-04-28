# ALAB Energiesysteme – Webseite

Offizielle Webseite von **ALAB Energiesysteme e. K.** – Ingenieurbüro &
zertifizierter Elektrofachbetrieb aus 87719 Mindelheim.

Wir planen und realisieren schlüsselfertig:

- Photovoltaik für Privat- & Geschäftskunden
- Wärmepumpen (Luft-Wasser)
- Wallboxen & Ladeinfrastruktur
- Gebäudeenergie & Elektroinstallation
- Beleuchtungstechnik & Lichtplanung

## Tech-Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Formular-Backend:** Make.com Webhook
- **Hosting:** (Vercel / eigener Server)

## Lokale Entwicklung

Voraussetzungen: Node.js 20+ und npm.

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten (http://localhost:3000)
npm run dev

# Production-Build erstellen
npm run build

# Production-Server starten
npm start
```

## Projektstruktur

```
src/
├── app/                # Next.js App Router – Routen + Metadaten (SEO)
│   ├── layout.tsx      # Root-Layout + LocalBusiness-JSON-LD
│   ├── sitemap.ts      # Automatische sitemap.xml
│   ├── robots.ts       # robots.txt
│   └── ...             # Alle Routen
├── components/         # Wiederverwendbare React-Komponenten
└── ...
public/                 # Statische Assets (Bilder, Videos, Logos)
```

## SEO

Die Seite enthält:

- Pro Route: eigene `metadata` (title, description, canonical, OpenGraph, keywords)
- LocalBusiness-Strukturdaten (JSON-LD) im Root-Layout
- FAQPage-Strukturdaten auf der Wärmepumpen-Seite
- Service-Strukturdaten auf den Hauptbereichen (PV, Gewerbe, WP, etc.)
- Automatisch generierte `sitemap.xml` und `robots.txt`

## Kontakt

ALAB Energiesysteme e. K.
Kastanienweg 6
87719 Mindelheim
Tel.: 08261 7597176
E-Mail: info@alabenergiesysteme.de
Web: https://www.alabenergiesysteme.de

## Lizenz

Proprietär – © ALAB Energiesysteme e. K. Alle Rechte vorbehalten.
