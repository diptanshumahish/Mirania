import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import {
  activeCategories,
  activeSubs,
  pickCover,
  products,
  productsInCategory,
} from "@/data/catalog";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Seating, tables, beds, storage and window fashion from nine design houses, held on one floor in Kolkata.",
};

export default function CollectionsIndex() {
  return (
    <>
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
                      <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                      <span className="tag is-bare">{count} pieces</span>
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
                      ratio={506 / 608}
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
