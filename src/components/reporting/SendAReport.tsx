import Eyebrow from "@/components/design-system/Eyebrow";
import ContactForm from "@/components/ContactForm";
import { SEND_A_REPORT } from "./content";

// The page's only form. source="reporting" tags the inquiry for Max and sends
// the reporting auto-reply (see /api/contact).
export default function SendAReport() {
  return (
    <section id="send-a-report" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Eyebrow>Free, no call needed</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">{SEND_A_REPORT.heading}</h2>
          <p className="text-white/75 text-base leading-relaxed">{SEND_A_REPORT.body}</p>
        </div>
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-6 sm:p-8">
          <ContactForm
            source="reporting"
            messageLabel={SEND_A_REPORT.messageLabel}
            messagePlaceholder={SEND_A_REPORT.messagePlaceholder}
          />
        </div>
      </div>
    </section>
  );
}
