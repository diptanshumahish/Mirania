/**
 * A statement that inks itself in word by word as it crosses the viewport.
 * Pure CSS (scroll-driven animations); where those are unsupported, or motion
 * is reduced, the text is simply set in full.
 */
export default function ScrollWords({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "blockquote" | "h2";
}) {
  const words = text.split(/\s+/);
  const last = Math.max(words.length - 1, 1);

  return (
    <Tag className={`swords ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={i}
          className="swords__w"
          aria-hidden="true"
          style={{ "--p": (i / last).toFixed(3) } as React.CSSProperties}
        >
          {w}{" "}
        </span>
      ))}
    </Tag>
  );
}
