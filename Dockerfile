# STAGE 1: Build
FROM node:current-alpine
WORKDIR /projects/app-ingresos
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# STAGE 2: Run
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY /projects/app-ingresos/dist/app_ingresos .
