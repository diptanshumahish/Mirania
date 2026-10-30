import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  /**
   * A production build and `next dev` cannot share an output directory — they
   * overwrite each other's manifests, and the running server starts serving
   * 400s for assets the other build removed. `NEXT_DIST_DIR` lets a build run
   * somewhere else while a dev server is up.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  /**
   * The collections section is retired (its route lives on, unrouted, in
   * `src/app/_collections`). Old links and search results land on brands.
   */
  async redirects() {
    return [
      { source: "/collections", destination: "/brands", permanent: false },
      { source: "/collections/:path*", destination: "/brands", permanent: false },
    ];
  },
};

export default nextConfig;
