import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import HeroLoop from "@/components/homepage-v2/HeroLoop";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import ToolsShowcase from "@/components/homepage-v2/ToolsShowcase";
import AuditHighlight from "@/components/homepage-v2/AuditHighlight";
import HowWeWork from "@/components/homepage-v2/HowWeWork";
import CloseSection from "@/components/homepage-v2/CloseSection";

// Order follows an attention -> credibility -> conversion funnel:
// hero hooks, case studies + tools showcase build proof, THEN the audit ask lands,
// then the deeper How We Work commitment, then close.
export default function HomepageV2() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero renders above the fold — no reveal wrapper so it's visible immediately on load */}
        <HeroLoop />
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
          <HowWeWork />
        </ScrollReveal>
        <ScrollReveal>
          <CloseSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
