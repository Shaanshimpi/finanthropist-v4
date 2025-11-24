'use client'

import Link from 'next/link'
import React from 'react'
import { CheckCircle2, TrendingUp, ShieldCheck, Phone, Globe, ArrowRight, Star, Zap } from 'lucide-react'

import { useCourseContent } from '@/hooks/useCourseContent'
import { Reveal } from '@/components/ui/Reveal'

export const CoursePage: React.FC = () => {
  const { hero, topicsCovered, learningOutcomes, earningGuidance, support, contact } = useCourseContent()

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#FCC22F] selection:text-slate-950 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FCC22F]/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative border-b border-slate-800/50 py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="mx-auto max-w-5xl text-center">
              {/* Badge */}
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#FCC22F]/30 bg-[#FCC22F]/10 px-6 py-2 text-sm font-bold uppercase tracking-wider text-[#FCC22F] shadow-[0_0_15px_-3px_rgba(252,194,47,0.3)] backdrop-blur-sm">
                  <Star className="h-4 w-4 fill-current" />
                  {hero.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-center text-4xl font-black leading-tight text-white lg:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                {hero.headlinePrimary}
              </h1>
              <p className="mb-10 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FCC22F] to-[#F59E0B] lg:text-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                {hero.headlineAccent}
              </p>

              {/* Pricing removed as per request */}
              <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">


                <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4">
                  <Link
                    href="#contact"
                    className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-[#C71C22] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[#a5161b] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(199,28,34,0.6)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Enroll Now
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <Link
                    href="#details"
                    className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-bold text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600 backdrop-blur-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Covered */}
        <section id="details" className="py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mb-16 text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#FCC22F]">
                  {topicsCovered.badge}
                </p>
                <h2 className="text-3xl font-black text-white lg:text-5xl">{topicsCovered.title}</h2>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topicsCovered.items.map((item, index) => (
                  <Reveal
                    key={index}
                    delay={index * 100}
                    className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FCC22F]/30 hover:bg-slate-900/60 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-lg bg-blue-500/10 p-2 text-blue-400 group-hover:bg-[#FCC22F]/10 group-hover:text-[#FCC22F] transition-colors">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="relative py-20 lg:py-24 bg-slate-900/30 border-y border-slate-800/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mb-16 text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#FCC22F]">
                  {learningOutcomes.badge}
                </p>
                <h2 className="text-3xl font-black text-white lg:text-5xl">{learningOutcomes.title}</h2>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-2">
                {learningOutcomes.items.map((item, index) => (
                  <Reveal
                    key={index}
                    delay={index * 150}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 border border-slate-700/50 transition-all duration-300 hover:border-[#FCC22F]/50"
                  >
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#FCC22F]/5 blur-2xl transition-all group-hover:bg-[#FCC22F]/10"></div>

                    <h3 className="relative mb-4 text-2xl font-bold text-[#FCC22F] flex items-center gap-3">
                      <Zap className="h-6 w-6" />
                      {item.title}
                    </h3>
                    <p className="relative text-lg text-slate-300 leading-relaxed">{item.description}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Will Help */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <Reveal className="mb-16 text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#FCC22F]">
                  {earningGuidance.badge}
                </p>
                <h2 className="text-3xl font-black text-white lg:text-5xl">{earningGuidance.mainMessage}</h2>
              </Reveal>

              <div className="space-y-4">
                {earningGuidance.points.map((point, index) => (
                  <Reveal
                    key={index}
                    delay={index * 100}
                    className="flex items-center gap-6 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 transition-all hover:bg-slate-800/50 hover:border-slate-700"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCC22F] text-slate-950 font-bold">
                      {index + 1}
                    </div>
                    <p className="text-lg text-slate-200">{point}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Free Support */}
        <section className="py-20 lg:py-24 bg-slate-900/30 border-y border-slate-800/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mb-16 text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#FCC22F]">{support.badge}</p>
                <h2 className="text-3xl font-black text-white lg:text-5xl">{support.subtitle}</h2>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {support.items.map((item, index) => (
                  <Reveal
                    key={index}
                    delay={index * 100}
                    className="rounded-2xl border border-slate-700/50 bg-slate-800/20 p-6 backdrop-blur-sm transition-all hover:bg-slate-800/40"
                  >
                    <div className="mb-4 inline-block rounded-lg bg-green-500/10 p-3 text-green-400">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-medium text-slate-200">{item}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-[#C71C22]/10"></div>
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="mx-auto max-w-4xl text-center">
              <Reveal className="mb-6">
                <h2 className="text-4xl font-black text-white lg:text-6xl">
                  Ready to Start Your Trading Journey?
                </h2>
              </Reveal>
              <Reveal delay={100} className="mb-10">
                <p className="text-xl text-slate-300">
                  Join thousands of successful traders and investors. Get started today!
                </p>
              </Reveal>
              <Reveal delay={200} className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                <Link
                  href="#contact"
                  className="w-full rounded-xl bg-[#C71C22] px-10 py-5 text-xl font-bold text-white transition-all hover:bg-[#a5161b] hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(199,28,34,0.6)] sm:w-auto"
                >
                  Contact Us Now
                </Link>
                <Link
                  href="#contact"
                  className="w-full rounded-xl border-2 border-[#FCC22F] bg-transparent px-10 py-5 text-xl font-bold text-[#FCC22F] transition-all hover:bg-[#FCC22F] hover:text-slate-950 sm:w-auto"
                >
                  Get More Information
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 lg:py-24 border-t border-slate-800" id="contact">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal className="mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{contact.badge}</p>
              </Reveal>

              <div className="flex flex-col gap-6 sm:flex-row sm:justify-center sm:flex-wrap">
                {contact.numbers.map((number, index) => (
                  <Reveal
                    key={index}
                    delay={index * 100}
                    className="group relative flex w-full sm:w-auto min-w-[280px] flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-[#FCC22F] hover:bg-slate-800 hover:shadow-[0_0_30px_-10px_rgba(252,194,47,0.3)] hover:-translate-y-1"
                  >
                    <div className="mb-4 rounded-full bg-slate-800 p-4 text-[#FCC22F] transition-colors group-hover:bg-[#FCC22F] group-hover:text-slate-950">
                      <Phone className="h-8 w-8" />
                    </div>
                    <span className="mb-2 text-2xl font-black text-white">{number}</span>
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-[#FCC22F]">
                      Call Now
                    </span>
                  </Reveal>
                ))}
              </div>


            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CoursePage
