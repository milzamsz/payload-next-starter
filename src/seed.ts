/**
 * Database Seed Script
 *
 * Run with: npm run seed
 *
 * This script populates your database with initial data.
 * Customize the data below to match your project needs.
 */
import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding database...')

  // ─── Create admin user ─────────────────────────────────────
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'changeme123',
        fullName: 'Admin User',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created: admin@example.com / changeme123')
  } catch {
    console.log('ℹ️  Admin user already exists, skipping.')
  }

  // ─── Create sample categories ──────────────────────────────
  const categories = ['News', 'Tutorials', 'Updates']
  for (const name of categories) {
    try {
      await payload.create({
        collection: 'categories',
        data: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          description: `Posts in the ${name} category.`,
        },
      })
      console.log(`✅ Category created: ${name}`)
    } catch {
      console.log(`ℹ️  Category "${name}" already exists, skipping.`)
    }
  }

  // ─── Update site settings ──────────────────────────────────
  try {
    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        siteName: 'My App',
        siteDescription: 'A modern web application built with Payload CMS and Next.js.',
      },
    })
    console.log('✅ Site settings updated')
  } catch (err) {
    console.error('Failed to update site settings:', err)
  }

  // ─── Update header ─────────────────────────────────────────
  try {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navLinks: [
          { label: 'Home', url: '/' },
          { label: 'Blog', url: '/blog' },
          { label: 'About', url: '/about' },
        ],
        ctaButton: { label: 'Contact Us', url: '/contact' },
      },
    })
    console.log('✅ Header updated')
  } catch (err) {
    console.error('Failed to update header:', err)
  }

  console.log('\n🎉 Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
