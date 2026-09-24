import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/social-links";

const legalLinks = [["Terms", "/terms/"], ["Privacy", "/privacy/"], ["Risk disclosure", "/risk-disclosure/"], ["Testimonial terms", "/testimonial-terms/"]] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#020918] px-5 py-12 text-[#849cc3] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-2xl font-black text-white">nq<span className="text-primary">craig</span></p>
            <p className="mt-3 max-w-lg text-sm leading-6">NQ-focused education, mentorship, and community built around process—not promises.</p>
            <SocialLinks className="mt-6" />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {legalLinks.map(([label, href]) => <a key={href} href={href} className="inline-flex items-center gap-1.5 transition hover:text-white">{label}<ArrowUpRight className="size-3.5" aria-hidden="true" /></a>)}
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-5"><p>Futures trading involves substantial risk of loss. Educational content only; not financial, investment, tax, or legal advice.</p><p className="mt-2">Not affiliated with Discord, TikTok, Instagram, CME Group, or Nasdaq. All referenced marks belong to their respective owners.</p></div>
      </div>
    </footer>
  );
}
