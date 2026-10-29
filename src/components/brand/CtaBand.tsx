import Button from "./Button";
import Card from "./Card";
import Heading from "./Heading";
import type { HeroCta } from "./PageHero";
import { CALENDLY } from "./links";

// The closing "Next step" card for the bottom of a page: one centred heading,
// the gold booking CTA and a quiet second path. Defaults are the site's own
// close (book a call, or run the AI Audit); override per page.
type Props = {
  title?: string;
  primary?: HeroCta;
  secondary?: HeroCta | null;
  id?: string;
  reveal?: boolean;
};

export default function CtaBand({
  title = "Next step",
  primary = { href: CALENDLY, label: "Book a free strategy call", external: true },
  secondary = { href: "/audit", label: "Or run the free AI Audit (2 min) →" },
  id,
  reveal = false,
}: Props) {
  return (
    <section id={id} className="scroll-mt-20 bg-canvas px-4 pb-16 pt-4 sm:px-8 md:pb-20">
      <Card padding="none" className="mx-auto max-w-[1180px] px-6 py-12 text-center sm:py-16">
        <Heading reveal={reveal} className="mx-auto max-w-[760px]">
          {title}
        </Heading>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button href={primary.href} external={primary.external} block>
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} external={secondary.external} variant="quiet">
              {secondary.label}
            </Button>
          )}
        </div>
      </Card>
    </section>
  );
}
