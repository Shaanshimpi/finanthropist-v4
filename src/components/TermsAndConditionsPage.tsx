'use client'

import React from 'react'
import { Reveal } from '@/components/ui/Reveal'

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </h1>
          <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-transparent" />
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={150}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                By accessing and using the services of Finanthropist Educare Pvt Ltd, you accept and agree to be bound
                by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our
                services.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">2. Course Enrollment</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Registration</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    To enroll in our courses, you must provide accurate and complete information. You are responsible for
                    maintaining the confidentiality of your account credentials.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Payment</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Course fees must be paid in full before course commencement. All fees are non-refundable unless
                    otherwise stated in our refund policy or as required by applicable law.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                All course materials, including but not limited to videos, documents, presentations, and other
                educational content, are the intellectual property of Finanthropist Educare Pvt Ltd. You may not:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                <li>• Reproduce, distribute, or share course materials without authorization</li>
                <li>• Record or capture course sessions without permission</li>
                <li>• Use course content for commercial purposes</li>
                <li>• Remove copyright or proprietary notices from materials</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">4. Student Conduct</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                Students are expected to maintain respectful and professional conduct during all course activities. We
                reserve the right to remove any student who engages in:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                <li>• Harassment, discrimination, or inappropriate behavior</li>
                <li>• Sharing of course materials without authorization</li>
                <li>• Disruption of classes or learning activities</li>
                <li>• Violation of any applicable laws or regulations</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our courses provide educational information about stock market trading and investing. We do not provide
                financial advice, and all trading decisions are your own responsibility. Past performance does not
                guarantee future results. Trading involves risk, and you may lose money.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Finanthropist Educare Pvt Ltd shall not be liable for any indirect, incidental, special, or
                consequential damages arising from your use of our services or course materials. Our total liability
                shall not exceed the amount you paid for the course.
              </p>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">7. Modifications</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
                immediately upon posting on our website. Your continued use of our services after changes constitutes
                acceptance of the modified terms.
              </p>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">8. Contact Information</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                For questions about these Terms and Conditions, please contact us:
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

