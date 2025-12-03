'use client'

import React, { useMemo, useState } from 'react'
import { useHomeContent } from '@/hooks/useHomeContent'

export const MobileTestimonialsSection: React.FC = () => {
  const { testimonials } = useHomeContent()

  const truncate = (text: string, length = 180) =>
    text.length > length ? `${text.slice(0, length)}…` : text

  // Group testimonials into slides of 2 (2 rows per slide)
  const slides = useMemo(() => {
    const groups: typeof testimonials[] = []
    for (let i = 0; i < testimonials.length; i += 2) {
      groups.push(testimonials.slice(i, i + 2))
    }
    return groups
  }, [testimonials])

  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index: number) => {
    if (index < 0 || index >= slides.length) return
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="px-6">
      <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-2 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-white/80">
            Google Reviews
          </span>
          <h2 className="text-2xl font-black text-white">Why Learners Trust Us</h2>
          <p className="text-xs text-white/60">
            Genuine feedback from traders who completed our mentorship.
          </p>
        </div>

        {/* 2-row slider carousel (2 testimonials per slide) */}
        <div className="relative mt-4">
          {/* Slider viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 space-y-4">
                  {slide.map((testimonial) => (
                    <div
                      key={testimonial.name}
                      className="rounded-2xl border border-white/15 bg-slate-900/60 p-4 text-white/80"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                          {testimonial.name
                            .split(' ')
                            .map((part) => part[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white truncate">{testimonial.name}</p>
                              <p className="text-[11px] text-white/50">Google Review</p>
                            </div>
                            <span className="text-[11px] text-[#FCC22F] flex-shrink-0">⭐ {testimonial.rating}/5</span>
                          </div>
                          <p className="text-xs leading-relaxed whitespace-pre-line line-clamp-4">
                            {truncate(testimonial.review)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevSlide}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 text-xs active:scale-95"
            >
              ‹
            </button>
            <div className="flex items-center gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'w-4 bg-[#FCC22F]' : 'w-2 bg-white/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextSlide}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 text-xs active:scale-95"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileTestimonialsSection

