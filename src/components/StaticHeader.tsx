'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const StaticHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">

          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className=" relative">
              <Image
                src="/static-media/logo.png"
                alt="Finanthropist Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/course" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Course
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/enroll"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-200 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
        >
          <div className="absolute inset-x-0 top-16">
            <div className="mx-[-1rem] sm:mx-0 rounded-b-3xl border-b border-gray-200 bg-white/95 backdrop-blur px-6 py-5 shadow-lg">
              <nav className="flex flex-col space-y-4 text-base font-medium text-gray-700">
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Home
                </Link>
                <Link href="/course" className="hover:text-red-600 transition-colors">
                  Course
                </Link>
                <Link href="/contact" className="hover:text-red-600 transition-colors">
                  Contact
                </Link>
                <Link
                  href="/enroll"
                  className="mt-2 inline-flex justify-center rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-red-700 transition-colors"
                >
                  Enroll Now
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
