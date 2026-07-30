/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/photo-slideshow-album',
  images: {
    unoptimized: true,
  },
}

export default nextConfig