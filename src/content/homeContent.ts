'use client'

export type CTA = {
  label: string
  href: string
}

export const homeContent = {
  hero: {
    badge: "Maharashtra's #1 Institute",
    headlinePrimary: 'Learn Share Market',
    headlineAccent: 'Zero to Mastery',
    // headlineSecondary: 'Master Trading',
    rating: {
      value: '5.0',
      reviewsLabel: '2,486+ Verified Reviews',
      organization: 'Finanthropist',
      statusLabel: 'Live',
    },
    ctas: [
      { label: 'Attend Free Webinar', href: '/demo' },
      { label: 'Explore Course', href: '/courses' },
    ] as CTA[],
  },
  features: {
    badge: 'Why Choose Us',
    titlePrimary: "Maharashtra's Only Institute with",
    titleAccent: 'Satisfactory results',
    items: [
      'Teaches You Share Market Basics to Advance in one course',
      'Lifetime Live Market Support',
      'One Fee for Full Family Education',
      'Daily Market Support & Live Q&A Session',
      'Live & Recording Versions',
      'Fee Refund Guarantee',
      'Trading, Investing, Swing & Life Psychology',
      'Easy Marathi-English Language',
    ],
  },
  webinar: {
    badge: 'Free Webinar',
    titlePrimary: 'Join Our',
    titleAccent: 'Free Live Webinar',
    features: [
      'No Education or Experience Required',
      "We Don’t Force to Join Our Course",
      'Try & Attend with Family (Specially Husband-Wife)',
      'Attend for 20 mins, then Decide Worth it or Not',
      'Easy Marathi-English Language',
      'Get Expert Market Insights & Trading Tips',
    ],
    ctas: [
      { label: 'Register for Live Webinar', href: '/webinar' },
      { label: 'Watch Recorded Webinar', href: '/register' },
    ] as CTA[],
  },
  instructor: {
    badge: 'Instructor',
    heading: 'Meet Our Expert Educator',
    name: 'Sameer Sarang',
    description:
      "Maharashtra's most trusted stock market educator with 23+ years of finance experience and a proven track record of transforming lives through practical trading education.",
    stats: [
      { label: 'Experience', value: '23+ yrs' },
      { label: 'Families', value: '10,000+' },
      { label: 'Google Rating', value: '5.0★' },
    ],
    credentials: [
      { title: '16 years of finance Experience', desc: 'In banks like HDFC and HSBC', wide: true },
      { title: 'Published Author', desc: "Co-author of ' Billionaire Mindset'  book" },
      { title: '10,000+ families Trained', desc: 'Successful track record since 2017' },
      { title: '23+ Years Finance Experience', desc: 'Proven expertise in financial markets' },
      { title: 'Maharashtra Focus', desc: 'Understanding local investor mindset' },
    ],
  },
  welcome: {
    badge: 'Welcome',
    title: 'We Welcome You to',
    description:
      "Learn and grow with Maharashtra's trusted team. Discover how we guide families to long-term success in finance and trading.",
    highlights: [
      { title: 'Most Friendly Support Team', desc: 'Real humans who care, guiding you step by step.' },
      { title: 'Lifetime Help', desc: 'For Financial Decisions & Trading throughout your journey.' },
      { title: 'Family Education', desc: 'Empowering your entire family with financial wisdom.' },
      { title: 'Call Now', desc: 'Speak to our experts and get started the right way.' },
    ],
    ctas: [
      { label: 'Know More About Us', href: '/about' },
      { label: 'Call Now', href: '/contact' },
    ] as CTA[],
  },
} as const

export type HomeContent = typeof homeContent

