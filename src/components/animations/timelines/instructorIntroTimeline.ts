import { gsap } from 'gsap'

export const initInstructorIntroTimeline = () => {
  const instructorSection = document.querySelector('.instructor-bio-section') as HTMLElement | null
  if (!instructorSection) return

  const titleEl = instructorSection.querySelector('.instructor-title') as HTMLElement | null
  if (titleEl && titleEl.textContent) {
    const text = titleEl.textContent
    const chars = text.split('').map((char) => (char === ' ' ? '\u00A0' : char))
    titleEl.innerHTML = chars.map((char) => `<span style="display: inline-block">${char}</span>`).join('')

    const titleSpans = titleEl.querySelectorAll('span')

    const fadeOverlay = instructorSection.querySelector('.fade-overlay') as HTMLElement | null
    if (fadeOverlay) {
      gsap.set(fadeOverlay, { height: 0 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: instructorSection,
        start: 'top 50%',
        end: 'top 50%',
        toggleActions: 'play none none none',
        once: true,
      },
    })

    tl.from(titleSpans, {
      y: 30,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.6,
      stagger: 0.02,
      ease: 'power3.out',
    })
      .from(
        '.instructor-content',
        {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
      .from(
        '.instructor-card',
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(0.5)',
        },
        '-=0.6'
      )

    // Counters and shimmering kept as-is would need more DOM scoping; safe to retain current state if needed.
  }
}


