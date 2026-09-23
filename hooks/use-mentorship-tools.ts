"use client";

import { useEffect, useState } from "react";
import { createToolDefinitions } from "@/lib/webmcp-tools.mjs";

type Status = { ok: boolean; message: string } | null;

export function useMentorshipTools() {
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const submit = async (endpoint: string, input: unknown) => {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
      const payload = await response.json() as { ok: boolean; message: string };
      setStatus(payload);
      if (!payload.ok) throw new Error(payload.message);
      return payload;
    };
    for (const tool of createToolDefinitions(submit)) {
      try {
        void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined);
      } catch {
        // Visible forms remain the supported fallback when registration is unavailable.
      }
    }
    return () => lifecycle.abort();
  }, []);

  return status;
}
