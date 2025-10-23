'use client'
import React from 'react'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { WebinarSection } from './WebinarSection'

export const CustomHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <WebinarSection />
    </div>
  )
}