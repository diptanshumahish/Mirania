import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import Intro from "@/components/Intro";
import ParallaxStage from "@/components/ParallaxStage";
import PinnedRail from "@/components/PinnedRail";
import ScrollWords from "@/components/ScrollWords";
import ClientMarquee from "@/components/ClientMarquee";
import { brands } from "@/data/catalog";
import { clients, featuredProjects, projectPlace, projects } from "@/data/projects";
import { contact, profile, site } from "@/data/site";
import { JsonLd, itemList, webPage } from "@/lib/seo";

const DESCRIPTION =
  "Mirania is a Kolkata furniture house for homes and workplaces — Steelcase, Vitra, Stanley, Bolia and more, bespoke manufacturing and project execution under one roof.";

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
            featuredProjects.map((p) => ({
              name: p.client,
              path: `/projects/${p.slug}`,
            })),
            "Projects by Mirania",
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
            Over three decades · {site.city}
          </p>
          <h1 className="h-display stage__title balance enter" style={{ "--i": 1 } as React.CSSProperties}>
            Rooms that keep <em>their character</em>
          </h1>
          <div className="stage__foot enter" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="t-lg stage__lede">
              Retail, bespoke manufacturing, curated international brands and
              project execution, under one roof in Kolkata.
            </p>
            <div className="stage__actions">
              <Link href="/projects" className="btn is-light arrow-link">
                See our projects <Arrow className="arrow" />
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
            <ScrollWords
              className="h3 balance legacy__statement"
              text={profile.intro}
            />
            <div className="legacy__facts">
              <div>
                <p className="legacy__n">30+</p>
                <p className="mono-sm muted">Years in Kolkata</p>
              </div>
              <div>
                <p className="legacy__n">{houses}</p>
                <p className="mono-sm muted">Brands</p>
              </div>
              <div>
                <p className="legacy__n">{clients.length}+</p>
                <p className="mono-sm muted">Clients</p>
              </div>
              <div>
                <p className="legacy__n">{projects.length}</p>
                <p className="mono-sm muted">Featured projects</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Projects — sideways                                               */}
      {/* ---------------------------------------------------------------- */}
      <PinnedRail
        label="Projects"
        id="projects"
        className="section--sand collections-band"
        head={
        <div className="pad-x band-head">
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">Projects</p>
            <h2 className="h2 balance">Workplaces need more than chairs and tables.</h2>
          </div>
          <div className="band-head__side">
            <p className="t-md muted">
              Selection, specification, planning coordination, site installation
              and service beyond handover, for offices across India.
            </p>
            <Link href="/projects" className="mono arrow-link link-u">
              All projects <Arrow className="arrow" />
            </Link>
          </div>
        </div>
        }
      >
          {featuredProjects.map((p) => (
            <li key={p.slug} className="ccard">
              <Link href={`/projects/${p.slug}`} className="ccard__link zoom-parent" draggable={false}>
                <Media
                  src={p.cover}
                  alt={`${p.client} office furnished by Mirania`}
                  ratio={4 / 5}
                  sizes="(max-width: 700px) 80vw, 34vw"
                  zoom
                />
                <div className="ccard__meta">
                  <div className="ccard__row">
                    <h3 className="h4">{p.client}</h3>
                    <span className="mono-sm muted">{projectPlace(p)}</span>
                  </div>
                  <p className="t-base muted ccard__blurb">{p.summary}</p>
                  <p className="mono-sm ccard__houses">{p.sector}</p>
                </div>
              </Link>
            </li>
          ))}
          <li className="ccard ccard--end">
            <Link href="/projects" className="ccard__end" draggable={false}>
              <span className="h4">See every project</span>
              <span className="mono arrow-link">
                {projects.length} projects <Arrow className="arrow" />
              </span>
            </Link>
          </li>
      </PinnedRail>

      {/* ---------------------------------------------------------------- */}
      {/* Clients                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="clients-band">
        <div className="pad-x band-head">
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">Clients</p>
            <h2 className="h2 balance">Trusted across industries.</h2>
          </div>
          <div className="band-head__side">
            <p className="t-md muted">
              From global consultancies and banks to manufacturers, retailers,
              hotels and universities.
            </p>
          </div>
        </div>
        <ClientMarquee />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Brands we house                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="houses">
        <div className="pad-x band-head">
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">Brands we house</p>
            <h2 className="h2 balance">Different disciplines. One point of view.</h2>
          </div>
          <div className="band-head__side">
            <p className="t-md muted">
              Global partners alongside Mirania-born brands, each selected for
              what it adds to the way a space performs, feels and endures.
            </p>
            <Link href="/brands" className="mono arrow-link link-u">
              All brands <Arrow className="arrow" />
            </Link>
          </div>
        </div>

        <ul className="houses__grid">
          {brands.map((b, i) => {
            return (
              <Reveal as="li" key={b.slug} delay={(i % 3) * 80}>
                <Link href={`/brands/${b.slug}`} className="hcard">
                  <div className="hcard__plate">
                    <Media
                      src={b.scene}
                      alt={`${b.name} furniture`}
                      ratio={4 / 5}
                      sizes="(max-width: 991px) 50vw, 30vw"
                      unveil
                    />
                    <div className="hcard__veil" aria-hidden="true">
                      <p className="t-base">{b.blurb}</p>
                    </div>
                  </div>
                  <div className="hcard__meta">
                    <h3 className="h4">{b.name}</h3>
                    <span className="mono-sm muted">{b.own ? "Mirania" : b.origin}</span>
                  </div>
                  <p className="mono-sm muted hcard__cats">
                    {b.disciplines.slice(0, 3).join(" · ")}
                  </p>
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
            unveil
          />
        </div>

        <div className="approach__body">
          <Reveal className="approach__part">
            <p className="mono-sm muted">Our approach</p>
            <ScrollWords
              as="blockquote"
              className="approach__quote balance"
              text={profile.approach}
            />
            <Link href="/about" className="mono arrow-link link-u">
              How we work <Arrow className="arrow" />
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
