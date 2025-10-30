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

  // Hero -> Features
  ScrollTrigger.create({
    id: 'hero-to-features',
    trigger: '.features-section',
    start: () => getCenteredTopOffset(),
    end: () => getCenteredTopOffset(),
    markers,
    onEnter: () => {
      const featuresLeft = document.querySelector('.features-section .grid > div:first-child') as HTMLElement | null
      const featuresStaticImageContainer = document.querySelector('.features-static-image-container') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!featuresLeft || !initialHeroPos || !container) return
      const featuresRect = featuresLeft.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const centerY = featuresRect.top + featuresRect.height / 2 - initialHeroPos.height / 2
      gsap.to(movingImage, {
        left: featuresRect.left - containerRect.left,
        top: centerY - containerRect.top,
        width: initialHeroPos.width,
        height: initialHeroPos.height,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(movingImage, { opacity: 0 })
          if (featuresStaticImageContainer) {
            const fadeTarget = featuresStaticImageContainer.querySelector('div') as HTMLElement | null
            if (fadeTarget) gsap.to(fadeTarget, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
          }
        },
      })
    },
    onEnterBack: () => {
      const featuresStaticImageContainer = document.querySelector('.features-static-image-container') as HTMLElement | null
      if (!featuresStaticImageContainer) return
      const container = movingImage.parentElement as HTMLElement | null
      const heroImg = document.querySelector('.hero-section .hero-right-image img') as HTMLElement | null
      if (!container || !heroImg) return
      const imgRect = heroImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      gsap.to(featuresStaticImageContainer.querySelector('div') as HTMLElement, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          setCurrentImage('/static-media/sameer-fist.png')
          gsap.set(movingImage, { opacity: 1, scaleX: 1 })
          gsap.to(movingImage, {
            left: imgRect.left - containerRect.left,
            top: imgRect.top - containerRect.top,
            width: imgRect.width,
            height: imgRect.height,
            duration: 0.3,
            ease: 'power2.inOut',
          })
        },
      })
    },
  })

  // Features -> Webinar
  ScrollTrigger.create({
    id: 'features-to-webinar',
    trigger: '.webinar-section',
    start: () => getCenteredTopOffset(),
    end: () => getCenteredTopOffset(),
    markers,
    onEnter: () => {
      const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
      const webinarImg = document.querySelector('.webinar-section img') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (featuresStatic) gsap.to(featuresStatic, { opacity: 0, duration: 0.2, ease: 'power2.inOut' })
      if (!webinarImg || !container) return
      const imgRect = webinarImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setCurrentImage('/static-media/Sammer-top.png')
      gsap.set(movingImage, { opacity: 1, scaleX: -1 })
      gsap.to(movingImage, {
        left: imgRect.left - containerRect.left,
        top: imgRect.top - containerRect.top,
        width: imgRect.width,
        height: imgRect.height,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    },
    onLeaveBack: () => {
      const featuresLeft = document.querySelector('.features-section .grid > div:first-child') as HTMLElement | null
      const featuresStatic = document.querySelector('.features-static-image-container > div') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!featuresLeft || !initialHeroPos || !container) return
      const featuresRect = featuresLeft.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const centerY = featuresRect.top + featuresRect.height / 2 - initialHeroPos.height / 2
      setCurrentImage('/static-media/Sammer-top.png')
      gsap.set(movingImage, { opacity: 1, scaleX: 1 })
      gsap.to(movingImage, {
        left: featuresRect.left - containerRect.left,
        top: centerY - containerRect.top,
        width: initialHeroPos.width,
        height: initialHeroPos.height,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          if (featuresStatic) gsap.to(featuresStatic, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
          gsap.set(movingImage, { opacity: 0 })
        },
      })
    },
  })

  // Webinar -> Instructor
  ScrollTrigger.create({
    id: 'webinar-to-instructor',
    trigger: '.instructor-bio-section',
    start: () => getCenteredTopOffset(),
    end: () => getCenteredTopOffset(),
    markers,
    onEnter: () => {
      const instructorImg = document.querySelector('.instructor-bio-section img') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!instructorImg || !container) return
      const imgRect = instructorImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setCurrentImage('/static-media/sameer-fist.png')
      gsap.set(movingImage, { opacity: 1, scaleX: 1 })
      gsap.to(movingImage, {
        left: imgRect.left - containerRect.left,
        top: imgRect.top - containerRect.top,
        width: imgRect.width,
        height: imgRect.height,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    },
    onLeaveBack: () => {
      const webinarImg = document.querySelector('.webinar-section img') as HTMLElement | null
      const container = movingImage.parentElement as HTMLElement | null
      if (!webinarImg || !container) return
      const imgRect = webinarImg.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setCurrentImage('/static-media/Sammer-top.png')
      gsap.set(movingImage, { opacity: 1, scaleX: -1 })
      gsap.to(movingImage, {
        left: imgRect.left - containerRect.left,
        top: imgRect.top - containerRect.top,
        width: imgRect.width,
        height: imgRect.height,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    },
  })

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}


