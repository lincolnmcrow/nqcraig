import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nqcraig | NQ Mentorship",
  description:
    "Lifetime hybrid NQ mentorship with direct guidance, group learning, and a Discord-first trading community.",
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
