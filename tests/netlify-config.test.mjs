import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const toml = await readFile(new URL("../netlify.toml", import.meta.url), "utf8");

test("Netlify publishes the static export", () => {
  assert.match(toml, /publish = "out"/);
  assert.match(toml, /command = "npm run build"/);
});

test("every page gets security headers that block framing", () => {
  assert.match(toml, /for = "\/\*"/);
  assert.match(toml, /Content-Security-Policy = ".*frame-ancestors 'none'/);
  assert.match(toml, /X-Frame-Options = "DENY"/);
  assert.match(toml, /X-Content-Type-Options = "nosniff"/);
});

test("the extensionless share-preview image is served as a PNG", () => {
  assert.match(toml, /for = "\/opengraph-image"\s+\[headers\.values\]\s+Content-Type = "image\/png"/);
});
