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

  // Calculate scale dynamically based on actual container dimensions
  const getDimensions = (): { scale: number; xValue: number } => {
    const reviewsRect = reviews.getBoundingClientRect()
    const starsRect = stars.getBoundingClientRect()
    
    const reviewsWidth = reviewsRect.width
    
    // Get the actual content width of stars (not container width)
    // Use scrollWidth to get the natural width of content, or measure children
    let starsContentWidth = stars.scrollWidth
    
    // If scrollWidth equals container width, try to measure children directly
    if (starsContentWidth >= starsRect.width) {
      const children = Array.from(stars.children) as HTMLElement[]
      if (children.length > 0) {
        // Sum up the widths of all children
        starsContentWidth = children.reduce((sum, child) => {
          const childRect = child.getBoundingClientRect()
          return sum + childRect.width
        }, 0)
        // Add gaps between children (gap-2 = 0.5rem = 8px)
        const gap = 8
        starsContentWidth += gap * (children.length - 1)
      } else {
        // Fallback: use a percentage of container width
        starsContentWidth = starsRect.width * 0.4
      }
    }
    
    // Ensure we have valid dimensions
    if (reviewsWidth <= 0 || starsContentWidth <= 0) {
      // Fallback: use viewport-based calculation
      const viewportWidth = window.innerWidth
      const minScale = 1.6
      const maxScale = 1.9
      const minWidth = 360
      const maxWidth = 414
      const scale = Math.min(
        maxScale,
        Math.max(minScale, minScale + ((viewportWidth - minWidth) / (maxWidth - minWidth)) * (maxScale - minScale))
      )
      const xValue = viewportWidth * 0.4
      return { scale, xValue }
    }
    
    // Calculate scale so that scaled stars fit almost perfectly in reviews container
    // We want to leave a small margin (about 5-10% on each side)
    // Target: scaled stars width should be ~80-90% of reviews width
    const targetWidthPercent = 0.85 // Use 85% of container width
    const targetScaledWidth = reviewsWidth * targetWidthPercent
    
    // Calculate scale needed: scale = targetWidth / currentWidth
    const calculatedScale = targetScaledWidth / starsContentWidth
    
    // Clamp scale to reasonable bounds (1.2 to 2.5) to prevent extreme values
    const scale = Math.max(1.2, Math.min(2.5, calculatedScale))
    
    // Calculate x movement: move stars to center-right of container
    // After scaling, we want to position it so it fits nicely
    const scaledStarsWidth = starsContentWidth * scale
    const availableSpace = reviewsWidth - scaledStarsWidth
    // Position at 60% from left (slightly right of center) to fit nicely
    const xValue = Math.max(0, availableSpace * 0.6)
    
    return { scale, xValue }
  }

  const tween = gsap
    .timeline({ paused: true })
    .to(reviews, {
      height: '200',
      duration: 0.6,
      delay: 0.3,
      ease: 'back.out(1.4)',
    })
    .to(stars, {
      scale: () => {
        // Calculate scale dynamically when animation runs
        const dims = getDimensions()
        return dims.scale
      },
      x: () => {
        // Calculate x movement dynamically when animation runs
        const dims = getDimensions()
        return dims.xValue
      },
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
    onRefresh: () => {
      // Invalidate the timeline on refresh so it recalculates values
      tween.invalidate()
    },
  })

  return () => {
    tween.kill()
    triggerInstance.kill()
    gsap.set(stars, { scale: 1, x: 0 })
  }
}

export default initMobileHeroReviews

