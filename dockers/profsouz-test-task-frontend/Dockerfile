FROM nginx

RUN apt-get update
RUN apt-get install -y iputils-ping traceroute


RUN mkdir -p /srv/www/profsouz-test-task-frontend
COPY ./dockers/build /srv/www/profsouz-test-task-frontend

COPY ./dockers/login-service-frontend/etc/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
EXPOSE 80/udp