import type { GlobalConfig } from 'payload'

import { homeContent } from '@/content/homeContent'
import { createRevalidateGlobal } from './hooks/createRevalidateGlobal'

export const HomePageContent: GlobalConfig = {
  slug: 'home-page-content',
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
                  defaultValue: homeContent.hero.badge,
                  admin: { width: '33%' },
                },
                {
                  name: 'headlinePrimary',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.hero.headlinePrimary,
                  admin: { width: '33%' },
                },
                {
                  name: 'headlineAccent',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.hero.headlineAccent,
                  admin: { width: '33%' },
                },
                {
                  name: 'headlineSecondary',
                  label: 'Headline Secondary',
                  type: 'text',
                  defaultValue: homeContent.hero.headlineSecondary,
                },
                {
                  name: 'rating',
                  type: 'group',
                  label: 'Rating',
                  defaultValue: homeContent.hero.rating,
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'reviewsLabel',
                      type: 'text',
                      required: true,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'organization',
                      type: 'text',
                      required: true,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'statusLabel',
                      type: 'text',
                      required: true,
                      admin: { width: '25%' },
                    },
                  ],
                },
                {
                  name: 'ctas',
                  label: 'Calls to Action',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.hero.ctas,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'type',
                      type: 'select',
                      defaultValue: 'link',
                      admin: { width: '20%' },
                      options: [
                        { label: 'Link', value: 'link' },
                        { label: 'Call', value: 'call' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'group',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.features.badge,
                  admin: { width: '30%' },
                },
                {
                  name: 'titlePrimary',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.features.titlePrimary,
                  admin: { width: '35%' },
                },
                {
                  name: 'titleAccent',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.features.titleAccent,
                  admin: { width: '35%' },
                },
                {
                  name: 'items',
                  label: 'Feature Items',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.features.items.map((value) => ({ value })),
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      label: 'Item',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Webinar',
          fields: [
            {
              name: 'webinar',
              type: 'group',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.webinar.badge,
                  admin: { width: '30%' },
                },
                {
                  name: 'titlePrimary',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.webinar.titlePrimary,
                  admin: { width: '35%' },
                },
                {
                  name: 'titleAccent',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.webinar.titleAccent,
                  admin: { width: '35%' },
                },
                {
                  name: 'features',
                  label: 'Talking Points',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.webinar.features.map((value) => ({ value })),
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      label: 'Point',
                    },
                  ],
                },
                {
                  name: 'ctas',
                  label: 'Calls to Action',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.webinar.ctas,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'type',
                      type: 'select',
                      defaultValue: 'link',
                      admin: { width: '20%' },
                      options: [
                        { label: 'Link', value: 'link' },
                        { label: 'Call', value: 'call' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Instructor',
          fields: [
            {
              name: 'instructor',
              type: 'group',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.instructor.badge,
                  admin: { width: '25%' },
                },
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.instructor.heading,
                  admin: { width: '35%' },
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.instructor.name,
                  admin: { width: '40%' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  defaultValue: homeContent.instructor.description,
                },
                {
                  name: 'stats',
                  label: 'Statistics',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.instructor.stats,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'credentials',
                  label: 'Credentials',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.instructor.credentials,
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      admin: { width: '60%' },
                    },
                    {
                      name: 'desc',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'wide',
                      type: 'checkbox',
                      label: 'Highlight (Wide Layout)',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Welcome',
          fields: [
            {
              name: 'welcome',
              type: 'group',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.welcome.badge,
                  admin: { width: '25%' },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: homeContent.welcome.title,
                  admin: { width: '35%' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  defaultValue: homeContent.welcome.description,
                },
                {
                  name: 'highlights',
                  label: 'Highlights',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.welcome.highlights.map((item) => ({
                    title: item.title,
                    desc: item.desc,
                    details: item.details?.map((detail) => ({ value: detail })) ?? [],
                  })),
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'desc',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'details',
                      type: 'array',
                      label: 'Details',
                      fields: [
                        {
                          name: 'value',
                          type: 'text',
                          label: 'Detail',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'ctas',
                  label: 'Calls to Action',
                  type: 'array',
                  minRows: 1,
                  defaultValue: homeContent.welcome.ctas,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'type',
                      type: 'select',
                      defaultValue: 'link',
                      admin: { width: '20%' },
                      options: [
                        { label: 'Link', value: 'link' },
                        { label: 'Call', value: 'call' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              minRows: 1,
              defaultValue: homeContent.testimonials,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { width: '40%' },
                },
                {
                  name: 'rating',
                  type: 'number',
                  required: true,
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                  admin: { width: '20%' },
                },
                {
                  name: 'review',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createRevalidateGlobal('home-page-content')],
  },
}
