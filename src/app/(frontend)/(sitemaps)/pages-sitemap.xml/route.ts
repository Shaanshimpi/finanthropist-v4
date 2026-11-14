import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const SITE_URL = getServerSideURL()
    const dateFallback = new Date().toISOString()

    // Core live application pages
    const liveAppPages = [
      '',
      '/course',
      '/instructor',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
    ].map((path) => ({
      loc: `${SITE_URL}${path}`,
      lastmod: dateFallback,
    }))

    let cmsPages: Array<{ loc: string; lastmod: string }> = []
    try {
      const payload = await getPayload({ config })
      const results = await payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      if (results?.docs) {
        cmsPages = results.docs
          .filter((page) => Boolean(page?.slug) && page.slug !== 'home')
          .map((page) => ({
            loc: `${SITE_URL}/${page.slug}`,
            lastmod: page.updatedAt || dateFallback,
          }))
      }
    } catch {
      // Build/DB fallback
    }

    // Merge and deduplicate by loc
    const seen = new Set<string>()
    const sitemap: Array<{ loc: string; lastmod: string }> = []

    for (const item of [...liveAppPages, ...cmsPages]) {
      if (!seen.has(item.loc)) {
        seen.add(item.loc)
        sitemap.push(item)
      }
    }

    return sitemap
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
