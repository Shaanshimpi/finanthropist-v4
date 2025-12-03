import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className={cn('w-full')}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card key={index} className="h-full" doc={result} relationTo="posts" showCategories />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
