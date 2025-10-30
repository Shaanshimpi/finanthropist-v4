'use client'
import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface SammerImageRef {
  setPosition: (x: number, y: number, scale?: number) => void
  animateToPosition: (x: number, y: number, scale?: number, duration?: number) => void
  addScrollTrigger: (trigger: string, start: string, end: string, x: number, y: number, scale?: number, duration?: number, imageSrc?: string, previousImageSrc?: string, flipX?: boolean, previousFlipX?: boolean) => void
  killAllScrollTriggers: () => void
  setImage: (imageSrc: string) => void
}

export const ControllableSammerImage = forwardRef<SammerImageRef, {}>((props, ref) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])
  const [imageSrc, setImageSrc] = useState('/static-media/sameer-fist.png')
  const imageKeyRef = useRef(0) // Add key to force image re-render

  useImperativeHandle(ref, () => ({
    // Set position immediately (no animation)
    setPosition: (x: number, y: number, scale = 1) => {
      if (imageRef.current) {
        gsap.set(imageRef.current, {
          x,
          y,
          scale,
          opacity: 1
        })
      }
    },
    
    // Animate to position
    animateToPosition: (x: number, y: number, scale = 1, duration = 1) => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x,
          y,
          scale,
          duration,
          ease: "power2.out"
        })
      }
    },
    
    // Add scroll-triggered animation (supports multiple triggers)
    addScrollTrigger: (trigger: string, start: string, end: string, x: number, y: number, scale = 1, duration = 1, imageSrc?: string, previousImageSrc?: string, flipX = false, previousFlipX = false) => {
      if (imageRef.current) {
        // Create a timeline for smooth animation with reverse
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start,
            end,
            toggleActions: "play none none reverse", // Play forward, reverse on scroll back
            onEnter: () => {
              // Change image with smooth transition when scrolling forward
              if (imageSrc) {
                // Fade out current image
                gsap.to(imageRef.current, {
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.in",
                  onComplete: () => {
                    // Change image and increment key
                    imageKeyRef.current++
                    setImageSrc(imageSrc)
                    // Fade in new image
                    gsap.set(imageRef.current, { opacity: 0 })
                    gsap.to(imageRef.current, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out"
                    })
                  }
                })
              }
            },
            onLeaveBack: () => {
              // Change back to previous image with smooth transition when scrolling back
              if (previousImageSrc) {
                // Fade out current image
                gsap.to(imageRef.current, {
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.in",
                  onComplete: () => {
                    // Change image and increment key
                    imageKeyRef.current++
                    setImageSrc(previousImageSrc)
                    // Fade in new image
                    gsap.set(imageRef.current, { opacity: 0 })
                    gsap.to(imageRef.current, {
                      opacity: 1,
                      duration: 0.3,
                      ease: "power2.out"
                    })
                  }
                })
              }
            }
          }
        })

        // Add animation to timeline
        tl.to(imageRef.current, {
          x: x,
          y: y,
          scale: scale,
          duration: duration,
          ease: "power2.out"
        })
        
        // Apply flip when entering or on reverse
        if (tl.scrollTrigger) {
          const originalOnEnter = tl.scrollTrigger.onEnter
          const originalOnEnterBack = tl.scrollTrigger.onEnterBack
          
          tl.scrollTrigger.onEnter = () => {
            if (originalOnEnter) originalOnEnter()
            if (flipX) {
              gsap.to(imageRef.current, { scaleX: -scale, duration: duration, ease: "power2.out" })
            } else {
              gsap.to(imageRef.current, { scaleX: scale, duration: duration, ease: "power2.out" })
            }
          }
          
          tl.scrollTrigger.onEnterBack = () => {
            if (originalOnEnterBack) originalOnEnterBack()
            if (flipX) {
              gsap.to(imageRef.current, { scaleX: -scale, duration: duration, ease: "power2.out" })
            } else {
              gsap.to(imageRef.current, { scaleX: scale, duration: duration, ease: "power2.out" })
            }
          }
          
          if (previousImageSrc) {
            tl.scrollTrigger.onLeaveBack = () => {
              if (previousFlipX) {
                gsap.to(imageRef.current, { scaleX: -scale, duration: duration, ease: "power2.out" })
              } else {
                gsap.to(imageRef.current, { scaleX: scale, duration: duration, ease: "power2.out" })
              }
            }
          }
        }
        
        scrollTriggersRef.current.push(tl.scrollTrigger!)
      }
    },
    
    // Kill all scroll triggers
    killAllScrollTriggers: () => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill())
      scrollTriggersRef.current = []
    },

    // Set image source
    setImage: (src: string) => {
      setImageSrc(src)
    }
  }))

  useEffect(() => {
    if (!imageRef.current) return

    // Set initial position - start invisible (position will be set by parent)
    gsap.set(imageRef.current, {
      scale: 1,
      opacity: 0 // Start invisible
    })

    return () => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={imageRef}
      className="sammer-image-container absolute top-0 left-0 z-40 pointer-events-none"
      style={{ 
        willChange: 'transform',
        opacity: 0
      }}
    >
      <div className="w-80 h-96 lg:w-96 lg:h-[500px] relative">
        <Image
          key={imageKeyRef.current}
          src={imageSrc}
          alt="Controllable Sammer"
          width={400}
          height={500}
          className="w-full h-full object-contain object-bottom"
          priority
        />
        {/* Gradient fade at the bottom to prevent hard cutoff */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </div>
  )
})

ControllableSammerImage.displayName = 'ControllableSammerImage'
