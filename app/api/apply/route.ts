import { applicationSchema } from "@/lib/forms.mjs";
import { createSubmissionHandler } from "@/lib/submissions.mjs";

export const POST = createSubmissionHandler({ type: "application", schema: applicationSchema });
