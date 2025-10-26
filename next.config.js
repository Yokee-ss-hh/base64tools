/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  // Force www or non-www redirect
  async redirects() {
    return [
      // Redirect www to non-www (recommended for consistency)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.base64tools.org',
          },
        ],
        destination: 'https://base64tools.org/:path*',
        permanent: true, // 301 redirect
      },
    ]
  },
  
  // Add headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig