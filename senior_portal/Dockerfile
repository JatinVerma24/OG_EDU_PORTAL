# Stage 1: Build the frontend
FROM node:20-alpine AS client-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Setup the backend
FROM node:20-alpine

WORKDIR /app

# Copy server package files and install production dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy server source code
COPY server/ ./server/

# Copy built frontend from Stage 1
COPY --from=client-builder /app/client/dist ./client/dist

# Copy notes directory (required by the backend)
COPY notes/ ./notes/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the server
CMD ["node", "server/server.js"]
