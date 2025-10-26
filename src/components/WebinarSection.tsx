'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const WebinarSection: React.FC = () => {
  const webinarFeatures = [
    "No Education or Experience Required",
    "We Don't Force to Join Our Course",
    "Try & Attend with Family (Specially Husband-Wife)",
    "Attend for 20 mins, then Decide Worth it or Not",
    "Easy Marathi-English Language"
  ]

  return (
    <section className="webinar-section py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Section - Content */}
          <div className="space-y-8">
            
            {/* Main Heading */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
                Free Live Webinar
              </h2>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {webinarFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <Link
                href="/webinar"
                className="group inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold text-base lg:text-lg transition-colors"
              >
                <span>Read More</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Section - Instructor Image - HIDDEN (animated image used instead) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Instructor Image */}
              <div className="w-72 h-80 lg:w-80 lg:h-96 relative opacity-0 pointer-events-none">
                <Image
                  src="/static-media/Sammer-top.png"
                  alt="Professional Instructor - Sammer"
                  width={320}
                  height={400}
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
