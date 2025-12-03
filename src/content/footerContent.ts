export type FooterLink = {
  label: string
  href?: string
}

export type FooterLinkGroup = {
  title: string
  links: FooterLink[]
}

export type FooterSocial = {
  name: string
  href: string
  label: string
  icon?: 'instagram' | 'youtube' | 'telegram'
}

export type FooterHighlight = {
  label: string
  color: string
}

export type FooterContent = {
  logo: {
    src: string
    alt: string
  }
  description: string
  highlights: FooterHighlight[]
  linkGroups: FooterLinkGroup[]
  contact: {
    title: string
    email: string
    phoneNumbers: string[]
    location: string
    socials: FooterSocial[]
  }
  bottomLinks: FooterLink[]
  copyright: string
}

export const footerContent: FooterContent = {
  logo: {
    src: '/static-media/logo.png',
    alt: 'Finanthropist Logo',
  },
  description:
    "From foundational market literacy to advanced trading psychology, we help families build resilient, profitable financial journeys with expert guidance and lifetime support.",
  highlights: [
    { label: 'SEBI Registered Mentors', color: '#FCC22F' },
    { label: '15K+ Learners', color: '#C71C22' },
  ],
  linkGroups: [
    {
      title: 'Quick Links',
      links: [
        // Only real pages, no section anchors
        { label: 'Home', href: '/' },
        { label: 'Course', href: '/course' },
        { label: 'Instructor', href: '/instructor' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        // Blog & Posts temporarily disabled
        // { label: 'Blog & Posts', href: '/posts' },
      ],
    },
  ],
  contact: {
    title: 'Connect',
    email: 'info@finanthropist.com',
    phoneNumbers: ['+91 7066334499', '+91 7066337676'],
    location: 'Nashik, Maharashtra',
    socials: [
      { name: 'Instagram', href: 'https://www.instagram.com/finanthropisteducare_/', label: 'Instagram', icon: 'instagram' },
      { name: 'YouTube', href: 'https://www.youtube.com/@FinanthropistEducare9', label: 'YouTube', icon: 'youtube' },
      { name: 'Telegram', href: 'https://www.telegram.org/', label: 'Telegram', icon: 'telegram' },
    ],
  },
  bottomLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
  copyright: 'Finanthropist. All rights reserved.',
}
