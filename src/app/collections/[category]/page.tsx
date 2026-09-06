import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { Arrow } from "@/components/Logo";
import {
  activeSubs,
  categories,
  categoryBySlug,
  productsInCategory,
} from "@/data/catalog";

type Params = { category: string };
type Search = { sub?: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug.get(category);
  if (!c) return { title: "Collection" };
  return { title: c.name, description: c.blurb };
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

  const c = categoryBySlug.get(category);
  if (!c) notFound();

  const all = productsInCategory(c.slug);
  const subs = activeSubs(c);
  const active = sub && subs.some((s) => s.slug === sub) ? sub : null;
  const items = active ? all.filter((p) => p.sub === active) : all;

  const index = categories.findIndex((x) => x.slug === c.slug);
  const next = categories[(index + 1) % categories.length];

  return (
    <>
      <header className="phead">
        <p className="mono-sm muted phead__crumbs">
          <Link href="/collections" className="link-u">
            Collections
          </Link>
          <span aria-hidden="true">/</span>
          <span>{c.name}</span>
        </p>
        <div className="phead__row">
          <h1 className="h1 balance">{c.name}</h1>
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
