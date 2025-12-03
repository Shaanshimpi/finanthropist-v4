'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden hover:cursor-pointer transition-all duration-300 hover:border-[#FCC22F]/30 hover:shadow-lg hover:shadow-[#FCC22F]/10 hover:-translate-y-1',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-video overflow-hidden bg-slate-800">
        {!metaImage && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="text-slate-600 text-sm">No image</div>
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <div className="w-full h-full">
            <Media
              resource={metaImage}
              size="33vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {showCategories && hasCategories && (
          <div className="mb-3 flex flex-wrap gap-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'

                return (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full border border-[#FCC22F]/30 bg-[#FCC22F]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#FCC22F]"
                  >
                    {categoryTitle}
                  </span>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <h3 className="mb-3 text-lg sm:text-xl font-bold text-white group-hover:text-[#FCC22F] transition-colors">
            <Link className="not-prose" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && (
          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 flex-1">
            {sanitizedDescription}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <Link
            href={href}
            ref={link.ref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FCC22F] hover:text-[#FCC22F]/80 transition-colors"
          >
            Read More
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
