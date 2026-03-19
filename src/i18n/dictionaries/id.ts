import type { Dictionary } from './en'

const id: Dictionary = {
  // ─── Navigation ───────────────────────────────────────────────
  nav: {
    home: 'Beranda',
    services: 'Layanan',
    portfolio: 'Portofolio',
    about: 'Tentang',
    blog: 'Blog',
    contact: 'Kontak',
    contactButton: 'Hubungi Kami',
  },

  // ─── Common ───────────────────────────────────────────────────
  common: {
    readMore: 'Baca Selengkapnya',
    learnMore: 'Pelajari Lebih Lanjut',
    getStarted: 'Mulai Sekarang',
    contactUs: 'Hubungi Kami',
    viewAll: 'Lihat Semua',
    backTo: 'Kembali ke',
    loading: 'Memuat…',
    noResults: 'Tidak ada hasil ditemukan.',
    noPosts: 'Belum ada artikel. Buat artikel pertama Anda di CMS.',
    noServices: 'Belum ada layanan yang diterbitkan.',
    minRead: 'menit baca',
    publishedOn: 'Diterbitkan pada',
    startingFrom: 'Mulai dari',
    by: 'Oleh',
    tags: 'Tag',
  },

  // ─── Home Page ────────────────────────────────────────────────
  home: {
    hero: {
      title: 'Selamat Datang di My App',
      titleHighlight: 'My App',
      subtitle:
        'Ini adalah starter Payload CMS + Next.js Anda. Edit src/app/(frontend)/[locale]/page.tsx untuk memulai.',
      ctaPrimary: 'Buka Admin',
      ctaSecondary: 'Lihat Blog',
    },
    features: {
      heading: 'Apa yang Tersedia',
      subheading: 'Fondasi siap produksi untuk proyek Anda berikutnya.',
      items: [
        { title: 'Payload CMS', desc: 'CMS headless lengkap dengan UI admin di /admin. Koleksi, global, blok, dan banyak lagi.' },
        { title: 'Next.js 16', desc: 'App Router, Server Components, output mandiri untuk deployment Docker.' },
        { title: 'Tailwind CSS v4', desc: 'Styling modern dengan design token. Kustomisasi warna dan font di globals.css.' },
        { title: 'PostgreSQL', desc: 'Database kelas produksi dengan Docker Compose. Siap untuk deployment cloud.' },
        { title: 'Block Builder', desc: '8 blok konten siap pakai: Hero, Konten, Galeri, CTA, Testimoni, Statistik, FAQ, Peta.' },
        { title: 'Siap i18n', desc: 'Dukungan Bahasa Inggris & Bahasa Indonesia bawaan dengan routing lokal dan SEO alternates.' },
      ],
    },
    cta: {
      heading: 'Siap untuk mulai membangun?',
      description: 'Mulailah dengan mengunjungi panel admin dan mengonfigurasi pengaturan situs Anda.',
      button: 'Pergi ke Admin →',
    },
  },

  // ─── About Page ───────────────────────────────────────────────
  about: {
    meta: {
      title: 'Tentang Kami',
      description: 'Pelajari tentang tim, misi, dan nilai-nilai kami.',
    },
    hero: {
      eyebrow: 'Cerita Kami',
      title: 'Kami membangun hal',
      titleItalic: 'yang dicintai orang',
      subtitle:
        'Tim kecil dengan ide besar. Kami bersemangat dalam menciptakan produk digital yang benar-benar membuat perbedaan.',
    },
    mission: {
      eyebrow: 'Misi Kami',
      heading: 'Kami membantu bisnis berkembang melalui desain & teknologi yang hebat.',
      p1: 'Sejak hari pertama, tujuan kami sederhana: membangun produk yang memecahkan masalah nyata dengan kejernihan, kepedulian, dan keahlian.',
      p2: 'Kami percaya pada kemitraan jangka panjang — tidak hanya mengerjakan proyek, tetapi tumbuh bersama klien kami seiring berkembangnya bisnis mereka.',
      stats: [
        { number: '50+', label: 'Proyek Terselesaikan' },
        { number: '30+', label: 'Klien Puas' },
        { number: '5+', label: 'Tahun Pengalaman' },
        { number: '99%', label: 'Kepuasan Klien' },
      ],
    },
    values: {
      eyebrow: 'Yang Kami Perjuangkan',
      heading: 'Nilai-Nilai Kami',
      items: [
        { icon: '✦', title: 'Kualitas Utama', desc: 'Kami tidak menghasilkan pekerjaan yang biasa-biasa saja. Setiap detail penting — dari ketepatan piksel hingga kode yang bersih dan mudah dipelihara.' },
        { icon: '◈', title: 'Transparansi', desc: 'Komunikasi yang jelas di setiap proyek. Tidak ada kejutan, tidak ada biaya tersembunyi, hanya kolaborasi yang jujur.' },
        { icon: '⬡', title: 'Berpikir Jangka Panjang', desc: 'Kami membangun untuk masa depan, bukan hanya untuk tenggat waktu. Skalabel, terdokumentasi, dan mudah dipelihara sejak hari pertama.' },
      ],
    },
    team: {
      eyebrow: 'Orang-Orangnya',
      heading: 'Kenali Tim Kami',
    },
    cta: {
      heading: 'Siap bekerja sama?',
      description: 'Mari bicara tentang proyek Anda dan bagaimana kami dapat membantu.',
      button: 'Hubungi Kami',
    },
  },

  // ─── Services Page ────────────────────────────────────────────
  services: {
    meta: {
      title: 'Layanan',
      description: 'Jelajahi apa yang kami tawarkan dan bagaimana kami dapat membantu bisnis Anda berkembang.',
    },
    hero: {
      eyebrow: 'Yang Kami Lakukan',
      title: 'Layanan Kami',
      subtitle:
        'Kami menawarkan serangkaian layanan terfokus yang dirancang untuk membantu bisnis Anda tampil hebat, bekerja efisien, dan berkembang secara berkelanjutan.',
    },
    empty: 'Belum ada layanan yang diterbitkan. Tambahkan di panel admin CMS.',
    card: {
      startingFrom: 'Mulai dari',
      learnMore: 'Pelajari Lebih Lanjut',
    },
    process: {
      eyebrow: 'Cara Kami Bekerja',
      heading: 'Proses Kami',
      steps: [
        { step: '01', title: 'Penemuan', desc: 'Kami mempelajari bisnis, tujuan, dan tantangan Anda melalui percakapan mendalam.' },
        { step: '02', title: 'Strategi', desc: 'Kami menentukan ruang lingkup, pendekatan, dan metrik keberhasilan proyek Anda.' },
        { step: '03', title: 'Eksekusi', desc: 'Kami membangun, mendesain, dan beriterasi — selalu memberitahu Anda di setiap langkah.' },
        { step: '04', title: 'Peluncuran', desc: 'Kami meluncurkan, memantau, dan mendukung proyek Anda setelah hari peluncuran.' },
      ],
    },
    cta: {
      heading: 'Tidak yakin apa yang Anda butuhkan?',
      description: 'Mari berbincang. Kami akan membantu Anda menemukan jalan terbaik ke depan.',
      button: 'Jadwalkan Konsultasi Gratis',
    },
  },

  // ─── Blog Page ────────────────────────────────────────────────
  blog: {
    meta: {
      title: 'Blog',
      description: 'Artikel, tutorial, dan pembaruan dari tim kami.',
    },
    heading: 'Blog',
    subheading: 'Artikel dan pembaruan terbaru.',
    empty: 'Belum ada artikel. Buat artikel pertama Anda di CMS.',
    richTextNote: 'Konten teks kaya dirender di sini. Instal @payloadcms/richtext-lexical/react untuk rendering.',
  },

  // ─── Contact Page ─────────────────────────────────────────────
  contact: {
    meta: {
      title: 'Hubungi Kami',
      description: 'Hubungi tim kami. Kami senang mendengar dari Anda.',
    },
    heading: 'Hubungi Kami',
    subheading: 'Punya pertanyaan atau ingin berhubungan? Kirimkan pesan kepada kami.',
    form: {
      name: 'Nama',
      namePlaceholder: 'Nama lengkap Anda',
      email: 'Email',
      emailPlaceholder: 'email@anda.com',
      phone: 'Telepon',
      phonePlaceholder: '+62 812 3456 7890',
      subject: 'Subjek',
      subjectPlaceholder: 'Ini tentang apa?',
      message: 'Pesan',
      messagePlaceholder: 'Ceritakan lebih lanjut…',
      submit: 'Kirim Pesan',
      sending: 'Mengirim…',
      required: 'Wajib diisi',
    },
    success: 'Pesan terkirim! Kami akan segera menghubungi Anda.',
    error: 'Terjadi kesalahan. Silakan coba lagi.',
  },

  // ─── 404 ──────────────────────────────────────────────────────
  notFound: {
    code: '404',
    heading: 'Halaman Tidak Ditemukan',
    description: 'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
    button: 'Kembali ke Beranda',
  },

  // ─── Footer ───────────────────────────────────────────────────
  footer: {
    followUs: 'Temukan Kami',
    navigation: 'Navigasi',
    builtWith: 'Dibangun dengan Payload CMS + Next.js',
  },
}

export default id
