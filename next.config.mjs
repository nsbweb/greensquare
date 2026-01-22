/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: "", // keep empty if served at domain root
  assetPrefix: "", // same as above
  images: {
    unoptimized: true,
  },
};

export default nextConfig;