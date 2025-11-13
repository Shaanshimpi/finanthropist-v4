import type { GlobalConfig } from 'payload'

import { footerContent } from '@/content/footerContent'
import { createRevalidateGlobal } from './hooks/createRevalidateGlobal'

export const SiteFooterContent: GlobalConfig = {
  slug: 'site-footer-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'group',
      required: true,
      defaultValue: footerContent.logo,
      fields: [
        {
          name: 'src',
          type: 'text',
          required: true,
          label: 'Image Source',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: 'Alt Text',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: footerContent.description,
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlights',
      required: true,
      minRows: 1,
      defaultValue: footerContent.highlights,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'color',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'linkGroups',
      type: 'array',
      label: 'Link Groups',
      required: true,
      minRows: 1,
      defaultValue: footerContent.linkGroups,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          required: true,
          minRows: 1,
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
    {
      name: 'contact',
      label: 'Contact',
      type: 'group',
      required: true,
      defaultValue: {
        ...footerContent.contact,
        phoneNumbers: footerContent.contact.phoneNumbers.map((value) => ({ value })),
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phoneNumbers',
          type: 'array',
          label: 'Phone Numbers',
          required: true,
          minRows: 1,
          defaultValue: footerContent.contact.phoneNumbers.map((value) => ({ value })),
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Phone Number',
            },
          ],
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'socials',
          type: 'array',
          label: 'Social Links',
          required: true,
          minRows: 1,
          defaultValue: footerContent.contact.socials,
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom Links',
      required: true,
      minRows: 1,
      defaultValue: footerContent.bottomLinks,
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
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: footerContent.copyright,
    },
  ],
  hooks: {
    afterChange: [createRevalidateGlobal('site-footer-content')],
  },
}
