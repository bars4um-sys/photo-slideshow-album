# Примеры использования слайд-шоу

## 📖 Различные сценарии использования

### 1. Портфолио фотографа

```typescript
import Slideshow from '@/components/slideshow'

const slides = [
  {
    type: 'intro' as const,
    title: 'Портфолио',
    description: 'Добро пожаловать в мой мир фотографии. Здесь вы найдете мои лучшие работы.',
  },
  {
    type: 'photo' as const,
    image: '/portfolio/portrait.jpg',
  },
  {
    type: 'photo' as const,
    image: '/portfolio/landscape.jpg',
  },
  {
    type: 'photo' as const,
    image: '/portfolio/wildlife.jpg',
  },
  {
    type: 'outro' as const,
    title: 'Спасибо за просмотр',
    description: 'Свяжитесь со мной: hello@photographer.com',
  },
]

export default function Page() {
  return <Slideshow slides={slides} />
}
```

### 2. Прессентация проекта

```typescript
const slides = [
  {
    type: 'intro' as const,
    title: 'Новый веб-проект',
    description: 'Представляем инновационное решение для вашего бизнеса',
  },
  {
    type: 'photo' as const,
    image: 'https://via.placeholder.com/1200x800?text=Проблема',
  },
  {
    type: 'photo' as const,
    image: 'https://via.placeholder.com/1200x800?text=Решение',
  },
  {
    type: 'photo' as const,
    image: 'https://via.placeholder.com/1200x800?text=Результаты',
  },
  {
    type: 'outro' as const,
    title: 'Начните сегодня',
    description: 'Свяжитесь с нашей командой для консультации',
  },
]
```

### 3. Свадебное слайд-шоу

```typescript
const slides = [
  {
    type: 'intro' as const,
    title: 'Наша история',
    description: 'Путешествие любви в фотографиях',
  },
  {
    type: 'photo' as const,
    image: '/wedding/first-meeting.jpg',
  },
  {
    type: 'photo' as const,
    image: '/wedding/proposal.jpg',
  },
  {
    type: 'photo' as const,
    image: '/wedding/ceremony.jpg',
  },
  {
    type: 'photo' as const,
    image: '/wedding/reception.jpg',
  },
  {
    type: 'outro' as const,
    title: 'С любовью',
    description: 'Спасибо за участие в нашем особом дне',
  },
]
```

### 4. Туристический путеводитель

```typescript
const slides = [
  {
    type: 'intro' as const,
    title: 'Путешествие в Японию',
    description: 'Откройте для себя древние традиции и современность',
  },
  {
    type: 'photo' as const,
    image: '/japan/tokyo-tower.jpg',
  },
  {
    type: 'photo' as const,
    image: '/japan/temple.jpg',
  },
  {
    type: 'photo' as const,
    image: '/japan/cherry-blossom.jpg',
  },
  {
    type: 'photo' as const,
    image: '/japan/fuji-mountain.jpg',
  },
  {
    type: 'outro' as const,
    title: 'Планируйте свой визит',
    description: 'Книжный рейс, отели и туры на booking.com',
  },
]
```

### 5. Корпоративная презентация

```typescript
const slides = [
  {
    type: 'intro' as const,
    title: 'Квартальный отчет Q4',
    description: 'Успешный год благодарности вашей команде',
  },
  {
    type: 'photo' as const,
    image: '/company/team-photo.jpg',
  },
  {
    type: 'photo' as const,
    image: '/company/office-space.jpg',
  },
  {
    type: 'photo' as const,
    image: '/company/event.jpg',
  },
  {
    type: 'photo' as const,
    image: '/company/milestone.jpg',
  },
  {
    type: 'outro' as const,
    title: 'На встречу новым вызовам',
    description: 'Спасибо за ваш вклад. Лучшее впереди!',
  },
]
```

### 6. Разработка приложения (Процесс)

```typescript
const slides = [
  {
    type: 'intro' as const,
    title: 'Разработка мобильного приложения',
    description: 'От идеи к реализации: процесс создания',
  },
  {
    type: 'photo' as const,
    image: '/app/wireframe.jpg',
  },
  {
    type: 'photo' as const,
    image: '/app/design.jpg',
  },
  {
    type: 'photo' as const,
    image: '/app/development.jpg',
  },
  {
    type: 'photo' as const,
    image: '/app/testing.jpg',
  },
  {
    type: 'photo' as const,
    image: '/app/launch.jpg',
  },
  {
    type: 'outro' as const,
    title: 'Приложение готово!',
    description: 'Скачивайте на App Store и Google Play',
  },
]
```

### 7. Портфолио дизайнера

```typescript
const slides = [
  {
    type: 'intro' as const,
    title: 'UI/UX Дизайн',
    description: 'Красивые интерфейсы, которые вдохновляют',
  },
  {
    type: 'photo' as const,
    image: '/design/project-1.jpg',
  },
  {
    type: 'photo' as const,
    image: '/design/project-2.jpg',
  },
  {
    type: 'photo' as const,
    image: '/design/project-3.jpg',
  },
  {
    type: 'photo' as const,
    image: '/design/project-4.jpg',
  },
  {
    type: 'outro' as const,
    title: 'Давайте вместе создавать',
    description: 'Свяжитесь: designer@portfolio.com',
  },
]
```

## 🎯 Советы для каждого типа

### Для фотографий
- Используйте изображения высокого качества (минимум 1200x800px)
- Убедитесь, что изображения одинакового размера
- Оптимизируйте размер файла для быстрой загрузки

### Для текстовых слайдов
- Держите заголовки короткими (до 50 символов)
- Описания должны быть информативными (100-200 символов)
- Используйте понятный и читаемый текст

### Для навигации
- Добавьте минимум 3-5 фотографий для интереса
- Максимум 10-15 слайдов для комфортного просмотра
- Начните и закончите интро/аутро слайдами

## 🚀 Развертывание

### На Vercel

1. Подключите ваш GitHub репозиторий
2. Нажмите "Deploy"
3. Настройте переменные окружения (если нужны)
4. Получите готовый URL

### Локально

```bash
# Установка зависимостей
pnpm install

# Запуск dev сервера
pnpm dev

# Открыть в браузере
# http://localhost:3000
```

## 💻 Кастомизация стилей

Отредактируйте `components/slideshow.tsx` для изменения:

- Цветовой схемы
- Размеров и шрифтов
- Временных характеристик анимации
- Эффектов переходов

Используйте Tailwind CSS классы для быстрого стилирования!

---

Для дополнительной информации, см. `SLIDESHOW.md`
