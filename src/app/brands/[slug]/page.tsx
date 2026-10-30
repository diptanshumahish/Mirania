import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Logo";
import {
  brandBySlug,
  brands,
  productsByBrand,
  type Product,
} from "@/data/catalog";
import { contact, site } from "@/data/site";
import {
  JsonLd,
  STORE_ID,
  absolute,
  breadcrumbList,
  canonical,
  webPage,
} from "@/lib/seo";

type Params = { slug: string };

/** How many pieces a brand page shows. It is a sampler, not a listing. */
const SELECTION = 8;

/**
 * A spread of a house's pieces: one from each kind in turn (a sofa, a chair,
 * a table…) until the selection is full, so a brand with ninety sofas does
 * not read as a sofa shop.
 */
function selection(items: Product[], limit = SELECTION) {
  const byKind = new Map<string, Product[]>();
  for (const p of items) {
    const k = p.sub ?? p.category;
    byKind.set(k, [...(byKind.get(k) ?? []), p]);
  }
  const queues = [...byKind.values()];
  const picked: Product[] = [];
  for (let i = 0; picked.length < limit && queues.some((q) => q.length > i); i++) {
    for (const q of queues) {
      if (q[i] && picked.length < limit) picked.push(q[i]);
    }
  }
  return picked;
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = brandBySlug.get(slug);
  if (!b) return { title: "Brand", robots: { index: false, follow: true } };

  const path = `/brands/${b.slug}`;
  const description = `${b.name} in Kolkata, through Mirania. ${b.blurb}`;

  return {
    title: b.name,
    description: description.length <= 168 ? description : b.blurb,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: `${b.name} in Kolkata — Mirania`,
      description: b.blurb,
      url: canonical(path),
      type: "website",
      images: [{ url: b.cover, alt: `${b.name} at Mirania` }],
    },
  };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = brandBySlug.get(slug);
  if (!b) notFound();

  const pieces = selection(productsByBrand(b.slug));
  const index = brands.findIndex((x) => x.slug === b.slug);
  const next = brands[(index + 1) % brands.length];
  const gallery = b.gallery.filter((g) => g !== b.cover).slice(0, 3);

  const path = `/brands/${b.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Brands", path: "/brands" },
    { name: b.name, path },
  ];
  const enquiry = `Hello Mirania — I'd like to know more about ${b.name}.`;

  return (
    <>
      <JsonLd
        data={[
          webPage(path, `${b.name} in Kolkata`, b.blurb, {
            trail,
            image: b.cover,
          }),
          breadcrumbList(trail),
          {
            "@type": "Brand",
            "@id": `${site.url}${path}#brand`,
            name: b.name,
            description: b.blurb,
            url: absolute(path),
            logo: absolute(b.logo),
            image: absolute(b.cover),
            // Declares Mirania as the authorised retail point for the house —
            // the relationship a "<brand> dealer near me" query resolves on.
            makesOffer: {
              "@type": "Offer",
              availableAtOrFrom: { "@id": STORE_ID },
              itemOffered: {
                "@type": "Product",
                name: `${b.name} furniture`,
                category: "Furniture",
              },
            },
          },
        ]}
      />

      {/* Opening -------------------------------------------------------- */}
      <header className="bhead">
        <div className="bhead__text">
          <p className="mono-sm muted phead__crumbs">
            <Link href="/brands" className="link-u">
              Brands
            </Link>
            <span aria-hidden="true">/</span>
            <span>{b.name}</span>
          </p>
          <div className="bhead__logo">
            <Image src={b.logo} alt={`${b.name} logo`} fill sizes="24rem" priority />
          </div>
          <h1 className="h1 balance">{b.tagline}</h1>
          <p className="mono-sm muted">
            {b.own ? "A Mirania brand" : b.name} · {b.place} · Since {b.founded}
          </p>
        </div>
        <div className="bhead__media">
          <Media
            src={b.cover}
            alt={`${b.name} interior`}
            ratio={4 / 5}
            sizes="(max-width: 991px) 100vw, 50vw"
            priority
          />
        </div>
      </header>

      {/* About the house ------------------------------------------------ */}
      <section className="block-pad bstory">
        <p className="mono-sm muted">About {b.name}</p>
        <div className="bstory__body">
          <Reveal className="bstory__text">
            <p className="h4 balance">{b.story[0]}</p>
            {b.story.length > 1 && (
              <div className="prose">
                {b.story.slice(1).map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            )}
          </Reveal>
          <div className="deflist">
            <div className="deflist__row">
              <span className="mono-sm muted">Origin</span>
              <span className="t-base">{b.place}</span>
            </div>
            <div className="deflist__row">
              <span className="mono-sm muted">Founded</span>
              <span className="t-base">{b.founded}</span>
            </div>
            <div className="deflist__row">
              <span className="mono-sm muted">Covers</span>
              <span className="t-base">{b.disciplines.join(" · ")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Photography ---------------------------------------------------- */}
      {gallery.length > 0 && (
        <section className={`pad-x bgallery is-${gallery.length}`}>
          {gallery.map((src, i) => (
            <Media
              key={src}
              src={src}
              alt={`${b.name}, image ${i + 1}`}
              ratio={i === 0 && gallery.length > 1 ? 4 / 3 : 1}
              sizes="(max-width: 780px) 100vw, 50vw"
              unveil
            />
          ))}
        </section>
      )}

      {/* A few pieces --------------------------------------------------- */}
      {pieces.length > 0 && (
        <section className="block-pad bpieces">
          <div className="sec-head">
            <div className="sec-head__title">
              <p className="mono-sm muted">Selected pieces</p>
              <h2 className="h3">A few from {b.name}</h2>
            </div>
            <p className="t-md muted sec-head__desc">
              A glimpse of what we bring in from {b.name}. Much more is
              available to order; ask us for the full range.
            </p>
          </div>
          <ul className="pgrid">
            {pieces.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Enquire -------------------------------------------------------- */}
      <section className="section--warm">
        <div className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "6.4rem" }}>
          <div className="split">
            <h2 className="h3 balance">Interested in {b.name}?</h2>
            <div className="stack" style={{ gap: "2rem" }}>
              <p className="t-lg">
                Send us a model name, a photograph or a brief. We will come back
                with options, finishes and a quote, delivered and installed.
              </p>
              <div className="pdp__actions">
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
                    `Enquiry — ${b.name}`,
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
        <Link href={`/brands/${next.slug}`} className="stack" style={{ gap: "1.2rem" }}>
          <span className="mono-sm muted">Next brand</span>
          <span className="h2 arrow-link">
            {next.name} <Arrow className="arrow" />
          </span>
        </Link>
      </section>
    </>
  );
}
