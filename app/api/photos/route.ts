import { readdir } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'

const PHOTOS_DIR = join(process.cwd(), 'public', 'photos')
const VALID_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif']

export async function GET() {
  try {
    const files = await readdir(PHOTOS_DIR)
    const photos = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf('.'))
        return VALID_EXTENSIONS.includes(ext)
      })
      .sort()
      .map((file) => `/photos/${file}`)

    return NextResponse.json({ photos })
  } catch {
    return NextResponse.json({ photos: [] })
  }
}