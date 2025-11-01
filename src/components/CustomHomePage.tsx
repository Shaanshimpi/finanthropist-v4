'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { InstructorBioSection } from './InstructorBioSection'
import { WebinarSection } from './WebinarSection'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initFeaturesCardsTimeline, initWebinarBackgroundTimeline, initInstructorIntroTimeline, initMovingImageTransitions, initSnapScroll, initPostInstructorPinTimeline, initMasterSnapScroll } from './animations'
import { PostInstructorSection } from './PostInstructorSection'
import { WelcomeSection } from './WelcomeSection'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

export const CustomHomePage: React.FC = () => {
  const movingImageRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState('/static-media/sameer-fist.png')

  useEffect(() => {
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

      // Moving image animation (extracted)
      let movingCleanup: (() => void) | undefined
      let snapCleanup: (() => void) | undefined
      setTimeout(() => {
        const movingImage = movingImageRef.current
        if (!movingImage) return
        movingCleanup = initMovingImageTransitions(movingImage, setCurrentImage, { markers: false })
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


      
      
      // Cleanup
      return () => {
        if (typeof movingCleanup === 'function') movingCleanup()
        if (typeof snapCleanup === 'function') snapCleanup()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {/* Square pattern background for home page sections only */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" style={{ height: '100%' }}></div>
      
      {/* Moving image - absolutely positioned relative to page */}
      <div 
        ref={movingImageRef}
        style={{ 
          position: 'absolute',
          zIndex: 40,
          pointerEvents: 'none',
          willChange: 'transform, width, height',
          opacity: 0,
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={currentImage}
            alt="Moving Instructor Image"
            width={500}
            height={600}
            className="w-full h-full object-contain object-bottom"
            priority
          />
        </div>
      </div>
      
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