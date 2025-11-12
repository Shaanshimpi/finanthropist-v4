'use client'

export type CTA = {
  label: string
  href: string
  type?: 'link' | 'call'
}

export type Testimonial = {
  name: string
  rating: number
  review: string
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
      {
        title: 'Call Now',
        desc: 'Speak to our experts and get started the right way.',
        details: ['+91-7066334499', '+91-7066337676'],
      },
    ],
    ctas: [
      { label: 'Know More About Us', href: '/about' },
      { label: 'Call Now', href: '/contact', type: 'call' },
    ] as CTA[],
  },
  testimonials: [
    {
      name: 'Satish Atkari',
      rating: 5,
      review:
        "I sincerely thank you for the insightful share market course by Sameer sir. The concepts were explained in a simple yet powerful way, and I now feel more confident in making informed investment decisions in equity/IPO areas. Sir has given recordings for F&O also. I will go through that and will try to understand. Your guidance has truly sparked my interest in market analysis and financial planning. I'm grateful for the value you've added to my learning.\n  Thank you Sameer sir & team.",
    },
    {
      name: 'Vivek Patankar',
      rating: 5,
      review:
        "I recently completed the Share Market class and it exceeded all my expectations. The course was incredibly informative, well-structured, and easy to follow—even for someone like me with no prior background in trading. The instructor explained complex concepts like technical analysis, fundamental analysis, and risk management in a clear and practical way.\n\n  Live sessions, real market examples, and hands-on practice helped me gain confidence in making my own investment decisions. What I appreciated most was the focus on disciplined trading and long-term strategy rather than just quick profits.\n\n  Highly recommended for beginners as well as those looking to strengthen their market knowledge!",
    },
    {
      name: 'Rajani Chougule',
      rating: 5,
      review:
        'I recently completed this course. The teaching style is exceptionally clear, simple, and easily accessible to everyone, including beginners.\n  Thank you so much sir🙏',
    },
    {
      name: 'Vikas Deorukhkar',
      rating: 5,
      review:
        'Excellent Teaching Knowledge about Shares Trading. I have attended the August 2025 Batch and am clear in my mind about Shares Trading in various fields i.e., Intraday, Delivery. In this 7-day class, we learned Three Things: Trade, Pattern, and Decision. If we follow the Training models and the three steps above, we will challenge ourselves to achieve good profits from Shares. Sir has a vast knowledge in this field, and they have taught us in a very simple and practical manner to get knowledge in mind and HEART. Also, we have done daily assignments to get practical knowledge about share purchases and sales as per the Chart. I would recommend to all of them to attend their Free Seminar and join their class to get good knowledge in Shares Investment and get Short Term and Long Term Profit. Do not miss this chance, Last but not Least. There is no compulsion of eduction to learn this course. 🙏1',
    },
    {
      name: 'Pallavi Holey',
      rating: 5,
      review:
        "I sincerely thank you for the insightful share market course by Sameer sir. The concepts were explained in a simple yet powerful way, and I now feel more confident in making informed investment decisions. Your guidance has truly sparked my interest in market analysis and financial planning. I'm grateful for the value you've added to my learning. Thank you Sameer sir, Yash sir, Karan sir and whole team.",
    },
    {
      name: 'Nita Pandit',
      rating: 5,
      review:
        'This is one of the best share market courses in Maharashtra. It also provides valuable knowledge about investments. Sameer Sir is a genuine person who is working hard to share his knowledge of the share market with everyone. I feel very fortunate to have attended this course. Thanks to the entire Finanthropist team. I highly recommend joining the course to gain the best knowledge. I also thank the universe for bringing me in contact with the Finanthropist team.',
    },
    {
      name: 'Pritesh Satam',
      rating: 5,
      review:
        "Very Nice Overall Course. Sir's teaching method is so simple and nice that even a person with zero knowledge of share market can learn and earn money.",
    },
    {
      name: 'Uday Rajput',
      rating: 5,
      review:
        'Done all class from here. Excellent work from their team and especially Sameer Sir. Thank you so much. And appreciate their work that they have provided service for lifetime. Thanks again... 😀😊',
    },
    {
      name: 'Pushparaj Shinde',
      rating: 5,
      review:
        'Myself Pushparaj Shinde and I am a student of Sameer Sarang Sir. I am very happy to learn share market education in a very simple and easiest way. Thank you Sir 🙏 Stay Blessed 💐💐',
    },
    {
      name: 'Amit Gade',
      rating: 5,
      review:
        'Super experience, Finanthropist is the best share market course in Maharashtra. One of the best classes. I got perfect basic knowledge from them. Special thanks to Mr. Sameer sir and class team. They help properly, whatever you want—ask them and they will help you.',
    },
    {
      name: 'Akshay Potdar',
      rating: 5,
      review:
        'Sir explained everything very nicely from the basics to the advanced level in share trading. Thank you Sir 😊',
    },
    {
      name: 'Jagdish Skunk',
      rating: 5,
      review:
        'I have taken F&O from Sameer sir and now I am doing proper trading. I am getting regular profit from trading. Thanks to Sameer sir.',
    },
    {
      name: 'Prasad Deshpande',
      rating: 5,
      review:
        'Thanks to Sameer sir for motivating us and creating such a desire in us that share trading is for all. The beginning made by you will definitely lead us to new heights. Thank you so much to the whole team 💐',
    },
  ] as Testimonial[],
} as const

