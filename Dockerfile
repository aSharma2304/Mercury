# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN npm install

# ---------- builder ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Build-time env vars
ARG NEXT_PUBLIC_BEEFREE_ID
ARG NEXT_PUBLIC_BEEFREE_SECRET
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

ENV NEXT_PUBLIC_BEEFREE_ID=${NEXT_PUBLIC_BEEFREE_ID}
ENV NEXT_PUBLIC_BEEFREE_SECRET=${NEXT_PUBLIC_BEEFREE_SECRET}
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- runner ----------
FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 4000
CMD ["node", "server.js"]