import type { Metadata } from 'next'
import TermsAndConditionsPage from '@/components/TermsAndConditionsPage'
import { getServerSideURL } from '@/utilities/getURL'

const siteUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Terms & Conditions | Finanthropist Educare Pvt Ltd',
  description:
    "Read the Terms and Conditions for using Finanthropist Educare Pvt Ltd's educational services and courses.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
}

export default function Page() {
  return <TermsAndConditionsPage />
}