export type HomeContent = typeof homeContent
export const googleReviews: Testimonial[] = [
  {
    name: 'Satish Atkari',
    rating: 5,
    review: `I sincerely thank you for the insightful share market course by Sameer sir. The concepts were explained in a simple yet powerful way, and I now feel more confident in making informed investment decisions in equity/IPO areas. Sir has given recordings for F&O also. I will go through that and will try to understand. Your guidance has truly sparked my interest in market analysis and financial planning. I'm grateful for the value you've added to my learning.
  Thank you Sameer sir & team.`,
  },
  {
    name: 'Vivek Patankar',
    rating: 5,
    review: `I recently completed the Share Market class and it exceeded all my expectations. The course was incredibly informative, well-structured, and easy to follow—even for someone like me with no prior background in trading. The instructor explained complex concepts like technical analysis, fundamental analysis, and risk management in a clear and practical way.

  Live sessions, real market examples, and hands-on practice helped me gain confidence in making my own investment decisions. What I appreciated most was the focus on disciplined trading and long-term strategy rather than just quick profits.

  Highly recommended for beginners as well as those looking to strengthen their market knowledge!`,
  },
  {
    name: 'Rajani Chougule',
    rating: 5,
    review: `I recently completed this course. The teaching style is exceptionally clear, simple, and easily accessible to everyone, including beginners.
  Thank you so much sir🙏`,
  },
  {
    name: 'Vikas Deorukhkar',
    rating: 5,
    review: `Excellent Teaching Knowledge about Shares Trading. I have attended the August 2025 Batch and am clear in my mind about Shares Trading in various fields i.e., Intraday, Delivery. In this 7-day class, we learned Three Things: Trade, Pattern, and Decision. If we follow the Training models and the three steps above, we will challenge ourselves to achieve good profits from Shares. Sir has a vast knowledge in this field, and they have taught us in a very simple and practical manner to get knowledge in mind and HEART. Also, we have done daily assignments to get practical knowledge about share purchases and sales as per the Chart. I would recommend to all of them to attend their Free Seminar and join their class to get good knowledge in Shares Investment and get Short Term and Long Term Profit. Do not miss this chance, Last but not Least. There is no compulsion of eduction to learn this course. 🙏1`,
  },
  {
    name: 'Pallavi Holey',
    rating: 5,
    review: `I sincerely thank you for the insightful share market course by Sameer sir. The concepts were explained in a simple yet powerful way, and I now feel more confident in making informed investment decisions. Your guidance has truly sparked my interest in market analysis and financial planning. I'm grateful for the value you've added to my learning. Thank you Sameer sir, Yash sir, Karan sir and whole team.`,
  },
  {
    name: 'Nita Pandit',
    rating: 5,
    review: `This is one of the best share market courses in Maharashtra. It also provides valuable knowledge about investments. Sameer Sir is a genuine person who is working hard to share his knowledge of the share market with everyone. I feel very fortunate to have attended this course. Thanks to the entire Finanthropist team. I highly recommend joining the course to gain the best knowledge. I also thank the universe for bringing me in contact with the Finanthropist team.`,
  },
  {
    name: 'Pritesh Satam',
    rating: 5,
    review: `Very Nice Overall Course. Sir's teaching method is so simple and nice that even a person with zero knowledge of share market can learn and earn money.`,
  },
  {
    name: 'Uday Rajput',
    rating: 5,
    review: `Done all class from here. Excellent work from their team and especially Sameer Sir. Thank you so much. And appreciate their work that they have provided service for lifetime. Thanks again... 😀😊`,
  },
  {
    name: 'Pushparaj Shinde',
    rating: 5,
    review: `Myself Pushparaj Shinde and I am a student of Sameer Sarang Sir. I am very happy to learn share market education in a very simple and easiest way. Thank you Sir 🙏 Stay Blessed 💐💐`,
  },
  {
    name: 'Amit Gade',
    rating: 5,
    review: `Super experience, Finanthropist is the best share market course in Maharashtra. One of the best classes. I got perfect basic knowledge from them. Special thanks to Mr. Sameer sir and class team. They help properly, whatever you want—ask them and they will help you.`,
  },
  {
    name: 'Akshay Potdar',
    rating: 5,
    review: `Sir explained everything very nicely from the basics to the advanced level in share trading. Thank you Sir 😊`,
  },
  {
    name: 'Jagdish Skunk',
    rating: 5,
    review: `I have taken F&O from Sameer sir and now I am doing proper trading. I am getting regular profit from trading. Thanks to Sameer sir.`,
  },
  {
    name: 'Prasad Deshpande',
    rating: 5,
    review: `Thanks to Sameer sir for motivating us and creating such a desire in us that share trading is for all. The beginning made by you will definitely lead us to new heights. Thank you so much to the whole team 💐`,
  },
]