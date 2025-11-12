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
      title: 'Explore',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Curriculum', href: '#curriculum' },
        { label: 'Live Webinars', href: '#webinar' },
        { label: 'Success Stories', href: '#testimonials' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'FAQs', href: '#faq' },
        { label: 'Investment Plans', href: '#pricing' },
        { label: 'Insights & Articles', href: '#blog' },
      ],
    },
  ],
  contact: {
    title: 'Connect',
    email: 'hello@finanthropist.in',
    phoneNumbers: ['+91 7066334499', '+91 7066337676'],
    location: 'Pune, Maharashtra',
    socials: [
      { name: 'Instagram', href: 'https://www.instagram.com/', label: 'IG' },
      { name: 'YouTube', href: 'https://www.youtube.com/', label: 'YT' },
      { name: 'Telegram', href: 'https://www.telegram.org/', label: 'TG' },
    ],
  },
  bottomLinks: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms & Conditions', href: '#terms' },
    { label: 'Refund Policy', href: '#refund' },
  ],
  copyright: 'Finanthropist. All rights reserved.',
}
