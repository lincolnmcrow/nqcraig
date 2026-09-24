import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Shared shell for the thank-you and 404 pages.
export function StatusPage({ mark, eyebrow, title, children, actions }: { mark: ReactNode; eyebrow: string; title: string; children: ReactNode; actions: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-background px-5 pb-24 pt-40 text-foreground sm:px-8">
        <div className="market-grid absolute inset-0 -z-20 opacity-50" aria-hidden="true" />
        <div className="absolute -right-40 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/25 blur-[100px]" aria-hidden="true" />
        <div className="mx-auto w-full max-w-4xl">
          {mark}
          <p className="mt-10 text-sm font-bold uppercase tracking-[.18em] text-[#8bb3ff]">{eyebrow}</p>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-black leading-[.92] tracking-[-.06em] text-balance">{title}</h1>
          <div className="mt-8 max-w-2xl text-lg leading-8 text-[#b8c8e5]">{children}</div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
