import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  applicationSchema, applicationSteps, encodeNetlifySubmission, internalFields, testimonialSchema, testimonialSteps,
} from "../lib/forms.mjs";

const staticForms = await readFile(new URL("../public/__forms.html", import.meta.url), "utf8");
const submittedFields = (schema) => Object.keys(schema.shape).filter((key) => !internalFields.includes(key) && key !== "company");

for (const [name, schema, steps] of [["application", applicationSchema, applicationSteps], ["testimonial", testimonialSchema, testimonialSteps]]) {
  test(`${name} steps cover every field exactly once`, () => {
    const stepFields = steps.flatMap((step) => step.fields);
    assert.deepEqual([...stepFields].sort(), submittedFields(schema).sort());
  });

  test(`__forms.html registers the ${name} form with every submitted field`, () => {
    const form = staticForms.match(new RegExp(`<form name="${name}"[\\s\\S]*?</form>`))?.[0];
    assert.ok(form, `missing <form name="${name}">`);
    assert.match(form, /data-netlify="true"/);
    assert.match(form, /netlify-honeypot="company"/);
    for (const field of ["form-name", "company", ...submittedFields(schema)]) assert.match(form, new RegExp(`name="${field}"`));
  });
}

test("Netlify encoding sets form-name, formats booleans, and drops internal fields", () => {
  const body = new URLSearchParams(encodeNetlifySubmission("testimonial", {
    submissionId: "abc", startedAt: 1, company: "", displayName: "Sam", allowName: true, allowEditing: false,
  }));
  assert.equal(body.get("form-name"), "testimonial");
  assert.equal(body.get("displayName"), "Sam");
  assert.equal(body.get("allowName"), "Yes");
  assert.equal(body.get("allowEditing"), "No");
  assert.equal(body.has("submissionId"), false);
  assert.equal(body.has("startedAt"), false);
});
