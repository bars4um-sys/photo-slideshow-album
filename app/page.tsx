import Slideshow from '@/components/slideshow'

export const metadata = {
  title: 'Элегантное слайд-шоу',
  description: 'Красивое слайд-шоу с эффектом перелистывания страниц',
}

// ============================================================================
// КАК ДОБАВИТЬ СВОИ ФОТОГРАФИИ
// ============================================================================
//
// СПОСОБ 1: Использовать URL фотографий из интернета (самый простой!)
//   Просто замените 'image' на URL вашей фотографии:
//   image: 'https://example.com/photo.jpg'
//
// СПОСОБ 2: Загрузить фотографии в проект
//   1. Создайте папку: public/photos/
//   2. Положите туда файлы: photo1.jpg, photo2.jpg и т.д.
//   3. Используйте пути: image: '/photos/photo1.jpg'
//
// СПОСОБ 3: Облачное хранилище
//   Подключите Vercel Blob в Settings → Integrations
//   Загрузьте фото и используйте полученный URL
//
// ============================================================================

const slides = [
  {
    type: 'intro' as const,
    title: 'Добро пожаловать',
    description: 'Наш сборник замечательных моментов приглашает вас в путешествие через время и память. Каждая фотография рассказывает свою уникальную историю.',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p01.webp',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p02.webp',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p03.webp',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p04.webp',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p05.webp',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p06.webp',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p07.webp',
  },
  
  {
    type: 'photo' as const,
    image: '/photos/p08.webp',
  },
  
  {
    type: 'outro' as const,
    title: 'Спасибо за внимание',
    description: 'Надеемся, вам понравилось путешествие. Используйте стрелки на клавиатуре или кнопки для навигации. Каждый момент уникален!',
  },
]

export default function Page() {
  return <Slideshow slides={slides} />
}
