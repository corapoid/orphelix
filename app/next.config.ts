import type { NextConfig } from 'next'
import packageJson from './package.json'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  transpilePackages: ['@/lib/ui'],
  output: 'standalone',
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
  // Exclude test files from node_modules
  serverExternalPackages: ['pino', 'pino-pretty'],
  // Set turbopack root to current directory (app/)
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
