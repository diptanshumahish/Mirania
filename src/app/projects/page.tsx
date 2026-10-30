import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import ClientMarquee from "@/components/ClientMarquee";
import { Arrow } from "@/components/Logo";
import { clients, projects } from "@/data/projects";
import { contact } from "@/data/site";
import { JsonLd, breadcrumbList, canonical, itemList, webPage } from "@/lib/seo";

const PATH = "/projects";
const TITLE = "Projects — Workplaces and Interiors Furnished by Mirania";
const DESCRIPTION =
  "Offices, boardrooms and public spaces furnished by Mirania for Accenture, Grant Thornton, Tata Communications, MSP Steel, Bhima Jewellers and more.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical(PATH),
    type: "website",
    images: [{ url: projects[0].cover, alt: `${projects[0].client}, furnished by Mirania` }],
  },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Projects", path: PATH },
];

export default function ProjectsPage() {
  const [lead, ...rest] = projects;

  return (
    <>
      <JsonLd
        data={[
          webPage(PATH, TITLE, DESCRIPTION, { type: "CollectionPage", trail }),
          breadcrumbList(trail),
          itemList(
            PATH,
            projects.map((p) => ({ name: p.client, path: `/projects/${p.slug}` })),
            "Projects by Mirania",
          ),
        ]}
      />
      <header className="pintro">
        <div className="pintro__text">
          <p className="mono-sm muted">Projects</p>
          <h1 className="h1 balance">
            Spaces we have <em>furnished</em>.
          </h1>
          <div className="pintro__side">
            <p className="t-lg">
              From a single boardroom to complete office floors: product
              selection, specification, coordination, installation and service
              beyond handover, for {clients.length}+ clients across India.
            </p>
          </div>
        </div>
        <div className="pintro__media">
          <Link href={`/projects/${lead.slug}`} className="zoom-parent" aria-label={lead.client}>
            <Media
              src={lead.cover}
              alt={`${lead.client} office furnished by Mirania`}
              ratio={21 / 9}
              sizes="100vw"
              priority
              zoom
            />
          </Link>
        </div>
      </header>

      <section className="block-pad prgrid-wrap">
        <ul className="prgrid">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section--sand clients-band">
        <div className="pad-x band-head">
          <div className="stack" style={{ gap: "1.6rem" }}>
            <p className="mono-sm muted">Clients</p>
            <h2 className="h2 balance">Trusted across industries.</h2>
          </div>
        </div>
        <ClientMarquee />
      </section>

      <section className="section--warm">
        <div className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
          <div className="split">
            <h2 className="h3 balance">Planning a workplace or an interior?</h2>
            <div className="stack" style={{ gap: "2rem" }}>
              <p className="t-lg">
                Seating and workspace planning within 48 to 72 hours of an
                initial consultation, with walk-throughs, shortlists and a
                proposal within a week.
              </p>
              <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap" }}>
                <a
                  href={`${contact.whatsapp}&text=${encodeURIComponent("Hello Mirania — I'd like to discuss a project.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn arrow-link"
                >
                  Talk on WhatsApp <Arrow className="arrow" />
                </a>
                <Link href="/contact" className="btn is-ghost">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
