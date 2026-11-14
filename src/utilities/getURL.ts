import canUseDOM from './canUseDOM'

function resolveServerUrl(): string {
  const publicServerUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const isProduction = process.env.NODE_ENV === 'production'

  // If in production and NEXT_PUBLIC_SERVER_URL is missing or set to localhost, prioritize live domain
  if (publicServerUrl && (!isProduction || !publicServerUrl.includes('localhost'))) {
    return publicServerUrl
  }
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (isProduction) {
    return 'https://finanthropist.com'
  }
  return publicServerUrl || 'http://localhost:3000'
}

export const getServerSideURL = () => {
  return resolveServerUrl()
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return resolveServerUrl()
}
