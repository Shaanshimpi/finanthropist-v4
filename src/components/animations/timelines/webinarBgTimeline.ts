import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const initWebinarBackgroundTimeline = () => {
  const webinarSection = document.querySelector('.webinar-section') as HTMLElement | null
  const bgWrapper = document.querySelector('.page-bg-wrapper') as HTMLElement | null

  if (!webinarSection || !bgWrapper) return

  bgWrapper.style.background = 'linear-gradient(to bottom right, #0f172a, #111827, #0f172a)'

  ScrollTrigger.create({
    trigger: webinarSection,
    start: 'top 50%',
    end: 'top 50%',
    onEnter: () => {
      gsap.to(bgWrapper, {
        background: 'linear-gradient(to bottom right, #ffffff, #ffffff, #ffffff)',
        duration: 1,
        ease: 'power2.inOut',
      })
      webinarSection.classList.add('on-white-bg')
      const featuresSection = document.querySelector('.features-section') as HTMLElement | null
      if (featuresSection) featuresSection.classList.add('on-white-bg')

      const fadeOverlays = document.querySelectorAll('.fade-overlay')
      fadeOverlays.forEach((overlay) => {
        gsap.to(overlay as HTMLElement, {
          background:
            'linear-gradient(to top, #ffffff 0%, #ffffff 40%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0.7) 80%, transparent 100%)',
          duration: 1,
          ease: 'power2.inOut',
        })
      })

      const webinarContent = document.querySelectorAll('.webinar-content, .webinar-title')
      webinarContent.forEach((el) => {
        gsap.to(el as HTMLElement, {
          color: '#111827',
          duration: 0.8,
          ease: 'power2.inOut',
        })
      })

      const webinarBadge = document.querySelector('.webinar-badge') as HTMLElement | null
      if (webinarBadge) {
        gsap.to(webinarBadge, {
          background: 'rgba(252, 194, 47, 0.15)',
          borderColor: 'rgba(252, 194, 47, 0.3)',
          duration: 0.8,
          ease: 'power2.inOut',
        })
      }

      const webinarBadgeText = webinarBadge?.querySelector('span') as HTMLElement | undefined
      if (webinarBadgeText) {
        gsap.to(webinarBadgeText, {
          color: '#991b1b',
          fontWeight: '700',
          duration: 0.8,
          ease: 'power2.inOut',
        })
      }

      const webinarCards = document.querySelectorAll('.webinar-card')
      webinarCards.forEach((card) => {
        const el = card as HTMLElement
        el.style.backgroundColor = '#fefce8'
        el.style.borderColor = 'rgba(252, 194, 47, 0.4)'
        gsap.to(el, {
          backgroundColor: '#fff7ed',
          borderColor: 'rgba(252, 194, 47, 0.5)',
          duration: 1,
          ease: 'power2.inOut',
        })
      })

      const webinarCardTexts = document.querySelectorAll('.webinar-card-text')
      webinarCardTexts.forEach((text) => {
        gsap.to(text as HTMLElement, {
          color: '#1f2937',
          duration: 1,
          ease: 'power2.inOut',
        })
      })
    },
    onLeaveBack: () => {
      gsap.to(bgWrapper, {
        background: 'linear-gradient(to bottom right, #0f172a, #111827, #0f172a)',
        duration: 1,
        ease: 'power2.inOut',
      })
      webinarSection.classList.remove('on-white-bg')
      const featuresSection = document.querySelector('.features-section') as HTMLElement | null
      if (featuresSection) featuresSection.classList.remove('on-white-bg')

      const fadeOverlays = document.querySelectorAll('.fade-overlay')
      fadeOverlays.forEach((overlay) => {
        gsap.to(overlay as HTMLElement, {
          background:
            'linear-gradient(to top, #0f172a 0%, #0f172a 40%, rgba(15, 23, 42, 0.9) 60%, rgba(15, 23, 42, 0.7) 80%, transparent 100%)',
          duration: 1,
          ease: 'power2.inOut',
        })
      })

      const webinarContent = document.querySelectorAll('.webinar-content, .webinar-title')
      webinarContent.forEach((el) => {
        gsap.to(el as HTMLElement, {
          color: '#ffffff',
          duration: 0.8,
          ease: 'power2.inOut',
        })
      })

      const webinarBadge = document.querySelector('.webinar-badge') as HTMLElement | null
      if (webinarBadge) {
        gsap.to(webinarBadge, {
          background: 'rgba(30, 41, 59, 0.5)',
          borderColor: 'rgba(51, 65, 85, 0.5)',
          duration: 0.8,
          ease: 'power2.inOut',
        })
      }

      const webinarBadgeText = webinarBadge?.querySelector('span') as HTMLElement | undefined
      if (webinarBadgeText) {
        gsap.to(webinarBadgeText, {
          color: 'rgb(203, 213, 225)',
          fontWeight: '600',
          duration: 0.8,
          ease: 'power2.inOut',
        })
      }

      const webinarCards = document.querySelectorAll('.webinar-card')
      webinarCards.forEach((card) => {
        const el = card as HTMLElement
        el.style.backgroundColor = '#1e293b'
        el.style.borderColor = 'rgba(71, 85, 105, 0.3)'
        gsap.to(el, {
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
          borderColor: 'rgba(51, 65, 85, 0.4)',
          duration: 1,
          ease: 'power2.inOut',
        })
      })

      const webinarCardTexts = document.querySelectorAll('.webinar-card-text')
      webinarCardTexts.forEach((text) => {
        gsap.to(text as HTMLElement, {
          color: '#ffffff',
          duration: 1,
          ease: 'power2.inOut',
        })
      })
    },
  })
}


