import Image from "next/image";
import { clients } from "@/data/projects";

/**
 * Two rows of client logos drifting in opposite directions. Each row is
 * rendered twice back to back so the loop has no seam; the copy is hidden
 * from assistive tech. Logos sit on white tiles, since most were supplied on
 * white plates.
 */
export default function ClientMarquee() {
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)];

  return (
    <div className="clients" aria-label="Clients">
      {rows.map((row, r) => (
        <div key={r} className={`clients__row ${r % 2 ? "is-reverse" : ""}`}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="clients__track" aria-hidden={copy === 1 || undefined}>
              {row.map((c) => (
                <li key={c.slug} className="clients__item">
                  <span className="clients__logo">
                    <Image src={c.logo} alt={copy === 0 ? c.name : ""} fill sizes="200px" />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
