import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type WelcomeElements = {
  heading: HTMLElement | null
  ctas: HTMLElement | null
  cards: NodeListOf<Element> | null
}

type MobileWelcomeOptions = {
  markers?: boolean
  start?: string
  end?: string
}

export const initMobileWelcome = (
  container: HTMLElement,
  elements: WelcomeElements,
  options: MobileWelcomeOptions = {}
) => {
  if (typeof window === 'undefined') return () => {}

  const { heading, ctas, cards } = elements
  if (!container || !heading || !ctas || !cards || cards.length === 0) return () => {}

  const { markers = false, start = 'bottom 85%', end = 'bottom top' } = options

  const cardsArray = Array.from(cards)

  const timeline = gsap.timeline({
    paused: true,
    defaults: { duration: 0.45, ease: 'power2.out' },
  })

  gsap.set([heading, ctas, ...cardsArray], { autoAlpha: 0, y: 30 })

  timeline
    .to(heading, { autoAlpha: 1, y: 0 })
    .to(ctas, { autoAlpha: 1, y: 0 }, '-=0.2')

  cardsArray.forEach((card, index) => {
    timeline.to(
      card,
      {
        autoAlpha: 1,
        y: 0,
      },
      index === 0 ? '-=0.1' : '-=0.3'
    )
  })

  const trigger = ScrollTrigger.create({
    trigger: container,
    start,
    end,
    onEnter: () => timeline.play(),
    onEnterBack: () => timeline.play(),
    onLeaveBack: () => timeline.reverse(),
    markers,
  })

  return () => {
    trigger.kill()
    timeline.kill()
  }
}

export default initMobileWelcome

