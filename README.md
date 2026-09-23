# NQCraig Mentorship

The official application website for NQCraig's lifetime hybrid NQ day-trading mentorship. The experience explains the program, Craig's story, the Discord-first community, confidentiality expectations, risk disclosures, and provides application and testimonial forms.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Form delivery

Applications and testimonials are validated privately on the server and delivered through Resend. Configure these environment variables before accepting live submissions:

```text
RESEND_API_KEY=
NQCRAIG_SUBMISSIONS_TO=
NQCRAIG_FROM_EMAIL=
```

If they are not configured, the forms fail safely and tell the visitor that submissions are temporarily unavailable. No applicant data is written to browser storage or committed to this repository.

## Production

```bash
npm run build
npm run start
```

The site includes Terms, Privacy, Risk Disclosure, and Testimonial Terms pages. Futures trading involves substantial risk; the mentorship does not promise profits or guarantee results.
