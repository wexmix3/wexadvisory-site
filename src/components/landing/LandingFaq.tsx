import Eyebrow from "@/components/brand/Eyebrow";
import FaqList from "@/components/brand/FaqList";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";

// The landing pages' FAQ, laid out like the homepage FAQ: heading column
// left, accordion right. Items are the same array the page's FAQPage JSON-LD
// is built from, so visible text and structured data stay word for word
// (FaqList renders every answer open here, as before the redesign).
export default function LandingFaq({
  title,
  items,
  note,
}: {
  title: string;
  items: { q: string; a: string }[];
  note?: React.ReactNode;
}) {
  return (
    <Section id="faq" divider>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <Heading reveal>{title}</Heading>
          {note && <p className="mt-6 text-[16px] leading-relaxed">{note}</p>}
        </div>
        <FaqList items={items} defaultOpen="all" />
      </div>
    </Section>
  );
}
