/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/photo-slideshow-album',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
}

export default nextConfig
