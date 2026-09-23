declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    RESEND_API_KEY?: string;
    NQCRAIG_SUBMISSIONS_TO?: string;
    NQCRAIG_FROM_EMAIL?: string;
  }
}
