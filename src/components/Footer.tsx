export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-gold text-sm font-bold tracking-[0.25em] uppercase">Wex Advisory</p>
          <p className="text-white/60 text-xs mt-1">AI consulting for growing businesses.</p>
          <p className="text-white/60 text-xs mt-1">New York, NY</p>
          <div className="flex flex-wrap gap-x-4 text-xs mt-1">
            <a href="mailto:max@wexadvisory.com" className="inline-flex items-center min-h-11 text-white/70 hover:text-gold transition-colors">
              max@wexadvisory.com
            </a>
            <a
              href="https://www.linkedin.com/in/max-wexley"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 text-white/70 hover:text-gold transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/wexadvisory"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 text-white/70 hover:text-gold transition-colors"
            >
              X
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 text-white/60 text-xs">
          <a href="/#services" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Services</a>
          <a href="/work" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Work</a>
          {/* Rendered only when a post is visible. See next.config.mjs. */}
          {process.env.NEXT_PUBLIC_BLOG_LIVE === "1" && (
            <a href="/blog" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Blog</a>
          )}
          <a href="/ai-consulting-for-small-businesses" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI Consulting</a>
          <a href="/automated-reporting" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Automated Reporting</a>
          <a href="https://tool.wexadvisory.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Competitor Analysis</a>
          <a href="/invoice-check?from=site" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Supplier Invoice Check</a>
          <a href="/card-fee-check" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Card Fee Check</a>
          <a href="/canon" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Canon</a>
          <a href="/ai-solutions-for-small-businesses" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI Solutions</a>
          <a href="/ai-integration-for-small-businesses" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI Integration</a>
          <a href="/ai-for-coworking-spaces" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI for Coworking</a>
          <a href="/ai-for-property-management" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI for Property Management</a>
          <a href="/ai-automation-for-law-firms" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI for Law Firms</a>
          <a href="/ai-ops-dashboard-for-ecommerce-brands" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI for Ecommerce</a>
          <a href="/ai-training-for-small-businesses" className="inline-flex items-center min-h-11 hover:text-white transition-colors">AI Training</a>
          <a href="/#contact" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Contact</a>
          <a href="/privacy" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Privacy</a>
          <a href="/terms" className="inline-flex items-center min-h-11 hover:text-white transition-colors">Terms</a>
        </div>

        <p className="text-white/50 text-xs">© {new Date().getFullYear()} Wex Advisory</p>
      </div>
    </footer>
  );
}
