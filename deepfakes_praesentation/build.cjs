/* Deepfakes – Präsentation (politische Bildung)
   Dunkles "Tech/Warnung"-Design, Cyan + Rosé Akzente, Linsen-/Augen-Motiv. */

const GMOD = "C:/Users/arben/AppData/Roaming/npm/node_modules/";
const pptxgen = require(GMOD + "pptxgenjs");
const React = require(GMOD + "react");
const ReactDOMServer = require(GMOD + "react-dom/server");
const sharp = require(GMOD + "sharp");
const FA = require(GMOD + "react-icons/fa");

// ---------- Farben ----------
const C = {
  bg:     "0A0E1A",   // tiefstes Dunkelblau
  bg2:    "121A2E",   // Panel
  bg3:    "1B2742",   // helleres Panel
  line:   "26324F",   // feine Trennlinien / Rahmen
  cyan:   "22D3EE",   // Akzent: KI / digital
  cyanDk: "0E7490",
  rose:   "FB5C7D",   // Warnung / Gefahr
  roseDk: "9F1239",
  amber:  "F6B73C",   // sekundäre Warnung / Politik
  green:  "34D399",   // Lösung / positiv
  text:   "F1F5F9",
  muted:  "9FB0C7",
  muted2: "64748B",
};

// ---------- Icon-Rasterung ----------
async function iconPng(Icon, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

const ICONS = {};
async function loadIcons() {
  const map = {
    masks: FA.FaTheaterMasks, news: FA.FaNewspaper, robot: FA.FaRobot,
    image: FA.FaImage, video: FA.FaVideo, mic: FA.FaMicrophone,
    network: FA.FaNetworkWired, magic: FA.FaMagic, search: FA.FaSearch,
    chart: FA.FaChartLine, vote: FA.FaVoteYea, landmark: FA.FaLandmark,
    bullhorn: FA.FaBullhorn, share: FA.FaShareAlt, bolt: FA.FaBolt,
    clock: FA.FaClock, eye: FA.FaEye, bulb: FA.FaLightbulb, link: FA.FaLink,
    scale: FA.FaBalanceScale, shield: FA.FaShieldAlt, cap: FA.FaGraduationCap,
    quote: FA.FaQuoteLeft, question: FA.FaQuestion, warn: FA.FaExclamationTriangle,
    check: FA.FaCheckCircle, book: FA.FaBook, secret: FA.FaUserSecret,
    finger: FA.FaFingerprint, heart: FA.FaHeart, brain: FA.FaBrain,
  };
  for (const [k, Comp] of Object.entries(map)) {
    ICONS[k] = {
      cyan:  await iconPng(Comp, "#22D3EE"),
      rose:  await iconPng(Comp, "#FB5C7D"),
      amber: await iconPng(Comp, "#F6B73C"),
      green: await iconPng(Comp, "#34D399"),
      dark:  await iconPng(Comp, "#0A0E1A"),
      white: await iconPng(Comp, "#F1F5F9"),
    };
  }
}

// ---------- Helfer ----------
const softShadow = () => ({ type: "outer", color: "000000", blur: 12, offset: 4, angle: 90, opacity: 0.45 });
const PW = 13.333, PH = 7.5, ML = 0.7, MR = 0.7;
const CW = PW - ML - MR;

let pres;

function ring(slide, cx, cy, r, color, width, transp = 0) {
  slide.addShape(pres.shapes.OVAL, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: "FFFFFF", transparency: 100 },
    line: { color, width }, ...(transp ? {} : {}),
  });
}

// dekoratives Linsen-/Augen-Motiv
function lensMotif(slide, cx, cy, scale = 1, accent = C.cyan) {
  ring(slide, cx, cy, 2.05 * scale, C.line, 1);
  ring(slide, cx, cy, 1.5 * scale, accent, 1.25);
  ring(slide, cx, cy, 0.95 * scale, C.line, 1);
  slide.addShape(pres.shapes.OVAL, {
    x: cx - 0.42 * scale, y: cy - 0.42 * scale, w: 0.84 * scale, h: 0.84 * scale,
    fill: { color: accent, transparency: 18 }, line: { color: accent, width: 1.25 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: cx - 0.12 * scale, y: cy - 0.12 * scale, w: 0.24 * scale, h: 0.24 * scale,
    fill: { color: accent },
  });
}

function footer(slide, n) {
  slide.addShape(pres.shapes.LINE, { x: ML, y: 7.04, w: CW, h: 0, line: { color: C.line, width: 1 } });
  slide.addText("DEEPFAKES · WENN DER SCHEIN TRÜGT", {
    x: ML, y: 7.08, w: 8, h: 0.3, fontFace: "Calibri", fontSize: 9,
    color: C.muted2, charSpacing: 2, align: "left", valign: "middle", margin: 0,
  });
  slide.addText(String(n).padStart(2, "0"), {
    x: PW - MR - 1, y: 7.08, w: 1, h: 0.3, fontFace: "Trebuchet MS", fontSize: 10,
    color: C.cyan, bold: true, align: "right", valign: "middle", margin: 0,
  });
}

// Standard-Kopf: Kicker + Titel
function header(slide, kicker, title, accent = C.cyan) {
  slide.addShape(pres.shapes.RECTANGLE, { x: ML, y: 0.62, w: 0.34, h: 0.05, fill: { color: accent } });
  slide.addText(kicker.toUpperCase(), {
    x: ML + 0.46, y: 0.5, w: CW - 0.46, h: 0.3, fontFace: "Trebuchet MS", fontSize: 12,
    color: accent, bold: true, charSpacing: 3, align: "left", valign: "middle", margin: 0,
  });
  slide.addText(title, {
    x: ML, y: 0.86, w: CW, h: 0.85, fontFace: "Trebuchet MS", fontSize: 30,
    color: C.text, bold: true, align: "left", valign: "middle", margin: 0,
  });
}

function newSlide(bg = C.bg) {
  const s = pres.addSlide();
  s.background = { color: bg };
  return s;
}

// Karte mit Icon-Kreis, Titel, Text
function iconCard(slide, o) {
  const { x, y, w, h, icon, accent, title, body, fill = C.bg2 } = o;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.09, fill: { color: fill },
    line: { color: C.line, width: 1 }, shadow: softShadow(),
  });
  const cd = 0.62;
  slide.addShape(pres.shapes.OVAL, {
    x: x + 0.28, y: y + 0.28, w: cd, h: cd, fill: { color: accent, transparency: 84 },
    line: { color: accent, width: 1 },
  });
  slide.addImage({ data: icon, x: x + 0.28 + cd * 0.27, y: y + 0.28 + cd * 0.27, w: cd * 0.46, h: cd * 0.46 });
  slide.addText(title, {
    x: x + 0.28 + cd + 0.2, y: y + 0.26, w: w - (0.28 + cd + 0.2) - 0.24, h: cd, fontFace: "Trebuchet MS",
    fontSize: 14.5, bold: true, color: C.text, align: "left", valign: "middle", margin: 0,
  });
  if (body) {
    slide.addText(body, {
      x: x + 0.3, y: y + 0.28 + cd + 0.12, w: w - 0.6, h: h - (0.28 + cd + 0.12) - 0.22,
      fontFace: "Calibri", fontSize: 12.5, color: C.muted, align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.04,
    });
  }
}

