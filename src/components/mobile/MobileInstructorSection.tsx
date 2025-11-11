'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { initMobileInstructorTheme } from '../animations/mobile'
import type { MobileScheduleAnimation } from './CustomHomePageMobile'
import { homeContent } from '../../content/homeContent'

const darkThemeVars: Record<string, string> = {
  '--instructor-bg': 'rgba(15, 23, 42, 0.45)',
  '--instructor-border': 'rgba(255, 255, 255, 0.12)',
  '--instructor-text': '#ffffff',
  '--instructor-heading': '#ffffff',
  '--instructor-subtext': 'rgba(255, 255, 255, 0.72)',
  '--instructor-badge-bg': 'rgba(255, 255, 255, 0.08)',
  '--instructor-badge-border': 'rgba(255, 255, 255, 0.2)',
  '--instructor-badge-text': 'rgba(255, 255, 255, 0.85)',
  '--instructor-card-bg': 'rgba(148, 163, 184, 0.18)',
  '--instructor-card-border': 'rgba(255, 255, 255, 0.18)',
  '--instructor-card-text': '#ffffff',
  '--instructor-card-subtext': 'rgba(255, 255, 255, 0.72)',
}

const lightThemeVars: Record<string, string> = {
  '--instructor-bg': '#ffffff',
  '--instructor-border': 'rgba(148, 163, 184, 0.35)',
  '--instructor-text': '#0f172a',
  '--instructor-heading': '#0f172a',
  '--instructor-subtext': '#475569',
  '--instructor-badge-bg': '#fef3c7',
  '--instructor-badge-border': 'rgba(251, 191, 36, 0.6)',
  '--instructor-badge-text': '#92400e',
  '--instructor-card-bg': '#f8fafc',
  '--instructor-card-border': '#e2e8f0',
  '--instructor-card-text': '#0f172a',
  '--instructor-card-subtext': '#475569',
}

const containerStyle: React.CSSProperties = {
  ...darkThemeVars,
  backgroundColor: 'var(--instructor-bg)',
  color: 'var(--instructor-text)',
  borderColor: 'var(--instructor-border)',
} as React.CSSProperties

const globalDarkThemeVars: Record<string, string> = {
  '--page-bg': '#080f1f',
  '--page-text': '#ffffff',
  '--page-border': 'rgba(255, 255, 255, 0.12)',
}

const globalLightThemeVars: Record<string, string> = {
  '--page-bg': '#f8fafc',
  '--page-text': '#0f172a',
  '--page-border': 'rgba(15, 23, 42, 0.15)',
}

type MobileInstructorSectionProps = {
  scheduleAnimation?: MobileScheduleAnimation
}

export const MobileInstructorSection: React.FC<MobileInstructorSectionProps> = ({
  scheduleAnimation,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { instructor } = homeContent

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 1024) return

    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const applyTheme = () =>
      initMobileInstructorTheme(sectionEl, {
        start: 'top center',
        lightTheme: lightThemeVars,
        darkTheme: darkThemeVars,
        lightGlobalTheme: globalLightThemeVars,
        darkGlobalTheme: globalDarkThemeVars,
        classNames: {
          light: 'mobile-theme-light',
          dark: 'mobile-theme-dark',
        },
        duration: 0.7,
        ease: 'power2.inOut',
      })

    let cleanup: (() => void) | undefined
    const delayed = scheduleAnimation?.('instructor', () => {
      cleanup = applyTheme()
    })

    if (!scheduleAnimation) {
      cleanup = applyTheme()
    }

    return () => {
      delayed?.()
      cleanup?.()
    }
  }, [scheduleAnimation])

  return (
    <section className="px-6">
      <div
        ref={sectionRef}
        className="space-y-6 rounded-3xl border p-6 backdrop-blur-sm transition-colors duration-700"
        style={containerStyle}
      >
        <div className="flex flex-col items-center space-y-3 text-center">
          <span
            className="inline-block rounded-full px-4 py-1 text-xs font-semibold"
            style={{
              backgroundColor: 'var(--instructor-badge-bg)',
              borderColor: 'var(--instructor-badge-border)',
              color: 'var(--instructor-badge-text)',
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          >
            {instructor.badge}
          </span>
          <h2 className="text-2xl font-black leading-tight" style={{ color: 'var(--instructor-heading)' }}>
            <span className="block">{instructor.heading}</span>
            <span className="block bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent">
              {instructor.name}
            </span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--instructor-subtext)' }}>
            {instructor.description}
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
          {instructor.stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-4 text-center transition-colors duration-500"
              style={{
                backgroundColor: 'var(--instructor-card-bg)',
                borderColor: 'var(--instructor-card-border)',
                color: 'var(--instructor-card-text)',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              <p className="text-xl font-extrabold">{item.value}</p>
              <p className="text-xs font-semibold" style={{ color: 'var(--instructor-card-subtext)' }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-black" style={{ color: 'var(--instructor-heading)' }}>
            Professional Credentials
          </h3>
          <div className="grid gap-3">
            {instructor.credentials.map((item) => {
              const isWide = 'wide' in item && Boolean(item.wide)
              return (
              <div
                key={item.title}
                className={`rounded-2xl p-4 transition-colors duration-500 ${isWide ? 'sm:col-span-2' : ''}`}
                style={{
                  backgroundColor: 'var(--instructor-card-bg)',
                  borderColor: 'var(--instructor-card-border)',
                  color: 'var(--instructor-card-text)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <p className="text-sm font-extrabold">{item.title}</p>
                <p className="mt-2 text-xs" style={{ color: 'var(--instructor-card-subtext)' }}>
                  {item.desc}
                </p>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileInstructorSection

