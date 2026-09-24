import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { StatusPage } from "@/components/status-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application received | nqcraig",
  robots: { index: false, follow: false },
};

const nextSteps = [
  ["01", "Craig reviews your application", "He reads every answer to understand your experience, goals, and fit for the mentorship."],
  ["02", "Watch Discord and your inbox", "If it's a fit, Craig may reach out through the Discord username or email you gave. Keep an eye out for a friend request."],
  ["03", "Get your next steps", "Accepted applicants receive onboarding details directly. There's nothing else you need to do right now."],
] as const;

export default function ApplicationReceived() {
  return (
    <StatusPage
      mark={<CheckCircle2 className="size-14 text-[#86f0cb]" aria-hidden="true" />}
      eyebrow="Application received"
      title="You're in the queue. Nice work."
      actions={<Button asChild size="lg" className="h-14 rounded-full px-7 text-base font-bold"><Link href="/"><ArrowLeft aria-hidden="true" /> Back to home</Link></Button>}
    >
      <p>Thanks for taking your process seriously. Your application was sent privately to Craig and is never posted publicly.</p>
      <ol className="mt-10 space-y-6 border-l border-primary/35 pl-6">
        {nextSteps.map(([number, title, body]) => (
          <li key={number}>
            <span className="font-mono text-xs text-[#8bb3ff]">{number}</span>
            <h2 className="mt-1 text-xl font-black tracking-tight text-white">{title}</h2>
            <p className="mt-1 text-base leading-7 text-[#9fb2d2]">{body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm leading-6 text-[#829bc3]">Futures trading involves substantial risk of loss. Mentorship does not guarantee results.</p>
    </StatusPage>
  );
}
