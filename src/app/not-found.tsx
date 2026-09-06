import Link from "next/link";
import { Arrow } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="block-pad" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="stack" style={{ gap: "2.4rem" }}>
        <p className="mono-sm muted">Error 404</p>
        <h1 className="h1 balance">This page has left the floor.</h1>
        <p className="t-lg muted" style={{ maxWidth: "52rem" }}>
          The piece or page you were looking for is no longer catalogued here.
          The collections are the best place to pick the thread back up.
        </p>
        <Link href="/collections" className="btn arrow-link" style={{ alignSelf: "flex-start" }}>
          Browse collections <Arrow className="arrow" />
        </Link>
      </div>
    </section>
  );
}
