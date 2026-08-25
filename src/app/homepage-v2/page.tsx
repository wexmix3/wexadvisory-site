import Nav from "@/components/Nav";
import PilotFooter from "@/components/homepage-v2/PilotFooter";
import ScrollReveal from "@/components/ScrollReveal";
import HeroLoop from "@/components/homepage-v2/HeroLoop";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import ToolsShowcase from "@/components/homepage-v2/ToolsShowcase";
import AuditHighlight from "@/components/homepage-v2/AuditHighlight";
import HowWeWork from "@/components/homepage-v2/HowWeWork";
import CloseSection from "@/components/homepage-v2/CloseSection";

export default function HomepageV2() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero renders above the fold — no reveal wrapper so it's visible immediately on load */}
        <HeroLoop />
        <ScrollReveal>
          <HowWeWork />
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
          <CloseSection />
        </ScrollReveal>
      </main>
      <PilotFooter />
    </>
  );
}
