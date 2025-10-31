import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export type SnapScrollOptions = {
  scroller?: string | HTMLElement
  sections: string[]
  duration?: number
  ease?: string
  delay?: number
  start?: () => string
  end?: () => string
  markers?: boolean
  heroOffset?: number
}

// Creates per-section snap triggers that scroll to each section's top when its trigger reaches the viewport start.
// Not wired automatically; import and call from your page when you want snapping enabled.
export const initSnapScroll = (options: SnapScrollOptions): (() => void) => {
  const {
    scroller,
    sections,
    duration = 0.5,
    ease = 'power2.inOut',
    delay = 0,
    start,
    end,
    markers = false,
    heroOffset = 64, // 4rem default header height
  } = options

  const scrollerEl: HTMLElement | Window | null = typeof scroller === 'string'
    ? (document.querySelector(scroller) as HTMLElement | null)
    : scroller ?? window

  const triggers: ScrollTrigger[] = []

  // Normalize scroll input to reduce overshoot/momentum around snaps
  ScrollTrigger.normalizeScroll({
    allowNestedScroll: true,
    debounce: true,
    momentum: 0,
    lockAxis: true,
  })

  const scrollToTarget = (target: Element | string, targetIndex: number) => {
    if (!scrollerEl) return
    const isHero = targetIndex === 0
    gsap.to(scrollerEl, {
      scrollTo: isHero ? { y: target, offsetY: heroOffset } : target,
      duration: Math.max(0.2, Math.min(duration, 1.2)),
      ease: ease || 'power2.out',
      delay,
      overwrite: true,
    })
  }

  // Create a trigger for each section that snaps forward/backward.
  sections.forEach((selector, index) => {
    const nextSelector = sections[index + 1]
    const prevSelector = sections[index]
    const trigger = ScrollTrigger.create({
      id: `snap-${selector}`,
      trigger: selector,
      scroller: scrollerEl instanceof Window ? undefined : scrollerEl,
      start: start ? start() : (index === 0 ? '5% 10%' : '15% 10%'),
      endTrigger: nextSelector ?? undefined,
      end: end ? end() : (nextSelector ? 'top 5%' : `bottom=+${window.innerHeight * 0.5} 5%`),
      onEnter: () => {
        if (nextSelector) scrollToTarget(nextSelector, index + 1)
      },
      onEnterBack: () => {
        if (prevSelector) scrollToTarget(prevSelector, index)
      },
      markers,
    })
    triggers.push(trigger)
  })

  return () => {
    triggers.forEach(t => t.kill())
  }
}


