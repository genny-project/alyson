# Builder pattern
FROM node:14.16-alpine3.10 AS builder
WORKDIR /app
ADD package.json package.json
ADD . .
RUN rm -f .env
RUN apk add git
RUN npm ci
RUN npm run build 

WORKDIR /app
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
RUN ["nginx"]
EXPOSE 8080
