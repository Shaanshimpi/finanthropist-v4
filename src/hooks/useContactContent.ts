
'use client'

import { useEffect, useState } from 'react'
import type { ContactContent } from '@/content/contactContent'
import { contactContent as fallbackContactContent } from '@/content/contactContent'

const CONTACT_CONTENT_ENDPOINT = '/api/globals/contact-page-content'

let cachedContactContent: ContactContent | null = null
let ongoingRequest: Promise<ContactContent> | null = null

const normalizeContactContent = (input: unknown): ContactContent => {
    if (!input || typeof input !== 'object') {
        return fallbackContactContent
    }

    const data = input as Partial<ContactContent> & Record<string, any>

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
            ...fallbackContactContent.hero,
            ...data.hero,
        },
        info: {
            ...fallbackContactContent.info,
            ...data.info,
            phoneNumbers: ensureStringArray(data.info?.phoneNumbers, fallbackContactContent.info.phoneNumbers),
        },
        form: {
            ...fallbackContactContent.form,
            ...data.form,
            fields: {
                ...fallbackContactContent.form.fields,
                ...data.form?.fields,
            },
        },
    }
}

async function fetchContactContent(): Promise<ContactContent> {
    try {
        const response = await fetch(CONTACT_CONTENT_ENDPOINT, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to load contact content: ${response.status}`)
        }

        const payload = await response.json()
        return normalizeContactContent(payload)
    } catch (error) {
        console.error(error)
        return fallbackContactContent
    }
}

export const useContactContent = (): ContactContent => {
    const [content, setContent] = useState<ContactContent>(cachedContactContent ?? fallbackContactContent)

    useEffect(() => {
        let cancelled = false

        if (cachedContactContent) {
            setContent(cachedContactContent)
            return
        }

        if (!ongoingRequest) {
            ongoingRequest = fetchContactContent().then((data) => {
                cachedContactContent = data
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
                console.error('Failed to update contact content', error)
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
