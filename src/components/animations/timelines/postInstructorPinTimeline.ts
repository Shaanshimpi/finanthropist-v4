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

  gsap.set(title, { transformOrigin: '50% 50%' })
  if (welcome) gsap.set(welcome, { opacity: 0 })
  const bodyEl = document.body
  const prevBodyBg = getComputedStyle(bodyEl).backgroundColor

  // Compute a scale that covers the pinned viewport area
  const computeCoverScale = () => {
    const sectionRect = section.getBoundingClientRect()
    const titleRect = title.getBoundingClientRect()
    const scaleX = sectionRect.width / Math.max(1, titleRect.width)
    const scaleY = sectionRect.height / Math.max(1, titleRect.height)
    return Math.max(scaleX, scaleY) * 1.25
  }
  let coverScale = computeCoverScale()

  // Recompute on resize to keep things accurate
  const resizeHandler = () => { coverScale = computeCoverScale() }
  window.addEventListener('resize', resizeHandler)

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'post-instructor-pin',
      trigger: section,
      start: 'top top',
      end: '+=320%',
      pin: true,
      scrub: true,
      markers: true,
      anticipatePin: 1,
      onEnter: () => {
        gsap.to(section, { backgroundColor: '#C71C22', duration: 0.6, ease: 'none' })
      },
      onEnterBack: () => {
        // ensure original visibility when going back
        gsap.set(title, { display: 'block' })
        gsap.to(section, { backgroundColor: 'white', duration: 0.6 })
      },
      onLeaveBack: () => {
        // ensure original visibility when going back
        gsap.set(title, { display: 'block' })
        gsap.to(section, { backgroundColor: 'white', duration: 0.6 })
      },
      onKill: () => {
        window.removeEventListener('resize', resizeHandler)
        // gsap.set(bodyEl, { backgroundColor: prevBodyBg })
      },
    },
  })

  // 1) Scale title to cover
  tl.to(title, { scale: () =>200, scrub: true }, 0)
    // .to(bodyEl, { backgroundColor: '#C71C22', duration: 0.6, ease: 'none' }, 0)
    // 2) Fade in welcome after scale progresses most of the way
    .to(welcome, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.7)
    // 3) Hide title after welcome is visible

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    window.removeEventListener('resize', resizeHandler)
  }
}

 
