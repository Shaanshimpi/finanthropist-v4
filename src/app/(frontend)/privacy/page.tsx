import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/components/PrivacyPolicyPage'
import { getServerSideURL } from '@/utilities/getURL'

const siteUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Privacy Policy | Finanthropist Educare Pvt Ltd',
  description:
    "Read Finanthropist Educare Pvt Ltd's Privacy Policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
}

export default function Page() {
  return <PrivacyPolicyPage />
}
