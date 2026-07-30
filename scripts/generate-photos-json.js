const fs = require('fs')
const path = require('path')

const PHOTOS_DIR = path.join(__dirname, '..', 'public', 'photos')
const VALID_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif']

try {
  const files = fs.readdirSync(PHOTOS_DIR)
  const photos = files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return VALID_EXTENSIONS.includes(ext)
    })
    .sort()
    .map((file) => `photos/${file}`)

  const output = JSON.stringify({ photos }, null, 2)
  const outputPath = path.join(__dirname, '..', 'public', 'photos.json')
  fs.writeFileSync(outputPath, output, 'utf-8')
  console.log(`✅ Сгенерирован photos.json: ${photos.length} фотографий`)
} catch (err) {
  console.error('❌ Ошибка генерации photos.json:', err.message)
  process.exit(1)
}