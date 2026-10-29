"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonClass } from "@/components/brand/Button";

// Set at build time by next.config.mjs: "1" only when at least one blog post
// is visible, so the Blog link never points at a 404.
const BLOG_LIVE = process.env.NEXT_PUBLIC_BLOG_LIVE === "1";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  ...(BLOG_LIVE ? [{ href: "/blog", label: "Blog" }] : []),
  { href: "/#contact", label: "Contact" },
];

// Brand system top bar (2026-10-29): canvas, ink, mono links, sticky and in
// the page flow (64px tall), so pages no longer pad their tops to clear a
// fixed header. Free AI Audit is an outline button so the page's own CTA stays
// the only gold fill in view. Under md the links fold into a menu panel.
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const current = (href: string) => (href === pathname ? "page" : undefined);

  return (
    <header className="sticky top-0 z-50 border-b border-grid bg-canvas px-4 sm:px-8">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 rounded" aria-label="Wex Advisory, home">
          <Image src="/wex-icon-wa.png" alt="" width={40} height={27} priority className="h-7 w-auto" />
          <span className="text-[17px] font-bold tracking-[-0.01em] text-ink">Wex Advisory</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 font-mono text-[13px] md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={current(l.href)}
              className="rounded py-2 text-ink underline-offset-4 hover:underline aria-[current=page]:underline"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <a href="/audit" className={buttonClass("secondary", "sm")}>
            Free AI Audit →
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[6px] text-ink hover:bg-chrome md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="mx-auto max-w-[1180px] border-t border-grid pb-5 pt-2 md:hidden">
          <ul className="font-mono text-[14px]">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-grid">
                <a
                  href={l.href}
                  aria-current={current(l.href)}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center text-ink aria-[current=page]:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/audit" onClick={() => setMenuOpen(false)} className={`${buttonClass("secondary", "md")} mt-4 w-full`}>
            Free AI Audit →
          </a>
        </nav>
      )}
    </header>
  );
}
