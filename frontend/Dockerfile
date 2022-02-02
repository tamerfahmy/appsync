# Stage 1
FROM docker.siemens.com/evo-uk-digital-cloud-projects/incident-management/node-chrome as build-step
RUN mkdir -p /app
COPY ./frontend/. /app/frontend/.
COPY ./.git/. /app/.git/.

WORKDIR /app/frontend

RUN npm install
RUN npm run build

# Stage 2
FROM nginx:1.19.3-alpine

COPY ./frontend/config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./frontend/config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./frontend/config/nginx/error-pages /usr/share/nginx/html

COPY --from=build-step /app/frontend/dist/frontend/ /usr/share/nginx/html/

# Ensure required directories exist and set permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run/
RUN mkdir /var/cache/nginx/client_temp && \
  mkdir /var/cache/nginx/proxy_temp && \
  mkdir /var/cache/nginx/fastcgi_temp && \
  mkdir /var/cache/nginx/uwsgi_temp && \
  mkdir /var/cache/nginx/scgi_temp && \
  chown -R nginx:nginx /etc/nginx/conf.d /var/cache/nginx /var/log/nginx /usr/share/nginx && \
  chmod -R 755 /etc/nginx/conf.d /var/cache/nginx /var/log/nginx /usr/share/nginx && \
  touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 8081

USER nginx
