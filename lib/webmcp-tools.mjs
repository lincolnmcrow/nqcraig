import { applicationSchema, testimonialSchema } from "./forms.mjs";

const string = { type: "string" };
const boolean = { type: "boolean" };

export function createToolDefinitions(submit) {
  return [
    {
      name: "submit_mentorship_application",
      title: "Apply for nqcraig Mentorship",
      description: "Submit a complete, consented application for nqcraig's Discord-first NQ mentorship.",
      inputSchema: {
        type: "object", additionalProperties: false,
        properties: { fullName: string, email: string, discordUsername: string, experience: string, goals: string, challenges: string, reason: string, acceptedRisk: boolean, acceptedPrivacy: boolean },
        required: ["fullName", "email", "discordUsername", "experience", "goals", "challenges", "reason", "acceptedRisk", "acceptedPrivacy"],
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async (value) => {
        const input = parse(applicationSchema, value);
        return submit("/api/apply", input);
      },
    },
    {
      name: "submit_student_testimonial",
      title: "Submit a Student Testimonial",
      description: "Privately submit an honest student experience for nqcraig to verify and review before possible publication.",
      inputSchema: {
        type: "object", additionalProperties: false,
        properties: { displayName: string, contact: string, role: string, testimonial: string, honestExperience: boolean, allowEditing: boolean, allowName: boolean, allowTestimonial: boolean },
        required: ["displayName", "contact", "testimonial", "honestExperience", "allowEditing", "allowName", "allowTestimonial"],
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async (value) => {
        const input = parse(testimonialSchema, value);
        return submit("/api/testimonial", input);
      },
    },
  ];
}

function parse(schema, value) {
  const parsed = schema.safeParse({ ...value, submissionId: crypto.randomUUID(), startedAt: Date.now() - 3000, company: "" });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid submission.");
  return parsed.data;
}
