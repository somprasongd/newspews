/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

if (process.env.BASE_URL) {
  nextConfig.assetPrefix = process.env.BASE_URL + '/';
  nextConfig.basePath = process.env.BASE_URL;
}

module.exports = nextConfig;
