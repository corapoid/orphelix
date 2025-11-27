import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  transpilePackages: ['@orphelix/ui'],
  output: 'standalone',
}

export default nextConfig
