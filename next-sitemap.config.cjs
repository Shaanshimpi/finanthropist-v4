const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : null) ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://finanthropist.com' : 'http://localhost:3000')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/admin/*', '/admin'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/*',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/pages-sitemap.xml`],
  },
}
