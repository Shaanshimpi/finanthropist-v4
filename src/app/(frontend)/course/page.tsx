import type { Metadata } from 'next'
import { CoursePage } from '@/components/course'
import { getServerSideURL } from '@/utilities/getURL'
import { CourseJsonLd, BreadcrumbJsonLd } from '@/components/StructuredData'

const siteUrl = getServerSideURL()
const title = 'Stock Market Course in Marathi - Basics to Advance Trading | Finanthropist'
const description =
  'Learn share market trading and investing from basics to advance in Marathi. Equity, Futures & Options, Commodity & Forex trading with live market analysis and lifetime family support.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'share market course in marathi',
    'stock market classes in marathi',
    'options trading course marathi',
    'share market trading classes nashik',
    'futures and options training maharashtra',
    'best share market course for beginners',
    'technical analysis course marathi',
  ],
  alternates: {
    canonical: `${siteUrl}/course`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/course`,
    type: 'website',
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

export default function Page() {
  return (
    <>
      <CourseJsonLd siteUrl={siteUrl} />
      <BreadcrumbJsonLd
        siteUrl={siteUrl}
        items={[
          { name: 'Home', path: '' },
          { name: 'Course', path: '/course' },
        ]}
      />
      <CoursePage />
    </>
  )
}
