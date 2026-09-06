# Mirania

A redesign of [mirania.in](https://mirania.in) — the same business, the same
catalogue, rebuilt as a modern editorial site in the visual language of
[groth.studio](https://www.groth.studio).

Next.js 15 (App Router) · React 19 · TypeScript · hand-written CSS.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run build:check    # production build into .next-check, safe while dev runs
```

> `next build` and `next dev` cannot share an output directory — they overwrite
> each other's manifests and the running server starts serving 400s for assets
> the other build removed. `build:check` sets `NEXT_DIST_DIR` so a verification
> build can run without disturbing a dev server.

---

## Where the content came from

Every fact on the site — addresses, phone numbers, opening hours, the brand
history, the vision and mission statements, the philosophy copy, the product
catalogue — is carried over from the live mirania.in site. Nothing about the
business was invented.

| Source | Lands in |
| --- | --- |
| `index.php`, `about.php`, `contact.php`, `careers.php` | `src/data/site.ts` |
| `brands.php`, `brand-view.php` | `src/data/catalog.ts` (`brands`) |
| `product.php`, `detail-page/view-product.php` (366 pieces) | `src/data/catalog.json` |
| `/assets/images`, `/Admin/includes/uploads` | `public/img` |

Copy that *is* new is limited to section framing and category descriptions —
the legacy site had no equivalent text for those slots. The house descriptions
in `src/data/catalog.ts` are editorial summaries; review them before launch.

### Photography

`scripts/fetch-assets.mjs` pulls the imagery into `public/img`. It tries two
sources in order:

1. **the live origin** — fastest, but it serves images only with a matching
   `Referer` and rate-limits hard enough to firewall an IP that pulls quickly;
2. **the Wayback Machine** — slower, but byte-identical and still reachable
   when the origin has shut us out.

```bash
npm run fetch:assets                      # probes the origin, picks a source
npm run fetch:assets -- --source=wayback  # force the archive
npm run fetch:assets -- --source=origin   # force the live site
```

It is resumable — anything already on disk is skipped — so re-running only
fetches what is still missing. Archive throttling means a single pass may not
land everything; run it again until the count stops moving.

**Current state:** 423 of 1,189 referenced files are on disk (36 MB).

| | Referenced | On disk |
| --- | --- | --- |
| Editorial stills | 57 | 57 |
| Product primary photos | 366 | 366 |
| Product gallery photos | 766 | 0 |

The origin blocked this machine during the catalogue scrape and has not let up,
so everything came from the archive. The archive holds all 366 primary product
photos but never crawled `Admin/includes/uploads/galary/` — verified against the
Wayback CDX index, not inferred from failures — so product pages currently show
one photograph each. `src/app/products/[slug]/page.tsx` filters the gallery by
what exists rather than padding it with placeholders, and picks the extra views
up automatically if the origin ever becomes reachable again.

Until a given file is on disk, `src/lib/asset.ts` swaps in
`public/img/placeholder.svg` so pages always render. Nothing else needs to
change once assets land — the next build picks them up.

---

## Design system

The language is lifted from Groth Studio and re-tuned for a furniture house.

**Type.** `Switzer` (Fontshare) stands in for PP Neue Montreal; `Geist Mono`
for GT America Mono. Both are self-hosted in `public/fonts` — no runtime font
requests.

**Fluid scale.** The root font size is `0.6944vw`, so `1rem ≈ 10px` at 1440px
and the whole page scales with the viewport. Below 991px it locks to 10px and
the mobile type ramp takes over. Every size in the CSS is therefore in `rem`.

**Palette.** Warm neutrals with a single accent:

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#fcfaf2` | page ground |
| `--sage` | `#dfddc7` | collections band |
| `--clay` | `#d7caa9` | philosophy band |
| `--ink` | `#101010` | text, rules, inverted band |
| `--accent` | `#bf551a` | selection, ticker marks, button hover |

**Motion.** Restrained and mostly CSS. The homepage opens with a veil: the
mark draws itself via `stroke-dashoffset`, then the sheet lifts and hands off
to the hero's own mark fading up in its place. It is entirely CSS-driven, so it
always dismisses itself — a stalled script can never trap a visitor behind it —
and an inline script skips it on a repeat visit in the same tab with no flash.
Elsewhere: staggered entrances, scroll reveals, nav underlines that grow from
the left, and small hover leans on rows and cards. Everything collapses under
`prefers-reduced-motion`, including the veil, which is simply never shown.

**Case.** Nothing on the site is set in uppercase, and no text carries wide
positive tracking — meta labels lean on the mono face and a muted tone for
hierarchy instead. Only display headings are tracked, and always negative.

**Motifs.** 1px hairline rules and dotted dividers; mono meta labels in
sentence case; outlined pill tags and a counter badge pinned to the top-right
of section headings; alternating full-bleed editorial rows; product shots set in
`mix-blend-mode: multiply` so their white studio ground dissolves into the
warm page.

Tokens live in `src/styles/globals.css`, components in
`src/styles/components.css`.

---

## Structure

```
src/
  app/
    page.tsx                     home
    about/  careers/  contact/
    collections/                 index
    collections/[category]/      grid + ?sub= filter
    brands/  brands/[slug]/
    products/[slug]/             366 pages
  components/                    Nav, Footer, Media, ProductCard, forms…
  data/
    site.ts                      business content
    catalog.ts                   categories, brands, lookups
    catalog.json                 366 products (generated)
  lib/asset.ts                   missing-image fallback
  styles/
```

The build prerenders 390 pages.

### Routes vs. the old site

| Old | New |
| --- | --- |
| `index.php` | `/` |
| `about.php` | `/about` |
| `brands.php` · `brand-view.php?brand=x` | `/brands` · `/brands/x` |
| `product.php?all=view` | `/collections` |
| `product.php?category=x` | `/collections/x` |
| `product.php?category=x&sub_cat=y` | `/collections/x?sub=y` |
| `detail-page/view-product.php?p=x` | `/products/x` |
| `careers.php` · `contact.php` | `/careers` · `/contact` |

Worth adding 301s from the old PHP URLs when this goes live.

---

## Known gaps

- **No backend.** The contact, careers and newsletter forms compose a
  pre-filled `mailto:` or WhatsApp message rather than posting anywhere, and
  say so on the page. Wire them to a handler before launch.
- **Accessories** is defined as a category but the legacy catalogue returned no
  products for it, so it is hidden from the collections index until it has
  stock.
- **Product descriptions.** The legacy detail pages carried lorem ipsum, so the
  redesign shows real specification metadata instead of fake body copy.
- **Gallery photography.** Only one photo per product is available (see above).
  Re-run `npm run fetch:assets` once mirania.in is reachable to fill the rest.
- The `20+` years figure and the 2003 founding date follow the legacy site's own
  "over 20 years ago" phrasing; confirm the exact year.
