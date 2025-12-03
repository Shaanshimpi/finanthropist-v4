import type { Metadata } from 'next'

import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'About Us | Finanthropist Educare Pvt Ltd',
  description:
    "Learn more about Finanthropist Educare Pvt Ltd, Maharashtra's leading stock market education institute led by Sammeer Sarang, Aayesha Sarang and Nikita Bhopale.",
}

export default function Page() {
  return <AboutPage />
}


