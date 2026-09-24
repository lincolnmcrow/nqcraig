import Link from "next/link";
import { Menu } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Root-relative anchors so the links also work from the thank-you and 404 pages.
const links = [
  ["Program", "/#program"],
  ["Craig's story", "/#story"],
  ["FAQ", "/#faq"],
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#041126]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
        <Link href="/#top" className="font-display text-xl font-black tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          nq<span className="text-primary">craig</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#b8c8e5] md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-white">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="h-11 rounded-full px-5 font-bold">
            <Link href="/#apply">Apply now</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-11 rounded-full text-white hover:bg-white/10 md:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm border-white/10 bg-[#041126] p-6 pt-20 text-white [&>button]:top-7 [&>button]:right-6 [&>button>svg]:size-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile navigation" className="flex flex-col">
                {[...links, ["Share your story", "/#share-story"]].map(([label, href]) => (
                  <SheetClose asChild key={href}>
                    <Link href={href} className="border-b border-white/10 py-4 text-2xl font-black tracking-tight transition hover:text-primary">{label}</Link>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Button asChild className="mt-8 h-14 rounded-full text-base font-bold"><Link href="/#apply">Apply for mentorship</Link></Button>
              </SheetClose>
              <SocialLinks className="mt-auto" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
