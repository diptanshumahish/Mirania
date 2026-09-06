import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import JournalRow from "@/components/JournalRow";
import { Arrow } from "@/components/Logo";
import { entries } from "@/data/journal";
import { site } from "@/data/site";
import {
  JsonLd,
  ORG_ID,
  absolute,
  breadcrumbList,
  canonical,
  itemList,
  webPage,
} from "@/lib/seo";

const PATH = "/journal";
const TITLE = "The Grain — A Design Column from the Mirania Floor";
const DESCRIPTION =
  "Notes from the Mirania floor in Kolkata — materials, specification and what a room looks like ten years on. A design column in short issues.";

export const metadata: Metadata = {
  title: "The Grain",
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical(PATH),
    type: "website",
    images: [
      {
        url: entries[0].image,
        alt: `${entries[0].title} — The Grain, the Mirania design column`,
      },
    ],
  },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "The Grain", path: PATH },
];

export default function JournalIndex() {
  const [lead, ...rest] = entries;

  return (
    <>
      <JsonLd
        data={[
          webPage(PATH, TITLE, DESCRIPTION, {
            type: "CollectionPage",
            trail,
            image: lead.image,
          }),
          breadcrumbList(trail),
          {
            // A Blog node with its posts is what lets the column be understood
            // as a publication rather than five unrelated pages.
            "@type": "Blog",
            "@id": `${site.url}${PATH}#blog`,
            name: "The Grain",
            alternateName: "The Grain — the Mirania design column",
            description: DESCRIPTION,
            url: absolute(PATH),
            inLanguage: "en-IN",
            publisher: { "@id": ORG_ID },
            author: { "@id": ORG_ID },
            blogPost: entries.map((e) => ({
              "@type": "BlogPosting",
              "@id": `${site.url}/journal/${e.slug}#article`,
              headline: e.title,
              description: e.standfirst,
              url: absolute(`/journal/${e.slug}`),
              datePublished: e.date,
              image: absolute(e.image),
            })),
          },
          itemList(
            PATH,
            entries.map((e) => ({ name: e.title, path: `/journal/${e.slug}` })),
            "The Grain — issues",
          ),
        ]}
      />

      <header className="phead">
        <p className="mono-sm muted">Index / The Grain</p>
        <div className="phead__row">
          <h1 className="h1 balance">The Grain</h1>
          <p className="mono-sm muted">
            {entries.length} issues · since {entries[entries.length - 1].date.slice(0, 4)}
          </p>
        </div>
        <p className="t-lg phead__lede">
          Notes from the floor — what we specify, why, and what it does to a room
          ten years on.
        </p>
      </header>

      <hr className="rule" />

      {/* Latest issue, given the room a lead deserves. */}
      <section className="block-pad" style={{ paddingTop: "4.8rem" }}>
        <Link href={`/journal/${lead.slug}`} className="jlead zoom-parent">
          <Media
            src={lead.image}
            alt={`${lead.title} — ${lead.standfirst}`}
            ratio={16 / 7}
            sizes="100vw"
            priority
            zoom
          />
          <div className="split--sidebar split">
            <div className="jlead__rail">
              <span className="mono-sm muted">Latest issue</span>
              <span className="mono">{lead.number}</span>
              <span className="mono-sm muted">
                <time dateTime={lead.date}>{lead.dateLabel}</time>
              </span>
            </div>
            <div className="jlead__body">
              <h2 className="h2 balance">{lead.title}</h2>
              <p className="t-lg muted">{lead.standfirst}</p>
              <span className="mono arrow-link">
                Read this issue <Arrow className="arrow" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Back issues, as a ruled archive — the column has its own rhythm and
          should not read as a second copy of the collections index. */}
      <section className="block-pad" style={{ paddingTop: "3.2rem" }}>
        <div className="sec-head">
          <div className="sec-head__title">
            <h2 className="h3">Back issues</h2>
            <span className="counter sec-head__count">{rest.length}</span>
          </div>
          <p className="t-lg muted sec-head__desc">
            Every issue is written from the floor — the specification
            conversations we have with clients, set down while they are still
            fresh.
          </p>
        </div>

        <div className="jarchive">
          {rest.map((e, i) => (
            <Reveal key={e.slug} delay={i * 60}>
              <JournalRow entry={e} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
