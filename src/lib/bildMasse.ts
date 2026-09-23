import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Liest Breite und Höhe eines Bildes aus /public (WebP, JPEG, PNG) – ohne
 * Zusatzpaket, nur aus dem Dateikopf. Läuft beim statischen Build, damit
 * Bildrahmen exakt das Seitenverhältnis des Originals bekommen können.
 * Unbekanntes Format oder fehlende Datei → null (Aufrufer nutzt Fallback).
 */
export function bildMasse(src: string): { width: number; height: number } | null {
  let b: Buffer;
  try {
    b = readFileSync(path.join(process.cwd(), "public", src));
  } catch {
    return null;
  }

  // PNG: IHDR folgt direkt auf die Signatur
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }

  // WebP: drei Varianten (erweitert, verlustbehaftet, verlustfrei)
  if (b.length > 30 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const art = b.toString("ascii", 12, 16);
    if (art === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (art === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (art === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  // JPEG: bis zum ersten SOF-Marker laufen (Huffman/Arith-Tabellen überspringen)
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }

  return null;
}
