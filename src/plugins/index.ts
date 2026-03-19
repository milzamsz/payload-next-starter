import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { searchPlugin } from '@payloadcms/plugin-search'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { getServerURL } from '../utilities/getURL'

export const plugins = [
  seoPlugin({
    generateTitle: ({ doc }: { doc: { title?: string } }) =>
      doc?.title ? `${doc.title} | My App` : 'My App',
    generateURL: ({ doc, collectionConfig }: { doc: { slug?: string }; collectionConfig?: { slug?: string } }) =>
      `${getServerURL()}/${collectionConfig?.slug}/${doc?.slug}`,
  }),
  nestedDocsPlugin({
    collections: ['categories'],
  }),
  searchPlugin({
    collections: ['posts'],
    defaultPriorities: {
      posts: 10,
    },
  }),
  redirectsPlugin({
    collections: ['pages', 'posts'],
  }),
]
