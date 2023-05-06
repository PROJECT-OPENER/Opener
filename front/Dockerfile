# BUILDER
FROM node:18.16.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build

FROM nginx:1.23.4-alpine

COPY ./conf /etc/nginx/

COPY --from=builder /app/dist /usr/share/nginx/html