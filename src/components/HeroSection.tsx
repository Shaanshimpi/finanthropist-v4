'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full h-full">
          
          {/* Left Section - Content */}
          <div className="space-y-4 lg:space-y-6 flex flex-col justify-center h-full">
            
            {/* No. 1 Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32">
                <Image
                  src="/static-media/no1.png"
                  alt="No. 1 Customer Satisfaction Badge"
                  width={128}
                  height={128}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Maharashtra's
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  Highest Rated
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Share Market
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Education Institute
                </span>
              </h2>
            </div>
            
            {/* Rating Block */}
            <div className="bg-black text-white p-3 lg:p-4 rounded-xl max-w-sm mx-auto lg:mx-0 shadow-lg">
              <div className="space-y-2">
                <h3 className="text-base lg:text-lg font-semibold">Finanthropist Educare</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xl lg:text-2xl font-bold">5.0</span>
                  <div className="flex space-x-1">
                    <span className="text-yellow-400 text-lg lg:text-xl">★★★★★</span>
                  </div>
                </div>
                <p className="text-xs lg:text-sm text-gray-300">2,486 Google reviews</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/courses"
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold text-sm lg:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>View Courses</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/demo"
                className="group border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold text-sm lg:text-base transition-all duration-300 hover:bg-red-50"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Free Demo</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          
          {/* Right Section - Instructor Image */}
          <div className="flex justify-center h-full">
            <div className="relative flex items-end justify-center h-full">
              {/* Main Instructor Image - Starting from bottom - HIDDEN (animated image used instead) */}
              <div className="w-80 h-96 lg:w-96 lg:h-[500px] relative opacity-0 pointer-events-none">
                <Image
                  src="/static-media/Sammer-top.png"
                  alt="Professional Instructor - Sammer"
                  width={400}
                  height={500}
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs lg:text-sm">✓</span>
              </div>
              <div className="absolute bottom-4 left-4 w-10 h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs">5★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
