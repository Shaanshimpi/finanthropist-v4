'use client'
import React from 'react'
import Link from 'next/link'
import { homeContent } from '../content/homeContent'

export const WelcomeSection: React.FC = () => {
  const { welcome } = homeContent

  return (
    <section className="welcome-section absolute overflow-hidden  flex items-center justify-center" style={{ height: 'calc(100vh - 4rem)', minHeight: 'calc(100vh - 4rem)'}}>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ height: 'calc(100vh - 4rem)', minHeight: 'calc(100vh - 4rem)'}} />
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
          {/* Left column - headline and CTA */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="inline-block mb-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                <span className="text-xs font-semibold text-white">{welcome.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
                {welcome.title}
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-prose">
                {welcome.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {welcome.ctas.map((cta, index) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold transition-colors ${
                      index === 0
                        ? 'bg-[#FCC22F] hover:bg-[#FCC22F]/90 text-[#7A0F12] shadow-lg'
                        : 'border-2 border-white text-white hover:border-[#FCC22F]/60 bg-transparent'
                    }`}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - feature cards (light on light bg contrast) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {welcome.highlights.map((item, i) => (
                <div key={i} className="group relative rounded-2xl border border-white/20 bg-white/10 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] backdrop-blur-[2px] overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#C71C22]/15 via-[#FCC22F]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-[#FCC22F] shadow-[0_0_0_4px_rgba(252,194,47,0.2)]" />
                    <div>
                      <div className="text-lg md:text-xl font-extrabold text-white">{item.title}</div>
                      <div className="text-sm text-white/80 pt-1">
                        {item.desc}
                        {'details' in item && Array.isArray(item.details) && (
                          <div className="mt-2 space-y-1 text-xs text-white/70">
                            {item.details.map((phone) => (
                              <div key={phone}>{phone}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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

export default WelcomeSection


