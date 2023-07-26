/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true 
  }, 
  images: {
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig
