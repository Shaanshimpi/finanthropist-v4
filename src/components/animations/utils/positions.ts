// Shared DOM position helpers for moving image animations

export type ElementBox = {
  x: number
  y: number
  width: number
  height: number
}

// Position relative to the document (page)
export const getImagePosition = (selector: string): ElementBox | null => {
  const el = document.querySelector(selector) as HTMLElement | null
  if (!el) return null
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  }
}

// Position relative to a container element
export const getPositionRelativeToContainer = (
  selector: string,
  container: HTMLElement,
): ElementBox | null => {
  const el = document.querySelector(selector) as HTMLElement | null
  if (!el) return null
  const elRect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return {
    x: elRect.left - containerRect.left,
    y: elRect.top - containerRect.top,
    width: elRect.width,
    height: elRect.height,
  }
}

// Hero image position accounting for section scroll context
export const getHeroImageRelativePos = (): ElementBox | null => {
  const heroSection = document.querySelector('.hero-section') as HTMLElement | null
  const heroImg = heroSection?.querySelector('.hero-right-image img') as HTMLElement | null
  if (!heroSection || !heroImg) return null

  const heroSectionRect = heroSection.getBoundingClientRect()
  const heroSectionY = heroSectionRect.top + window.scrollY
  const imgRect = heroImg.getBoundingClientRect()
  const relativeY = imgRect.top - heroSectionRect.top
  return {
    x: imgRect.left + window.scrollX,
    y: heroSectionY + relativeY,
    width: imgRect.width,
    height: imgRect.height,
  }
}


