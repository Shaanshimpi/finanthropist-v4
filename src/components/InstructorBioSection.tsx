'use client'
import React from 'react'
import Image from 'next/image'
import { useHomeContent } from '@/hooks/useHomeContent'

export const InstructorBioSection: React.FC = () => {
  const { instructor } = useHomeContent()

  return (
    <section className="instructor-bio-section relative overflow-hidden" style={{ minHeight: '100vh', height: '100vh', paddingTop: '4rem', marginBottom: '50vh' }}>
      {/* Background pattern stays global via CustomHomePage */}
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center w-full h-full">
          {/* Left: Instructor Image */}
          <div className="flex justify-center lg:justify-start items-end h-full">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src="/static-media/sameer-fist.png"
                alt="Professional Instructor - Sammeer Sarang"
                width={500}
                height={600}
                className="w-full h-auto object-contain object-bottom opacity-0"
              />
            </div>
          </div>

          {/* Right: Content (Light theme) */}
          <div className="space-y-4 text-slate-900 instructor-content-wrapper">
            <div className="flex justify-center lg:justify-start">
              <div className="inline-block mb-1.5 px-3 py-1 bg-amber-100/70 rounded-full border border-amber-200 instructor-badge">
                <span className="text-xs font-semibold text-amber-900">{instructor.badge}</span>
              </div>
            </div>

            <div className="text-center lg:text-left space-y-1.5">
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-black leading-tight">
                <span className="md:text-3xl block text-slate-900 instructor-title">
                  {instructor.heading}
                </span>
                <span className="block mt-0.5 bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent">
                  {instructor.name}
                </span>
              </h2>
              <p className="text-sm lg:text-base text-slate-700 leading-relaxed instructor-content">
                {instructor.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {instructor.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="instructor-stats-card rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100/80 backdrop-blur-sm p-3 instructor-card relative overflow-hidden"
                >
                  <div className="text-2xl font-extrabold text-amber-900 instructor-card-text">{stat.value}</div>
                  <div className="text-xs font-semibold text-amber-800 instructor-card-text">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Meta */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700 instructor-content">
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">Sammeer Sarang — Stock Market Expert & Educator</div>
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">87% Success Rate</div>
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">Nashik, Maharashtra</div>
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">Serving all of Maharashtra</div>
            </div> */}

            {/* Credentials */}
            <div>
              <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3">Professional Credentials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {instructor.credentials.map((item) => {
                  const isWide = 'wide' in item && Boolean(item.wide)
                  return (
                    <div
                      key={item.title}
                      className={`instructor-credential-card rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50/50 backdrop-blur-sm p-3 instructor-card relative overflow-hidden ${isWide ? 'sm:col-span-2' : ''
                        }`}
                    >
                      <div className="text-sm font-extrabold text-slate-900 instructor-card-text instructor-card-title">{item.title}</div>
                      <div className="text-xs text-slate-600 mt-1 instructor-card-text">{item.desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


