"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The homepage stage with a scroll parallax: the photograph drifts at a third
 * of the scroll speed while the headline lifts away a little faster and fades.
 * Writes one CSS variable per frame; the transforms live in the stylesheet.
 * Reduced-motion visitors get the static stage.
 */
export default function ParallaxStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const h = el.offsetHeight || 1;
      // 0 at the top of the page, 1 once the stage has scrolled fully away.
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      el.style.setProperty("--stage-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="stage" ref={ref}>
      {children}
    </section>
  );
}
