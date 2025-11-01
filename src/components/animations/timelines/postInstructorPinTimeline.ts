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
      end: '+=300%',
      pin: true,
      // Add slight catch-up for smoother scrubbing
      scrub: 1.2,
      markers: true,
      anticipatePin: 1,
      onEnter: (self) => {
        const p = Number(self?.progress) || 0

        if (p >= 0.005) {
          gsap.to(section, { backgroundColor: '#C71C22', duration: 0.6, ease: 'none' })
        }

       
      },
      onEnterBack: (self) => {
        // When snapping back to the very end of the pin, progress can be ~1.
        // Keep title hidden at the pin end; only show it once we move inside the span again.
        const p = Number(self?.progress) || 0
        if (p >= 0.995) {
          // gsap.set(title, { opacity: 0 })
          // Also schedule a micro-check after the snap settles; if we're still at the end, keep hidden
          requestAnimationFrame(() => {
            const stillEnd = Number(self?.progress) || 0
            if (stillEnd >= 0.995) gsap.set(title, { opacity: 0 })
          })
        } else {
          gsap.set(title, { display: 'block' })
          gsap.to(title, { opacity: 1, delay: 0.6, duration: 0.6 })
          gsap.to(welcome, { opacity: 0, duration: 0.6 })
          gsap.to(section, { backgroundColor: 'white', duration: 0.6 })
        }
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

  // 1) Scale title to cover (use computed coverScale and ease)
  tl.to(title, { scale: () => 40, ease: 'power2.out', opacity: 0 }, 0)
    // .to(bodyEl, { backgroundColor: '#C71C22', duration: 0.6, ease: 'none' }, 0)
    // 2) Fade in welcome after scale progresses most of the way
    .to(welcome, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.7)
    // 3) Hide title after welcome is visible

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    window.removeEventListener('resize', resizeHandler)
  }
}

 
