FROM node:18-alpine

WORKDIR /app

# Install nodemon globally for hot-reloads
RUN npm install -g nodemon

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["nodemon", "server.js"]
