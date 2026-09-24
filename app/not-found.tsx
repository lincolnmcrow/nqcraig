import type { Metadata } from "next";
import { ArrowDownRight, ArrowLeft } from "lucide-react";
import { StatusPage } from "@/components/status-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | nqcraig",
};

export default function NotFound() {
  return (
    <StatusPage
      mark={<p className="font-mono text-[clamp(4rem,14vw,9rem)] font-black leading-none tracking-tighter text-primary" aria-hidden="true">404</p>}
      eyebrow="Page not found"
      title="This page isn't on the chart."
      actions={<>
        <Button asChild size="lg" className="h-14 rounded-full px-7 text-base font-bold"><Link href="/"><ArrowLeft aria-hidden="true" /> Back to home</Link></Button>
        <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/15 bg-white/5 px-7 text-base font-bold hover:bg-white/10"><Link href="/#apply">Apply for mentorship <ArrowDownRight aria-hidden="true" /></Link></Button>
        <Button asChild size="lg" variant="ghost" className="h-14 rounded-full px-7 text-base font-bold hover:bg-white/10"><Link href="/#faq">Read the FAQ</Link></Button>
      </>}
    >
      <p>The link may be old or mistyped. Head back to the main page, or jump straight to the application.</p>
    </StatusPage>
  );
}
