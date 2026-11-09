import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@tailwindcss/postcss"],
  },
};

export default nextConfig;
