import React from 'react'
import type { Metadata } from 'next'
import PostInstructorSection from '@/components/PostInstructorSection'
import { getServerSideURL } from '@/utilities/getURL'

const siteUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Finanthropist - Maharashtra’s #1 Stock Market Institute',
  description:
    'Discover Finanthropist Educare. Practical share market training from basics to advance in Marathi with lifetime support.',
  alternates: {
    canonical: `${siteUrl}/finanthropist`,
  },
}

export default function FinanthropistPage() {
  return <PostInstructorSection />
}
