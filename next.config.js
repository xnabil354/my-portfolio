// https://nextjs.org/docs/api-reference/next.config.js/introduction
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  generateBuildId: async () => {
    return 'xzhndvs';
  },
  poweredByHeader: false,
  swcMinify: true,
};

module.exports = nextConfig;
