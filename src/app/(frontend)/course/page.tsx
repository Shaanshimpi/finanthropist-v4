import type { Metadata } from 'next'

import { CoursePage } from '@/components/course'

export const metadata: Metadata = {
  title: 'Course - Basics to Advance Trading & Investing | Finanthropist',
  description:
    'Learn share market trading and investing from basics to advance. Best stock market education in Marathi. Equity, Futures, Options, Commodity & Currency trading.',
}

export default function Page() {
  return <CoursePage />
}

