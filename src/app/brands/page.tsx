import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import { brands, categoriesForBrand, productsByBrand } from "@/data/catalog";
import { site } from "@/data/site";
import { JsonLd, breadcrumbList, canonical, itemList, webPage } from "@/lib/seo";

const PATH = "/brands";
const TITLE = "Furniture Brands in Kolkata — Stanley, Bolia, Steelcase & More";
const DESCRIPTION =
  "Stanley, Bolia, Wendelbo, Viccarbe, Steelcase, Hunter Douglas, Grado, M.A.D and Michael Strads — nine design houses under one roof in Kolkata.";

export const metadata: Metadata = {
  title: "Brands",
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical(PATH),
    type: "website",
    images: [
      {
        url: "/img/site/stanley-collage.jpg",
        width: 1500,
        height: 844,
        alt: "Furniture from the design houses Mirania carries",
      },
    ],
  },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Brands", path: PATH },
];

export default function BrandsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPage(PATH, TITLE, DESCRIPTION, { type: "CollectionPage", trail }),
          breadcrumbList(trail),
          itemList(
            PATH,
            brands.map((b) => ({ name: b.name, path: `/brands/${b.slug}` })),
            "Design houses carried by Mirania",
          ),
          // Naming each house as a Brand entity is what lets a query like
          // "Bolia Kolkata" resolve to this site rather than the maker's own.
          ...brands.map((b) => ({
            "@type": "Brand",
            "@id": `${site.url}/brands/${b.slug}#brand`,
            name: b.name,
            description: b.blurb,
            url: `${site.url}/brands/${b.slug}`,
          })),
        ]}
      />
      <header className="pintro">
        <div className="pintro__text">
          <p className="mono-sm muted">Brands</p>
          <h1 className="h1 balance">
            The world&rsquo;s houses, under one roof.
          </h1>
          <div className="pintro__side">
            <p className="t-lg">
              As a multi-designer store we have housed globally renowned brands,
              cementing our position as a furniture boutique in Eastern India.
              Each house is chosen for one thing it does better than anyone
              else.
            </p>
            <nav className="pintro__jump" aria-label="Jump to a house">
              {brands.map((b) => (
                <a key={b.slug} href={`#${b.slug}`} className="filter">
                  {b.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="pintro__media">
          <Media
            src="/img/site/slider03.jpg"
            alt="A tan leather sofa in a dark, arched room"
            ratio={21 / 9}
            sizes="100vw"
            priority
          />
        </div>
      </header>

      <div className="pad-x" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
        {brands.map((b, i) => {
          const count = productsByBrand(b.slug).length;
          const cats = categoriesForBrand(b.slug);
          return (
            <section
              key={b.slug}
              id={b.slug}
              className={`brow ${i % 2 === 1 ? "is-flip" : ""}`}
              style={{ scrollMarginTop: "var(--nav-space)" }}
            >
              <Link href={`/brands/${b.slug}`} className="brow__media zoom-parent">
                <Media
                  src={b.cover}
                  alt={`${b.name} furniture`}
                  ratio={5 / 4}
                  sizes="(max-width: 991px) 100vw, 50vw"
                  zoom
                />
              </Link>
              <Reveal className="brow__body">
                <div className="brow__head">
                  <h2 className="h2">
                    <Link href={`/brands/${b.slug}`}>{b.name}</Link>
                  </h2>
                  <span className="mono-sm muted">{b.origin}</span>
                </div>
                <p className="t-lg">{b.blurb}</p>
                {cats.length > 0 && (
                  <div className="brow__tags">
                    {cats.map((c) => (
                      <Link key={c.slug} href={`/collections/${c.slug}`} className="filter">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
                <Link href={`/brands/${b.slug}`} className="btn is-ghost arrow-link">
                  {count > 0 ? `View ${count} pieces` : `About ${b.name}`} <Arrow className="arrow" />
                </Link>
              </Reveal>
            </section>
          );
        })}
      </div>
    </>
  );
}
