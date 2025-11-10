'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { computeInitialOverlayPlacement, initMovingImageOverlay } from './animations/moving/initMovingImageOverlay'
import gsap from 'gsap'
export const MovingImageOverlay: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const movingRef = useRef<HTMLDivElement>(null)
  const [initialPlacement, setInitialPlacement] = useState({ top: 0, left: 0 })

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

  useEffect(() => {
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
  }, [])

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


