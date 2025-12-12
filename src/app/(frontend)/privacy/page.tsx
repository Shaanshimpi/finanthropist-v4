import type { Metadata } from 'next'

import PrivacyPolicyPage from '@/components/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | Finanthropist',
  description:
    'Read Finanthropist Educare Pvt Ltd\'s Privacy Policy to understand how we collect, use, and protect your personal information.',
}

export default function Page() {
  return <PrivacyPolicyPage />
}


