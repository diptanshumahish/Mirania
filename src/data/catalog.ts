import raw from "./catalog.json";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  sub: string | null;
  image: string;
  gallery: string[];
};

/**
 * Only pieces from houses in the current portfolio are published. Older
 * entries stay in the JSON so a returning house needs no data work.
 */
const carried = new Set([
  "stanley", "steelcase", "hunter-douglas", "deko", "wendelbo", "bolia",
  "viccarbe", "vitra", "sycaamore", "at-ease", "grado", "segis", "orangebox",
  "polyvision",
]);
export const products = (raw as Product[]).filter((p) => carried.has(p.brand));

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export type SubCategory = { slug: string; name: string };
export type Category = {
  slug: string;
  name: string;
  /** Editorial one-liner shown on the collection index. */
  blurb: string;
  /** Room photograph used wherever the category is introduced. */
  cover: string;
  subs: SubCategory[];
};

export const categories: Category[] = [
  {
    slug: "seating",
    name: "Seating",
    blurb:
      "Sofas, lounge chairs, dining chairs and task seating: the pieces a room is organised around, built for the way a space is actually lived in.",
    cover: "/img/site/category-2.jpg",
    subs: [
      { slug: "sofa", name: "Sofas" },
      { slug: "lounge-chair", name: "Lounge Chairs" },
      { slug: "dining-chair", name: "Dining Chairs" },
      { slug: "office-chair", name: "Office Chairs" },
      { slug: "armchair", name: "Armchairs" },
      { slug: "chair", name: "Chairs" },
      { slug: "barstool", name: "Barstools" },
      { slug: "bench", name: "Benches" },
      { slug: "pouf", name: "Poufs" },
    ],
  },
  {
    slug: "table",
    name: "Tables",
    blurb:
      "Coffee, side, dining and executive tables in solid timber, stone and steel, made to hold a room together without asking for attention.",
    cover: "/img/site/category-4.jpg",
    subs: [
      { slug: "coffee-table", name: "Coffee Tables" },
      { slug: "dining-table", name: "Dining Tables" },
      { slug: "side-table", name: "Side Tables" },
      { slug: "office-desk", name: "Office Desks" },
      { slug: "bar-table", name: "Bar Tables" },
      { slug: "cafe-table", name: "Cafe Tables" },
    ],
  },
  {
    slug: "beds-and-beddings",
    name: "Beds & Beddings",
    blurb:
      "Beds, mattresses and pillows engineered for rest, the one category where comfort is measured rather than described.",
    cover: "/img/site/category-1.jpg",
    subs: [
      { slug: "bed", name: "Beds" },
      { slug: "mattresses", name: "Mattresses" },
      { slug: "pillow", name: "Pillows" },
    ],
  },
  {
    slug: "console-and-crockery-unit",
    name: "Console & Crockery",
    blurb:
      "Consoles, sideboards and crockery units that resolve a wall rather than simply fill it.",
    cover: "/img/site/category-3.jpg",
    subs: [],
  },
  {
    slug: "window-fashion",
    name: "Window Fashion",
    blurb:
      "Light, controlled. Motorised shades, sheers and blinds from Hunter Douglas, specified to the opening and the orientation.",
    cover: "/img/site/hd-feature.jpg",
    subs: [],
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb:
      "Lighting, rugs and accent objects: the last ten per cent that makes an interior read as finished.",
    cover: "/img/site/category-5.jpg",
    subs: [],
  },
];

/* ------------------------------------------------------------------ */
/* Brands                                                              */
/* ------------------------------------------------------------------ */

export type Brand = {
  slug: string;
  name: string;
  /** Country of origin, as used in short labels. */
  origin: string;
  /** City or region the house was founded in, as the company profile gives it. */
  place: string;
  founded: number;
  /** Mirania-born brands, as opposed to international partners. */
  own?: boolean;
  /** One-line headline from the company profile. */
  tagline: string;
  /** Short description for cards and meta. */
  blurb: string;
  /** Long-form story for the brand page. */
  story: string[];
  /** What the house covers, as listed in the company profile. */
  disciplines: string[];
  logo: string;
  cover: string;
  /** Room photograph used where the house is introduced editorially. */
  scene: string;
  /** Additional photography for the brand page. */
  gallery: string[];
};

