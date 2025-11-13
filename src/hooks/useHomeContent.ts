'use client'

import { useEffect, useState } from 'react'

import type { CTA, HomeContent, Testimonial } from '@/content/homeContent'
import { homeContent as fallbackHomeContent } from '@/content/homeContent'

const HOME_CONTENT_ENDPOINT = '/api/globals/home-page-content'

let cachedHomeContent: HomeContent | null = null
let ongoingRequest: Promise<HomeContent> | null = null

const parseCTAArray = (input: unknown, fallback: CTA[]): CTA[] => {
  if (!Array.isArray(input)) return fallback
  const result: CTA[] = []
  input.forEach((item) => {
    if (!item || typeof item !== 'object') return
    const label = typeof item.label === 'string' ? item.label : undefined
    const href = typeof item.href === 'string' ? item.href : undefined
    const type = typeof item.type === 'string' ? (item.type as CTA['type']) : undefined
    if (label && href) {
      result.push(type ? { label, href, type } : { label, href })
    }
  })
  return result.length ? result : [...fallback]
}

const parseStringArray = (input: unknown, fallback: readonly string[]): string[] => {
  if (!Array.isArray(input)) return [...fallback]
  const result: string[] = []
  input.forEach((item) => {
    if (typeof item === 'string' && item.trim()) {
      result.push(item.trim())
    } else if (item && typeof item === 'object' && typeof item.value === 'string' && item.value.trim()) {
      result.push(item.value.trim())
    }
  })
  return result.length ? result : [...fallback]
}

const parseTestimonials = (input: unknown, fallback: Testimonial[]): Testimonial[] => {
  if (!Array.isArray(input)) return fallback
  const result: Testimonial[] = []
  input.forEach((item) => {
    if (!item || typeof item !== 'object') return
    const name = typeof item.name === 'string' ? item.name : undefined
    const rating = typeof item.rating === 'number' ? item.rating : undefined
    const review = typeof item.review === 'string' ? item.review : undefined
    if (name && rating && review) {
      result.push({ name, rating, review })
    }
  })
  return result.length ? result : fallback
}

