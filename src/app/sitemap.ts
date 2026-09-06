import type { MetadataRoute } from "next";
import {
  activeCategories,
  activeSubs,
  brands,
  products,
  productsByBrand,
} from "@/data/catalog";
import { site } from "@/data/site";

/**
 * The catalogue is static, so every URL is emitted with the build date. Empty
 * categories are deliberately omitted — a listing page with nothing on it is a
 * soft-404 in Google's eyes and drags the rest of the section down with it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/collections"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/brands"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/careers"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = activeCategories.flatMap((c) => [
    {
      url: url(`/collections/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // Sub-category views are genuine long-tail landing pages ("dining chairs
    // Kolkata"), each with its own title, lede and self-referencing canonical.
    ...activeSubs(c).map((s) => ({
      url: url(`/collections/${c.slug}?sub=${s.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]);

  const brandPages: MetadataRoute.Sitemap = brands
    .filter((b) => productsByBrand(b.slug).length > 0)
    .map((b) => ({
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

  return [...staticPages, ...categoryPages, ...brandPages, ...productPages];
}
