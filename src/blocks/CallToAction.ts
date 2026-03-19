import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'callToAction',
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Action Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'primaryButtonText',
      label: 'Primary Button Text',
      type: 'text',
    },
    {
      name: 'primaryButtonLink',
      label: 'Primary Button Link',
      type: 'text',
    },
    {
      name: 'secondaryButtonText',
      label: 'Secondary Button Text',
      type: 'text',
    },
    {
      name: 'secondaryButtonLink',
      label: 'Secondary Button Link',
      type: 'text',
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'White', value: 'white' },
        { label: 'Muted', value: 'muted' },
      ],
    },
  ],
}