// ============================================================
async function build() {
  pres = new pptxgen();
  pres.defineLayout({ name: "W", width: 13.333, height: 7.5 });
  pres.layout = "W";
  pres.author = "Referat politische Bildung";
  pres.title = "Deepfakes – Wenn der Schein trügt";

  // ---------- 1 · TITEL ----------
  {
    const s = newSlide(C.bg);
    // dezentes Panel-Raster oben
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: PW, h: 0.16, fill: { color: C.cyan } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.16, w: PW, h: 0.04, fill: { color: C.rose } });
    lensMotif(s, 10.95, 3.65, 1.18, C.cyan);

    s.addText("PRÄSENTATION · POLITISCHE BILDUNG · 2026", {
      x: ML, y: 1.5, w: 9, h: 0.4, fontFace: "Trebuchet MS", fontSize: 13.5, color: C.cyan,
      bold: true, charSpacing: 3, align: "left", valign: "middle", margin: 0,
    });
    s.addText("DEEPFAKES", {
      x: ML - 0.04, y: 2.0, w: 9.4, h: 1.5, fontFace: "Trebuchet MS", fontSize: 88,
      color: C.text, bold: true, charSpacing: 1, align: "left", valign: "middle", margin: 0,
    });
    s.addText("Wenn der Schein trügt", {
      x: ML, y: 3.55, w: 9, h: 0.6, fontFace: "Georgia", fontSize: 26, italic: true,
      color: C.rose, align: "left", valign: "middle", margin: 0,
    });
    s.addText("Künstliche Intelligenz, Manipulation und die Frage nach der Wahrheit", {
      x: ML, y: 4.18, w: 8.6, h: 0.5, fontFace: "Calibri", fontSize: 16, color: C.muted,
      align: "left", valign: "middle", margin: 0,
    });

    // Frage-Karte
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: ML, y: 5.0, w: 8.7, h: 1.25, rectRadius: 0.1, fill: { color: C.bg2 },
      line: { color: C.cyanDk, width: 1 }, shadow: softShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, { x: ML, y: 5.0, w: 0.09, h: 1.25, fill: { color: C.cyan } });
    s.addText("LEITFRAGE", {
      x: ML + 0.32, y: 5.18, w: 8, h: 0.3, fontFace: "Trebuchet MS", fontSize: 11, bold: true,
      color: C.cyan, charSpacing: 2, align: "left", valign: "middle", margin: 0,
    });
    s.addText("Gefährden Deepfakes unsere Fähigkeit, Wahrheit von Manipulation zu unterscheiden?", {
      x: ML + 0.32, y: 5.46, w: 8.1, h: 0.7, fontFace: "Georgia", fontSize: 16.5, italic: true,
      color: C.text, align: "left", valign: "middle", margin: 0,
    });

    s.addText("Vorgelegt von: [Dein Name]   ·   Fach: [Fach]   ·   [Datum]", {
      x: ML, y: 6.55, w: 9, h: 0.35, fontFace: "Calibri", fontSize: 12, color: C.muted2,
      align: "left", valign: "middle", margin: 0,
    });
  }

  // ---------- 2 · AUFHÄNGER ----------
  {
    const s = newSlide();
    header(s, "Aufhänger", "Der Auslöser: ein Artikel der bpb", C.cyan);

    // linke Spalte: Text
    const lx = ML, lw = 6.7;
    s.addText([
      { text: "Die ", options: {} },
      { text: "Bundeszentrale für politische Bildung (bpb)", options: { bold: true, color: C.text } },
      { text: " widmet Deepfakes ein eigenes Dossier: ", options: {} },
      { text: "„Wenn der Schein trügt – Deepfakes und die politische Realität“.", options: { italic: true, color: C.cyan } },
    ], { x: lx, y: 1.95, w: lw, h: 1.1, fontFace: "Calibri", fontSize: 16, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });

    const pts = [
      ["KI wird immer besser", "Die Qualität künstlich erzeugter Inhalte nimmt rasant zu – Fälschungen sind kaum noch zu erkennen."],
      ["Einfluss auf die Meinung", "Manipulierte Videos und Töne können beeinflussen, was Menschen glauben und wählen."],
      ["Jeder ist betroffen", "KI-Werkzeuge sind frei zugänglich – nicht mehr nur Experten können täuschend echte Fälschungen erstellen."],
    ];
    let yy = 3.15;
    pts.forEach(([t, b], i) => {
      const accent = [C.cyan, C.rose, C.amber][i];
      s.addShape(pres.shapes.OVAL, { x: lx, y: yy, w: 0.34, h: 0.34, fill: { color: accent } });
      s.addText(String(i + 1), { x: lx, y: yy, w: 0.34, h: 0.34, fontFace: "Trebuchet MS", fontSize: 14, bold: true, color: C.bg, align: "center", valign: "middle", margin: 0 });
      s.addText([
        { text: t + "  ", options: { bold: true, color: C.text, fontSize: 15 } },
        { text: b, options: { color: C.muted, fontSize: 13 } },
      ], { x: lx + 0.5, y: yy - 0.06, w: lw - 0.5, h: 1.0, fontFace: "Calibri", align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
      yy += 1.12;
    });

    // rechte Spalte: Zitat-Karte
    const rx = 7.85, rw = PW - MR - rx;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 1.95, w: rw, h: 4.55, rectRadius: 0.1, fill: { color: C.bg2 }, line: { color: C.line, width: 1 }, shadow: softShadow() });
    s.addShape(pres.shapes.OVAL, { x: rx + 0.35, y: 2.3, w: 0.7, h: 0.7, fill: { color: C.cyan, transparency: 84 }, line: { color: C.cyan, width: 1 } });
    s.addImage({ data: ICONS.quote.cyan, x: rx + 0.52, y: 2.47, w: 0.36, h: 0.36 });
    s.addText("Deepfakes machen Medien­manipulation schneller, einfacher, zugänglicher – und überzeugender als je zuvor.", {
      x: rx + 0.35, y: 3.25, w: rw - 0.7, h: 1.8, fontFace: "Georgia", fontSize: 19, italic: true, color: C.text, align: "left", valign: "top", lineSpacingMultiple: 1.1, margin: 0,
    });
    s.addShape(pres.shapes.LINE, { x: rx + 0.35, y: 5.55, w: rw - 0.7, h: 0, line: { color: C.line, width: 1 } });
    s.addText("Sinngemäß nach: bpb – Dossier zu Deepfakes (2024)", {
      x: rx + 0.35, y: 5.7, w: rw - 0.7, h: 0.6, fontFace: "Calibri", fontSize: 11.5, color: C.muted2, align: "left", valign: "top", margin: 0,
    });
    footer(s, 2);
  }

  // ---------- 3 · WAS SIND DEEPFAKES ----------
  {
    const s = newSlide();
    header(s, "Grundlagen", "Was sind Deepfakes?", C.cyan);

    s.addText([
      { text: "Deepfakes", options: { bold: true, color: C.cyan } },
      { text: " sind mit künstlicher Intelligenz erzeugte oder veränderte ", options: {} },
      { text: "Bilder, Videos und Tonaufnahmen", options: { bold: true, color: C.text } },
      { text: ", die eine reale Person so täuschend echt nachahmen, dass sie kaum von echten Aufnahmen zu unterscheiden sind.", options: {} },
    ], { x: ML, y: 1.95, w: 8.4, h: 1.3, fontFace: "Calibri", fontSize: 16.5, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.15, margin: 0 });

    // Wortherkunft-Karte
    const wx = 9.35, ww = PW - MR - wx;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: wx, y: 1.95, w: ww, h: 1.95, rectRadius: 0.09, fill: { color: C.bg2 }, line: { color: C.line, width: 1 } });
    s.addText("WORTHERKUNFT", { x: wx + 0.25, y: 2.12, w: ww - 0.5, h: 0.3, fontFace: "Trebuchet MS", fontSize: 10.5, bold: true, color: C.amber, charSpacing: 2, align: "left", valign: "middle", margin: 0 });
    s.addText([
      { text: "Deep Learning", options: { bold: true, color: C.cyan, fontSize: 16 } },
      { text: "  (lernende KI)", options: { color: C.muted, fontSize: 12 } },
    ], { x: wx + 0.25, y: 2.5, w: ww - 0.5, h: 0.4, fontFace: "Calibri", align: "left", valign: "middle", margin: 0 });
    s.addText("+", { x: wx + 0.25, y: 2.95, w: ww - 0.5, h: 0.3, fontFace: "Trebuchet MS", fontSize: 16, bold: true, color: C.muted2, align: "left", valign: "middle", margin: 0 });
    s.addText([
      { text: "Fake", options: { bold: true, color: C.rose, fontSize: 16 } },
      { text: "  (Fälschung)", options: { color: C.muted, fontSize: 12 } },
    ], { x: wx + 0.25, y: 3.28, w: ww - 0.5, h: 0.4, fontFace: "Calibri", align: "left", valign: "middle", margin: 0 });

    // drei Formate
    const cards = [
      { icon: ICONS.image.cyan, accent: C.cyan, title: "Bilder", body: "Gesichter werden getauscht oder komplett erfunden – Menschen, die es nie gab." },
      { icon: ICONS.video.rose, accent: C.rose, title: "Videos", body: "Mimik und Lippen­bewegungen werden so verändert, dass Personen Dinge „sagen“, die sie nie gesagt haben." },
      { icon: ICONS.mic.amber, accent: C.amber, title: "Audio", body: "Stimmen werden geklont – schon wenige Sekunden Material genügen für eine täuschende Kopie." },
    ];
    const gy = 4.25, gh = 2.35, gap = 0.35, cw = (CW - 2 * gap) / 3;
    cards.forEach((c, i) => {
      iconCard(s, { x: ML + i * (cw + gap), y: gy, w: cw, h: gh, ...c });
    });
    footer(s, 3);
  }

  // ---------- 4 · WIE FUNKTIONIEREN SIE (GAN) ----------
  {
    const s = newSlide();
    header(s, "Technik", "Wie entstehen Deepfakes?", C.cyan);

    s.addText([
      { text: "Im Kern arbeiten zwei KI-Systeme gegeneinander – ein ", options: {} },
      { text: "„Generatives gegnerisches Netzwerk“ (GAN)", options: { bold: true, color: C.cyan } },
      { text: ". Sie trainieren sich gegenseitig, bis die Fälschung perfekt wirkt.", options: {} },
    ], { x: ML, y: 1.9, w: CW, h: 0.7, fontFace: "Calibri", fontSize: 16, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.1, margin: 0 });

    // zwei Akteur-Karten + Pfeile
    const boxY = 2.95, boxH = 1.95, boxW = 4.35;
    // Generator
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ML, y: boxY, w: boxW, h: boxH, rectRadius: 0.1, fill: { color: C.bg2 }, line: { color: C.cyan, width: 1.25 }, shadow: softShadow() });
    s.addShape(pres.shapes.OVAL, { x: ML + 0.32, y: boxY + 0.32, w: 0.72, h: 0.72, fill: { color: C.cyan, transparency: 82 }, line: { color: C.cyan, width: 1 } });
    s.addImage({ data: ICONS.magic.cyan, x: ML + 0.32 + 0.2, y: boxY + 0.32 + 0.2, w: 0.32, h: 0.32 });
    s.addText("GENERATOR", { x: ML + 1.2, y: boxY + 0.34, w: boxW - 1.4, h: 0.35, fontFace: "Trebuchet MS", fontSize: 15, bold: true, color: C.cyan, align: "left", valign: "middle", margin: 0 });
    s.addText("„Der Fälscher“", { x: ML + 1.2, y: boxY + 0.68, w: boxW - 1.4, h: 0.3, fontFace: "Calibri", fontSize: 12, italic: true, color: C.muted, align: "left", valign: "middle", margin: 0 });
    s.addText("Erzeugt neue, gefälschte Bilder und versucht, den Prüfer zu täuschen.", { x: ML + 0.35, y: boxY + 1.18, w: boxW - 0.7, h: 0.65, fontFace: "Calibri", fontSize: 13, color: C.text, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });

    // Diskriminator
    const dx = ML + boxW + 0.5 + boxW - boxW; // placeholder
    const disX = PW - MR - boxW;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: disX, y: boxY, w: boxW, h: boxH, rectRadius: 0.1, fill: { color: C.bg2 }, line: { color: C.rose, width: 1.25 }, shadow: softShadow() });
    s.addShape(pres.shapes.OVAL, { x: disX + 0.32, y: boxY + 0.32, w: 0.72, h: 0.72, fill: { color: C.rose, transparency: 82 }, line: { color: C.rose, width: 1 } });
    s.addImage({ data: ICONS.search.rose, x: disX + 0.32 + 0.2, y: boxY + 0.32 + 0.2, w: 0.32, h: 0.32 });
    s.addText("DISKRIMINATOR", { x: disX + 1.2, y: boxY + 0.34, w: boxW - 1.4, h: 0.35, fontFace: "Trebuchet MS", fontSize: 15, bold: true, color: C.rose, align: "left", valign: "middle", margin: 0 });
    s.addText("„Der Prüfer“", { x: disX + 1.2, y: boxY + 0.68, w: boxW - 1.4, h: 0.3, fontFace: "Calibri", fontSize: 12, italic: true, color: C.muted, align: "left", valign: "middle", margin: 0 });
    s.addText("Vergleicht mit echten Daten und entlarvt die Fälschung – so lange es geht.", { x: disX + 0.35, y: boxY + 1.18, w: boxW - 0.7, h: 0.65, fontFace: "Calibri", fontSize: 13, color: C.text, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });

    // Mitte: Wettstreit
    const midX = ML + boxW, midW = disX - (ML + boxW);
    s.addShape(pres.shapes.OVAL, { x: midX + midW / 2 - 0.5, y: boxY + boxH / 2 - 0.5, w: 1.0, h: 1.0, fill: { color: C.bg3 }, line: { color: C.amber, width: 1.25 }, shadow: softShadow() });
    s.addImage({ data: ICONS.network.amber, x: midX + midW / 2 - 0.26, y: boxY + boxH / 2 - 0.26, w: 0.52, h: 0.52 });
    s.addShape(pres.shapes.LINE, { x: ML + boxW, y: boxY + boxH / 2, w: midW / 2 - 0.5, h: 0, line: { color: C.muted2, width: 1.5, endArrowType: "triangle" } });
    s.addShape(pres.shapes.LINE, { x: midX + midW / 2 + 0.5, y: boxY + boxH / 2, w: midW / 2 - 0.5, h: 0, line: { color: C.muted2, width: 1.5, beginArrowType: "triangle" } });
    s.addText("Wettstreit", { x: midX, y: boxY + boxH / 2 + 0.55, w: midW, h: 0.3, fontFace: "Trebuchet MS", fontSize: 11, bold: true, color: C.amber, align: "center", valign: "middle", charSpacing: 1, margin: 0 });

    // Ergebnis-Leiste
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ML, y: 5.35, w: CW, h: 1.1, rectRadius: 0.1, fill: { color: C.roseDk, transparency: 80 }, line: { color: C.rose, width: 1 } });
    s.addShape(pres.shapes.OVAL, { x: ML + 0.3, y: 5.62, w: 0.56, h: 0.56, fill: { color: C.rose } });
    s.addImage({ data: ICONS.warn.dark, x: ML + 0.3 + 0.15, y: 5.62 + 0.15, w: 0.26, h: 0.26 });
    s.addText([
      { text: "Das Ergebnis:  ", options: { bold: true, color: C.rose, fontSize: 15 } },
      { text: "Mit jeder Runde wird die Fälschung besser. Heute reichen oft schon wenige Fotos oder Sekunden Tonmaterial – frei verfügbare Apps erledigen den Rest.", options: { color: C.text, fontSize: 14 } },
    ], { x: ML + 1.1, y: 5.45, w: CW - 1.4, h: 0.9, fontFace: "Calibri", align: "left", valign: "middle", lineSpacingMultiple: 1.05, margin: 0 });

    footer(s, 4);
  }

  // ---------- 5 · ZAHLEN & FAKTEN ----------
  {
    const s = newSlide();
    header(s, "Zahlen & Fakten", "Ein Problem, das explodiert", C.amber);

    const stats = [
      { big: "+500 %", fs: 33, lbl: "mehr Deepfake-Vorfälle 2025 gegenüber dem Vorjahr", accent: C.rose, icon: ICONS.chart.rose },
      { big: "1,1 Mrd $", fs: 25, lbl: "weltweiter Schaden durch KI-gestützten Betrug allein 2025", accent: C.amber, icon: ICONS.warn.amber },
      { big: "32 %", fs: 33, lbl: "der Deepfake-Opfer stammen aus der Politik – die meistbetroffene Gruppe", accent: C.cyan, icon: ICONS.landmark.cyan },
      { big: "nur 34 %", fs: 30, lbl: "der Menschen in Deutschland wissen überhaupt, was Deepfakes sind", accent: C.green, icon: ICONS.eye.green },
    ];
    const gy = 2.05, gh = 2.25, gap = 0.35, cw = (CW - 3 * gap) / 4;
    stats.forEach((st, i) => {
      const x = ML + i * (cw + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: gy, w: cw, h: gh, rectRadius: 0.1, fill: { color: C.bg2 }, line: { color: C.line, width: 1 }, shadow: softShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: gy, w: cw, h: 0.08, fill: { color: st.accent } });
      s.addShape(pres.shapes.OVAL, { x: x + 0.28, y: gy + 0.32, w: 0.56, h: 0.56, fill: { color: st.accent, transparency: 84 }, line: { color: st.accent, width: 1 } });
      s.addImage({ data: st.icon, x: x + 0.28 + 0.15, y: gy + 0.32 + 0.15, w: 0.26, h: 0.26 });
      s.addText(st.big, { x: x + 0.22, y: gy + 0.95, w: cw - 0.36, h: 0.7, fontFace: "Trebuchet MS", fontSize: st.fs, bold: true, color: st.accent, align: "left", valign: "middle", margin: 0 });
      s.addText(st.lbl, { x: x + 0.24, y: gy + 1.6, w: cw - 0.48, h: 0.6, fontFace: "Calibri", fontSize: 11.5, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.0, margin: 0 });
    });

    // Bewusstsein-Verlauf (Chart)
    s.addText("Bewusstsein wächst – aber langsam", { x: ML, y: 4.55, w: 5.5, h: 0.35, fontFace: "Trebuchet MS", fontSize: 14, bold: true, color: C.text, align: "left", valign: "middle", margin: 0 });
    s.addText("Anteil der Verbraucher, die wissen, was ein Deepfake ist", { x: ML, y: 4.88, w: 5.5, h: 0.3, fontFace: "Calibri", fontSize: 11.5, color: C.muted2, align: "left", valign: "top", margin: 0 });
    s.addChart(pres.charts.BAR, [{ name: "Bekanntheit", labels: ["2019", "2022", "2025"], values: [13, 29, 66] }], {
      x: ML - 0.1, y: 5.2, w: 6.2, h: 1.7, barDir: "col",
      chartColors: [C.cyan], chartColorsOpacity: [90],
      chartArea: { fill: { color: C.bg } }, plotArea: { fill: { color: C.bg } },
      catAxisLabelColor: C.muted, valAxisLabelColor: C.muted2, catAxisLabelFontFace: "Calibri", valAxisLabelFontFace: "Calibri",
      catAxisLabelFontSize: 11, valAxisLabelFontSize: 9,
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showValue: true, dataLabelColor: C.cyan, dataLabelFontFace: "Trebuchet MS", dataLabelFontSize: 12, dataLabelFontBold: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"',
      valAxisMaxVal: 80, valAxisMinVal: 0, barGapWidthPct: 60, showLegend: false, showTitle: false,
    });

    // rechte Einordnung
    const rx = 7.4, rw = PW - MR - rx;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 4.55, w: rw, h: 2.35, rectRadius: 0.1, fill: { color: C.bg2 }, line: { color: C.line, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: rx, y: 4.55, w: 0.09, h: 2.35, fill: { color: C.amber } });
    s.addText("WAS DIE ZAHLEN BEDEUTEN", { x: rx + 0.32, y: 4.72, w: rw - 0.6, h: 0.3, fontFace: "Trebuchet MS", fontSize: 11, bold: true, color: C.amber, charSpacing: 2, align: "left", valign: "middle", margin: 0 });
    s.addText([
      { text: "Die Technik verbreitet sich schneller als das Wissen darüber. ", options: { bold: true, color: C.text } },
      { text: "Während Fälschungen massenhaft entstehen, kann ein Großteil der Menschen sie nicht einordnen – genau das macht Deepfakes als Manipulations­werkzeug so wirksam.", options: { color: C.muted } },
    ], { x: rx + 0.32, y: 5.12, w: rw - 0.62, h: 1.6, fontFace: "Calibri", fontSize: 14, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });

    footer(s, 5);
  }

  // ---------- 6 · BEKANNTE BEISPIELE ----------
  {
    const s = newSlide();
    header(s, "Beispiele", "Vom Spaß bis zum Missbrauch", C.cyan);
    s.addText("Deepfakes sind längst Alltag – manche sind harmlose Unterhaltung, andere verletzen Menschen massiv.", {
      x: ML, y: 1.88, w: CW, h: 0.5, fontFace: "Calibri", fontSize: 15, color: C.muted, align: "left", valign: "top", margin: 0,
    });

    const ex = [
      { icon: ICONS.video.cyan, accent: C.cyan, title: "„Tom Cruise“ auf TikTok", body: "Verblüffend echte Fake-Videos eines Schauspielers begeistern Millionen – und zeigen, wie gut die Technik schon ist." },
      { icon: ICONS.image.amber, accent: C.amber, title: "Der „Balenciaga-Papst“", body: "Ein KI-Bild des Papstes in weißer Designer-Daunenjacke geht viral – viele halten es für echt." },
      { icon: ICONS.masks.rose, accent: C.rose, title: "Gefälschte Politiker-Fotos", body: "Erfundene Bilder, etwa eines tätowierten Kanzlers, verbreiten ein falsches Bild von Personen des öffentlichen Lebens." },
      { icon: ICONS.warn.rose, accent: C.rose, title: "Sexualisierte Fälschungen", body: "Pornografische Deepfakes – etwa von Taylor Swift – treffen vor allem Frauen und richten großen Schaden an." },
    ];
    const gy = 2.55, gh = 1.95, gapx = 0.4, gapy = 0.35, cw = (CW - gapx) / 2;
    ex.forEach((c, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      iconCard(s, { x: ML + col * (cw + gapx), y: gy + row * (gh + gapy), w: cw, h: gh, ...c });
    });
    footer(s, 6);
  }

  // ---------- 7 · POLITISCHE MANIPULATION ----------
  {
    const s = newSlide();
    header(s, "Politik", "Deepfakes im Wahlkampf", C.rose);
    s.addText("Weltweit tauchen vor Wahlen gefälschte Videos und Stimmen auf – mit dem Ziel, Wähler zu täuschen oder zu verunsichern.", {
      x: ML, y: 1.88, w: CW, h: 0.5, fontFace: "Calibri", fontSize: 15, color: C.muted, align: "left", valign: "top", margin: 0,
    });

    const cases = [
      { yr: "2022", place: "Ukraine", icon: ICONS.video.rose, txt: "Ein Fake-Video zeigt Präsident Selenskyj, wie er die Armee zur Kapitulation auffordert – mitten im Krieg." },
      { yr: "2023", place: "Slowakei", icon: ICONS.mic.amber, txt: "Kurz vor der Wahl kursiert ein Audio-Deepfake, in dem ein Kandidat angeblich Wahlbetrug plant." },
      { yr: "2024", place: "USA", icon: ICONS.bullhorn.cyan, txt: "Tausende „Robocalls“ mit der geklonten Stimme von Joe Biden rufen Wähler auf, der Vorwahl fernzubleiben." },
      { yr: "2023", place: "Türkei", icon: ICONS.landmark.rose, txt: "Ein manipuliertes Video bringt einen Gegenkandidaten fälschlich mit einer Terrororganisation in Verbindung." },
    ];
    const gy = 2.55, gh = 1.95, gapx = 0.4, gapy = 0.35, cw = (CW - gapx) / 2;
    cases.forEach((c, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = ML + col * (cw + gapx), y = gy + row * (gh + gapy);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: gh, rectRadius: 0.09, fill: { color: C.bg2 }, line: { color: C.line, width: 1 }, shadow: softShadow() });
      s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.32, w: 0.62, h: 0.62, fill: { color: C.bg3 }, line: { color: C.rose, width: 1 } });
      s.addImage({ data: c.icon, x: x + 0.3 + 0.17, y: y + 0.32 + 0.17, w: 0.28, h: 0.28 });
      s.addText([
        { text: c.place + "  ", options: { bold: true, color: C.text, fontSize: 15 } },
        { text: c.yr, options: { bold: true, color: C.rose, fontSize: 13 } },
      ], { x: x + 1.08, y: y + 0.34, w: cw - 1.3, h: 0.6, fontFace: "Trebuchet MS", align: "left", valign: "middle", margin: 0 });
      s.addText(c.txt, { x: x + 0.32, y: y + 1.05, w: cw - 0.62, h: 0.78, fontFace: "Calibri", fontSize: 13, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
    });
    footer(s, 7);
  }

  // ---------- 8 · SOZIALE MEDIEN ----------
  {
    const s = newSlide();
    header(s, "Verbreitung", "Soziale Medien als Brandbeschleuniger", C.amber);

    // linke Erklärung
    s.addText([
      { text: "Das eigentliche Problem ist nicht nur die Fälschung – sondern ", options: { color: C.muted } },
      { text: "wie schnell sie sich verbreitet.", options: { bold: true, color: C.text } },
      { text: " In sozialen Netzwerken erreichen Fakes in Minuten Millionen Menschen, lange bevor jemand sie überprüfen kann.", options: { color: C.muted } },
    ], { x: ML, y: 1.95, w: 5.1, h: 3.0, fontFace: "Calibri", fontSize: 16, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });

    lensMotif(s, 3.25, 5.35, 0.62, C.amber);

    const rows = [
      { icon: ICONS.bolt.amber, t: "Tempo schlägt Wahrheit", b: "Inhalte verbreiten sich in Sekunden – ein Faktencheck kommt meist zu spät." },
      { icon: ICONS.heart.rose, t: "Emotionen werden belohnt", b: "Algorithmen pushen, was empört oder schockt – ideal für Manipulation." },
      { icon: ICONS.share.cyan, t: "Teilen ohne Prüfen", b: "Viele leiten Inhalte weiter, ohne die Quelle zu hinterfragen." },
      { icon: ICONS.clock.green, t: "Der erste Eindruck bleibt", b: "Selbst eine spätere Richtigstellung erreicht nie alle – der Eindruck wirkt nach." },
    ];
    const rx = 6.0, rw = PW - MR - rx, rh = 1.12, ry0 = 1.95, gap = 0.18;
    rows.forEach((r, i) => {
      const y = ry0 + i * (rh + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y, w: rw, h: rh, rectRadius: 0.08, fill: { color: C.bg2 }, line: { color: C.line, width: 1 } });
      s.addShape(pres.shapes.OVAL, { x: rx + 0.26, y: y + (rh - 0.6) / 2, w: 0.6, h: 0.6, fill: { color: C.bg3 }, line: { color: C.muted2, width: 1 } });
      s.addImage({ data: r.icon, x: rx + 0.26 + 0.16, y: y + (rh - 0.6) / 2 + 0.16, w: 0.28, h: 0.28 });
      s.addText(r.t, { x: rx + 1.05, y: y + 0.18, w: rw - 1.3, h: 0.35, fontFace: "Trebuchet MS", fontSize: 14.5, bold: true, color: C.text, align: "left", valign: "middle", margin: 0 });
      s.addText(r.b, { x: rx + 1.05, y: y + 0.53, w: rw - 1.3, h: 0.45, fontFace: "Calibri", fontSize: 12.5, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.0, margin: 0 });
    });
    footer(s, 8);
  }

  // ---------- 9 · GEFAHR FÜRS VERTRAUEN ----------
  {
    const s = newSlide();
    header(s, "Gesellschaft", "Die größte Gefahr: verlorenes Vertrauen", C.rose);

    // großes Zitat
    s.addShape(pres.shapes.OVAL, { x: ML, y: 2.0, w: 0.8, h: 0.8, fill: { color: C.rose, transparency: 84 }, line: { color: C.rose, width: 1 } });
    s.addImage({ data: ICONS.quote.rose, x: ML + 0.2, y: 2.2, w: 0.4, h: 0.4 });
    s.addText("Wenn alles eine Fälschung sein könnte, glaubt man am Ende gar nichts mehr – auch nicht der Wahrheit.", {
      x: ML + 1.05, y: 1.95, w: 7.4, h: 1.5, fontFace: "Georgia", fontSize: 23, italic: true, color: C.text, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0,
    });

    const dangers = [
      { icon: ICONS.scale.rose, accent: C.rose, t: "Die „Lügen-Dividende“", b: "Echte Beweise lassen sich einfach als „Deepfake“ abtun. Wer ertappt wird, behauptet, das Video sei gefälscht." },
      { icon: ICONS.eye.amber, accent: C.amber, t: "Misstrauen gegen Medien", b: "Wer nicht mehr weiß, was echt ist, verliert das Vertrauen in seriöse Berichterstattung und Institutionen." },
      { icon: ICONS.bolt.cyan, accent: C.cyan, t: "Spaltung der Gesellschaft", b: "Gezielte Fälschungen verschärfen Konflikte und zerstören die gemeinsame Faktenbasis einer Demokratie." },
    ];
    const gy = 3.75, gh = 2.55, gap = 0.35, cw = (CW - 2 * gap) / 3;
    dangers.forEach((d, i) => {
      iconCard(s, { x: ML + i * (cw + gap), y: gy, w: cw, h: gh, icon: d.icon, accent: d.accent, title: d.t, body: d.b });
    });
    footer(s, 9);
  }

  // ---------- 10 · KRITISCHE FRAGE (Statement) ----------
  {
    const s = newSlide(C.bg);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: PW, h: 0.16, fill: { color: C.rose } });
    lensMotif(s, 11.4, 5.9, 1.0, C.rose);
    lensMotif(s, 1.5, 1.4, 0.6, C.cyan);

    s.addText("KRITISCHE FRAGESTELLUNG", {
      x: ML, y: 2.25, w: CW, h: 0.45, fontFace: "Trebuchet MS", fontSize: 15, bold: true, color: C.cyan, charSpacing: 4, align: "center", valign: "middle", margin: 0,
    });
    s.addText("Gefährden Deepfakes unsere Fähigkeit,\nWahrheit von Manipulation zu unterscheiden?", {
      x: 1.2, y: 2.9, w: PW - 2.4, h: 2.0, fontFace: "Georgia", fontSize: 38, bold: true, italic: true, color: C.text, align: "center", valign: "middle", lineSpacingMultiple: 1.12, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, { x: PW / 2 - 0.5, y: 5.15, w: 1.0, h: 0.04, fill: { color: C.rose } });
    s.addText("Diese Frage begleitet uns durch das gesamte Referat.", {
      x: 1.2, y: 5.35, w: PW - 2.4, h: 0.5, fontFace: "Calibri", fontSize: 15, color: C.muted, align: "center", valign: "middle", margin: 0,
    });
  }

  // ---------- 11 · WORAN ERKENNEN ----------
  {
    const s = newSlide();
    header(s, "Erkennung", "Woran erkennt man eine Fälschung?", C.cyan);
    s.addText("Noch verraten sich viele Deepfakes durch kleine Fehler. Es lohnt sich, genau hinzusehen – auch wenn die Technik schnell besser wird.", {
      x: ML, y: 1.88, w: CW, h: 0.5, fontFace: "Calibri", fontSize: 15, color: C.muted, align: "left", valign: "top", margin: 0,
    });

    const signs = [
      { icon: ICONS.eye.cyan, t: "Augen & Blinzeln", b: "Unnatürliches oder fehlendes Blinzeln, starrer Blick, seltsame Spiegelungen in den Augen." },
      { icon: ICONS.bulb.amber, t: "Licht & Schatten", b: "Beleuchtung und Schatten passen nicht zusammen oder wirken unlogisch." },
      { icon: ICONS.masks.rose, t: "Mimik & Haut", b: "Maskenhafte, starre Gesichtszüge; zu glatte Haut ohne feine Muskelbewegungen." },
      { icon: ICONS.link.green, t: "Ränder & Übergänge", b: "Flackern oder Unschärfe an Haaransatz, Ohren und Hals." },
      { icon: ICONS.mic.cyan, t: "Stimme & Lippen", b: "Lippen passen nicht zum Ton; die Stimme klingt monoton oder „roboterhaft“." },
      { icon: ICONS.search.amber, t: "Quelle & Kontext", b: "Woher stammt das Material? Gibt es seriöse Quellen, die es bestätigen?" },
    ];
    const gy = 2.5, gh = 1.32, gapx = 0.35, gapy = 0.28, cw = (CW - 2 * gapx) / 3;
    signs.forEach((c, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = ML + col * (cw + gapx), y = gy + row * (gh + gapy);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: gh, rectRadius: 0.08, fill: { color: C.bg2 }, line: { color: C.line, width: 1 }, shadow: softShadow() });
      s.addShape(pres.shapes.OVAL, { x: x + 0.24, y: y + 0.26, w: 0.52, h: 0.52, fill: { color: C.cyan, transparency: 85 }, line: { color: C.cyan, width: 1 } });
      s.addImage({ data: c.icon, x: x + 0.24 + 0.14, y: y + 0.26 + 0.14, w: 0.24, h: 0.24 });
      s.addText(c.t, { x: x + 0.9, y: y + 0.24, w: cw - 1.1, h: 0.55, fontFace: "Trebuchet MS", fontSize: 13.5, bold: true, color: C.text, align: "left", valign: "middle", margin: 0 });
      s.addText(c.b, { x: x + 0.26, y: y + 0.8, w: cw - 0.5, h: 0.45, fontFace: "Calibri", fontSize: 11, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 0.98, margin: 0 });
    });
    footer(s, 11);
  }

  // ---------- 12 · WAS TUN ----------
  {
    const s = newSlide();
    header(s, "Lösungen", "Was hilft gegen Deepfakes?", C.green);
    s.addText("Gegen Deepfakes gibt es kein einzelnes Mittel – es braucht Technik, Recht und vor allem mündige Menschen.", {
      x: ML, y: 1.88, w: CW, h: 0.5, fontFace: "Calibri", fontSize: 15, color: C.muted, align: "left", valign: "top", margin: 0,
    });

    const sol = [
      { icon: ICONS.scale.green, accent: C.green, t: "Recht & Regeln", b: "Gesetze wie der EU-AI-Act schreiben Kennzeichnungs­pflichten vor und stellen Missbrauch unter Strafe." },
      { icon: ICONS.finger.cyan, accent: C.cyan, t: "Technik & Erkennung", b: "KI-Detektoren, digitale Wasserzeichen und Herkunfts-Nachweise machen Fälschungen sichtbar." },
      { icon: ICONS.cap.amber, accent: C.amber, t: "Medienkompetenz", b: "Bildung hilft, Inhalte einzuordnen, Quellen zu prüfen und nicht blind zu teilen." },
      { icon: ICONS.shield.rose, accent: C.rose, t: "Kritisch hinterfragen", b: "Innehalten, bevor man glaubt oder teilt: Wer sagt das? Woher kommt es? Wem nützt es?" },
    ];
    const gy = 2.55, gh = 1.95, gapx = 0.4, gapy = 0.35, cw = (CW - gapx) / 2;
    sol.forEach((c, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      iconCard(s, { x: ML + col * (cw + gapx), y: gy + row * (gh + gapy), w: cw, h: gh, icon: c.icon, accent: c.accent, title: c.t, body: c.b });
    });
    footer(s, 12);
  }

  // ---------- 13 · FAZIT / ZIELSATZ ----------
  {
    const s = newSlide(C.bg);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: PW, h: 0.16, fill: { color: C.cyan } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.16, w: PW, h: 0.04, fill: { color: C.rose } });
    lensMotif(s, 11.3, 2.0, 0.85, C.cyan);

    s.addText("FAZIT", { x: ML, y: 1.35, w: 6, h: 0.4, fontFace: "Trebuchet MS", fontSize: 15, bold: true, color: C.cyan, charSpacing: 4, align: "left", valign: "middle", margin: 0 });
    s.addText("Sehen ist nicht mehr Glauben", { x: ML, y: 1.75, w: 9, h: 0.8, fontFace: "Trebuchet MS", fontSize: 34, bold: true, color: C.text, align: "left", valign: "middle", margin: 0 });

    // Zielsatz-Karte
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ML, y: 2.75, w: CW, h: 1.55, rectRadius: 0.1, fill: { color: C.bg2 }, line: { color: C.cyanDk, width: 1.25 }, shadow: softShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: ML, y: 2.75, w: 0.1, h: 1.55, fill: { color: C.cyan } });
    s.addText("Digitale Bilder, Videos und Töne müssen wir heute kritischer hinterfragen als je zuvor.", {
      x: ML + 0.45, y: 2.9, w: CW - 0.9, h: 1.25, fontFace: "Georgia", fontSize: 25, italic: true, bold: true, color: C.text, align: "left", valign: "middle", lineSpacingMultiple: 1.08, margin: 0,
    });

    const take = [
      { icon: ICONS.robot.cyan, accent: C.cyan, t: "Technik ist mächtig", b: "Fälschungen werden so gut, dass man sie mit bloßem Auge kaum noch erkennt." },
      { icon: ICONS.landmark.rose, accent: C.rose, t: "Demokratie in Gefahr", b: "Manipulierte Inhalte untergraben Vertrauen, Wahlen und gemeinsame Fakten." },
      { icon: ICONS.brain.green, accent: C.green, t: "Wir entscheiden", b: "Kritisches Denken und Medienkompetenz sind unser wirksamster Schutz." },
    ];
    const gy = 4.6, gh = 1.85, gap = 0.35, cw = (CW - 2 * gap) / 3;
    take.forEach((c, i) => {
      iconCard(s, { x: ML + i * (cw + gap), y: gy, w: cw, h: gh, icon: c.icon, accent: c.accent, title: c.t, body: c.b, fill: C.bg2 });
    });
  }

  // ---------- 14 · QUELLEN ----------
  {
    const s = newSlide();
    header(s, "Quellen", "Quellen & weiterführende Links", C.muted);

    const src = [
      ["Bundeszentrale für politische Bildung (bpb)", "„Wenn der Schein trügt – Deepfakes und die politische Realität“ · bpb.de/lernen/bewegtbild-und-politische-bildung/551578/"],
      ["bpb – Politische Manipulation und Desinformation", "Dossier-Beitrag · bpb.de/lernen/bewegtbild-und-politische-bildung/556305/"],
      ["Konrad-Adenauer-Stiftung (KAS)", "„Der Einfluss von Deep Fakes auf Wahlen“ · kas.de"],
      ["ESET / Computer Weekly / klicksafe.eu", "Funktionsweise (GAN), Beispiele und Erkennungsmerkmale von Deepfakes"],
      ["iProov & Branchenberichte 2025", "Statistiken zu Anstieg, Schäden und Bekanntheit von Deepfakes"],
    ];
    let y = 1.92;
    const rh = 0.82, gap = 0.1, rw = CW;
    src.forEach((row, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ML, y, w: rw, h: rh, rectRadius: 0.07, fill: { color: C.bg2 }, line: { color: C.line, width: 1 } });
      s.addShape(pres.shapes.OVAL, { x: ML + 0.24, y: y + (rh - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: C.bg3 }, line: { color: C.cyan, width: 1 } });
      s.addImage({ data: ICONS.book.cyan, x: ML + 0.24 + 0.13, y: y + (rh - 0.5) / 2 + 0.13, w: 0.24, h: 0.24 });
      s.addText(row[0], { x: ML + 0.95, y: y + 0.13, w: rw - 1.2, h: 0.34, fontFace: "Trebuchet MS", fontSize: 14, bold: true, color: C.text, align: "left", valign: "middle", margin: 0 });
      s.addText(row[1], { x: ML + 0.95, y: y + 0.45, w: rw - 1.2, h: 0.34, fontFace: "Calibri", fontSize: 11.5, color: C.muted, align: "left", valign: "middle", margin: 0 });
      y += rh + gap;
    });
    s.addText("Hinweis: Zahlen geben den Stand der genannten Quellen (2024/2025) wieder und können sich verändern.", {
      x: ML, y: 6.55, w: CW, h: 0.35, fontFace: "Calibri", fontSize: 11, italic: true, color: C.muted2, align: "left", valign: "middle", margin: 0,
    });
    footer(s, 14);
  }

  const out = "Deepfakes_Praesentation.pptx";
  await pres.writeFile({ fileName: out });
  console.log("OK ->", out);
}

(async () => {
  await loadIcons();
  await build();
})().catch(e => { console.error(e); process.exit(1); });
