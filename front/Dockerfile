# BUILDER
FROM node:18.16.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build

# PRODUCTION
FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]