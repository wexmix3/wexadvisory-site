// Page-scoped copy of Footer.tsx. The shared Footer uses relative anchors
// (#flagship, #supporting, #contact) that only resolve on the live homepage —
// this page doesn't have those sections, so those links need to be absolute
// (/#flagship) to actually navigate to the real site instead of doing nothing.
export default function PilotFooter() {
  return (
    <footer className="bg-[#0A1226] border-t border-white/10 px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-gold text-sm font-bold tracking-[0.25em] uppercase">Wex Advisory</p>
          <p className="text-white/30 text-xs mt-1">Competitor intelligence for growing businesses.</p>
        </div>

        <div className="flex flex-wrap gap-6 text-white/30 text-xs">
          <a href="/#flagship" className="hover:text-white/60 transition-colors">Services</a>
          <a href="/work" className="hover:text-white/60 transition-colors">Work</a>
          <a href="/ai-consulting-for-small-businesses" className="hover:text-white/60 transition-colors">AI Consulting</a>
          <a href="/ai-solutions-for-small-businesses" className="hover:text-white/60 transition-colors">AI Solutions</a>
          <a href="/ai-integration-for-small-businesses" className="hover:text-white/60 transition-colors">AI Integration</a>
          <a href="/#supporting" className="hover:text-white/60 transition-colors">Pricing</a>
          <a href="/#contact" className="hover:text-white/60 transition-colors">Contact</a>
          <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
        </div>

        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Wex Advisory</p>
      </div>
    </footer>
  );
}
