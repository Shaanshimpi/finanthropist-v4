'use client'

import React from 'react'
import { useHomeContent } from '@/hooks/useHomeContent'

export const MobileTestimonialsSection: React.FC = () => {
  const { testimonials } = useHomeContent()

  const truncate = (text: string, length = 220) =>
    text.length > length ? `${text.slice(0, length)}…` : text

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

        <div className="space-y-4">
          {testimonials.map((testimonial) => (
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
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-[11px] text-white/50">Google Review</p>
                    </div>
                    <span className="text-[11px] text-[#FCC22F]">⭐ {testimonial.rating}/5</span>
                  </div>
                  <p className="text-xs leading-relaxed whitespace-pre-line">
                    {truncate(testimonial.review)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MobileTestimonialsSection

