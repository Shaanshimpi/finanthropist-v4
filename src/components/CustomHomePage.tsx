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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

export const CustomHomePage: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false)
  useEffect(() => {
    let snapCleanup: (() => void) | undefined
    let overlayTimeout: ReturnType<typeof setTimeout> | undefined
    const timer = setTimeout(() => {

      // Add card stacking animation for features section (extracted)
      setTimeout(() => {
        initFeaturesCardsTimeline()
      }, 200)
      
      // Add background color transition to white for webinar section (extracted)
      setTimeout(() => {
        initWebinarBackgroundTimeline()
      }, 250)

      // Add GSAP animations for Instructor Bio section (extracted)
      setTimeout(() => {
        initInstructorIntroTimeline()
      }, 400)

      overlayTimeout = setTimeout(() => {
        setShowOverlay(true)
      }, 800)

      // Pin & scale FINANTHROPIST in post-instructor section
      setTimeout(() => {
        initPostInstructorPinTimeline()
      }, 900)
      
      // Enable master snap scrolling between major sections (single ScrollTrigger with snap)
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
  }, [])

  return (
    <div className="relative">
      {showOverlay && <MovingImageOverlay />}
      {/* Square pattern background for home page sections only */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" style={{ height: '100%' }}></div>

      <div className="page-bg-wrapper relative z-10">
        <HeroSection />
        <FeaturesSection />
        <WebinarSection />
        <InstructorBioSection />
        <PostInstructorSection />
        {/* <WelcomeSection /> */}
      </div>
    </div>
  )
}