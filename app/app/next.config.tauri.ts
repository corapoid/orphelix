import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ['@orphelix/ui'],
  images: {
    unoptimized: true,
  },
  // Disable features that don't work with static export
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
