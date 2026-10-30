import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { Arrow } from "@/components/Logo";
import {
  activeCategories,
  activeSubs,
  brandsInCategory,
  products,
  productsInCategory,
} from "@/data/catalog";
import { JsonLd, breadcrumbList, canonical, itemList, webPage } from "@/lib/seo";

const PATH = "/collections";
const TITLE = "Furniture Collections — Seating, Tables, Beds & Storage in Kolkata";
const DESCRIPTION = `Browse ${products.length} pieces across ${activeCategories.length} collections at Mirania, Kolkata — seating, tables, beds, consoles and Hunter Douglas window fashion.`;

export const metadata: Metadata = {
  title: "Collections",
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical(PATH),
    type: "website",
    images: [
      {
        url: "/img/site/slider02.jpg",
        width: 1920,
        height: 1080,
        alt: "Furniture collections on the Mirania showroom floor",
      },
    ],
  },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Collections", path: PATH },
];

export default function CollectionsIndex() {
  return (
    <>
      <JsonLd
        data={[
          webPage(PATH, TITLE, DESCRIPTION, { type: "CollectionPage", trail }),
          breadcrumbList(trail),
          itemList(
            PATH,
            activeCategories.map((c) => ({
              name: c.name,
              path: `/collections/${c.slug}`,
            })),
            "Furniture collections",
          ),
        ]}
      />
      <header className="pintro">
        <div className="pintro__text">
          <p className="mono-sm muted">Collections</p>
          <h1 className="h1 balance">
            Everything a room needs, chosen well.
          </h1>
          <div className="pintro__side">
            <p className="t-lg">
              {products.length} pieces across {activeCategories.length} collections,
              sorted the way a room gets built: what you sit on, what you put
              things down on, what you sleep in, what you store in, and how the
              light gets handled.
            </p>
            <nav className="pintro__jump" aria-label="Jump to a collection">
              {activeCategories.map((c) => (
                <a key={c.slug} href={`#${c.slug}`} className="filter">
                  {c.name}
                  <span className="filter__n">{productsInCategory(c.slug).length}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="pintro__media">
          <Media
            src="/img/site/slider01.jpg"
            alt="A light-filled lounge with layered seating and timber"
            ratio={21 / 9}
            sizes="100vw"
            priority
          />
        </div>
      </header>

      {activeCategories.map((c, i) => {
        const list = productsInCategory(c.slug);
        const subs = activeSubs(c);
        const makers = brandsInCategory(c.slug);
        return (
          <section
            key={c.slug}
            id={c.slug}
            className={`csec ${i % 2 === 1 ? "is-flip section--warm" : ""}`}
          >
            <div className="csec__main block-pad">
              <Link href={`/collections/${c.slug}`} className="csec__media zoom-parent">
                <Media
                  src={c.cover}
                  alt={c.name}
                  ratio={4 / 3}
                  sizes="(max-width: 991px) 100vw, 55vw"
                  zoom
                />
              </Link>
              <Reveal className="csec__body">
                <span className="mono-sm muted">{list.length} pieces</span>
                <h2 className="h2">{c.name}</h2>
                <p className="t-lg">{c.blurb}</p>
                <dl className="csec__facts">
                  {subs.length > 0 && (
                    <div>
                      <dt className="mono-sm muted">Includes</dt>
                      <dd className="t-base">{subs.map((x) => x.name).join(", ")}</dd>
                    </div>
                  )}
                  {makers.length > 0 && (
                    <div>
                      <dt className="mono-sm muted">From</dt>
                      <dd className="t-base">
                        {makers.map((b, j) => (
                          <span key={b.slug}>
                            {j > 0 && ", "}
                            <Link href={`/brands/${b.slug}`} className="link-u">
                              {b.name}
                            </Link>
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
                <Link href={`/collections/${c.slug}`} className="btn is-ghost arrow-link">
                  Explore {c.name.toLowerCase()} <Arrow className="arrow" />
                </Link>
              </Reveal>
            </div>
            {list.length > 0 && (
              <ul className="pgrid csec__strip pad-x">
                {list.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </>
  );
}
