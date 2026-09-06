import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import JournalRow from "@/components/JournalRow";
import { Arrow } from "@/components/Logo";
import { entries, entryBySlug, readingMinutes, wordCount } from "@/data/journal";
import { site } from "@/data/site";
import {
  JsonLd,
  ORG_ID,
  absolute,
  breadcrumbList,
  canonical,
  webPage,
} from "@/lib/seo";

type Params = { slug: string };

/**
 * Standfirsts are written to sit under a headline, so the shortest of them make
 * a thin SERP snippet on their own. The column's own byline is appended to give
 * the snippet somewhere to land without touching the on-page copy.
 */
function summary(standfirst: string) {
  return `${standfirst.replace(/\.$/, "")} — from The Grain, the Mirania design column, Kolkata.`;
}

export function generateStaticParams(): Params[] {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = entryBySlug.get(slug);
  if (!e) return { title: "Journal", robots: { index: false, follow: true } };

  const path = `/journal/${e.slug}`;
  const description = summary(e.standfirst);
  return {
    title: e.title,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: `${e.title} — The Grain, Mirania`,
      description,
      url: canonical(path),
      type: "article",
      publishedTime: e.date,
      authors: [site.legalName],
      images: [{ url: e.image, alt: `${e.title} — ${e.standfirst}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: e.title,
      description,
      images: [e.image],
    },
  };
}

export default async function JournalEntry({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = entryBySlug.get(slug);
  if (!e) notFound();

  // Entries run newest first, so the *next* issue sits above this one.
  const i = entries.indexOf(e);
  const newer = entries[i - 1];
  const older = entries[i + 1];
  const others = entries.filter((x) => x.slug !== e.slug);

  const path = `/journal/${e.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "The Grain", path: "/journal" },
    { name: e.title, path },
  ];

  const minutes = readingMinutes(e);

  return (
    <>
      <JsonLd
        data={[
          webPage(path, e.title, summary(e.standfirst), {
            type: "WebPage",
            trail,
            image: e.image,
          }),
          breadcrumbList(trail),
          {
            "@type": "BlogPosting",
            "@id": `${site.url}${path}#article`,
            headline: e.title,
            alternativeHeadline: e.standfirst,
            description: summary(e.standfirst),
            url: absolute(path),
            mainEntityOfPage: { "@id": `${absolute(path)}#webpage` },
            image: absolute(e.image),
            datePublished: e.date,
            // Nothing has been revised since publication, so the two dates match
            // rather than being backfilled with the build date.
            dateModified: e.date,
            // The column is written from the floor rather than under a byline,
            // so the house is the author — and the publisher of record.
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            isPartOf: { "@id": `${site.url}/journal#blog` },
            articleSection: "Design",
            issueNumber: e.number,
            // Google reads word count as one signal of whether a page is substantive.
            wordCount: wordCount(e),
            timeRequired: `PT${minutes}M`,
            inLanguage: "en-IN",
            keywords: [
              "furniture",
              "interior design",
              "Kolkata",
              "specification",
              site.legalName,
            ],
          },
        ]}
      />

      {/* An article headline wants a reading measure, not the full page width
          the section heads take, so it runs at .h2 like the other detail pages. */}
      <header className="phead">
        <p className="mono-sm muted phead__crumbs">
          <Link href="/journal" className="link-u">
            The Grain
          </Link>
          <span aria-hidden="true">/</span>
          <span>{e.number}</span>
        </p>
        <h1 className="h2 balance" style={{ maxWidth: "88rem" }}>
          {e.title}
        </h1>
        <p className="t-lg muted phead__lede">{e.standfirst}</p>
        <div className="jbyline">
          <span className="mono-sm muted">
            <time dateTime={e.date}>{e.dateLabel}</time>
          </span>
          <span className="jbyline__sep" aria-hidden="true" />
          <span className="mono-sm muted">{minutes} min read</span>
          <span className="jbyline__sep" aria-hidden="true" />
          <span className="mono-sm muted">{site.legalName} · Kolkata</span>
        </div>
      </header>

      <div className="block-pad" style={{ paddingTop: 0 }}>
        <Media
          src={e.image}
          alt={`${e.title} — ${e.standfirst}`}
          ratio={16 / 7}
          sizes="100vw"
          priority
        />
      </div>

      <hr className="rule" />

      <section className="block-pad" style={{ paddingTop: "6.4rem" }}>
        <div className="split--sidebar split">
          {/* Stacked rail — a two-column deflist has no room to resolve inside
              the 22rem sidebar track and spills its values over the prose. */}
          <div className="jmeta">
            <div className="jmeta__row">
              <span className="mono-sm muted">Issue</span>
              <span className="t-base">{e.number}</span>
            </div>
            <div className="jmeta__row">
              <span className="mono-sm muted">Published</span>
              <time className="t-base" dateTime={e.date}>
                {e.dateLabel}
              </time>
            </div>
            <div className="jmeta__row">
              <span className="mono-sm muted">Length</span>
              <span className="t-base">{minutes} min read</span>
            </div>
            <div className="jmeta__row">
              <span className="mono-sm muted">Filed under</span>
              <span className="t-base">Design · Specification</span>
            </div>
          </div>

          <div className="prose prose--lead">
            {e.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {e.pullQuote && (
        <section className="section--clay" style={{ marginTop: "4.8rem" }}>
          <div className="block-pad" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
            <blockquote className="pullquote balance" style={{ margin: 0 }}>
              “{e.pullQuote}”
            </blockquote>
            <p className="mono-sm muted" style={{ marginTop: "2.4rem" }}>
              {e.number} — {e.title}
            </p>
          </div>
        </section>
      )}

      {/* Previous / next, so the column can be read straight through. */}
      <section className="block-pad" style={{ paddingTop: "6.4rem" }}>
        <div className="jpager">
          {older ? (
            <Link href={`/journal/${older.slug}`} className="jpager__cell">
              <span className="mono-sm muted arrow-link is-back">
                <Arrow className="arrow" /> Previous issue · {older.number}
              </span>
              <span className="h5 balance">{older.title}</span>
            </Link>
          ) : (
            <div className="jpager__cell">
              <span className="mono-sm muted">First issue</span>
              <span className="t-base muted">The column starts here.</span>
            </div>
          )}

          {newer ? (
            <Link href={`/journal/${newer.slug}`} className="jpager__cell is-next">
              <span className="mono-sm muted arrow-link">
                Next issue · {newer.number} <Arrow className="arrow" />
              </span>
              <span className="h5 balance">{newer.title}</span>
            </Link>
          ) : (
            <div className="jpager__cell is-next">
              <span className="mono-sm muted">Latest issue</span>
              <span className="t-base muted">You are up to date.</span>
            </div>
          )}
        </div>
      </section>

      <section className="block-pad" style={{ paddingTop: "3.2rem", paddingBottom: "6.4rem" }}>
        <div className="sec-head">
          <div className="sec-head__title">
            <h2 className="h3">The full column</h2>
            <span className="counter sec-head__count">{others.length}</span>
          </div>
          <Link href="/journal" className="mono arrow-link">
            All issues <Arrow className="arrow" />
          </Link>
        </div>
        <div className="jarchive">
          {others.map((o, idx) => (
            <Reveal key={o.slug} delay={idx * 50}>
              <JournalRow entry={o} compact />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
