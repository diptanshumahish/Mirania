type Props = { className?: string; title?: string };

/**
 * The Mirania mark: two overlapping arches on a shared baseline, forming an
 * arcade that reads as an M. Redrawn as vector from the original logotype —
 * four uprights spaced 321 apart, two 321-radius arcs, 43 stroke.
 *
 * Geometry is on the centreline, so the drawn edges land exactly on the
 * viewBox bounds and the mark optically aligns with type set beside it.
 */
export function Mark({ className, title = "Mirania" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1006 686"
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="43"
      strokeLinecap="butt"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.5 664.5V342.5a321 321 0 0 1 642 0v322" />
      <path d="M342.5 664.5V342.5a321 321 0 0 1 642 0v322" />
      <path d="M0 664.5h1006" />
    </svg>
  );
}

/** Mark plus logotype, as it appears in the header. */
export function Lockup({ className }: Props) {
  return (
    <span className={`lockup ${className ?? ""}`}>
      <Mark className="lockup__mark" />
      <span className="lockup__type">
        <span className="lockup__name">Mirania</span>
        <span className="lockup__sub">Furniture</span>
      </span>
    </span>
  );
}

export function Arrow({ className }: Props) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
