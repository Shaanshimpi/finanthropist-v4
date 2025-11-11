import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type FeaturesTimelineParams = {
  delay?: number
  markers?: boolean
  featuresSection?: HTMLElement | null
  featureItems?: NodeListOf<Element> | null
}

export const initFeaturesCardsTimeline = (params: FeaturesTimelineParams = {}) => {
  if (typeof window === 'undefined') return () => {}

  const {
    delay = 500,
    markers = false,
    featuresSection: providedSection,
    featureItems: providedItems,
  } = params

  let trigger: ScrollTrigger | null = null
  let timeoutId: number | null = null
  let initialized = false

  const init = () => {
    if (initialized) return

    const sectionEl =
      providedSection ??
      (document.querySelector('.features-section') as HTMLElement | null)
    const items =
      providedItems ?? document.querySelectorAll('.feature-item')

    if (!sectionEl || items.length === 0) {
      if (!providedSection && !providedItems) {
        timeoutId = window.setTimeout(init, 250)
      }
      return
    }

    initialized = true
    timeoutId = null

    const sectionHeight = window.innerHeight - 64
    const cardHeight = sectionHeight * 0.5
    const totalScrollDistance = items.length * cardHeight

    const nextSection = document.querySelector('.webinar-section')

    let currentCardIndex = 0

    const scrollTriggerOptions: ScrollTrigger.Vars = {
      id: 'features-pin',
      trigger: sectionEl as Element,
      start: 'top top',
      markers,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const targetCardIndex = Math.min(
          Math.floor(progress * items.length),
          items.length - 1
        )

        if (targetCardIndex !== currentCardIndex) {
          currentCardIndex = targetCardIndex

          items.forEach((item, index) => {
            const htmlItem = item as HTMLElement

            if (index === currentCardIndex) {
              gsap.to(htmlItem, {
                opacity: 1,
                y: 0,
                scale: 1,
                z: items.length * 10,
                duration: 0.4,
                ease: 'power2.out',
              })
            } else if (index < currentCardIndex) {
              const stackedIndex = currentCardIndex - index
              gsap.to(htmlItem, {
                opacity: 0,
                y: 0,
                scale: 1,
                z: (items.length - stackedIndex) * 10,
                duration: 0.4,
                ease: 'power2.out',
              })
            } else {
              gsap.to(htmlItem, {
                opacity: 0,
                y: 100,
                scale: 0.9,
                z: 0,
                duration: 0.3,
                ease: 'power2.in',
              })
            }
          })
        }
      },
    }

    if (nextSection) {
      scrollTriggerOptions.endTrigger = nextSection
      scrollTriggerOptions.end = 'top top'
    } else {
      scrollTriggerOptions.end = `+=${totalScrollDistance}`
    }

    trigger = ScrollTrigger.create(scrollTriggerOptions)

    items.forEach((item, index) => {
      const htmlItem = item as HTMLElement
      gsap.set(htmlItem, {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        transformOrigin: 'center',
        willChange: 'transform',
      })

      if (index === 0) {
        gsap.set(htmlItem, {
          opacity: 1,
          y: 0,
          scale: 1,
          z: items.length * 10,
        })
      } else {
        gsap.set(htmlItem, {
          opacity: 0,
          y: 100,
          scale: 0.9,
          z: 0,
        })
      }
    })

    ScrollTrigger.refresh()
  }

  timeoutId = window.setTimeout(init, delay)

  return () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId)
    }
    if (trigger) {
      trigger.kill()
    }
    initialized = false
  }
}

