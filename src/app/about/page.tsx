import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { Arrow } from "@/components/Logo";
import { about, site } from "@/data/site";
import { brands, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "About",
  description: about.history[0],
};

export default function AboutPage() {
  return (
    <>
      <header className="phead">
        <p className="mono-sm muted">Index / About</p>
        <div className="phead__row">
          <h1 className="h1 balance">
            Twenty years of getting the room right.
          </h1>
        </div>
        <p className="t-lg phead__lede">{site.tagline}</p>
      </header>

      <div className="block-pad" style={{ paddingTop: 0 }}>
        <Media
          src="/img/site/about-banner-new.jpg"
          alt="Mirania showroom interior"
          ratio={16 / 6}
          sizes="100vw"
          priority
        />
      </div>

      <hr className="rule" />

      {/* Brand history ---------------------------------------------------- */}
      <section className="block-pad" style={{ paddingTop: "6.4rem" }}>
        <div className="split--sidebar split">
          <p className="mono-sm muted">Our brand history</p>
          <div className="prose">
            {about.history.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        <div className="stat-row" style={{ marginTop: "6.4rem" }}>
          <div>
            <p className="stat__n">20+</p>
            <p className="mono-sm stat__l muted">Years of practice</p>
          </div>
          <div>
            <p className="stat__n">{brands.length}</p>
            <p className="mono-sm stat__l muted">Houses represented</p>
          </div>
          <div>
            <p className="stat__n">{products.length}</p>
            <p className="mono-sm stat__l muted">Pieces catalogued</p>
          </div>
          <div>
            <p className="stat__n">3</p>
            <p className="mono-sm stat__l muted">Residential · Office · Hospitality</p>
          </div>
        </div>
      </section>

      <section className="block-pad" style={{ paddingTop: "4.8rem" }}>
        <div className="figrow">
          <Media src="/img/site/about-large-1.jpg" alt="Detail — timber and textile" ratio={3 / 4} sizes="(max-width: 780px) 100vw, 33vw" />
          <Media src="/img/site/about-large-2.jpg" alt="Detail — seating" ratio={3 / 4} sizes="(max-width: 780px) 100vw, 33vw" />
          <Media src="/img/site/about-large-3.jpg" alt="Detail — living space" ratio={3 / 4} sizes="(max-width: 780px) 100vw, 33vw" />
        </div>
      </section>

      {/* Vision & Mission ------------------------------------------------- */}
      <section className="section--sage" style={{ marginTop: "6.4rem" }}>
        <div className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
          <SectionHead title="Vision & Mission" count="02">
            Our approach, stated plainly — because a furniture decision made
            badly stays in the room for a decade.
          </SectionHead>
          <hr className="rule-dotted" />

          <Reveal>
            <div className="split" style={{ paddingTop: "4.8rem", paddingBottom: "4.8rem" }}>
              <div className="stack" style={{ gap: "1.6rem" }}>
                <span className="tag">Vision</span>
                <p className="t-lg">{about.vision}</p>
              </div>
              <div className="stack" style={{ gap: "1.6rem" }}>
                <span className="tag">Mission</span>
                <p className="t-lg">{about.mission}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy ------------------------------------------------------- */}
      <section className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
        <div className="split--sidebar split">
          <p className="mono-sm muted">Philosophy</p>
          <div className="stack" style={{ gap: "3.2rem" }}>
            <h2 className="h2 balance">{about.philosophyTitle}</h2>
            <div className="prose">
              {about.philosophy.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section--clay">
        <div className="block-pad" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
          <blockquote className="pullquote balance" style={{ margin: 0 }}>
            “{about.pullQuote}”
          </blockquote>
          <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap", marginTop: "4.8rem" }}>
            <Link href="/collections" className="btn arrow-link">
              See the collections <Arrow className="arrow" />
            </Link>
            <Link href="/contact" className="btn is-ghost">
              Visit the showroom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
