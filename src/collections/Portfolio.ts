import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { defaultLexical } from '../fields/defaultLexical'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  labels: {
    singular: 'Project',
    plural: 'Portfolio Projects',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'status', 'publishedAt'],
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
      label: 'Project Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'client',
      label: 'Client Name',
      type: 'text',
    },
    {
      name: 'tagline',
      label: 'Project Tagline',
      type: 'text',
      admin: {
        description: 'Brief one-line summary for the project card',
      },
    },
    {
      name: 'description',
      label: 'Project Description',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'featuredImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: 'Project Gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'services',
      label: 'Related Services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'projectUrl',
      label: 'Live Project URL',
      type: 'text',
    },
    {
      name: 'duration',
      label: 'Project Duration',
      type: 'text',
      admin: { description: 'e.g. "3 months", "Jan–Mar 2025"' },
    },
    {
      name: 'testimonial',
      label: 'Client Testimonial',
      type: 'group',
      fields: [
        {
          name: 'quote',
          label: 'Quote',
          type: 'textarea',
        },
        {
          name: 'authorName',
          label: 'Author Name',
          type: 'text',
        },
        {
          name: 'authorRole',
          label: 'Author Role',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      label: 'Featured Project',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show prominently on the homepage or portfolio page',
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
