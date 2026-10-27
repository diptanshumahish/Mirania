"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { contact, nav } from "@/data/site";
import { Lockup, Arrow } from "./Logo";
import StudioClock from "./StudioClock";

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
      className={`nav ${open ? "is-open" : ""} ${scrolled ? "is-scrolled" : ""} ${overHero ? "is-over" : ""}`}
    >
      <div className="nav__bar">
        <Link href="/" className="nav__brand" aria-label="Mirania Furniture — home">
          <Lockup />
        </Link>

        <div className="nav__meta hide-mobile">
          <StudioClock />
        </div>

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

        <button
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-overlay"
        >
          <span className="mono-sm">{open ? "Close" : "Menu"}</span>
          <span className="nav__burger" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div className="nav__overlay" id="nav-overlay" hidden={!open}>
        <nav className="nav__overlay-links" aria-label="Primary mobile">
          <Link
            href="/"
            className="nav__overlay-link"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            Index
          </Link>
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav__overlay-link"
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav__overlay-foot">
          <StudioClock />
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
    </header>
  );
}
