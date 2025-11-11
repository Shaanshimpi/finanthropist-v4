'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import MobileHeroSection from './MobileHeroSection'
import MobileFeaturesSection from './MobileFeaturesSection'
import MobileWebinarSection from './MobileWebinarSection'
import MobileInstructorSection from './MobileInstructorSection'
import MobilePostInstructorSection from './MobilePostInstructorSection'
import MobileWelcomeSection from './MobileWelcomeSection'

export type MobileScheduleAnimation = (key: string, callback: () => void) => () => void

const animationDelays: Record<string, number> = {
  hero: 300,
  features: 200,
  webinar: 400,
  instructor: 500,
  welcome: 400,
}

export const CustomHomePageMobile: React.FC = () => {
  const timeoutsRef = useRef<Set<number>>(new Set())

  const scheduleAnimation = useCallback<MobileScheduleAnimation>((key, callback) => {
    const delay = animationDelays[key] ?? 0
    const timeoutId = window.setTimeout(() => {
      timeoutsRef.current.delete(timeoutId)
      callback()
    }, delay)
    timeoutsRef.current.add(timeoutId)

    return () => {
      if (timeoutsRef.current.has(timeoutId)) {
        window.clearTimeout(timeoutId)
        timeoutsRef.current.delete(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      root.classList.add('mobile-theme-dark')
      root.style.setProperty('--page-bg', '#080f1f')
      root.style.setProperty('--page-text', '#ffffff')
      root.style.setProperty('--page-border', 'rgba(255, 255, 255, 0.12)')
      return () => {
        root.classList.remove('mobile-theme-dark', 'mobile-theme-light')
        root.style.removeProperty('--page-bg')
        root.style.removeProperty('--page-text')
        root.style.removeProperty('--page-border')
        timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
        timeoutsRef.current.clear()
      }
    }
    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      timeoutsRef.current.clear()
    }
  }, [])

  return (
    <>
      <div className="mobile-theme-wrapper relative space-y-12 pb-16">
        <MobileHeroSection scheduleAnimation={scheduleAnimation} />
        <MobileFeaturesSection scheduleAnimation={scheduleAnimation} />
        <MobileInstructorSection scheduleAnimation={scheduleAnimation} />
        <MobileWebinarSection scheduleAnimation={scheduleAnimation} />
        {/* <MobilePostInstructorSection /> */}
        <MobileWelcomeSection scheduleAnimation={scheduleAnimation} />
      </div>
      <style jsx global>{`
        .mobile-theme-wrapper {
          min-height: 100vh;
          background-color: var(--page-bg);
          color: var(--page-text);
          transition: background-color 0.7s ease, color 0.7s ease;
        }
        .mobile-theme-dark {
          --page-bg: #080f1f;
          --page-text: #ffffff;
          --page-border: rgba(255, 255, 255, 0.12);
        }
        .mobile-theme-light {
          --page-bg: #f8fafc;
          --page-text: #0f172a;
          --page-border: rgba(15, 23, 42, 0.15);
        }
        .mobile-theme-light .text-white {
          color: #0f172a !important;
        }
        .mobile-theme-light .text-white\\/70 {
          color: rgba(15, 23, 42, 0.7) !important;
        }
        .mobile-theme-light .border-white\\/10 {
          border-color: rgba(15, 23, 42, 0.12) !important;
        }
        .mobile-theme-light .border-white\\/15 {
          border-color: rgba(15, 23, 42, 0.16) !important;
        }
        .mobile-theme-light .border-white\\/20 {
          border-color: rgba(15, 23, 42, 0.2) !important;
        }
        .mobile-theme-light .bg-white\\/5 {
          background-color: rgba(15, 23, 42, 0.05) !important;
        }
        .mobile-theme-light .bg-slate-900\\/70 {
          background-color: rgba(15, 23, 42, 0.08) !important;
        }
        .mobile-theme-light .bg-white\\/10 {
          background-color: rgba(15, 23, 42, 0.1) !important;
        }
        .mobile-theme-light .border-white\\/30 {
          border-color: rgba(15, 23, 42, 0.22) !important;
        }
        body.mobile-theme-light {
          background-color: var(--page-bg);
          color: var(--page-text);
        }
      `}</style>
    </>
  )
}

export default CustomHomePageMobile

