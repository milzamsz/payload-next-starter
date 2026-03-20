import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { searchPlugin } from '@payloadcms/plugin-search'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { s3Storage } from '@payloadcms/storage-s3'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { Plugin } from 'payload'

import { getServerURL } from '../utilities/getURL'

// ─── S3 Storage ───────────────────────────────────────────────────────────────
// Enabled when S3_BUCKET + credentials are present in env.
// Development: set S3_ENDPOINT=http://localhost:9000 to use MinIO (see docker-compose.yml)
// Production: Cloudflare R2, AWS S3, DigitalOcean Spaces, etc.

const s3Enabled =
  !!process.env.S3_BUCKET && !!process.env.S3_ACCESS_KEY && !!process.env.S3_SECRET_KEY

let _s3Client: S3Client | null = null

function getS3Client(): S3Client {
  if (!_s3Client) {
    _s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
      },
      region: process.env.S3_REGION ?? 'us-east-1',
      ...(process.env.S3_ENDPOINT
        ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: true }
        : {}),
    })
  }
  return _s3Client
}

async function generatePresignedURL({ filename, prefix }: { filename: string; prefix?: string }): Promise<string> {
  const key = prefix ? `${prefix}/${filename}` : filename
  const expiresIn = parseInt(process.env.S3_PRESIGN_EXPIRY ?? '604800', 10) // default: 7 days
  const command = new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key })
  return getSignedUrl(getS3Client(), command, { expiresIn })
}

const storagePlugins: Plugin[] = s3Enabled
  ? [
      s3Storage({
        collections: {
          media: {
            generateFileURL: generatePresignedURL,
          },
        },
        bucket: process.env.S3_BUCKET!,
        config: {
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY!,
            secretAccessKey: process.env.S3_SECRET_KEY!,
          },
          region: process.env.S3_REGION ?? 'us-east-1',
          ...(process.env.S3_ENDPOINT
            ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: true }
            : {}),
        },
      }),
    ]
  : []

// ─── Plugins ──────────────────────────────────────────────────────────────────

export const plugins = [
  ...storagePlugins,

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
    collections: ['posts', 'portfolio'],
    defaultPriorities: {
      posts: 10,
      portfolio: 20,
    },
  }),
  redirectsPlugin({
    collections: ['pages', 'posts', 'services', 'portfolio'],
  }),
]
