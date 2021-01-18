FROM nginx:1.17.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/shop-ui /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
