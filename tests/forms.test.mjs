import test from "node:test";
import assert from "node:assert/strict";
import { applicationSchema, testimonialSchema } from "../lib/forms.mjs";

const validApplication = {
  submissionId: "6e440e95-8df4-4e4a-93fa-9a7bdd884d58",
  startedAt: Date.now() - 5000,
  company: "",
  fullName: "Jordan Lee",
  email: "jordan@example.com",
  discordUsername: "jordan.trades",
  experience: "Learning the basics",
  goals: "Build a repeatable review process.",
  challenges: "Inconsistent execution.",
  reason: "I want structured feedback and accountability.",
  acceptedRisk: true,
  acceptedPrivacy: true,
};

test("a valid application parses", () => {
  assert.equal(applicationSchema.safeParse(validApplication).success, true);
});

test("Discord username and consent are required", () => {
  const result = applicationSchema.safeParse({ ...validApplication, discordUsername: "", acceptedRisk: false });
  assert.equal(result.success, false);
  assert.equal(result.error.issues.some((issue) => issue.message === "Acknowledge the trading risk."), true);
});

test("testimonial publication consent is explicit", () => {
  const result = testimonialSchema.safeParse({
    submissionId: validApplication.submissionId,
    startedAt: validApplication.startedAt,
    company: "",
    displayName: "J.",
    contact: "jordan.trades",
    role: "Developing trader",
    testimonial: "Craig helped me become more structured.",
    honestExperience: true,
    allowEditing: true,
    allowName: false,
    allowTestimonial: true,
  });
  assert.equal(result.success, true);
});

test("testimonial consent errors use clear instructions", () => {
  const result = testimonialSchema.safeParse({
    submissionId: validApplication.submissionId,
    startedAt: validApplication.startedAt,
    company: "",
    displayName: "J.",
    contact: "jordan.trades",
    role: "Developing trader",
    testimonial: "Craig helped me become more structured.",
    honestExperience: false,
    allowEditing: false,
    allowName: false,
    allowTestimonial: false,
  });
  assert.equal(result.success, false);
  assert.equal(result.error.issues.some((issue) => issue.message === "Confirm this is your honest experience."), true);
  assert.equal(result.error.issues.some((issue) => issue.message === "Permission is required to review this submission."), true);
});
