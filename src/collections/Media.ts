import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
