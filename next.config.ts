import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.run.linkworld.ai'],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
