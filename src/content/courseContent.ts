import type { CTA } from './homeContent'

export type CourseContent = {
  hero: {
    badge: string
    headlinePrimary: string
    headlineAccent: string
    description: string
    pricing: {
      current: string
      original: string
      discountLabel: string
    }
    ctas: CTA[]
  }
  topicsCovered: {
    badge: string
    title: string
    items: string[]
  }
  learningOutcomes: {
    badge: string
    title: string
    items: Array<{ title: string; description: string }>
  }
  earningGuidance: {
    badge: string
    mainMessage: string
    points: string[]
  }
  support: {
    badge: string
    subtitle: string
    items: string[]
  }
  pricing: {
    highlight: string
    current: string
    original: string
    discountLabel: string
  }
  contact: {
    badge: string
    numbers: string[]
    website: string
  }
}

export const courseContent: CourseContent = {
  hero: {
    badge: 'For Maharashtra’s Growth',
    headlinePrimary: 'Basics to Advance Trading & Investing in Market',
    headlineAccent: 'Best Stock Market Education in Marathi',
    description: 'SHARE • MARKET • EDUCATION',
    pricing: {
      current: '9,912',
      original: '28,320',
      discountLabel: '65% OFF',
    },
    ctas: [
      {
        label: 'CONTACT US',
        href: 'https://conference.finanthropist.com/webinar-registration',
      },
    ],
  },
  topicsCovered: {
    badge: 'TOPICS COVERED',
    title: '“Basics to Advance Trading & Investing in Market”',
    items: [
      'Equity, Futures & Derivatives, Index & Stock Options',
      'Commodity & Currency (Forex)',
      'Technical & Fundamental Analysis',
      'IPO study, F&O study, Price Action',
      'Gann Theory, Candlesticks & Line Charts',
      'Pivot, Swing etc.',
      'Live Chart Reading & Multi-timeframe Trading',
      'Trading Strategies, Wealth Creation Skills',
      'Trading & Life Psychology',
      'Self-Portfolio & Account Management',
      'Demat Account Live Training',
      'Course Material & Free Apps',
    ],
  },
  learningOutcomes: {
    badge: 'WHAT WILL YOU LEARN IN THE COURSE?',
    title: 'FOR ENTIRE FAMILY FOR LIFETIME',
    items: [
      {
        title: 'Investing',
        description: 'Share Market, Mutual Fund & All other investments.',
      },
      {
        title: 'Trading',
        description: 'Equity, Futures, Options, Commodity & Currency (Forex).',
      },
      {
        title: 'Selection & Timing',
        description:
          'Technically & Fundamentally clear about Selecting Stocks, Entry & Exit points, Risk & Reward.',
      },
      {
        title: 'Rules Based Trading',
        description: 'Rules based trading will result into Small profits, Big Profits, Small Losses.',
      },
    ],
  },
  earningGuidance: {
    badge: 'HOW IT WILL HELP ME TO EARN',
    mainMessage: 'Success is Depend on Your Willingness to Become Successful',
    points: [
      'To compete the Course you need to give 2 hrs daily for 8-10 days.',
      'After course Daily 1-2 hours will help you become Trader',
      'After Course weekly 1 hour will help you become Investor.',
      'No Share Market background is required.',
      'We teach in simple Marathi language.',
      'You & your family can attend Live or Recording Both.',
    ],
  },
  support: {
    badge: 'FREE SUPPORT FOR LIFETIME',
    subtitle: 'FOR ENTIRE FAMILY FOR LIFETIME',
    items: [
      'Daily Live Market Analysis Sessions.',
      'Live Q&A sessions after every topic.',
      'Live Trading Sessions with Technical Team Support.',
      'Live Demat Account Trading Sessions.',
      'All Sessions Recordings for Lifetime.',
      'Call & Message Support for All.',
      'Access to exclusive tools and notes.',
      'Guidance to help you create your own trading plan.',
    ],
  },
  pricing: {
    highlight: 'ONLY 9,912',
    current: '9,912',
    original: '28,320',
    discountLabel: '65% OFF',
  },
  contact: {
    badge: 'CONTACT US',
    numbers: ['7066 33 4499', '7066 33 7676', '9359 99 8294'],
    website: 'www.finanthropist.com',
  },
}

