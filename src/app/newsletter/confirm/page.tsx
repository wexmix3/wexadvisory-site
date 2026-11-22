import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Card from "@/components/brand/Card";
import Section from "@/components/brand/Section";
import ConfirmButton from "./ConfirmButton";
import { NEWSLETTER_NAME } from "@/lib/newsletter";

// Where the confirm email's link lands (2026-11-17). The subscription happens
// on the button press, not on page load, because mail scanners open links
// before people do.
export const metadata: Metadata = {
  title: `Confirm your subscription | ${NEWSLETTER_NAME}`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function ConfirmPage({ searchParams }: { searchParams: { t?: string } }) {
  const token = typeof searchParams?.t === "string" ? searchParams.t : "";
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Section>
          <Card padding="lg" className="mx-auto mt-8 max-w-[560px] text-center">
            <ConfirmButton token={token} name={NEWSLETTER_NAME} />
          </Card>
        </Section>
      </main>
      <Footer />
    </>
  );
}
