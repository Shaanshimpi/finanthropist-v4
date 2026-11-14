import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import Script from 'next/script'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import {
  DEFAULT_KEYWORDS,
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_TITLE,
  SITE_NAME,
} from '@/utilities/siteMeta'
import { StaticHeader } from '@/components/StaticHeader'
import { Footer } from '@/components/Footer'
import { PageLoader } from '@/components/PageLoader'
import { OrganizationJsonLd } from '@/components/StructuredData'
import { AttributionTracker } from '@/components/AttributionTracker'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const siteUrl = getServerSideURL()
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/static-media/logo.png" rel="apple-touch-icon" />
        <OrganizationJsonLd siteUrl={siteUrl} />
      </head>
      <body>
        <AttributionTracker />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Providers>
          <PageLoader />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <StaticHeader />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: './',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [`${getServerSideURL()}/og-image.jpg`],
  },
}
