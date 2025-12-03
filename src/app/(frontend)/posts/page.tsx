import type { Metadata } from 'next/types'

import { notFound } from 'next/navigation'
// import { CollectionArchive } from '@/components/CollectionArchive'
// import { PageRange } from '@/components/PageRange'
// import { Pagination } from '@/components/Pagination'
// import { Reveal } from '@/components/ui/Reveal'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import PageClient from './page.client'

// Temporarily disabled
export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  // Blog temporarily disabled
  notFound()
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog & Insights | Finanthropist',
    description:
      'Expert insights, trading strategies, and market analysis from Maharashtra\'s most trusted stock market educators.',
  }
}
