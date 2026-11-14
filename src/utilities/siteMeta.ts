export const SITE_NAME = 'Finanthropist'

export const DEFAULT_SITE_TITLE =
  'Finanthropist - Best Stock Market Education & Trading Institute in Marathi'

export const DEFAULT_SITE_DESCRIPTION =
  "Learn stock market trading and investing from basics to advanced in Marathi. Maharashtra's leading stock market training institute led by Sammeer Sarang. 23+ years finance experience, 10,000+ families trained."

export const DEFAULT_KEYWORDS = [
  'share market classes in marathi',
  'stock market course in marathi',
  'best stock market institute in maharashtra',
  'share market training nashik',
  'options trading course in marathi',
  'share market classes pune',
  'sammeer sarang finanthropist',
  'technical analysis course marathi',
  'finanthropist educare',
]

/** Page/post titles from Payload CMS: `Page Title | Finanthropist` */
export function formatPageTitle(pageTitle?: string | null): string {
  const trimmed = pageTitle?.trim()
  if (trimmed) return `${trimmed} | ${SITE_NAME}`
  return DEFAULT_SITE_TITLE
}
