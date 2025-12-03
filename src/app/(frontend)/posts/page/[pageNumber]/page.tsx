import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { Reveal } from '@/components/ui/Reveal'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  // Blog temporarily disabled
  notFound()
  
  // const { pageNumber } = await paramsPromise
  // const payload = await getPayload({ config: configPromise })

  // const sanitizedPageNumber = Number(pageNumber)

  // if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-24 pb-16 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#C71C22]/20 blur-3xl" />
        <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#FCC22F]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_60%)]" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 max-w-6xl">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold text-white/80 uppercase tracking-[0.25em]">
            Blog & Insights
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Latest Articles & Market Insights
          </h1>
          <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-transparent" />
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Stay updated with expert insights, trading strategies, and market analysis from Maharashtra&apos;s
            most trusted stock market educators.
          </p>
        </Reveal>

        {posts.totalDocs > 0 && (
          <div className="mb-6 text-center">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>
        )}

        <CollectionArchive posts={posts.docs} />

        {posts?.page && posts?.totalPages > 1 && (
          <div className="mt-12">
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}

        {posts.totalDocs === 0 && (
          <Reveal delay={150} className="text-center py-16">
            <p className="text-slate-400 text-lg">No articles yet. Check back soon for updates!</p>
          </Reveal>
        )}
      </div>
    </div>
  )
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
