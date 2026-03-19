import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { defaultLexical } from '../fields/defaultLexical'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'order'],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
    },
    maxPerDoc: 20,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    readVersions: authenticated,
  },
  fields: [
    {
      name: 'title',
      label: 'Service Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-generated from title, e.g. web-design',
      },
    },
    {
      name: 'tagline',
      label: 'Short Tagline',
      type: 'text',
      admin: {
        description: 'One-line summary shown in cards',
      },
    },
    {
      name: 'description',
      label: 'Full Description',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Development', value: 'development' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Support', value: 'support' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'icon',
      label: 'Icon (Lucide icon name)',
      type: 'text',
      admin: {
        description: 'e.g. "Globe", "Code", "HeartHandshake" — from lucide.dev',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'highlights',
      label: 'Key Highlights',
      type: 'array',
      admin: {
        description: 'Bullet points shown on the service card/page',
      },
      fields: [
        {
          name: 'text',
          label: 'Highlight',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      label: 'Pricing',
      type: 'group',
      fields: [
        {
          name: 'startingFrom',
          label: 'Starting From',
          type: 'text',
          admin: { description: 'e.g. "$500" or "Contact for pricing"' },
        },
        {
          name: 'unit',
          label: 'Pricing Unit',
          type: 'text',
          admin: { description: 'e.g. "per project", "per month"' },
        },
      ],
    },
    {
      name: 'ctaText',
      label: 'CTA Button Text',
      type: 'text',
      defaultValue: 'Get Started',
    },
    {
      name: 'ctaLink',
      label: 'CTA Button Link',
      type: 'text',
      defaultValue: '/contact',
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'publishedAt',
      label: 'Publish Date',
      type: 'date',
      hooks: {
        beforeChange: [populatePublishedAt],
      },
    },
  ],
}
