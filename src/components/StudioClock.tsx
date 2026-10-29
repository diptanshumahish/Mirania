"use client";

import { useEffect, useState } from "react";
import { contact, site } from "@/data/site";

type Status = { time: string; open: boolean; note: string } | null;

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function hhmm(decimal: number) {
  const h = Math.floor(decimal);
  const m = Math.round((decimal - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function read(): Status {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));

  const decimal = hour + minute / 60;
  const { open, close, closedDays } = contact.openHours;
  const isOpen = !closedDays.includes(day) && decimal >= open && decimal < close;

  // When closed, say when the doors next open.
  let note = `until ${hhmm(close)}`;
  if (!isOpen) {
    let ahead = !closedDays.includes(day) && decimal < open ? 0 : 1;
    while (closedDays.includes((day + ahead) % 7)) ahead++;
    const when = ahead === 0 ? "" : ahead === 1 ? " tomorrow" : ` ${DAYS[(day + ahead) % 7]}`;
    note = `opens${when} at ${hhmm(open)}`;
  }

  return {
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    open: isOpen,
    note,
  };
}

/**
 * Live showroom clock and open/closed status. Renders placeholders on the
 * server so the markup can never disagree with the client's first paint.
 */
export default function StudioClock() {
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    setStatus(read());
    const id = setInterval(() => setStatus(read()), 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock">
      <span
        className={`dot ${status?.open ? "is-live" : "is-closed"}`}
        aria-hidden="true"
      />
      <p className="clock__text">
        <span className="clock__state">
          {status ? (status.open ? "Open now" : "Closed") : " "}
          {status && <span className="muted">, {status.note}</span>}
        </span>
        <span className="clock__time muted">
          {site.city} · <span suppressHydrationWarning>{status?.time ?? "--:--"}</span> IST
        </span>
      </p>
    </div>
  );
}
