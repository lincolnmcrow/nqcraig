"use client";

import { useState, type FormEvent } from "react";
import { Controller, useForm, type Control, type FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { ArrowRight, CircleAlert } from "lucide-react";
import { applicationSchema, applicationSteps } from "@/lib/forms.mjs";
import { submitToNetlify } from "@/lib/submit-form";
import { StepHeader, StepNav } from "@/components/form-steps";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ApplicationInput = z.input<typeof applicationSchema>;
type ApplicationOutput = z.output<typeof applicationSchema>;
type FieldName = keyof ApplicationInput;

const defaults = (): ApplicationInput => ({
  submissionId: crypto.randomUUID(), startedAt: Date.now(), company: "", fullName: "", email: "",
  discordUsername: "", experience: "", goals: "", challenges: "", reason: "",
  acceptedRisk: false, acceptedPrivacy: false,
});

const labels: Partial<Record<FieldName, string>> = {
  fullName: "Full name", email: "Email", discordUsername: "Discord username", experience: "Trading experience",
  challenges: "Current challenges", goals: "Trading goals", reason: "Why this mentorship",
};

const reviewSteps = applicationSteps.slice(0, -1);

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const { register, control, handleSubmit, trigger, getValues, formState: { errors, isSubmitting } } = useForm<ApplicationInput, unknown, ApplicationOutput>({
    resolver: zodResolver(applicationSchema), defaultValues: defaults(), shouldFocusError: true,
  });
  const last = step === applicationSteps.length - 1;

  async function onSubmit(values: ApplicationOutput) {
    setError(null);
    try {
      await submitToNetlify("application", values);
      setSent(true);
      router.push("/thank-you/");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Your application could not be sent. Please try again.");
    }
  }

  // Jump back to the first step with a problem if anything slipped through.
  function onInvalid(invalid: FieldErrors<ApplicationInput>) {
    const index = applicationSteps.findIndex((item) => item.fields.some((field) => field in invalid));
    if (index >= 0) setStep(index);
  }

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    if (last) return handleSubmit(onSubmit, onInvalid)(event);
    event.preventDefault();
    if (await trigger(applicationSteps[step].fields as FieldName[], { shouldFocus: true })) setStep(step + 1);
  }

  return (
    <form onSubmit={handleForm} className="space-y-6" noValidate>
      <input {...register("company")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <StepHeader steps={applicationSteps} current={step} tone="light" />

      {step === 0 && <>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" error={errors.fullName?.message}><Input {...register("fullName")} autoComplete="name" aria-invalid={!!errors.fullName} className="h-12 bg-[#f7faff]" /></Field>
          <Field label="Email" error={errors.email?.message}><Input {...register("email")} type="email" autoComplete="email" aria-invalid={!!errors.email} className="h-12 bg-[#f7faff]" /></Field>
        </div>
        <Field label="Discord username" hint="Double-check this—we may contact you here." error={errors.discordUsername?.message}><Input {...register("discordUsername")} autoComplete="off" placeholder="username" aria-invalid={!!errors.discordUsername} className="h-12 bg-[#f7faff] placeholder:text-[#52627d]" /></Field>
      </>}

      {step === 1 && <>
        <Field label="Trading experience" error={errors.experience?.message} errorId="experience-error">
          <Controller name="experience" control={control} render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}><SelectTrigger ref={field.ref} onBlur={field.onBlur} className="h-12 w-full bg-[#f7faff] data-[placeholder]:text-[#52627d]" aria-invalid={!!errors.experience} aria-describedby={errors.experience ? "experience-error" : undefined}><SelectValue placeholder="Choose your level" /></SelectTrigger><SelectContent><SelectItem value="Brand new to futures">Brand new to futures</SelectItem><SelectItem value="Learning the basics">Learning the basics</SelectItem><SelectItem value="Actively trading NQ">Actively trading NQ</SelectItem><SelectItem value="Experienced trader">Experienced trader</SelectItem></SelectContent></Select>
          )} />
        </Field>
        <Field label="What challenges are you facing right now?" error={errors.challenges?.message}><Textarea {...register("challenges")} rows={4} aria-invalid={!!errors.challenges} className="min-h-28 bg-[#f7faff]" /></Field>
      </>}

      {step === 2 && <>
        <Field label="What are your trading goals?" error={errors.goals?.message}><Textarea {...register("goals")} rows={4} aria-invalid={!!errors.goals} className="min-h-28 bg-[#f7faff]" /></Field>
        <Field label="Why do you want to join this mentorship?" error={errors.reason?.message}><Textarea {...register("reason")} rows={4} aria-invalid={!!errors.reason} className="min-h-28 bg-[#f7faff]" /></Field>
      </>}

      {last && <>
        <div className="space-y-3">
          {reviewSteps.map((item, index) => (
            <section key={item.title} className="rounded-2xl border border-[#cbd7ea] bg-[#f7faff] p-5">
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-bold">{item.title}</h4>
                <button type="button" onClick={() => setStep(index)} className="text-sm font-bold text-[#075cff] underline underline-offset-2" aria-label={`Edit ${item.title}`}>Edit</button>
              </div>
              <dl className="mt-3 space-y-3 text-sm">
                {item.fields.map((name) => (
                  <div key={name}><dt className="text-[#52627d]">{labels[name as FieldName]}</dt><dd className="mt-0.5 whitespace-pre-wrap break-words font-medium">{String(getValues(name as FieldName) ?? "")}</dd></div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <Consent name="acceptedRisk" control={control} error={errors.acceptedRisk?.message}>I understand that futures trading involves substantial risk of loss and that mentorship does not guarantee results.</Consent>
        <Consent name="acceptedPrivacy" control={control} error={errors.acceptedPrivacy?.message}>I agree to the <a href="/privacy/" className="font-bold text-[#075cff] underline underline-offset-2">privacy notice</a> and consent to being contacted through Discord or email.</Consent>
      </>}

      {error && <Alert variant="destructive"><CircleAlert aria-hidden="true" /><AlertDescription>{error}</AlertDescription></Alert>}
      <StepNav current={step} total={applicationSteps.length} submitting={isSubmitting || sent} submitLabel="Submit application" submittingLabel="Sending application" submitIcon={<ArrowRight />} onBack={() => { setError(null); setStep(step - 1); }} />
    </form>
  );
}

function Field({ label, hint, error, errorId, children }: { label: string; hint?: string; error?: string; errorId?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}{hint && <span className="mt-2 block text-xs leading-5 text-[#52627d]">{hint}</span>}{error && <span id={errorId} className="mt-2 block text-sm font-semibold text-[#c81e3a]">{error}</span>}</label>;
}

function Consent({ name, control, error, children }: { name: "acceptedRisk" | "acceptedPrivacy"; control: Control<ApplicationInput, unknown, ApplicationOutput>; error?: string; children: React.ReactNode }) {
  const errorId = `${name}-error`;
  return <div><Controller name={name} control={control} render={({ field }) => <label className="flex items-start gap-3 text-sm leading-6 text-[#415272]"><Checkbox ref={field.ref} onBlur={field.onBlur} checked={field.value} onCheckedChange={(value) => field.onChange(value === true)} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} className="mt-1" /> <span>{children}</span></label>} />{error && <span id={errorId} className="mt-2 block text-sm font-semibold text-[#c81e3a]">{error}</span>}</div>;
}
