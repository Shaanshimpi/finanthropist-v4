import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const initPostInstructorPinTimeline = () => {
  const section = document.querySelector('.post-instructor-pinned') as HTMLElement | null
  const title = section?.querySelector('.post-instructor-title') as HTMLElement | null
  if (!section || !title) return

  gsap.set(title, { transformOrigin: '50% 50%' })

  const tl = gsap.timeline({
    scrollTrigger: {
      id: 'post-instructor-pin',
      trigger: section,
      start: '15% 10%',
      endTrigger: '.welcome-section',
      end: '15% 20%',
      pin: true,
      toggleActions: 'play none none reverse',
      // scrub: true,
      markers: true,
      anticipatePin: 1,
    },
  })

  tl.to(title, {
    scale: 250,
    duration: 1,
    
    ease: 'circ.in',
  })

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
  }
}


