FROM nginx

RUN apt-get update
RUN apt-get install -y iputils-ping traceroute


RUN mkdir -p /srv/www/profsouz-test-task-frontend
COPY ./dockers/profsouz-test-task-frontend/build /srv/www/profsouz-test-task-frontend

COPY ./dockers/profsouz-test-task-frontend/etc/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080/tcp
EXPOSE 8080/udp