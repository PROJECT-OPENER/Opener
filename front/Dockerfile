# BUILDER
FROM node:18.16.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=2048

CMD npm run build

EXPOSE 3000

CMD npm run start