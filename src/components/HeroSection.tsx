'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="container mx-auto px-4 lg:px-8 w-full h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full h-full">
          
          {/* Left Section - Content */}
          <div className="space-y-3 lg:space-y-4 flex flex-col justify-center h-full text-white">
            
            {/* No. 1 Badge - No container box */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-20 h-20 lg:w-28 lg:h-28">
                <Image
                  src="/static-media/no1.png"
                  alt="No. 1 Customer Satisfaction Badge"
                  width={112}
                  height={112}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-1.5 text-center lg:text-left">
              <div className="inline-block mb-1.5 px-3 py-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                <span className="text-xs font-semibold text-slate-300">
                  Maharashtra's #1 Institute
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight">
                <span className="block text-white">
                  Learn Share Market
                </span>
                <span className="block mt-0.5 bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent animate-gradient-x">
                  From Zero to Hero
                </span>
                <span className="block mt-0.5 text-slate-400 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
                  Master Trading
                </span>
              </h1>
            </div>
            
            {/* Rating Block */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl text-white p-3 lg:p-4 rounded-2xl max-w-md mx-auto lg:mx-0 shadow-2xl border border-slate-700/50 transform transition-all duration-500 hover:scale-105 hover:border-[#FCC22F]/30">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    Finanthropist
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full border border-green-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-400">Live</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-black text-white">5.0</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#FCC22F]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold">2,486+ Verified Reviews</span>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <Link
                href="/courses"
                className="group relative bg-[#C71C22] hover:bg-[#C71C22]/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[#C71C22]/50 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Explore Courses</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/demo"
                className="group bg-slate-800/50 backdrop-blur-xl border-2 border-slate-600 text-white hover:border-[#FCC22F]/50 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-slate-700/50 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Free Demo</span>
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right Section - Instructor Image */}
          <div className="flex justify-center h-full relative">
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Main Instructor Image */}
                             <div className="relative w-full max-w-md lg:max-w-lg">
                 <div className="relative transform transition-transform duration-700 hover:scale-105">
                                       <div className="relative">
                      {/* Fading mask at bottom */}
                      <div className="fade-overlay absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, #0f172a 0%, #0f172a 40%, rgba(15, 23, 42, 0.9) 60%, rgba(15, 23, 42, 0.7) 80%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }}></div>
                      <Image
                        src="/static-media/sameer-fist.png"
                        alt="Professional Instructor - Sammer"
                        width={500}
                        height={600}
                        className="w-full h-auto object-contain object-bottom"
                      />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
