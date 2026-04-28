"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";

const LOGO_URL = "/img/logo-alab.png";

/* ── Types ── */

interface SubItem {
  title: string;
  description: string;
  image: string;
  href: string;
  imageScale?: number;
  children?: ChildItem[];
}

interface ChildItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

interface NavItem {
  label: string;
  href: string;
  mega?: SubItem[];
}

/* ── Data ── */

const NAV_ITEMS: NavItem[] = [
  {
    label: "Privatkunden",
    href: "/privatkunden",
    mega: [
      {
        title: "Photovoltaik",
        description: "Solarstrom für Ihr Eigenheim.",
        image:
          "https://static.wixstatic.com/media/cac2b9_f3dd33c675904fe68c45c728fa9df2dc~mv2.jpeg",
        href: "/pv-zuhause",
        imageScale: 1.8,
      },
      {
        title: "Wallboxen",
        description: "Ladelösungen für Ihr Elektrofahrzeug.",
        image: "/wallbox-bild.png",
        href: "/wallbox",
      },
      {
        title: "Wärmepumpen",
        description: "Effiziente Heizlösungen für Ihr Zuhause.",
        image: "/waermepumpe-bosch.jpg",
        href: "/waermepumpen",
        imageScale: 1.8,
      },
      {
        title: "Gebäudeenergie",
        description: "Energielösungen für Ihr Gebäude.",
        image: "/gebaeudeenergie-bild.png",
        href: "/gebaeudeenergie",
        imageScale: 1.8,
      },
      {
        title: "Beleuchtungstechnik",
        description: "Professionelle Lichtplanung & Installation.",
        image: "/beleuchtungstechnik-restaurant.png",
        href: "/beleuchtungstechnik",
        imageScale: 1.8,
      },
    ],
  },
  {
    label: "Geschäftskunden",
    href: "/geschaeftskunden",
    mega: [
{
        title: "Ladesäulen",
        description: "Ladeinfrastruktur für Ihren Betrieb.",
        image: "/ladesaeulen-header.png",
        href: "/ladesaeulen",
        imageScale: 1.8,
      },
      {
        title: "Photovoltaik",
        description: "Solaranlagen für gewerbliche Nutzung.",
        image: "/assets/img/referenzen-gewerbe/anlage10_G.avif",
        href: "/gewerbliche-loesungen",
        imageScale: 1.8,
        children: [
          { title: "Photovoltaik", href: "/gewerbliche-loesungen" },
          {
            title: "Servicepakete für Ihre PV-Anlage",
            href: "/servicepakete",
            children: [
              { title: "Servicepakete", href: "/servicepakete" },
              { title: "Montage", href: "/montage" },
              { title: "Wartung", href: "/wartung" },
              { title: "Anlagenmonitoring", href: "/monitoring" },
            ],
          },
        ],
      },
    ],
  },
  { label: "Dachverpachtung", href: "/dachverpachtung" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

/* ── Component ── */

/* Map pathnames to nav labels for active highlighting */
const PATH_TO_LABEL: Record<string, string> = {
  "/gebaeudeenergie": "Geschäftskunden",
  "/gewerbliche-loesungen": "Geschäftskunden",
  "/privatkunden": "Privatkunden",
  "/servicepakete": "Geschäftskunden",
  "/montage": "Geschäftskunden",
  "/wartung": "Geschäftskunden",
  "/monitoring": "Geschäftskunden",
  "/ladesaeulen": "Geschäftskunden",
  "/beleuchtungstechnik": "Privatkunden",
  "/dachverpachtung": "Dachverpachtung",
  "/ueber-uns": "Über uns",
  "/kontakt": "Kontakt",
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [activeSubFlyout, setActiveSubFlyout] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [mobileSubAccordion, setMobileSubAccordion] = useState<string | null>(
    null
  );
  const [scrolled, setScrolled] = useState(false);
  const [activeLevel3, setActiveLevel3] = useState<string | null>(null);
  const level3Timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Determine which nav item is "active" based on current path */
  const activeLabel = PATH_TO_LABEL[pathname] ?? null;
  const megaTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );
  const subFlyoutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  /* Scroll detection for header shrink */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMega(null);
        setActiveSubFlyout(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  function handleMegaEnter(label: string) {
    clearTimeout(megaTimeouts.current[label]);
    setActiveMega(label);
    setActiveSubFlyout(null);
  }

  function handleMegaLeave(label: string) {
    megaTimeouts.current[label] = setTimeout(() => {
      setActiveMega((prev) => (prev === label ? null : prev));
      setActiveSubFlyout(null);
    }, 150);
  }

  /* Compute mega position to never overflow viewport */
  const activeMegaItem = NAV_ITEMS.find((n) => n.label === activeMega);

  return (
    <>
      {/* ─── Desktop Header ─── */}
      <header
        className={`fixed inset-x-0 top-0 z-[4000] transition-all duration-500 ${
          scrolled
            ? "border-b border-[#e5edf5] bg-white/95 shadow-[0_2px_12px_-4px_rgba(15,37,51,0.08)] backdrop-blur-2xl"
            : "border-b border-[#e5edf5] bg-white/85 backdrop-blur-xl"
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
            scrolled ? "min-h-[84px] py-3" : "min-h-[96px] py-4"
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="relative z-10 mr-4 flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02] lg:mr-6"
          >
            <img
              src={LOGO_URL}
              alt="ALAB Energiesysteme Logo"
              style={{
                display: "block",
                height: scrolled ? "60px" : "72px",
                width: "auto",
                maxWidth: "240px",
                transition: "height .5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:block" aria-label="Hauptnavigation">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={
                    item.mega ? () => handleMegaEnter(item.label) : undefined
                  }
                  onMouseLeave={
                    item.mega ? () => handleMegaLeave(item.label) : undefined
                  }
                >
                  <a
                    href={item.href}
                    className={`group relative flex h-10 items-center whitespace-nowrap rounded-full px-4 text-[13.5px] font-semibold tracking-[-0.005em] transition-all duration-300 ${
                      activeLabel === item.label
                        ? "text-accent"
                        : activeMega === item.label
                        ? "bg-[#eaf2fb] text-accent"
                        : "text-ink hover:bg-[#f3f7fc] hover:text-accent"
                    }`}
                  >
                    {item.label}
                    {activeLabel === item.label && (
                      <span className="absolute -bottom-1 left-1/2 h-[2.5px] w-[26px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-deep" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Hamburger */}
          <div className="ml-4 flex items-center gap-3 lg:ml-8">
            <a
              href="#angebot"
              data-open-angebot="header-desktop"
              className="group/cta relative hidden h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-deep to-accent px-6 text-[13px] font-bold tracking-[-0.005em] text-white shadow-[0_2px_8px_-2px_rgba(30,79,139,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:from-accent-deep hover:to-accent-deep hover:shadow-[0_6px_16px_-4px_rgba(30,79,139,0.4)] lg:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
              <span className="relative leading-none">Angebot einholen</span>
              <ArrowRight className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-[3px]" strokeWidth={2.4} />
            </a>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5edf5] bg-white transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-ink" />
              ) : (
                <Menu className="h-5 w-5 text-ink" />
              )}
            </button>
          </div>
        </div>

        {/* ─── Full-width Mega Menu Panel ─── */}
        <div
          ref={megaRef}
          className={`absolute inset-x-0 top-full z-[4500] transition-all duration-400 ${
            activeMega && activeMegaItem?.mega
              ? "visible translate-y-0 opacity-100"
              : "invisible max-h-0 -translate-y-2 overflow-hidden opacity-0"
          }`}
          onMouseEnter={() => {
            if (activeMega) {
              clearTimeout(megaTimeouts.current[activeMega]);
            }
          }}
          onMouseLeave={() => {
            if (activeMega) handleMegaLeave(activeMega);
          }}
        >
          <div className="bg-white shadow-[0_16px_40px_-12px_rgba(15,37,51,0.16)]">
            {/* Subtle accent glow line at top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="mx-auto max-w-[1760px] px-6 py-7 lg:px-10">
              {activeMegaItem?.mega && (
                <div
                  className={`mx-auto grid gap-4 ${
                    activeMegaItem.mega.length === 1
                      ? "max-w-[420px] grid-cols-1"
                      : activeMegaItem.mega.length === 2
                      ? "max-w-[860px] grid-cols-2"
                      : activeMegaItem.mega.length === 3
                      ? "max-w-[1280px] grid-cols-3"
                      : activeMegaItem.mega.length === 4
                      ? "max-w-[1500px] grid-cols-4"
                      : "max-w-[1720px] grid-cols-5"
                  }`}
                >
                  {activeMegaItem.mega.map((sub) => (
                    <div
                      key={sub.title}
                      className="relative"
                      onMouseEnter={() => {
                        if (sub.children) {
                          if (subFlyoutTimeout.current)
                            clearTimeout(subFlyoutTimeout.current);
                          setActiveSubFlyout(sub.title);
                        }
                      }}
                      onMouseLeave={() => {
                        if (sub.children) {
                          subFlyoutTimeout.current = setTimeout(
                            () => setActiveSubFlyout(null),
                            150
                          );
                        }
                      }}
                    >
                      <a
                        href={sub.href && sub.href !== "#" ? sub.href : undefined}
                        onClick={
                          !sub.href || sub.href === "#" ? (e) => e.preventDefault() : undefined
                        }
                        className="group/card relative flex items-center gap-4 overflow-hidden rounded-xl border border-transparent p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e5edf5] hover:bg-[#f3f7fc] hover:shadow-[0_8px_20px_-8px_rgba(15,37,51,0.10)]"
                      >
                        {/* Thumbnail – 112×72, einheitlich für alle Karten */}
                        <div className="relative h-[72px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 ring-1 ring-[#e5edf5] transition-all duration-300 group-hover/card:ring-accent/25">
                          <img
                            src={sub.image}
                            alt={sub.title}
                            style={{ transform: `scale(${sub.imageScale ?? 1.25})` }}
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500"
                          />
                        </div>

                        {/* Text */}
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <strong className="text-[13.5px] font-bold leading-tight tracking-[-0.005em] text-ink transition-colors duration-300 group-hover/card:text-accent">
                            {sub.title}
                          </strong>
                          <p className="mt-1 text-[12px] leading-snug text-muted">
                            {sub.description}
                          </p>
                        </div>
                      </a>

                      {/* Nested sub-menu (Level 2) – opens below, not sideways */}
                      {sub.children && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            activeSubFlyout === sub.title
                              ? "max-h-[600px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="mx-1 mt-1 rounded-xl border border-slate-200/60 bg-gradient-to-b from-slate-50/80 to-white p-2 shadow-[inset_0_1px_2px_rgba(15,37,51,0.03)]">
                            {sub.children.map((child) => (
                              <div key={child.title}>
                                <a
                                  href={child.children ? undefined : child.href}
                                  onClick={child.children ? (e) => {
                                    e.preventDefault();
                                    setActiveLevel3(activeLevel3 === child.title ? null : child.title);
                                  } : undefined}
                                  onMouseEnter={child.children ? () => {
                                    if (level3Timeout.current) clearTimeout(level3Timeout.current);
                                    setActiveLevel3(child.title);
                                  } : undefined}
                                  onMouseLeave={child.children ? () => {
                                    level3Timeout.current = setTimeout(() => setActiveLevel3(null), 200);
                                  } : undefined}
                                  className="group/sub flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-semibold text-ink transition-all duration-200 hover:bg-white hover:text-accent hover:shadow-sm"
                                >
                                  <ChevronRight className="h-3 w-3 text-accent/60 transition-transform duration-200 group-hover/sub:translate-x-0.5" />
                                  {child.title}
                                </a>

                                {/* Level 3 – also inline below */}
                                {child.children && (
                                  <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                      activeLevel3 === child.title
                                        ? "max-h-[400px] opacity-100"
                                        : "max-h-0 opacity-0"
                                    }`}
                                    onMouseEnter={() => {
                                      if (level3Timeout.current) clearTimeout(level3Timeout.current);
                                    }}
                                    onMouseLeave={() => {
                                      level3Timeout.current = setTimeout(() => setActiveLevel3(null), 200);
                                    }}
                                  >
                                    <div className="ml-5 border-l-2 border-accent/20 pl-2 py-1">
                                      {child.children.map((l3) => (
                                        <a
                                          key={l3.title}
                                          href={l3.href}
                                          className="group/l3 flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-medium text-muted transition-all duration-200 hover:bg-white hover:text-accent hover:shadow-sm"
                                        >
                                          <ChevronRight className="h-2.5 w-2.5 text-accent/50 transition-transform duration-200 group-hover/l3:translate-x-0.5" />
                                          {l3.title}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Overlay ─── */}
      <div
        className={`fixed inset-0 z-[5000] transition-all lg:hidden ${
          mobileOpen ? "visible" : "invisible pointer-events-none"
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-ink/40 backdrop-blur-md transition-opacity duration-400 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[min(380px,92vw)] flex-col bg-white shadow-[-20px_0_60px_-20px_rgba(15,37,51,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Hauptmenü"
        >
          {/* Panel header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
            <a href="/" className="transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={LOGO_URL}
                alt="ALAB Logo"
                style={{ display: "block", height: "38px", width: "auto", maxWidth: "120px" }}
              />
            </a>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-ink transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
              onClick={() => setMobileOpen(false)}
              aria-label="Menü schließen"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav items */}
          <nav
            className="flex-1 overflow-y-auto px-2 py-3"
            aria-label="Mobile Navigation"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.mega ? (
                  <>
                    <button
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-semibold tracking-[-0.005em] transition-all duration-300 ${
                        activeLabel === item.label || mobileAccordion === item.label
                          ? "bg-accent/5 text-accent"
                          : "text-ink hover:bg-slate-50 hover:text-accent"
                      }`}
                      onClick={() =>
                        setMobileAccordion(
                          mobileAccordion === item.label ? null : item.label
                        )
                      }
                      aria-expanded={mobileAccordion === item.label}
                    >
                      {item.label}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          mobileAccordion === item.label ? "rotate-90 text-accent" : "text-slate-400"
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-[400ms] ease-in-out ${
                        mobileAccordion === item.label
                          ? "max-h-[800px]"
                          : "max-h-0"
                      }`}
                    >
                      <div className="space-y-1 py-2 pl-3 pr-1">
                        {item.mega.map((sub) =>
                          sub.children ? (
                            <div key={sub.title}>
                              <button
                                className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-all duration-300 hover:border-slate-200/60 hover:bg-white hover:shadow-sm"
                                onClick={() =>
                                  setMobileSubAccordion(
                                    mobileSubAccordion === sub.title
                                      ? null
                                      : sub.title
                                  )
                                }
                              >
                                <div className="relative h-12 w-[68px] shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 ring-1 ring-slate-200/60">
                                  <img
                                    src={sub.image}
                                    alt=""
                                    style={{ transform: `scale(${sub.imageScale ?? 1.25})` }}
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <strong className="flex items-center gap-1 text-[13.5px] font-bold tracking-[-0.005em] text-ink">
                                    {sub.title}
                                  </strong>
                                  <span className="text-[11.5px] text-muted">
                                    {sub.description}
                                  </span>
                                </div>
                                <ChevronRight
                                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                                    mobileSubAccordion === sub.title ? "rotate-90 text-accent" : "text-slate-400"
                                  }`}
                                />
                              </button>
                              <div
                                className={`overflow-hidden transition-[max-height] duration-300 ${
                                  mobileSubAccordion === sub.title
                                    ? "max-h-[600px]"
                                    : "max-h-0"
                                }`}
                              >
                                {sub.children.map((child) =>
                                  child.children ? (
                                    <div key={child.title}>
                                      <button
                                        className="flex w-full items-center gap-2 rounded-lg py-2 pl-[68px] pr-3 text-left text-[13px] font-semibold text-ink transition-colors hover:text-accent"
                                        onClick={() =>
                                          setActiveLevel3(
                                            activeLevel3 === child.title ? null : child.title
                                          )
                                        }
                                      >
                                        <ChevronRight className="h-3 w-3 text-accent/50" />
                                        {child.title}
                                      </button>
                                      <div
                                        className={`overflow-hidden transition-[max-height] duration-300 ${
                                          activeLevel3 === child.title ? "max-h-[300px]" : "max-h-0"
                                        }`}
                                      >
                                        {child.children.map((l3) => (
                                          <a
                                            key={l3.title}
                                            href={l3.href}
                                            className="flex items-center gap-2 rounded-lg py-2 pl-[92px] pr-3 text-[12px] font-medium text-muted transition-colors hover:text-accent"
                                          >
                                            <ChevronRight className="h-2.5 w-2.5 text-accent/40" />
                                            {l3.title}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <a
                                      key={child.title}
                                      href={child.href}
                                      className="flex items-center gap-2 rounded-lg py-2 pl-[68px] pr-3 text-[13px] font-semibold text-ink transition-colors hover:text-accent"
                                    >
                                      <ChevronRight className="h-3 w-3 text-accent/50" />
                                      {child.title}
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          ) : (
                            <a
                              key={sub.title}
                              href={sub.href}
                              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300 hover:border-slate-200/60 hover:bg-white hover:shadow-sm"
                            >
                              <div className="relative h-12 w-[68px] shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 ring-1 ring-slate-200/60">
                                <img
                                  src={sub.image}
                                  alt=""
                                  style={{ transform: `scale(${sub.imageScale ?? 1.25})` }}
                                  className="absolute inset-0 h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <strong className="block text-[13.5px] font-bold leading-tight tracking-[-0.005em] text-ink">
                                  {sub.title}
                                </strong>
                                <span className="text-[11.5px] text-muted">
                                  {sub.description}
                                </span>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold tracking-[-0.005em] text-ink transition-all duration-300 hover:bg-slate-50 hover:text-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="shrink-0 border-t border-slate-100 p-5">
            <a
              href="#angebot"
              data-open-angebot="header-mobile"
              className="group/mcta flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent-deep px-5 py-3.5 text-[14px] font-bold tracking-[-0.005em] text-white shadow-[0_4px_16px_-2px_var(--color-accent-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_var(--color-accent-glow)]"
              onClick={() => setMobileOpen(false)}
            >
              Angebot einholen
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/mcta:translate-x-0.5" />
            </a>
          </div>

        </aside>
      </div>
    </>
  );
}
