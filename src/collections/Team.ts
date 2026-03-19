import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'department', 'order'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Job Title / Role',
      type: 'text',
      required: true,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Design', value: 'design' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Operations', value: 'operations' },
        { label: 'Sales', value: 'sales' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'photo',
      label: 'Profile Photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'group',
      fields: [
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
          name: 'github',
          label: 'GitHub URL',
          type: 'text',
        },
        {
          name: 'website',
          label: 'Personal Website',
          type: 'text',
        },
      ],
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
      name: 'isActive',
      label: 'Active Team Member',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
