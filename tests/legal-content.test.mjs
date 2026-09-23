import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const route = (name) => readFile(new URL(`../app/${name}/page.tsx`, import.meta.url), "utf8").then((value) => value.toLowerCase());

test("risk disclosure balances the mentorship message", async () => {
  const copy = await route("risk-disclosure");
  for (const phrase of ["substantial risk of loss", "not suitable for everyone", "past results"]) assert.match(copy, new RegExp(phrase));
});

test("privacy explains collection, delivery, Discord contact, and retention limits", async () => {
  const copy = await route("privacy");
  for (const phrase of ["application", "testimonial", "email delivery provider", "discord", "retain", "contact details"]) assert.match(copy, new RegExp(phrase));
});

test("testimonial terms require truth and permission without automatic publication", async () => {
  const copy = await route("testimonial-terms");
  for (const phrase of ["honest experience", "permission", "never published automatically", "not indicative of future performance"]) assert.match(copy, new RegExp(phrase));
});

test("terms define the educational service without inventing business details", async () => {
  const copy = await route("terms");
  for (const phrase of ["education only", "personalized financial advice", "brokerage", "manage your account", "lifetime access", "qualified counsel"]) assert.match(copy, new RegExp(phrase));
});
