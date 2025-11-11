import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type MobileWebinarCardsOptions = {
  markers?: boolean
  delay?: number
  onActivate?: () => void
}

export const initMobileWebinarCards = (
  container: HTMLElement,
  cards: NodeListOf<Element>,
  options: MobileWebinarCardsOptions = {}
) => {
  if (typeof window === 'undefined') return () => {}

  const { markers = false, delay = 0, onActivate } = options

  if (!container || cards.length === 0) return () => {}

  const cardsArray = Array.from(cards)

  const timeline = gsap.timeline({
    paused: true,
    defaults: { duration: 0.45, ease: 'power2.out' },
    delay,
  })

  gsap.set(cardsArray, { autoAlpha: 0, y: 24 })

  timeline
    .to(container, {
      maxHeight: '1000px',
      duration: 0.6,
      ease: 'power2.inOut',
    })

  cardsArray.forEach((card, index) => {
    timeline.to(
      card,
      {
        autoAlpha: 1,
        y: 0,
      },
      index === 0 ? 0 : '-=0.3'
    )
  })

  let activated = false
  const handleActivate = () => {
    if (!activated) {
      activated = true
      onActivate?.()
    }
  }

  const trigger = ScrollTrigger.create({
    trigger: container,
    start: 'top 30%',
    onEnter: () => {
      handleActivate()
      timeline.play()
    },
    onEnterBack: () => {
      handleActivate()
      timeline.play()
    },
    onLeaveBack: () => timeline.reverse(),
    markers,
  })

  ScrollTrigger.refresh()

  return () => {
    trigger.kill()
    timeline.kill()
  }
}

export default initMobileWebinarCards

