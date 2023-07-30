/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true 
  }, 
  images: {
    domains: ['xsgames.co'],
  },
}

module.exports = nextConfig
