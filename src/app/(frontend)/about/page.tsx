import type { Metadata } from 'next'
import AboutPage from '@/components/AboutPage'
import { getServerSideURL } from '@/utilities/getURL'
import { BreadcrumbJsonLd } from '@/components/StructuredData'

const siteUrl = getServerSideURL()
const title = 'About Us | Finanthropist Educare Pvt Ltd - Maharashtra'
const description =
  "Learn about Finanthropist Educare Pvt Ltd, Maharashtra's leading stock market education institute since 2017. Led by Sammeer Sarang, Aayesha Sarang, and Nikita Bhopale. 10,000+ families trained."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'about Finanthropist Educare',
    'Sammeer Sarang',
    'Aayesha Sarang',
    'Nikita Bhopale',
    'stock market institute Nashik',
    'best share market academy Maharashtra',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/about`,
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
      <BreadcrumbJsonLd
        siteUrl={siteUrl}
        items={[
          { name: 'Home', path: '' },
          { name: 'About Us', path: '/about' },
        ]}
      />
      <AboutPage />
    </>
  )
}
