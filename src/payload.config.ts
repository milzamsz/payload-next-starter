import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Services } from './collections/Services'
import { Portfolio } from './collections/Portfolio'
import { Team } from './collections/Team'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

import { plugins } from './plugins'
import { getServerURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Categories,
    Services,
    Portfolio,
    Team,
    ContactSubmissions,
  ],

  globals: [Header, Footer, SiteSettings],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: false,
  }),

  editor: lexicalEditor(),

  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Bahasa Indonesia', code: 'id' },
    ],
    defaultLocale: 'en',
    fallback: true, // fall back to defaultLocale if a translation is missing
  },

  plugins,

  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM ?? 'noreply@example.com',
    defaultFromName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App',
    // Uses Resend SMTP — swap for any SMTP provider
    transportOptions: {
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    },
  }),

  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  serverURL: getServerURL(),

  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
})
