import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getCenteredTopOffset } from '../utils/offsets'
import { getHeroImageRelativePos } from '../utils/positions'

type SetImageSrc = (src: string) => void

type MovingImageOptions = {
  markers?: boolean
}

// Initializes moving image transitions across sections using absolute positioning
// Returns a cleanup function to remove listeners created here
export const initMovingImageTransitions = (
  movingImage: HTMLElement,
  setCurrentImage: SetImageSrc,
  options?: MovingImageOptions,
): (() => void) => {
  const { markers = false } = options || {}
  // Helper to set initial position over hero image
  const setInitialPosition = () => {
    const container = movingImage.parentElement as HTMLElement | null
    const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement | null
    if (!container || !heroImg) return
    const imgRect = heroImg.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    gsap.set(movingImage, {
      left: imgRect.left - containerRect.left,
      top: imgRect.top - containerRect.top,
      width: imgRect.width,
      height: imgRect.height,
      opacity: 1,
    })
  }

  // Resize updates for hero state only
  const handleResize = () => {
    const container = movingImage.parentElement as HTMLElement | null
    if (!container) return
    const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement | null
    if (heroImg && window.scrollY < 500) {
      const imgRect = heroImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      gsap.set(movingImage, {
        left: imgRect.left - containerRect.left,
        top: imgRect.top - containerRect.top,
        width: imgRect.width,
        height: imgRect.height,
        opacity: 1,
      })
    }
  }

  // Wait for layout then set initial position
  requestAnimationFrame(() => requestAnimationFrame(setInitialPosition))
  window.addEventListener('resize', handleResize)

  const initialHeroPos = getHeroImageRelativePos()

  // Only features keeps a static image. Hide hero/webinar/instructor static images.
  const heroStatic = document.querySelector('.hero-section .hero-right-image img') as HTMLElement | null
  const webinarStatics = document.querySelectorAll('.webinar-section img')
  const instructorStatics = document.querySelectorAll('.instructor-bio-section img')
  if (heroStatic) gsap.set(heroStatic, { opacity: 0 })
  webinarStatics.forEach((img) => gsap.set(img as HTMLElement, { opacity: 0 }))
  instructorStatics.forEach((img) => gsap.set(img as HTMLElement, { opacity: 0 }))

  // Hero -> Features (scrub)
  const heroToFeaturesTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'hero-to-features',
      trigger: '.hero-section',
      start: '5% 10%',
      endTrigger: '.features-section',
      end: '5% 10%',
      scrub: true,
      markers,
      onUpdate: (self) => {
        const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
        if (!featuresStatic) return
        const p = self.progress
        // Maintain a simple state to avoid repeated swaps within the same region
        const stateKey = '__heroFeatImgState__'
        const currentState = (movingImage as any)[stateKey] as 'fist' | 'top' | undefined
        const setState = (s: 'fist' | 'top') => { (movingImage as any)[stateKey] = s }
        const direction = (self as any)?.direction || 0 // 1 down, -1 up
        const reverseHandoffDoneHF = Boolean((movingImage as any)['__featuresReverseHandoff__'])

        // If reverse overlap handoff already completed while still in features span,
        // keep static visible and moving hidden, but allow re-show at the very start boundary
        if (direction < 0 && reverseHandoffDoneHF) {
          const pGuard = self.progress
          if (pGuard > 0.02) {
            gsap.to(featuresStatic, { opacity: 1, duration: 0.2 })
            gsap.to(movingImage, { opacity: 0, duration: 0.2 })
            return
          }
          // We reached the hero boundary; clear handoff so moving can reappear in hero
          ;(movingImage as any)['__featuresReverseHandoff__'] = false
        }
        try {
          const featuresLeft = document.querySelector('.features-section .grid > div:first-child') as HTMLElement | null
          const container = movingImage.parentElement as HTMLElement | null
          const featuresRect = featuresLeft?.getBoundingClientRect()
          const containerRect = container?.getBoundingClientRect()
          const currentRect = movingImage.getBoundingClientRect()
          const centerY = featuresRect && initialHeroPos ? (featuresRect.top + featuresRect.height / 2 - initialHeroPos.height / 2) : undefined
          // Debug logs for hero->features scrub
          // eslint-disable-next-line no-console
          console.log('[hero->features:onUpdate]', {
            progress: p.toFixed(3),
            featuresRect,
            containerRect,
            movingRect: currentRect,
            centerY,
          })
        } catch {}
        if (p > 0.98) {
          gsap.to(featuresStatic, { opacity: 1, duration: 0.2 })
          gsap.set(movingImage, { opacity: 0 })
        } else if (p < 0.02) {
          gsap.to(featuresStatic, { opacity: 0, duration: 0.2 })
          // At the very start, we want fist image visible
          if (currentState !== 'fist') {
            gsap.set(movingImage, { opacity: 0 })
            setCurrentImage('/static-media/sameer-fist.png')
            gsap.to(movingImage, { opacity: 1, duration: 0.2 })
            setState('fist')
          } else {
            gsap.set(movingImage, { opacity: 1 })
          }
        } else {
          // During the rest of the span, keep moving image visible so reverse scrub is smooth
          gsap.set(movingImage, { opacity: 1 , duration: 0.2 })
          gsap.to(featuresStatic, { opacity: 0, duration: 0.2 })
          const midpoint = 0.5
          if (direction > 0 && p >= midpoint && currentState !== 'top') {
            // Scrolling down past midpoint: fade to Sammer-top
            gsap.to(movingImage, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                setCurrentImage('/static-media/Sammer-top.png')
                gsap.to(movingImage, { opacity: 1, duration: 0.2 })
              },
            })
            setState('top')
          } else if (direction < 0 && p <= midpoint && currentState !== 'fist') {
            // Scrolling up before midpoint: fade back to sameer-fist
            gsap.to(movingImage, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                setCurrentImage('/static-media/sameer-fist.png')
                gsap.to(movingImage, { opacity: 1, duration: 0.2 })
              },
            })
            setState('fist')
          }
        }
      },
    },
  })
  heroToFeaturesTl.to(movingImage, {
    left: () => {
      const featuresLeft = document.querySelector('.features-section .grid > div:first-child') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!featuresLeft || !container || !initialHeroPos) return 0
      const featuresRect = featuresLeft.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return featuresRect.left - containerRect.left
    },
    top: () => {
      const featuresLeft = document.querySelector('.features-section .grid > div:first-child') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!featuresLeft || !container || !initialHeroPos) return 0
      const featuresRect = featuresLeft.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const centerY = featuresRect.top + featuresRect.height / 2 - initialHeroPos.height / 2
      return centerY - containerRect.top
    },
    width: () => initialHeroPos?.width ?? (movingImage.getBoundingClientRect().width || 0),
    height: () => initialHeroPos?.height ?? (movingImage.getBoundingClientRect().height || 0),
  })

  // Continue with subsequent moving image animations

  // Features -> Webinar (scrub)
  const featuresToWebinarTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'features-to-webinar',
      trigger: '.features-section',
      start: 'top top',
      endTrigger: '.webinar-section',
      end: 'top top',
      scrub: true,
      invalidateOnRefresh: true,
      markers,
      onEnter: () => {
        // Hide features static and show moving image; swap handled mid-way in onUpdate
        const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
        if (featuresStatic) gsap.to(featuresStatic, { opacity: 0, duration: 0.2 })
        gsap.to(movingImage, { opacity: 1, duration: 0.2, delay: 0.1 })
        gsap.set(movingImage, { position: 'absolute' })
      },
      onEnterBack: () => {
        // Back into features pin → reveal static, hide moving image and reset to Sammer-top
        // Defer revealing the features static until overlap handoff in onUpdate
        // setCurrentImage('/static-media/Sammer-top.png')
        // gsap.to(movingImage, { opacity: 0, duration: 0.2 })
        gsap.set(movingImage, { position: 'absolute' })
      },
      onUpdate: (self) => {
        try {
          // If we already handed off to features static while reversing, enforce visibility and exit early
          const revHandoffDone = Boolean((movingImage as any)['__featuresReverseHandoff__'])
          const pEarly = Number(self?.progress) || 0
          const dirEarly = (self as any)?.direction || 0
          if (dirEarly < 0 && revHandoffDone) {
            const featuresStaticHold = document.querySelector('.features-static-image-container > div') as HTMLElement | null
            if (featuresStaticHold) gsap.to(featuresStaticHold, { opacity: 1, duration: 0.2 })
            gsap.to(movingImage, { opacity: 0, duration: 0.2 })
            return
          }

          // Prefer the actual static image box for precise overlap during pin
          const featuresStaticBox = document.querySelector('.features-static-image-container > div') as HTMLElement | null
          const featuresLeft = (featuresStaticBox ?? document.querySelector('.features-section .grid > div:first-child')) as HTMLElement | null
          const container = movingImage.parentElement as HTMLElement | null
          const featuresRect = featuresLeft?.getBoundingClientRect()
          const containerRect = container?.getBoundingClientRect()
          const movingRect = movingImage.getBoundingClientRect()
          // Directly match the static image box; no hero-size centering math
          // Debug logs for features pin scroll
          // eslint-disable-next-line no-console
          console.log('[features pin:onUpdate]', {
            progress: self?.progress?.toFixed ? self.progress.toFixed(3) : self?.progress,
            scrollY: window.scrollY,
            featuresRect,
            containerRect,
            movingRect,
            relLeft: featuresRect && containerRect ? featuresRect.left - containerRect.left : null,
            relTop: featuresRect && containerRect ? featuresRect.top - containerRect.top : null,
          })
          if (featuresRect && containerRect && Number(self?.progress) < 0.05) {
            // Keep moving image exactly overlapping the static image relative to container
            gsap.set(movingImage, {
              left: featuresRect.left - containerRect.left,
              top: featuresRect.top - containerRect.top,
              width: featuresRect.width,
              height: featuresRect.height,
            })
          }
        } catch {}
        // Midway fade swap between Sammer-top and sameer-webinar
        const p = Number(self?.progress) || 0
        const direction = (self as any)?.direction || 0
        const stateKey = '__featuresWebinarImgState__'
        const currentState = (movingImage as any)[stateKey] as 'top' | 'webinar' | undefined
        const setState = (s: 'top' | 'webinar') => { (movingImage as any)[stateKey] = s }

        const midpoint = 0.5
        if (direction > 0 && p >= midpoint && currentState !== 'webinar') {
          // Scrolling down past midpoint: fade to webinar image
          gsap.to(movingImage, {
            opacity: 0,
            duration: 0.15,
            onComplete: () => {
              setCurrentImage('/static-media/sameer-webinar.png')
              gsap.to(movingImage, { opacity: 1, duration: 0.2 })
            },
          })
          setState('webinar')
        } else if (direction < 0 && p <= midpoint && currentState !== 'top') {
          // Scrolling up before midpoint: fade back to Sammer-top
          gsap.to(movingImage, {
            opacity: 0,
            duration: 0.15,
            onComplete: () => {
              setCurrentImage('/static-media/Sammer-top.png')
              gsap.to(movingImage, { opacity: 1, duration: 0.2 })
            },
          })
          setState('top')
        }

        // Reverse handoff: only reveal features static AFTER moving image overlaps the static box
        const handoffKey = '__featuresReverseHandoff__'
        const handoffDone = Boolean((movingImage as any)[handoffKey])
        const featuresStaticAtEnd = document.querySelector('.features-static-image-container > div') as HTMLElement | null
        if (direction < 0 && p <= 0.08 && featuresStaticAtEnd && !handoffDone) {
          const mr = movingImage.getBoundingClientRect()
          const fr = featuresStaticAtEnd.getBoundingClientRect()
          const dx = Math.abs((mr.left + mr.width / 2) - (fr.left + fr.width / 2))
          const dy = Math.abs((mr.top + mr.height / 2) - (fr.top + fr.height / 2))
          const dw = Math.abs(mr.width - fr.width)
          const dh = Math.abs(mr.height - fr.height)
          const overlap = dx < 2 && dy < 2 && dw < 2 && dh < 2
          if (overlap) {
            gsap.to(featuresStaticAtEnd, { opacity: 1, duration: 0.2 })
            gsap.to(movingImage, { opacity: 0, duration: 0.2 })
            ;(movingImage as any)[handoffKey] = true
          }
        }
        // Reset handoff flag when moving forward again so reverse logic can run next time
        if (direction > 0 && p >= 0.12) {
          (movingImage as any)[handoffKey] = false
        }
      },
      // No onLeave: end state achieved by scrub tween below
      
    },
  })
  featuresToWebinarTl.to(movingImage, {
    left: () => {
      const webinarImg = document.querySelector('.webinar-section img') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!webinarImg || !container) return 0
      const imgRect = webinarImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return imgRect.left - containerRect.left
    },
    top: () => {
      const webinarImg = document.querySelector('.webinar-section img') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!webinarImg || !container) return 0
      const imgRect = webinarImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return imgRect.top - containerRect.top
    },
    width: () => {
      const webinarImg = document.querySelector('.webinar-section img') as HTMLElement | null
      return webinarImg?.getBoundingClientRect().width || movingImage.getBoundingClientRect().width
    },
    height: () => {
      const webinarImg = document.querySelector('.webinar-section img') as HTMLElement | null
      return webinarImg?.getBoundingClientRect().height || movingImage.getBoundingClientRect().height
    },
  })

  // Webinar -> Instructor (scrub)
  const webinarToInstructorTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'webinar-to-instructor',
      trigger: '.webinar-section',
      start: 'top top',
      endTrigger: '.instructor-bio-section',
      end: 'top top',
      scrub: true,
      markers,
      onEnter: () => {
        // Ensure moving image visible; swaps handled in onUpdate
        gsap.set(movingImage, { opacity: 1 })
      },
      onEnterBack: () => {
        gsap.set(movingImage, { opacity: 1, scaleX: 1 })
      },
      onUpdate: (self) => {
        try {
          const p = Number(self?.progress) || 0
          const direction = (self as any)?.direction || 0
          const stateKey = '__webinarInstructorImgState__'
          const currentState = (movingImage as any)[stateKey] as 'webinar' | 'instructor' | undefined
          const setState = (s: 'webinar' | 'instructor') => { (movingImage as any)[stateKey] = s }

          const midpoint = 0.5
          if (direction > 0 && p >= midpoint && currentState !== 'instructor') {
            // Scrolling down past midpoint: fade to instructor image
            gsap.to(movingImage, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                setCurrentImage('/static-media/sameer-fist.png')
                gsap.to(movingImage, { opacity: 1, duration: 0.2 })
              },
            })
            setState('instructor')
          } else if (direction < 0 && p <= midpoint && currentState !== 'webinar') {
            // Scrolling up before midpoint: fade back to webinar image
            gsap.to(movingImage, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                setCurrentImage('/static-media/sameer-webinar.png')
                gsap.to(movingImage, { opacity: 1, duration: 0.2 })
              },
            })
            setState('webinar')
          }

          // Clamp ends for robustness
          if (p > 0.98 && currentState !== 'instructor') {
            setCurrentImage('/static-media/sameer-fist.png')
            setState('instructor')
          } else if (p < 0.02 && currentState !== 'webinar') {
            setCurrentImage('/static-media/sameer-webinar.png')
            setState('webinar')
          }
        } catch {}
      },
    },
  })
  webinarToInstructorTl.to(movingImage, {
    left: () => {
      const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!instructorImg || !container) return 0
      const imgRect = instructorImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return imgRect.left - containerRect.left
    },
    top: () => {
      const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!instructorImg || !container) return 0
      const imgRect = instructorImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return imgRect.top - containerRect.top
    },
    width: () => {
      const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null
      return instructorImg?.getBoundingClientRect().width || movingImage.getBoundingClientRect().width
    },
    height: () => {
      const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null
      return instructorImg?.getBoundingClientRect().height || movingImage.getBoundingClientRect().height
    },
  })

  // Persistent overlap during Features pin using ticker (runs every frame while pin is active)
  const featuresPinTicker = () => {
    try {
      const pin =
        ScrollTrigger.getById('features-pin') ||
        ScrollTrigger.getAll().find((t) => {
          const trig = t.trigger as HTMLElement | null
          return !!t.pin && !!trig && trig.classList?.contains('features-section')
        })
      if (!pin || !pin.isActive) return

      const featuresStaticBox = document.querySelector('.features-static-image-container > div') as HTMLElement | null
      const targetEl = (featuresStaticBox ?? document.querySelector('.features-section .grid > div:first-child')) as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!targetEl || !container) return

      const targetRect = targetEl.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      gsap.set(movingImage, {
        left: targetRect.left - containerRect.left,
        top: targetRect.top - containerRect.top,
        width: targetRect.width,
        height: targetRect.height,
      })
    } catch {}
  }
  gsap.ticker.add(featuresPinTicker)

  // Ensure moving image fades when entering Features (both directions)
  ScrollTrigger.create({
    id: 'movingImage-fade-in-features',
    trigger: '.features-section',
    start: 'top top',
    endTrigger: '.webinar-section',
    end: 'top top',
    markers,
    onEnter: () => {
      gsap.to(movingImage, { opacity: 1, duration: 0.2, ease: 'power2.out' })
    },
    onEnterBack: () => {
      const handoffDone = Boolean((movingImage as any)['__featuresReverseHandoff__'])
      if (handoffDone) {
        // If we already handed off to static on reverse, keep moving hidden and static visible
        const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
        if (featuresStatic) gsap.to(featuresStatic, { opacity: 1, duration: 0.2, ease: 'power2.out' })
        gsap.to(movingImage, { opacity: 0, duration: 0.2, ease: 'power2.out' })
      } else {
        gsap.to(movingImage, { opacity: 1, duration: 0.2, ease: 'power2.out' })
      }
    },
    onLeaveBack: () => {
      // Do not reveal features static here; overlap handoff in features->webinar onUpdate handles it precisely
      // Keep moving image visible until overlap is detected
      gsap.to(movingImage, { opacity: 1, duration: 0.2, ease: 'power2.out' })
    },
  })

  return () => {
    window.removeEventListener('resize', handleResize)
    gsap.ticker.remove(featuresPinTicker)
  }
}


