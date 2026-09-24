# Netlify static site, multi-step forms, thank-you and 404 pages

Date: 2026-09-23
Status: Implemented

## Goal

Host the nqcraig mentorship site on Netlify as a fully static site with no API routes, no serverless functions, and no API keys. Replace the single-page forms with multi-step forms, send visitors to a thank-you page after submitting, add a branded 404 page, a mobile navigation menu, and TikTok/Discord links.

## Decisions

| Topic | Decision |
| --- | --- |
| Hosting | Netlify, static files only |
| Build | Real Next.js 16 (`next` already installed) with `output: "export"` → `out/` |
| Form backend | Netlify Forms (built into Netlify; notifications configured in the Netlify dashboard) |
| Spam | Existing `company` honeypot wired to `netlify-honeypot`; client-side "too fast" check kept |
| Dev server | `next dev -p 5173` so `localhost:5173` keeps working |
| Social links | Placeholder URLs in `lib/site-content.mjs`, flagged in README |
| WebMCP agent tools | Removed (they depended on the deleted API routes) |

## Platform changes

**Add**
- `netlify.toml`: `command = "npm run build"`, `publish = "out"`, `NODE_VERSION = "22"`.
- `public/__forms.html`: hidden static HTML declaring the `application` and `testimonial` forms with every field name, `data-netlify="true"`, and `netlify-honeypot="company"`, so Netlify's deploy step registers both forms.

**Change**
- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`.
- `package.json` scripts: `dev` → `next dev -p 5173`, `build` → `next build`, `test` → `node --test tests/`; remove `start`, `install:ci`, `db:generate`.
- `app/privacy/page.tsx` "Private delivery" section: describe Netlify Forms storage and email notification instead of a server endpoint and email provider.
- `README.md`: Netlify deploy steps, enabling form email notifications, replacing the social placeholders.

**Remove**
- `app/api/`, `lib/submissions.mjs`, `app/chatgpt-auth.ts`
- `components/webmcp-provider.tsx`, `hooks/use-mentorship-tools.ts`, `lib/webmcp-tools.mjs`, `global.d.ts` (contains only WebMCP typings)
- `db/`, `drizzle/`, `drizzle.config.ts`, `examples/`, `cloudflare-env.d.ts`
- `vite.config.ts`, `build/`, `.openai/`, and the whole `scripts/` folder (all Codex/Cloudflare tooling)
- Dependencies: `vinext`, `vite`, `@vitejs/*`, `@cloudflare/*`, `wrangler`, `drizzle-orm`, `drizzle-kit`, `react-server-dom-webpack`
- Tests: `tests/submissions.test.mjs`, `tests/webmcp.test.mjs`

## Multi-step forms

Shared behaviour:
- One `react-hook-form` instance per form with the existing zod schema; all steps stay mounted in state so Back never loses answers.
- "Continue" validates only the current step's fields (`trigger(stepFields)`); the final step validates everything.
- Progress header: "Step N of M · Title" with a progress bar.
- On step change, focus moves to the new step's heading.
- Step definitions (title + field names) live in `lib/forms.mjs` so tests can check them against the schemas.

**Application (4 steps)**
1. Contact: `fullName`, `email`, `discordUsername`
2. Experience: `experience`, `challenges`
3. Goals: `goals`, `reason`
4. Review & submit: read-only summary of steps 1–3 with "Edit" buttons that jump to that step, then `acceptedRisk`, `acceptedPrivacy`

**Testimonial (3 steps)**
1. About you: `displayName`, `contact`, `role`
2. Your story: `testimonial`
3. Permissions & submit: story preview, then `honestExperience`, `allowTestimonial`, `allowName`, `allowEditing`

## Submission flow

1. Final submit runs full schema validation.
2. Values are encoded as `application/x-www-form-urlencoded` with `form-name` set, booleans as `Yes`/`No`, and `submissionId`/`startedAt` omitted.
3. POST to `/__forms.html`.
4. Success → `window.location.assign("/thank-you/")` (application) or `"/thank-you/story/"` (testimonial).
5. Network error or non-2xx → inline destructive alert, answers kept, button re-enabled.
6. In development (`process.env.NODE_ENV === "development"`), skip the POST and redirect directly, since Netlify Forms only exists on Netlify.

## New pages

- `app/thank-you/page.tsx`: "Application received", next steps (Craig reviews; may contact via Discord or email; watch for a Discord friend request), risk reminder, link home. `robots: { index: false }`.
- `app/thank-you/story/page.tsx`: thanks; nothing publishes until Craig verifies it; link home. `robots: { index: false }`.
- `app/not-found.tsx`: exported as `out/404.html`, which Netlify serves automatically. Shows a large 404 and "This page isn't on the chart" with links to Home, Apply (`/#apply`), and FAQ (`/#faq`).
- The thank-you and 404 pages use the site header and footer. The footer moves out of `app/page.tsx` into `components/site-footer.tsx` so every page shares it.

## Mobile menu and social links

- `components/site-header.tsx`: below `md`, a menu button opens the existing shadcn `Sheet` with Program, Craig's story, FAQ, Share your story, Apply, and social links. Tapping a link closes the sheet. Escape and focus trapping come from `Sheet`.
- Header anchor links become `/#program` style so they work from the thank-you and 404 pages.
- `lib/site-content.mjs` gains `social: { tiktok, discord }` with placeholder URLs. Inline SVG icons (lucide has no brand icons) in the footer and mobile menu, with accessible labels.

## Testing

- Keep `tests/forms.test.mjs`, `tests/site-content.test.mjs`, `tests/legal-content.test.mjs`, `tests/form-accessibility.test.mjs` (updated as needed).
- New: every step field exists in its schema and every schema field (except `submissionId`, `startedAt`, `company`) appears in exactly one step.
- New: `public/__forms.html` declares both forms and every submitted field name, plus `form-name` and the honeypot.
- New: the urlencoded encoder formats booleans and omits internal fields.
- Verify: `npm run build` produces `out/index.html`, `out/404.html`, `out/thank-you/index.html`, `out/thank-you/story/index.html`, `out/__forms.html`.
- Browser check: both forms step through, block on invalid steps, keep answers on Back, reach the thank-you pages; 404 renders for a bad path; mobile menu works at 375px.

## Out of scope

Analytics, share-preview images, sitemap/robots, security headers, displaying published testimonials, saving form progress to browser storage.
