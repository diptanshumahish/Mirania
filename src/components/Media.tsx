import Image from "next/image";
import { assetSrc } from "@/lib/asset";

/**
 * Fixed-ratio image frame. `ratio` is width/height.
 */
export default function Media({
  src,
  alt,
  ratio = 1,
  sizes = "100vw",
  priority = false,
  contain = false,
  className = "",
  zoom = false,
}: {
  src: string;
  alt: string;
  ratio?: number;
  sizes?: string;
  priority?: boolean;
  contain?: boolean;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <div
      className={`media rounded ${contain ? "is-contain" : ""} ${zoom ? "zoom" : ""} ${className}`}
      style={{ aspectRatio: String(ratio) }}
    >
      <Image
        src={assetSrc(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: contain ? "contain" : "cover" }}
      />
    </div>
  );
}
