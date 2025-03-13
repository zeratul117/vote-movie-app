import type { CollectionConfig, FieldHook  } from 'payload'

const format = (val: string): string =>
    val
      .replace(/ /g, '-')
      .replace(/[^\w-/]+/g, '')
      .toLowerCase()
  
  const formatSlug =
    (fallback: string): FieldHook =>
    ({ value, originalDoc, data }) => {
      if (typeof value === 'string') {
        return format(value)
      }
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]
  
      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }
  
      return value
    }

export const Movies: CollectionConfig = {
  slug: 'movies',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'url',
            type: 'text',
            required: true,
        },
        {
            name: 'votes',
            type: 'number',
            required: true,
        },
        {
            name: 'poster',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'overview',
            type: 'text',
            required: true,
        },
        {
            name: 'tagline',
            type: 'text',
            required: false,
        },
        {
            name: 'genres',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                },
            ],
            required: true,
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [formatSlug('name')]
            }
        }
  ],
}
