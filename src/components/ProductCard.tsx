import Link from "next/link";
import Media from "./Media";
import { brandName, pieceLabel, subLabel, type Product } from "@/data/catalog";

export default function ProductCard({
  product,
  sizes = "(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw",
  priority = false,
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
}) {
  const sub = subLabel(product.category, product.sub);

  return (
    <Link href={`/products/${product.slug}`} className="pcard">
      <Media
        src={product.image}
        alt={`${product.name} ${pieceLabel(
          product.category,
          product.sub,
        ).toLowerCase()} by ${brandName(product.brand)}`}
        ratio={4 / 5}
        sizes={sizes}
        priority={priority}
        zoom
        contain
      />
      <div className="pcard__meta">
        <h3 className="pcard__name t-md">{product.name}</h3>
        <p className="mono-sm muted pcard__sub">
          {brandName(product.brand)}
          {sub ? ` · ${sub}` : ""}
        </p>
      </div>
    </Link>
  );
}
