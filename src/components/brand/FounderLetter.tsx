import Image from "next/image";
import { Caveat } from "next/font/google";
import { LINKEDIN, X_PROFILE } from "./links";
import { cx } from "./cx";

// The founder letter (Max picked "B + C" on 2026-10-30): a slightly turned
// paper sheet, Max's note in his voice, a handwritten sign-off. The sign-off
// is set in Caveat until Max sends a scan of his real signature. Children
// replace the default body when a page needs its own wording.
const hand = Caveat({ subsets: ["latin"], display: "swap" });

export default function FounderLetter({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cx(
        "relative -rotate-[0.8deg] scroll-mt-24 rounded-[2px] border border-ink/10 bg-white px-7 py-7 shadow-[0_18px_40px_-18px_rgba(15,31,61,0.35)] sm:px-9",
        className
      )}
    >
      <p className="text-[16px] leading-relaxed text-ink">Hey there,</p>
      <div className="mt-3 space-y-3 text-[15.5px] leading-relaxed">
        {children ?? (
          <>
            <p>
              If your business runs on a spreadsheet, a few inboxes and someone&apos;s memory, you&apos;re who I build
              for.
            </p>
            <p>
              I scope, build and support every project myself. You talk to the person who writes the code, and you
              get a written estimate before any work starts.
            </p>
            <p>
              Book 30 minutes. You&apos;ll leave with a short list of what&apos;s worth automating, whether or not you
              hire me.
            </p>
          </>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <span className={cx(hand.className, "text-[40px] leading-none text-ink")}>Max</span>
        <div className="relative mb-1 h-10 w-10 overflow-hidden rounded-full border border-ink/10">
          <Image src="/headshot.jpg" alt="" fill sizes="40px" className="object-cover" />
        </div>
        <p className="mb-1 font-mono text-[12px] text-muted">
          Max Wexley ·{" "}
          <a href="/about" className="underline underline-offset-4 hover:text-ink">
            How I work
          </a>{" "}
          ·{" "}
          <a href={LINKEDIN} className="underline underline-offset-4 hover:text-ink" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          ·{" "}
          <a href={X_PROFILE} className="underline underline-offset-4 hover:text-ink" target="_blank" rel="noopener noreferrer">
            X
          </a>
        </p>
      </div>
    </div>
  );
}
