type CtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export function PrimaryCta({ href, children, className = "", target, rel }: CtaProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-block bg-gradient-to-r from-gold to-[#e9d9a8] text-navy font-bold text-base px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,168,75,0.25)] transition-all ${className}`}
    >
      {children}
    </a>
  );
}

export function SecondaryCta({ href, children, className = "", target, rel }: CtaProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-block border border-white/20 text-white/70 hover:border-gold/50 hover:text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors ${className}`}
    >
      {children}
    </a>
  );
}
