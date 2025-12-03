'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Youtube, Send } from 'lucide-react'
import { useFooterContent } from '@/hooks/useFooterContent'

export const Footer: React.FC = () => {
  const { logo, linkGroups, contact, bottomLinks, copyright } = useFooterContent()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white/90 pt-16 pb-10 border-t border-white/10">
      <div className="relative">
        {/* Glow accent */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center">
          <div className="h-32 w-[60%] max-w-3xl bg-gradient-to-r from-[#C71C22]/20 via-[#FCC22F]/25 to-[#C71C22]/20 blur-3xl opacity-60"></div>
        </div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 text-center md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Brand block */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={300}
              height={300}
              className="w-full max-w-[220px] object-contain"
            />
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center gap-2">
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
          </div>

          {/* Contact / socials */}
          <div className="flex flex-col items-center gap-2">
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
              <li className="flex justify-center gap-3 pt-1">
                {contact.socials.map((social) => {
                  let Icon = Instagram
                  if (social.icon === 'youtube' || social.name.toLowerCase() === 'youtube') {
                    Icon = Youtube
                  } else if (social.icon === 'telegram' || social.name.toLowerCase() === 'telegram') {
                    Icon = Send
                  }
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#FCC22F] hover:bg-[#FCC22F]/10"
                      aria-label={social.label ?? social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  )
                })}
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* Bottom bar */}
      <div className="mt-14 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-center text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <div className="flex flex-col gap-2">
            <p>© {currentYear} {copyright}</p>
            <p className="text-white/40">Designed and developed by Digital supremacy and Firefist Solutions</p>
          </div>
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
