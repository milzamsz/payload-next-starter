import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      defaultValue: 'My App',
    },
    {
      name: 'siteDescription',
      label: 'Site Description',
      type: 'textarea',
    },
    {
      name: 'whatsappNumber',
      label: 'WhatsApp Number',
      type: 'text',
      admin: {
        description: 'Phone number with country code, e.g. 628123456789',
      },
    },
    {
      name: 'mapsEmbedUrl',
      label: 'Google Maps Embed URL',
      type: 'text',
    },
    {
      name: 'analyticsId',
      label: 'Analytics Tracking ID',
      type: 'text',
      admin: {
        description: 'Analytics tracking ID (e.g. Umami, Google Analytics)',
      },
    },
    {
      name: 'socialMedia',
      label: 'Social Media Links',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
        },
        {
          name: 'youtube',
          label: 'YouTube URL',
          type: 'text',
        },
        {
          name: 'tiktok',
          label: 'TikTok URL',
          type: 'text',
        },
        {
          name: 'linkedin',
          label: 'LinkedIn URL',
          type: 'text',
        },
        {
          name: 'twitter',
          label: 'X / Twitter URL',
          type: 'text',
        },
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
        },
      ],
    },
  ],
}
