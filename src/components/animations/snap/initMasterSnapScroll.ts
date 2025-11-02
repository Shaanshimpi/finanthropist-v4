import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export type MasterSnapOptions = {
  sections: string[]
  duration?: number
  ease?: string
  delay?: number
  markers?: boolean
  heroOffset?: number
}

// Single master ScrollTrigger that snaps scroll position to the closest section top.
// This avoids contention with other scrubbed ScrollTriggers and eliminates stutter
// caused by mixing per-section scrollTo calls with scrubbing.
export const initMasterSnapScroll = (options: MasterSnapOptions): (() => void) => {
  const {
    sections,
    duration = 0.4,
    ease = 'power2.out',
    delay = 0,
    markers = false,
    heroOffset = 64,
  } = options

  const getSectionElements = (): HTMLElement[] =>
    sections
      .map((sel) => document.querySelector(sel) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el)

  let postInstructorEndSnap: number | null = null

  const computeSnapPoints = (): number[] => {
    const maxScroll = ScrollTrigger.maxScroll(window)
    if (maxScroll <= 0) return [0]

    const els = getSectionElements()
    const yTargets: number[] = []

    els.forEach((el, idx) => {
      const isFeatures = el.classList?.contains('features-section')
      const isPostInstructor = el.classList?.contains('post-instructor-section')
      if (isFeatures) {
        // If features pin exists, add intra-pin snap points per card
        const featuresPin = ScrollTrigger.getById('features-pin')
        const items = document.querySelectorAll('.feature-item')
        if (featuresPin && (items?.length || 0) > 0) {
          const startY = (featuresPin as any).start as number
          const endY = (featuresPin as any).end as number
          const cards = items.length
          const span = Math.max(0, endY - startY)
          for (let k = 0; k <= cards; k++) {
            const y = startY + (span * k) / cards
            yTargets.push(Math.min(maxScroll, Math.max(0, y)))
          }
          return
        }
      }
      if (isPostInstructor) {
        const topY = el.getBoundingClientRect().top + window.pageYOffset-20
        const adjustedTop = Math.min(maxScroll, Math.max(0, topY))
        yTargets.push(adjustedTop)

        const postPin = ScrollTrigger.getById('post-instructor-pin')
        if (postPin) {
          const endY = (postPin as any).end as number
          yTargets.push(Math.min(maxScroll, Math.max(0, endY)))
        }
        return
      }
      const y = el.getBoundingClientRect().top + window.pageYOffset
      const adjusted = idx === 0 ? Math.max(0, y - heroOffset) : y
      yTargets.push(Math.min(maxScroll, Math.max(0, adjusted)))
    })

    // If a footer exists, ensure we snap to its top after post-instructor pin ends
    const footerEl = (document.querySelector('footer') || document.querySelector('.site-footer')) as HTMLElement | null
    if (footerEl) {
      const y = footerEl.getBoundingClientRect().top + window.pageYOffset
      yTargets.push(Math.min(maxScroll, Math.max(0, y)))
    }

    // Convert absolute scrollY snap targets into progress values [0..1]
    const snaps = yTargets
      .map((y) => (maxScroll === 0 ? 0 : y / maxScroll))
      .sort((a, b) => a - b)
    // Deduplicate close values
    const dedup: number[] = []
    const eps = 1e-5
    for (const s of snaps) {
      if (!dedup.length || Math.abs(dedup[dedup.length - 1] - s) > eps) dedup.push(s)
    }

    // Capture the post-instructor end snap progress for custom duration
    const postPin = ScrollTrigger.getById('post-instructor-pin')
    if (postPin) {
      const maxScrollLocal = ScrollTrigger.maxScroll(window)
      const endY = (postPin as any).end as number
      const endProgress = maxScrollLocal === 0 ? 0 : Math.min(1, Math.max(0, endY / Math.max(1, maxScrollLocal)))
      postInstructorEndSnap = endProgress
    } else {
      postInstructorEndSnap = null
    }
    return dedup
  }

  let snaps = computeSnapPoints()

  const onResize = () => {
    snaps = computeSnapPoints()
  }

  window.addEventListener('resize', onResize)

  const st = ScrollTrigger.create({
    id: 'master-snap',
    trigger: document.body,
    start: 'top top',
    end: () => ScrollTrigger.maxScroll(window),
    markers,
    snap: {
      // Directional snapping: down -> next, up -> previous
      snapTo: (value: number, self) => {
        const epsilon = 1e-4
        if (!snaps.length) return value
        // Ensure snaps sorted
        const sorted = snaps.slice().sort((a, b) => a - b)
        const direction = (self && (self as any).direction) || 0 // 1 down, -1 up

        // Find index bounds relative to current value
        let nextIndex = sorted.findIndex((p) => p > value + epsilon)
        if (nextIndex === -1) nextIndex = sorted.length - 1
        let prevIndex = -1
        for (let i = sorted.length - 1; i >= 0; i--) {
          if (sorted[i] < value - epsilon) { prevIndex = i; break }
        }
        if (prevIndex === -1) prevIndex = 0

        if (direction > 0) {
          // Scrolling down: snap to next (or stay at last)
          return sorted[Math.min(nextIndex, sorted.length - 1)]
        } else if (direction < 0) {
          // Scrolling up: snap to previous (or stay at first)
          return sorted[Math.max(prevIndex, 0)]
        }

        // Fallback: nearest if direction is 0/unknown
        let closest = sorted[0]
        let minDiff = Math.abs(value - closest)
        for (let i = 1; i < sorted.length; i++) {
          const diff = Math.abs(value - sorted[i])
          if (diff < minDiff) { minDiff = diff; closest = sorted[i] }
        }
        return closest
      },
      // Use distance-based duration so long jumps (like post-instructor end) take ~1s
      duration: { min: duration, max: 1 },
      delay,
      ease,
      // Disable inertia so we snap deterministically to the nearest point
      inertia: false as unknown as undefined,
    },
    // Keep ScrollTrigger's internal measurements current
    onRefresh: () => {
      snaps = computeSnapPoints()
    },
    onRefreshInit: () => {
      snaps = computeSnapPoints()
    },
  })

  return () => {
    try { st.kill() } catch {}
    window.removeEventListener('resize', onResize)
  }
}


