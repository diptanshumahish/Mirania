import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import { brands, productsByBrand } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Stanley, Bolia, Wendelbo, Viccarbe, Steelcase, Hunter Douglas, Grado, M.A.D and Michael Strads — the houses Mirania carries.",
};

export default function BrandsPage() {
  return (
    <>
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
