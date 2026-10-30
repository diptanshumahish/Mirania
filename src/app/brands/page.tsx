import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import { brands } from "@/data/catalog";
import { site } from "@/data/site";
import { JsonLd, breadcrumbList, canonical, itemList, webPage } from "@/lib/seo";

const PATH = "/brands";
const TITLE = "Furniture Brands in Kolkata — Steelcase, Vitra, Stanley & More";
const DESCRIPTION =
  "Steelcase, Vitra, Stanley, Bolia, Wendelbo, Viccarbe, Hunter Douglas, DEKO and more, alongside Mirania's own Sycaamore and At Ease — under one roof in Kolkata.";

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
            Different disciplines. <em>One point of view.</em>
          </h1>
          <div className="pintro__side">
            <p className="t-lg">
              Mirania brings together core brands with distinct strengths across
              home, workplace and architectural solutions. Each is selected for
              what it adds to the way a space performs, feels and endures.
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
            src="/img/profile/evolve.jpg"
            alt="A low sofa and lounge chair in a light-filled room"
            ratio={21 / 9}
            sizes="100vw"
            priority
          />
        </div>
      </header>

      <div className="pad-x" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
        {brands.map((b, i) => {
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
                  <span className="mono-sm muted">
                    {b.own ? "A Mirania brand · " : ""}
                    {b.place} · {b.founded}
                  </span>
                </div>
                <p className="t-lg">{b.blurb}</p>
                <div className="brow__tags">
                  {b.disciplines.map((d) => (
                    <span key={d} className="filter">
                      {d}
                    </span>
                  ))}
                </div>
                <Link href={`/brands/${b.slug}`} className="btn is-ghost arrow-link">
                  Discover {b.name} <Arrow className="arrow" />
                </Link>
              </Reveal>
            </section>
          );
        })}
      </div>
    </>
  );
}
