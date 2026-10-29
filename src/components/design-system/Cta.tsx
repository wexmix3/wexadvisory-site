import { buttonClass } from "@/components/brand/Button";

// Legacy CTA exports, re-skinned onto the brand Button (2026-10-29) so every
// page that imports them updates at once. New code: use brand/Button.
type CtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export function PrimaryCta({ href, children, className = "", target, rel }: CtaProps) {
  return (
    <a href={href} target={target} rel={rel} className={`${buttonClass("primary")} ${className}`}>
      {children}
    </a>
  );
}

export function SecondaryCta({ href, children, className = "", target, rel }: CtaProps) {
  return (
    <a href={href} target={target} rel={rel} className={`${buttonClass("secondary")} ${className}`}>
      {children}
    </a>
  );
}
