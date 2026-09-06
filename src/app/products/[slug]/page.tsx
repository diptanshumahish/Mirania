import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import ProductCard from "@/components/ProductCard";
import { Arrow } from "@/components/Logo";
import {
  brandBySlug,
  categoryBySlug,
  pieceLabel,
  productBySlug,
  products,
  relatedProducts,
  singular,
  subLabel,
} from "@/data/catalog";
import { contact, site } from "@/data/site";
import { assetExists } from "@/lib/asset";
import {
  JsonLd,
  STORE_ID,
  absolute,
  breadcrumbList,
  canonical,
  webPage,
} from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug.get(slug);
  if (!p) return { title: "Product", robots: { index: false, follow: true } };

  const brand = brandBySlug.get(p.brand)?.name ?? p.brand;
  const type = subLabel(p.category, p.sub) ?? categoryBySlug.get(p.category)?.name;
  const path = `/products/${p.slug}`;

  // Front-loads the three things a buyer actually searches: the model name, what
  // kind of piece it is, and the house that makes it. Catalogue names run from
  // "Duette" to "Ultra Lux Motorised Bed With Twin Motors", so the optional
  // parts are dropped in order of least value until the whole title survives a
  // SERP without being truncated mid-word.
  const piece = type ? singular(type) : null;
  const named = piece
    ? p.name.toLowerCase().includes(piece.toLowerCase())
    : false;
  const head = fit([
    named ? null : `${p.name} ${piece} by ${brand}`,
    `${p.name} by ${brand}`,
    p.name,
  ], TITLE_BUDGET);
  // A handful of names ("Ultra Lux Motorised Bed With Twin Motors") are longer
  // than the whole budget on their own. Those opt out of the template and take
  // a compact suffix instead, so the piece name is never the part truncated.
  const title =
    head.length <= TITLE_BUDGET
      ? head
      : { absolute: `${head} — Mirania, Kolkata` };

  const description = clamp(
    `${p.name}${
      piece && !named ? ` ${piece.toLowerCase()}` : ""
    } by ${brand}, on the floor at Mirania in Kolkata. Finishes, fabrics and dimensions confirmed at enquiry — delivered and installed.`,
    `${p.name} by ${brand}, on the floor at Mirania in Kolkata. Finishes, fabrics and dimensions are confirmed at enquiry.`,
  );

  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: `${title} — Mirania, Kolkata`,
      description,
      url: canonical(path),
      type: "website",
      images: [{ url: p.image, alt: `${p.name} by ${brand}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [p.image],
    },
  };
}

/**
 * Google truncates around 60 characters of title. `TITLE_SUFFIX` is appended by
 * the root layout's template, so only the remainder is ours to spend.
 */
const TITLE_SUFFIX = " — Mirania Furniture, Kolkata";
const TITLE_BUDGET = 62 - TITLE_SUFFIX.length;

/** First candidate that fits the budget; the last one is the guaranteed fallback. */
function fit(candidates: (string | null)[], budget: number) {
  const usable = candidates.filter((c): c is string => Boolean(c));
  return usable.find((c) => c.length <= budget) ?? usable[usable.length - 1];
}

/** Preferred description, or the shorter one when the preferred is over-long. */
function clamp(preferred: string, fallback: string) {
  return preferred.length <= 168 ? preferred : fallback;
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = productBySlug.get(slug);
  if (!p) notFound();

  const brand = brandBySlug.get(p.brand);
  const category = categoryBySlug.get(p.category);
  const sub = subLabel(p.category, p.sub);
  const related = relatedProducts(p);

  // The legacy origin's gallery folder was never archived, so a piece may only
  // have its primary shot on disk. Show what exists rather than padding the
  // page with placeholders; fall back to the primary image if none resolved.
  const gallery = p.gallery.filter(assetExists);
  const views = gallery.length ? gallery : [p.image];

  const enquiry = `Hello Mirania — I'd like to know more about the ${p.name}${
    brand ? ` by ${brand.name}` : ""
  }.`;

  const path = `/products/${p.slug}`;
  const brandName = brand?.name ?? p.brand;
  const typeLabel = pieceLabel(p.category, p.sub);
  const description = `${p.name} ${typeLabel.toLowerCase()} by ${brandName}, available through Mirania in Kolkata. Finishes, fabrics and dimensions are confirmed at enquiry.`;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    ...(category
      ? [{ name: category.name, path: `/collections/${category.slug}` }]
      : []),
    { name: p.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPage(path, `${p.name} by ${brandName}`, description, {
            type: "ItemPage",
            trail,
            image: p.image,
          }),
          breadcrumbList(trail),
          {
            "@type": "Product",
            "@id": `${site.url}${path}#product`,
            name: p.name,
            description,
            sku: p.slug,
            mpn: p.slug,
            url: absolute(path),
            image: views.map(absolute),
            category: category?.name ?? "Furniture",
            ...(brand
              ? {
                  brand: {
                    "@type": "Brand",
                    "@id": `${site.url}/brands/${brand.slug}#brand`,
                    name: brand.name,
                    url: absolute(`/brands/${brand.slug}`),
                  },
                  manufacturer: { "@type": "Organization", name: brand.name },
                  countryOfOrigin: { "@type": "Country", name: brand.origin },
                }
              : {}),
            ...(sub
              ? {
                  additionalProperty: {
                    "@type": "PropertyValue",
                    name: "Type",
                    value: sub,
                  },
                }
              : {}),
            /**
             * No price is published for any piece — every quote is specified
             * per room, and Mirania sells through the showroom rather than a
             * cart. The Offer therefore states availability, seller and the
             * enquiry URL and omits `price` entirely. Google reports a missing
             * price as a warning, not an error; inventing one would be worse
             * than forgoing the merchant rich result.
             */
            offers: {
              "@type": "Offer",
              url: absolute(path),
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
              priceCurrency: "INR",
              availableAtOrFrom: { "@id": STORE_ID },
              seller: { "@id": STORE_ID },
              areaServed: { "@type": "City", name: "Kolkata" },
            },
          },
        ]}
      />
      <header className="phead">
        <p className="mono-sm muted phead__crumbs">
          <Link href="/collections" className="link-u">
            Collections
          </Link>
          <span aria-hidden="true">/</span>
          {category && (
            <>
              <Link href={`/collections/${category.slug}`} className="link-u">
                {category.name}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span>{p.name}</span>
        </p>
      </header>

      <div className="block-pad" style={{ paddingTop: 0 }}>
        <div className="pdp">
          <div className="pdp__gallery">
            {views.map((src, i) => (
              <Media
                key={src}
                src={src}
                alt={`${p.name} ${typeLabel.toLowerCase()}${
                  brand ? ` by ${brand.name}` : ""
                }${views.length > 1 ? `, view ${i + 1} of ${views.length}` : ""}`}
                ratio={4 / 3}
                sizes="(max-width: 991px) 100vw, 55vw"
                priority={i === 0}
                contain
              />
            ))}
          </div>

          <aside className="pdp__side">
            <div className="stack" style={{ gap: "1.2rem" }}>
              {brand && (
                <Link href={`/brands/${brand.slug}`} className="tag">
                  {brand.name}
                </Link>
              )}
              <h1 className="h2 balance">{p.name}</h1>
            </div>

            <div className="deflist">
              {brand && (
                <div className="deflist__row">
                  <span className="mono-sm muted">House</span>
                  <Link href={`/brands/${brand.slug}`} className="t-base link-u">
                    {brand.name}, {brand.origin}
                  </Link>
                </div>
              )}
              {category && (
                <div className="deflist__row">
                  <span className="mono-sm muted">Category</span>
                  <Link href={`/collections/${category.slug}`} className="t-base link-u">
                    {category.name}
                  </Link>
                </div>
              )}
              {sub && (
                <div className="deflist__row">
                  <span className="mono-sm muted">Type</span>
                  <Link
                    href={`/collections/${p.category}?sub=${p.sub}`}
                    className="t-base link-u"
                  >
                    {sub}
                  </Link>
                </div>
              )}
              <div className="deflist__row">
                <span className="mono-sm muted">Availability</span>
                <span className="t-base">
                  On the floor or to order. Finishes, fabrics and dimensions are
                  confirmed at enquiry.
                </span>
              </div>
              <div className="deflist__row">
                <span className="mono-sm muted">Reference</span>
                <span className="t-base mono-sm">{p.slug}</span>
              </div>
            </div>

            <p className="t-md muted">
              Upholstery, timber and metal options vary by piece. Tell us the
              room and we will come back with the specification that fits it —
              and what it costs, delivered and installed.
            </p>

            <div className="pdp__actions">
              <a
                href={`${contact.whatsapp}&text=${encodeURIComponent(enquiry)}`}
                target="_blank"
                rel="noreferrer"
                className="btn arrow-link"
              >
                Enquire on WhatsApp <Arrow className="arrow" />
              </a>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent(
                  `Enquiry — ${p.name}`,
                )}&body=${encodeURIComponent(enquiry)}`}
                className="btn is-ghost"
              >
                Email us
              </a>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <hr className="rule" />
          <section className="block-pad" style={{ paddingTop: "4.8rem", paddingBottom: "6.4rem" }}>
            <div className="sec-head">
              <div className="sec-head__title">
                <h2 className="h3">Also on the floor</h2>
              </div>
            </div>
            <ul className="pgrid">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
