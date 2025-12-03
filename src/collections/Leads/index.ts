import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Leads: CollectionConfig = {
  slug: 'leads',
  access: {
    create: anyone, // Allow public form submissions
    read: authenticated, // Only authenticated users can read leads
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    useAsTitle: 'name',
    description: 'Contact form submissions from the website',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the lead',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address of the lead',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'Phone number of the lead',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Message from the lead',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Contacted',
          value: 'contacted',
        },
        {
          label: 'Qualified',
          value: 'qualified',
        },
        {
          label: 'Converted',
          value: 'converted',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      defaultValue: 'new',
      admin: {
        description: 'Status of the lead',
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Internal notes about the lead',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

