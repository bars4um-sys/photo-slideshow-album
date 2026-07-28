'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SlideshowProps {
  slides: Array<{
    type: 'intro' | 'photo' | 'outro'
    title?: string
    description?: string
    image?: string
  }>
}

export default function Slideshow({ slides }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({})

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      const next = prev + newDirection
      return next < 0 ? slides.length - 1 : next >= slides.length ? 0 : next
    })
  }

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      paginate(1)
    }, 7000)
    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const current = slides[currentIndex]

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: dir > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: dir < 0 ? 45 : -45,
    }),
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50"
          animate={{
            x: [0, 300, -150, 0],
            y: [0, -300, 150, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '-10%', left: '-20%' }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-45"
          animate={{
            x: [0, -300, 150, 0],
            y: [0, 300, -150, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '-15%', right: '-15%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[110px] opacity-40"
          animate={{
            x: [0, 200, -300, 0],
            y: [0, -200, 300, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '30%', right: '-10%' }}
        />
        <motion.div
          className="absolute w-[650px] h-[650px] bg-pink-500 rounded-full mix-blend-screen filter blur-[110px] opacity-35"
          animate={{
            x: [0, 150, -250, 0],
            y: [0, -150, 250, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '10%', left: '-15%' }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center overflow-hidden pt-20 pb-48">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 250, damping: 35, duration: 0.8 },
              opacity: { duration: 1 },
              rotateY: { type: 'spring', stiffness: 250, damping: 35, duration: 0.8 },
            }}
            className="absolute w-full h-full flex items-center justify-center px-6 pt-20"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {current.type === 'intro' && (
              <div className="text-center max-w-2xl -mt-80">
                <motion.h1
                  className="text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {current.title}
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {current.description}
                </motion.p>
              </div>
            )}

            {current.type === 'photo' && current.image && (
              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                <motion.div
                  className="relative max-w-3xl w-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Card shadow and frame */}
                  <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16 / 9' }}>
                    <motion.img
                      key={currentIndex}
                      src={current.image}
                      alt="Slide"
                      onLoad={(e) => {
                        const img = e.currentTarget
                        const ratio = img.naturalWidth / img.naturalHeight
                        setAspectRatios((prev) => ({
                          ...prev,
                          [currentIndex]: ratio,
                        }))
                      }}
                      className="w-full h-full"
                      style={{
                        // Адаптивный object-fit в зависимости от соотношения сторон
                        objectFit:
                          aspectRatios[currentIndex] !== undefined
                            ? aspectRatios[currentIndex] > 1.3
                              ? 'cover' // Альбомные фото (широкие) - заполнить, может быть обрезка
                              : 'contain' // Портретные/квадратные - вмещаются целиком
                            : 'cover', // По умолчанию cover пока загружается
                        objectPosition: 'center',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
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
                </motion.div>
              </div>
            )}

            {current.type === 'outro' && (
              <div className="text-center max-w-2xl -mt-80">
                <motion.h1
                  className="text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {current.title}
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {current.description}
                </motion.p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-4 sm:px-8 z-10 gap-2 sm:gap-0">
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
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
              className="w-3 h-3 rounded-full transition-all duration-300"
              animate={{
                backgroundColor:
                  index === currentIndex
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.3)',
                scale: index === currentIndex ? 1.3 : 1,
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
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
