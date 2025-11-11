'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initMobileHeroParallax, initMobileHeroReviews } from '../animations/mobile'
import type { MobileScheduleAnimation } from './CustomHomePageMobile'

const heroFeatures = {
  badge: "Maharashtra's #1 Institute",
  headlinePrimary: 'Learn Share Market',
  headlineAccent: 'From Zero to Hero',
  headlineSecondary: 'Master Trading',
  rating: '5.0',
  reviews: '2,486+ Verified Reviews'
}

type MobileHeroSectionProps = {
  scheduleAnimation?: MobileScheduleAnimation
}

export const MobileHeroSection: React.FC<MobileHeroSectionProps> = ({ scheduleAnimation }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 1024) return

    const section = sectionRef.current
    const heroImage = heroImageRef.current

    if (!section || !heroImage) return

    const cleanups: Array<() => void> = []
    const markers = false

    const setupAnimations = () => {
      cleanups.push(
        initMobileHeroParallax(section, heroImage, {
          markers,
        })
      )

      const reviews = reviewsRef.current
      const stars = starsRef.current

      if (reviews && stars) {
        cleanups.push(
          initMobileHeroReviews(reviews, stars, {
            markers,
          })
        )
      }
    }

    let cancelScheduled: (() => void) | undefined
    if (scheduleAnimation) {
      cancelScheduled = scheduleAnimation('hero', setupAnimations)
    } else {
      setupAnimations()
    }

    return () => {
      cancelScheduled?.()
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [scheduleAnimation])

  return (
    <section className="px-6">
      <div ref={sectionRef} className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl">
          <Image
            src="/static-media/no1.png"
            alt="No. 1 Customer Satisfaction Badge"
            width={250}
            height={250}
            className="h-24 w-24 object-contain"
          />
        </div>

        <div className="space-y-3 w-full">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-white">
            {heroFeatures.badge}
          </span>
          <h1 className="space-y-2">
            <span className="block text-3xl font-black">{heroFeatures.headlinePrimary}</span>
            <span className="block text-3xl font-black text-[#FCC22F]">{heroFeatures.headlineAccent}</span>
            <span className="block text-xl font-extrabold text-slate-300">{heroFeatures.headlineSecondary}</span>
          </h1>
        </div>

        <div ref={heroImageRef} className="w-full flex justify-center">
          <Image
            src="/static-media/sameer-fist.png"
            alt="Professional Instructor - Sammer"
            width={500}
            height={600}
            className="w-full max-w-xs"
            priority
          />
        </div>

        <div ref={reviewsRef} className=" overflow-hidden w-full rounded-2xl border border-white/15 bg-white/5 p-4 text-left space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-white">Finanthropist</p>
          </div>
          <div ref={starsRef} className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{heroFeatures.rating}</span>
            <div className="flex gap-0.5 text-[#FCC22F]">
              {[...Array(5)].map((_, index) => (
                <svg key={index} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{heroFeatures.reviews}</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Link href="/courses" className="rounded-xl bg-[#C71C22] px-5 py-3 text-center text-sm font-bold text-white">
            Explore Courses
          </Link>
          <Link href="/demo" className="rounded-xl border border-white/30 px-5 py-3 text-center text-sm font-bold text-white">
            Free Demo
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MobileHeroSection

