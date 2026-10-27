"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Arrow } from "./Logo";

const DESKTOP = "(min-width: 992px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * A scroll-locked sideways row. On desktop the band pins to the viewport and
 * vertical scrolling drives the track horizontally — one pixel down, one
 * pixel across — until the last card is in, then the page carries on. The
 * section's height is set to exactly the horizontal distance plus a screen,
 * so the lock lasts as long as the row.
 *
 * On touch-sized screens, or with reduced motion, it is a plain native
 * horizontal scroller with snap instead.
 */
export default function PinnedRail({
  head,
  children,
  label,
  className = "",
  id,
}: {
  head: ReactNode;
  children: ReactNode;
  label: string;
  className?: string;
  id?: string;
}) {
  const outer = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLUListElement | null>(null);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const distance = useRef(0);

  // Pick the mode, and size the pinned section to the track.
  const measure = useCallback(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    const pin = window.matchMedia(DESKTOP).matches && !window.matchMedia(REDUCED).matches;
    setPinned(pin);
    if (!pin) {
      o.style.height = "";
      t.style.transform = "";
      distance.current = Math.max(t.scrollWidth - t.clientWidth, 0);
      return;
    }
    distance.current = Math.max(t.scrollWidth - t.clientWidth, 0);
    o.style.height = `${window.innerHeight + distance.current}px`;
  }, []);

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = distance.current;
      if (window.matchMedia(DESKTOP).matches && !window.matchMedia(REDUCED).matches) {
        const travelled = Math.min(Math.max(-o.getBoundingClientRect().top, 0), max);
        t.style.transform = `translate3d(${-travelled}px, 0, 0)`;
        setProgress(max > 0 ? travelled / max : 0);
      } else {
        setProgress(max > 0 ? t.scrollLeft / max : 0);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    // Images settle the track width after first paint.
    const ro = new ResizeObserver(onResize);
    ro.observe(t);
    window.addEventListener("scroll", onScroll, { passive: true });
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector<HTMLElement>(":scope > li");
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const by = dir * (card ? card.offsetWidth + gap : t.clientWidth * 0.8);
    // Pinned, horizontal travel is vertical scroll; otherwise move the row.
    if (pinned) window.scrollBy({ top: by, behavior: "smooth" });
    else t.scrollBy({ left: by, behavior: "smooth" });
  };

  return (
    <section
      ref={outer}
      id={id}
      className={`prail ${pinned ? "is-pinned" : "is-native"} ${className}`}
    >
      <div className="prail__sticky">
        {head}
        <ul className="prail__track" ref={track} aria-label={label} tabIndex={pinned ? -1 : 0}>
          {children}
        </ul>
        <div className="rail__controls pad-x">
          <div className="rail__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }} />
          </div>
          <div className="rail__buttons">
            <button
              type="button"
              className="rail__btn is-back"
              onClick={() => step(-1)}
              disabled={progress <= 0.001}
              aria-label="Previous"
            >
              <Arrow />
            </button>
            <button
              type="button"
              className="rail__btn"
              onClick={() => step(1)}
              disabled={progress >= 0.999}
              aria-label="Next"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
