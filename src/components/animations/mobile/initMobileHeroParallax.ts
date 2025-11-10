import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const initMobileHeroParallax = (
  container: HTMLElement,
  imageWrapper: HTMLElement,
  options: { markers?: boolean } = {}
) => {
  if (typeof window === 'undefined') return () => {}

  const { markers = false } = options

  const endDistance = () => {
    const extra = Math.min(window.innerHeight, 400)
    return container.offsetHeight + extra
  }

  const tween = gsap.to(
    imageWrapper,
    // { yPercent: -12, scale: 1 },
    {
      yPercent: -70,
      scale: 1.05,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 20%',
        end: 'bottom 30%',
        // end: () => `+=${endDistance()}`,
        scrub: true,
        markers,
        invalidateOnRefresh: true,
      },
    }
  )

  ScrollTrigger.refresh()
  setTimeout(() => ScrollTrigger.refresh(), 100)

  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}

export default initMobileHeroParallax
