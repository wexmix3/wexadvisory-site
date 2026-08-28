import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/homepage-v3/Hero";
import Methodology from "@/components/homepage-v3/Methodology";
import ClientsMarquee from "@/components/homepage-v3/ClientsMarquee";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import ToolsShowcase from "@/components/homepage-v2/ToolsShowcase";
import AuditHighlight from "@/components/homepage-v2/AuditHighlight";
import FAQ from "@/components/FAQ";
import CloseSection from "@/components/homepage-v3/CloseSection";

// homepage-v3 redesign graduated to the real "/" route 2026-08-28 (see
// docs/superpowers/specs/2026-08-28-homepage-v3-redesign-design.md and
// state/worksheets/homepage-v3-redesign-2026-08-28.md in aios). Order:
// hero hooks -> Methodology sets expectations -> ClientsMarquee teases
// proof -> CaseStudies delivers the detailed proof -> ToolsShowcase ->
// AuditHighlight asks -> FAQ handles objections -> CloseSection closes.
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero renders above the fold — no reveal wrapper so it's visible immediately on load */}
        <Hero />
        <ScrollReveal>
          <Methodology />
        </ScrollReveal>
        <ScrollReveal>
          <ClientsMarquee />
        </ScrollReveal>
        <ScrollReveal>
          <CaseStudies />
        </ScrollReveal>
        <ScrollReveal>
          <ToolsShowcase />
        </ScrollReveal>
        <ScrollReveal>
          <AuditHighlight />
        </ScrollReveal>
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
        <ScrollReveal>
          <CloseSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
