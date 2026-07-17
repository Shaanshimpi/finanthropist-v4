interface PostgresPoolConfig {
  connectionString: string
  ssl?: boolean | { rejectUnauthorized: boolean }
}

/**
 * Resolves the Postgres URL Payload should use.
 *
 * Priority:
 * 1. POSTGRES_URL — explicit override (Neon, etc.)
 * 2. DATABASE_URL — Railway private URL (app + build on Railway)
 * 3. DATABASE_PUBLIC_URL — Railway public URL (local dev → Railway Postgres)
 */
export function getPostgresConnectionString(): string {
  const raw =
    process.env.POSTGRES_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.DATABASE_PUBLIC_URL?.trim() ||
    ''

  if (!raw) return ''

  try {
    const url = new URL(raw)
    const host = url.hostname
    const isLocal = host === 'localhost' || host === '127.0.0.1'
    const isRailwayPrivate = host.endsWith('.railway.internal')

    // Neon and other public cloud hosts; Railway public uses pool SSL config below.
    if (
      !isLocal &&
      !isRailwayPrivate &&
      !isRailwayPublicHost(host) &&
      !url.searchParams.has('sslmode')
    ) {
      url.searchParams.set('sslmode', 'require')
    }

    return url.toString()
  } catch {
    return raw
  }
}

function isRailwayPublicHost(host: string): boolean {
  return (
    host.endsWith('.rlwy.net') ||
    host.endsWith('.railway.app') ||
    host.endsWith('.up.railway.app')
  )
}

/** Pool config for @payloadcms/db-postgres (TCP/pg — required for Railway). */
export function getPostgresPoolConfig(): PostgresPoolConfig {
  const connectionString = getPostgresConnectionString()
  const config: PostgresPoolConfig = { connectionString }

  if (!connectionString) return config

  try {
    const host = new URL(connectionString).hostname
    const isLocal = host === 'localhost' || host === '127.0.0.1'
    const isRailwayPrivate = host.endsWith('.railway.internal')

    if (isRailwayPublicHost(host)) {
      // Railway public proxy (proxy.rlwy.net): TLS cert does not match hostname for pg.
      config.ssl = { rejectUnauthorized: false }
    } else if (!isLocal && !isRailwayPrivate) {
      config.ssl = true
    }
  } catch {
    // connection string only
  }

  return config
}
