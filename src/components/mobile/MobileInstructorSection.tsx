'use client'

import React from 'react'
import Image from 'next/image'

const instructorStats = [
  { label: 'Experience', value: '23+ yrs' },
  { label: 'Families', value: '10,000+' },
  { label: 'Google Rating', value: '5.0★' }
]

const instructorCredentials = [
  { title: '16 years of finance Experience', desc: 'In banks like HDFC and HSBC' },
  { title: "Published Author", desc: "Co-author of ' Billionaire Mindset'  book" },
  { title: '10,000+ families Trained', desc: 'Successful track record since 2017' },
  { title: '23+ Years Finance Experience', desc: 'Proven expertise in financial markets' },
  { title: 'Maharashtra Focus', desc: 'Understanding local investor mindset' }
]

export const MobileInstructorSection: React.FC = () => (
  <section className="px-6">
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white text-slate-900 p-6">
      <div className="flex flex-col items-center space-y-3 text-center">
        <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold text-amber-900">
          Instructor
        </span>
        <h2 className="text-2xl font-black">
          <span className="block">Meet Our Expert Educator</span>
          <span className="block text-transparent bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text">
            Sameer Sarang
          </span>
        </h2>
        <p className="text-sm text-slate-600">
          Maharashtra&apos;s most trusted stock market educator with 23+ years of finance experience and a proven track record of transforming lives through practical trading education.
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src="/static-media/sameer-fist.png"
          alt="Professional Instructor - Sameer Sarang"
          width={500}
          height={600}
          className="w-full max-w-xs"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {instructorStats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
            <p className="text-xl font-extrabold text-amber-900">{item.value}</p>
            <p className="text-xs font-semibold text-amber-800">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-black text-slate-900">Professional Credentials</h3>
        <div className="grid gap-3">
          {instructorCredentials.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-extrabold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default MobileInstructorSection

