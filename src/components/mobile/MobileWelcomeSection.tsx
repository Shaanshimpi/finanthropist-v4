'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { initMobileWelcome } from '../animations/mobile'
import type { MobileScheduleAnimation } from './CustomHomePageMobile'

const welcomeHighlights = [
  { title: 'Most Friendly Support Team', desc: 'Real humans who care, guiding you step by step.' },
  { title: 'Lifetime Help', desc: 'For Financial Decisions & Trading throughout your journey.' },
  { title: 'Family Education', desc: 'Empowering your entire family with financial wisdom.' },
  { title: 'Call Now', desc: 'Speak to our experts and get started the right way.' }
]

type MobileWelcomeSectionProps = {
  scheduleAnimation?: MobileScheduleAnimation
}

export const MobileWelcomeSection: React.FC<MobileWelcomeSectionProps> = ({ scheduleAnimation }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 1024) return

    const sectionEl = sectionRef.current
    const headingEl = headingRef.current
    const ctasEl = ctasRef.current
    const cards = cardsRef.current?.querySelectorAll('.welcome-card')

    if (!sectionEl || !headingEl || !ctasEl || !cards || cards.length === 0) return

    let cleanup: (() => void) | undefined
    const runAnimation = () => {
      cleanup = initMobileWelcome(
        sectionEl,
        {
          heading: headingEl,
          ctas: ctasEl,
          cards,
        },
        {
          markers: process.env.NODE_ENV !== 'production',
        }
      )
    }

    let cancelScheduled: (() => void) | undefined
    if (scheduleAnimation) {
      cancelScheduled = scheduleAnimation('welcome', runAnimation)
    } else {
      runAnimation()
    }

    return () => {
      cancelScheduled?.()
      cleanup?.()
    }
  }, [scheduleAnimation])

  return (
    <section className="px-6">
      <div ref={sectionRef} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div ref={headingRef} className="space-y-3 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-white">
            Welcome
          </span>
          <h2 className="text-2xl font-black text-white">We Welcome You to</h2>
          <p className="text-sm text-white/70">
            Learn and grow with Maharashtra&apos;s trusted team. Discover how we guide families to long-term success in finance and trading.
          </p>
        </div>
        <div ref={ctasRef} className="flex flex-col gap-3">
          <Link href="/about" className="rounded-xl bg-[#FCC22F] px-5 py-3 text-center text-sm font-bold text-[#7A0F12]">
            Know More About Us
          </Link>
          <Link href="/contact" className="rounded-xl border border-white/30 px-5 py-3 text-center text-sm font-bold text-white">
            Call Now
          </Link>
        </div>
        <div ref={cardsRef} className="grid gap-3">
          {welcomeHighlights.map((item) => (
            <div key={item.title} className="welcome-card rounded-2xl border border-white/15 bg-slate-900/70 p-4">
              <p className="text-base font-extrabold text-white">{item.title}</p>
              <p className="text-sm text-white/70 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MobileWelcomeSection

