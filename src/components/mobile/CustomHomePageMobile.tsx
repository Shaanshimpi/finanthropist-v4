'use client'

import React from 'react'
import MobileHeroSection from './MobileHeroSection'
import MobileFeaturesSection from './MobileFeaturesSection'
import MobileWebinarSection from './MobileWebinarSection'
import MobileInstructorSection from './MobileInstructorSection'
import MobilePostInstructorSection from './MobilePostInstructorSection'
import MobileWelcomeSection from './MobileWelcomeSection'

export const CustomHomePageMobile: React.FC = () => {
  return (
    <div className="relative space-y-12 bg-slate-950 text-white pb-16">
      <MobileHeroSection />
      <MobileFeaturesSection />
      <MobileWebinarSection />
      <MobileInstructorSection />
      {/* <MobilePostInstructorSection /> */}
      <MobileWelcomeSection />
    </div>
  )
}

export default CustomHomePageMobile

