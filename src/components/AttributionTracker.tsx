'use client'

import React, { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const AttributionTrackerInner: React.FC = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const utmSource = searchParams.get('utm_source')
      const utmMedium = searchParams.get('utm_medium')
      const utmCampaign = searchParams.get('utm_campaign')
      const ref = document.referrer || ''

      const existingRaw = sessionStorage.getItem('fin_attribution')
      const existing = existingRaw ? JSON.parse(existingRaw) : {}

      let derivedSource = utmSource || existing.source
      if (!derivedSource && ref) {
        if (ref.includes('chatgpt.com')) {
          derivedSource = 'chatgpt.com'
        } else {
          try {
            derivedSource = new URL(ref).hostname
          } catch {
            // ignore
          }
        }
      }

      const updated = {
        source: derivedSource,
        medium:
          utmMedium || existing.medium || (derivedSource === 'chatgpt.com' ? 'referral' : undefined),
        campaign: utmCampaign || existing.campaign,
        referrer: ref || existing.referrer,
        landingPage: existing.landingPage || window.location.pathname,
      }

      if (updated.source || updated.referrer) {
        sessionStorage.setItem('fin_attribution', JSON.stringify(updated))
      }
    } catch {
      // ignore
    }
  }, [searchParams])

  return null
}

export const AttributionTracker: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <AttributionTrackerInner />
    </Suspense>
  )
}
