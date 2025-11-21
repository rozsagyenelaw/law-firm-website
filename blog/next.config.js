/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/blog',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
