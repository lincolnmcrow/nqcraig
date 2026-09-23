import { ArrowDownRight, MessageCircleMore } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#041126]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-display text-xl font-black tracking-[-0.04em]">
            nq<span className="text-primary">craig</span>
          </a>
          <a
            href="#apply"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a6bff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Apply now
          </a>
        </div>
      </header>

      <section id="top" className="relative isolate flex min-h-screen items-center pt-24">
        <div className="market-grid absolute inset-0 -z-20 opacity-50" aria-hidden="true" />
        <div className="absolute -right-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/30 blur-[100px]" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
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
              <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2a6bff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                Apply for Mentorship <ArrowDownRight className="size-5" aria-hidden="true" />
              </a>
              <a href="#program" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 font-bold transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                See the program
              </a>
            </div>
          </div>

          <aside className="relative border-l border-primary/35 pl-6 lg:mb-3" aria-label="Program principles">
            <p className="mb-7 text-xs font-bold uppercase tracking-[.22em] text-primary">The standard</p>
            <div className="space-y-6">
              {[
                ["01", "Process over prediction"],
                ["02", "Discipline over impulse"],
                ["03", "Review over repetition"],
              ].map(([number, label]) => (
                <div key={number} className="flex items-baseline gap-4 border-b border-white/10 pb-5">
                  <span className="font-mono text-xs text-[#7894c2]">{number}</span>
                  <span className="font-display text-xl font-bold tracking-tight">{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
        <p className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#06152c]/90 px-5 py-4 text-center text-sm font-medium text-[#aebfdd]">
          Futures trading involves substantial risk of loss and is not suitable for everyone.
        </p>
      </section>

      <section id="program" className="sr-only" aria-label="Program details" />
      <section id="apply" className="sr-only" aria-label="Mentorship application" />
    </main>
  );
}
