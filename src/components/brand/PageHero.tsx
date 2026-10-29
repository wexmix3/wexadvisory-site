import Button from "./Button";
import Eyebrow from "./Eyebrow";
import Heading from "./Heading";
import { cx } from "./cx";

// The top of every inner page: eyebrow, the page's one h1, a subhead, a
// primary + secondary CTA and an optional mono proof line. align="center" for
// short product-style heroes; media (a headshot, a product window) sits beside
// the text from md up and above it on phones. No sorting sheet: that is the
// homepage's alone. The h1 paints at once (no reveal) for LCP.
export type HeroCta = { href: string; label: string; external?: boolean };

type Props = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subhead?: React.ReactNode;
  primary?: HeroCta;
  secondary?: HeroCta;
  proof?: React.ReactNode;
  align?: "left" | "center";
  media?: React.ReactNode;
  mediaPosition?: "start" | "end";
  id?: string;
  children?: React.ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  subhead,
  primary,
  secondary,
  proof,
  align = "left",
  media,
  mediaPosition = "start",
  id,
  children,
}: Props) {
  const center = align === "center" && !media;
  const text = (
    <div className={cx("min-w-0", center && "mx-auto max-w-[920px] text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h1">{title}</Heading>
      {subhead && (
        <div
          className={cx(
            "mt-6 space-y-4 text-[17px] leading-relaxed sm:text-[18px]",
            center ? "mx-auto max-w-[720px]" : "max-w-[680px]"
          )}
        >
          {typeof subhead === "string" ? <p>{subhead}</p> : subhead}
        </div>
      )}
      {(primary || secondary) && (
        <div className={cx("mt-8 flex flex-col gap-3 sm:flex-row", center && "items-center justify-center")}>
          {primary && (
            <Button href={primary.href} external={primary.external} block>
              {primary.label}
            </Button>
          )}
          {secondary && (
            <Button href={secondary.href} external={secondary.external} variant="secondary" block>
              {secondary.label}
            </Button>
          )}
        </div>
      )}
      {proof && (
        <p className={cx("mt-7 font-mono text-[12.5px] leading-relaxed text-muted", center && "mx-auto max-w-[620px]")}>
          {proof}
        </p>
      )}
      {children}
    </div>
  );

  return (
    <section id={id} className="bg-canvas px-4 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-[1180px]">
        {media ? (
          <div
            className={cx(
              "grid items-start gap-10 md:gap-14",
              mediaPosition === "start" ? "md:grid-cols-[280px_minmax(0,1fr)]" : "md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
            )}
          >
            {mediaPosition === "start" ? (
              <>
                <div className="max-w-[280px]">{media}</div>
                {text}
              </>
            ) : (
              <>
                {text}
                <div className="min-w-0">{media}</div>
              </>
            )}
          </div>
        ) : (
          text
        )}
      </div>
    </section>
  );
}
