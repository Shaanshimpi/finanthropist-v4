import type { GlobalConfig } from 'payload'

import { courseContent } from '@/content/courseContent'
import { createRevalidateGlobal } from './hooks/createRevalidateGlobal'

export const CoursePageContent: GlobalConfig = {
    slug: 'course-page-content',
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Hero',
                    fields: [
                        {
                            name: 'hero',
                            type: 'group',
                            fields: [
                                {
                                    name: 'badge',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.hero.badge,
                                },
                                {
                                    name: 'headlinePrimary',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.hero.headlinePrimary,
                                },
                                {
                                    name: 'headlineAccent',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.hero.headlineAccent,
                                },
                                {
                                    name: 'description',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.hero.description,
                                },
                                {
                                    name: 'ctas',
                                    type: 'array',
                                    defaultValue: courseContent.hero.ctas,
                                    fields: [
                                        {
                                            name: 'label',
                                            type: 'text',
                                            required: true,
                                        },
                                        {
                                            name: 'href',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Topics Covered',
                    fields: [
                        {
                            name: 'topicsCovered',
                            type: 'group',
                            fields: [
                                {
                                    name: 'badge',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.topicsCovered.badge,
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.topicsCovered.title,
                                },
                                {
                                    name: 'items',
                                    type: 'array',
                                    defaultValue: courseContent.topicsCovered.items.map((item) => ({ value: item })),
                                    fields: [
                                        {
                                            name: 'value',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Learning Outcomes',
                    fields: [
                        {
                            name: 'learningOutcomes',
                            type: 'group',
                            fields: [
                                {
                                    name: 'badge',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.learningOutcomes.badge,
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.learningOutcomes.title,
                                },
                                {
                                    name: 'items',
                                    type: 'array',
                                    defaultValue: courseContent.learningOutcomes.items,
                                    fields: [
                                        {
                                            name: 'title',
                                            type: 'text',
                                            required: true,
                                        },
                                        {
                                            name: 'description',
                                            type: 'textarea',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Earning Guidance',
                    fields: [
                        {
                            name: 'earningGuidance',
                            type: 'group',
                            fields: [
                                {
                                    name: 'badge',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.earningGuidance.badge,
                                },
                                {
                                    name: 'mainMessage',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.earningGuidance.mainMessage,
                                },
                                {
                                    name: 'points',
                                    type: 'array',
                                    defaultValue: courseContent.earningGuidance.points.map((point) => ({ value: point })),
                                    fields: [
                                        {
                                            name: 'value',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Support',
                    fields: [
                        {
                            name: 'support',
                            type: 'group',
                            fields: [
                                {
                                    name: 'badge',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.support.badge,
                                },
                                {
                                    name: 'subtitle',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.support.subtitle,
                                },
                                {
                                    name: 'items',
                                    type: 'array',
                                    defaultValue: courseContent.support.items.map((item) => ({ value: item })),
                                    fields: [
                                        {
                                            name: 'value',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Contact',
                    fields: [
                        {
                            name: 'contact',
                            type: 'group',
                            fields: [
                                {
                                    name: 'badge',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.contact.badge,
                                },
                                {
                                    name: 'numbers',
                                    type: 'array',
                                    defaultValue: courseContent.contact.numbers.map((num) => ({ value: num })),
                                    fields: [
                                        {
                                            name: 'value',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                                {
                                    name: 'website',
                                    type: 'text',
                                    required: true,
                                    defaultValue: courseContent.contact.website,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    hooks: {
        afterChange: [createRevalidateGlobal('course-page-content')],
    },
}
