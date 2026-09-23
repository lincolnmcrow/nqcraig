"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { testimonialSchema } from "@/lib/forms.mjs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TestimonialInput = {
  submissionId: string; startedAt: number; company: string; displayName: string; contact: string;
  role: string; testimonial: string; honestExperience: boolean; allowEditing: boolean;
  allowName: boolean; allowTestimonial: boolean;
};

const defaults = (): TestimonialInput => ({
  submissionId: crypto.randomUUID(), startedAt: Date.now(), company: "", displayName: "", contact: "", role: "",
  testimonial: "", honestExperience: false, allowEditing: false, allowName: false, allowTestimonial: false,
});

export function TestimonialForm() {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema), defaultValues: defaults(), shouldFocusError: true,
  });

  async function onSubmit(values: TestimonialInput) {
    setStatus(null);
    try {
      const response = await fetch("/api/testimonial", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const payload = await response.json() as { ok: boolean; message: string };
      setStatus(payload);
      if (payload.ok) reset(defaults());
    } catch {
      setStatus({ ok: false, message: "Your testimonial could not be sent. Your words are still here—please try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
      <input {...register("company")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Display name" error={errors.displayName?.message}><Input {...register("displayName")} placeholder="How should we credit you?" aria-invalid={!!errors.displayName} className="h-12 bg-white/[.05]" /></Field>
        <Field label="Email or Discord username" error={errors.contact?.message}><Input {...register("contact")} placeholder="For private verification" aria-invalid={!!errors.contact} className="h-12 bg-white/[.05]" /></Field>
      </div>
      <Field label="Role or experience level (optional)" error={errors.role?.message}><Input {...register("role")} placeholder="Developing NQ trader" className="h-12 bg-white/[.05]" /></Field>
      <Field label="Your honest experience" error={errors.testimonial?.message}><Textarea {...register("testimonial")} rows={6} aria-invalid={!!errors.testimonial} className="min-h-36 bg-white/[.05]" /></Field>
      <Consent name="honestExperience" control={control} error={errors.honestExperience?.message}>This reflects my honest experience.</Consent>
      <Consent name="allowTestimonial" control={control} error={errors.allowTestimonial?.message}>I give nqcraig permission to review and potentially publish this testimonial.</Consent>
      <Consent name="allowName" control={control}>My display name may appear with the testimonial.</Consent>
      <Consent name="allowEditing" control={control}>nqcraig may edit for length or clarity without changing my meaning.</Consent>
      <p className="text-sm leading-6 text-[#8fa8cf]">Nothing publishes automatically. Craig verifies and approves every story first.</p>
      {status && <Alert variant={status.ok ? "default" : "destructive"} className={status.ok ? "border-[#86f0cb]/40 bg-[#86f0cb]/10" : ""}><CheckCircle2 aria-hidden="true" /><AlertDescription>{status.message}</AlertDescription></Alert>}
      <Button type="submit" disabled={isSubmitting} className="h-12 rounded-full px-7 font-bold">
        {isSubmitting ? <><LoaderCircle className="animate-spin" /> Sending</> : <><Send /> Submit story</>}
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}{error && <span className="mt-2 block text-sm font-semibold text-[#ff8aa0]">{error}</span>}</label>;
}

function Consent({ name, control, error, children }: { name: "honestExperience" | "allowTestimonial" | "allowName" | "allowEditing"; control: any; error?: string; children: React.ReactNode }) {
  return <div><Controller name={name} control={control} render={({ field }) => <label className="flex items-start gap-3 text-sm leading-6 text-[#b8c8e5]"><Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(value === true)} aria-invalid={!!error} className="mt-1" /> <span>{children}</span></label>} />{error && <span className="mt-2 block text-sm font-semibold text-[#ff8aa0]">{error}</span>}</div>;
}
