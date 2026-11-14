import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'
import { getServerSideURL } from '@/utilities/getURL'
import { BreadcrumbJsonLd } from '@/components/StructuredData'

const siteUrl = getServerSideURL()
const title = 'Contact Us | Finanthropist Educare - Nashik, Maharashtra'
const description =
  'Contact Finanthropist Educare in Nashik, Maharashtra. Call +91 7066334499 or +91 7066337676 for stock market course inquiries, webinar access, and enrollment support.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'contact Finanthropist',
    'Finanthropist Nashik office',
    'Finanthropist phone number',
    'share market classes in Nashik contact',
    'Finanthropist Educare address',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/contact`,
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
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <ContactPage />
    </>
  )
}
