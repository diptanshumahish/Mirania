import ProductCard from "./ProductCard";
import type { Product } from "@/data/catalog";

export default function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) {
    return (
      <p className="t-lg muted" style={{ padding: "6rem 0" }}>
        Nothing catalogued here yet. Speak to the showroom — much of what we hold
        never makes it online.
      </p>
    );
  }
  return (
    <ul className="pgrid">
      {items.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}
