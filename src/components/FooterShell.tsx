"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The footer's contents stay pinned to the bottom of the viewport and are
 * uncovered as the footer's own box scrolls into view (clip-path clips the
 * fixed layer to that box, so it stays clickable, unlike a negative z-index).
 * That only works while the contents fit in the viewport; on short or narrow
 * screens it falls back to ordinary flow.
 */
export default function FooterShell({ children }: { children: React.ReactNode }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const check = () => {
      const h = pin.offsetHeight;
      setHeight(h <= window.innerHeight ? h : null);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(pin);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <footer
      className={`footer ${height !== null ? "is-reveal" : ""}`}
      style={height !== null ? { height } : undefined}
    >
      <div ref={pinRef} className="footer__pin">
        {children}
      </div>
    </footer>
  );
}
