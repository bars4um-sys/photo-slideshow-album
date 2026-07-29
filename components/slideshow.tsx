'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export interface Slide {
  type: 'intro' | 'photo' | 'outro'
  title?: string
  description?: string
  image?: string
}

interface SlideshowProps {
  slides: Slide[]
}

export default function Slideshow({ slides }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({})
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrentIndex((prev) => {
        const next = prev + newDirection
        return next < 0 ? slides.length - 1 : next >= slides.length ? 0 : next
      })
    },
    [slides.length],
  )

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      paginate(1)
    }, 7000)
    return () => clearInterval(interval)
  }, [isPlaying, paginate])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [paginate])

  // Предзагрузка следующего слайда для плавного переключения
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length
    const nextSlide = slides[nextIndex]
    if (nextSlide?.type === 'photo' && nextSlide.image) {
      const img = new window.Image()
      img.src = nextSlide.image
    }
  }, [currentIndex, slides])

  // Защита от пустого массива слайдов
  if (!slides || slides.length === 0) {
    return null
  }

  const current = slides[currentIndex]

  // Дополнительная защита от некорректного индекса
  if (!current) {
    return null
  }

  // Вычисляем порядковый номер фотографии для alt-текста
  const photoNumber = slides
    .slice(0, currentIndex + 1)
    .filter((s) => s.type === 'photo').length

  // Эффект перелистывания страницы книги:
  // - Левый край закреплён у «корешка» (transformOrigin: left center)
  // - Уходящая страница переворачивается на 180°, показывая оборот
  // - Новая страница лежит под ней и открывается по мере переворота
  const variants = {
    enter: {
      rotateY: 0,
    },
    center: {
      zIndex: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      zIndex: 2,
      rotateY: dir > 0 ? -180 : 180,
    }),
  }

  // Лицевая сторона: исчезает в первой половине (0%→50%)
  const frontVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: [1, 1, 0], transition: { duration: 1.5, times: [0, 0.5, 1] } },
  }

  // Оборотная сторона (папиросная бумага): появляется после 90°, исчезает позже
  const backVariants = {
    enter: { opacity: 0 },
    center: { opacity: 0 },
    exit: { opacity: [0, 0, 1, 1, 0] },
  }

  // Адаптивное соотношение сторон контейнера
  const ratio = aspectRatios[currentIndex]
  const isPortrait = ratio !== undefined && ratio < 1.3
  const containerStyle: React.CSSProperties = isPortrait
    ? { aspectRatio: ratio, height: '75vh', width: 'auto', maxWidth: '100%' }
    : { aspectRatio: ratio ?? 16 / 9, width: '100%', maxWidth: '1280px', maxHeight: '75vh' }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements (CSS-анимации легче для GPU) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50 blob-1"
          style={{ top: '-10%', left: '-20%' }}
        />
        <div
          className="absolute w-[700px] h-[700px] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-45 blob-2"
          style={{ bottom: '-15%', right: '-15%' }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[110px] opacity-40 blob-3"
          style={{ top: '30%', right: '-10%' }}
        />
        <div
          className="absolute w-[650px] h-[650px] bg-pink-500 rounded-full mix-blend-screen filter blur-[110px] opacity-35 blob-4"
          style={{ bottom: '10%', left: '-15%' }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center overflow-hidden pt-20 pb-48">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          {/* Внешний motion.div — управляет zIndex (уходящий поверх нового) + perspective для 3D */}
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: { zIndex: 0 },
              center: { zIndex: 1 },
              exit: { zIndex: 2 },
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full flex items-center justify-center px-6 pt-20"
            style={{ perspective: '1500px' }}
          >
            {/* Внутренний контейнер — переворачивается вокруг левого края (корешка) */}
            <motion.div
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                rotateY: { type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 1.5 },
              }}
              className="relative"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                width: '100%',
                maxWidth: '1280px',
                height: '75vh',
              }}
            >
              {/* Лицевая сторона — исчезает раньше (50%→100%) */}
              <motion.div
                custom={direction}
                variants={frontVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {current.type === 'intro' && (
                  <div className="text-center max-w-2xl">
                    <motion.h1
                      className="text-6xl font-bold text-white mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      {current.title}
                    </motion.h1>
                    <motion.p
                      className="text-xl text-gray-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      {current.description}
                    </motion.p>
                  </div>
                )}

                {current.type === 'photo' && current.image && (
                  <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                    <div className="relative" style={containerStyle}>
                      {/* Card shadow and frame */}
                      <div className="relative overflow-hidden h-full w-full">
                        {imageErrors[currentIndex] ? (
                          <div className="flex items-center justify-center h-full w-full bg-white/5 text-white/40 text-lg">
                            Не удалось загрузить изображение
                          </div>
                        ) : (
                          <Image
                            src={current.image}
                            alt={`Фотография ${photoNumber}`}
                            fill
                            onLoad={(e) => {
                              const img = e.currentTarget as HTMLImageElement
                              if (img.naturalWidth && img.naturalHeight) {
                                const r = img.naturalWidth / img.naturalHeight
                                setAspectRatios((prev) => ({
                                  ...prev,
                                  [currentIndex]: r,
                                }))
                              }
                            }}
                            onError={() => {
                              setImageErrors((prev) => ({
                                ...prev,
                                [currentIndex]: true,
                              }))
                            }}
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            className="object-center"
                            style={{
                              objectFit: "contain",
                              objectPosition: 'center',
                            }}
                          />
                        )}
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                          animate={{ opacity: [0, 0.1, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {current.type === 'outro' && (
                  <div className="text-center max-w-2xl">
                    <motion.h1
                      className="text-6xl font-bold text-white mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      {current.title}
                    </motion.h1>
                    <motion.p
                      className="text-lg text-gray-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      {current.description}
                    </motion.p>
                  </div>
                )}
              </motion.div>

              {/* Оборотная сторона — появляется после 90°, исчезает позже (85%→100%) */}
              <motion.div
                custom={direction}
                variants={backVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { type: 'tween', duration: 1.5, times: [0, 0.45, 0.55, 0.85, 1] },
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotateY(180deg)' }}
              >
                {/* Контейнер по размеру слайда */}
                <div className="relative overflow-hidden" style={current.type === 'photo' ? containerStyle : { width: '100%', maxWidth: '42rem' }}>
                  {/* Зеркальное отражение контента слайда */}
                  <div className="absolute inset-0" style={{ transform: 'scaleX(-1)' }}>
                    {current.type === 'photo' && current.image && (
                      <div className="relative w-full h-full">
                        {imageErrors[currentIndex] ? (
                          <div className="flex items-center justify-center h-full w-full bg-white/5 text-white/40 text-lg">
                            Не удалось загрузить изображение
                          </div>
                        ) : (
                          <Image
                            src={current.image}
                            alt={`Фотография ${photoNumber} (оборот)`}
                            fill
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            className="object-center"
                            style={{
                              objectFit: "cover",
                              objectPosition: 'center',
                            }}
                          />
                        )}
                      </div>
                    )}
                    {current.type === 'intro' && (
                      <div className="flex items-center justify-center h-full p-8">
                        <div className="text-center max-w-2xl">
                          <h1 className="text-6xl font-bold text-white mb-6">{current.title}</h1>
                          <p className="text-xl text-gray-300">{current.description}</p>
                        </div>
                      </div>
                    )}
                    {current.type === 'outro' && (
                      <div className="flex items-center justify-center h-full p-8">
                        <div className="text-center max-w-2xl">
                          <h1 className="text-6xl font-bold text-white mb-6">{current.title}</h1>
                          <p className="text-lg text-gray-300">{current.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Полупрозрачный слой «папиросной бумаги» поверх зеркального отражения */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-sm" />
                  {/* Тень от корешка (левый край) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-4 sm:px-8 z-10 gap-2 sm:gap-0">
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
            aria-label="Предыдущий слайд"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40"
          >
            ← Предыдущая
          </button>
          <button
            onClick={() => {
              if (!isPlaying) {
                // Если была пауза, включаем и сразу переключаемся на следующий слайд
                setIsPlaying(true)
                paginate(1)
              } else {
                // Если была трансляция, просто ставим паузу
                setIsPlaying(false)
              }
            }}
            aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
            className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40"
            title={isPlaying ? 'Пауза' : 'Воспроизведение'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              aria-label={`Перейти к слайду ${index + 1}`}
              aria-current={index === currentIndex}
              className="w-3 h-3 rounded-full transition-all duration-300"
              animate={{
                backgroundColor:
                  index === currentIndex
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.3)',
                scale: index === currentIndex ? 1.3 : 1,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          aria-label="Следующий слайд"
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40"
        >
          Следующая →
        </button>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-8 right-8 z-10">
        <div className="text-white/60 text-sm font-medium">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  )
}