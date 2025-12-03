'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { computeInitialOverlayPlacement, initMovingImageOverlay } from './animations/moving/initMovingImageOverlay'
import gsap from 'gsap'

// All moving images that need to be preloaded
const MOVING_IMAGES = [
  '/static-media/sameer-fist.png',
  '/static-media/Sammer-top.png',
  '/static-media/sameer-webinar.png',
  '/static-media/sameer-instructor.png',
]

// Preload all moving images
const preloadMovingImages = (): Promise<void> => {
  return new Promise((resolve) => {
    const images = MOVING_IMAGES.map((src) => {
      const img = new Image()
      img.src = src
      return img
    })

    // Wait for all images to load
    Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolveImg) => {
            if (img.complete) {
              resolveImg()
            } else {
              img.onload = () => resolveImg()
              img.onerror = () => resolveImg() // Resolve even on error to not block
            }
          }),
      ),
    ).then(() => resolve())
  })
}

export const MovingImageOverlay: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const movingRef = useRef<HTMLDivElement>(null)
  const [initialPlacement, setInitialPlacement] = useState({ top: 0, left: 0 })
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const moving = movingRef.current
    if (!wrapper || !moving) return

    const placement = computeInitialOverlayPlacement(wrapper)
    if (placement) {
      setInitialPlacement({ top: placement.top, left: placement.left })
      gsap.set(moving, { width: placement.width, height: placement.height })
    }
  }, [])

  // Preload images on mount
  useEffect(() => {
    preloadMovingImages().then(() => {
      setImagesLoaded(true)
    })
  }, [])

  // Initialize animation only after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return

    const wrapper = wrapperRef.current
    const moving = movingRef.current
    if (!wrapper || !moving) return

    const cleanup = initMovingImageOverlay(wrapper, moving, {
      markers: false,
    })

    gsap.to(moving, { opacity: 1, duration: 0, ease: 'power2.out' })
    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  }, [imagesLoaded])

  return (
    <div
      ref={wrapperRef}
      className="moving-image-overlay-wrapper fixed inset-0 z-40 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      <div
        ref={movingRef}
        className="absolute will-change-transform"
        style={{ opacity: 0, top: `${initialPlacement.top}px`, left: `${initialPlacement.left}px` }}
      >
        <img
          src="/static-media/sameer-fist.png"
          alt="Moving Instructor Image"
          className="w-full h-full object-contain object-bottom"
          loading="eager"
        />
      </div>
    </div>
  )
}


