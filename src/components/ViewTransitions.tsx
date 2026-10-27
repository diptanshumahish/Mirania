"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Page-to-page transitions through the View Transitions API. Internal link
 * clicks are caught in the capture phase — before Next's Link handler, which
 * steps aside once a click is defaultPrevented — and the navigation runs inside
 * `startViewTransition`, held open until the new route has committed. The
 * choreography itself lives in the stylesheet (`::view-transition-*`).
 *
 * Browsers without the API, reduced-motion visitors, modified clicks and
 * same-page links all fall through to ordinary navigation.
 */
export default function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const settle = useRef<(() => void) | null>(null);

  useEffect(() => {
    settle.current?.();
    settle.current = null;
  }, [pathname]);

  useEffect(() => {
    if (!("startViewTransition" in document)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduce.matches) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      e.preventDefault();
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // Never hold the page frozen if the route is slow to commit.
            const timer = window.setTimeout(resolve, 2500);
            settle.current = () => {
              window.clearTimeout(timer);
              resolve();
            };
            router.push(url.pathname + url.search + url.hash);
          }),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
