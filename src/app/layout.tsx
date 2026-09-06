import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "@/styles/components.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { JsonLd, furnitureStore, organization, website } from "@/lib/seo";

const TITLE = "Mirania — Premium Furniture Store in Kolkata";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s — Mirania Furniture, Kolkata",
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Furniture",
  keywords: [
    "luxury furniture Kolkata",
    "premium furniture store Kolkata",
    "designer furniture India",
    "imported furniture Kolkata",
    "office furniture Kolkata",
    "Stanley furniture Kolkata",
    "Bolia India",
    "Steelcase Kolkata",
    "Hunter Douglas blinds Kolkata",
    "multi-designer furniture boutique",
  ],
  openGraph: {
    title: TITLE,
    description: site.shortDescription,
    url: site.url,
    type: "website",
    locale: "en_IN",
    siteName: site.legalName,
    images: [
      {
        url: "/img/site/slider01.jpg",
        width: 1920,
        height: 1080,
        alt: "A Mirania interior — layered seating, timber and soft light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.shortDescription,
    images: ["/img/site/slider01.jpg"],
  },
  /**
   * `max-image-preview: large` is the single highest-leverage directive for a
   * catalogue site — without it Google renders thumbnail-sized previews in
   * Images and Discover, where furniture intent actually converts.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  // Kolkata phone numbers get auto-linked by Safari, which rewrites the DOM and
  // breaks the typographic spacing in the contact block.
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfaf2" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <JsonLd data={[organization(), website(), furnitureStore()]} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
