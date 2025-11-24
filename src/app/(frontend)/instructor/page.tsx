"use client"
import Image from 'next/image'
import Link from 'next/link'

export default function InstructorPage() {
  return (
    <main className="min-h-screen">
      {/* Light theme wrapper to match webinar light mode */}
      <div className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <section className="relative z-10 bg-white">
          <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block mb-3 px-3 py-1 bg-amber-100/70 rounded-full border border-amber-200">
                  <span className="text-xs font-semibold text-amber-900">Instructor</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  Meet Sammeer Sarang
                </h1>
                <p className="mt-4 text-slate-700 text-base lg:text-lg leading-relaxed">
                  Maharashtra&#39;s most trusted stock market educator with 23+ years of finance experience and a proven track record
                  of transforming lives through practical trading education.
                </p>

                {/* Quick stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <div className="text-2xl font-extrabold text-amber-900">23+ yrs</div>
                    <div className="text-xs font-semibold text-amber-800">Experience</div>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <div className="text-2xl font-extrabold text-amber-900">10,000+</div>
                    <div className="text-xs font-semibold text-amber-800">Families</div>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <div className="text-2xl font-extrabold text-amber-900">5.0★</div>
                    <div className="text-xs font-semibold text-amber-800">Google Rating</div>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">Sammeer Sarang — Stock Market Expert & Educator</div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">87% Success Rate</div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">Nashik, Maharashtra</div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">Serving all of Maharashtra</div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/register" className="bg-[#C71C22] hover:bg-[#C71C22]/90 text-white px-6 py-3 rounded-xl font-bold text-base transition-all shadow-lg">
                    Enroll Now
                  </Link>
                  <Link href="/webinar" className="bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 px-6 py-3 rounded-xl font-bold text-base transition-all border border-slate-200">
                    Join Free Webinar
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-80 h-96 lg:w-[480px] lg:h-[560px]">
                  <div className="absolute inset-x-0 bottom-0 h-20" style={{
                    background: 'linear-gradient(to top, #ffffff 0%, #ffffff 40%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.7) 80%, transparent 100%)',
                    pointerEvents: 'none', zIndex: 10
                  }} />
                  <Image
                    src="/static-media/sameer-fist.png"
                    alt="Instructor — Sammeer Sarang"
                    width={600}
                    height={700}
                    className="w-full h-full object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="relative z-10 bg-white">
          <div className="container mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6">Professional Credentials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: '16 Years at HDFC Bank', desc: 'Senior finance professional with deep banking experience' },
                { title: 'HSBC Experience', desc: 'International banking and finance expertise' },
                { title: 'Published Author', desc: "Co-author of &#39;Billionaire Mindset&#39; book" },
                { title: '10,000+ families Trained', desc: 'Successful track record since 2017' },
                { title: '23+ Years Finance Experience', desc: 'Proven expertise in financial markets' },
                { title: 'Maharashtra Focus', desc: 'Understanding local investor mindset' }
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-base font-extrabold text-slate-900">{item.title}</div>
                  <div className="text-sm text-slate-600 mt-1.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}


