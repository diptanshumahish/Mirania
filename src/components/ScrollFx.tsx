"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Unveils every `[data-unveil]` frame as it scrolls into view: the photograph
 * rises out of an arch, the brand's own shape. One observer for the whole
 * page, re-armed on each route.
 *
 * The hidden starting state is keyed to `html.fx`, which only this component
 * sets — without script, every image simply shows.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const root = document.documentElement;
    root.classList.add("fx");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-unveiled");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    document
      .querySelectorAll("[data-unveil]:not(.is-unveiled)")
      .forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
