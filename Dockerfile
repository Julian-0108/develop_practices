# STAGE 1: Build
FROM node:stable-alpine
WORKDIR /
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# STAGE 1: Run
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY dist/app_ingresos/ .
