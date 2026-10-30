import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/brand/PageHero";

// Site 404 (added 2026-10-29, brand redesign). Before this, unknown URLs and
// notFound() calls fell back to Next's bare default page with no Nav, Footer
// or way back. Next serves this with a 404 status and a noindex robots tag.
export const metadata: Metadata = { title: "Page not found | Wex Advisory" };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="flex min-h-[60vh] flex-col justify-center bg-canvas outline-none">
        <PageHero
          eyebrow="404"
          title="This page could not be found."
          subhead="The link may be old, or the address may have a typo."
          primary={{ href: "/", label: "Go to the homepage" }}
          secondary={{ href: "/products", label: "See the products" }}
        />
      </main>
      <Footer />
    </>
  );
}
