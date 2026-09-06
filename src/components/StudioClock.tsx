"use client";

import { useEffect, useState } from "react";
import { contact, site } from "@/data/site";

type Status = { time: string; open: boolean } | null;

function read(): Status {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);

  const decimal = hour + minute / 60;
  const { open, close, closedDays } = contact.openHours;
  const isOpen =
    !closedDays.includes(dayIndex) && decimal >= open && decimal < close;

  return { time: fmt.format(new Date()), open: isOpen };
}

/**
 * Live showroom clock. Renders nothing on the server so the markup can never
 * disagree with the client's first paint.
 */
export default function StudioClock({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    setStatus(read());
    const id = setInterval(() => setStatus(read()), 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock">
      <span
        className={`dot ${status ? (status.open ? "is-live" : "is-closed") : "is-closed"}`}
        aria-hidden="true"
      />
      <p className="mono-sm clock__text">
        <span suppressHydrationWarning>{status?.time ?? "--:--"}</span> IST
        <br />
        {site.city}
        {!compact && (
          <>
            <br />
            <span className="muted">
              {status ? (status.open ? "Open now" : "Closed") : " "}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
