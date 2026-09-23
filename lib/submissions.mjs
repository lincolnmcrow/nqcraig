const messages = {
  application: "Application received. nqcraig will review it and may contact you through Discord or email.",
  testimonial: "Testimonial received. Craig will review and verify it before anything is published.",
};

export function createSubmissionHandler({ type, schema, fetchImpl = fetch, env = process.env }) {
  return async function handleSubmission(request) {
    let raw;
    try {
      raw = await request.json();
    } catch {
      return json({ ok: false, message: "The form data could not be read. Please check your answers and try again." }, 400);
    }

    if (typeof raw === "object" && raw !== null && typeof raw.company === "string" && raw.company.length > 0) {
      return json({ ok: true, message: messages[type] }, 200);
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return json({ ok: false, message: "Please check the highlighted fields and try again." }, 400);
    }
    const input = parsed.data;

    if (Date.now() - input.startedAt < 2500) {
      return json({ ok: false, message: "Please take a moment to review your answers before submitting." }, 400);
    }

    if (!env.RESEND_API_KEY || !env.NQCRAIG_SUBMISSIONS_TO || !env.NQCRAIG_FROM_EMAIL) {
      return json({ ok: false, message: "Applications are temporarily unavailable. Please try again later." }, 503);
    }

    const subject = type === "application"
      ? `New mentorship application — ${input.fullName}`
      : `New testimonial submission — ${input.displayName}`;

    let providerResponse;
    try {
      providerResponse = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `${type}/${input.submissionId}`,
        },
        body: JSON.stringify({
          from: env.NQCRAIG_FROM_EMAIL,
          to: [env.NQCRAIG_SUBMISSIONS_TO],
          reply_to: input.email ?? undefined,
          subject,
          html: renderSubmissionEmail(type, input),
        }),
      });
    } catch {
      return json({ ok: false, message: "We could not deliver this right now. Your answers are still here—please try again." }, 502);
    }

    if (!providerResponse.ok) {
      return json({ ok: false, message: "We could not deliver this right now. Your answers are still here—please try again." }, 502);
    }

    return json({ ok: true, message: messages[type] }, 200);
  };
}

export function renderSubmissionEmail(type, input) {
  const omitted = new Set(["submissionId", "startedAt", "company"]);
  const rows = Object.entries(input)
    .filter(([key]) => !omitted.has(key))
    .map(([key, value]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #dbe4f0">${escapeHtml(labelFor(key))}</th><td style="padding:8px;border-bottom:1px solid #dbe4f0">${escapeHtml(formatValue(value))}</td></tr>`)
    .join("");
  return `<main style="font-family:Arial,sans-serif;color:#041126"><h1>${type === "application" ? "New mentorship application" : "New testimonial submission"}</h1><table style="border-collapse:collapse;width:100%">${rows}</table></main>`;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function formatValue(value) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value ?? "";
}

function labelFor(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function json(body, status) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
