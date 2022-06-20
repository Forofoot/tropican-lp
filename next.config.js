/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  experimental: {
    images: {
        layoutRaw: true
    }
  },
  nextConfig,
  productionBrowserSourceMaps: true,
};
