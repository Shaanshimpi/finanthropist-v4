import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE, SITE_NAME } from './siteMeta'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: DEFAULT_SITE_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Finanthropist - Best Stock Market Education & Trading Institute in Marathi',
    },
  ],
  siteName: SITE_NAME,
  title: DEFAULT_SITE_TITLE,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
