'use client'
import React from 'react'
import Image from 'next/image'
import { homeContent } from '../content/homeContent'

export const FeaturesSection: React.FC = () => {
  const { features } = homeContent

  return (
    <section className="features-section relative overflow-hidden" style={{ minHeight: '100vh', height: '100vh', paddingTop: '4rem', marginBottom: '50vh' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
                     {/* Left Section - Static Image (hidden initially, shown when moving image arrives) */}
           <div className="flex justify-center lg:justify-start features-static-image-container">
             <div className="relative w-full max-w-md lg:max-w-lg" style={{ opacity: 0 }}>
               <Image
                 src="/static-media/Sammer-top.png"
                 alt="Professional Instructor - Sammer"
                 width={500}
                 height={600}
                 className="w-full h-auto object-contain object-bottom"
               />
             </div>
           </div>

          {/* Right Section - Stacking Cards */}
          <div className="space-y-6">
            {/* Section Heading */}
            <div className="text-center lg:text-left mb-8">
              <div className="inline-block mb-3 px-3 py-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                <span className="text-xs font-semibold text-slate-300">
                  {features.badge}
                </span>
              </div>
              <h2 className="text-xl lg:text-4xl xl:text-5xl font-black leading-tight">
                <span className="block text-white">
                  {features.titlePrimary}
                </span>
                <span className="block bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent">
                  {features.titleAccent}
                </span>
              </h2>
            </div>

            {/* Cards Container */}
            <div className="relative" style={{ height: 'calc((100vh - 4rem) * 0.5)' }}>
              {features.items.map((feature, index) => (
                                <div 
                  key={index} 
                  className="feature-item overflow-hidden rounded-[2rem]"
                  style={{ 
                    height: 'calc((100vh - 4rem) * 0.5)',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0'
                  }}
                >
                                      {/* OUT OF THE BOX CARD DESIGN */}
                    <div className="h-full group relative overflow-hidden">
                      {/* Main Card Container */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/95 to-slate-900 rounded-[2rem] backdrop-blur-2xl border border-slate-700/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"></div>
                      
                      {/* Floating Corner Element */}
                      {/* <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#C71C22]/20 via-[#FCC22F]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div> */}
                      
                      {/* Animated Border Gradient */}
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#C71C22]/0 via-[#FCC22F]/20 to-[#C71C22]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                        background: 'linear-gradient(90deg, transparent, rgba(199, 28, 34, 0.2), rgba(252, 194, 47, 0.2), rgba(199, 28, 34, 0.2), transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s infinite'
                      }}></div>
                      
                      {/* Diagonal Accent Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FCC22F]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="h-full flex flex-col p-8 lg:p-10 relative z-10 bg-opacity-0">
                        {/* Asymmetric Header */}
                        <div className="relative mb-8">
                          {/* Floating Number Badge - Asymmetric Position */}
                          <div className="absolute -left-4 top-0">
                            <div className="relative">
                              {/* Glow effect */}
                              {/* <div className="absolute inset-0 bg-gradient-to-br from-[#C71C22] to-[#FCC22F] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div> */}
                              {/* Main badge */}
                              <div className="relative w-20 h-20 bg-gradient-to-br from-[#C71C22] via-[#C71C22] to-[#FCC22F] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border-2 border-white/10">
                                <span className="text-white font-black text-3xl">{index + 1}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col justify-center pt-12">
                          {/* Feature Text - Large & Bold */}
                          <div className="pl-6">
                            <p className="text-white text-xl lg:text-3xl font-black leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#FCC22F] group-hover:to-white transition-all duration-500">
                              {feature}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Progress Bar */}
                        <div className="relative mt-8">
                          {/* Background bar */}
                          <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                            {/* Progress fill */}
                            <div 
                              className="h-full bg-gradient-to-r from-[#C71C22] via-[#FCC22F] to-[#C71C22] rounded-full transition-all duration-500"
                              style={{ width: `${((index + 1) / features.items.length) * 100}%` }}
                            ></div>
                          </div>
                          
                          {/* Progress Text */}
                          <div className="absolute -top-6 left-0 text-xs font-bold text-slate-400">
                            {index + 1} of {features.items.length}
                          </div>
                        </div>
                      </div>
                      
                      {/* Shimmer Animation */}
                      <style jsx>{`
                        @keyframes shimmer {
                          0% { background-position: -200% 0; }
                          100% { background-position: 200% 0; }
                        }
                      `}</style>
                    </div>
                </div>
              ))}
                         </div>

                        </div>
         </div>
       </div>
     </section>
   )
 }
