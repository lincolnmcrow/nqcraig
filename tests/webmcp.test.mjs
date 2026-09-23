import test from "node:test";
import assert from "node:assert/strict";
import { createToolDefinitions } from "../lib/webmcp-tools.mjs";

const application = {
  fullName: "Jordan Lee", email: "jordan@example.com", discordUsername: "jordan.trades", experience: "Learning the basics",
  goals: "Build a repeatable review process.", challenges: "Inconsistent execution.", reason: "I want structured feedback and accountability.",
  acceptedRisk: true, acceptedPrivacy: true,
};

test("registers exactly two uniquely named write tools", () => {
  const tools = createToolDefinitions(async () => ({ ok: true, message: "received" }));
  assert.equal(tools.length, 2);
  assert.equal(new Set(tools.map((tool) => tool.name)).size, 2);
  for (const tool of tools) assert.deepEqual(tool.annotations, { readOnlyHint: false, untrustedContentHint: false });
});

test("valid application uses the application endpoint", async () => {
  const calls = [];
  const tools = createToolDefinitions(async (endpoint, input) => { calls.push({ endpoint, input }); return { ok: true, message: "received" }; });
  const result = await tools.find((tool) => tool.name === "submit_mentorship_application").execute(application);
  assert.equal(result.ok, true);
  assert.equal(calls[0].endpoint, "/api/apply");
  assert.match(calls[0].input.submissionId, /^[0-9a-f-]{36}$/);
});

test("invalid application fails without a network call", async () => {
  let calls = 0;
  const tools = createToolDefinitions(async () => { calls += 1; return { ok: true }; });
  await assert.rejects(() => tools.find((tool) => tool.name === "submit_mentorship_application").execute({ ...application, discordUsername: "" }), /Discord username/i);
  assert.equal(calls, 0);
});
