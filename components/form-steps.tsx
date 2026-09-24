"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Tone = "light" | "dark";

export function StepHeader({ steps, current, tone }: { steps: readonly { title: string }[]; current: number; tone: Tone }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previous = useRef(current);

  // Move focus to the new step's heading so keyboard and screen-reader users land on it.
  // Comparing against the previous step (not a "mounted" flag) keeps page load from stealing focus.
  useEffect(() => {
    if (previous.current !== current) headingRef.current?.focus();
    previous.current = current;
  }, [current]);

  return (
    <div className="mb-8">
      <p className={`text-xs font-bold uppercase tracking-[.18em] ${tone === "light" ? "text-[#52627d]" : "text-[#8fa8cf]"}`}>
        Step {current + 1} of {steps.length}
      </p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-black tracking-tight outline-none">{steps[current].title}</h3>
      <Progress value={((current + 1) / steps.length) * 100} aria-label={`Step ${current + 1} of ${steps.length}`} className="mt-4" />
    </div>
  );
}

export function StepNav({ current, total, submitting, submitLabel, submittingLabel, submitIcon, onBack }: {
  current: number; total: number; submitting: boolean; submitLabel: string; submittingLabel: string; submitIcon: ReactNode; onBack: () => void;
}) {
  const last = current === total - 1;
  return (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
      {current > 0 && (
        <Button type="button" variant="ghost" onClick={onBack} disabled={submitting} className="h-12 rounded-full px-6 font-bold">
          <ArrowLeft /> Back
        </Button>
      )}
      <Button type="submit" disabled={submitting} className="h-14 w-full rounded-full text-base font-bold sm:w-auto sm:px-8">
        {submitting ? <><LoaderCircle className="animate-spin" /> {submittingLabel}</> : last ? <>{submitLabel} {submitIcon}</> : <>Continue <ArrowRight /></>}
      </Button>
    </div>
  );
}
