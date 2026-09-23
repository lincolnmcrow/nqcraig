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
