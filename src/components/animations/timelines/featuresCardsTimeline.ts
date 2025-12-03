import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type FeaturesTimelineParams = {
  delay?: number
  featuresSection?: HTMLElement | null
  featureItems?: NodeListOf<Element> | null
}

export const initFeaturesCardsTimeline = (params: FeaturesTimelineParams = {}) => {
  if (typeof window === 'undefined') return () => {}

  const {
    delay = 500,
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

    let currentCardIndex = -1 // Start at -1 to force initial update
    let allowProgressUpdates = false // Flag to prevent progress updates until we've started from beginning
    let hasEnteredFromStart = false // Track if we've properly entered from the start

    const updateCardVisibility = (targetIndex: number) => {
      if (targetIndex === currentCardIndex) return
      currentCardIndex = targetIndex

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

    const scrollTriggerOptions: ScrollTrigger.Vars = {
      id: 'features-pin',
      trigger: sectionEl as Element,
      start: 'top top',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onEnter: () => {
        // When entering the section from above, always start at the first card
        hasEnteredFromStart = true
        currentCardIndex = -1
        updateCardVisibility(0)
        // Now we can allow progress-based updates
        allowProgressUpdates = true
      },
      onEnterBack: () => {
        // When scrolling back up into the section, reset to first card
        hasEnteredFromStart = true
        currentCardIndex = -1
        updateCardVisibility(0)
        allowProgressUpdates = true
      },
      onLeave: () => {
        // When leaving the section, reset the flag
        hasEnteredFromStart = false
        allowProgressUpdates = false
      },
      onLeaveBack: () => {
        // When leaving the section going back, reset the flag
        hasEnteredFromStart = false
        allowProgressUpdates = false
      },
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress))
        
        // CRITICAL: Never allow progress-based card selection until we've properly entered from start
        // This prevents jumping to a later card when the section is already in view on page load
        if (!hasEnteredFromStart) {
          // Force card 0 and keep it there until we properly enter
          if (currentCardIndex !== 0) {
            currentCardIndex = -1
            updateCardVisibility(0)
          }
          // Only enable if we're at the absolute start AND the trigger is active
          // This means we've scrolled to the section from above
          if (self.isActive && progress < 0.001) {
            hasEnteredFromStart = true
            allowProgressUpdates = true
          }
          return
        }
        
        // If we haven't allowed progress updates yet, check if we should
        if (!allowProgressUpdates) {
          // Only allow if we're at the start
          if (progress < 0.001) {
            allowProgressUpdates = true
            if (currentCardIndex !== 0) {
              currentCardIndex = -1
              updateCardVisibility(0)
            }
          } else {
            // Force card 0 until we reach the start
            if (currentCardIndex !== 0) {
              currentCardIndex = -1
              updateCardVisibility(0)
            }
          }
          return
        }

        // Now we can safely use progress to determine card index
        // But add a safety check: if progress is very small, ensure we're at card 0
        if (progress < 0.01 && currentCardIndex !== 0) {
          currentCardIndex = -1
          updateCardVisibility(0)
          return
        }

        const targetCardIndex = Math.min(
          Math.floor(progress * items.length),
          items.length - 1
        )
        updateCardVisibility(targetCardIndex)
      },
    }

    if (nextSection) {
      scrollTriggerOptions.endTrigger = nextSection
      scrollTriggerOptions.end = 'top top'
    } else {
      scrollTriggerOptions.end = `+=${totalScrollDistance}`
    }

    // Set initial card states first (before creating trigger)
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

    // Force initial state to card 0
    currentCardIndex = -1
    updateCardVisibility(0)

    trigger = ScrollTrigger.create(scrollTriggerOptions)

    // Refresh to recalculate positions
    ScrollTrigger.refresh()

    // After refresh, check trigger state and ensure we're at card 0
    // Use multiple requestAnimationFrame calls to ensure refresh has fully completed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (trigger) {
          const progress = trigger.progress
          
          // CRITICAL: Always start with card 0 and block progress updates
          // Reset flags to ensure we start fresh
          currentCardIndex = -1
          updateCardVisibility(0)
          hasEnteredFromStart = false
          allowProgressUpdates = false
          
          // Only allow if we're at the absolute start AND active
          // This means we've scrolled to the section from above
          if (trigger.isActive && progress < 0.001) {
            hasEnteredFromStart = true
            allowProgressUpdates = true
          }
        }
      })
    })
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

