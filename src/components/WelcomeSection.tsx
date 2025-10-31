'use client'
import React from 'react'
import Link from 'next/link'

export const WelcomeSection: React.FC = () => {
  return (
    <section className="welcome-section relative overflow-hidden opacity-0" style={{ height: 'calc(100vh - 4rem)', minHeight: 'calc(100vh - 4rem)', marginBottom: '50vh' }}>
      <div className="absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
          {/* Left column - headline and CTA */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="inline-block mb-1.5 px-3 py-1 bg-amber-100/70 rounded-full border border-amber-200">
                <span className="text-xs font-semibold text-amber-900">Welcome</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-900">
                We Welcome You to
              </h2>
              <p className="text-slate-700 text-base md:text-lg max-w-prose">
                Learn and grow with Maharashtra's trusted team. Discover how we guide families to long-term success in finance and trading.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C71C22] hover:bg-[#C71C22]/90 text-white px-5 py-2.5 font-bold shadow-lg transition-colors"
                >
                  Know More About Us
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 text-slate-900 hover:border-[#FCC22F]/60 px-5 py-2.5 font-bold transition-colors bg-white"
                >
                  Call Now
                </Link>
              </div>
            </div>
          </div>

          {/* Right column - feature cards (light on light bg contrast) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {[
                { title: 'Most Friendly Support Team', desc: 'Real humans who care, guiding you step by step.' },
                { title: 'Lifetime Help', desc: 'For Financial Decisions & Trading throughout your journey.' },
                { title: 'Family Education', desc: 'Empowering your entire family with financial wisdom.' },
                { title: 'Call Now', desc: 'Speak to our experts and get started the right way.' },
              ].map((item, i) => (
                <div key={i} className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#C71C22]/15 via-[#FCC22F]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-[#FCC22F] shadow-[0_0_0_4px_rgba(252,194,47,0.2)]" />
                    <div>
                      <div className="text-lg md:text-xl font-extrabold text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-600 pt-1">{item.desc}</div>
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


