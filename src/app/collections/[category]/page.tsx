import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { Arrow } from "@/components/Logo";
import {
  activeSubs,
  categories,
  categoryBySlug,
  pickCover,
  productsInCategory,
} from "@/data/catalog";
import {
  JsonLd,
  breadcrumbList,
  canonical,
  itemList,
  webPage,
} from "@/lib/seo";

type Params = { category: string };
type Search = { sub?: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

/** Resolves the request to a category plus, if the `sub` filter is valid, a subcategory. */
function resolve(category: string, sub?: string) {
  const c = categoryBySlug.get(category);
  if (!c) return null;
  const all = productsInCategory(c.slug);
  const subs = activeSubs(c);
  const active = sub && subs.some((s) => s.slug === sub) ? sub : null;
  const items = active ? all.filter((p) => p.sub === active) : all;
  const activeName = active ? subs.find((s) => s.slug === active)!.name : null;
  const path = active
    ? `/collections/${c.slug}?sub=${active}`
    : `/collections/${c.slug}`;
  return { c, all, subs, active, activeName, items, path };
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}): Promise<Metadata> {
  const { category } = await params;
  const { sub } = await searchParams;
  const r = resolve(category, sub);
  if (!r) return { title: "Collection", robots: { index: false, follow: true } };

  const label = r.activeName ?? r.c.name;
  const description = r.activeName
    ? `${r.items.length} ${r.activeName.toLowerCase()} on the floor at Mirania, Kolkata — from Stanley, Bolia, Wendelbo, Viccarbe, Steelcase and more, delivered and installed.`
    : r.c.blurb;

  return {
    title: label,
    description,
    // A sub-filtered view is a genuine landing page with its own inventory, so
    // it self-canonicalises rather than folding into the parent category.
    alternates: { canonical: canonical(r.path) },
    openGraph: {
      title: `${label} — Mirania Furniture, Kolkata`,
      description,
      url: canonical(r.path),
      type: "website",
      images: [{ url: pickCover(r.c.slug, 0), alt: label }],
    },
    // An empty listing is a soft-404; keep it out of the index but let the
    // crawler follow its links back into the catalogue.
    ...(r.items.length === 0
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { category } = await params;
  const { sub } = await searchParams;

  const r = resolve(category, sub);
  if (!r) notFound();
  const { c, all, subs, active, activeName, items, path } = r;

  const label = activeName ?? c.name;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: c.name, path: `/collections/${c.slug}` },
    ...(activeName ? [{ name: activeName, path }] : []),
  ];

  const index = categories.findIndex((x) => x.slug === c.slug);
  const next = categories[(index + 1) % categories.length];

  return (
    <>
      <JsonLd
        data={[
          webPage(path, `${label} in Kolkata`, c.blurb, {
            type: "CollectionPage",
            trail,
            image: pickCover(c.slug, 0),
          }),
          breadcrumbList(trail),
          itemList(
            path,
            // Capped at 100: past that the list stops helping discovery and
            // starts bloating the document for every crawl.
            items.slice(0, 100).map((p) => ({
              name: p.name,
              path: `/products/${p.slug}`,
            })),
            `${label} at Mirania`,
          ),
        ]}
      />
      <header className="phead">
        <p className="mono-sm muted phead__crumbs">
          <Link href="/collections" className="link-u">
            Collections
          </Link>
          <span aria-hidden="true">/</span>
          {activeName ? (
            <>
              <Link href={`/collections/${c.slug}`} className="link-u">
                {c.name}
              </Link>
              <span aria-hidden="true">/</span>
              <span>{activeName}</span>
            </>
          ) : (
            <span>{c.name}</span>
          )}
        </p>
        <div className="phead__row">
          <h1 className="h1 balance">{label}</h1>
          <p className="mono-sm muted">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
            {active ? ` of ${all.length}` : ""}
          </p>
        </div>
        <p className="t-lg phead__lede">{c.blurb}</p>
      </header>

      <hr className="rule" />

      <div className="block-pad">
        {subs.length > 0 && (
          <nav className="filters" aria-label="Filter by type">
            <Link
              href={`/collections/${c.slug}`}
              className={`filter ${!active ? "is-active" : ""}`}
              scroll={false}
            >
              All <span className="filter__n">{all.length}</span>
            </Link>
            {subs.map((s) => (
              <Link
                key={s.slug}
                href={`/collections/${c.slug}?sub=${s.slug}`}
                className={`filter ${active === s.slug ? "is-active" : ""}`}
                scroll={false}
              >
                {s.name} <span className="filter__n">{s.count}</span>
              </Link>
            ))}
          </nav>
        )}

        <ProductGrid items={items} />
      </div>

      <hr className="rule" />

      <section className="block-pad" style={{ paddingTop: "4.8rem", paddingBottom: "6.4rem" }}>
        <Link href={`/collections/${next.slug}`} className="stack" style={{ gap: "1.2rem" }}>
          <span className="mono-sm muted">Next collection</span>
          <span className="h2 arrow-link">
            {next.name} <Arrow className="arrow" />
          </span>
        </Link>
      </section>
    </>
  );
}
