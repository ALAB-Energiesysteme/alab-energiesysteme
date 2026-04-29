import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import "./globals.css";

// AngebotLightbox erst laden, wenn ein Angebot-CTA geklickt wird
// → spart ~5-10 kB JS auf jedem ersten Seitenaufruf
const AngebotLightbox = dynamic(() => import("@/components/AngebotLightbox"), {
  ssr: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://www.alabenergiesysteme.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ALAB Energiesysteme Mindelheim – Ingenieurbüro & Elektrofachbetrieb für Photovoltaik, Wärmepumpe & Energietechnik",
    template: "%s | ALAB Energiesysteme Mindelheim",
  },
  description:
    "ALAB Energiesysteme aus 87719 Mindelheim – Ingenieurbüro & zertifizierter Elektrofachbetrieb. Planung und schlüsselfertige Umsetzung von Photovoltaik, Wärmepumpe, Wallbox, Gebäudeenergie & Beleuchtungstechnik aus einer Hand.",
  keywords: [
    "ALAB Energiesysteme",
    "Ingenieurbüro Mindelheim",
    "Elektrofachbetrieb Mindelheim",
    "Photovoltaik Mindelheim",
    "Wärmepumpe Mindelheim",
    "Wallbox Mindelheim",
    "Gebäudeenergie Mindelheim",
    "Beleuchtungstechnik Mindelheim",
    "Elektroinstallation Allgäu",
    "PV-Anlage Bayern",
    "Energiekonzept Mindelheim",
    "schlüsselfertige PV-Anlage",
  ],
  authors: [{ name: "ALAB Energiesysteme" }],
  creator: "ALAB Energiesysteme",
  publisher: "ALAB Energiesysteme",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "ALAB Energiesysteme",
    title:
      "ALAB Energiesysteme Mindelheim – Ingenieurbüro & Elektrofachbetrieb",
    description:
      "Ihr regionaler Partner aus 87719 Mindelheim für Photovoltaik, Wärmepumpe, Wallbox, Gebäudeenergie und Beleuchtungstechnik. Planung und Ausführung aus einer Hand.",
    images: [
      {
        url: "/img/logo-alab.png",
        width: 1200,
        height: 630,
        alt: "ALAB Energiesysteme – Ingenieurbüro & Elektrofachbetrieb Mindelheim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ALAB Energiesysteme Mindelheim – Ingenieurbüro & Elektrofachbetrieb",
    description:
      "Photovoltaik, Wärmepumpe, Wallbox, Gebäudeenergie & Beleuchtungstechnik aus 87719 Mindelheim. Planung und Ausführung aus einer Hand.",
    images: ["/img/logo-alab.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Energietechnik",
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  appleWebApp: {
    title: "ALAB Energiesysteme",
    statusBarStyle: "default",
    capable: true,
  },
  // TODO: Verification-Codes hier eintragen, sobald Search Console / Bing Webmaster eingerichtet:
  // verification: {
  //   google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  //   other: { "msvalidate.01": "BING_VERIFICATION_CODE" },
  // },
};

export const viewport: Viewport = {
  themeColor: "#0f2533",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Electrician"],
  "@id": `${SITE_URL}/#organization`,
  name: "ALAB Energiesysteme",
  legalName: "ALAB Energiesysteme e. K.",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo-alab.png`,
  image: `${SITE_URL}/img/logo-alab.png`,
  description:
    "Ingenieurbüro und zertifizierter Elektrofachbetrieb aus Mindelheim. Planung und schlüsselfertige Umsetzung von Photovoltaik, Wärmepumpen, Wallboxen, Gebäudeenergie und Beleuchtungstechnik.",
  telephone: "+49 8261 7597176",
  email: "info@alabenergiesysteme.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kastanienweg 6",
    postalCode: "87719",
    addressLocality: "Mindelheim",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.0445,
    longitude: 10.4889,
  },
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "State", name: "Bayern" },
    { "@type": "City", name: "Mindelheim" },
    { "@type": "City", name: "Memmingen" },
    { "@type": "City", name: "Kaufbeuren" },
    { "@type": "City", name: "Augsburg" },
    { "@type": "City", name: "Kempten" },
  ],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungsspektrum ALAB Energiesysteme",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Photovoltaik für Einfamilienhäuser",
          url: `${SITE_URL}/pv-zuhause`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Photovoltaik für Gewerbe & Industrie",
          url: `${SITE_URL}/gewerbliche-loesungen`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wärmepumpen (Luft-Wasser)",
          url: `${SITE_URL}/waermepumpen`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wallboxen & Ladeinfrastruktur",
          url: `${SITE_URL}/wallbox`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gebäudeenergie & Elektroinstallation",
          url: `${SITE_URL}/gebaeudeenergie`,
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={montserrat.variable}>
      <head>
        {/* Performance: schon einmal die Verbindung zu kritischen Drittanbietern aufbauen */}
        <link rel="preconnect" href="https://hook.eu2.make.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://hook.eu2.make.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body>
        {children}
        <Footer />
        <AngebotLightbox />
      </body>
    </html>
  );
}
