import type { Metadata } from 'next/types'

// import { CollectionArchive } from '@/components/CollectionArchive'
// import { PageRange } from '@/components/PageRange'
// import { Pagination } from '@/components/Pagination'
// import { Reveal } from '@/components/ui/Reveal'
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

// Blog is disabled (see Page); avoid DB access during `next build`.
export async function generateStaticParams() {
  return []
}
