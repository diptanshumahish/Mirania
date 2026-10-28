import Link from "next/link";
import { contact, credits, nav, site } from "@/data/site";
import { activeCategories } from "@/data/catalog";
import { Arrow, Lockup } from "./Logo";
import Subscribe from "./Subscribe";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <Link href="/" className="footer__brand" aria-label="Mirania Furniture — home">
            <Lockup />
          </Link>
          <p className="footer__line">
            Spaces transformed into <em>comfortable havens</em>, since {site.founded}.
          </p>
        </div>

        <div className="footer__grid block-pad">
          <div className="footer__col">
            <p className="footer__label">Showroom</p>
            <address className="t-md footer__address">
              {contact.address.name}
              <br />
              {contact.address.lines.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </address>
            <a
              href={contact.map}
              target="_blank"
              rel="noreferrer"
              className="mono-sm arrow-link link-u footer__map"
            >
              See map <Arrow className="arrow" />
            </a>
          </div>

          <div className="footer__col">
            <p className="footer__label">Contact</p>
            <ul className="footer__list t-md">
              <li>
                <a href={`mailto:${contact.email}`} className="link-u">
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="link-u">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="link-u">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__label">Collections</p>
            <ul className="footer__list t-md">
              {activeCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="link-u">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__label">Pages</p>
            <ul className="footer__list t-md">
              <li>
                <Link href="/" className="link-u">
                  Home
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-u">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col footer__col--wide">
            <p className="footer__label">Newsletter</p>
            <p className="t-md footer__note">
              New arrivals, house collaborations and showroom previews. A few
              times a year, never more.
            </p>
            <Subscribe />
          </div>
        </div>

        <div className="footer__bar">
          <p className="mono-sm muted">
            {credits.line.replace("©", `© ${credits.year}`)}
          </p>
          <div className="footer__social">
            <a href={contact.social.instagram} target="_blank" rel="noreferrer" className="mono-sm link-u">
              Instagram
            </a>
            <a href={contact.social.facebook} target="_blank" rel="noreferrer" className="mono-sm link-u">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
