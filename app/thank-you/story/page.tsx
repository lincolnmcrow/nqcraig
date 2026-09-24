import type { Metadata } from "next";
import { ArrowLeft, HeartHandshake } from "lucide-react";
import { StatusPage } from "@/components/status-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Story received | nqcraig",
  robots: { index: false, follow: false },
};

export default function StoryReceived() {
  return (
    <StatusPage
      mark={<HeartHandshake className="size-14 text-[#86f0cb]" aria-hidden="true" />}
      eyebrow="Story received"
      title="Thank you for sharing your experience."
      actions={<Button asChild size="lg" className="h-14 rounded-full px-7 text-base font-bold"><Link href="/"><ArrowLeft aria-hidden="true" /> Back to home</Link></Button>}
    >
      <p>Your story was sent privately to Craig. Nothing is published automatically—he&apos;ll verify it with you first and only share it the way you gave permission for.</p>
    </StatusPage>
  );
}
