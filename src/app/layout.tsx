import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/components.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { contact, site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mirania — Premium Furniture, Kolkata",
    template: "%s — Mirania",
  },
  description: site.shortDescription,
  openGraph: {
    title: "Mirania — Premium Furniture, Kolkata",
    description: site.shortDescription,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  icons: { icon: "/favicon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: site.legalName,
  description: site.shortDescription,
  telephone: contact.primaryPhone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "#3 Mirania Gardens, 11F East Topsia Road",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700046",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.coords.lat, longitude: site.coords.lng },
  openingHours: "Mo-Sa 10:00-19:30",
  sameAs: [contact.social.instagram, contact.social.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
