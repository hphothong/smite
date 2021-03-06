/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['webcdn.hirezstudios.com'],
  },
  basePath: process.env.BASE_PATH ?? "",
  assetPrefix: process.env.ASSET_PREFIX ?? "",
}