const normalizeHomeContent = (input: unknown): HomeContent => {
  if (!input || typeof input !== 'object') {
    return fallbackHomeContent
  }

  const data = input as Partial<HomeContent> & Record<string, any>

  const heroSource = (data.hero ?? {}) as Partial<HomeContent['hero']> & Record<string, any>
  const hero = {
    badge:
      typeof heroSource.badge === 'string' ? heroSource.badge : fallbackHomeContent.hero.badge,
    headlinePrimary:
      typeof heroSource.headlinePrimary === 'string'
        ? heroSource.headlinePrimary
        : fallbackHomeContent.hero.headlinePrimary,
    headlineAccent:
      typeof heroSource.headlineAccent === 'string'
        ? heroSource.headlineAccent
        : fallbackHomeContent.hero.headlineAccent,
    headlineSecondary:
      typeof heroSource.headlineSecondary === 'string'
        ? heroSource.headlineSecondary
        : fallbackHomeContent.hero.headlineSecondary,
    rating: {
      value:
        typeof heroSource.rating?.value === 'string'
          ? heroSource.rating.value
          : fallbackHomeContent.hero.rating.value,
      reviewsLabel:
        typeof heroSource.rating?.reviewsLabel === 'string'
          ? heroSource.rating.reviewsLabel
          : fallbackHomeContent.hero.rating.reviewsLabel,
      organization:
        typeof heroSource.rating?.organization === 'string'
          ? heroSource.rating.organization
          : fallbackHomeContent.hero.rating.organization,
      statusLabel:
        typeof heroSource.rating?.statusLabel === 'string'
          ? heroSource.rating.statusLabel
          : fallbackHomeContent.hero.rating.statusLabel,
    },
    ctas: parseCTAArray(heroSource.ctas, fallbackHomeContent.hero.ctas),
  } satisfies HomeContent['hero']

  const featuresSource = (data.features ?? {}) as Partial<HomeContent['features']> & Record<string, any>
  const features = {
    badge:
      typeof featuresSource.badge === 'string'
        ? featuresSource.badge
        : fallbackHomeContent.features.badge,
    titlePrimary:
      typeof featuresSource.titlePrimary === 'string'
        ? featuresSource.titlePrimary
        : fallbackHomeContent.features.titlePrimary,
    titleAccent:
      typeof featuresSource.titleAccent === 'string'
        ? featuresSource.titleAccent
        : fallbackHomeContent.features.titleAccent,
    items: parseStringArray(featuresSource.items, fallbackHomeContent.features.items),
  } satisfies HomeContent['features']

  const webinarSource = (data.webinar ?? {}) as Partial<HomeContent['webinar']> & Record<string, any>
  const webinar = {
    badge:
      typeof webinarSource.badge === 'string'
        ? webinarSource.badge
        : fallbackHomeContent.webinar.badge,
    titlePrimary:
      typeof webinarSource.titlePrimary === 'string'
        ? webinarSource.titlePrimary
        : fallbackHomeContent.webinar.titlePrimary,
    titleAccent:
      typeof webinarSource.titleAccent === 'string'
        ? webinarSource.titleAccent
        : fallbackHomeContent.webinar.titleAccent,
    features: parseStringArray(webinarSource.features, fallbackHomeContent.webinar.features),
    ctas: parseCTAArray(webinarSource.ctas, fallbackHomeContent.webinar.ctas),
  } satisfies HomeContent['webinar']

  const instructorSource = (data.instructor ?? {}) as Partial<HomeContent['instructor']> & Record<string, any>
  const instructor = {
    badge:
      typeof instructorSource.badge === 'string'
        ? instructorSource.badge
        : fallbackHomeContent.instructor.badge,
    heading:
      typeof instructorSource.heading === 'string'
        ? instructorSource.heading
        : fallbackHomeContent.instructor.heading,
    name:
      typeof instructorSource.name === 'string'
        ? instructorSource.name
        : fallbackHomeContent.instructor.name,
    description:
      typeof instructorSource.description === 'string'
        ? instructorSource.description
        : fallbackHomeContent.instructor.description,
    stats: (() => {
      if (!Array.isArray(instructorSource.stats)) return fallbackHomeContent.instructor.stats
      const stats: Array<{ label: string; value: string }> = []
      instructorSource.stats.forEach((item: any) => {
        if (!item || typeof item !== 'object') return
        const label = typeof item.label === 'string' ? item.label : null
        const value = typeof item.value === 'string' ? item.value : null
        if (label && value) {
          stats.push({ label, value })
        }
      })
      return stats.length ? stats : fallbackHomeContent.instructor.stats
    })(),
    credentials: (() => {
      if (!Array.isArray(instructorSource.credentials)) {
        return fallbackHomeContent.instructor.credentials
      }
      const credentials: Array<{ title: string; desc: string; wide?: boolean }> = []
      instructorSource.credentials.forEach((item: any) => {
        if (!item || typeof item !== 'object') return
        const title = typeof item.title === 'string' ? item.title : null
        const desc = typeof item.desc === 'string' ? item.desc : null
        const wide = typeof item.wide === 'boolean' ? item.wide : undefined
        if (title && desc) {
          credentials.push(wide !== undefined ? { title, desc, wide } : { title, desc })
        }
      })
      return credentials.length ? credentials : fallbackHomeContent.instructor.credentials
    })(),
  } satisfies HomeContent['instructor']

  const welcomeSource = (data.welcome ?? {}) as Partial<HomeContent['welcome']> & Record<string, any>
  const welcome = {
    badge:
      typeof welcomeSource.badge === 'string'
        ? welcomeSource.badge
        : fallbackHomeContent.welcome.badge,
    title:
      typeof welcomeSource.title === 'string'
        ? welcomeSource.title
        : fallbackHomeContent.welcome.title,
    description:
      typeof welcomeSource.description === 'string'
        ? welcomeSource.description
        : fallbackHomeContent.welcome.description,
    highlights: (() => {
      if (!Array.isArray(welcomeSource.highlights)) {
        return fallbackHomeContent.welcome.highlights
      }
      const highlights: Array<{ title: string; desc: string; details?: string[] }> = []
      welcomeSource.highlights.forEach((item: any) => {
        if (!item || typeof item !== 'object') return
        const title = typeof item.title === 'string' ? item.title : null
        const desc = typeof item.desc === 'string' ? item.desc : null
        const details = parseStringArray(item.details, [])
        if (!title || !desc) return
        if (details.length) {
          highlights.push({ title, desc, details })
        } else {
          highlights.push({ title, desc })
        }
      })
      return highlights.length ? highlights : fallbackHomeContent.welcome.highlights
    })(),
    ctas: parseCTAArray(welcomeSource.ctas, fallbackHomeContent.welcome.ctas),
  } satisfies HomeContent['welcome']

  const testimonials = parseTestimonials(data.testimonials, fallbackHomeContent.testimonials)

  return {
    hero,
    features,
    webinar,
    instructor,
    welcome,
    testimonials,
  }
}

async function fetchHomeContent(): Promise<HomeContent> {
  try {
    const response = await fetch(HOME_CONTENT_ENDPOINT, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to load home content: ${response.status}`)
    }

    const payload = await response.json()
    const data = payload?.data ?? payload
    return normalizeHomeContent(data)
  } catch (error) {
    console.error(error)
    return fallbackHomeContent
  }
}

export const useHomeContent = (): HomeContent => {
  const [content, setContent] = useState<HomeContent>(cachedHomeContent ?? fallbackHomeContent)

  useEffect(() => {
    let cancelled = false

    if (cachedHomeContent) {
      setContent(cachedHomeContent)
      return
    }

    if (!ongoingRequest) {
      ongoingRequest = fetchHomeContent().then((data) => {
        cachedHomeContent = data
        return data
      })
    }

    ongoingRequest
      .then((data) => {
        if (!cancelled) {
          setContent(data)
        }
      })
      .catch((error) => {
        console.error('Failed to update home content', error)
      })
      .finally(() => {
        if (!cancelled) {
          ongoingRequest = null
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return content
}
