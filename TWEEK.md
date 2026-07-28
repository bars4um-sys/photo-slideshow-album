# Шпаргалка по параметрам слайд-шоу

Все ключевые параметры, которые можно менять в `components/slideshow.tsx`

## 1. Расстояние фотографии от номера и кнопок

**Файл:** `components/slideshow.tsx`  
**Строка ~127:** 
```typescript
<div className="relative w-full h-full flex items-center justify-center overflow-hidden pt-20 pb-48">
```

- `pt-20` = отступ сверху (от номера слайда). Возможные значения: `pt-8`, `pt-12`, `pt-16`, `pt-20`, `pt-24`, `pt-32`
- `pb-48` = отступ снизу (от кнопок). Возможные значения: `pb-20`, `pb-24`, `pb-32`, `pb-40`, `pb-48`, `pb-56`, `pb-64`, `pb-80`, `pb-96`

**Пример:** Если хочешь фото ближе к кнопкам, меняй `pb-48` на `pb-32`

---

## 2. Позиция текста (intro/outro экраны)

**Файл:** `components/slideshow.tsx`  
**Строка ~141:**
```typescript
className="absolute w-full h-full flex items-start justify-center px-6 pt-20"
```

- `pt-20` = отступ текста сверху. Возможные значения: `pt-8`, `pt-12`, `pt-16`, `pt-20`, `pt-24`, `pt-32`
- `items-start` = выравнивание (вверх). Если нужно в центр - меняй на `items-center`

**Строка ~148:**
```typescript
<div className="text-center max-w-2xl -mt-80">
```

- `-mt-80` = смещение текста вверх. Возможные значения: `-mt-20`, `-mt-40`, `-mt-60`, `-mt-80`, или просто `mt-0` если не нужно смещение

---

## 3. Размер и соотношение фото

**Файл:** `components/slideshow.tsx`  
**Строка ~169:**
```typescript
<div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
```

- `p-4 md:p-8` = паддинг (отступы по сторонам). Можешь менять на `p-2`, `p-6`, `p-10` и т.д.

**Строка ~173:**
```typescript
style={{ aspectRatio: '16 / 9', ... }}
```

- `16 / 9` = соотношение сторон контейнера. Можешь менять на `4 / 3`, `1 / 1`, `16 / 10` и т.д.

---

## 4. Скорость автоматического переключения

**Файл:** `components/slideshow.tsx`  
**Строка ~30:**
```typescript
setInterval(() => {
  paginate(1)
}, 7000)
```

- `7000` = время в миллисекундах между переключениями. 
- 5000 = 5 секунд
- 7000 = 7 секунд
- 10000 = 10 секунд

---

## 5. Фон (цвета и движение)

**Файл:** `components/slideshow.tsx`  
**Строки ~72-105** - четыре блока `<motion.div>` с цветами фона:

```typescript
className="absolute w-[800px] h-[800px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50"
```

- `bg-purple-600` = цвет (можешь менять на `bg-blue-500`, `bg-pink-600`, `bg-cyan-400` и т.д.)
- `opacity-50` = прозрачность (0-100). Чем меньше - тем прозрачнее
- `blur-[120px]` = размытие. Чем больше число - тем сильнее размытие
- `w-[800px] h-[800px]` = размер элемента
- `duration: 12` = скорость анимации (в секундах)

---

## 6. Фото - как она отображается

**Файл:** `components/slideshow.tsx`  
**Строка ~182-200:**

```typescript
style={{
  objectFit: aspectRatios[currentIndex] !== undefined
    ? aspectRatios[currentIndex] > 1.3
      ? 'cover'
      : 'contain'
    : 'cover',
  objectPosition: 'center',
}}
```

- `'cover'` = альбомные фото заполняют весь контейнер (может быть обрезка)
- `'contain'` = портретные фото вмещаются целиком
- `1.3` = порог соотношения сторон (меняй если хочешь другой порог для автоматического выбора)

---

## 7. Кнопки навигации

**Файл:** `components/slideshow.tsx`  
**Строка ~244:**
```typescript
<div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-4 sm:px-8 z-10 gap-2 sm:gap-0">
```

- `bottom-8` = высота кнопок от низа (8 = 32px). Можешь менять на `bottom-4`, `bottom-12`, `bottom-16`
- `px-4 sm:px-8` = горизонтальные отступы

---

## Как менять:

1. Открой `components/slideshow.tsx` в VS Code
2. Найди нужную строку по номеру
3. Замени значение
4. Сохрани (`Ctrl+S`)
5. Коммитишь и пушишь:
   ```bash
   git add components/slideshow.tsx
   git commit -m "Изменил параметры слайд-шоу"
   git push
   ```

Всё! Изменения будут на GitHub и на продакшене.
