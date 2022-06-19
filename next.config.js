/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  experimental: {
    images: {
        layoutRaw: true
    }
  },
  nextConfig,
  productionBrowserSourceMaps: true,
};
