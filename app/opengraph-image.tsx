import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Share-preview card for TikTok, Instagram, Discord, and iMessage links. Rendered once at build time.
export const dynamic = "force-static";
export const alt = "nqcraig — Master the NQ. Build a repeatable process.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (weight: number) => readFile(join(process.cwd(), `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`));

export default async function OpengraphImage() {
  const [black, semibold] = await Promise.all([font(900), font(600)]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#041126", color: "#f7faff", fontFamily: "Inter", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(80,126,197,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(80,126,197,0.13) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div style={{ position: "absolute", right: -180, top: -120, width: 620, height: 620, display: "flex", borderRadius: 9999, background: "radial-gradient(circle, rgba(7,92,255,0.45), rgba(7,92,255,0) 70%)" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 900, letterSpacing: "-0.04em" }}>nq<span style={{ color: "#2a6bff" }}>craig</span></div>
          <div style={{ display: "flex", padding: "12px 24px", borderRadius: 9999, border: "2px solid rgba(7,92,255,0.5)", background: "rgba(7,92,255,0.14)", color: "#b9cdff", fontSize: 24, fontWeight: 600 }}>Lifetime mentorship · Built around Discord</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.065em" }}>
          <span>Master the NQ.</span>
          <span style={{ color: "#2a6bff", marginTop: 14 }}>Build a repeatable process.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 26, fontWeight: 600, color: "#9fb2d2" }}>
          <span>Direct mentorship</span><span style={{ color: "#28446d" }}>/</span>
          <span>Group learning</span><span style={{ color: "#28446d" }}>/</span>
          <span>Apply now</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: black, weight: 900, style: "normal" }, { name: "Inter", data: semibold, weight: 600, style: "normal" }] },
  );
}
