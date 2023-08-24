/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // npm run devserverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
};

module.exports = nextConfig;
