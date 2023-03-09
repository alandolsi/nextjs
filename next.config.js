/** @type {import('next').NextConfig} */




const nextConfig = {
  reactStrictMode: true,
  env: {
    IMAGE_TAG: process.env.IMAGE_TAG,
  },
};

module.exports = nextConfig
