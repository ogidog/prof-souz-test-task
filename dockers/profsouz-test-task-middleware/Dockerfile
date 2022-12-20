FROM node:16.18-alpine

RUN apk update

RUN mkdir -p /srv/www/profsouz-test-task-middleware
COPY ./profsouz-test-task-middleware /srv/www/profsouz-test-task-middleware

WORKDIR /srv/www/profsouz-test-task-middleware

RUN npm ci --only=production

CMD ["node", "./bin/profsouz-test-task-middleware"]