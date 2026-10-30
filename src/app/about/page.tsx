import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import { profile, site } from "@/data/site";
import { brands } from "@/data/catalog";
import { JsonLd, ORG_ID, breadcrumbList, canonical, webPage } from "@/lib/seo";

const PATH = "/about";
const TITLE = "About Mirania — Furniture, Design and Execution in Kolkata";
const DESCRIPTION =
  "For over three decades Mirania has brought furniture, design and execution under one roof in Kolkata: retail, bespoke manufacturing, curated brands and project delivery.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical(PATH),
    type: "profile",
    images: [{ url: "/img/profile/intro.jpg", width: 2000, height: 2000, alt: "Light and shadow across a Mirania interior" }],
  },
};

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
            image: "/img/profile/intro.jpg",
          }),
          breadcrumbList(trail),
          {
            "@type": "Organization",
            "@id": ORG_ID,
            // Narrative properties belong on the page that actually tells the
            // story; the base Organization node lives in the root layout.
            description: profile.story[0],
            slogan: site.tagline,
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
          <p className="mono-sm muted">About Mirania · {site.city}</p>
          <h1 className="h1 balance">
            A furniture house for spaces that need <em>decisions</em>, not just products.
          </h1>
          <p className="t-lg aintro__lede">{profile.intro}</p>
        </div>
        <div className="aintro__media">
          <Media
            src="/img/profile/intro.jpg"
            alt="Light and shadow falling across a sculptural interior"
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
          <p className="astory__n">30<span>+</span></p>
          <p className="mono-sm muted">Years of furniture and design-led work in Kolkata</p>
        </div>
        <div className="astory__body">
          <Reveal>
            <p className="h3 balance astory__lead">{profile.headline}</p>
          </Reveal>
          <Reveal>
            <p className="h4 balance">{profile.strength}</p>
          </Reveal>
          <Reveal className="prose">
            {profile.story.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad-x afigures">
        <Media src="/img/profile/space.jpg" alt="A sofa and armchair in a calm, light-filled room" ratio={3 / 4} sizes="(max-width: 780px) 100vw, 40vw" unveil />
        <Media src="/img/profile/evolve.jpg" alt="A low modular sofa in a tall room with arched windows" ratio={4 / 3} sizes="(max-width: 780px) 100vw, 60vw" unveil />
      </section>

      {/* Vision & Mission ---------------------------------------------- */}
      <section className="section--sand">
        <div className="block-pad avm">
          <div className="avm__head">
            <p className="mono-sm muted">What guides us</p>
            <h2 className="h3">Mission &amp; vision</h2>
          </div>
          <div className="avm__items">
            <Reveal className="avm__item">
              <h3 className="h5">Our mission</h3>
              <div className="stack" style={{ gap: "1.6rem" }}>
                {profile.mission.map((para) => (
                  <p key={para.slice(0, 24)} className="t-md">{para}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="avm__item" delay={100}>
              <h3 className="h5">Our vision</h3>
              <div className="stack" style={{ gap: "1.6rem" }}>
                {profile.vision.map((para) => (
                  <p key={para.slice(0, 24)} className="t-md">{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities --------------------------------------------------- */}
      <section className="block-pad asectors">
        <div className="band-head" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">What we do</p>
            <h2 className="h2 balance">One house. Endless capabilities.</h2>
          </div>
          <p className="t-md muted band-head__side">{profile.approach}</p>
        </div>
        <ul className="asectors__grid is-4">
          {profile.capabilities.map((x, i) => (
            <Reveal as="li" key={x.name} delay={(i % 2) * 80} className="asector">
              <Media src={x.image} alt={`${x.name} at Mirania`} ratio={4 / 5} sizes="(max-width: 780px) 100vw, 25vw" />
              <p className="mono-sm muted">0{i + 1} · {x.name}</p>
              <h3 className="h4 balance">{x.title}</h3>
              <p className="t-base muted">{x.text}</p>
              <p className="mono-sm asector__tags">{x.tags.join(" · ")}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Built for ------------------------------------------------------ */}
      <section className="block-pad aphil">
        <div className="aphil__media">
          <Media src="/img/profile/clients.jpg" alt="A dark lounge interior with a single armchair" ratio={4 / 5} sizes="(max-width: 991px) 100vw, 45vw" />
        </div>
        <div className="aphil__body">
          <p className="mono-sm muted">Who we work with</p>
          <h2 className="h2 balance">Built for clients who need range without confusion.</h2>
          <div className="deflist">
            {profile.facts.map((f) => (
              <div key={f.n} className="deflist__row">
                <span className="mono-sm muted">{f.n}</span>
                <span className="t-base">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process -------------------------------------------------------- */}
      <section className="section--sand">
        <div className="block-pad avm">
          <div className="avm__head">
            <p className="mono-sm muted">How we work</p>
            <h2 className="h3 balance">A controlled process, from brief to service.</h2>
          </div>
          <ol className="aprocess">
            {profile.process.map((x, i) => (
              <li key={x.step} className="aprocess__row">
                <span className="mono-sm muted">0{i + 1}</span>
                <span className="h4">{x.step}</span>
                <span className="t-base muted">{x.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="block-pad aphil">
        <div className="aphil__body">
          <p className="mono-sm muted">After handover</p>
          <h2 className="h2 balance">The project does not end at handover.</h2>
          <p className="t-lg">Mirania continues to support clients through:</p>
          <div className="brow__tags">
            {profile.aftercare.map((x) => (
              <span key={x} className="filter is-static">
                {x}
              </span>
            ))}
          </div>
        </div>
        <div className="aphil__media">
          <Media src="/img/profile/service.jpg" alt="A quiet interior with a timber sideboard" ratio={1} sizes="(max-width: 991px) 100vw, 45vw" />
        </div>
      </section>

      {/* Houses --------------------------------------------------------- */}
      <section className="block-pad ahouses">
        <p className="mono-sm muted">The brands we house</p>
        <ul className="ahouses__list">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link href={`/brands/${b.slug}`} className="ahouses__item">
                <span className="h3">{b.name}</span>
                <span className="mono-sm muted">{b.own ? "A Mirania brand" : b.place}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Close ---------------------------------------------------------- */}
      <section className="section--forest">
        <div className="block-pad aclose">
          <blockquote className="pullquote balance" style={{ margin: 0 }}>
            We begin with the space, not the catalogue.
          </blockquote>
          <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap" }}>
            <Link href="/projects" className="btn is-light arrow-link">
              See our projects <Arrow className="arrow" />
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
