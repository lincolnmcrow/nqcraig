"use client";

import { useState, type FormEvent } from "react";
import { Controller, useForm, type Control, type FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CircleAlert, Send } from "lucide-react";
import { testimonialSchema, testimonialSteps } from "@/lib/forms.mjs";
import { submitToNetlify } from "@/lib/submit-form";
import { StepHeader, StepNav } from "@/components/form-steps";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TestimonialInput = z.input<typeof testimonialSchema>;
type TestimonialOutput = z.output<typeof testimonialSchema>;
type FieldName = keyof TestimonialInput;

const defaults = (): TestimonialInput => ({
  submissionId: crypto.randomUUID(), startedAt: Date.now(), company: "", displayName: "", contact: "", role: "",
  testimonial: "", honestExperience: false, allowEditing: false, allowName: false, allowTestimonial: false,
});

export function TestimonialForm() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const { register, control, handleSubmit, trigger, getValues, formState: { errors, isSubmitting } } = useForm<TestimonialInput, unknown, TestimonialOutput>({
    resolver: zodResolver(testimonialSchema), defaultValues: defaults(), shouldFocusError: true,
  });
  const last = step === testimonialSteps.length - 1;

  async function onSubmit(values: TestimonialOutput) {
    setError(null);
    try {
      await submitToNetlify("testimonial", values);
      setSent(true);
      router.push("/thank-you/story/");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Your testimonial could not be sent. Please try again.");
    }
  }

  function onInvalid(invalid: FieldErrors<TestimonialInput>) {
    const index = testimonialSteps.findIndex((item) => item.fields.some((field) => field in invalid));
    if (index >= 0) setStep(index);
  }

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    if (last) return handleSubmit(onSubmit, onInvalid)(event);
    event.preventDefault();
    if (await trigger(testimonialSteps[step].fields as FieldName[], { shouldFocus: true })) setStep(step + 1);
  }

  return (
    <form onSubmit={handleForm} className="mt-8 space-y-5" noValidate>
      <input {...register("company")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <StepHeader steps={testimonialSteps} current={step} tone="dark" />

      {step === 0 && <>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Display name" error={errors.displayName?.message}><Input {...register("displayName")} placeholder="How should we credit you?" aria-invalid={!!errors.displayName} className="h-12 bg-white/[.05]" /></Field>
          <Field label="Email or Discord username" error={errors.contact?.message}><Input {...register("contact")} placeholder="For private verification" aria-invalid={!!errors.contact} className="h-12 bg-white/[.05]" /></Field>
        </div>
        <Field label="Role or experience level (optional)" error={errors.role?.message}><Input {...register("role")} placeholder="Developing NQ trader" className="h-12 bg-white/[.05]" /></Field>
      </>}

      {step === 1 && (
        <Field label="Your honest experience" error={errors.testimonial?.message}><Textarea {...register("testimonial")} rows={6} aria-invalid={!!errors.testimonial} className="min-h-36 bg-white/[.05]" /></Field>
      )}

      {last && <>
        <figure className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-[#8fa8cf]">Your story</p>
            <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-[#8bb3ff] underline underline-offset-2" aria-label="Edit your story">Edit</button>
          </div>
          <blockquote className="mt-3 whitespace-pre-wrap break-words leading-7 text-[#dbe6f8]">{getValues("testimonial")}</blockquote>
          <figcaption className="mt-3 text-sm text-[#8fa8cf]">— {getValues("displayName")}{getValues("role") ? `, ${getValues("role")}` : ""}</figcaption>
        </figure>
        <Consent name="honestExperience" control={control} error={errors.honestExperience?.message}>This reflects my honest experience.</Consent>
        <Consent name="allowTestimonial" control={control} error={errors.allowTestimonial?.message}>I give nqcraig permission to review and potentially publish this testimonial.</Consent>
        <Consent name="allowName" control={control}>My display name may appear with the testimonial.</Consent>
        <Consent name="allowEditing" control={control}>nqcraig may edit for length or clarity without changing my meaning.</Consent>
        <p className="text-sm leading-6 text-[#8fa8cf]">Nothing publishes automatically. Craig verifies and approves every story first.</p>
      </>}

      {error && <Alert variant="destructive"><CircleAlert aria-hidden="true" /><AlertDescription>{error}</AlertDescription></Alert>}
      <StepNav current={step} total={testimonialSteps.length} submitting={isSubmitting || sent} submitLabel="Submit story" submittingLabel="Sending" submitIcon={<Send />} onBack={() => { setError(null); setStep(step - 1); }} />
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}{error && <span className="mt-2 block text-sm font-semibold text-[#ff8aa0]">{error}</span>}</label>;
}

function Consent({ name, control, error, children }: { name: "honestExperience" | "allowTestimonial" | "allowName" | "allowEditing"; control: Control<TestimonialInput, unknown, TestimonialOutput>; error?: string; children: React.ReactNode }) {
  const errorId = `${name}-error`;
  return <div><Controller name={name} control={control} render={({ field }) => <label className="flex items-start gap-3 text-sm leading-6 text-[#b8c8e5]"><Checkbox ref={field.ref} onBlur={field.onBlur} checked={field.value} onCheckedChange={(value) => field.onChange(value === true)} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} className="mt-1" /> <span>{children}</span></label>} />{error && <span id={errorId} className="mt-2 block text-sm font-semibold text-[#ff9eb0]">{error}</span>}</div>;
}
