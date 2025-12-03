'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export const PageLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    // Only show loader on home page
    if (!isHomePage) {
      setIsLoading(false)
      return
    }

    const animateToHeader = () => {
      if (!logoRef.current || !loaderRef.current) {
        setIsLoading(false)
        return
      }

      // Find the header logo element - it's the div with class "relative" inside the Link
      const headerLink = document.querySelector('header a[href="/"]') as HTMLElement
      if (!headerLink) {
        console.warn('Header logo link not found')
        setIsLoading(false)
        return
      }

      // Get the logo container div (the one with class "relative")
      const headerLogoContainer = headerLink.querySelector('div.relative') as HTMLElement
      if (!headerLogoContainer) {
        console.warn('Header logo container not found')
        setIsLoading(false)
        return
      }

      // Get header logo position using getBoundingClientRect (viewport-relative)
      const headerRect = headerLogoContainer.getBoundingClientRect()
      
      // Get current loader logo position (should be centered by flexbox)
      const loaderLogoRect = logoRef.current.getBoundingClientRect()
      const loaderLogoCenterX = loaderLogoRect.left + loaderLogoRect.width / 2
      const loaderLogoCenterY = loaderLogoRect.top + loaderLogoRect.height / 2

      // Calculate header logo center
      const headerCenterX = headerRect.left + headerRect.width / 2
      const headerCenterY = headerRect.top + headerRect.height / 2
      
      // Calculate delta: from current center position to header center position
      // GSAP x/y are relative to element's current position
      const deltaX = headerCenterX - loaderLogoCenterX
      const deltaY = headerCenterY - loaderLogoCenterY
      const scaleX = headerRect.width / loaderLogoRect.width
      const scaleY = headerRect.height / loaderLogoRect.height

      setIsAnimating(true)

      // Set initial GSAP transform - start from current position (centered)
      // GSAP will add to the current position, so we start at 0,0
      gsap.set(logoRef.current, {
        transformOrigin: 'center center',
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 0,
        clearProps: 'transform', // Clear any existing CSS transforms
      })

      // Set initial state for welcome message
      gsap.set(messageRef.current, {
        opacity: 0,
        y: 20,
      })

      // Create animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)
        },
      })

      // Fade in welcome message first
      tl.to(messageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        // Wait 2 seconds before logo entrance
        .to({}, { duration: 2 })
        // Then fade in logo with smooth animation
        .to(logoRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        })
        // Fade out welcome message before logo moves
        .to(
          messageRef.current,
          {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: 'power2.in',
          },
          '+=0.2'
        )
        // Subtle pulse animation on logo
        .to(
          logoRef.current,
          {
            scale: 1.05,
            duration: 0.8,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: 1,
          },
          '-=0.5'
        )
        // Animate logo from center to header position
        .to(logoRef.current, {
          x: deltaX,
          y: deltaY,
          scaleX: scaleX,
          scaleY: scaleY,
          duration: 0.9,
          ease: 'power2.inOut',
        })
        // Fade out loader overlay
        .to(
          loaderRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.2'
        )
    }

    // Wait for DOM to be ready and minimum loading time
    const timer = setTimeout(() => {
      // Use multiple requestAnimationFrame calls to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            animateToHeader()
          })
        })
      })
    }, 1200) // Minimum loading time

    return () => clearTimeout(timer)
  }, [isHomePage])

  if (!isHomePage || !isLoading) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-white via-gray-50 to-white flex flex-col items-center justify-center"
      style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
    >
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C71C22]/5 via-[#FCC22F]/5 to-[#C71C22]/5 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Welcome message - matches home page UI theme but with light background */}
        <div
          ref={messageRef}
          className="text-center"
          style={{ opacity: 0 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100/80 px-4 py-1.5 mb-3">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-[0.2em]">
              Welcome
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            <span className="block">Learn Share Market</span>
            <span className="block text-[#C71C22]">Zero to Mastery</span>
          </h2>
          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-[#C71C22] via-[#FCC22F] to-transparent" />
        </div>

        {/* Logo */}
        <div
          ref={logoRef}
          className="relative"
          style={{
            width: '200px',
            height: '200px',
            willChange: 'transform, opacity',
            opacity: 0,
          }}
        >
          <Image
            src="/static-media/logo.png"
            alt="Finanthropist Logo"
            width={200}
            height={200}
            className="w-full h-full object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
}

