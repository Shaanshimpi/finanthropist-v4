'use client'

import React from 'react'
import { Reveal } from '@/components/ui/Reveal'

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-24 pb-16 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#C71C22]/20 blur-3xl" />
        <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#FCC22F]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_60%)]" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 max-w-4xl">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold text-white/80 uppercase tracking-[0.25em]">
            Legal
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Privacy Policy
          </h1>
          <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-transparent" />
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={150}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                Finanthropist Educare Pvt Ltd (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
                protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with this
                policy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    We may collect personal information such as your name, email address, phone number, and payment
                    information when you register for our courses, contact us, or use our services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Usage Data</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    We automatically collect information about how you interact with our website, including IP address,
                    browser type, pages visited, and time spent on pages.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                <li>• To provide, maintain, and improve our educational services</li>
                <li>• To process your course registrations and payments</li>
                <li>• To communicate with you about your account, courses, and updates</li>
                <li>• To send you marketing communications (with your consent)</li>
                <li>• To analyze website usage and improve user experience</li>
                <li>• To comply with legal obligations and protect our rights</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the internet is 100% secure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                <li>• Access and receive a copy of your personal data</li>
                <li>• Request correction of inaccurate or incomplete data</li>
                <li>• Request deletion of your personal data</li>
                <li>• Object to processing of your personal data</li>
                <li>• Withdraw consent at any time</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">6. Contact Us</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="space-y-2 text-sm sm:text-base text-slate-300">
                <p>
                  <span className="font-semibold text-white">Email:</span> hello@finanthropist.in
                </p>
                <p>
                  <span className="font-semibold text-white">Phone:</span> +91 7066334499, +91 7066337676
                </p>
                <p>
                  <span className="font-semibold text-white">Address:</span> Nashik, Maharashtra, India
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

