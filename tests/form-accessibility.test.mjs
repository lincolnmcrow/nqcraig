import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const applicationForm = await readFile(new URL("../components/application-form.tsx", import.meta.url), "utf8");
const testimonialForm = await readFile(new URL("../components/testimonial-form.tsx", import.meta.url), "utf8");

test("controlled application fields expose refs, blur, and described errors", () => {
  assert.match(applicationForm, /ref=\{field\.ref\}/);
  assert.match(applicationForm, /onBlur=\{field\.onBlur\}/);
  assert.match(applicationForm, /aria-describedby=\{error \? errorId : undefined\}/);
});

test("controlled testimonial fields expose refs, blur, and described errors", () => {
  assert.match(testimonialForm, /ref=\{field\.ref\}/);
  assert.match(testimonialForm, /onBlur=\{field\.onBlur\}/);
  assert.match(testimonialForm, /aria-describedby=\{error \? errorId : undefined\}/);
});
