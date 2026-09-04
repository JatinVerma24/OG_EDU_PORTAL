# Stage 1: Build Assets
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY senior_portal/client/package*.json ./senior_portal/client/

RUN npm install
RUN cd frontend && npm install
RUN cd senior_portal/client && npm install

COPY . .

# Build static react frontends
RUN npm run build

# Stage 2: Runtime Production Container
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled static assets from Stage 1
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/senior_portal/client/dist ./senior_portal/client/dist

# Copy remaining source code files
COPY . .

EXPOSE 5000

# Hardened non-root user setup
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:5000/api/health').then(res => res.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
