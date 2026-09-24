import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify serves the exported `out/` folder as plain static files.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
