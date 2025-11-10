'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white/90 pt-16 pb-10 border-t border-white/10">
      <div className="relative">
        {/* Glow accent */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center">
          <div className="h-32 w-[60%] max-w-3xl bg-gradient-to-r from-[#C71C22]/20 via-[#FCC22F]/25 to-[#C71C22]/20 blur-3xl opacity-60"></div>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        {/* Brand block */}
        <div className="max-w-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#C71C22] via-[#FCC22F] to-[#C71C22] shadow-lg">
              <div className="absolute inset-1 rounded-2xl bg-slate-950/90 backdrop-blur-sm"></div>
              <span className="relative z-10 flex h-full items-center justify-center text-xl font-extrabold text-white">
                F
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Finanthropist</p>
              <p className="text-sm text-white/60">Empowering Maharashtra&apos;s investors with world-class financial education.</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            From foundational market literacy to advanced trading psychology, we help families build resilient, profitable financial journeys with expert guidance and lifetime support.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#FCC22F]"></span>
              SEBI Registered Mentors
            </span>
            <span className="hidden items-center gap-2 md:flex">
              <span className="inline-block h-2 w-2 rounded-full bg-[#C71C22]"></span>
              15K+ Learners
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid flex-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#features">
                  Features
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#curriculum">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#webinar">
                  Live Webinars
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#testimonials">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Resources</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#faq">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#pricing">
                  Investment Plans
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="#blog">
                  Insights &amp; Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <Link className="transition hover:text-[#FCC22F]" href="mailto:hello@finanthropist.in">
                  hello@finanthropist.in
                </Link>
              </li>
              <li className="text-white/60">+91 98765 43210</li>
              <li className="text-white/60">Pune, Maharashtra</li>
              <li className="flex gap-3 pt-1">
                {[
                  { name: 'Instagram', href: 'https://www.instagram.com/', label: 'IG' },
                  { name: 'YouTube', href: 'https://www.youtube.com/', label: 'YT' },
                  { name: 'Telegram', href: 'https://www.telegram.org/', label: 'TG' }
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-white transition hover:border-[#FCC22F] hover:text-[#FCC22F]"
                  >
                    {social.label}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Finanthropist. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link className="transition hover:text-[#FCC22F]" href="#privacy">
              Privacy Policy
            </Link>
            <Link className="transition hover:text-[#FCC22F]" href="#terms">
              Terms &amp; Conditions
            </Link>
            <Link className="transition hover:text-[#FCC22F]" href="#refund">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
