import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuild: true,
  },
  experimental: {
    optimizePackageImports: ["@tailwindcss/postcss"],
    reactCompiler: true,
  },
};

export default nextConfig;
