import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import Intro from "@/components/Intro";
import ParallaxStage from "@/components/ParallaxStage";
import PinnedRail from "@/components/PinnedRail";
import {
  activeCategories,
  brands,
  brandsInCategory,
  categoriesForBrand,
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
        url: "/img/site/slider03.jpg",
        width: 1920,
        height: 1080,
        alt: "A tan leather sofa in a dark, arched room with a terracotta canvas",
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
            image: "/img/site/slider03.jpg",
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
      {/* Hero — the statement photograph                                   */}
      {/* ---------------------------------------------------------------- */}
      <ParallaxStage>
        <div className="stage__media">
          <Media
            src="/img/site/slider03.jpg"
            alt="A tan leather sofa in a dark, arched room with a terracotta canvas"
            ratio={16 / 9}
            sizes="100vw"
            priority
          />
        </div>
        <div className="stage__veil" aria-hidden="true" />
        <div className="stage__content">
          <p className="mono-sm stage__kicker enter" style={{ "--i": 0 } as React.CSSProperties}>
            Since {site.founded} · {site.city}
          </p>
          <h1 className="h-display stage__title balance enter" style={{ "--i": 1 } as React.CSSProperties}>
            Rooms that keep <em>their character</em>
          </h1>
          <div className="stage__foot enter" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="t-lg stage__lede">
              Two decades of the world&rsquo;s finest furniture houses, curated
              under one roof in Kolkata.
            </p>
            <div className="stage__actions">
              <Link href="/collections" className="btn is-light arrow-link">
                Explore collections <Arrow className="arrow" />
              </Link>
              <Link href="/contact" className="btn is-ghost-light">
                Visit the showroom
              </Link>
            </div>
          </div>
        </div>
      </ParallaxStage>

      {/* ---------------------------------------------------------------- */}
      {/* Legacy                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="legacy block-pad">
        <Reveal className="legacy__grid">
          <p className="mono-sm muted legacy__label">The house of Mirania</p>
          <div className="legacy__body">
            <p className="h3 balance legacy__statement">
              A multi-designer furniture boutique in Eastern India, driven to
              transform spaces into spectacular, comfortable havens.
            </p>
            <div className="legacy__facts">
              <div>
                <p className="legacy__n">20+</p>
                <p className="mono-sm muted">Years on the floor</p>
              </div>
              <div>
                <p className="legacy__n">{houses}</p>
                <p className="mono-sm muted">Design houses</p>
              </div>
              <div>
                <p className="legacy__n">{products.length}</p>
                <p className="mono-sm muted">Pieces catalogued</p>
              </div>
              <div>
                <p className="legacy__n">3</p>
                <p className="mono-sm muted">Homes · Offices · Hospitality</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Collections — sideways                                            */}
      {/* ---------------------------------------------------------------- */}
      <PinnedRail
        label="Collections"
        id="collections"
        className="section--sand collections-band"
        head={
        <div className="pad-x band-head">
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">Collections</p>
            <h2 className="h2 balance">Sorted the way a room gets built.</h2>
          </div>
          <div className="band-head__side">
            <p className="t-md muted">
              Drawn from {houses} houses, every piece is specified, delivered
              and installed by the people who sold it to you.
            </p>
            <Link href="/collections" className="mono arrow-link link-u">
              All collections <Arrow className="arrow" />
            </Link>
          </div>
        </div>
        }
      >
          {activeCategories.map((c, i) => {
            const count = productsInCategory(c.slug).length;
            const makers = brandsInCategory(c.slug);
            return (
              <li key={c.slug} className="ccard">
                <Link href={`/collections/${c.slug}`} className="ccard__link zoom-parent" draggable={false}>
                  <Media
                    src={c.cover}
                    alt={c.name}
                    ratio={4 / 5}
                    sizes="(max-width: 700px) 80vw, 34vw"
                    zoom
                  />
                  <div className="ccard__meta">
                    <div className="ccard__row">
                      <h3 className="h4">{c.name}</h3>
                      <span className="mono-sm muted">{count} pieces</span>
                    </div>
                    <p className="t-base muted ccard__blurb">{c.blurb}</p>
                    {makers.length > 0 && (
                      <p className="mono-sm ccard__houses">
                        {makers.slice(0, 3).map((b) => b.name).join(" · ")}
                        {makers.length > 3 && ` & ${makers.length - 3} more`}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
          <li className="ccard ccard--end">
            <Link href="/collections" className="ccard__end" draggable={false}>
              <span className="h4">See every collection</span>
              <span className="mono arrow-link">
                {products.length} pieces <Arrow className="arrow" />
              </span>
            </Link>
          </li>
      </PinnedRail>

      {/* ---------------------------------------------------------------- */}
      {/* Brands we house                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="houses">
        <div className="pad-x band-head">
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">Brands we house</p>
            <h2 className="h2 balance">The world&rsquo;s houses, under one roof.</h2>
          </div>
          <div className="band-head__side">
            <p className="t-md muted">
              Danish upholstery, Spanish contract seating, American workplace
              research and Dutch light control, each chosen for what it does
              best.
            </p>
            <Link href="/brands" className="mono arrow-link link-u">
              All brands <Arrow className="arrow" />
            </Link>
          </div>
        </div>

        <ul className="houses__grid">
          {brands.map((b, i) => {
            const cats = categoriesForBrand(b.slug);
            return (
              <Reveal as="li" key={b.slug} delay={(i % 3) * 80}>
                <Link href={`/brands/${b.slug}`} className="hcard">
                  <div className="hcard__plate">
                    <Media
                      src={b.scene}
                      alt={`${b.name} furniture`}
                      ratio={4 / 5}
                      sizes="(max-width: 991px) 50vw, 30vw"
                    />
                    <div className="hcard__veil" aria-hidden="true">
                      <p className="t-base">{b.blurb}</p>
                    </div>
                  </div>
                  <div className="hcard__meta">
                    <h3 className="h4">{b.name}</h3>
                    <span className="mono-sm muted">{b.origin}</span>
                  </div>
                  {cats.length > 0 && (
                    <p className="mono-sm muted hcard__cats">
                      {cats.map((c) => c.name).join(" · ")}
                    </p>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Approach + Visit                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="section--forest approach">
        <div className="approach__media">
          <Media
            src="/img/site/slider01.jpg"
            alt="A Mirania interior — layered seating, timber and soft light"
            ratio={4 / 5}
            sizes="(max-width: 991px) 100vw, 50vw"
          />
        </div>

        <div className="approach__body">
          <Reveal className="approach__part">
            <p className="mono-sm muted">Our approach</p>
            <blockquote className="approach__quote balance">
              &ldquo;{about.pullQuote}&rdquo;
            </blockquote>
            <Link href="/about" className="mono arrow-link link-u">
              Read our story <Arrow className="arrow" />
            </Link>
          </Reveal>

          <hr className="approach__rule" />

          <Reveal className="approach__part">
            <p className="mono-sm muted">Visit the showroom</p>
            <h2 className="h2 balance">
              Furniture is a room decision. Come and make it in the room.
            </h2>
            <p className="t-lg approach__lede">
              Sit in it, feel the weight of the arm, see the fabric under
              Kolkata light. Our team will specify the rest of the room around
              it.
            </p>
            <div className="deflist deflist--tight">
              <div className="deflist__row">
                <span className="mono-sm muted">Address</span>
                <span className="t-base">
                  {contact.address.name}, {contact.address.lines.join(", ")}
                </span>
              </div>
              <div className="deflist__row">
                <span className="mono-sm muted">Hours</span>
                <span className="t-base">Monday to Saturday, 10:00 to 19:30</span>
              </div>
              <div className="deflist__row">
                <span className="mono-sm muted">Telephone</span>
                <a href={contact.primaryPhoneHref} className="t-base link-u">
                  {contact.primaryPhone}
                </a>
              </div>
            </div>
            <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn is-light arrow-link">
                Book a visit <Arrow className="arrow" />
              </Link>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn is-ghost-light"
              >
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
