'use client'

import React, { useEffect, useRef } from 'react'
import { useHomeContent } from '@/hooks/useHomeContent'

const renderStars = (count: number) =>
  Array.from({ length: 5 }).map((_, idx) => (
    <svg
      key={idx}
      className={`h-4 w-4 ${idx < count ? 'text-[#FCC22F]' : 'text-white/15'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useHomeContent()
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const cards = Array.from(slider.children) as HTMLElement[]
    if (cards.length === 0) return

    let currentIndex = 0
    const scrollToCard = (index: number) => {
      const target = cards[index]
      if (!target) return
      slider.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
    }

    scrollToCard(0)

    const interval = window.setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length
      scrollToCard(currentIndex)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [testimonials.length])

  const truncate = (text: string, length = 260) =>
    text.length > length ? `${text.slice(0, length)}…` : text

  return (
    <section
      className="testimonials-section relative overflow-hidden bg-slate-950 pt-[4rem]"
      style={{ minHeight: 'calc(100vh - 4rem)', height: 'calc(100vh)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="mx-auto h-72 w-72 rounded-full bg-[#C71C22]/10 blur-3xl"></div>
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col gap-8 px-6 pb-6 pt-12 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
            10,000+ Success Stories
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Rated 5.0★ on Google by our{' '}
            <span className="bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent">
              learners
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/60 sm:text-base">
            Honest reviews from traders who completed our live sessions and mentorship.
          </p>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-950 via-slate-950 to-transparent pointer-events-none hidden lg:block"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-950 via-slate-950 to-transparent pointer-events-none hidden lg:block"></div>
          <div
            ref={sliderRef}
            className="flex h-full snap-x snap-mandatory gap-6 overflow-x-auto pb-24 "
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="group relative flex h-full min-w-[260px] max-w-[320px] flex-shrink-0 flex-col gap-3 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 text-white shadow-[0_12px_36px_rgba(8,15,31,0.3)] snap-start transition hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(199,28,34,0.22)]"
              >
                <div className="text-xl flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-base text-white/50">Google Review</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#FCC22F] text-base">
                    <span className=" font-semibold">{testimonial.rating.toFixed(1)}</span>
                    <span>★</span>
                  </div>
                </div>

                <p className="flex-1 whitespace-pre-line text-base leading-relaxed text-white/70">
                  {truncate(testimonial.review, 200)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-white/40">Swipe or scroll sideways to read more stories.</p>
      </div>
    </section>
  )
}

export default TestimonialsSection

