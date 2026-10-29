import Image from "next/image";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";

// Founder section for the landing pages, in the brand system (2026-10-29):
// headshot left, bio right, one system card. Copy unchanged. Separate from
// the homepage's short Founder block (home/Founder.tsx).
export default function AboutFounder() {
  return (
    <Section id="about" divider>
      <Eyebrow>About</Eyebrow>
      <Heading className="mb-10">Who you&apos;ll work with</Heading>

      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-64 w-full shrink-0 md:h-auto md:min-h-[240px] md:w-56">
            <Image
              src="/headshot.jpg"
              alt="Max Wexley"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 224px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center px-6 py-7 sm:px-8">
            <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Founder</p>
            <h3 className="text-h3 text-ink">Max Wexley</h3>
            <p className="mb-5 mt-1 font-mono text-[13px] text-muted">New York City</p>
            <p className="mb-4 text-[16px] leading-relaxed">
              I&apos;m Max Wexley, the founder of Wex Advisory, based in New York City. I studied at the University
              of Michigan (class of 2024) and come from a background in finance.
            </p>
            <p className="text-[16px] leading-relaxed">
              I build AI automation, dashboards and reporting systems for small and mid-sized businesses. I scope,
              build and support every project personally, so you always talk to the person who built your system.
            </p>
          </div>
        </div>
      </Card>
    </Section>
  );
}
