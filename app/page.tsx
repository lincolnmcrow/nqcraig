import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpenCheck,
  Check,
  Globe2,
  LockKeyhole,
  MessageCircleMore,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicationForm } from "@/components/application-form";
import { Faq } from "@/components/faq";
import { SectionShell } from "@/components/section-shell";
import { SiteHeader } from "@/components/site-header";
import { TestimonialForm } from "@/components/testimonial-form";
import { WebMcpProvider } from "@/components/webmcp-provider";
import { siteContent } from "@/lib/site-content.mjs";

export default function Home() {
  return (
    <WebMcpProvider>
      <SiteHeader />
      <main className="min-h-screen overflow-hidden bg-background text-foreground">
        <section id="top" className="relative isolate flex min-h-screen items-center pt-24">
          <div className="market-grid absolute inset-0 -z-20 opacity-50" aria-hidden="true" />
          <div className="absolute -right-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/30 blur-[100px]" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-sm font-semibold text-[#b9cdff]">
                <MessageCircleMore className="size-4" aria-hidden="true" />
                Lifetime mentorship · Built around Discord
              </div>
              <h1 className="font-display max-w-5xl text-[clamp(3.8rem,9vw,8.5rem)] font-black leading-[.82] tracking-[-0.075em] text-balance">
                Master the NQ.
                <span className="mt-3 block text-primary">Build a repeatable process.</span>
              </h1>
              <p className="mt-9 max-w-2xl text-lg leading-8 text-[#b8c8e5] sm:text-xl">
                Learn directly from nqcraig, sharpen your decision-making with other traders,
                and build discipline inside a Discord-first community designed for the long run.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-14 rounded-full px-7 text-base font-bold">
                  <a href="#apply">Apply for Mentorship <ArrowDownRight aria-hidden="true" /></a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/15 bg-white/5 px-7 text-base font-bold hover:bg-white/10">
                  <a href="#program">See the program</a>
                </Button>
              </div>
            </div>

            <aside className="relative border-l border-primary/35 pl-6 lg:mb-3" aria-label="Program principles">
              <p className="mb-7 text-xs font-bold uppercase tracking-[.22em] text-[#8bb3ff]">The standard</p>
              <div className="space-y-6">
                {[["01", "Process over prediction"], ["02", "Discipline over impulse"], ["03", "Review over repetition"]].map(([number, label]) => (
                  <div key={number} className="flex items-baseline gap-4 border-b border-white/10 pb-5">
                    <span className="font-mono text-xs text-[#7894c2]">{number}</span>
                    <span className="font-display text-xl font-bold tracking-tight">{label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
          <p className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#06152c]/92 px-5 py-4 text-center text-sm font-medium text-[#aebfdd]">
            Futures trading involves substantial risk of loss and is not suitable for everyone.
          </p>
        </section>

        <SectionShell id="program" number="01" eyebrow="The program" title="One mentorship. Two ways to grow.">
          <p className="max-w-3xl text-xl leading-8 text-[#b8c8e5]">
            Get direct guidance from Craig and learn inside a group of traders committed to improving their craft. The hybrid format gives you personal direction without losing the perspective and accountability of a community.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {siteContent.benefits.map(([number, title, body]) => (
              <article key={title} className="min-h-60 bg-[#07162d] p-7 transition hover:bg-[#0a1d3b]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[#8bb3ff]">{number}</span>
                  <Check className="size-5 text-[#86f0cb]" aria-hidden="true" />
                </div>
                <h3 className="mt-14 text-xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-[#9fb2d2]">{body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell number="02" eyebrow={siteContent.audience.eyebrow} title={siteContent.audience.title} className="bg-[#06152c]">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <p className="max-w-3xl text-xl leading-8 text-[#b8c8e5]">{siteContent.audience.body}</p>
            <div className="grid grid-cols-3 gap-3" aria-label="Experience levels">
              {["New", "Developing", "Experienced"].map((level) => (
                <div key={level} className="rounded-2xl border border-white/10 bg-white/[.04] px-3 py-5 text-center text-sm font-bold text-[#c8d6ec]">{level}</div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell number="03" eyebrow={siteContent.discord.eyebrow} title={siteContent.discord.title}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="max-w-3xl text-xl leading-8 text-[#b8c8e5]">{siteContent.discord.body}</p>
              <p className="mt-6 max-w-2xl leading-7 text-[#8fa8cf]">Your Discord username is required when you apply. Double-check it before submitting so Craig can find you.</p>
            </div>
            <div className="rounded-3xl border border-primary/30 bg-primary/10 p-7">
              <MessageCircleMore className="size-9 text-primary" aria-hidden="true" />
              <ul className="mt-8 space-y-4">
                {["Mentorship communication", "Group discussion", "Learning resources", "Trade review", "Community accountability"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-semibold"><span className="size-1.5 rounded-full bg-[#86f0cb]" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </SectionShell>

        <SectionShell number="04" eyebrow="The path" title="Simple to enter. Built for the long term." className="bg-[#06152c]">
          <div className="grid gap-5 md:grid-cols-3">
            {siteContent.steps.map(([number, title, body]) => (
              <article key={title} className="rounded-3xl border border-white/10 p-7">
                <span className="font-mono text-sm text-[#8bb3ff]">{number}</span>
                <h3 className="mt-20 text-3xl font-black tracking-[-.04em]">{title}</h3>
                <p className="mt-4 leading-7 text-[#9fb2d2]">{body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell number="05" eyebrow="The approach" title="Build a trader you can trust.">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              [BookOpenCheck, "Prepare", "Create a plan before the market asks you to make decisions."],
              [ShieldCheck, "Execute", "Practice discipline, risk awareness, and deliberate action."],
              [Globe2, "Review", "Study the process honestly and carry the lesson forward."],
            ].map(([Icon, title, body]) => {
              const ItemIcon = Icon as typeof BookOpenCheck;
              return <article key={String(title)} className="border-l border-white/15 pl-6"><ItemIcon className="size-7 text-primary" aria-hidden="true" /><h3 className="mt-8 text-2xl font-black">{String(title)}</h3><p className="mt-3 leading-7 text-[#9fb2d2]">{String(body)}</p></article>;
            })}
          </div>
          <p className="mt-12 border-t border-white/10 pt-6 text-sm leading-6 text-[#849cc3]">This is education and mentorship—not personalized investment advice, managed accounts, copy trading, or a promise of results.</p>
        </SectionShell>

        <SectionShell id="story" number="06" eyebrow={siteContent.founderStory.eyebrow} title={siteContent.founderStory.title} className="bg-primary text-white" numberClassName="text-white">
          <div className="grid gap-10 lg:grid-cols-[1fr_.65fr]">
            <div>
              <p className="max-w-3xl text-xl leading-9 text-white/85">{siteContent.founderStory.body}</p>
              <p className="mt-8 max-w-2xl text-sm leading-6 text-white">{siteContent.founderStory.note}</p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/20">
              <div className="bg-[#0755eb] p-6"><strong className="block text-4xl font-black">~30</strong><span className="mt-2 block text-sm text-white/75">students mentored</span></div>
              <div className="bg-[#0755eb] p-6"><strong className="block text-4xl font-black">~10K</strong><span className="mt-2 block text-sm text-white/75">TikTok audience</span></div>
              <div className="col-span-2 bg-[#0755eb] p-6"><strong className="block text-2xl font-black">Started in high school</strong><span className="mt-2 block text-sm text-white/75">learning the NQ from NQKole</span></div>
            </div>
          </div>
        </SectionShell>

        <SectionShell number="07" eyebrow={siteContent.confidentiality.eyebrow} title={siteContent.confidentiality.title}>
          <div className="rounded-3xl border border-white/10 bg-[#07162d] p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary"><LockKeyhole className="size-7" aria-hidden="true" /></div>
              <div><p className="max-w-4xl text-lg leading-8 text-[#b8c8e5]">{siteContent.confidentiality.body}</p><p className="mt-5 text-sm leading-6 text-[#829bc3]">Activity on Discord is also subject to Discord&apos;s terms and privacy practices. nqcraig is not affiliated with or sponsored by Discord.</p></div>
            </div>
          </div>
        </SectionShell>

        <SectionShell number="08" eyebrow="Student stories" title={siteContent.testimonialEmptyState.title} className="bg-[#06152c]">
          <div className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-start">
            <div><p className="max-w-2xl text-xl leading-8 text-[#b8c8e5]">{siteContent.testimonialEmptyState.body}</p><p className="mt-6 text-sm leading-6 text-[#829bc3]">No placeholder praise. No anonymous profit claims. Only approved experiences from real students.</p></div>
            <div className="rounded-3xl border border-dashed border-white/20 p-7 text-center"><UsersRound className="mx-auto size-8 text-[#8bb3ff]" aria-hidden="true" /><p className="mt-5 font-bold">Already a student?</p><a href="#share-story" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#8bb3ff]">Share your experience <ArrowDownRight className="size-4" aria-hidden="true" /></a></div>
          </div>
          <div id="share-story" className="mt-10 scroll-mt-24 rounded-3xl border border-white/10 bg-white/[.035] p-7 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#8bb3ff]">Student testimonial form</p>
            <p className="mt-3 max-w-2xl text-[#9fb2d2]">Share what the mentorship has meant to you. Nothing is published automatically.</p>
            <TestimonialForm />
          </div>
        </SectionShell>

        <SectionShell id="faq" number="09" eyebrow="FAQ" title="Straight answers before you apply.">
          <Faq items={siteContent.faqs} />
        </SectionShell>

        <section id="apply" className="scroll-mt-20 border-t border-white/10 bg-[#f7faff] px-5 py-24 text-[#041126] sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.18em] text-[#075cff]">Apply for mentorship</p>
              <h2 className="mt-6 font-display text-5xl font-black leading-[.95] tracking-[-.06em] sm:text-7xl">Ready to take your process seriously?</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#415272]">Tell Craig about your experience, goals, and challenges. Your Discord username is required so he can follow up if the program is a fit.</p>
              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#eaf0fc] p-5"><LockKeyhole className="mt-0.5 size-5 shrink-0 text-[#075cff]" aria-hidden="true" /><p className="text-sm leading-6 text-[#415272]">Your application is private and is never posted publicly.</p></div>
            </div>
            <div className="rounded-[2rem] border border-[#cbd7ea] bg-white p-7 shadow-[0_25px_80px_rgb(4_17_38/12%)] sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-[#075cff]">Application form</p>
              <p className="mt-4 text-[#5a6b88]">Every field helps Craig understand where you are and whether the program is a fit.</p>
              <div className="mt-8"><ApplicationForm /></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#020918] px-5 py-12 text-[#849cc3] sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div><p className="font-display text-2xl font-black text-white">nq<span className="text-primary">craig</span></p><p className="mt-3 max-w-lg text-sm leading-6">NQ-focused education, mentorship, and community built around process—not promises.</p></div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              {[['Terms', '/terms'], ['Privacy', '/privacy'], ['Risk disclosure', '/risk-disclosure'], ['Testimonial terms', '/testimonial-terms']].map(([label, href]) => <a key={href} href={href} className="inline-flex items-center gap-1.5 transition hover:text-white">{label}<ArrowUpRight className="size-3.5" aria-hidden="true" /></a>)}
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-5"><p>Futures trading involves substantial risk of loss. Educational content only; not financial, investment, tax, or legal advice.</p><p className="mt-2">Not affiliated with Discord, CME Group, or Nasdaq. All referenced marks belong to their respective owners.</p></div>
        </div>
      </footer>
    </WebMcpProvider>
  );
}
