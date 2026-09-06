/**
 * Structured-data and canonical-URL helpers.
 *
 * Every page composes its JSON-LD from the primitives here so that the site
 * emits ONE consistent entity graph: a single Organization, a single WebSite
 * and a single FurnitureStore node, declared once in the root layout and
 * referenced by `@id` everywhere else. Re-declaring those entities per page is
 * the most common way a furniture catalogue ends up with a fragmented
 * knowledge-graph entry.
 */

import { contact, site } from "@/data/site";

/* ------------------------------------------------------------------ */
/* URLs                                                                */
/* ------------------------------------------------------------------ */

/** Stable `@id`s for the entities declared once in the root layout. */
export const ORG_ID = `${site.url}/#organization`;
export const STORE_ID = `${site.url}/#store`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Absolute URL for a site-relative path. Google requires absolute URLs in JSON-LD. */
export function absolute(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, site.url).toString();
}

/**
 * Canonical URL for a route. Passed to `alternates.canonical` on every page so
 * that a piece reachable from a category, a brand and a related-products rail
 * still consolidates its ranking signals onto one address.
 */
export function canonical(path: string): string {
  return absolute(path);
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

type Json = Record<string, unknown>;

/**
 * Renders a JSON-LD block. `<` is escaped so a stray angle bracket in catalogue
 * copy can never close the script tag early.
 */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const graph = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Entity builders                                                     */
/* ------------------------------------------------------------------ */

const postalAddress = {
  "@type": "PostalAddress",
  name: contact.address.name,
  streetAddress: "#3 Mirania Gardens, 11F East Topsia Road, Topsia",
  addressLocality: "Kolkata",
  addressRegion: "West Bengal",
  postalCode: "700046",
  addressCountry: "IN",
} as const;

const sameAs = [contact.social.instagram, contact.social.facebook];

/** Mon–Sat 10:00–19:30, expressed the way Google's local parser expects. */
const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "10:00",
    closes: "19:30",
  },
];

export function organization(): Json {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: ["Mirania Furniture", "Mirania Kolkata"],
    url: site.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${site.url}/#logo`,
      url: absolute("/favicon.svg"),
      contentUrl: absolute("/favicon.svg"),
      width: 1200,
      height: 1200,
      caption: site.legalName,
    },
    image: { "@id": `${site.url}/#logo` },
    description: site.shortDescription,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    email: contact.email,
    telephone: contact.primaryPhone,
    address: postalAddress,
    sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contact.primaryPhone,
        email: contact.email,
        areaServed: "IN",
        availableLanguage: ["en", "hi", "bn"],
      },
    ],
  };
}

export function website(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.shortDescription,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export function furnitureStore(): Json {
  return {
    "@type": "FurnitureStore",
    "@id": STORE_ID,
    name: site.legalName,
    description: site.shortDescription,
    url: site.url,
    image: absolute("/img/site/slider01.jpg"),
    logo: absolute("/favicon.svg"),
    telephone: contact.primaryPhone,
    email: contact.email,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coords.lat,
      longitude: site.coords.lng,
    },
    hasMap: contact.map,
    openingHoursSpecification,
    priceRange: "$$$",
    currenciesAccepted: "INR",
    areaServed: [
      { "@type": "City", name: "Kolkata" },
      { "@type": "State", name: "West Bengal" },
    ],
    parentOrganization: { "@id": ORG_ID },
    sameAs,
    knowsAbout: [
      "Luxury furniture",
      "Home interiors",
      "Office furniture",
      "Hospitality furniture",
      "Window coverings",
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Page-level helpers                                                  */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; path: string };

/**
 * Breadcrumbs mirror the visual trail in each page header, which is what earns
 * the breadcrumb treatment in the SERP instead of a bare URL.
 */
export function breadcrumbList(trail: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(trail[trail.length - 1].path)}#breadcrumb`,
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absolute(c.path),
    })),
  };
}

/** A WebPage node wired to the site graph and its own breadcrumb trail. */
export function webPage(
  path: string,
  name: string,
  description: string,
  opts: { type?: string; trail?: Crumb[]; image?: string } = {},
): Json {
  const url = absolute(path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-IN",
    ...(opts.image ? { primaryImageOfPage: absolute(opts.image) } : {}),
    ...(opts.trail
      ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
      : {}),
  };
}

/** Ordered list of catalogue URLs — how Google discovers depth on a listing page. */
export function itemList(
  path: string,
  items: { name: string; path: string }[],
  name: string,
): Json {
  return {
    "@type": "ItemList",
    "@id": `${absolute(path)}#list`,
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absolute(it.path),
    })),
  };
}
