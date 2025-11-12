'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { footerContent } from '../content/footerContent'

export const Footer: React.FC = () => {
  const { logo, description, highlights, linkGroups, contact, bottomLinks, copyright } = footerContent
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white/90 pt-16 pb-10 border-t border-white/10">
      <div className="relative">
        {/* Glow accent */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center">
          <div className="h-32 w-[60%] max-w-3xl bg-gradient-to-r from-[#C71C22]/20 via-[#FCC22F]/25 to-[#C71C22]/20 blur-3xl opacity-60"></div>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left lg:px-8">
        {/* Brand block */}
        <div className="max-w-sm">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={300}
            height={300}
            className="w-full max-w-[220px] object-contain"
          />
        </div>

        {/* Quick links */}
        <div className="grid flex-1 gap-10 text-center  sm:text-left sm:grid-cols-2 lg:grid-cols-3">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link className="transition hover:text-[#FCC22F]" href={link.href}>
                        {link.label}
                      </Link>
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              {contact.title}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <Link className="transition hover:text-[#FCC22F]" href={`mailto:${contact.email}`}>
                  {contact.email}
                </Link>
              </li>
              {contact.phoneNumbers.map((phone) => (
                <li key={phone}>
                  <Link className="transition hover:text-[#FCC22F]" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                    {phone}
                  </Link>
                </li>
              ))}
              <li className="text-white/60">{contact.location}</li>
              <li className="flex justify-center gap-3 pt-1 sm:justify-start">
                {contact.socials.map((social) => (
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

      <div className="mx-auto mt-12 max-w-6xl px-6 text-center text-sm text-white/60 lg:px-8 lg:text-left">
        <p className="leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-white/50 lg:justify-start">
          {highlights.map((highlight) => (
            <span key={highlight.label} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: highlight.color }}
              ></span>
              {highlight.label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-center text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <p>© {currentYear} {copyright}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
            {bottomLinks.map((link) => (
              <Link key={link.label} className="transition hover:text-[#FCC22F]" href={link.href ?? '#'}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
