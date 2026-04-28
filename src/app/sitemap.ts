import type { MetadataRoute } from "next";

const SITE_URL = "https://www.alabenergiesysteme.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/privatkunden", priority: 0.9, changeFrequency: "weekly" },
    { path: "/pv-zuhause", priority: 0.95, changeFrequency: "weekly" },
    { path: "/waermepumpen", priority: 0.95, changeFrequency: "weekly" },
    { path: "/wallbox", priority: 0.85, changeFrequency: "weekly" },
    { path: "/gebaeudeenergie", priority: 0.9, changeFrequency: "weekly" },
    { path: "/beleuchtungstechnik", priority: 0.9, changeFrequency: "weekly" },
    { path: "/geschaeftskunden", priority: 0.9, changeFrequency: "weekly" },
    { path: "/gewerbliche-loesungen", priority: 0.95, changeFrequency: "weekly" },
    { path: "/ladesaeulen", priority: 0.85, changeFrequency: "weekly" },
    { path: "/dachverpachtung", priority: 0.85, changeFrequency: "monthly" },
    { path: "/freiflaechen", priority: 0.8, changeFrequency: "monthly" },
    { path: "/servicepakete", priority: 0.8, changeFrequency: "monthly" },
    { path: "/montage", priority: 0.7, changeFrequency: "monthly" },
    { path: "/wartung", priority: 0.75, changeFrequency: "monthly" },
    { path: "/monitoring", priority: 0.7, changeFrequency: "monthly" },
    { path: "/ueber-uns", priority: 0.7, changeFrequency: "monthly" },
    { path: "/partner-werden", priority: 0.6, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.85, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
