import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import ProjectCard from "@/components/ProjectCard";
import { Arrow } from "@/components/Logo";
import { projectBySlug, projectPlace, projects } from "@/data/projects";
import { contact, site } from "@/data/site";
import {
  JsonLd,
  ORG_ID,
  absolute,
  breadcrumbList,
  canonical,
  webPage,
} from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug.get(slug);
  if (!p) return { title: "Project", robots: { index: false, follow: true } };

  const path = `/projects/${p.slug}`;
  const title = `${p.client}${p.location ? `, ${p.location}` : ""}`;

  return {
    title,
    description: p.summary,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: `${title} — a Mirania project`,
      description: p.summary,
      url: canonical(path),
      type: "article",
      images: [{ url: p.cover, alt: `${p.client}, furnished by Mirania` }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projectBySlug.get(slug);
  if (!p) notFound();

  const [cover, ...frames] = p.gallery;
  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];
  const more = projects.filter((x) => x.slug !== p.slug && x.slug !== next.slug).slice(0, 2);

  const path = `/projects/${p.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: p.client, path },
  ];
  const enquiry = `Hello Mirania — I saw the ${p.client} project and would like to discuss a similar space.`;

  return (
    <>
      <JsonLd
        data={[
          webPage(path, `${p.client} — a Mirania project`, p.summary, {
            trail,
            image: p.cover,
          }),
          breadcrumbList(trail),
          {
            "@type": "CreativeWork",
            "@id": `${site.url}${path}#project`,
            name: `${p.client} interiors`,
            description: p.summary,
            url: absolute(path),
            image: p.gallery.map((g) => absolute(g.src)),
            creator: { "@id": ORG_ID },
            ...(p.location ? { locationCreated: { "@type": "Place", name: p.location } } : {}),
          },
        ]}
      />
      <header className="phead">
        <p className="mono-sm muted phead__crumbs">
          <Link href="/projects" className="link-u">
            Projects
          </Link>
          <span aria-hidden="true">/</span>
          <span>{p.client}</span>
        </p>
        <h1 className="h1 balance">{p.client}</h1>
        <div className="prhead__row">
          <p className="t-lg phead__lede">{p.summary}</p>
          <dl className="prhead__facts">
            <div>
              <dt className="mono-sm muted">Sector</dt>
              <dd className="t-base">{p.sector}</dd>
            </div>
            <div>
              <dt className="mono-sm muted">Location</dt>
              <dd className="t-base">{projectPlace(p)}</dd>
            </div>
            <div>
              <dt className="mono-sm muted">Photographs</dt>
              <dd className="t-base">{p.gallery.length}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="pad-x">
        <Media
          src={cover.src}
          alt={`${p.client} — ${p.sector.toLowerCase()} interior furnished by Mirania`}
          ratio={Math.max(cover.w / cover.h, 4 / 3)}
          sizes="100vw"
          priority
        />
      </div>

      {frames.length > 0 && (
        <section className="block-pad prgallery" aria-label={`${p.client} photographs`}>
          {frames.map((g, i) => (
            <Media
              key={g.src}
              src={g.src}
              alt={`${p.client}, view ${i + 2} of ${p.gallery.length}`}
              ratio={g.w / g.h}
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              unveil
            />
          ))}
        </section>
      )}

      <section className="section--warm">
        <div className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
          <div className="split">
            <h2 className="h3 balance">Planning a space like this one?</h2>
            <div className="stack" style={{ gap: "2rem" }}>
              <p className="t-lg">
                Tell us about the brief, the floor and the timeline. We will
                come back with a shortlist, a plan and a proposal, and stay on
                through installation and after-sales service.
              </p>
              <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap" }}>
                <a
                  href={`${contact.whatsapp}&text=${encodeURIComponent(enquiry)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn arrow-link"
                >
                  Enquire on WhatsApp <Arrow className="arrow" />
                </a>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(
                    `Project enquiry — after ${p.client}`,
                  )}&body=${encodeURIComponent(enquiry)}`}
                  className="btn is-ghost"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block-pad" style={{ paddingTop: "4.8rem", paddingBottom: "6.4rem" }}>
        <Link href={`/projects/${next.slug}`} className="stack" style={{ gap: "1.2rem" }}>
          <span className="mono-sm muted">Next project</span>
          <span className="h2 arrow-link">
            {next.client} <Arrow className="arrow" />
          </span>
        </Link>
        {more.length > 0 && (
          <ul className="prgrid" style={{ marginTop: "4.8rem" }}>
            {more.map((m) => (
              <li key={m.slug}>
                <ProjectCard project={m} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
