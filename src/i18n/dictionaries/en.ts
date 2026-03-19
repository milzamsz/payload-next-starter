const en = {
  // ─── Navigation ───────────────────────────────────────────────
  nav: {
    home: 'Home',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    contactButton: 'Contact Us',
  },

  // ─── Common ───────────────────────────────────────────────────
  common: {
    readMore: 'Read More',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    contactUs: 'Contact Us',
    viewAll: 'View All',
    backTo: 'Back to',
    loading: 'Loading…',
    noResults: 'No results found.',
    noPosts: 'No posts yet. Create your first post in the CMS.',
    noServices: 'No services published yet.',
    minRead: 'min read',
    publishedOn: 'Published on',
    startingFrom: 'Starting from',
    by: 'By',
    tags: 'Tags',
  },

  // ─── Home Page ────────────────────────────────────────────────
  home: {
    hero: {
      title: 'Welcome to My App',
      titleHighlight: 'My App',
      subtitle:
        'This is your new Payload CMS + Next.js starter. Edit src/app/(frontend)/[locale]/page.tsx to get started.',
      ctaPrimary: 'Open Admin',
      ctaSecondary: 'View Blog',
    },
    features: {
      heading: "What's Included",
      subheading: 'A production-ready foundation for your next project.',
      items: [
        { title: 'Payload CMS', desc: 'Full-featured headless CMS with admin UI at /admin. Collections, globals, blocks, and more.' },
        { title: 'Next.js 16', desc: 'App Router, Server Components, standalone output for Docker deployment.' },
        { title: 'Tailwind CSS v4', desc: 'Modern styling with design tokens. Customize colors and fonts in globals.css.' },
        { title: 'PostgreSQL', desc: 'Production-grade database with Docker Compose. Ready for cloud deployment.' },
        { title: 'Block Builder', desc: '8 ready-made content blocks: Hero, Content, Gallery, CTA, Testimonials, Stats, FAQ, Map.' },
        { title: 'i18n Ready', desc: 'Built-in English & Bahasa Indonesia support with locale routing and SEO alternates.' },
      ],
    },
    cta: {
      heading: 'Ready to build?',
      description: 'Start by visiting the admin panel and configuring your site settings.',
      button: 'Go to Admin →',
    },
  },

  // ─── About Page ───────────────────────────────────────────────
  about: {
    meta: {
      title: 'About Us',
      description: 'Learn about our team, mission, and values.',
    },
    hero: {
      eyebrow: 'Our Story',
      title: 'We build things',
      titleItalic: 'people love',
      subtitle:
        "A small team with big ideas. We're passionate about crafting digital products that make a real difference.",
    },
    mission: {
      eyebrow: 'Our Mission',
      heading: 'We help businesses grow through great design & technology.',
      p1: 'Since day one, our goal has been simple: build products that solve real problems with clarity, care, and craftsmanship.',
      p2: "We believe in long-term partnerships — not just delivering projects, but growing alongside our clients as their business evolves.",
      stats: [
        { number: '50+', label: 'Projects Delivered' },
        { number: '30+', label: 'Happy Clients' },
        { number: '5+', label: 'Years Experience' },
        { number: '99%', label: 'Client Satisfaction' },
      ],
    },
    values: {
      eyebrow: 'What We Stand For',
      heading: 'Our Values',
      items: [
        { icon: '✦', title: 'Quality First', desc: "We don't ship mediocre work. Every detail matters — from pixel precision to clean, maintainable code." },
        { icon: '◈', title: 'Transparency', desc: 'Clear communication throughout every project. No surprises, no hidden costs, just honest collaboration.' },
        { icon: '⬡', title: 'Long-term Thinking', desc: 'We build for the future, not just the deadline. Scalable, documented, and maintainable from day one.' },
      ],
    },
    team: {
      eyebrow: 'The People',
      heading: 'Meet the Team',
    },
    cta: {
      heading: 'Ready to work together?',
      description: "Let's talk about your project and how we can help.",
      button: 'Get in Touch',
    },
  },

  // ─── Services Page ────────────────────────────────────────────
  services: {
    meta: {
      title: 'Services',
      description: 'Explore what we offer and how we can help your business grow.',
    },
    hero: {
      eyebrow: 'What We Do',
      title: 'Our Services',
      subtitle:
        'We offer a focused set of services designed to help your business look great, work efficiently, and grow sustainably.',
    },
    empty: 'No services published yet. Add them in the CMS admin.',
    card: {
      startingFrom: 'Starting from',
      learnMore: 'Learn More',
    },
    process: {
      eyebrow: 'How We Work',
      heading: 'Our Process',
      steps: [
        { step: '01', title: 'Discovery', desc: 'We learn about your business, goals, and challenges through a deep-dive conversation.' },
        { step: '02', title: 'Strategy', desc: 'We define the scope, approach, and success metrics for your project.' },
        { step: '03', title: 'Execution', desc: "We build, design, and iterate — keeping you in the loop every step of the way." },
        { step: '04', title: 'Launch', desc: 'We ship, monitor, and support your project beyond launch day.' },
      ],
    },
    cta: {
      heading: 'Not sure what you need?',
      description: "Let's have a conversation. We'll help you figure out the best path forward.",
      button: 'Book a Free Consultation',
    },
  },

  // ─── Blog Page ────────────────────────────────────────────────
  blog: {
    meta: {
      title: 'Blog',
      description: 'Articles, tutorials, and updates from our team.',
    },
    heading: 'Blog',
    subheading: 'Latest articles and updates.',
    empty: 'No posts yet. Create your first post in the CMS.',
    richTextNote: 'Rich text content renders here. Install @payloadcms/richtext-lexical/react for rendering.',
  },

  // ─── Contact Page ─────────────────────────────────────────────
  contact: {
    meta: {
      title: 'Contact Us',
      description: 'Get in touch with our team. We would love to hear from you.',
    },
    heading: 'Contact Us',
    subheading: 'Have a question or want to get in touch? Send us a message.',
    form: {
      name: 'Name',
      namePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone',
      phonePlaceholder: '+1 (555) 000-0000',
      subject: 'Subject',
      subjectPlaceholder: 'What is this about?',
      message: 'Message',
      messagePlaceholder: 'Tell us more…',
      submit: 'Send Message',
      sending: 'Sending…',
      required: 'Required',
    },
    success: "Message sent! We'll get back to you soon.",
    error: 'Something went wrong. Please try again.',
  },

  // ─── 404 ──────────────────────────────────────────────────────
  notFound: {
    code: '404',
    heading: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    button: 'Go Home',
  },

  // ─── Footer ───────────────────────────────────────────────────
  footer: {
    followUs: 'Follow Us',
    navigation: 'Navigation',
    builtWith: 'Built with Payload CMS + Next.js',
  },
}

export default en
export type Dictionary = typeof en
