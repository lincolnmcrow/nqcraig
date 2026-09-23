"use client";

import type { ReactNode } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { useMentorshipTools } from "@/hooks/use-mentorship-tools";

export function WebMcpProvider({ children }: { children: ReactNode }) {
  const status = useMentorshipTools();
  return <>{children}{status && <output aria-live="polite" className={`fixed bottom-5 right-5 z-[80] flex max-w-sm items-start gap-3 rounded-2xl border p-4 text-sm shadow-2xl ${status.ok ? "border-[#86f0cb]/40 bg-[#092d25] text-[#d8fff1]" : "border-[#ff8aa0]/40 bg-[#3b1020] text-[#ffe0e6]"}`}>{status.ok ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" /> : <CircleAlert className="mt-0.5 size-5 shrink-0" />}<span>{status.message}</span></output>}</>;
}
