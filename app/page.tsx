import Slideshow, { type Slide } from '@/components/slideshow'

export const metadata = {
  title: 'Элегантное слайд-шоу',
  description: 'Красивое слайд-шоу с эффектом перелистывания страниц',
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
  title: 'Добро пожаловать',
  description: 'Наш сборник замечательных моментов приглашает вас в путешествие через время и память. Каждая фотография рассказывает свою уникальную историю.',
}

const outroSlide: Slide = {
  type: 'outro',
  title: 'Спасибо за внимание',
  description: 'Надеемся, вам понравилось путешествие. Используйте стрелки на клавиатуре или кнопки для навигации. Каждый момент уникален!',
}

// Фотографии загружаются автоматически из public/photos/
// через API-маршрут /api/photos при загрузке страницы
async function getPhotoSlides(): Promise<Slide[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/photos`, {
      cache: 'no-store',
    })
    const data = await res.json()
    return (data.photos as string[]).map((photo) => ({
      type: 'photo' as const,
      image: photo,
    }))
  } catch {
    // Fallback на статичный список, если API недоступен
    return [
      { type: 'photo', image: '/photos/p01.webp' },
      { type: 'photo', image: '/photos/p02.webp' },
      { type: 'photo', image: '/photos/p03.webp' },
      { type: 'photo', image: '/photos/p04.webp' },
      { type: 'photo', image: '/photos/p05.webp' },
      { type: 'photo', image: '/photos/p06.webp' },
      { type: 'photo', image: '/photos/p07.webp' },
      { type: 'photo', image: '/photos/p08.webp' },
    ]
  }
}

export default async function Page() {
  const photoSlides = await getPhotoSlides()
  const slides: Slide[] = [introSlide, ...photoSlides, outroSlide]

  return <Slideshow slides={slides} />
}