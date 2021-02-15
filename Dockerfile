# Builder pattern
FROM node:14.5.0-alpine AS builder
WORKDIR /app
ADD package.json package.json
ADD . .
RUN rm -f .env
RUN apk add git
RUN npm install
RUN npm run build -- --profile

WORKDIR /app
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
RUN ["nginx"]
EXPOSE 8080
