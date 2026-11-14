import React from 'react'

type JsonLdProps = {
  data: Record<string, unknown>
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const OrganizationJsonLd: React.FC<{ siteUrl: string }> = ({ siteUrl }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: 'Finanthropist Educare Pvt Ltd',
    alternateName: 'Finanthropist',
    url: siteUrl,
    logo: `${siteUrl}/static-media/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    description:
      "Maharashtra's leading stock market education institute. Practical share market trading and investing courses in Marathi led by Sammeer Sarang. 23+ years finance experience, 10,000+ families trained.",
    telephone: '+91 7066334499',
    email: 'info@finanthropist.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nashik',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.9975',
      longitude: '73.7898',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      {
        '@type': 'State',
        name: 'Maharashtra',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    sameAs: [
      'https://www.instagram.com/finanthropisteducare_/',
      'https://www.youtube.com/@FinanthropistEducare9',
      'https://www.facebook.com/Finanthropisteducare/',
    ],
    founder: {
      '@type': 'Person',
      name: 'Sammeer Sarang',
      jobTitle: 'Founder & Executive Director',
      url: `${siteUrl}/instructor`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '2486',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return <JsonLd data={data} />
}

export const CourseJsonLd: React.FC<{ siteUrl: string }> = ({ siteUrl }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${siteUrl}/course#course`,
    name: 'Basics to Advance Trading & Investing in Market',
    description:
      'Comprehensive stock market training program in Marathi covering Equity, Futures & Options, Commodity & Currency (Forex), Technical & Fundamental Analysis, and Risk Management.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Finanthropist Educare Pvt Ltd',
      sameAs: siteUrl,
    },
    inLanguage: ['mr', 'en'],
    courseMode: ['online', 'blended'],
    educationalCredentialAwarded: 'Certificate of Completion',
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      price: '9912',
      priceCurrency: 'INR',
      url: `${siteUrl}/course`,
      availability: 'https://schema.org/InStock',
    },
    instructor: {
      '@type': 'Person',
      name: 'Sammeer Sarang',
      jobTitle: 'Stock Market Expert & Educator',
      url: `${siteUrl}/instructor`,
    },
  }

  return <JsonLd data={data} />
}

export const PersonJsonLd: React.FC<{ siteUrl: string }> = ({ siteUrl }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/instructor#person`,
    name: 'Sammeer Sarang',
    jobTitle: 'Founder, Executive Director & Stock Market Educator',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Finanthropist Educare Pvt Ltd',
      sameAs: siteUrl,
    },
    description:
      "Maharashtra's most trusted stock market educator with 23+ years of finance experience, including 16 years at HDFC Bank and HSBC. Co-author of 'Billionaire Mindset'. Trained over 10,000 families across Maharashtra.",
    image: `${siteUrl}/static-media/sameer-fist.png`,
    knowsAbout: [
      'Stock Market Trading',
      'Technical Analysis',
      'Options & Derivatives',
      'Wealth Creation',
      'Trading Psychology',
    ],
    alumniOf: ['HDFC Bank', 'HSBC'],
  }

  return <JsonLd data={data} />
}

export const BreadcrumbJsonLd: React.FC<{
  siteUrl: string
  items: Array<{ name: string; path: string }>
}> = ({ siteUrl, items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }

  return <JsonLd data={data} />
}

