import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#041126] px-5 py-10 text-[#f7faff] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-5">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#9cb6e4] hover:text-white"><ArrowLeft className="size-4" /> Back to website</a>
          <span className="font-display text-lg font-black">nq<span className="text-primary">craig</span></span>
        </div>
        <header className="mt-20 border-b border-white/10 pb-10">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Legal &amp; trust</p>
          <h1 className="mt-5 font-display text-5xl font-black tracking-[-.055em] sm:text-7xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-[#b8c8e5]">{intro}</p>
          <p className="mt-6 rounded-2xl border border-[#ffcf70]/25 bg-[#ffcf70]/10 p-5 text-sm leading-6 text-[#f4d99c]">This page is a plain-language starting point and is not a substitute for legal advice. nqcraig should have qualified counsel review it against the business&apos;s location, registrations, and actual practices before a public launch.</p>
          <p className="mt-5 text-sm text-[#7894c2]">Last updated: September 23, 2026</p>
        </header>
        <div className="legal-copy py-12">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}
