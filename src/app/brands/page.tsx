import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import { brands, productsByBrand } from "@/data/catalog";
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
      <header className="phead">
        <p className="mono-sm muted">Index / Brands</p>
        <div className="phead__row">
          <h1 className="h1 balance">Houses</h1>
          <p className="mono-sm muted">{brands.length} makers</p>
        </div>
        <p className="t-lg phead__lede">
          As a multi-designer store we have housed globally renowned brands,
          cementing our position as a furniture boutique in Eastern India. Each
          house is chosen for one thing it does better than anyone else.
        </p>
      </header>

      <hr className="rule" />

      <div className="block-pad" style={{ paddingTop: "4.8rem" }}>
        <ul className="bgrid">
          {brands.map((b, i) => {
            const count = productsByBrand(b.slug).length;
            return (
              <Reveal as="li" key={b.slug} delay={(i % 3) * 70}>
                <Link href={`/brands/${b.slug}`} className="bcard">
                  <div className="bcard__head">
                    <h2 className="h4">{b.name}</h2>
                    <span className="mono-sm muted">{b.origin}</span>
                  </div>
                  <p className="t-base muted bcard__blurb">{b.blurb}</p>
                  <div className="bcard__foot">
                    <span className="tag is-bare">{count} pieces</span>
                    <span className="mono-sm arrow-link">
                      View <Arrow className="arrow" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </>
  );
}
