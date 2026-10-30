import type { MetadataRoute } from "next";
import { entries } from "@/data/journal";
import { brands, products } from "@/data/catalog";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

/**
 * The catalogue is static, so every URL is emitted with the build date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/brands"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/careers"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: url("/journal"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Editorial pages carry their own publication date rather than the build date,
  // so a rebuild does not tell Google five-year-old writing has just changed.
  const journalPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: url(`/journal/${e.slug}`),
    lastModified: new Date(e.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: url(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: url(`/brands/${b.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/products/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...journalPages,
    ...projectPages,
    ...brandPages,
    ...productPages,
  ];
}