/** Order follows the Mirania company profile. */
export const brands: Brand[] = [
  {
    slug: "stanley",
    name: "Stanley",
    origin: "India",
    place: "Bangalore, India",
    founded: 1999,
    tagline: "Residential comfort with crafted presence.",
    blurb:
      "An Indian luxury furniture brand rooted in leather and upholstery craftsmanship, now furnishing the full home.",
    story: [
      "Stanley is an Indian luxury furniture brand rooted in leather and upholstery craftsmanship. Its portfolio has expanded from sofas into full-home furniture.",
      "Within Mirania, Stanley strengthens the residential offer with material richness, comfort and manufacturing depth.",
    ],
    disciplines: ["Living", "Dining", "Bedrooms", "Upholstery", "Lifestyle"],
    logo: "/img/brands/stanley/logo.png",
    cover: "/img/site/stanley-feature.jpg",
    scene: "/img/site/slider03.jpg",
    gallery: ["/img/brands/stanley/01.jpg", "/img/site/stanley-feature-1.jpg", "/img/site/stanley-feature-2.jpg"],
  },
  {
    slug: "steelcase",
    name: "Steelcase",
    origin: "United States",
    place: "Grand Rapids, USA",
    founded: 1912,
    tagline: "Performance, designed around people.",
    blurb:
      "A global workplace company combining research, ergonomics and integrated furniture systems. Mirania is a Steelcase Certified Partner in Kolkata.",
    story: [
      "Steelcase is a global workplace company founded in Grand Rapids in 1912. Its strength is the combination of workplace research, ergonomics and integrated furniture systems.",
      "Through Steelcase, Mirania delivers high-performance seating, desking, collaboration, executive and storage solutions, as the brand's Certified Partner in Kolkata.",
    ],
    disciplines: ["Seating", "Desking", "Collaboration", "Executive", "Storage"],
    logo: "/img/brands/steelcase/logo.png",
    cover: "/img/site/steelcase-feature.jpg",
    scene: "/img/site/steelcase-feature1.jpg",
    gallery: ["/img/brands/steelcase/01.jpg", "/img/brands/steelcase/02.jpg", "/img/brands/steelcase/03.jpg"],
  },
  {
    slug: "hunter-douglas",
    name: "Hunter Douglas",
    origin: "Germany",
    place: "Düsseldorf, Germany",
    founded: 1919,
    tagline: "Light, privacy and performance.",
    blurb:
      "Architectural intelligence for windows and light: daylight control, privacy and visual continuity for homes and workplaces.",
    story: [
      "Hunter Douglas brings architectural intelligence to windows and light.",
      "Mirania uses these solutions to integrate daylight control, privacy and visual continuity into homes and workplaces.",
    ],
    disciplines: ["Blinds", "Shades", "Daylight control", "Privacy", "Interiors"],
    logo: "/img/brands/hunter-douglas/logo.png",
    cover: "/img/site/hd-feature.jpg",
    scene: "/img/brands/hunter-douglas/02.jpg",
    gallery: ["/img/brands/hunter-douglas/01.jpg", "/img/brands/hunter-douglas/02.jpg"],
  },
  {
    slug: "deko",
    name: "DEKO",
    origin: "Denmark",
    place: "Denmark",
    founded: 1970,
    tagline: "Partitions with technical precision.",
    blurb:
      "High-performance interior partitioning: cabins, meeting rooms and enclosed spaces with transparency and acoustic control.",
    story: [
      "DEKO extends Mirania's capability into high-performance interior partitioning, creating cabins, meeting rooms and enclosed spaces with transparency, acoustic control and technical precision.",
    ],
    disciplines: ["Glass partitions", "Acoustics", "Doors", "Cabins", "Meeting rooms"],
    logo: "/img/brands/deko/logo.png",
    cover: "/img/brands/deko/01.jpg",
    scene: "/img/brands/deko/01.jpg",
    gallery: ["/img/brands/deko/01.jpg", "/img/brands/deko/02.jpg"],
  },
  {
    slug: "wendelbo",
    name: "Wendelbo",
    origin: "Denmark",
    place: "Aarhus, Denmark",
    founded: 1955,
    tagline: "Danish upholstery, three generations on.",
    blurb:
      "A Danish family upholstery workshop since 1955, now a contemporary collection shaped with international designers.",
    story: [
      "Wendelbo began as a Danish family upholstery workshop in 1955. Across three generations, that craft has evolved through collaborations with international designers into a contemporary furniture collection.",
      "Mirania brings Wendelbo into spaces that call for refined lounge and residential pieces with material depth.",
    ],
    disciplines: ["Sofas", "Lounge", "Dining", "Tables", "Accessories"],
    logo: "/img/brands/wendelbo/logo.png",
    cover: "/img/site/wendelbo-feature.jpg",
    scene: "/img/brands/wendelbo/01.jpg",
    gallery: ["/img/brands/wendelbo/01.jpg", "/img/site/wendelbo-feature1.jpg"],
  },
  {
    slug: "bolia",
    name: "Bolia",
    origin: "Denmark",
    place: "Aarhus, Denmark",
    founded: 2000,
    tagline: "New Scandinavian Design, made to order.",
    blurb:
      "An international design brand centred on New Scandinavian Design, craftsmanship and made-to-order furniture.",
    story: [
      "Bolia was established in Aarhus in 2000 and grew from an online-first furniture company into an international design brand. Its collection centres on New Scandinavian Design, craftsmanship and made-to-order furniture.",
      "Within Mirania, Bolia adds a lighter residential and lounge layer across home and informal workplace settings.",
    ],
    disciplines: ["Sofas", "Lounge", "Dining", "Tables", "Accessories"],
    logo: "/img/brands/bolia/logo.png",
    cover: "/img/site/bolia-feature.jpg",
    scene: "/img/brands/bolia/01.jpg",
    gallery: ["/img/brands/bolia/01.jpg", "/img/brands/bolia/02.jpg"],
  },
  {
    slug: "viccarbe",
    name: "Viccarbe",
    origin: "Spain",
    place: "Valencia, Spain",
    founded: 2000,
    tagline: "Warmth and flexibility for shared spaces.",
    blurb:
      "Collaborative furniture from Valencia, created with internationally recognised designers.",
    story: [
      "Founded in Valencia in 2000 by Víctor Carrasco, Viccarbe specialises in collaborative furniture created with internationally recognised designers.",
      "Within Mirania, the collection brings warmth, flexibility and a quiet contemporary character to meeting, lounge and shared spaces.",
    ],
    disciplines: ["Lounge", "Collaborative", "Meeting", "Tables", "Seating"],
    logo: "/img/brands/viccarbe/logo.png",
    cover: "/img/site/viccarbe-feature.jpg",
    scene: "/img/brands/viccarbe/01.jpg",
    gallery: ["/img/brands/viccarbe/01.jpg", "/img/brands/viccarbe/02.jpg"],
  },
  {
    slug: "vitra",
    name: "Vitra",
    origin: "Switzerland",
    place: "Basel region, Switzerland",
    founded: 1950,
    tagline: "Enduring classics, contemporary work.",
    blurb:
      "Authentic design, longevity and cultural weight across home, workplace and public interiors.",
    story: [
      "Founded in 1950, Vitra has built its identity through close collaboration with major designers and the continued production of enduring classics alongside contemporary work.",
      "Within Mirania, Vitra adds authentic design, longevity and cultural weight across home, workplace and public interiors.",
    ],
    disciplines: ["Seating", "Lounge", "Tables", "Workplace", "Accessories"],
    logo: "/img/brands/vitra/logo.png",
    cover: "/img/brands/vitra/01.jpg",
    scene: "/img/brands/vitra/02.jpg",
    gallery: ["/img/brands/vitra/01.jpg", "/img/brands/vitra/02.jpg", "/img/brands/vitra/03.jpg"],
  },
  {
    slug: "sycaamore",
    name: "Sycaamore",
    origin: "India",
    place: "Kolkata, India",
    founded: 2010,
    own: true,
    tagline: "Made around the individual.",
    blurb:
      "Mirania's bespoke furniture expression, developed around individual briefs, dimensions, materials and detailing.",
    story: [
      "Sycaamore is Mirania's bespoke furniture expression, developed around individual briefs, dimensions, materials and detailing.",
      "It is where the portfolio moves from selection into making.",
    ],
    disciplines: ["Bespoke", "Residential", "Executive", "Material", "Made to order"],
    logo: "/img/brands/sycaamore/logo.png",
    cover: "/img/brands/sycaamore/01.jpg",
    scene: "/img/brands/sycaamore/01.jpg",
    gallery: ["/img/brands/sycaamore/01.jpg", "/img/brands/sycaamore/02.jpg"],
  },
  {
    slug: "at-ease",
    name: "At Ease",
    origin: "India",
    place: "Kolkata, India",
    founded: 2022,
    own: true,
    tagline: "Workplace essentials, thoughtfully resolved.",
    blurb:
      "Mirania's own workplace furniture brand: everyday office furniture with design discipline, comfort and commercial flexibility.",
    story: [
      "At Ease is Mirania's own workplace furniture brand, created for offices that need well-resolved everyday furniture with design discipline, comfort and commercial flexibility.",
      "It broadens Mirania's workplace offer across seating, workstations, executive, meeting and storage.",
    ],
    disciplines: ["Seating", "Workstations", "Executive", "Meeting", "Storage"],
    logo: "/img/brands/at-ease/logo.png",
    cover: "/img/brands/at-ease/01.jpg",
    scene: "/img/brands/at-ease/01.jpg",
    gallery: ["/img/brands/at-ease/01.jpg"],
  },
  {
    slug: "grado",
    name: "Grado",
    origin: "China",
    place: "Hangzhou, China",
    founded: 2014,
    tagline: "Furniture for the spaces between work.",
    blurb:
      "A softer design vocabulary across sofas, lounge chairs, tables and public-space furniture.",
    story: [
      "Grado adds a softer design vocabulary across sofas, lounge chairs, tables and public-space furniture.",
      "Useful where the office needs comfort without becoming decorative.",
    ],
    disciplines: ["Breakout", "Reception", "Lounge", "Informal meeting"],
    logo: "/img/brands/grado/logo.png",
    cover: "/img/site/grado-feature.jpg",
    scene: "/img/brands/grado/01.jpg",
    gallery: ["/img/brands/grado/01.jpg", "/img/site/grado-feature1.jpg"],
  },
  {
    slug: "segis",
    name: "Segis",
    origin: "Italy",
    place: "Poggibonsi, Tuscany, Italy",
    founded: 1983,
    tagline: "The workplace's light, flexible layer.",
    blurb:
      "Chairs, stools, beam seating, lounge seating and tables for office, hospitality and education settings.",
    story: [
      "Segis gives the workplace its light, flexible layer: chairs, stools, beam seating, lounge seating and tables for office, hospitality and education settings.",
    ],
    disciplines: ["Chairs", "Stools", "Beam seating", "Lounge", "Tables"],
    logo: "/img/brands/segis/logo.png",
    cover: "/img/brands/segis/01.jpg",
    scene: "/img/brands/segis/01.jpg",
    gallery: ["/img/brands/segis/01.jpg"],
  },
  {
    slug: "orangebox",
    name: "Orangebox",
    origin: "United Kingdom",
    place: "United Kingdom",
    founded: 2002,
    tagline: "For the changing workplace.",
    blurb:
      "Collaborative settings, acoustic and visual privacy, pods and alternative workpoints.",
    story: [
      "Orangebox supports the changing workplace through collaborative settings, acoustic and visual privacy, pods and alternative workpoints.",
    ],
    disciplines: ["Pods", "Privacy", "Team settings"],
    logo: "/img/brands/orangebox/logo.png",
    cover: "/img/brands/orangebox/02.jpg",
    scene: "/img/brands/orangebox/02.jpg",
    gallery: ["/img/brands/orangebox/01.jpg", "/img/brands/orangebox/02.jpg"],
  },
  {
    slug: "polyvision",
    name: "PolyVision",
    origin: "United States",
    place: "United States",
    founded: 1954,
    tagline: "Walls that work.",
    blurb:
      "Writing surfaces, organisation tools and CeramicSteel collaboration surfaces for offices, education and shared workspaces.",
    story: [
      "PolyVision turns walls into active tools: writing surfaces, organisation tools and CeramicSteel collaboration surfaces for offices, education and shared workspaces.",
    ],
    disciplines: ["Writing walls", "CeramicSteel", "Collaboration surfaces"],
    logo: "/img/brands/polyvision/logo.png",
    cover: "/img/brands/polyvision/01.jpg",
    scene: "/img/brands/polyvision/01.jpg",
    gallery: ["/img/brands/polyvision/01.jpg"],
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
export const brandBySlug = new Map(brands.map((b) => [b.slug, b]));
export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function productsInCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function productsByBrand(slug: string) {
  return products.filter((p) => p.brand === slug);
}

/** Houses with at least one piece in a category, in catalogue order. */
export function brandsInCategory(slug: string) {
  const held = new Set(productsInCategory(slug).map((p) => p.brand));
  return brands.filter((b) => held.has(b.slug));
}

/** Categories a house has pieces in, in catalogue order. */
export function categoriesForBrand(slug: string) {
  const held = new Set(productsByBrand(slug).map((p) => p.category));
  return categories.filter((c) => held.has(c.slug));
}

export function countIn(category: string, sub?: string) {
  return products.filter(
    (p) => p.category === category && (sub ? p.sub === sub : true),
  ).length;
}

/** Subcategories that actually have stock, with live counts. */
export function activeSubs(category: Category) {
  return category.subs
    .map((s) => ({ ...s, count: countIn(category.slug, s.slug) }))
    .filter((s) => s.count > 0);
}

/** Categories that actually have stock. */
export const activeCategories = categories.filter(
  (c) => productsInCategory(c.slug).length > 0,
);

export function categoryLabel(slug: string) {
  return categoryBySlug.get(slug)?.name ?? slug;
}

export function subLabel(category: string, sub: string | null) {
  if (!sub) return null;
  const c = categoryBySlug.get(category);
  return c?.subs.find((s) => s.slug === sub)?.name ?? null;
}

/**
 * "Dining Chairs" -> "Dining Chair". Catalogue labels are plural; one piece is
 * not. The sibilant rule has to come first, or "Mattresses" and "Benches" lose
 * only the trailing "s" and end up as "Mattresse" and "Benche".
 */
export function singular(label: string) {
  return label
    .replace(/(ss|sh|ch|x|z)es$/i, "$1")
    .replace(/ies$/i, "y")
    .replace(/([^s])s$/i, "$1");
}

/**
 * The most specific singular label for a piece — its subcategory if it has one,
 * otherwise its category. Used in titles, descriptions and image alt text.
 */
export function pieceLabel(category: string, sub: string | null) {
  return singular(subLabel(category, sub) ?? categoryLabel(category));
}

export function brandName(slug: string) {
  return brandBySlug.get(slug)?.name ?? slug;
}

/**
 * The catalogue ships on one plate size — 537x428 — and every cover is drawn
 * `contain`, so a frame of any other shape letterboxes the piece instead of
 * cropping it. Matching the frame to the plate is what keeps the dead band out
 * of the row.
 */
export const COVER_RATIO = 537 / 428;

/** Deterministic pick used for editorial imagery so builds stay stable. */
export function pickCover(categorySlug: string, offset = 0) {
  const list = productsInCategory(categorySlug);
  if (!list.length) return "/img/site/home-mockup2.jpg";
  return list[offset % list.length].image;
}

export function relatedProducts(p: Product, limit = 6) {
  const sameSub = products.filter(
    (x) => x.slug !== p.slug && x.category === p.category && x.sub === p.sub,
  );
  const sameBrand = products.filter(
    (x) => x.slug !== p.slug && x.brand === p.brand && !sameSub.includes(x),
  );
  return [...sameSub, ...sameBrand].slice(0, limit);
}
