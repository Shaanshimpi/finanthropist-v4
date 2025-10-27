'use client'
import React, { useRef, useEffect } from 'react'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { WebinarSection } from './WebinarSection'
import { ControllableSammerImage, SammerImageRef } from './ControllableSammerImage'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

export const CustomHomePage: React.FC = () => {
  const sammerRef = useRef<SammerImageRef>(null)

  useEffect(() => {
    // Wait for component to mount
    const timer = setTimeout(() => {
      // TEMPORARILY DISABLED - Moving image logic
      /*
      if (sammerRef.current) {
        // MANUAL POSITIONING - You can change these values
        
        // Calculate exact positions where static Sammer images appear in each section
        
        // Hero Section Position (right side, bottom-aligned)
        const heroPosition = () => {
          const containerWidth = Math.min(window.innerWidth, 1200)
          const containerLeft = (window.innerWidth - containerWidth) / 2
          const rightColumnLeft = containerLeft + (containerWidth * 0.5) + 32 // 50% + gap
          const imageWidth = window.innerWidth >= 1024 ? 384 : 320 // lg:w-96 or w-80
          const imageLeft = rightColumnLeft + (containerWidth * 0.5 - imageWidth) / 2
          const imageTop = window.innerHeight * 0.1 // Bottom-aligned like static image
          return { x: imageLeft, y: imageTop, scale: 1.2 }
        }

        // Features Section Position (left side, center-aligned)
        const featuresPosition = () => {
          const containerWidth = Math.min(window.innerWidth, 1200)
          const containerLeft = (window.innerWidth - containerWidth) / 2
          const leftColumnLeft = containerLeft // padding
          const imageWidth = window.innerWidth >= 1024 ? 320 : 288 // lg:w-80 or w-72
          const imageLeft = leftColumnLeft
          const featuresSectionTop = (document.querySelector('.features-section') as HTMLElement)?.offsetTop || 0
          const imageTop = featuresSectionTop * 1.1  // Center of features section
          return { x: imageLeft, y: imageTop, scale: 1 }
        }

        // Webinar Section Position (right side, center-aligned)
        const webinarPosition = () => {
          const containerWidth = Math.min(window.innerWidth, 1200)
          const containerLeft = (window.innerWidth - containerWidth) / 2
          const rightColumnLeft = containerLeft + (containerWidth * 0.5) + 32
          const imageWidth = window.innerWidth >= 1024 ? 320 : 288
          const imageLeft = rightColumnLeft + (containerWidth * 0.5 - imageWidth) / 2
          const webinarSectionTop = (document.querySelector('.webinar-section') as HTMLElement)?.offsetTop || 0
          const imageTop = webinarSectionTop// Center of webinar section
          return { x: imageLeft, y: imageTop, scale: 0.8 }
        }

        // Animate to hero position with fade in
        const heroPos = heroPosition()
        // Start at top left (already set) and animate to hero position while fading in
        setTimeout(() => {
          if (sammerRef.current) {
            // Use gsap to animate both position and opacity together
            const imageElement = document.querySelector('.sammer-image-container') as HTMLElement
            if (imageElement) {
              gsap.to(imageElement, {
                x: heroPos.x,
                y: heroPos.y,
                scale: heroPos.scale,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
              })
            }
          }
        }, 100)

        // Add scroll trigger to reset to hero image when scrolling back to top
        sammerRef.current.addScrollTrigger(
          '.hero-section', // trigger element
          'top 50%', // start when hero section is centered
          'top 50%', // same end point
          heroPos.x, // exact x position
          heroPos.y, // exact y position
          heroPos.scale, // exact scale
          1, // duration in seconds
          '/static-media/sameer-fist.png', // change to sameer-fist image
          '/static-media/Sammer-top.png' // when leaving hero section, go back to features image (which is above on page)
        )

        // Create scroll-triggered animation for features section
        // Image moves to features position when features section is centered
        sammerRef.current.addScrollTrigger(
          '.features-section', // trigger element
          'top 50%', // start when features section is centered
          'top 50%', // end when features section is centered
          featuresPosition().x, // exact x position from static image
          featuresPosition().y, // exact y position from static image
          featuresPosition().scale, // exact scale from static image
          1, // duration in seconds
          '/static-media/Sammer-top.png', // change to Sammer-top image
          '/static-media/sameer-fist.png' // when leaving features, go back to hero image
        )

        // Add scroll trigger for webinar section
        // Image moves to webinar position when webinar section is centered
        sammerRef.current.addScrollTrigger(
          '.webinar-section', // trigger element
          'top 50%', // start when webinar section is centered
          'top 50%', // end when webinar section is centered
          webinarPosition().x, // exact x position from static image
          webinarPosition().y, // exact y position from static image
          webinarPosition().scale, // exact scale from static image
          1, // duration in seconds
          '/static-media/sameer-webinar.png', // change to sameer-webinar image
          '/static-media/Sammer-top.png' // when leaving webinar, go back to features image
        )

        // You can add more scroll triggers or manual animations here
        // Example: sammerRef.current.animateToPosition(200, 300, 1.2, 2)
      }
      */

      // TEMPORARILY DISABLED - Snap scrolling logic
      /*
      const sections = document.querySelectorAll('.snap-section')
      let wheelTimeout: ReturnType<typeof setTimeout> | null = null
      let isScrolling = false
      let lastDeltaY = 0
      let accumulatedDeltaY = 0
      let direction: 'up' | 'down' | null = null
      
      const handleWheel = (e: WheelEvent) => {
        if (isScrolling) {
          e.preventDefault()
          return
        }
        
        // Check if ScrollTrigger is currently pinning the features section
        const scrollTrigger = ScrollTrigger.getById('features-pin')
        if (scrollTrigger && scrollTrigger.isActive) {
          // Features section is pinned, allow normal scrolling without snapping
          return
        }
        
        // Clear any pending scroll
        if (wheelTimeout) clearTimeout(wheelTimeout)
        
        // Accumulate delta values for smooth touchpad handling
        accumulatedDeltaY += e.deltaY
        
        // Determine direction based on accumulated delta
        if (Math.abs(accumulatedDeltaY) > 5) {
          direction = accumulatedDeltaY > 0 ? 'down' : 'up'
          lastDeltaY = accumulatedDeltaY
        }
        
        // Only prevent default when we're going to snap
        // This allows normal scrolling within sections
        
        // Throttle wheel events for touchpad compatibility
        wheelTimeout = setTimeout(() => {
          // Use the accumulated direction instead of single event delta
          if (Math.abs(accumulatedDeltaY) < 10) {
            accumulatedDeltaY = 0
            return // Ignore small scrolls
          }
          
          const currentScroll = window.scrollY
          
          // Calculate which section we're currently in based on actual scroll position
          let currentSectionIndex = 0
          sections.forEach((section, index) => {
            const sectionTop = (section as HTMLElement).offsetTop
            if (currentScroll >= sectionTop - 50) {
              currentSectionIndex = index
            }
          })
          
          let targetIndex = currentSectionIndex
          
          // Use direction instead of deltaY for more consistent behavior
          if (direction === 'down' && currentSectionIndex < sections.length - 1) {
            targetIndex = currentSectionIndex + 1
          } else if (direction === 'up' && currentSectionIndex > 0) {
            targetIndex = currentSectionIndex - 1
          }
          
          if (targetIndex !== currentSectionIndex) {
            e.preventDefault()
            isScrolling = true
            accumulatedDeltaY = 0
            direction = null
            
            const targetSection = sections[targetIndex] as HTMLElement
            if (!targetSection) return
            
            const targetScroll = targetSection.offsetTop
            
            gsap.to(window, {
              duration: 0.6,
              scrollTo: { 
                y: targetScroll, 
                autoKill: false 
              },
              ease: "power2.inOut",
              onComplete: () => {
                isScrolling = false
              }
            })
          }
        }, 120) // Reduced throttle delay for better touchpad response
      }
      
      window.addEventListener('wheel', handleWheel, { passive: false })
      */

      // Add card stacking animation for features section
      setTimeout(() => {
        const featuresSection = document.querySelector('.features-section')
        const featureItems = document.querySelectorAll('.feature-item')
        
        if (featuresSection && featureItems.length > 0) {
          // Calculate section height accounting for header
          const sectionHeight = window.innerHeight - 64 // 4rem = 64px
          const cardHeight = sectionHeight * 0.5 // 50% of visible section
          const totalScrollDistance = featureItems.length * cardHeight
          
          let currentCardIndex = 0
          
          // Pin the features section and create stacking effect
          ScrollTrigger.create({
            id: 'features-pin',
            trigger: featuresSection,
            start: 'top 10%',
            end: `+=${totalScrollDistance}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: false,
            onUpdate: (self) => {
              const progress = self.progress
              const targetCardIndex = Math.min(
                Math.floor(progress * featureItems.length),
                featureItems.length - 1
              )
              
              // Only update if card index changed
              if (targetCardIndex !== currentCardIndex) {
                currentCardIndex = targetCardIndex
                
                // Animate each card based on position
                featureItems.forEach((item, index) => {
                  const htmlItem = item as HTMLElement
                  
                  if (index === currentCardIndex) {
                    // Current card - fully visible on top at 100% opacity
                    gsap.to(htmlItem, {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      z: featureItems.length * 10, // Highest z-index for current card
                      duration: 0.4,
                      ease: "power2.out"
                    })
                  } else if (index < currentCardIndex) {
                    // Past cards - completely hidden
                    const stackedIndex = currentCardIndex - index
                    gsap.to(htmlItem, {
                      opacity: 0,
                      y: 0,
                      scale: 1,
                      z: (featureItems.length - stackedIndex) * 10,
                      duration: 0.4,
                      ease: "power2.out"
                    })
                  } else {
                    // Future cards - hidden below waiting to slide up
                    gsap.to(htmlItem, {
                      opacity: 0,
                      y: 100,
                      scale: 0.9,
                      z: 0,
                      duration: 0.3,
                      ease: "power2.in"
                    })
                  }
                })
              }
            }
          })
          
          // Set initial state for all cards
          featureItems.forEach((item, index) => {
            const htmlItem = item as HTMLElement
            
            // Set absolute positioning for stacking
            gsap.set(htmlItem, {
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              transformOrigin: 'center',
              willChange: 'transform'
            })
            
            if (index === 0) {
              // First card visible on top
              gsap.set(htmlItem, {
                opacity: 1,
                y: 0,
                scale: 1,
                z: featureItems.length * 10,
              })
            } else {
              // Other cards hidden below
              gsap.set(htmlItem, {
                opacity: 0,
                y: 100,
                scale: 0.9,
                z: 0,
              })
            }
          })
        }
      }, 200)
      
      // Add background color transition to white for webinar section
      setTimeout(() => {
        const webinarSection = document.querySelector('.webinar-section')
        const bgWrapper = document.querySelector('.page-bg-wrapper') as HTMLElement
        
        if (webinarSection && bgWrapper) {
          // Set initial background for GSAP to control
          bgWrapper.style.background = 'linear-gradient(to bottom right, #0f172a, #111827, #0f172a)'
          
          ScrollTrigger.create({
            trigger: webinarSection,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => {
              gsap.to(bgWrapper, {
                background: 'linear-gradient(to bottom right, #ffffff, #ffffff, #ffffff)',
                duration: 1,
                ease: 'power2.inOut'
              })
              webinarSection.classList.add('on-white-bg')
              const featuresSection = document.querySelector('.features-section')
              if (featuresSection) featuresSection.classList.add('on-white-bg')
              
              // Animate image fade overlays to white
              const fadeOverlays = document.querySelectorAll('.fade-overlay')
              fadeOverlays.forEach((overlay) => {
                gsap.to(overlay as HTMLElement, {
                  background: 'linear-gradient(to top, #ffffff 0%, #ffffff 40%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0.7) 80%, transparent 100%)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              // Animate webinar section text colors
              const webinarContent = document.querySelectorAll('.webinar-content, .webinar-title')
              webinarContent.forEach((el) => {
                gsap.to(el as HTMLElement, {
                  color: '#111827',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              })
              
              // Animate webinar badge
              const webinarBadge = document.querySelector('.webinar-badge')
              if (webinarBadge) {
                gsap.to(webinarBadge as HTMLElement, {
                  background: 'rgba(252, 194, 47, 0.15)',
                  borderColor: 'rgba(252, 194, 47, 0.3)',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              const webinarBadgeText = webinarBadge?.querySelector('span')
              if (webinarBadgeText) {
                gsap.to(webinarBadgeText as HTMLElement, {
                  color: '#991b1b',
                  fontWeight: '700',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              // Animate webinar cards
              const webinarCards = document.querySelectorAll('.webinar-card')
              webinarCards.forEach((card) => {
                const el = card as HTMLElement
                el.style.backgroundColor = '#fefce8'
                el.style.borderColor = 'rgba(252, 194, 47, 0.4)'
                gsap.to(el, {
                  backgroundColor: '#fff7ed',
                  borderColor: 'rgba(252, 194, 47, 0.5)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              const webinarCardTexts = document.querySelectorAll('.webinar-card-text')
              webinarCardTexts.forEach((text) => {
                gsap.to(text as HTMLElement, {
                  color: '#1f2937',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
            },
            onLeaveBack: () => {
              gsap.to(bgWrapper, {
                background: 'linear-gradient(to bottom right, #0f172a, #111827, #0f172a)',
                duration: 1,
                ease: 'power2.inOut'
              })
              webinarSection.classList.remove('on-white-bg')
              const featuresSection = document.querySelector('.features-section')
              if (featuresSection) featuresSection.classList.remove('on-white-bg')
              
              // Animate image fade overlays back to dark
              const fadeOverlays = document.querySelectorAll('.fade-overlay')
              fadeOverlays.forEach((overlay) => {
                gsap.to(overlay as HTMLElement, {
                  background: 'linear-gradient(to top, #0f172a 0%, #0f172a 40%, rgba(15, 23, 42, 0.9) 60%, rgba(15, 23, 42, 0.7) 80%, transparent 100%)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              // Revert webinar section text colors to white
              const webinarContent = document.querySelectorAll('.webinar-content, .webinar-title')
              webinarContent.forEach((el) => {
                gsap.to(el as HTMLElement, {
                  color: '#ffffff',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              })
              
              // Revert webinar badge
              const webinarBadge = document.querySelector('.webinar-badge')
              if (webinarBadge) {
                gsap.to(webinarBadge as HTMLElement, {
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(51, 65, 85, 0.5)',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              const webinarBadgeText = webinarBadge?.querySelector('span')
              if (webinarBadgeText) {
                gsap.to(webinarBadgeText as HTMLElement, {
                  color: 'rgb(203, 213, 225)',
                  fontWeight: '600',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              // Revert webinar cards
              const webinarCards = document.querySelectorAll('.webinar-card')
              webinarCards.forEach((card) => {
                const el = card as HTMLElement
                el.style.backgroundColor = '#1e293b'
                el.style.borderColor = 'rgba(71, 85, 105, 0.3)'
                gsap.to(el, {
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  borderColor: 'rgba(51, 65, 85, 0.4)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              const webinarCardTexts = document.querySelectorAll('.webinar-card-text')
              webinarCardTexts.forEach((text) => {
                gsap.to(text as HTMLElement, {
                  color: '#ffffff',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
            },
            onLeave: () => {
              gsap.to(bgWrapper, {
                background: 'linear-gradient(to bottom right, #ffffff, #ffffff, #ffffff)',
                duration: 1,
                ease: 'power2.inOut'
              })
              webinarSection.classList.add('on-white-bg')
              const featuresSection = document.querySelector('.features-section')
              if (featuresSection) featuresSection.classList.add('on-white-bg')
              
              // Animate image fade overlays to white
              const fadeOverlays = document.querySelectorAll('.fade-overlay')
              fadeOverlays.forEach((overlay) => {
                gsap.to(overlay as HTMLElement, {
                  background: 'linear-gradient(to top, #ffffff 0%, #ffffff 40%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0.7) 80%, transparent 100%)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              // Animate webinar section text colors to dark
              const webinarContent = document.querySelectorAll('.webinar-content, .webinar-title')
              webinarContent.forEach((el) => {
                gsap.to(el as HTMLElement, {
                  color: '#111827',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              })
              
              // Animate webinar badge
              const webinarBadge = document.querySelector('.webinar-badge')
              if (webinarBadge) {
                gsap.to(webinarBadge as HTMLElement, {
                  background: 'rgba(252, 194, 47, 0.15)',
                  borderColor: 'rgba(252, 194, 47, 0.3)',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              const webinarBadgeText = webinarBadge?.querySelector('span')
              if (webinarBadgeText) {
                gsap.to(webinarBadgeText as HTMLElement, {
                  color: '#991b1b',
                  fontWeight: '700',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              // Animate webinar cards
              const webinarCards = document.querySelectorAll('.webinar-card')
              webinarCards.forEach((card) => {
                const el = card as HTMLElement
                el.style.backgroundColor = '#fefce8'
                el.style.borderColor = 'rgba(252, 194, 47, 0.4)'
                gsap.to(el, {
                  backgroundColor: '#fff7ed',
                  borderColor: 'rgba(252, 194, 47, 0.5)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              const webinarCardTexts = document.querySelectorAll('.webinar-card-text')
              webinarCardTexts.forEach((text) => {
                gsap.to(text as HTMLElement, {
                  color: '#1f2937',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
            },
            onEnterBack: () => {
              gsap.to(bgWrapper, {
                background: 'linear-gradient(to bottom right, #0f172a, #111827, #0f172a)',
                duration: 1,
                ease: 'power2.inOut'
              })
              webinarSection.classList.remove('on-white-bg')
              const featuresSection = document.querySelector('.features-section')
              if (featuresSection) featuresSection.classList.remove('on-white-bg')
              
              // Animate image fade overlays back to dark
              const fadeOverlays = document.querySelectorAll('.fade-overlay')
              fadeOverlays.forEach((overlay) => {
                gsap.to(overlay as HTMLElement, {
                  background: 'linear-gradient(to top, #0f172a 0%, #0f172a 40%, rgba(15, 23, 42, 0.9) 60%, rgba(15, 23, 42, 0.7) 80%, transparent 100%)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              // Revert webinar section text colors to white
              const webinarContent = document.querySelectorAll('.webinar-content, .webinar-title')
              webinarContent.forEach((el) => {
                gsap.to(el as HTMLElement, {
                  color: '#ffffff',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              })
              
              // Revert webinar badge
              const webinarBadge = document.querySelector('.webinar-badge')
              if (webinarBadge) {
                gsap.to(webinarBadge as HTMLElement, {
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderColor: 'rgba(51, 65, 85, 0.5)',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              const webinarBadgeText = webinarBadge?.querySelector('span')
              if (webinarBadgeText) {
                gsap.to(webinarBadgeText as HTMLElement, {
                  color: 'rgb(203, 213, 225)',
                  fontWeight: '600',
                  duration: 0.8,
                  ease: 'power2.inOut'
                })
              }
              
              // Revert webinar cards
              const webinarCards = document.querySelectorAll('.webinar-card')
              webinarCards.forEach((card) => {
                const el = card as HTMLElement
                el.style.backgroundColor = '#1e293b'
                el.style.borderColor = 'rgba(71, 85, 105, 0.3)'
                gsap.to(el, {
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  borderColor: 'rgba(51, 65, 85, 0.4)',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
              
              const webinarCardTexts = document.querySelectorAll('.webinar-card-text')
              webinarCardTexts.forEach((text) => {
                gsap.to(text as HTMLElement, {
                  color: '#ffffff',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              })
            }
          })
        }
      }, 250)
      
      // Cleanup
      return () => {
        // Cleanup for snap scroll is disabled
        // if (wheelTimeout) clearTimeout(wheelTimeout)
        // window.removeEventListener('wheel', handleWheel)
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {/* Square pattern background for home page sections only */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" style={{ height: '100%' }}></div>
      
      {/* TEMPORARILY DISABLED - Moving image component */}
      {/* <ControllableSammerImage ref={sammerRef} /> */}
      <div className="page-bg-wrapper relative z-10">
        <HeroSection />
        <FeaturesSection />
        <WebinarSection />
      </div>
    </div>
  )
}