'use client'
import React from 'react'
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
    <section className="features-section relative overflow-hidden" style={{ minHeight: 'calc(100vh - 4rem)', height: 'calc(100vh - 4rem)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
                     {/* Left Section - Image */}
           <div className="flex justify-center lg:justify-start">
             <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
               {/* Fading mask at bottom */}
               <div className="fade-overlay absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, #0f172a 0%, #0f172a 40%, rgba(15, 23, 42, 0.9) 60%, rgba(15, 23, 42, 0.7) 80%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }}></div>
               <Image
                 src="/static-media/Sammer-top.png"
                 alt="Professional Instructor - Sammer"
                 width={400}
                 height={500}
                 className="w-full h-full object-contain object-bottom"
               />
             </div>
           </div>

          {/* Right Section - Stacking Cards */}
          <div className="space-y-6">
            {/* Section Heading */}
            <div className="text-center lg:text-left mb-8">
              <div className="inline-block mb-3 px-3 py-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                <span className="text-xs font-semibold text-slate-300">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-tight">
                <span className="block text-white">
                  Maharashtra's Only
                </span>
                <span className="block bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent">
                  Premier Institute
                </span>
              </h2>
            </div>

            {/* Cards Container */}
            <div className="relative" style={{ height: 'calc((100vh - 4rem) * 0.5)' }}>
              {features.map((feature, index) => (
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
                              <div className="relative w-20 h-20 bg-gradient-to-br from-[#C71C22] via-[#C71C22]/80 to-[#FCC22F]/40 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border-2 border-white/10">
                                <span className="text-white font-black text-3xl">{index + 1}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content - Diagonal Layout */}
                        <div className="flex-1 flex flex-col justify-center pt-12">
                          {/* Decorative Arrow/Line */}
                          <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-16 h-0.5 bg-gradient-to-r from-[#C71C22] to-[#FCC22F]"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-[#FCC22F] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                          </div>
                          
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
                              style={{ width: `${((index + 1) / features.length) * 100}%` }}
                            ></div>
                          </div>
                          
                          {/* Progress Text */}
                          <div className="absolute -top-6 left-0 text-xs font-bold text-slate-400">
                            {index + 1} of {features.length}
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
