# Multi-stage secure build for ogeduAI unified portal
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root and sub-project configurations
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY senior_portal/client/package*.json ./senior_portal/client/

# Install dependencies (including devDependencies for building frontend assets)
RUN npm install
RUN cd frontend && npm install
RUN cd senior_portal/client && npm install

# Copy source codes
COPY . .

# Compile static clients
RUN npm run build

# --- Stage 2: Runtime Image ---
FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled client build outputs from Stage 1
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/senior_portal/client/dist ./senior_portal/client/dist

# Copy remaining backend source files
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
