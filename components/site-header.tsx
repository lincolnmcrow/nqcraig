import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#041126]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
        <a href="#top" className="font-display text-xl font-black tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          nq<span className="text-primary">craig</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#b8c8e5] md:flex" aria-label="Main navigation">
          <a href="#program" className="transition hover:text-white">Program</a>
          <a href="#story" className="transition hover:text-white">Craig&apos;s story</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
        </nav>
        <Button asChild className="h-11 rounded-full px-5 font-bold">
          <a href="#apply">Apply now</a>
        </Button>
      </div>
    </header>
  );
}
