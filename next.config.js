/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    emotion: true,
  },
};

module.exports = {
  images: {
    domains: ['hinacreates.com'],
  },
  nextConfig,
};
