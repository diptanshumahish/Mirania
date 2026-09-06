"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, nav } from "@/data/site";
import { Lockup, Arrow } from "./Logo";
import StudioClock from "./StudioClock";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

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
    <header className={`nav ${open ? "is-open" : ""}`}>
      <div className="nav__bar">
        <Link href="/" className="nav__brand" aria-label="Mirania Furniture — home">
          <Lockup />
        </Link>

        <div className="nav__meta hide-mobile">
          <StudioClock />
          <p className="mono-sm nav__meta-line">
            Est. 2003
            <br />
            Kolkata, IN
            <br />
            <span className="muted">Multi-designer</span>
          </p>
        </div>

        <nav className="nav__links hide-mobile" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav__link ${pathname.startsWith(item.href) ? "is-current" : ""}`}
            >
              {item.label}
            </Link>
          ))}
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
