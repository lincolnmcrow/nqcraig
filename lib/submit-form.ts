import { encodeNetlifySubmission } from "@/lib/forms.mjs";

export type FormName = "application" | "testimonial";

const MIN_FILL_TIME_MS = 2500;

// Posts to Netlify Forms, which only exists on the deployed site. Locally we skip
// the request so the full flow, including the thank-you page, can be tested.
export async function submitToNetlify(formName: FormName, values: Record<string, unknown> & { startedAt: number }) {
  if (Date.now() - values.startedAt < MIN_FILL_TIME_MS) {
    throw new Error("Please take a moment to review your answers before submitting.");
  }
  if (process.env.NODE_ENV === "development") return;

  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeNetlifySubmission(formName, values),
  });
  if (!response.ok) throw new Error("We could not send this right now. Your answers are still here—please try again.");
}
