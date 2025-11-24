
'use client'

import { useEffect, useState } from 'react'
import type { CourseContent } from '@/content/courseContent'
import { courseContent as fallbackCourseContent } from '@/content/courseContent'

const COURSE_CONTENT_ENDPOINT = '/api/globals/course-page-content'

let cachedCourseContent: CourseContent | null = null
let ongoingRequest: Promise<CourseContent> | null = null

const normalizeCourseContent = (input: unknown): CourseContent => {
    if (!input || typeof input !== 'object') {
        return fallbackCourseContent
    }

    const data = input as Partial<CourseContent> & Record<string, any>

    // Helper to ensure arrays are arrays of strings
    const ensureStringArray = (arr: unknown, fallback: string[]): string[] => {
        if (!Array.isArray(arr)) return fallback
        return arr.map(item => {
            if (typeof item === 'string') return item
            if (item && typeof item === 'object' && 'value' in item) return item.value
            return ''
        }).filter(Boolean)
    }

    return {
        hero: {
            ...fallbackCourseContent.hero,
            ...data.hero,
            ctas: Array.isArray(data.hero?.ctas) ? data.hero.ctas : fallbackCourseContent.hero.ctas,
        },
        topicsCovered: {
            ...fallbackCourseContent.topicsCovered,
            ...data.topicsCovered,
            items: ensureStringArray(data.topicsCovered?.items, fallbackCourseContent.topicsCovered.items),
        },
        learningOutcomes: {
            ...fallbackCourseContent.learningOutcomes,
            ...data.learningOutcomes,
            items: Array.isArray(data.learningOutcomes?.items) ? data.learningOutcomes.items : fallbackCourseContent.learningOutcomes.items,
        },
        earningGuidance: {
            ...fallbackCourseContent.earningGuidance,
            ...data.earningGuidance,
            points: ensureStringArray(data.earningGuidance?.points, fallbackCourseContent.earningGuidance.points),
        },
        support: {
            ...fallbackCourseContent.support,
            ...data.support,
            items: ensureStringArray(data.support?.items, fallbackCourseContent.support.items),
        },
        pricing: {
            ...fallbackCourseContent.pricing,
            ...data.pricing,
        },
        contact: {
            ...fallbackCourseContent.contact,
            ...data.contact,
            numbers: ensureStringArray(data.contact?.numbers, fallbackCourseContent.contact.numbers),
        },
    }
}

async function fetchCourseContent(): Promise<CourseContent> {
    try {
        const response = await fetch(COURSE_CONTENT_ENDPOINT, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to load course content: ${response.status}`)
        }

        const payload = await response.json()
        return normalizeCourseContent(payload)
    } catch (error) {
        console.error(error)
        return fallbackCourseContent
    }
}

export const useCourseContent = (): CourseContent => {
    const [content, setContent] = useState<CourseContent>(cachedCourseContent ?? fallbackCourseContent)

    useEffect(() => {
        let cancelled = false

        if (cachedCourseContent) {
            setContent(cachedCourseContent)
            return
        }

        if (!ongoingRequest) {
            ongoingRequest = fetchCourseContent().then((data) => {
                cachedCourseContent = data
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
                console.error('Failed to update course content', error)
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
