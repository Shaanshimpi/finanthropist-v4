'use client'

import { useEffect, useState } from 'react'

import type { FooterContent } from '@/content/footerContent'
import { footerContent as fallbackFooterContent } from '@/content/footerContent'

const FOOTER_CONTENT_ENDPOINT = '/api/globals/site-footer-content'

let cachedFooterContent: FooterContent | null = null
let footerRequest: Promise<FooterContent> | null = null

const normalizeFooterContent = (input: unknown): FooterContent => {
  if (!input || typeof input !== 'object') {
    return fallbackFooterContent
  }

  const data = input as Partial<FooterContent> & {
    contact?: Partial<FooterContent['contact']> & {
      phoneNumbers?: Array<string | { value?: string }>
    }
  }

  const highlights: FooterContent['highlights'] = []
  if (Array.isArray(data.highlights)) {
    data.highlights.forEach((item) => {
      if (item && typeof item === 'object' && typeof item.label === 'string' && typeof item.color === 'string') {
        highlights.push({ label: item.label, color: item.color })
      }
    })
  }

  const linkGroups: FooterContent['linkGroups'] = []
  if (Array.isArray(data.linkGroups)) {
    data.linkGroups.forEach((group) => {
      if (group && typeof group === 'object' && typeof group.title === 'string') {
        const links: FooterContent['linkGroups'][number]['links'] = []
        if (Array.isArray(group.links)) {
          group.links.forEach((link) => {
            if (
              link &&
              typeof link === 'object' &&
              typeof link.label === 'string' &&
              typeof link.href === 'string'
            ) {
              links.push({ label: link.label, href: link.href })
            }
          })
        }
        if (links.length) {
          linkGroups.push({ title: group.title, links })
        }
      }
    })
  }

  const bottomLinks: FooterContent['bottomLinks'] = []
  if (Array.isArray(data.bottomLinks)) {
    data.bottomLinks.forEach((link) => {
      if (
        link &&
        typeof link === 'object' &&
        typeof link.label === 'string' &&
        typeof link.href === 'string'
      ) {
        bottomLinks.push({ label: link.label, href: link.href })
      }
    })
  }

  const socials: FooterContent['contact']['socials'] = []
  if (Array.isArray(data.contact?.socials)) {
    data.contact?.socials.forEach((item) => {
      if (
        item &&
        typeof item === 'object' &&
        typeof item.name === 'string' &&
        typeof item.href === 'string' &&
        typeof item.label === 'string'
      ) {
        const icon =
          typeof item.icon === 'string' && ['instagram', 'youtube', 'telegram'].includes(item.icon)
            ? (item.icon as FooterContent['contact']['socials'][number]['icon'])
            : undefined
        socials.push(
          icon ? { name: item.name, href: item.href, label: item.label, icon } : { name: item.name, href: item.href, label: item.label }
        )
      }
    })
  }

  const phoneNumbers: string[] = []
  if (Array.isArray(data.contact?.phoneNumbers)) {
    const numbers = data.contact.phoneNumbers as Array<string | { value?: string } | null | undefined>
    numbers.forEach((entry) => {
      if (typeof entry === 'string' && entry.trim()) {
        phoneNumbers.push(entry.trim())
      } else if (entry && typeof entry === 'object' && typeof entry.value === 'string' && entry.value.trim()) {
        phoneNumbers.push(entry.value.trim())
      }
    })
  }

  return {
    logo: {
      src: typeof data.logo?.src === 'string' ? data.logo.src : fallbackFooterContent.logo.src,
      alt: typeof data.logo?.alt === 'string' ? data.logo.alt : fallbackFooterContent.logo.alt,
    },
    description:
      typeof data.description === 'string' ? data.description : fallbackFooterContent.description,
    highlights: highlights.length ? highlights : fallbackFooterContent.highlights,
    linkGroups: linkGroups.length ? linkGroups : fallbackFooterContent.linkGroups,
    contact: {
      title:
        typeof data.contact?.title === 'string'
          ? data.contact.title
          : fallbackFooterContent.contact.title,
      email:
        typeof data.contact?.email === 'string'
          ? data.contact.email
          : fallbackFooterContent.contact.email,
      phoneNumbers: phoneNumbers.length ? phoneNumbers : fallbackFooterContent.contact.phoneNumbers,
      location:
        typeof data.contact?.location === 'string'
          ? data.contact.location
          : fallbackFooterContent.contact.location,
      socials: socials.length ? socials : fallbackFooterContent.contact.socials,
    },
    bottomLinks: bottomLinks.length ? bottomLinks : fallbackFooterContent.bottomLinks,
    copyright:
      typeof data.copyright === 'string'
        ? data.copyright
        : fallbackFooterContent.copyright,
  }
}

async function fetchFooterContent(): Promise<FooterContent> {
  try {
    const response = await fetch(FOOTER_CONTENT_ENDPOINT, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to load footer content: ${response.status}`)
    }

    const payload = await response.json()
    const data = payload?.data ?? payload
    return normalizeFooterContent(data)
  } catch (error) {
    console.error(error)
    return fallbackFooterContent
  }
}

export const useFooterContent = (): FooterContent => {
  const [content, setContent] = useState<FooterContent>(cachedFooterContent ?? fallbackFooterContent)

  useEffect(() => {
    let cancelled = false

    if (cachedFooterContent) {
      setContent(cachedFooterContent)
      return
    }

    if (!footerRequest) {
      footerRequest = fetchFooterContent().then((data) => {
        cachedFooterContent = data
        return data
      })
    }

    footerRequest
      .then((data) => {
        if (!cancelled) {
          setContent(data)
        }
      })
      .catch((error) => {
        console.error('Failed to update footer content', error)
      })
      .finally(() => {
        if (!cancelled) {
          footerRequest = null
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return content
}
