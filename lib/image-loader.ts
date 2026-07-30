const basePath = '/photo-slideshow-album'

export default function imageLoader({ src }: { src: string }) {
  return `${basePath}${src}`
}