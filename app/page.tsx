import Slideshow, { type Slide } from '@/components/slideshow'
import { readFileSync } from 'fs'
import path from 'path'

export const metadata = {
  title: 'Марракеш — фотоальбом',
  description: 'Фотоальбом путешествия в Марракеш',
}

// ============================================================================
// КАК ДОБАВИТЬ ИЛИ ИЗМЕНИТЬ ФОТОГРАФИИ
// ============================================================================
//
// ТЕПЕРЬ АВТОМАТИЧЕСКИ! Просто положите фотографии в папку:
//   public/photos/
//
// Фотографии будут автоматически найдены и добавлены в слайд-шоу.
// Поддерживаемые форматы: .webp, .jpg, .jpeg, .png, .gif, .avif
// Файлы сортируются по имени (p01.webp, p02.webp, p03.webp...)
//
// Для лучшего результата используйте осмысленные имена файлов:
//   p01.webp, p02.webp, p03.webp — будут показаны в этом порядке
//
// ============================================================================

// Статичные intro и outro слайды (можно редактировать текст)
const introSlide: Slide = {
  type: 'intro',
  title: 'Марракеш',
  description: 'На днях я вернулась из замечательного путешествия в Марракеш. Это удивительное место, где время течёт иначе — среди лабиринтов старой медины, ароматов специй на рынке Джемаа-эль-Фна и бескрайних песков пустыни Агафай. Каждый уголок здесь дышит историей, а закаты окрашивают небо в такие оттенки, что кажется, будто попал в сказку.\n\nПриглашаю вас в это путешествие.',
}

const outroSlide: Slide = {
  type: 'outro',
  title: 'Спасибо за внимание',
  description: 'Надеемся, вам понравилось путешествие. Используйте стрелки на клавиатуре или кнопки для навигации. Каждый момент уникален!',
}

// Фотографии загружаются из сгенерированного photos.json
// (генерируется скриптом scripts/generate-photos-json.js перед сборкой)
async function getPhotoSlides(): Promise<Slide[]> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'photos.json')
    const data = JSON.parse(readFileSync(jsonPath, 'utf-8'))
    return (data.photos as string[]).map((photo) => ({
      type: 'photo' as const,
      image: photo,
    }))
  } catch {
    return []
  }
}

export default async function Page() {
  const photoSlides = await getPhotoSlides()
  const slides: Slide[] = [introSlide, ...photoSlides, outroSlide]

  return <Slideshow slides={slides} />
}