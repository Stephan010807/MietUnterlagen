/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  // Ensure no trailing slashes that could cause redirects
  trailingSlash: false,
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: false,
};

module.exports = nextConfig;