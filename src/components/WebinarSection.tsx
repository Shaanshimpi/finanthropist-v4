'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useHomeContent } from '@/hooks/useHomeContent'

export const WebinarSection: React.FC = () => {
  const { webinar } = useHomeContent()

  return (
    <section className="webinar-section flex items-center relative overflow-hidden" style={{ height: '100vh', minHeight: '100vh', paddingTop: '4rem', marginBottom: '50vh' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="container mx-auto px-4 lg:px-8 w-full h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full h-full">
          
          {/* Left Section - Content */}
          <div className="space-y-6 flex flex-col justify-center h-full text-white webinar-content">
            
            {/* Section Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="webinar-badge inline-block mb-1.5 px-3 py-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                <span className="text-xs font-semibold text-slate-300">{webinar.badge}</span>
              </div>
            </div>
            
            {/* Main Heading */}
            <div className="text-center lg:text-left space-y-1.5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                <span className="block text-white webinar-title">
                  {webinar.titlePrimary}
                </span>
                <span className="block mt-0.5 bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent">
                  {webinar.titleAccent}
                </span>
              </h2>
            </div>

            {/* Features List - Card Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {webinar.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="webinar-card group relative backdrop-blur-sm rounded-2xl p-4 lg:p-5 transition-all duration-300"
                  style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', borderColor: 'rgba(51, 65, 85, 0.4)', borderWidth: '1px' }}
                >
                  <div className="relative flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#C71C22] to-[#C71C22]/80 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="webinar-card-text text-white text-sm lg:text-base leading-relaxed font-medium flex-1">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              {webinar.ctas.map((cta, index) => {
                const isPrimary = index === 0
                return (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={`group ${
                      isPrimary
                        ? 'bg-[#C71C22] hover:bg-[#C71C22]/90 text-white px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-[#C71C22]/50 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2'
                        : 'bg-slate-800/50 backdrop-blur-xl border-2 border-slate-600 text-white hover:border-[#FCC22F]/50 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:bg-slate-700/50 transform hover:-translate-y-1 flex items-center justify-center gap-2'
                    }`}
                  >
                    {isPrimary ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    <span>{cta.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Section - Instructor Image */}
          <div className="flex justify-center lg:justify-start h-full relative" style={{ minHeight: '600px' }}>
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="relative">
                <div className="fade-overlay absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, #0f172a 0%, #0f172a 40%, rgba(15, 23, 42, 0.9) 60%, rgba(15, 23, 42, 0.7) 80%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }}></div>
                <Image
                  src="/static-media/Sammer-top.png"
                  alt="Professional Instructor - Sammer"
                  width={500}
                  height={600}
                  className="w-full h-auto object-contain object-bottom"
                  style={{ opacity: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
