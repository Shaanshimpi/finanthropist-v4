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
      start: 'top top',
      endTrigger: '.features-section',
      end: 'top top',
      scrub: true,
      markers,
      onUpdate: (self) => {
        const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
        if (!featuresStatic) return
        const p = self.progress
        if (p > 0.98) {
          gsap.to(featuresStatic, { opacity: 1, duration: 0.2 })
        } else if (p < 0.02) {
          gsap.to(featuresStatic, { opacity: 0, duration: 0.2 })
          gsap.set(movingImage, { scaleX: 1 })
          setCurrentImage('/static-media/sameer-fist.png')
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
      markers,
      onEnter: () => {
        const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
        if (featuresStatic) gsap.to(featuresStatic, { opacity: 0, duration: 0.2 })
        setCurrentImage('/static-media/Sammer-top.png')
        gsap.set(movingImage, { opacity: 1, scaleX: -1 })
      },
      onEnterBack: () => {
        const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
        if (featuresStatic) gsap.to(featuresStatic, { opacity: 1, duration: 0.2 })
      },
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
        setCurrentImage('/static-media/sameer-fist.png')
        gsap.set(movingImage, { opacity: 1, scaleX: 1 })
      },
      onEnterBack: () => {
        setCurrentImage('/static-media/Sammer-top.png')
        gsap.set(movingImage, { opacity: 1, scaleX: -1 })
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

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}


