'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Course', href: '/course' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const StaticHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [_headerHeight, setHeaderHeight] = useState(64)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Set body padding to account for fixed header
    const header = document.querySelector('header')
    if (header) {
      const height = header.offsetHeight
      setHeaderHeight(height)
      document.body.style.paddingTop = `${height}px`
    }

    return () => {
      document.body.style.paddingTop = '0'
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Check if click is not on the menu button
        const menuButton = document.querySelector('[aria-label="Toggle navigation menu"]')
        if (menuButton && !menuButton.contains(event.target as Node)) {
          setIsMenuOpen(false)
        }
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">

          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className=" relative">
              <Image
                src="/static-media/logo.png"
                alt="Finanthropist Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/course"
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
          ref={menuRef}
          className={`md:hidden transition-all duration-200 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
        >
          <div className="absolute inset-x-0 top-full">
            <div className="mx-[-1rem] sm:mx-0 rounded-b-3xl border-b border-gray-200 bg-white/95 backdrop-blur shadow-lg">
              
              <nav className="flex flex-col text-base font-medium text-gray-700 px-6 pb-4 pt-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 transition-colors ${
                      isActive(link.href)
                        ? 'bg-red-50 text-red-700'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-red-600'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive(link.href) && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-red-500">
                        Active
                      </span>
                    )}
                  </Link>
                ))}
                <Link
                  href="/course"
                  className="mt-3 inline-flex justify-center rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-red-700 transition-colors"
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
