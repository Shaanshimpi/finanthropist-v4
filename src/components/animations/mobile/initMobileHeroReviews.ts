import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type ReviewAnimationOptions = {
  markers?: boolean
}

export const initMobileHeroReviews = (
  reviews: HTMLElement,
  stars: HTMLElement,
  options: ReviewAnimationOptions = {}
) => {
  if (typeof window === 'undefined') return () => {}

  const { markers = false } = options

  const tween = gsap
    .timeline({ paused: true })
    .to(reviews, {
      height: '200',
      duration: 0.6,
      delay: 0.3,
      ease: 'back.out(1.4)',
    })
    .to(stars, {
      scale: 2,
      x: 150,
      duration: 0.3,
      ease: 'back.out(1.4)',
      transformOrigin: 'center',
    })
  const triggerInstance = ScrollTrigger.create({
    trigger: reviews,
    start: 'top center',
    toggleActions: 'play reverse play reverse',
    markers,
    animation: tween,
  })

  return () => {
    tween.kill()
    triggerInstance.kill()
    gsap.set(stars, { scale: 1, x: 0 })
  }
}

export default initMobileHeroReviews

