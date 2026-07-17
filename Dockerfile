# Next.js standalone + Payload CMS (Railway / Docker)
# Requires output: 'standalone' in next.config.js

FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN npm i -g pnpm@10.15.1

# --- dependencies ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- build ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Railway: mark these service variables as "Available at build time" in the dashboard
ARG PAYLOAD_SECRET
ARG POSTGRES_URL
ARG DATABASE_URL
ARG PREVIEW_SECRET
ARG CRON_SECRET
ARG NEXT_PUBLIC_SERVER_URL

ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV POSTGRES_URL=${POSTGRES_URL}
ENV DATABASE_URL=${DATABASE_URL}
ENV PREVIEW_SECRET=${PREVIEW_SECRET}
ENV CRON_SECRET=${CRON_SECRET}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NODE_OPTIONS="--max-old-space-size=6144"
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true

# Skip postbuild (next-sitemap) — not needed inside the image; avoids extra build failures
RUN pnpm exec next build

# --- runtime ---
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
