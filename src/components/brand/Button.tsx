import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "./cx";

// The CTA. primary = gold fill with ink text (one per view where possible);
// secondary = ink outline; quiet = mono text link. Radius 6px, never a pill.
// With href it renders <a> (external adds target, rel and a screen-reader
// note); without href, a <button>. block = full width on phones only.
export type ButtonVariant = "primary" | "secondary" | "quiet";
export type ButtonSize = "md" | "sm";

const BASE =
  "inline-flex items-center justify-center gap-2 text-center rounded-[6px] border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50";
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-gold border-gold text-ink font-bold hover:bg-gold-hover hover:border-gold-hover",
  secondary: "bg-transparent border-ink/25 text-ink font-semibold hover:border-ink",
  quiet: "border-transparent font-mono text-ink underline-offset-4 hover:underline",
};
const SIZES: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-[15.5px]",
  sm: "min-h-10 px-4 text-[14px]",
};

// Class string for anything that should look like a button but is not one of
// these elements (a Next <Link>, a form submit with custom markup).
export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", block = false) {
  return cx(
    BASE,
    VARIANTS[variant],
    variant === "quiet" ? "min-h-11 px-1 text-[13px]" : SIZES[size],
    block && "w-full sm:w-auto"
  );
}

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
  children: React.ReactNode;
};
type LinkProps = Common & { href: string; external?: boolean } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "href" | "children"
  >;
type NativeButtonProps = Common & { href?: undefined; external?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export default function Button(props: LinkProps | NativeButtonProps) {
  if (props.href !== undefined) {
    const { href, external, variant = "primary", size = "md", block = false, className, children, ...rest } =
      props as LinkProps;
    return (
      <a
        {...rest}
        href={href}
        target={external ? "_blank" : rest.target}
        rel={external ? "noopener noreferrer" : rest.rel}
        className={cx(buttonClass(variant, size, block), className)}
      >
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  const {
    variant = "primary",
    size = "md",
    block = false,
    className,
    children,
    type = "button",
    href: _href,
    external: _external,
    ...rest
  } = props as NativeButtonProps;
  return (
    <button {...rest} type={type} className={cx(buttonClass(variant, size, block), className)}>
      {children}
    </button>
  );
}
