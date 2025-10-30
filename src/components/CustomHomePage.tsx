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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

export const CustomHomePage: React.FC = () => {
  const movingImageRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState('/static-media/sameer-fist.png')

  useEffect(() => {
    const timer = setTimeout(() => {

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
            markers: true,
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
            end: 'top 50%',
            markers: true,
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

      // Add GSAP animations for Instructor Bio section
      setTimeout(() => {
        const instructorSection = document.querySelector('.instructor-bio-section')
        
        if (instructorSection) {
          // Split title text into characters for animation
          const titleEl = instructorSection.querySelector('.instructor-title')
          if (titleEl && titleEl.textContent) {
            const text = titleEl.textContent
            const chars = text.split('').map((char, i) => 
              char === ' ' ? '\u00A0' : char
            )
            titleEl.innerHTML = chars.map((char, i) => 
              `<span style="display: inline-block">${char}</span>`
            ).join('')
            
            const titleSpans = titleEl.querySelectorAll('span')
            
            // Animate fade overlay height from 0 to final
            const fadeOverlay = instructorSection.querySelector('.fade-overlay')
            if (fadeOverlay) {
              gsap.set(fadeOverlay as HTMLElement, { height: 0 })
            }
            
            // ScrollTrigger for section - play once only
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: instructorSection,
                start: 'top 50%',
                end: 'top 50%',
                markers: true,
                toggleActions: 'play none none none', // Only play on enter, don't reverse
                once: true // Play animation only once
              }
            })
            
            // Animate title characters
            tl.from(titleSpans, {
              y: 30,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.6,
              stagger: 0.02,
              ease: 'power3.out'
            })
            
            // Animate content with clip-path from left-to-right
            tl.from('.instructor-content', {
              clipPath: 'inset(0 100% 0 0)',
              duration: 0.8,
              ease: 'power2.inOut'
            }, '-=0.4')
            
            // Animate quick stats cards with stagger and counter
            // Get only the stats cards (first 3 cards)
            const statsCards = Array.from(instructorSection.querySelectorAll('.instructor-card')).slice(0, 3) as HTMLElement[]
            
            // Animate all instructor cards in, then trigger counter on stats only
            tl.from('.instructor-card', {
              y: 30,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'back.out(0.5)',
              onComplete: () => {
                // Counter animation after cards are visible - only for stats cards
                statsCards.forEach((card, i) => {
                  const textEls = card.querySelectorAll('.instructor-card-text')
                  textEls.forEach((textEl) => {
                    const text = textEl.textContent || ''
                    // Match pattern like "23+", "5.0★", "10,000+"
                    const match = text.match(/^(\d+\.?\d*)(.*)/)
                    if (match && textEl.parentElement?.classList.contains('instructor-card')) {
                      const numValue = parseFloat(match[1])
                      const suffix = match[2]

                      // Initialize to 0 before animating up
                      if (numValue < 1) {
                        (textEl as HTMLElement).textContent = `0.0${suffix}`
                      } else {
                        (textEl as HTMLElement).textContent = `0${suffix}`
                      }

                      const counter = { val: 0 }
                      gsap.to(counter, {
                        val: numValue,
                        duration: 1.5,
                        delay: i * 0.15,
                        ease: 'power2.out',
                        onUpdate: () => {
                          const rounded = numValue < 1 ? counter.val.toFixed(1) : Math.ceil(counter.val)
                          ;(textEl as HTMLElement).textContent = `${rounded}${suffix}`
                        }
                      })
                    }
                  })
                })
              }
            }, '-=0.6')
            
            // Animate fade overlay height
            if (fadeOverlay) {
              tl.to(fadeOverlay as HTMLElement, {
                height: 80,
                duration: 0.8,
                ease: 'power2.inOut'
              }, '-=0.3')
            }
            
            // Hover interactions for cards
            statsCards.forEach((card) => {
              card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                  backgroundColor: '#ffffff',
                  y: -5,
                  duration: 0.3,
                  ease: 'power2.out'
                })
              })
              card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                  backgroundColor: '#fffbeb',
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.out'
                })
              })
            })
            
            // Animate credentials grid - stagger from bottom rows upward
            // Target only credential cards (skip the first 3 stats cards)
            const allCards = Array.from(instructorSection.querySelectorAll('.instructor-card'))
            const credentialCards = allCards.slice(3) // Skip first 3 stats cards
            
            // Add shimmer animation after card appears
            credentialCards.forEach((card, i) => {
              const cardEl = card as HTMLElement
              gsap.from(card, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                delay: i * 0.05,
                ease: 'back.out(1.2)',
                onComplete: () => {
                  // Shimmer effect
                  const shimmer = document.createElement('div')
                  shimmer.style.cssText = `
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(252, 194, 47, 0.3), transparent);
                    pointer-events: none;
                    border-radius: 1rem;
                  `
                  cardEl.style.position = 'relative'
                  cardEl.appendChild(shimmer)
                  
                  gsap.fromTo(shimmer, 
                    { x: '-100%' },
                    { x: '100%', duration: 0.8, ease: 'power2.inOut', opacity: 0 }
                  ).then(() => shimmer.remove())
                }
              })
            })
            
            // Add premium effects after section is rendered
            setTimeout(() => {
              // 1. Animated shine pass on hover for all cards
              const cards = instructorSection.querySelectorAll('.instructor-stats-card, .instructor-credential-card')
              cards.forEach((card) => {
                card.addEventListener('mouseenter', () => {
                  const shine = document.createElement('div')
                  shine.style.cssText = `
                    position: absolute;
                    inset: -2px;
                    background: linear-gradient(135deg, 
                      transparent 0%, 
                      transparent 40%, 
                      rgba(252, 194, 47, 0.4) 50%, 
                      transparent 60%, 
                      transparent 100%);
                    pointer-events: none;
                    z-index: 10;
                    opacity: 0;
                    border-radius: inherit;
                  `
                  ;(card as HTMLElement).appendChild(shine)
                  
                  gsap.fromTo(shine, 
                    { x: '-150%', y: '-150%', rotate: -30 },
                    { x: '150%', y: '150%', duration: 0.8, ease: 'power2.inOut', opacity: 1, onComplete: () => shine.remove() }
                  )
                })
              })
              
              // 2. Micro-raise + color accent on credential card headings on hover
              const credentialTitles = instructorSection.querySelectorAll('.instructor-card-title')
              credentialTitles.forEach((title) => {
                title.addEventListener('mouseenter', () => {
                  gsap.to(title, {
                    y: -2,
                    color: '#C71C22',
                    duration: 0.2,
                    ease: 'power2.out'
                  })
                })
                title.addEventListener('mouseleave', () => {
                  gsap.to(title, {
                    y: 0,
                    color: '#1e293b',
                    duration: 0.2,
                    ease: 'power2.out'
                  })
                })
              })
              
              // 3. Perspective shift on scroll for instructor image
              const imageContainer = instructorSection.querySelector('.instructor-bio-section > div > div > div:first-child > div')
              if (imageContainer) {
                ScrollTrigger.create({
                  trigger: instructorSection,
                  start: 'top 80%',
                  end: 'bottom 20%',
                  scrub: 0.5,
                  onUpdate: (self) => {
                    const progress = self.progress
                    gsap.to(imageContainer, {
                      rotationY: progress * 2,
                      rotationX: progress * 1,
                      transformPerspective: 1000,
                      duration: 0.1
                    })
                  }
                })
              }
            }, 100)
          }
        }
      }, 400)

      // Moving image animation - calculate positions relative to page and move absolute image
      setTimeout(() => {
        const movingImage = movingImageRef.current
        if (!movingImage) return

        // Helper function to get position relative to page (document)
        const getImagePosition = (selector: string) => {
          const img = document.querySelector(selector) as HTMLElement
          if (!img) return null
          
          const rect = img.getBoundingClientRect()
          // Get position relative to document (page), not viewport
          return {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
          }
        }

        // Get position relative to page container (parent of moving image)
        const getPositionRelativeToContainer = (selector: string) => {
          const img = document.querySelector(selector) as HTMLElement
          if (!img) return null
          
          const container = movingImage.parentElement as HTMLElement
          if (!container) return null
          
          const imgRect = img.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          
          // Calculate position relative to container
          return {
            x: imgRect.left - containerRect.left,
            y: imgRect.top - containerRect.top,
            width: imgRect.width,
            height: imgRect.height
          }
        }

        // Get hero image position relative to hero section container (for scroll calculations)
        const getHeroImageRelativePos = () => {
          const heroSection = document.querySelector('.hero-section') as HTMLElement
          // Target the right column's image using the class
          const heroImg = heroSection?.querySelector('.hero-right-image img') as HTMLElement
          if (!heroSection || !heroImg) return null
          
          // Get hero section position
          const heroSectionRect = heroSection.getBoundingClientRect()
          const heroSectionY = heroSectionRect.top + window.scrollY
          
          // Get image position relative to section
          const imgRect = heroImg.getBoundingClientRect()
          const relativeY = imgRect.top - heroSectionRect.top
          
          return {
            x: imgRect.left + window.scrollX,
            y: heroSectionY + relativeY,
            width: imgRect.width,
            height: imgRect.height
          }
        }

        // Function to update position on scroll (for absolute positioning)
        const updatePositionOnScroll = () => {
          const scrollY = window.scrollY
          
          // Determine which section we're in and update position accordingly
          const heroSection = document.querySelector('.hero-section') as HTMLElement
          const featuresSection = document.querySelector('.features-section') as HTMLElement
          const webinarSection = document.querySelector('.webinar-section') as HTMLElement
          const instructorSection = document.querySelector('.instructor-bio-section') as HTMLElement
          
          let targetPos = null
          
          if (heroSection && scrollY < featuresSection?.offsetTop) {
            // In hero section
            targetPos = getImagePosition('.hero-section .hero-right-image img')
          } else if (featuresSection && scrollY >= featuresSection.offsetTop && scrollY < (webinarSection?.offsetTop || Infinity)) {
            // In features section - keep at hero position
            targetPos = getImagePosition('.hero-section .hero-right-image img')
            if (targetPos) {
              targetPos.y = heroSection.offsetTop + (targetPos.y - heroSection.offsetTop)
            }
          } else if (webinarSection && scrollY >= webinarSection.offsetTop && scrollY < (instructorSection?.offsetTop || Infinity)) {
            // In webinar section
            targetPos = getImagePosition('.webinar-section img')
          } else if (instructorSection && scrollY >= instructorSection.offsetTop) {
            // In instructor section
            targetPos = getImagePosition('.instructor-bio-section img')
          }
          
          if (targetPos && movingImage) {
            gsap.set(movingImage, {
              left: targetPos.x,
              top: targetPos.y,
              width: targetPos.width,
              height: targetPos.height
            })
          }
        }

        // Hide static images initially (only instructor images, not badges)
        // Target right column images in hero, and all images in webinar/instructor sections
        const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement
        const webinarImgs = document.querySelectorAll('.webinar-section img')
        const instructorImgs = document.querySelectorAll('.instructor-bio-section img')
        
        if (heroImg) gsap.set(heroImg, { opacity: 0 })
        webinarImgs.forEach((img) => gsap.set(img as HTMLElement, { opacity: 0 }))
        instructorImgs.forEach((img) => gsap.set(img as HTMLElement, { opacity: 0 }))

        // Show moving image in hero initially - wait for layout
        const setInitialPosition = () => {
          // Target the right column's image using the class
          const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement
          const container = movingImage.parentElement as HTMLElement
          
          if (heroImg && container) {
            const imgRect = heroImg.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            
            gsap.set(movingImage, {
              left: imgRect.left - containerRect.left,
              top: imgRect.top - containerRect.top,
              width: imgRect.width,
              height: imgRect.height,
              opacity: 1
            })
          }
        }
        
        // Set initial position after a small delay to ensure layout is complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setInitialPosition()
          })
        })

        // Update positions on resize
        const updatePositions = () => {
          const container = movingImage.parentElement as HTMLElement
          if (!container) return
          
          // Target the right column's image using the class
          const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement
          
          // Update current position if we're in hero section
          if (heroImg && window.scrollY < 500) {
            const imgRect = heroImg.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            
            gsap.set(movingImage, {
              left: imgRect.left - containerRect.left,
              top: imgRect.top - containerRect.top,
              width: imgRect.width,
              height: imgRect.height
            })
          }
        }

        window.addEventListener('resize', updatePositions)

        // Store initial hero position for reference
        const initialHeroPos = getHeroImageRelativePos()

        // Hero to Features transition
        ScrollTrigger.create({
          id: 'hero-to-features',
          trigger: '.features-section',
          start: () => `top+=-${Math.round(window.innerHeight * 0.25)} center`,
          end: () => `top+=-${Math.round(window.innerHeight * 0.25)} center`,
          markers: true,
          onEnter: () => {
            // Move image to left side of features section (where it should be)
            const featuresSection = document.querySelector('.features-section') as HTMLElement
            const featuresLeft = document.querySelector('.features-section .grid > div:first-child') as HTMLElement
            const featuresStaticImageContainer = document.querySelector('.features-static-image-container') as HTMLElement
            
            if (featuresLeft && initialHeroPos) {
              const featuresRect = featuresLeft.getBoundingClientRect()
              const container = movingImage.parentElement as HTMLElement
              
              if (container) {
                const containerRect = container.getBoundingClientRect()
                // Calculate center position within the left column
                const centerY = featuresRect.top + (featuresRect.height / 2) - (initialHeroPos.height / 2)
                
                // Animate moving image to features position
                gsap.to(movingImage, {
                  left: featuresRect.left - containerRect.left,
                  top: centerY - containerRect.top,
                  width: initialHeroPos.width,
                  height: initialHeroPos.height,
                  duration: 1,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    // Once animation completes, hide moving image and show static image
                    gsap.set(movingImage, { opacity: 0 })
                    if (featuresStaticImageContainer) {
                      gsap.to(featuresStaticImageContainer.querySelector('div'), {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.inOut'
                      })
                    }
                  }
                })
              }
            } else if (initialHeroPos) {
              // Fallback: keep at hero visual position
              const heroPos = getHeroImageRelativePos()
              if (heroPos) {
                gsap.to(movingImage, {
                  left: heroPos.x,
                  top: heroPos.y,
                  width: heroPos.width,
                  height: heroPos.height,
                  duration: 1,
                  ease: 'power2.inOut'
                })
              }
            }
          },
          onEnterBack: () => {
            // Hide static image first, then show and animate moving image back to hero
            const featuresStaticImageContainer = document.querySelector('.features-static-image-container') as HTMLElement
            
            if (featuresStaticImageContainer) {
              gsap.to(featuresStaticImageContainer.querySelector('div'), {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut',
                onComplete: () => {
                  // Show moving image and animate back to hero position
                  const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement
                  const container = movingImage.parentElement as HTMLElement
                  
                  if (heroImg && container) {
                    const imgRect = heroImg.getBoundingClientRect()
                    const containerRect = container.getBoundingClientRect()
                    
                    // Switch to hero image and reset orientation
                    setCurrentImage('/static-media/sameer-fist.png')
                    gsap.set(movingImage, { opacity: 1, scaleX: 1 })
                    gsap.to(movingImage, {
                      left: imgRect.left - containerRect.left,
                      top: imgRect.top - containerRect.top,
                      width: imgRect.width,
                      height: imgRect.height,
                      duration: 1,
                      ease: 'power2.inOut'
                    })
                  }
                }
              })
            }
          }
        })

          // No need for position updates during pinned scroll - static image handles it

        // Features to Webinar transition
        ScrollTrigger.create({
          id: 'features-to-webinar',
          trigger: '.webinar-section',
          start: () => `top+=-${Math.round(window.innerHeight * 0.25)} center`,
          end: () => `top+=-${Math.round(window.innerHeight * 0.25)} center`,
          markers: true,
          onEnter: () => {
            const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement
            const webinarImg = document.querySelector('.webinar-section img') as HTMLElement
            const container = movingImage.parentElement as HTMLElement

            // Hide features static and show moving image
            if (featuresStatic) {
              gsap.to(featuresStatic, { opacity: 0, duration: 0.2, ease: 'power2.inOut' })
            }

            if (webinarImg && container) {
              const imgRect = webinarImg.getBoundingClientRect()
              const containerRect = container.getBoundingClientRect()

              setCurrentImage('/static-media/Sammer-top.png')
              gsap.set(movingImage, { opacity: 1, scaleX: -1 })

              gsap.to(movingImage, {
                left: imgRect.left - containerRect.left,
                top: imgRect.top - containerRect.top,
                width: imgRect.width,
                height: imgRect.height,
                duration: 1,
                ease: 'power2.inOut'
              })
            }
          },
          onLeaveBack: () => {
            // Animate back to features left side, then reveal features static
            const featuresLeft = document.querySelector('.features-section .grid > div:first-child') as HTMLElement
            const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement
            const container = movingImage.parentElement as HTMLElement

            if (featuresLeft && initialHeroPos && container) {
              const featuresRect = featuresLeft.getBoundingClientRect()
              const containerRect = container.getBoundingClientRect()
              const centerY = featuresRect.top + (featuresRect.height / 2) - (initialHeroPos.height / 2)

              setCurrentImage('/static-media/Sammer-top.png')
              gsap.set(movingImage, { opacity: 1, scaleX: 1 })
              gsap.to(movingImage, {
                left: featuresRect.left - containerRect.left,
                top: centerY - containerRect.top,
                width: initialHeroPos.width,
                height: initialHeroPos.height,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                  if (featuresStatic) {
                    gsap.to(featuresStatic, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
                  }
                  gsap.set(movingImage, { opacity: 0 })
                }
              })
            }
          }
        })

        // Webinar to Instructor transition
        ScrollTrigger.create({
          id: 'webinar-to-instructor',
          trigger: '.instructor-bio-section',
          start: () => `top+=-${Math.round(window.innerHeight * 0.25)} top`,
          end: () => `top+=-${Math.round(window.innerHeight * 0.25)} top`,
          markers: true,
          onEnter: () => {
            const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement
            const container = movingImage.parentElement as HTMLElement
            
            if (instructorImg && container) {
              const imgRect = instructorImg.getBoundingClientRect()
              const containerRect = container.getBoundingClientRect()
              
              setCurrentImage('/static-media/sameer-fist.png')
              gsap.set(movingImage, { opacity: 1, scaleX: 1 })
              gsap.to(movingImage, {
                left: imgRect.left - containerRect.left,
                top: imgRect.top - containerRect.top,
                width: imgRect.width,
                height: imgRect.height,
                duration: 1,
                ease: 'power2.inOut'
              })
            }
          },
          onLeaveBack: () => {
            // Back to webinar position
            const webinarImg = document.querySelector('.webinar-section img') as HTMLElement
            const container = movingImage.parentElement as HTMLElement
            
            if (webinarImg && container) {
              const imgRect = webinarImg.getBoundingClientRect()
              const containerRect = container.getBoundingClientRect()
              
              setCurrentImage('/static-media/Sammer-top.png')
              gsap.set(movingImage, { opacity: 1, scaleX: -1 })
              gsap.to(movingImage, {
                left: imgRect.left - containerRect.left,
                top: imgRect.top - containerRect.top,
                width: imgRect.width,
                height: imgRect.height,
                duration: 1,
                ease: 'power2.inOut'
              })
            }
          }
        })

        // Cleanup resize listener
        return () => {
          window.removeEventListener('resize', updatePositions)
        }
      }, 800) // After all other animations (400ms + buffer)
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
      
      {/* Moving image - absolutely positioned relative to page */}
      <div 
        ref={movingImageRef}
        style={{ 
          position: 'absolute',
          zIndex: 40,
          pointerEvents: 'none',
          willChange: 'transform, width, height'
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
        {/* New Instructor Bio Section below webinar */}
        {/* Light-theme content; GSAP fade-overlays already handled */}
        <InstructorBioSection />
      </div>
    </div>
  )
}