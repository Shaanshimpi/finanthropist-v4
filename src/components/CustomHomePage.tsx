'use client'
import React, { useEffect, useState } from 'react'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { InstructorBioSection } from './InstructorBioSection'
import { WebinarSection } from './WebinarSection'
import { TestimonialsSection } from './TestimonialsSection'
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
    let loaderCompleteHandler: (() => void) | undefined

    // Function to initialize snap scroll
    const initializeSnapScroll = () => {
      if (snapCleanup) return // Already initialized
      
      snapCleanup = initMasterSnapScroll({
        sections: [
          '.hero-section',
          '.features-section',
          '.webinar-section',
          '.instructor-bio-section',
          '.testimonials-section',
          '.post-instructor-section',
        ],
        duration: 1,
        ease: 'power2.out',
        delay: 0,
        markers: false,
        heroOffset: 64,
      })
    }

    // Check if loader is running by checking if body has fixed position (set by loader)
    // Do this check immediately, not inside setTimeout
    const bodyPosition = document.body.style.position
    const isLoaderRunning = bodyPosition === 'fixed'
    
    // Initialize snap scroll - either after loader completes or immediately if loader isn't running
    const initSnapScrollWithLoaderCheck = () => {
      let snapInitialized = false
      
      // Handler for when loader completes
      loaderCompleteHandler = () => {
        if (snapInitialized) return
        snapInitialized = true
        // Wait a bit after loader completes to ensure styles are restored and DOM is ready
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            initializeSnapScroll()
          })
        })
      }
      window.addEventListener('pageLoaderComplete', loaderCompleteHandler)
      
      if (!isLoaderRunning) {
        // Loader is not running (navigation from other pages), initialize snap scroll immediately
        // Wait a bit for DOM to be ready and other animations to initialize
        setTimeout(() => {
          if (!snapInitialized) {
            snapInitialized = true
            initializeSnapScroll()
          }
        }, 200)
      }
      // If loader is running, we'll wait for the 'pageLoaderComplete' event
      // Fallback timeout in case event doesn't fire (shouldn't happen, but safety net)
      setTimeout(() => {
        if (!snapInitialized) {
          snapInitialized = true
          initializeSnapScroll()
        }
      }, 5000) // 5 seconds fallback (loader should complete in ~3-4 seconds max)
    }

    const timer = setTimeout(() => {
      setTimeout(() => {
        initFeaturesCardsTimeline()
      }, 100)
      
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
        initWebinarBackgroundTimeline()
      }, 1000)

      // Initialize snap scroll - either after loader completes or immediately if loader isn't running
      initSnapScrollWithLoaderCheck()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (typeof snapCleanup === 'function') snapCleanup()
      if (overlayTimeout) clearTimeout(overlayTimeout)
      if (loaderCompleteHandler) {
        window.removeEventListener('pageLoaderComplete', loaderCompleteHandler)
      }
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
            <TestimonialsSection />
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