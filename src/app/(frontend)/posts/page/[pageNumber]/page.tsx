import type { Metadata } from 'next/types'

// import { CollectionArchive } from '@/components/CollectionArchive'
// import { PageRange } from '@/components/PageRange'
// import { Pagination } from '@/components/Pagination'
// import { Reveal } from '@/components/ui/Reveal'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
// import React from 'react'
// import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: _paramsPromise }: Args) {
  // Blog temporarily disabled
  notFound()
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Blog & Insights - Page ${pageNumber || ''} | Finanthropist`,
    description:
      'Expert insights, trading strategies, and market analysis from Maharashtra\'s most trusted stock market educators.',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
