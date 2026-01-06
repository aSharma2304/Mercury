import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output:"standalone",
    turbopack: {
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};

export default nextConfig;
