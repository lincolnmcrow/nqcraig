"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { applicationSchema } from "@/lib/forms.mjs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ApplicationInput = {
  submissionId: string;
  startedAt: number;
  company: string;
  fullName: string;
  email: string;
  discordUsername: string;
  experience: string;
  goals: string;
  challenges: string;
  reason: string;
  acceptedRisk: boolean;
  acceptedPrivacy: boolean;
};

const defaults = (): ApplicationInput => ({
  submissionId: crypto.randomUUID(), startedAt: Date.now(), company: "", fullName: "", email: "",
  discordUsername: "", experience: "", goals: "", challenges: "", reason: "",
  acceptedRisk: false, acceptedPrivacy: false,
});

export function ApplicationForm() {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema), defaultValues: defaults(), shouldFocusError: true,
  });

  async function onSubmit(values: ApplicationInput) {
    setStatus(null);
    try {
      const response = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const payload = await response.json() as { ok: boolean; message: string };
      setStatus(payload);
      if (payload.ok) reset(defaults());
    } catch {
      setStatus({ ok: false, message: "Your application could not be sent. Your answers are still here—please try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <input {...register("company")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}><Input {...register("fullName")} autoComplete="name" aria-invalid={!!errors.fullName} className="h-12 bg-[#f7faff]" /></Field>
        <Field label="Email" error={errors.email?.message}><Input {...register("email")} type="email" autoComplete="email" aria-invalid={!!errors.email} className="h-12 bg-[#f7faff]" /></Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Discord username" hint="Double-check this—we may contact you here." error={errors.discordUsername?.message}><Input {...register("discordUsername")} autoComplete="off" placeholder="username" aria-invalid={!!errors.discordUsername} className="h-12 bg-[#f7faff]" /></Field>
        <Field label="Trading experience" error={errors.experience?.message}>
          <Controller name="experience" control={control} render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}><SelectTrigger className="h-12 w-full bg-[#f7faff]" aria-invalid={!!errors.experience}><SelectValue placeholder="Choose your level" /></SelectTrigger><SelectContent><SelectItem value="Brand new to futures">Brand new to futures</SelectItem><SelectItem value="Learning the basics">Learning the basics</SelectItem><SelectItem value="Actively trading NQ">Actively trading NQ</SelectItem><SelectItem value="Experienced trader">Experienced trader</SelectItem></SelectContent></Select>
          )} />
        </Field>
      </div>
      <Field label="What are your trading goals?" error={errors.goals?.message}><Textarea {...register("goals")} rows={4} aria-invalid={!!errors.goals} className="min-h-28 bg-[#f7faff]" /></Field>
      <Field label="What challenges are you facing right now?" error={errors.challenges?.message}><Textarea {...register("challenges")} rows={4} aria-invalid={!!errors.challenges} className="min-h-28 bg-[#f7faff]" /></Field>
      <Field label="Why do you want to join this mentorship?" error={errors.reason?.message}><Textarea {...register("reason")} rows={4} aria-invalid={!!errors.reason} className="min-h-28 bg-[#f7faff]" /></Field>
      <Consent name="acceptedRisk" control={control} error={errors.acceptedRisk?.message}>I understand that futures trading involves substantial risk of loss and that mentorship does not guarantee results.</Consent>
      <Consent name="acceptedPrivacy" control={control} error={errors.acceptedPrivacy?.message}>I agree to the <a href="/privacy" className="font-bold text-[#075cff] underline underline-offset-2">privacy notice</a> and consent to being contacted through Discord or email.</Consent>
      {status && <Alert variant={status.ok ? "default" : "destructive"} className={status.ok ? "border-[#9adbbc] bg-[#eefbf5] text-[#124a32]" : ""}><CheckCircle2 aria-hidden="true" /><AlertDescription className={status.ok ? "text-[#124a32]" : ""}>{status.message}</AlertDescription></Alert>}
      <Button type="submit" disabled={isSubmitting} className="h-14 w-full rounded-full text-base font-bold sm:w-auto sm:px-8">
        {isSubmitting ? <><LoaderCircle className="animate-spin" /> Sending application</> : <>Submit application <ArrowRight /></>}
      </Button>
    </form>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}{hint && <span className="mt-2 block text-xs leading-5 text-[#64748b]">{hint}</span>}{error && <span className="mt-2 block text-sm font-semibold text-[#c81e3a]">{error}</span>}</label>;
}

function Consent({ name, control, error, children }: { name: "acceptedRisk" | "acceptedPrivacy"; control: any; error?: string; children: React.ReactNode }) {
  return <div><Controller name={name} control={control} render={({ field }) => <label className="flex items-start gap-3 text-sm leading-6 text-[#415272]"><Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(value === true)} aria-invalid={!!error} className="mt-1" /> <span>{children}</span></label>} />{error && <span className="mt-2 block text-sm font-semibold text-[#c81e3a]">{error}</span>}</div>;
}
