import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import {
  activeCategories,
  activeSubs,
  COVER_RATIO,
  pickCover,
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
      <header className="phead">
        <p className="mono-sm muted">Index / Collections</p>
        <div className="phead__row">
          <h1 className="h1 balance">Collections</h1>
          <p className="mono-sm muted">
            {products.length} pieces · {activeCategories.length} categories
          </p>
        </div>
        <p className="t-lg phead__lede">
          Everything we hold, sorted the way a room gets built: what you sit on,
          what you put things down on, what you sleep in, what you store in, and
          how the light gets handled.
        </p>
      </header>

      <hr className="rule" />

      <div className="block-pad" style={{ paddingTop: 0 }}>
        {activeCategories.map((c, i) => {
          const count = productsInCategory(c.slug).length;
          const subs = activeSubs(c);
          return (
            <div key={c.slug}>
              <Reveal>
                <Link
                  href={`/collections/${c.slug}`}
                  className={`crow zoom-parent ${i % 2 === 1 ? "is-flip" : ""}`}
                >
                  <div className="crow__bio">
                    <div className="crow__tags">
                      <span className="mono">({String(i + 1).padStart(2, "0")})</span>
                      <span className="mono-sm muted">{count} pieces</span>
                    </div>
                    <div className="crow__body">
                      <h2 className="h3">{c.name}</h2>
                      <p className="t-lg">{c.blurb}</p>
                      {subs.length > 0 && (
                        <p className="mono-sm muted">
                          {subs.map((s) => s.name).join(" · ")}
                        </p>
                      )}
                      <span className="mono arrow-link">
                        Browse {c.name.toLowerCase()} <Arrow className="arrow" />
                      </span>
                    </div>
                  </div>
                  <div className="crow__img">
                    <Media
                      src={pickCover(c.slug, i * 5)}
                      alt={c.name}
                      ratio={COVER_RATIO}
                      sizes="(max-width: 991px) 100vw, 50vw"
                      contain
                      zoom
                      priority={i === 0}
                    />
                  </div>
                </Link>
              </Reveal>
              <hr className="rule-dotted" />
            </div>
          );
        })}
      </div>
    </>
  );
}
