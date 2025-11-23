import type { GlobalConfig } from 'payload'

import { contactContent } from '@/content/contactContent'
import { createRevalidateGlobal } from './hooks/createRevalidateGlobal'

export const ContactPageContent: GlobalConfig = {
    slug: 'contact-page-content',
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
                                    name: 'title',
                                    type: 'text',
                                    required: true,
                                    defaultValue: contactContent.hero.title,
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    required: true,
                                    defaultValue: contactContent.hero.description,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Contact Info',
                    fields: [
                        {
                            name: 'info',
                            type: 'group',
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    required: true,
                                    defaultValue: contactContent.info.title,
                                },
                                {
                                    name: 'phoneNumbers',
                                    type: 'array',
                                    defaultValue: contactContent.info.phoneNumbers.map((num) => ({ value: num })),
                                    fields: [
                                        {
                                            name: 'value',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                                {
                                    name: 'email',
                                    type: 'text',
                                    required: true,
                                    defaultValue: contactContent.info.email,
                                },
                                {
                                    name: 'location',
                                    type: 'text',
                                    required: true,
                                    defaultValue: contactContent.info.location,
                                },
                                {
                                    name: 'hours',
                                    type: 'textarea',
                                    required: true,
                                    defaultValue: contactContent.info.hours,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Form',
                    fields: [
                        {
                            name: 'form',
                            type: 'group',
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    required: true,
                                    defaultValue: contactContent.form.title,
                                },
                                {
                                    name: 'fields',
                                    type: 'group',
                                    fields: [
                                        {
                                            name: 'name',
                                            type: 'text',
                                            required: true,
                                            defaultValue: contactContent.form.fields.name,
                                        },
                                        {
                                            name: 'phone',
                                            type: 'text',
                                            required: true,
                                            defaultValue: contactContent.form.fields.phone,
                                        },
                                        {
                                            name: 'email',
                                            type: 'text',
                                            required: true,
                                            defaultValue: contactContent.form.fields.email,
                                        },
                                        {
                                            name: 'message',
                                            type: 'text',
                                            required: true,
                                            defaultValue: contactContent.form.fields.message,
                                        },
                                    ],
                                },
                                {
                                    name: 'button',
                                    type: 'text',
                                    required: true,
                                    defaultValue: contactContent.form.button,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    hooks: {
        afterChange: [createRevalidateGlobal('contact-page-content')],
    },
}
