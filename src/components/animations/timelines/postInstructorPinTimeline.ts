import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const initPostInstructorPinTimeline = () => {
  const section = document.querySelector('.post-instructor-section') as HTMLElement | null
  const title = section?.querySelector('.post-instructor-title') as HTMLElement | null
  const welcome = section?.querySelector('.welcome-section') as HTMLElement | null
  if (!section || !title) return

  gsap.set(title, { transformOrigin: '50% 50%', willChange: 'transform', force3D: true })
  if (welcome) gsap.set(welcome, { opacity: 0 })

  const tl = gsap.timeline({
    // defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'post-instructor-pin',
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: true,
      // Add slight catch-up for smoother scrubbing
      toggleActions: 'play none none none ',
      markers: false,
      anticipatePin: 1,

    },
  })

  // 1) Scale title to cover (use computed coverScale and ease)
  tl.to(title, { scale: 10, ease: 'power2.inOut', opacity: 0, duration: 4 }, 0)
  // 3) Change background color during animation
  .to(section, { backgroundColor: '#C71C22', duration: 0.6, ease: 'none' }, 0.7)
  // 2) Fade in welcome after scale progresses most of the way
  .to(welcome, { opacity: 1, duration: 1, ease: 'power2.out' }, 1)

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
  }
}