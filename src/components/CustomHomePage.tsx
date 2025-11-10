'use client'
import React, { useEffect, useState } from 'react'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { InstructorBioSection } from './InstructorBioSection'
import { WebinarSection } from './WebinarSection'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initFeaturesCardsTimeline, initWebinarBackgroundTimeline, initInstructorIntroTimeline, initPostInstructorPinTimeline, initMasterSnapScroll } from './animations'
import { PostInstructorSection } from './PostInstructorSection'
import { MovingImageOverlay } from './MovingImageOverlay'
import { CustomHomePageMobile } from './mobile/CustomHomePageMobile'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

export const CustomHomePage: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      setShowOverlay(false)
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
      return
    }

    let snapCleanup: (() => void) | undefined
    let overlayTimeout: ReturnType<typeof setTimeout> | undefined
    const timer = setTimeout(() => {
      setTimeout(() => {
        initFeaturesCardsTimeline()
      }, 200)

      setTimeout(() => {
        initWebinarBackgroundTimeline()
      }, 250)

      setTimeout(() => {
        initInstructorIntroTimeline()
      }, 400)

      overlayTimeout = setTimeout(() => {
        setShowOverlay(true)
      }, 800)

      setTimeout(() => {
        initPostInstructorPinTimeline()
      }, 900)

      setTimeout(() => {
        snapCleanup = initMasterSnapScroll({
          sections: [
            '.hero-section',
            '.features-section',
            '.webinar-section',
            '.instructor-bio-section',
            '.post-instructor-section',
          ],
          duration: 1,
          ease: 'power2.out',
          delay: 0,
          markers: false,
          heroOffset: 64,
        })
      }, 950)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (typeof snapCleanup === 'function') snapCleanup()
      if (overlayTimeout) clearTimeout(overlayTimeout)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isDesktop])

  return (
    <div className="relative">
      {isDesktop && showOverlay && <MovingImageOverlay />}
      {isDesktop ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" style={{ height: '100%' }}></div>
          <div className="page-bg-wrapper relative z-10 hidden lg:block">
            <HeroSection />
            <FeaturesSection />
            <WebinarSection />
            <InstructorBioSection />
            <PostInstructorSection />
          </div>
        </>
      ) : (
        <div className="lg:hidden">
          <CustomHomePageMobile />
        </div>
      )}
    </div>
  )
}

export default CustomHomePage