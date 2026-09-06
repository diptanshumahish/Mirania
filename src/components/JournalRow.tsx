import Link from "next/link";
import Media from "@/components/Media";
import { Arrow } from "@/components/Logo";
import type { Entry } from "@/data/journal";

/**
 * One back issue in the archive. The index runs it with the plate; the article
 * pages run it compact, where a column of thumbnails would only repeat the
 * artwork already sitting above it.
 */
export default function JournalRow({
  entry,
  compact = false,
}: {
  entry: Entry;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className={`jrow zoom-parent ${compact ? "is-compact" : ""}`}
    >
      <span className="mono jrow__n">{entry.number}</span>
      <span className="mono-sm muted jrow__date">
        <time dateTime={entry.date}>{entry.dateLabel}</time>
      </span>
      <div className="jrow__body">
        <h3 className={`${compact ? "h5" : "h4"} jrow__title balance`}>{entry.title}</h3>
        <p className="t-base muted">{entry.standfirst}</p>
        <span className="mono-sm arrow-link">
          Read issue <Arrow className="arrow" />
        </span>
      </div>
      {!compact && (
        <div className="jrow__thumb">
          <Media
            src={entry.image}
            alt={`${entry.title} — ${entry.standfirst}`}
            ratio={1}
            sizes="120px"
            zoom
          />
        </div>
      )}
    </Link>
  );
}
