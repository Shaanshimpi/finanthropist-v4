import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type MobileFeaturesTimelineParams = {
  section: HTMLElement
  cards: NodeListOf<Element>
}

export const initMobileFeaturesTimeline = (params: MobileFeaturesTimelineParams) => {
  if (typeof window === 'undefined') return () => {}

  const { section, cards } = params

  if (!section || cards.length === 0) return () => {}

  let trigger: ScrollTrigger | null = null
  let currentCardIndex = 0

  // Calculate dimensions (used only for end distance when there's no next section)
  const viewportHeight = window.innerHeight
  const cardHeight = viewportHeight * 0.5
  const totalScrollDistance = cards.length * cardHeight

  // Find next section for end trigger
  const nextSection = section.nextElementSibling

  // Initialize all cards - only first one visible
  cards.forEach((card, index) => {
    const htmlCard = card as HTMLElement
    
    gsap.set(htmlCard, {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    })

    if (index === 0) {
      // First card: visible
      gsap.set(htmlCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        zIndex: cards.length,
      })
    } else {
      // Other cards: hidden below
      gsap.set(htmlCard, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        zIndex: 0,
      })
    }
  })

  // Function to update card visibility
  const updateCardVisibility = (targetIndex: number) => {
    if (targetIndex === currentCardIndex) return
    if (targetIndex < 0 || targetIndex >= cards.length) return

    currentCardIndex = targetIndex

    cards.forEach((card, index) => {
      const htmlCard = card as HTMLElement

      if (index === targetIndex) {
        // Active card: visible and on top
        gsap.to(htmlCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          zIndex: cards.length,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else if (index < targetIndex) {
        // Past cards: stacked behind
        const stackedIndex = targetIndex - index
        gsap.to(htmlCard, {
          opacity: 0,
          y: 0,
          scale: 1,
          zIndex: cards.length - stackedIndex,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        // Future cards: hidden below
        gsap.to(htmlCard, {
          opacity: 0,
          y: 100,
          scale: 0.9,
          zIndex: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    })
  }

  const scrollTriggerOptions: ScrollTrigger.Vars = {
    id: 'mobile-features-pin',
    trigger: section,
    start: 'top top', // Section top aligns with viewport top
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onEnter: () => {
      // Always start at card 0 when entering from above
      currentCardIndex = -1
      updateCardVisibility(0)
    },
    onEnterBack: () => {
      // Always start at card 0 when scrolling back up
      currentCardIndex = -1
      updateCardVisibility(0)
    },
    onLeave: () => {
      // Reset when leaving section
      currentCardIndex = -1
    },
    onLeaveBack: () => {
      // Reset when leaving section going back
      currentCardIndex = -1
    },
    onUpdate: (self) => {
      const progress = Math.max(0, Math.min(1, self.progress))
      
      // CRITICAL: Only calculate card index if we're actually in the section
      // and progress is meaningful. For very small progress, always show card 0
      if (progress < 0.01) {
        if (currentCardIndex !== 0) {
          currentCardIndex = -1
          updateCardVisibility(0)
        }
        return
      }
      
      // Calculate target card index based on progress
      const targetIndex = Math.min(
        Math.floor(progress * cards.length),
        cards.length - 1
      )
      
      updateCardVisibility(targetIndex)
    },
  }

  // Set end trigger
  if (nextSection) {
    scrollTriggerOptions.endTrigger = nextSection
    // End when the next section reaches the top of the viewport
    scrollTriggerOptions.end = 'top top'
  } else {
    // Fallback: use a scroll distance based on card height
    scrollTriggerOptions.end = `+=${totalScrollDistance}`
  }

  // Create trigger
  trigger = ScrollTrigger.create(scrollTriggerOptions)

  // Refresh ScrollTrigger to ensure markers are properly positioned
  ScrollTrigger.refresh()

  // Force initial state to card 0 after trigger is created
  // This ensures we always start from the first card, regardless of scroll position
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (trigger) {
        // Always force card 0 initially, regardless of progress
        // This prevents jumping to a later card on page load
        currentCardIndex = -1
        updateCardVisibility(0)
        
        // Refresh again to ensure markers are correctly positioned after state update
        ScrollTrigger.refresh()
      }
    })
  })

  // Cleanup function
  return () => {
    if (trigger) {
      trigger.kill()
      trigger = null
    }
  }
}

