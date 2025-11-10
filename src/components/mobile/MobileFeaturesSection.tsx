'use client'

import React from 'react'

const featureList = [
  'Teaches You Share Market Basics to Advance in one course',
  'Lifetime Live Market Support',
  'One Fee for Full Family Education',
  'Daily Market Support & Live Q&A Session',
  'Live & Recording Versions',
  'Fee Refund Guarantee',
  'Trading, Investing, Swing & Life Psychology',
  'Easy Marathi-English Language'
]

export const MobileFeaturesSection: React.FC = () => (
  <section className="px-6">
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="space-y-3 text-center">
        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-white/80">
          Why Choose Us
        </span>
        <h2 className="text-2xl font-black text-white">
          <span className="block">Maharashtra&apos;s Only</span>
          <span className="block text-[#FCC22F]">Premier Institute</span>
        </h2>
      </div>
      <div className="space-y-4">
        {featureList.map((feature, index) => (
          <div key={feature} className="rounded-2xl border border-white/15 bg-slate-900/70 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C71C22] text-lg font-bold text-white shadow-lg">
                {index + 1}
              </div>
              <p className="text-base font-semibold text-white">{feature}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default MobileFeaturesSection

