import { CustomHomePage } from '@/components/CustomHomePage'
import type { Metadata } from 'next'

export default function HomePage() {
  return <CustomHomePage />
}

export const metadata: Metadata = {
  title: 'Finanthropist - Your Financial Growth Partner',
  description: 'Your trusted partner in financial growth and investment strategies. Comprehensive financial solutions designed to help you build wealth and secure your future.',
  keywords: 'financial planning, investment, wealth management, financial advisor',
  openGraph: {
    title: 'Finanthropist - Your Financial Growth Partner',
    description: 'Your trusted partner in financial growth and investment strategies.',
    type: 'website',
    locale: 'en_US',
  },
}
