import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import ProductCard from "@/components/ProductCard";
import { Arrow } from "@/components/Logo";
import {
  brandBySlug,
  categoryBySlug,
  productBySlug,
  products,
  relatedProducts,
  subLabel,
} from "@/data/catalog";
import { contact } from "@/data/site";
import { assetExists } from "@/lib/asset";

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
  if (!p) return { title: "Product" };
  const brand = brandBySlug.get(p.brand)?.name ?? p.brand;
  return {
    title: `${p.name} — ${brand}`,
    description: `${p.name} by ${brand}, available through Mirania, Kolkata.`,
    openGraph: { images: [p.image] },
  };
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

  return (
    <>
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
                alt={`${p.name} — view ${i + 1}`}
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
