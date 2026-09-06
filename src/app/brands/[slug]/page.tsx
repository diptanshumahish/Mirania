import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { Arrow } from "@/components/Logo";
import {
  brandBySlug,
  brands,
  categoryBySlug,
  productsByBrand,
} from "@/data/catalog";
import { contact, site } from "@/data/site";
import {
  JsonLd,
  STORE_ID,
  absolute,
  breadcrumbList,
  canonical,
  itemList,
  webPage,
} from "@/lib/seo";

type Params = { slug: string };

/** "Netherlands" → "the Netherlands". Country names that take a definite article. */
function originPhrase(origin: string) {
  return /^(United|Netherlands|Philippines)\b/.test(origin) ? `the ${origin}` : origin;
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = brandBySlug.get(slug);
  if (!b) return { title: "Brand", robots: { index: false, follow: true } };

  const count = productsByBrand(b.slug).length;
  const path = `/brands/${b.slug}`;

  // Lead with the house, the count and the origin; append the blurb's opening
  // clause only while the whole line still fits inside a SERP snippet.
  const lead = `${b.name} furniture in Kolkata — ${count} ${
    count === 1 ? "piece" : "pieces"
  } from ${originPhrase(b.origin)}, on the floor at Mirania.`;
  const opener = b.blurb.split(". ")[0];
  const description =
    lead.length + opener.length + 3 <= 158 ? `${lead} ${opener}.` : lead;

  return {
    title: b.name,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: `${b.name} Furniture in Kolkata — Mirania`,
      description,
      url: canonical(path),
      type: "website",
      images: [{ url: b.cover, alt: `${b.name} furniture at Mirania` }],
    },
    ...(count === 0 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = brandBySlug.get(slug);
  if (!b) notFound();

  const items = productsByBrand(b.slug);
  const byCategory = [...new Set(items.map((p) => p.category))].map((c) => ({
    slug: c,
    name: categoryBySlug.get(c)?.name ?? c,
    count: items.filter((p) => p.category === c).length,
  }));

  const index = brands.findIndex((x) => x.slug === b.slug);
  const next = brands[(index + 1) % brands.length];

  const path = `/brands/${b.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Brands", path: "/brands" },
    { name: b.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPage(path, `${b.name} Furniture in Kolkata`, b.blurb, {
            type: "CollectionPage",
            trail,
            image: b.cover,
          }),
          breadcrumbList(trail),
          {
            "@type": "Brand",
            "@id": `${site.url}${path}#brand`,
            name: b.name,
            description: b.blurb,
            url: absolute(path),
            logo: absolute(b.logo),
            image: absolute(b.cover),
            // Declares Mirania as the authorised retail point for the house —
            // the relationship a "<brand> dealer near me" query resolves on.
            makesOffer: {
              "@type": "Offer",
              availableAtOrFrom: { "@id": STORE_ID },
              itemOffered: {
                "@type": "Product",
                name: `${b.name} furniture`,
                category: "Furniture",
              },
            },
          },
          itemList(
            path,
            items.slice(0, 100).map((p) => ({
              name: p.name,
              path: `/products/${p.slug}`,
            })),
            `${b.name} pieces at Mirania`,
          ),
        ]}
      />
      <header className="phead">
        <p className="mono-sm muted phead__crumbs">
          <Link href="/brands" className="link-u">
            Houses
          </Link>
          <span aria-hidden="true">/</span>
          <span>{b.name}</span>
        </p>
        <div className="phead__row">
          <h1 className="h1 balance">{b.name}</h1>
          <p className="mono-sm muted">
            {b.origin} · {items.length} pieces
          </p>
        </div>
        <p className="t-lg phead__lede">{b.blurb}</p>
      </header>

      <hr className="rule" />

      <div className="block-pad">
        {byCategory.length > 1 && (
          <div className="filters" aria-label="Categories carried">
            {byCategory.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="filter">
                {c.name} <span className="filter__n">{c.count}</span>
              </Link>
            ))}
          </div>
        )}
        <ProductGrid items={items} />
      </div>

      <hr className="rule" />

      <section className="section--warm">
        <div className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
          <div className="split">
            <h2 className="h3 balance">
              Looking for something from {b.name} you cannot see here?
            </h2>
            <div className="stack" style={{ gap: "2rem" }}>
              <p className="t-lg">
                Our floor carries a fraction of what each house makes. Send us a
                model name, a photograph or a mood — we will source it and quote
                it, delivered and installed.
              </p>
              <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap" }}>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn arrow-link">
                  Ask on WhatsApp <Arrow className="arrow" />
                </a>
                <Link href="/contact" className="btn is-ghost">
                  Contact the showroom
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block-pad" style={{ paddingTop: "4.8rem", paddingBottom: "6.4rem" }}>
        <Link href={`/brands/${next.slug}`} className="stack" style={{ gap: "1.2rem" }}>
          <span className="mono-sm muted">Next house</span>
          <span className="h2 arrow-link">
            {next.name} <Arrow className="arrow" />
          </span>
        </Link>
      </section>
    </>
  );
}
