'use client'

import React, { useEffect, useRef } from 'react'
import { initFeaturesCardsTimeline } from '../animations'
import type { MobileScheduleAnimation } from './CustomHomePageMobile'
import { useHomeContent } from '@/hooks/useHomeContent'

type MobileFeaturesSectionProps = {
  scheduleAnimation?: MobileScheduleAnimation
}

export const MobileFeaturesSection: React.FC<MobileFeaturesSectionProps> = ({ scheduleAnimation }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const { features } = useHomeContent()

  const featureCount = features.items.length

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 1024) return

    const sectionEl = sectionRef.current
    const cards = cardsContainerRef.current?.querySelectorAll('.feature-item')

    if (!sectionEl || !cards || cards.length === 0) return

    let animationCleanup: (() => void) | undefined

    const runAnimation = () => {
      animationCleanup = initFeaturesCardsTimeline({
        delay: 0,
        featuresSection: sectionEl,
        featureItems: cards,
      })
    }

    let cancelScheduled: (() => void) | undefined
    if (scheduleAnimation) {
      cancelScheduled = scheduleAnimation('features', runAnimation)
    } else {
      runAnimation()
    }

    return () => {
      cancelScheduled?.()
      animationCleanup?.()
    }
  }, [scheduleAnimation, featureCount])

  return (
    <section
      ref={sectionRef}
      className="features-section relative px-6"
      style={{ minHeight: '100vh', paddingTop: '3rem', marginBottom: '40vh' }}
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 pb-8 h-full flex flex-col">
        <div className="space-y-3 text-center mb-6">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-white/80">
            {features.badge}
          </span>
          <h2 className="text-2xl font-black text-white">
            <span className="block">{features.titlePrimary}</span>
            <span className="block text-[#FCC22F]">{features.titleAccent}</span>
          </h2>
        </div>

        <div
          ref={cardsContainerRef}
          className="relative flex-1"
          style={{ height: 'calc((100vh - 3rem) * 0.55)' }}
        >
          {features.items.map((feature, index) => (
            <div
              key={feature}
              className="feature-item flex flex-col justify-between rounded-3xl border border-white/15 bg-slate-900/80"
              style={{
                position: 'absolute',
                inset: 0,
                padding: '1.5rem',
                gap: '1.5rem',
              }}
            >
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-2xl bg-[#C71C22] text-4xl font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col justify-center">
                  <p className="text-3xl text-white/80 leading-relaxed text-center">
                    {feature}
                  </p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C71C22] via-[#FCC22F] to-[#C71C22] transition-all duration-500"
                  style={{ width: `${((index + 1) / features.items.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MobileFeaturesSection

