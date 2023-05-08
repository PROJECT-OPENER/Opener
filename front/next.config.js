/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opener-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/static/**',
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'http://k8c104.p.ssafy.io:8000/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
