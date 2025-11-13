'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { initMobileWebinarCards } from '../animations/mobile'
import type { MobileScheduleAnimation } from './CustomHomePageMobile'
import { useHomeContent } from '@/hooks/useHomeContent'

type MobileWebinarSectionProps = {
  scheduleAnimation?: MobileScheduleAnimation
  onActivated?: () => void
}

export const MobileWebinarSection: React.FC<MobileWebinarSectionProps> = ({
  scheduleAnimation,
  onActivated,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { webinar } = useHomeContent()
  const webinarFeatureCount = webinar.features.length

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 1024) return

    const section = sectionRef.current
    const cards = cardsRef.current?.querySelectorAll('.webinar-feature-card')

    if (!section || !cards || cards.length === 0) return

    let animationCleanup: (() => void) | undefined

    const runAnimation = () => {
      animationCleanup = initMobileWebinarCards(section, cards, {
        onActivate: () => onActivated?.(),
      })
    }

    let cancelScheduled: (() => void) | undefined
    if (scheduleAnimation) {
      cancelScheduled = scheduleAnimation('webinar', runAnimation)
    } else {
      runAnimation()
    }

    return () => {
      cancelScheduled?.()
      animationCleanup?.()
    }
  }, [scheduleAnimation, onActivated, webinarFeatureCount])

  return (
    <section className="px-6">
      <div ref={sectionRef} className="space-y-6 rounded-3xl border border-white/10 bg-white/10 p-6 max-h-[200px]">
        <div className="space-y-2 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-white/80">
            {webinar.badge}
          </span>
          <h2 className="text-2xl font-black text-white">
            <span className="block">{webinar.titlePrimary}</span>
            <span className="block text-[#FCC22F]">{webinar.titleAccent}</span>
          </h2>
        </div>
        <div ref={cardsRef} className="grid gap-3">
          {webinar.features.map((feature) => (
            <div key={feature} className="webinar-feature-card flex items-start gap-3 rounded-2xl border border-white/15 bg-slate-900/60 p-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-[#FCC22F]" />
              <p className="text-sm font-medium text-white">{feature}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {webinar.ctas.map((cta, index) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={`rounded-xl px-5 py-3 text-center text-sm font-bold ${
                index === 0
                  ? 'bg-[#C71C22] text-white'
                  : 'border border-white/30 text-white'
              }`}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MobileWebinarSection
