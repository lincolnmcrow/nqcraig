import test from "node:test";
import assert from "node:assert/strict";
import { applicationSchema, testimonialSchema } from "../lib/forms.mjs";
import { createSubmissionHandler } from "../lib/submissions.mjs";

const configuredEnv = { RESEND_API_KEY: "re_test", NQCRAIG_SUBMISSIONS_TO: "craig@example.com", NQCRAIG_FROM_EMAIL: "nqcraig <forms@example.com>" };
const validApplication = {
  submissionId: "6e440e95-8df4-4e4a-93fa-9a7bdd884d58", startedAt: Date.now() - 5000, company: "",
  fullName: "Jordan Lee", email: "jordan@example.com", discordUsername: "jordan.trades",
  experience: "Learning the basics", goals: "Build a repeatable review process.", challenges: "Inconsistent execution.",
  reason: "I want structured feedback and accountability.", acceptedRisk: true, acceptedPrivacy: true,
};
const jsonRequest = (value) => new Request("https://example.test", { method: "POST", headers: { "Content-Type": "application/json" }, body: typeof value === "string" ? value : JSON.stringify(value) });

test("malformed applications never call Resend", async () => {
  let calls = 0;
  const handler = createSubmissionHandler({ type: "application", schema: applicationSchema, fetchImpl: async () => { calls += 1; return new Response(); }, env: configuredEnv });
  const response = await handler(jsonRequest({ discordUsername: "" }));
  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});

test("free text is escaped and idempotency is stable", async () => {
  const requests = [];
  const handler = createSubmissionHandler({
    type: "application", schema: applicationSchema, env: configuredEnv,
    fetchImpl: async (url, init) => { requests.push({ url, init }); return Response.json({ id: "email_123" }); },
  });
  const input = { ...validApplication, goals: "<script>alert(1)</script> build discipline" };
  await handler(jsonRequest(input));
  await handler(jsonRequest(input));
  assert.equal(requests[0].init.headers["Idempotency-Key"], `application/${input.submissionId}`);
  assert.equal(requests[1].init.headers["Idempotency-Key"], `application/${input.submissionId}`);
  assert.doesNotMatch(requests[0].init.body, /<script>/);
  assert.match(requests[0].init.body, /&lt;script&gt;/);
});

test("missing configuration returns 503", async () => {
  const handler = createSubmissionHandler({ type: "application", schema: applicationSchema, env: {} });
  assert.equal((await handler(jsonRequest(validApplication))).status, 503);
});

test("invalid JSON returns 400", async () => {
  const handler = createSubmissionHandler({ type: "application", schema: applicationSchema, env: configuredEnv });
  assert.equal((await handler(jsonRequest("{"))).status, 400);
});

test("honeypot is silently accepted without delivery", async () => {
  let calls = 0;
  const handler = createSubmissionHandler({ type: "application", schema: applicationSchema, env: configuredEnv, fetchImpl: async () => { calls += 1; return new Response(); } });
  const response = await handler(jsonRequest({ ...validApplication, company: "spam" }));
  assert.equal(response.status, 200);
  assert.equal(calls, 0);
});

test("submissions faster than 2.5 seconds are rejected", async () => {
  const handler = createSubmissionHandler({ type: "application", schema: applicationSchema, env: configuredEnv });
  assert.equal((await handler(jsonRequest({ ...validApplication, startedAt: Date.now() }))).status, 400);
});

test("provider failures return a retry-safe 502", async () => {
  const handler = createSubmissionHandler({ type: "application", schema: applicationSchema, env: configuredEnv, fetchImpl: async () => new Response("provider detail", { status: 500 }) });
  const response = await handler(jsonRequest(validApplication));
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /provider detail/);
});

test("a valid testimonial delivers successfully", async () => {
  const input = {
    submissionId: "743df642-992d-4bda-a291-9de351168ed8", startedAt: Date.now() - 5000, company: "", displayName: "J.",
    contact: "jordan.trades", role: "Developing trader", testimonial: "Craig helped me become more structured.",
    honestExperience: true, allowEditing: true, allowName: false, allowTestimonial: true,
  };
  const handler = createSubmissionHandler({ type: "testimonial", schema: testimonialSchema, env: configuredEnv, fetchImpl: async () => Response.json({ id: "email_456" }) });
  const response = await handler(jsonRequest(input));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});
