import type { Metadata } from 'next'

import TermsAndConditionsPage from '@/components/TermsAndConditionsPage'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Finanthropist',
  description:
    'Read the Terms and Conditions for using Finanthropist Educare Pvt Ltd\'s educational services and courses.',
}

export default function Page() {
  return <TermsAndConditionsPage />
}


