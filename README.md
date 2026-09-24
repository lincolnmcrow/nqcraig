# NQCraig Mentorship

The official application website for NQCraig's lifetime hybrid NQ day-trading mentorship. The experience explains the program, Craig's story, the Discord-first community, confidentiality expectations, risk disclosures, and provides multi-step application and testimonial forms.

The site is fully static (Next.js static export) with no API routes, serverless functions, or API keys. Form submissions are handled by [Netlify Forms](https://docs.netlify.com/manage/forms/setup/).

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Netlify Forms only exists on the deployed site, so in local development the forms skip sending and go straight to the thank-you page.

```bash
npm test          # form, content, and Netlify form-registration tests
npm run lint
npm run typecheck
npm run build     # writes the static site to out/
```

## Deploy to Netlify

1. In Netlify, choose **Add new project → Import an existing project** and connect this GitHub repository.
2. The settings come from `netlify.toml` (build command `npm run build`, publish directory `out`), so no changes are needed. Deploy.
3. Go to **Project configuration → Forms** and enable form detection if it's off, then redeploy. The `application` and `testimonial` forms appear after the next deploy.
4. Under **Forms → Form notifications**, add an **Email notification** for each form so submissions are emailed to Craig's private inbox.

Netlify's free plan includes 100 form submissions per month. Spam is filtered by Netlify plus the hidden `company` honeypot field.

## Before launch

- Replace the placeholder TikTok and Discord links in `lib/site-content.mjs` (`social.tiktok`, `social.discord`).
- Have the Terms, Privacy, Risk Disclosure, and Testimonial Terms pages reviewed by qualified counsel.

## How it fits together

- `components/application-form.tsx`, `components/testimonial-form.tsx`: multi-step forms. Step order lives in `lib/forms.mjs`.
- `lib/submit-form.ts`: posts answers to Netlify Forms, then the form redirects to `/thank-you/` or `/thank-you/story/`.
- `public/__forms.html`: hidden copy of both forms that Netlify reads at deploy time. If you add or rename a form field, update this file too (a test checks it).
- `app/not-found.tsx`: exported as `404.html`, which Netlify serves for any unknown URL.

Futures trading involves substantial risk; the mentorship does not promise profits or guarantee results.
