"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { contact, nav } from "@/data/site";
import { Lockup, Arrow } from "./Logo";
import StudioClock from "./StudioClock";

/**
 * Experiment: the menu button and its sheet on desktop as well, in place of
 * the inline links. Set to false to bring the inline links back.
 */
const DESKTOP_MENU = true;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const linksRef = useRef<HTMLElement>(null);
  // The homepage opens on a full-bleed photograph; until the visitor scrolls
  // the bar sits on it with no ground of its own.
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => setOpen(false), [pathname]);

  // One underline shared by every link: it slides to whichever link is under
  // the pointer and settles back under the current page when the pointer leaves.
  const placeInk = useCallback((target?: HTMLElement | null) => {
    const links = linksRef.current;
    if (!links) return;
    const el = target ?? links.querySelector<HTMLElement>(".nav__link.is-current");
    links.classList.toggle("has-ink", Boolean(el));
    if (!el) return;
    links.style.setProperty("--ink-x", `${el.offsetLeft}px`);
    links.style.setProperty("--ink-w", `${el.offsetWidth}px`);
  }, []);

  useEffect(() => {
    placeInk();
    // Link widths change once the serif loads and whenever the root size flexes.
    document.fonts?.ready.then(() => placeInk());
    const onResize = () => placeInk();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, placeInk]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`nav ${DESKTOP_MENU ? "nav--menu" : ""} ${open ? "is-open" : ""} ${scrolled ? "is-scrolled" : ""} ${overHero ? "is-over" : ""}`}
    >
      <div className="nav__bar">
        <Link href="/" className="nav__brand" aria-label="Mirania Furniture — home">
          <Lockup />
        </Link>

        <div className="nav__meta hide-mobile">
          <StudioClock />
        </div>

        {!DESKTOP_MENU && (
          <nav
            ref={linksRef}
            className="nav__links hide-mobile"
            aria-label="Primary"
            onMouseLeave={() => placeInk()}
            onBlur={() => placeInk()}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav__link ${pathname.startsWith(item.href) ? "is-current" : ""}`}
                onMouseEnter={(e) => placeInk(e.currentTarget)}
                onFocus={(e) => placeInk(e.currentTarget)}
              >
                {item.label}
              </Link>
            ))}
            <span className="nav__ink" aria-hidden="true" />
          </nav>
        )}

        <button
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-overlay"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="nav__burger" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      {/* Stays mounted so it can animate closed as well as open; `inert`
          keeps it out of the tab order and away from the pointer meanwhile. */}
      <div className="nav__overlay" id="nav-overlay" inert={!open}>
        <nav className="nav__overlay-links" aria-label="Menu">
          {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav__overlay-link ${
                (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "is-current" : ""
              }`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="nav__overlay-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav__overlay-foot">
          <StudioClock />
          <address className="mono-sm nav__overlay-address">
            {contact.address.lines.slice(0, 3).map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </address>
          <div className="stack" style={{ gap: "0.6rem" }}>
            <a href={`mailto:${contact.email}`} className="mono-sm link-u">
              {contact.email}
            </a>
            <a href={contact.primaryPhoneHref} className="mono-sm link-u">
              {contact.primaryPhone}
            </a>
            <a
              href={contact.whatsapp}
              className="mono-sm arrow-link link-u"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <Arrow className="arrow" />
            </a>
          </div>
        </div>
      </div>
      <div className="nav__scrim" aria-hidden="true" onClick={() => setOpen(false)} />
    </header>
  );
}
