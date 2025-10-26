'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const FeaturesSection: React.FC = () => {
  const features = [
    "Teaches You Share Market Basics to Advance in one course",
    "Lifetime Live Market Support",
    "One Fee for Full Family Education",
    "Daily Market Support & Live Q&A Session",
    "Live & Recording Versions",
    "Fee Refund Guarantee",
    "Trading, Investing, Swing & Life Psychology",
    "Easy Marathi-English Language"
  ]

  return (
    <section className="features-section bg-white relative overflow-hidden" style={{ minHeight: '100vh', height: '100vh' }}>
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Section - Heading */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="relative w-64 h-80 lg:w-80 lg:h-96">
                <Image
                  src="/static-media/Sammer-top.png"
                  alt="Professional Instructor - Sammer"
                  width={320}
                  height={400}
                  className="w-full h-full object-contain object-bottom"
                />
                {/* Gradient fade at the bottom to prevent hard cutoff */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              <span className="text-gray-900">
                Maharashtra's Only
              </span>
              <br />
              <span className="text-red-600">
                Institute
              </span>
            </h2>
            <Link
              href="/courses"
              className="group inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold text-base lg:text-lg transition-colors"
            >
              <span>Read More</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Right Section - Stacking Cards */}
          <div className="relative" style={{ height: '50vh' }}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-item"
                style={{ 
                  height: '50vh',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0'
                }}
              >
                <div className="h-full bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  {/* Background decorative element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex flex-col h-full justify-between relative z-10">
                    {/* Top section with number badge */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <span className="text-white font-bold text-2xl">{index + 1}</span>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                        <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="flex-1 flex items-center">
                      <p className="text-gray-900 text-xl lg:text-3xl font-bold leading-relaxed">
                        {feature}
                      </p>
                    </div>

                    {/* Bottom decorative line */}
                    <div className="mt-8 h-1.5 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
