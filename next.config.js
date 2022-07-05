/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  experimental: {
    images: {
        layoutRaw: true,
    }
  },
  images:{
    domains: ['res.cloudinary.com']
  },
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    CLOUD_NAME: process.env.CLOUD_NAME,
    SERVER_PATH: process.env.SERVER_PATH,
  },
  nextConfig,
  productionBrowserSourceMaps: true,
};
