FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY * /usr/share/nginx/html/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
