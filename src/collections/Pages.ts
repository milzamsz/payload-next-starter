import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { HeroBanner } from '../blocks/HeroBanner'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { CallToAction } from '../blocks/CallToAction'
import { Gallery } from '../blocks/Gallery'
import { Testimonials } from '../blocks/Testimonials'
import { Stats } from '../blocks/Stats'
import { FAQ } from '../blocks/FAQ'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
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
      label: 'Page Title',
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
        description: 'Auto-generated from title, e.g. about-us',
      },
    },
    {
      name: 'hero',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
        },
        {
          name: 'subheading',
          label: 'Subheading',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'backgroundVideo',
          label: 'Background Video URL',
          type: 'text',
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
        },
        {
          name: 'buttonLink',
          label: 'Button Link',
          type: 'text',
        },
      ],
    },
    {
      name: 'layout',
      label: 'Page Content',
      type: 'blocks',
      blocks: [
        HeroBanner,
        Content,
        MediaBlock,
        CallToAction,
        Gallery,
        Testimonials,
        Stats,
        FAQ,
      ],
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
