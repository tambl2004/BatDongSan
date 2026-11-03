
# syntax=docker/dockerfile:1

# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Production dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --no-audit --no-fund

# Runtime stage
FROM node:22-alpine AS runner

ENV NODE_ENV=production \
    PORT=5001

WORKDIR /app

COPY --from=deps --chown=node:node \
    /app/node_modules ./node_modules

COPY --from=build --chown=node:node \
    /app/dist ./dist

COPY --chown=node:node \
    package.json ./package.json

USER node

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s \
    --start-period=15s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:5001/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server.js"]
