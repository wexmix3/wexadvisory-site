import CollagePlate from "@/components/brand/CollagePlate";
import Eyebrow from "@/components/brand/Eyebrow";
import FounderLetter from "@/components/brand/FounderLetter";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";

// Founder section for the landing pages (2026-10-30 imagery pick, B + C): the
// headshot as a collage plate beside Max's signed letter. Same facts as the
// earlier bio card. Separate from the homepage's Founder block (home/Founder.tsx).
export default function AboutFounder() {
  return (
    <Section id="about" divider>
      <Eyebrow>About</Eyebrow>
      <Heading className="mb-10">Who you&apos;ll work with</Heading>

      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:gap-12">
        <CollagePlate
          src="/headshot.jpg"
          alt="Max Wexley, founder of Wex Advisory"
          tone="gold"
          flip
          photoShare={0.66}
          photoPos="50% 20%"
          dotTop="68%"
          aspect="aspect-[5/4]"
          sizes="(min-width: 768px) 300px, 70vw"
          className="rounded-[4px]"
        />
        <FounderLetter>
          <p>
            I&apos;m Max Wexley, the founder of Wex Advisory, based in New York City. I studied at the University of
            Michigan (class of 2024) and come from a background in finance.
          </p>
          <p>
            I build AI automation, dashboards and reporting systems for small and mid-sized businesses. I scope, build
            and support every project personally, so you always talk to the person who built your system.
          </p>
        </FounderLetter>
      </div>
    </Section>
  );
}
