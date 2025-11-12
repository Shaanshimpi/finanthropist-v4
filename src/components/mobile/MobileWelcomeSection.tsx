'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { initMobileWelcome } from '../animations/mobile'
import type { MobileScheduleAnimation } from './CustomHomePageMobile'
import { homeContent } from '../../content/homeContent'

type MobileWelcomeSectionProps = {
  scheduleAnimation?: MobileScheduleAnimation
  onCall?: () => void
}

export const MobileWelcomeSection: React.FC<MobileWelcomeSectionProps> = ({ scheduleAnimation, onCall }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { welcome } = homeContent

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
            {welcome.badge}
          </span>
          <h2 className="text-2xl font-black text-white">{welcome.title}</h2>
          <p className="text-sm text-white/70">
            {welcome.description}
          </p>
        </div>
        <div ref={ctasRef} className="flex flex-col gap-3">
          {welcome.ctas.map((cta, index) => {
            const baseClasses = `rounded-xl px-5 py-3 text-center text-sm font-bold ${index === 0 ? 'bg-[#FCC22F] text-[#7A0F12]' : 'border border-white/30 text-white'}`
            if (cta.type === 'call' && onCall) {
              return (
                <button key={cta.label} type="button" className={baseClasses} onClick={onCall}>
                  {cta.label}
                </button>
              )
            }
            return (
              <Link key={cta.href} href={cta.href} className={baseClasses}>
                {cta.label}
              </Link>
            )
          })}
        </div>
        <div ref={cardsRef} className="grid gap-3">
          {welcome.highlights.map((item) => (
            <div key={item.title} className="welcome-card rounded-2xl border border-white/15 bg-slate-900/70 p-4">
              <p className="text-base font-extrabold text-white">{item.title}</p>
              <p className="text-sm text-white/70 mt-2">
                {item.desc}
                {'details' in item && Array.isArray(item.details) && (
                  <span className="mt-2 block space-y-1 text-[13px]">
                    {item.details.map((phone) => (
                      <span key={phone} className="block font-semibold text-white/90">
                        {phone}
                      </span>
                    ))}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MobileWelcomeSection

