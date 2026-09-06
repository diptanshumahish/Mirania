import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { Arrow, Mark } from "@/components/Logo";
import Intro from "@/components/Intro";
import {
  activeCategories,
  brands,
  pickCover,
  products,
  productsInCategory,
} from "@/data/catalog";
import { about, contact, site } from "@/data/site";
import { JsonLd, itemList, webPage } from "@/lib/seo";

const DESCRIPTION =
  "Mirania is a multi-designer furniture boutique in Kolkata — Stanley, Bolia, Wendelbo, Viccarbe, Steelcase and Hunter Douglas, delivered and installed.";

export const metadata: Metadata = {
  // The root layout already sets the default title; restating it here keeps the
  // home page off the `%s — Mirania Furniture, Kolkata` template.
  description: DESCRIPTION,
  alternates: { canonical: site.url },
  openGraph: {
    url: site.url,
    description: DESCRIPTION,
    images: [
      {
        url: "/img/site/slider01.jpg",
        width: 1920,
        height: 1080,
        alt: "A Mirania interior — layered seating, timber and soft light",
      },
    ],
  },
};

export default function Home() {
  const houses = brands.length;

  return (
    <>
      <JsonLd
        data={[
          webPage("/", `${site.legalName} — Premium Furniture, Kolkata`, DESCRIPTION, {
            type: "CollectionPage",
            image: "/img/site/slider01.jpg",
          }),
          itemList(
            "/",
            activeCategories.map((c) => ({
              name: c.name,
              path: `/collections/${c.slug}`,
            })),
            "Furniture collections at Mirania",
          ),
        ]}
      />
      <Intro />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="hero">
        <Mark className="hero__mark enter" />
        <div className="hero__bottom">
          <h1 className="h4 hero__statement balance enter" style={{ "--i": 1 } as React.CSSProperties}>
            <em>Mirania</em> is a multi-designer furniture boutique in Eastern
            India, driven to transform spaces into spectacular, comfortable
            havens.
          </h1>
          <div className="hero__facts enter" style={{ "--i": 2 } as React.CSSProperties}>
            <div>
              <p className="hero__fact-n">20+</p>
              <p className="mono-sm muted hero__fact-l">Years on the floor</p>
            </div>
            <div>
              <p className="hero__fact-n">{houses}</p>
              <p className="mono-sm muted hero__fact-l">Design houses</p>
            </div>
            <div>
              <p className="hero__fact-n">{products.length}</p>
              <p className="mono-sm muted hero__fact-l">Pieces catalogued</p>
            </div>
            <div>
              <p className="hero__fact-n">1</p>
              <p className="mono-sm muted hero__fact-l">Showroom, Kolkata</p>
            </div>
          </div>
        </div>
      </section>

      <figure className="hero__figure enter" style={{ margin: 0, "--i": 3 } as React.CSSProperties}>
        <Media
          src="/img/site/slider01.jpg"
          alt="A Mirania interior — layered seating, timber and soft light"
          ratio={16 / 7}
          sizes="100vw"
          priority
        />
        <figcaption className="hero__caption">
          <span className="mono-sm muted">Showroom floor · East Topsia Road</span>
          <span className="mono-sm muted">Kolkata, IN</span>
        </figcaption>
      </figure>

      {/* ---------------------------------------------------------------- */}
      {/* Collections                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section--sage" id="collections">
        <div className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
          <SectionHead title="Collections" count={activeCategories.length}>
            {activeCategories.length} categories, drawn from {houses} houses. Everything
            here is specified,
            delivered and installed by the same people who sell it — the reason a
            piece looks the way it did on the floor once it reaches the room.
          </SectionHead>
          <hr className="rule-dotted" />

          {activeCategories.map((c, i) => {
            const count = productsInCategory(c.slug).length;
            return (
              <div key={c.slug}>
                <Reveal>
                  <Link
                    href={`/collections/${c.slug}`}
                    className={`crow zoom-parent ${i % 2 === 1 ? "is-flip" : ""}`}
                  >
                    <div className="crow__bio">
                      <div className="crow__tags">
                        <span className="tag">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="tag is-bare">{count} pieces</span>
                      </div>
                      <div className="crow__body">
                        <h3 className="h3">{c.name}</h3>
                        <p className="t-lg">{c.blurb}</p>
                        <span className="mono arrow-link">
                          View collection <Arrow className="arrow" />
                        </span>
                      </div>
                    </div>
                    <div className="crow__img">
                      <Media
                        src={pickCover(c.slug, i * 7)}
                        alt={c.name}
                        ratio={506 / 608}
                        sizes="(max-width: 991px) 100vw, 50vw"
                        contain
                        zoom
                      />
                    </div>
                  </Link>
                </Reveal>
                <hr className="rule-dotted" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Ticker                                                            */}
      {/* ---------------------------------------------------------------- */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {brands.map((b) => (
            <span key={b.slug} className="ticker__item">
              {b.name}
            </span>
          ))}
        </div>
        <div className="ticker__track">
          {brands.map((b) => (
            <span key={`${b.slug}-2`} className="ticker__item">
              {b.name}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Houses                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
        <SectionHead title="Houses" count={houses}>
          As a multi-designer store we carry globally renowned makers under one
          roof — Danish upholstery, Spanish contract seating, American workplace
          research and Dutch light control, side by side.
        </SectionHead>

        <ul className="bgrid">
          {brands.map((b, i) => (
            <Reveal as="li" key={b.slug} delay={(i % 3) * 70}>
              <Link href={`/brands/${b.slug}`} className="bcard">
                <div className="bcard__head">
                  <h3 className="h5">{b.name}</h3>
                  <span className="mono-sm muted">{b.origin}</span>
                </div>
                <p className="t-base muted bcard__blurb">{b.blurb}</p>
                <div className="bcard__foot">
                  <span className="mono-sm arrow-link">
                    View house <Arrow className="arrow" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Philosophy                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="section--clay">
        <div className="block-pad" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
          <Reveal>
            <p className="mono-sm muted" style={{ marginBottom: "3.2rem" }}>
              Our approach
            </p>
            <blockquote className="pullquote balance" style={{ margin: 0 }}>
              “{about.pullQuote}”
            </blockquote>
            <div className="stat-row" style={{ marginTop: "6.4rem" }}>
              <div>
                <p className="stat__n">20+</p>
                <p className="mono-sm stat__l">Years of practice</p>
              </div>
              <div>
                <p className="stat__n">3</p>
                <p className="mono-sm stat__l">Sectors served</p>
              </div>
              <div>
                <p className="stat__n">{products.length}</p>
                <p className="mono-sm stat__l">Pieces on record</p>
              </div>
              <div>
                <p className="stat__n">1</p>
                <p className="mono-sm stat__l">Family, by our count</p>
              </div>
            </div>
            <Link href="/about" className="btn is-ghost arrow-link" style={{ marginTop: "4.8rem" }}>
              Read about us <Arrow className="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Visit                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="section--ink">
        <div className="block-pad" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
          <div className="split">
            <div className="stack" style={{ gap: "2.4rem" }}>
              <p className="mono-sm muted">Visit</p>
              <h2 className="h2 balance">
                Furniture is a room decision. Come make it in the room.
              </h2>
              <p className="t-lg" style={{ maxWidth: "48rem" }}>
                Sit in it, feel the weight of the arm, see the fabric under
                Kolkata light. Our floor is set up so you can — and our team can
                specify the rest around it.
              </p>
              <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap", marginTop: "1.6rem" }}>
                <Link href="/contact" className="btn is-ghost arrow-link" style={{ borderColor: "var(--paper)", color: "var(--paper)" }}>
                  Book a visit <Arrow className="arrow" />
                </Link>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn is-ghost"
                  style={{ borderColor: "var(--paper)", color: "var(--paper)" }}
                >
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="stack" style={{ gap: "2rem" }}>
              <Media
                src="/img/site/home-mockup2.jpg"
                alt="Mirania showroom"
                ratio={4 / 3}
                sizes="(max-width: 991px) 100vw, 50vw"
              />
              <div className="deflist">
                <div className="deflist__row" style={{ borderColor: "rgba(252,250,242,0.2)" }}>
                  <span className="mono-sm muted">Address</span>
                  <span className="t-base">
                    {contact.address.name}, {contact.address.lines.join(", ")}
                  </span>
                </div>
                <div className="deflist__row" style={{ borderColor: "rgba(252,250,242,0.2)" }}>
                  <span className="mono-sm muted">Hours</span>
                  <span className="t-base">Mon — Sat, 10:00 to 19:30</span>
                </div>
                <div className="deflist__row" style={{ borderColor: "rgba(252,250,242,0.2)" }}>
                  <span className="mono-sm muted">Telephone</span>
                  <a href={contact.primaryPhoneHref} className="t-base link-u">
                    {contact.primaryPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
