export const SITE_NAME = 'Finanthropist'

export const DEFAULT_SITE_TITLE = 'Finanthropist - Your Financial Growth Partner'

export const DEFAULT_SITE_DESCRIPTION =
  'Your trusted partner in financial growth and investment strategies. Comprehensive financial solutions designed to help you build wealth and secure your future.'

/** Page/post titles from Payload CMS: `Page Title | Finanthropist` */
export function formatPageTitle(pageTitle?: string | null): string {
  const trimmed = pageTitle?.trim()
  if (trimmed) return `${trimmed} | ${SITE_NAME}`
  return SITE_NAME
}
