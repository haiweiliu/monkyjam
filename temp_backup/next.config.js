/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['api-inference.huggingface.co'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/monkyjam' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/monkyjam/' : '',
  // Handle cross-origin requests to Hugging Face
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
      },
    ];
  },
  // Environment variables that will be available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    NEXT_PUBLIC_HF_API_TOKEN: process.env.NEXT_PUBLIC_HF_API_TOKEN || '',
  },
};

module.exports = nextConfig; 