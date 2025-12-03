import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type MovingOverlayOptions = {
  markers?: boolean
}

type SectionRects = {
  hero: DOMRect
  features: DOMRect
  webinar: DOMRect
  instructor: DOMRect
  wrapper: DOMRect
}

type SectionPositions = {
  hero: { left: number; top: number; width: number; height: number }
  features: { left: number }
  webinar: { left: number }
  instructor: { left: number }
}

const querySectionRects = (wrapper: HTMLElement): SectionRects | null => {
  
const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement | null
const featuresStatic =
  (document.querySelector('.features-static-image-container > div') as HTMLElement | null) ||
  (document.querySelector('.features-section .grid > div:first-child') as HTMLElement | null)
const webinarImg = document.querySelector('.webinar-section img') as HTMLElement | null
const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null

  if (!heroImg || !featuresStatic || !webinarImg || !instructorImg) return null

  return {
    hero: heroImg.getBoundingClientRect(),
    features: featuresStatic.getBoundingClientRect(),
    webinar: webinarImg.getBoundingClientRect(),
    instructor: instructorImg.getBoundingClientRect(),
    wrapper: wrapper.getBoundingClientRect(),
  }
}

const buildPositions = (rects: SectionRects): SectionPositions => {
  const { hero, features, webinar, instructor, wrapper } = rects
  return {
    hero: {
      left: hero.left - wrapper.left,
      top: hero.top - wrapper.top,
      width: hero.width,
      height: hero.height,
    },
    features: {
      left: features.left - wrapper.left,
    },
    webinar: {
      left: webinar.left - wrapper.left,
    },
    instructor: {
      left: instructor.left - wrapper.left,
    },
  }
}

export const computeInitialOverlayPlacement = (wrapper: HTMLElement) => {
  const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement | null
  if (!heroImg) return null
  const heroRect = heroImg.getBoundingClientRect()
  const wrapperRect = wrapper.getBoundingClientRect()

  return {
    top: heroRect.top - wrapperRect.top,
    left: heroRect.left - wrapperRect.left,
    width: heroRect.width,
    height: heroRect.height,
  }
}

export const initMovingImageOverlay = (
  wrapper: HTMLElement,
  moving: HTMLElement,
  options?: MovingOverlayOptions,
): (() => void) => {
  const { markers = false } = options || {}
  gsap.registerPlugin(ScrollTrigger)

  let cachedPositions: SectionPositions | null = null
  const imgEl = moving.querySelector('img') as HTMLImageElement | null
  const stateKey = '__overlayImageState__'
  const transitionKey = '__overlayImageTransition__'
  ;(moving as any)[stateKey] = 'fist'
  ;(moving as any)[transitionKey] = false

  const swapImage = (src: string, nextState: 'fist' | 'top' | 'webinar' | 'instructor') => {
    if (!imgEl) return
    const currentState = (moving as any)[stateKey] as 'fist' | 'top' | 'webinar' | 'instructor'
    const isTransitioning = Boolean((moving as any)[transitionKey])
    if (currentState === nextState || isTransitioning) return
    ;(moving as any)[transitionKey] = true
    gsap.to(moving, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        imgEl.src = src
        ;(moving as any)[stateKey] = nextState
        gsap.to(moving, {
          opacity: 1,
          duration: 0.25,
          onComplete: () => {
            ;(moving as any)[transitionKey] = false
          },
        })
      },
    })
  }

  const ensurePositions = (targetWrapper: HTMLElement = wrapper) => {
    const rects = querySectionRects(targetWrapper)
    if (!rects) return null
    cachedPositions = buildPositions(rects)
    gsap.set(moving, {
      left: cachedPositions.hero.left,
      top: cachedPositions.hero.top,
      width: cachedPositions.hero.width,
      height: cachedPositions.hero.height,
    })
    return cachedPositions
  }

  if (!ensurePositions()) {
    return () => {}
  }

  const heroToFeaturesTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'overlay-hero-to-features',
      trigger: '.hero-section',
      start: 'top top+=64',
      endTrigger: '.features-section',
      end: 'top top+=64',
      scrub: true,
      invalidateOnRefresh: true,
      markers,
      onRefresh: () => ensurePositions(wrapper),
      onUpdate: (self) => {
        const progress = Number(self.progress) || 0
        const direction = (self as any)?.direction || 0
        const midpoint = 0.5
        if (direction > 0 && progress >= midpoint) {
          swapImage('/static-media/Sammer-top.png', 'top')
        } else if (direction < 0 && progress <= midpoint) {
          swapImage('/static-media/sameer-fist.png', 'fist')
        }
      },
    },
  })

  heroToFeaturesTl.to(moving, {
    left: () => {
      const positions = cachedPositions ?? ensurePositions()
      return positions ? positions.features.left : 0
    },
  })

  const featuresToWebinarTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'overlay-features-to-webinar',
      trigger: '.webinar-section',
      start: 'top bottom',
      end: 'top top+=64',
      scrub: true,
      invalidateOnRefresh: true,
      markers,
      onRefresh: () => ensurePositions(wrapper),
      onUpdate: (self) => {
        const progress = Number(self.progress) || 0
        const direction = (self as any)?.direction || 0
        const midpoint = 0.5
        if (direction > 0 && progress >= midpoint) {
          swapImage('/static-media/sameer-webinar.png', 'webinar')
        } else if (direction < 0 && progress <= midpoint) {
          swapImage('/static-media/Sammer-top.png', 'top')
        }
      },
    },
  })

  featuresToWebinarTl.to(moving, {
    left: () => {
      const positions = cachedPositions ?? ensurePositions()
      return positions ? positions.webinar.left : 0
    },
  })

  const webinarToInstructorTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'overlay-webinar-to-instructor',
      trigger: '.webinar-section',
      start: 'top top',
      endTrigger: '.instructor-bio-section',
      end: 'top top+=64',
      scrub: true,
      invalidateOnRefresh: true,
      markers,
      onRefresh: () => ensurePositions(wrapper),
      onUpdate: (self) => {
        const progress = Number(self.progress) || 0
        const direction = (self as any)?.direction || 0
        const midpoint = 0.5
        if (direction > 0 && progress >= midpoint) {
          swapImage('/static-media/sameer-instructor.png', 'instructor')
        } else if (direction < 0 && progress <= midpoint) {
          swapImage('/static-media/sameer-webinar.png', 'webinar')
        }
      },
      onLeave: () => {
        const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null
        gsap.to(instructorImg, { opacity: 1, duration: 0.1 })
        gsap.to(moving, { opacity: 0, duration: 0.1 })
      },
      onEnterBack: () => {
        const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null
        gsap.to(instructorImg, { opacity: 0, duration: 0 })
        gsap.to(moving, { opacity: 1, duration: 0.1 })
      },
    },
  })

  webinarToInstructorTl.to(moving, {
    left: () => {
      const positions = cachedPositions ?? ensurePositions()
      return positions ? positions.instructor.left : 0
    },
  })

  const handleResize = () => {
    ensurePositions()
    ScrollTrigger.refresh()
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
    heroToFeaturesTl.kill()
    featuresToWebinarTl.kill()
    webinarToInstructorTl.kill()
  }
}


