/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'vital-vault-bucket.vercel.app',
  //       pathname: '/**',
  //     },
  //   ],
  // },
  output: 'standalone', // Enable static export
  trailingSlash: true, // Ensure proper file structure
  images: {
    unoptimized: true, // Avoid Next.js image optimization issues
  },
}

export default nextConfig;
