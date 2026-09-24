import { z } from "zod";

const shortText = (label, min = 2, max = 120) =>
  z.string().trim().min(min, `${label} is required.`).max(max, `${label} is too long.`);

const longText = (label) =>
  z.string().trim().min(10, `${label} needs a little more detail.`).max(2000, `${label} is too long.`);

const discordUsername = z
  .string()
  .trim()
  .min(2, "Enter your Discord username.")
  .max(64, "Discord username is too long.")
  .regex(/^[^\s\u0000-\u001F\u007F]+$/, "Check your Discord username.");

const shared = {
  submissionId: z.string().uuid(),
  startedAt: z.number().int().positive(),
  company: z.string().max(0).optional().default(""),
};

export const applicationSchema = z.object({
  ...shared,
  fullName: shortText("Full name"),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  discordUsername,
  experience: shortText("Experience level"),
  goals: longText("Goals"),
  challenges: longText("Current challenges"),
  reason: longText("Reason for applying"),
  acceptedRisk: z.boolean().refine(Boolean, "Acknowledge the trading risk."),
  acceptedPrivacy: z.boolean().refine(Boolean, "Accept the privacy notice."),
});

export const testimonialSchema = z.object({
  ...shared,
  displayName: shortText("Display name", 1, 80),
  contact: shortText("Email or Discord username", 2, 254),
  role: z.string().trim().max(100).optional().default(""),
  testimonial: longText("Testimonial"),
  honestExperience: z.boolean().refine(Boolean, "Confirm this is your honest experience."),
  allowEditing: z.boolean(),
  allowName: z.boolean(),
  allowTestimonial: z.boolean().refine(Boolean, "Permission is required to review this submission."),
});

export const applicationSteps = [
  { title: "Contact", fields: ["fullName", "email", "discordUsername"] },
  { title: "Experience", fields: ["experience", "challenges"] },
  { title: "Goals", fields: ["goals", "reason"] },
  { title: "Review & submit", fields: ["acceptedRisk", "acceptedPrivacy"] },
];

export const testimonialSteps = [
  { title: "About you", fields: ["displayName", "contact", "role"] },
  { title: "Your story", fields: ["testimonial"] },
  { title: "Permissions & submit", fields: ["honestExperience", "allowTestimonial", "allowName", "allowEditing"] },
];

// Fields used only in the browser; Netlify never receives them.
export const internalFields = ["submissionId", "startedAt"];

export function encodeNetlifySubmission(formName, values) {
  const body = new URLSearchParams({ "form-name": formName });
  for (const [key, value] of Object.entries(values)) {
    if (internalFields.includes(key)) continue;
    body.append(key, typeof value === "boolean" ? (value ? "Yes" : "No") : String(value ?? ""));
  }
  return body.toString();
}
