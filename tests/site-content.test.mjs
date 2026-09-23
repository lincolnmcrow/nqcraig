import test from "node:test";
import assert from "node:assert/strict";
import { siteContent } from "../lib/site-content.mjs";

test("the offer is lifetime, hybrid, NQ-focused, and Discord-first", () => {
  const copy = JSON.stringify(siteContent).toLowerCase();
  for (const phrase of ["lifetime", "nq", "discord", "direct mentorship", "group"]) {
    assert.match(copy, new RegExp(phrase));
  }
});

test("Craig's supplied founder story is present without a student outcome promise", () => {
  const story = JSON.stringify(siteContent.founderStory).toLowerCase();
  for (const phrase of ["high school", "nqkole", "approximately 30", "tiktok", "travel"]) {
    assert.match(story, new RegExp(phrase));
  }
  assert.doesNotMatch(story, /you will|guaranteed|same results/);
});

test("copy avoids unsupported outcome promises", () => {
  const copy = JSON.stringify(siteContent).toLowerCase();
  for (const phrase of ["guaranteed profit", "win rate", "get rich", "risk-free"]) {
    assert.equal(copy.includes(phrase), false);
  }
});

test("confidentiality copy includes the group-platform boundary", () => {
  assert.match(siteContent.confidentiality.body, /cannot guarantee/i);
  assert.match(siteContent.confidentiality.body, /third-party|Discord/i);
});
