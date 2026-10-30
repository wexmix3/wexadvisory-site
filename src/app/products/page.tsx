import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductsSection from "@/components/ProductsSection";
import CtaBand from "@/components/brand/CtaBand";

// Added 2026-10-29 (Tenex teardown): the products shelf came off the homepage
// so the homepage speaks to one buyer. Nav "Products" points here; the old
// /#products anchor no longer exists on the homepage. Same day, brand
// redesign: the hybrid layout (heading, shelf of covers, plain list, close).
const PAGE_URL = "https://www.wexadvisory.com/products";
const TITLE = "Products: free checks and reports | Wex Advisory";
const DESCRIPTION =
  "Set-scope products you can start with today: a $299 competitor report, a free card fee check, a free supplier invoice check, and a Canon demo.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: TITLE }],
  },
};

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <ProductsSection asPage />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
