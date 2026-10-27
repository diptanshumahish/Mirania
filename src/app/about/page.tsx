import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import { about, site } from "@/data/site";
import { brands } from "@/data/catalog";
import { JsonLd, ORG_ID, breadcrumbList, canonical, webPage } from "@/lib/seo";

const PATH = "/about";
const TITLE = "About Mirania — 20+ Years of Premium Furniture in Kolkata";
const DESCRIPTION =
  "Founded in 2003, Mirania Furniture is a multi-designer boutique in Kolkata furnishing homes, offices and hospitality spaces across Eastern India.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical(PATH),
    type: "profile",
    images: [{ url: "/img/site/about-banner-new.jpg", width: 1440, height: 972, alt: "Mirania showroom interior" }],
  },
};

const sectors = [
  {
    name: "Residential",
    text: "Living rooms, bedrooms and dining spaces furnished as one considered whole, with pieces chosen to sit together for years.",
    image: "/img/site/slider03.jpg",
    alt: "A leather sofa in a warm, dark living room",
  },
  {
    name: "Workplace",
    text: "Task seating, desking and collaborative settings from the houses that research how people actually work.",
    image: "/img/site/about-large-3.jpg",
    alt: "An open-plan office with desks and task chairs",
  },
  {
    name: "Hospitality",
    text: "Lobbies, lounges and dining rooms specified for heavy use without giving up on comfort or character.",
    image: "/img/site/wendelbo-feature.jpg",
    alt: "Two dark lounge chairs beside a marble table",
  },
];

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPage(PATH, TITLE, DESCRIPTION, {
            type: "AboutPage",
            trail,
            image: "/img/site/about-banner-new.jpg",
          }),
          breadcrumbList(trail),
          {
            "@type": "Organization",
            "@id": ORG_ID,
            // Narrative properties belong on the page that actually tells the
            // story; the base Organization node lives in the root layout.
            description: about.history[0],
            slogan: site.tagline,
            foundingDate: String(site.founded),
            brand: brands.map((b) => ({
              "@type": "Brand",
              name: b.name,
              url: `${site.url}/brands/${b.slug}`,
            })),
          },
        ]}
      />
      {/* Opening ------------------------------------------------------- */}
      <header className="aintro">
        <div className="aintro__text">
          <p className="mono-sm muted">About Mirania · Est. {site.founded}</p>
          <h1 className="h1 balance">
            A legacy of finesse, two decades in the making.
          </h1>
          <p className="t-lg aintro__lede">{site.tagline}</p>
        </div>
        <div className="aintro__media">
          <Media
            src="/img/site/about-large-1.jpg"
            alt="Brick facade of the Mirania building"
            ratio={5 / 4}
            sizes="(max-width: 991px) 100vw, 45vw"
            priority
          />
        </div>
      </header>

      {/* Story ---------------------------------------------------------- */}
      <section className="block-pad astory">
        <div className="astory__rail">
          <p className="mono-sm muted">Our story</p>
          <p className="astory__n">20<span>+</span></p>
          <p className="mono-sm muted">Years furnishing Eastern India</p>
        </div>
        <div className="astory__body">
          <Reveal>
            <p className="h4 balance astory__lead">{about.history[0]}</p>
          </Reveal>
          <Reveal className="prose">
            <p>{about.history[1]}</p>
          </Reveal>
        </div>
      </section>

      <section className="pad-x afigures">
        <Media src="/img/site/about-large-2.jpg" alt="A blue leather armchair by a window" ratio={3 / 4} sizes="(max-width: 780px) 100vw, 40vw" />
        <Media src="/img/site/slider01.jpg" alt="A light-filled lounge with layered seating" ratio={4 / 3} sizes="(max-width: 780px) 100vw, 60vw" />
      </section>

      {/* Vision & Mission ---------------------------------------------- */}
      <section className="section--sand">
        <div className="block-pad avm">
          <div className="avm__head">
            <p className="mono-sm muted">What guides us</p>
            <h2 className="h3">Vision &amp; mission</h2>
          </div>
          <div className="avm__items">
            <Reveal className="avm__item">
              <h3 className="h5">Our vision</h3>
              <p className="t-md">{about.vision}</p>
            </Reveal>
            <Reveal className="avm__item" delay={100}>
              <h3 className="h5">Our mission</h3>
              <p className="t-md">{about.mission}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we furnish ----------------------------------------------- */}
      <section className="block-pad asectors">
        <div className="band-head" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">What we furnish</p>
            <h2 className="h2 balance">Homes, offices and hospitality.</h2>
          </div>
          <p className="t-md muted band-head__side">
            From residential clientele to suppliers and vast offices, we have
            housed furniture solutions in step with how each space is used.
          </p>
        </div>
        <ul className="asectors__grid">
          {sectors.map((x, i) => (
            <Reveal as="li" key={x.name} delay={i * 80} className="asector">
              <Media src={x.image} alt={x.alt} ratio={4 / 5} sizes="(max-width: 780px) 100vw, 33vw" />
              <h3 className="h4">{x.name}</h3>
              <p className="t-base muted">{x.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Philosophy ----------------------------------------------------- */}
      <section className="block-pad aphil">
        <div className="aphil__media">
          <Media src="/img/site/category-3.jpg" alt="A fluted timber sideboard against a terracotta wall" ratio={4 / 5} sizes="(max-width: 991px) 100vw, 45vw" />
        </div>
        <div className="aphil__body">
          <p className="mono-sm muted">Philosophy</p>
          <h2 className="h2 balance">{about.philosophyTitle}</h2>
          <div className="prose">
            {about.philosophy.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Houses --------------------------------------------------------- */}
      <section className="block-pad ahouses">
        <p className="mono-sm muted">The houses we carry</p>
        <ul className="ahouses__list">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link href={`/brands/${b.slug}`} className="ahouses__item">
                <span className="h3">{b.name}</span>
                <span className="mono-sm muted">{b.origin}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Close ---------------------------------------------------------- */}
      <section className="section--forest">
        <div className="block-pad aclose">
          <blockquote className="pullquote balance" style={{ margin: 0 }}>
            &ldquo;{about.pullQuote}&rdquo;
          </blockquote>
          <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap" }}>
            <Link href="/collections" className="btn is-light arrow-link">
              See the collections <Arrow className="arrow" />
            </Link>
            <Link href="/contact" className="btn is-ghost-light">
              Visit the showroom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
