'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-10 xl:px-14 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Company Info */}
          <div className="md:col-span-4 lg:col-span-5 xl:col-span-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/static-media/logo.png"
                  alt="Finanthropist Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-wide">FINANTHROPIST</h3>
                <p className="text-sm font-semibold text-red-400 uppercase tracking-[0.2em]">Educare</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
              Maharashtra&#39;s highest-rated share market education institute. Empowering students and professionals with
              expert-led financial knowledge, practical trading skills, and community-focused mentorship.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full border-2 border-gray-800 bg-gray-700/60 flex items-center justify-center text-sm font-semibold text-gray-200"
                  >
                    {index}K+
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">10,000+ Learners Trained</p>
                <p className="text-xs text-gray-400">Across Maharashtra and beyond since 2017</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-lg font-semibold mb-5 uppercase tracking-wide text-gray-200">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-lg font-semibold mb-5 uppercase tracking-wide text-gray-200">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/trading" className="text-gray-300 hover:text-white transition-colors">Trading Courses</Link></li>
              <li><Link href="/investment" className="text-gray-300 hover:text-white transition-colors">Investment Planning</Link></li>
              <li><Link href="/analysis" className="text-gray-300 hover:text-white transition-colors">Market Analysis</Link></li>
              <li><Link href="/certification" className="text-gray-300 hover:text-white transition-colors">Certification</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h4 className="text-lg font-semibold mb-5 uppercase tracking-wide text-gray-200">Contact</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300 text-sm">info@finanthropist.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300 text-sm">Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-14 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <p className="text-gray-400 text-sm">
              © 2024 Finanthropist Educare. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/refund" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
