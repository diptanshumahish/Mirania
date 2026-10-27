"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mark } from "./Logo";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const WORD = "mirania";

type Arch = { id: number; left: number; size: number; dur: number; delay: number; drift: number };

/**
 * Small rewards for the curious. None of them announce themselves:
 *
 * - The console carries a signature for whoever opens devtools.
 * - Leave the tab and its title asks you to come back.
 * - Knock five times on the header mark and it answers.
 * - Type "mirania" anywhere and a handful of arches drift up the screen.
 * - The Konami code toggles archive mode — sepia and film grain.
 */
export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);
  const [arches, setArches] = useState<Arch[]>([]);
  const toastTimer = useRef(0);

  const say = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  // Console signature -------------------------------------------------------
  useEffect(() => {
    console.log(
      "%c ⌒⌒ %c Mirania Furniture · Kolkata\n%cYou look like someone who reads the source. We're hiring — /careers",
      "font: 600 16px serif; color: #a64b2a",
      "font: 500 14px serif; color: #221c16",
      "font: 12px ui-monospace, monospace; color: #6b5f52",
    );
  }, []);

  // Away from the tab -------------------------------------------------------
  useEffect(() => {
    let saved = "";
    const onVis = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = "Come sit back down · Mirania";
      } else if (saved) {
        document.title = saved;
        saved = "";
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Keyboard: Konami and the typed name ------------------------------------
  useEffect(() => {
    let konami = 0;
    let typed = "";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konami = key === KONAMI[konami] ? konami + 1 : key === KONAMI[0] ? 1 : 0;
      if (konami === KONAMI.length) {
        konami = 0;
        const on = document.documentElement.classList.toggle("is-archive");
        say(on ? "Archive mode. Every room, as it was." : "Back to the present.");
      }

      if (key.length === 1) {
        typed = (typed + key).slice(-WORD.length);
        if (typed === WORD) {
          typed = "";
          say("You said the word.");
          if (reduce.matches) return;
          const base = Date.now();
          setArches(
            Array.from({ length: 14 }, (_, i) => ({
              id: base + i,
              left: 4 + Math.random() * 92,
              size: 2.4 + Math.random() * 4.4,
              dur: 3.2 + Math.random() * 2.4,
              delay: Math.random() * 0.9,
              drift: (Math.random() - 0.5) * 12,
            })),
          );
          window.setTimeout(() => setArches([]), 6800);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [say]);

  // Five knocks on the header mark -----------------------------------------
  useEffect(() => {
    let knocks: number[] = [];
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element | null)?.closest?.(".nav__brand")) return;
      const now = Date.now();
      knocks = [...knocks.filter((t) => now - t < 1800), now];
      if (knocks.length < 5) return;
      knocks = [];
      const root = document.documentElement;
      root.classList.remove("is-knocked");
      void root.offsetWidth; // restart the animation on repeat knocks
      root.classList.add("is-knocked");
      window.setTimeout(() => root.classList.remove("is-knocked"), 1600);
      say("Come in — the door's open.");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [say]);

  return (
    <>
      {arches.length > 0 && (
        <div className="egg-arches" aria-hidden="true">
          {arches.map((a) => (
            <span
              key={a.id}
              className="egg-arch"
              style={
                {
                  left: `${a.left}%`,
                  "--s": `${a.size}rem`,
                  "--d": `${a.dur}s`,
                  "--w": `${a.delay}s`,
                  "--x": `${a.drift}rem`,
                } as React.CSSProperties
              }
            >
              <Mark title="" />
            </span>
          ))}
        </div>
      )}
      <div className={`egg-toast ${toast ? "is-on" : ""}`} role="status" aria-live="polite">
        {toast && <span className="mono-sm">{toast}</span>}
      </div>
    </>
  );
}
