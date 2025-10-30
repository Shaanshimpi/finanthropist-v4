import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const initFeaturesCardsTimeline = () => {
  const featuresSection = document.querySelector('.features-section')
  const featureItems = document.querySelectorAll('.feature-item')

  if (!featuresSection || featureItems.length === 0) return

  const sectionHeight = window.innerHeight - 64
  const cardHeight = sectionHeight * 0.5
  const totalScrollDistance = featureItems.length * cardHeight

  let currentCardIndex = 0

  ScrollTrigger.create({
    id: 'features-pin',
    trigger: featuresSection as Element,
    start: 'top 10%',
    end: `+=${totalScrollDistance}`,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress
      const targetCardIndex = Math.min(
        Math.floor(progress * featureItems.length),
        featureItems.length - 1
      )

      if (targetCardIndex !== currentCardIndex) {
        currentCardIndex = targetCardIndex

        featureItems.forEach((item, index) => {
          const htmlItem = item as HTMLElement

          if (index === currentCardIndex) {
            gsap.to(htmlItem, {
              opacity: 1,
              y: 0,
              scale: 1,
              z: featureItems.length * 10,
              duration: 0.4,
              ease: 'power2.out',
            })
          } else if (index < currentCardIndex) {
            const stackedIndex = currentCardIndex - index
            gsap.to(htmlItem, {
              opacity: 0,
              y: 0,
              scale: 1,
              z: (featureItems.length - stackedIndex) * 10,
              duration: 0.4,
              ease: 'power2.out',
            })
          } else {
            gsap.to(htmlItem, {
              opacity: 0,
              y: 100,
              scale: 0.9,
              z: 0,
              duration: 0.3,
              ease: 'power2.in',
            })
          }
        })
      }
    },
  })

  featureItems.forEach((item, index) => {
    const htmlItem = item as HTMLElement
    gsap.set(htmlItem, {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      transformOrigin: 'center',
      willChange: 'transform',
    })

    if (index === 0) {
      gsap.set(htmlItem, {
        opacity: 1,
        y: 0,
        scale: 1,
        z: featureItems.length * 10,
      })
    } else {
      gsap.set(htmlItem, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        z: 0,
      })
    }
  })
}


