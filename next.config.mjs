/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vital-vault-bucket.vercel.app',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;
