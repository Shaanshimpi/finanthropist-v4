import { CustomHomePage } from '@/components/CustomHomePage'
import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { DEFAULT_KEYWORDS } from '@/utilities/siteMeta'

export default function HomePage() {
  return <CustomHomePage />
}

const siteUrl = getServerSideURL()
const title = 'Finanthropist - Best Stock Market Education & Trading Institute in Marathi'
const description =
  "Maharashtra's leading stock market training institute. Learn share market trading & investing from basics to advanced in Marathi with Sammeer Sarang (23+ yrs experience). Join 10,000+ trained families."

export const metadata: Metadata = {
  title,
  description,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: 'website',
    locale: 'en_IN',
    siteName: 'Finanthropist',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteUrl}/og-image.jpg`],
  },
}
