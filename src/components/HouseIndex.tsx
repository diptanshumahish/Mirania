"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Keeps one house "active" at a time. Rows carry `data-house`; the matching
 * panel plate and caption share the key. Markup and images are
 * server-rendered — this only moves an `is-active` class around.
 *
 * Two inputs drive it, and the latest one wins:
 * - scroll: the row crossing the middle of the viewport becomes active;
 * - pointer/keyboard: moving over a row, or tabbing to it, activates it.
 * Hover listens to `pointermove` rather than `pointerover`, so a pointer
 * resting still while the page scrolls under it doesn't fight the scroll.
 */
export default function HouseIndex({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const rows = Array.from(el.querySelectorAll<HTMLElement>(".houses__row[data-house]"));
    let current = rows.find((r) => r.classList.contains("is-active"))?.dataset.house ?? "";

    const activate = (key: string) => {
      if (!key || key === current) return;
      current = key;
      el.querySelectorAll<HTMLElement>("[data-house]").forEach((node) => {
        node.classList.toggle("is-active", node.dataset.house === key);
      });
    };

    const fromEvent = (e: Event) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>(".houses__row[data-house]");
      if (row?.dataset.house) activate(row.dataset.house);
    };

    let frame = 0;
    const fromScroll = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const line = window.innerHeight / 2;
      // Only while the index is actually on screen.
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const row of rows) {
        const r = row.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - line);
        if (dist < bestDist) {
          bestDist = dist;
          best = row;
        }
      }
      if (best?.dataset.house) activate(best.dataset.house);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(fromScroll);
    };

    el.addEventListener("pointermove", fromEvent);
    el.addEventListener("focusin", fromEvent);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointermove", fromEvent);
      el.removeEventListener("focusin", fromEvent);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="houses__layout" ref={root}>
      {children}
    </div>
  );
}
