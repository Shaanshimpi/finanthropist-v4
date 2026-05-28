# Next.js standalone + Payload CMS (Railway / Docker)
# Requires output: 'standalone' in next.config.js

FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# --- dependencies ---
FROM base AS deps
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
# Pin pnpm via package.json "packageManager" (avoids Corepack fetching pnpm 11)
RUN corepack install && pnpm install --frozen-lockfile

# --- build ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NODE_OPTIONS="--max-old-space-size=6144"
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true

# Skip postbuild (next-sitemap) — not needed inside the image; avoids extra build failures
RUN corepack enable && corepack install && pnpm exec next build

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
