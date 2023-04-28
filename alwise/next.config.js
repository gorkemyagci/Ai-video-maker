/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // Önbellek ayarlarını devre dışı bırak
    config.cache = false;

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['create-images-results.d-id.com','assets-global.website-files.com','media.licdn.com'],
  },
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig