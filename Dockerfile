# STAGE 1: Build
FROM node:current-alpine AS build
WORKDIR /projects/app-ingresos
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# STAGE 2: Run
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /projects/app-ingresos/dist/app-sitios-web /usr/share/nginx/html
