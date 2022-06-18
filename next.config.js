/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  nextConfig,
  productionBrowserSourceMaps: true,
};
