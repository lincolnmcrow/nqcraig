import type { Metadata } from "next";
import "./globals.css";

const title = "nqcraig | NQ Mentorship";
const description =
  "Lifetime hybrid NQ mentorship with direct guidance, group learning, and a Discord-first trading community.";

export const metadata: Metadata = {
  // Netlify sets URL to the site's primary address at build time; share previews need absolute URLs.
  metadataBase: new URL(process.env.URL ?? "http://localhost:5173"),
  title,
  description,
  openGraph: { title, description, siteName: "nqcraig", type: "website", url: "/" },
  twitter: { card: "summary_large_image", title, description },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
