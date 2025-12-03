'use client'

import React from 'react'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-24 pb-16 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#C71C22]/20 blur-3xl" />
        <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#FCC22F]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_60%)]" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 max-w-6xl">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold text-white/80 uppercase tracking-[0.25em]">
            About Us
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Finanthropist Educare Pvt Ltd
          </h1>
          <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-transparent" />
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Maharashtra&apos;s leading stock market education institute, empowering individuals and families
            with simple, practical financial education since 2017.
          </p>
        </Reveal>

        {/* Intro / Mission */}
        <Reveal delay={150} className="grid gap-8 lg:grid-cols-[3fr,2fr] items-start mb-14">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Learn Stock Market in Simple Marathi-English
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Finanthropist Educare Pvt Ltd is Maharashtra&apos;s leading stock market education institute,
              dedicated to empowering individuals and families with comprehensive financial knowledge.
              Since 2017, we have successfully trained over{' '}
              <span className="font-semibold text-[#FCC22F]">10,000+ families</span>, helping them move
              towards financial independence through practical trading education.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Our mission is to make stock market education accessible to everyone, regardless of educational
              background. We teach complex financial concepts in simple, easy-to-understand Marathi-English
              language so that every learner can confidently understand trading and investing.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/40">
              <p className="text-xs font-semibold text-[#FCC22F] uppercase tracking-wide mb-3">
                At a Glance
              </p>
              <dl className="space-y-3 text-sm text-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#C71C22]/20 text-xs text-[#FCC22F]">
                      01
                    </span>
                    Families Trained
                  </dt>
                  <dd className="font-semibold text-white text-right">10,000+ since 2017</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#C71C22]/20 text-xs text-[#FCC22F]">
                      02
                    </span>
                    Teaching Language
                  </dt>
                  <dd className="font-semibold text-white text-right">Easy Marathi-English</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#C71C22]/20 text-xs text-[#FCC22F]">
                      03
                    </span>
                    Google Rating
                  </dt>
                  <dd className="font-semibold text-[#FCC22F] text-right">5.0★ Trusted by Learners</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Leadership - separate section per member with placeholder image area */}
        <Reveal delay={200} className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Our Leadership Team</h2>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#FCC22F] mb-4">
            People behind Finanthropist
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Behind Finanthropist is a leadership team that believes in honest education, long-term
            relationships and real, practical results for every family that learns with us.
          </p>
        </Reveal>

        {/* Sammeer */}
        <Reveal delay={230} className="mb-8">
          <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center rounded-2xl border border-slate-800 bg-slate-900/75 p-5 sm:p-7 shadow-lg shadow-black/40">
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl border border-slate-700 overflow-hidden bg-slate-800">
                <Image
                  src="/static-media/sameer-about.png"
                  alt="Sammeer Sarang - Founder & Executive Director"
                  width={400}
                  height={500}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold text-[#FCC22F] uppercase tracking-wide">
                Founder &amp; Executive Director
              </p>
              <h3 className="text-xl font-bold text-white">Sammeer Sarang</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Maharashtra&apos;s most trusted stock market educator with{' '}
                <span className="font-semibold">23+ years of finance experience</span>, including 16 years in
                leading banks like HDFC and HSBC. Co-author of the book{' '}
                <span className="italic">&quot;Billionaire Mindset&quot;</span>, Sammeer has dedicated his
                career to transforming lives through practical trading education and a deep understanding of
                the local investor mindset.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Aayesha */}
        <Reveal delay={260} className="mb-8">
          <section className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center rounded-2xl border border-slate-800 bg-slate-900/75 p-5 sm:p-7 shadow-lg shadow-black/40">
            {/* Content */}
            <div className="order-2 md:order-1 space-y-3">
              <p className="text-[11px] font-semibold text-[#FCC22F] uppercase tracking-wide">
                Chairperson
              </p>
              <h3 className="text-xl font-bold text-white">Aayesha Sarang</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                As Chairperson, Aayesha provides strategic guidance and ensures that Finanthropist stays
                focused on its mission of genuine financial empowerment. Her clarity of vision and commitment
                to education help shape programs that create long-term impact for families across Maharashtra.
              </p>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl border border-slate-700 overflow-hidden bg-slate-800">
                <Image
                  src="/static-media/Aayesha-about.png"
                  alt="Aayesha Sarang - Chairperson"
                  width={400}
                  height={500}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </section>
        </Reveal>

        {/* Nikita */}
        <Reveal delay={290} className="mb-14">
          <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center rounded-2xl border border-slate-800 bg-slate-900/75 p-5 sm:p-7 shadow-lg shadow-black/40">
            {/* Placeholder image area */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-700 via-slate-500 to-slate-300 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/30 mix-blend-multiply" />
                <div className="relative flex h-full flex-col items-center justify-center text-center px-4">
                  <span className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-lg font-black text-slate-900 shadow">
                    NB
                  </span>
                  <p className="text-xs font-semibold tracking-wide text-white/80 uppercase">
                    Placeholder Image
                  </p>
                  <p className="mt-1 text-[11px] text-white/70">
                    Replace with professional photo of{' '}
                    <span className="font-semibold">Nikita Bhopale</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold text-[#FCC22F] uppercase tracking-wide">
                Director
              </p>
              <h3 className="text-xl font-bold text-white">Nikita Bhopale</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                As Director, Nikita oversees daily operations and ensures that every learner receives
                consistent, high-quality support. Her strong operations background helps maintain the standards
                of service that have made Finanthropist Maharashtra&apos;s most trusted stock market education
                provider.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Values / Commitment */}
        <Reveal delay={250}>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-lg shadow-black/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Our Commitment</h2>
            <p className="text-sm sm:text-base text-slate-300 mb-5">
              We believe that the right financial education can change the future of an entire family. That&apos;s
              why our team stays available even after the course ends, guiding learners through real market
              decisions with honesty and clarity.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">What We Stand For</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• <span className="font-semibold">Accessibility</span> – Learning that welcomes every background</li>
                  <li>• <span className="font-semibold">Practical Learning</span> – Strategies tested in real markets</li>
                  <li>• <span className="font-semibold">Family Focus</span> – Education designed for the entire family</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">How We Support You</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• <span className="font-semibold">Lifetime Guidance</span> for trading and investment decisions</li>
                  <li>• <span className="font-semibold">Transparent Teaching</span> with no hype or false promises</li>
                  <li>• <span className="font-semibold">Friendly Support</span> team that treats you like family</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}


